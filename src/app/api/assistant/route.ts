/**
 * src/app/api/assistant/route.ts
 *
 * Streaming POST endpoint for the Al Kiswah AI assistant.
 *
 * Flow:
 *   1. Rate-limit check (IP)
 *   2. Build cached system prompt + tools
 *   3. Call Claude Haiku 4.5 with streaming
 *   4. Tool-loop:
 *        create_booking → validate → addBooking() → processBookingAction() → return ref
 *        lookup_price   → read pricing.json → return match
 *        save_lead      → upsert DraftBooking
 *   5. Stream text to client as SSE
 *   6. Never leak API key or stack traces to client
 */

import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { checkChatRateLimit } from '@/lib/chat/rateLimit';
import { buildSystemBlocks } from '@/lib/chat/systemPrompt';
import { ASSISTANT_TOOLS } from '@/lib/chat/tools';
import { addBooking } from '@/lib/db';
import { processBookingAction } from '@/lib/bookingProcessor';
import dbConnect from '@/lib/mongodb';
import { DraftBooking } from '@/models';
import { getLivePricing, LiveRouteEntry } from '@/lib/chat/livePricing';

// ---------------------------------------------------------------------------
// Anthropic client (server-side only)
// ---------------------------------------------------------------------------
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface RequestBody {
  messages: ConversationMessage[];
  sessionId: string;
}

// ---------------------------------------------------------------------------
// Vehicle name map for display
// ---------------------------------------------------------------------------
const VEHICLE_NAMES: Record<string, string> = {
  camry:   'Toyota Camry',
  gmc:     'GMC Yukon XL Denali',
  staria:  'Hyundai Staria',
  starex:  'Hyundai H1/Starex',
  hiace:   'Toyota HiAce',
  coaster: 'Toyota Coaster',
  xpander: 'Mitsubishi Xpander',
  k5:      'Kia K5',
};

// ---------------------------------------------------------------------------
// Tool handlers
// ---------------------------------------------------------------------------

/** lookup_price — return real prices + smart recommendation from live MongoDB data */
async function handleLookupPrice(input: {
  pickup:     string;
  dropoff:    string;
  vehicle?:   string;
  passengers?: number;
  preference?: 'economy' | 'comfort' | 'vip';
}): Promise<string> {
  const { pickup, dropoff, vehicle, passengers, preference } = input;
  const { routes } = await getLivePricing();

  const pickupLower  = pickup.toLowerCase();
  const dropoffLower = dropoff.toLowerCase();

  // ── Score each route by keyword match ──────────────────────────────────
  const score = (routeName: string) => {
    const name = routeName.toLowerCase();
    let s = 0;
    if (pickupLower.split(/\s+/).some((w) => name.includes(w) && w.length > 3)) s += 2;
    if (dropoffLower.split(/\s+/).some((w) => name.includes(w) && w.length > 3)) s += 2;
    if ((pickupLower.includes('jeddah') || pickupLower.includes('airport') || pickupLower.includes('kaia')) &&
        name.includes('jeddah airport')) s += 3;
    if ((dropoffLower.includes('makkah') || dropoffLower.includes('mecca')) &&
        name.includes('makkah')) s += 3;
    if ((dropoffLower.includes('madinah') || dropoffLower.includes('medina') || dropoffLower.includes('madina')) &&
        name.includes('madinah')) s += 3;
    if ((pickupLower.includes('makkah') || pickupLower.includes('mecca')) &&
        name.includes('makkah')) s += 2;
    return s;
  };

  const sorted = [...(routes as LiveRouteEntry[])].sort((a, b) => score(b.name) - score(a.name));
  const best = sorted[0];

  if (!best || score(best.name) === 0) {
    return JSON.stringify({
      found: false,
      message: `No listed price for "${pickup}" → "${dropoff}". Please contact us on WhatsApp (+966 54 870 7332) for a custom quote.`,
    });
  }

  const rates = best.customRates as Record<string, number>;
  const validVehicleKeys = ['camry', 'gmc', 'staria', 'starex', 'hiace', 'coaster'];

  // ── If a specific vehicle was requested ────────────────────────────────
  if (vehicle) {
    const key = vehicle.toLowerCase();
    if (rates[key] != null) {
      return JSON.stringify({
        found:      true,
        route:      best.name,
        distance:   best.distance,
        travelTime: best.duration,
        vehicle:    VEHICLE_NAMES[key] || key,
        vehicleKey: key,
        priceSAR:   rates[key],
      });
    }
    // Vehicle not priced on this route — return nearest alternatives
    const alternatives = validVehicleKeys
      .filter((k) => rates[k] != null)
      .slice(0, 3)
      .map((k) => ({ vehicle: VEHICLE_NAMES[k] || k, vehicleKey: k, priceSAR: rates[k] }));
    return JSON.stringify({
      found:            true,
      route:            best.name,
      vehicleNotListed: true,
      message:          `${VEHICLE_NAMES[key] || key} is not listed for this route.`,
      alternatives,
    });
  }

  // ── Smart recommendation based on passengers + preference ──────────────
  type VehicleRecommendation = {
    key:     string;
    tier:    string;
    maxPax:  number;
    reason:  string;
  };

  const VEHICLE_TIERS: VehicleRecommendation[] = [
    { key: 'camry',   tier: 'economy',  maxPax: 4,  reason: 'ideal for couples and small families, great value'        },
    { key: 'starex',  tier: 'economy',  maxPax: 7,  reason: 'spacious budget-friendly van, comfortable for families'   },
    { key: 'staria',  tier: 'comfort',  maxPax: 7,  reason: 'modern van with panoramic windows and premium comfort'    },
    { key: 'gmc',     tier: 'vip',      maxPax: 7,  reason: 'luxury SUV with leather seats, dual AC, and generous space'},
    { key: 'hiace',   tier: 'comfort',  maxPax: 10, reason: 'large van with ample luggage space, great for groups'     },
    { key: 'coaster', tier: 'comfort',  maxPax: 19, reason: 'minibus for large groups and jamaats'                      },
  ];

  const pax = passengers ?? 1;

  // Filter to vehicles that fit the group and are priced on this route
  const fitting = VEHICLE_TIERS.filter(
    (v) => v.maxPax >= pax && rates[v.key] != null
  );

  if (!fitting.length) {
    // Group too large for listed vehicles — return all available
    const available = validVehicleKeys
      .filter((k) => rates[k] != null)
      .map((k) => ({ vehicle: VEHICLE_NAMES[k] || k, vehicleKey: k, priceSAR: rates[k] }));
    return JSON.stringify({
      found:    true,
      route:    best.name,
      distance: best.distance,
      travelTime: best.duration,
      note:     `Group size (${pax}) may need multiple vehicles. Please contact WhatsApp for multi-vehicle bookings.`,
      allPrices: available,
    });
  }

  // Pick recommended vehicle
  let recommended: VehicleRecommendation;
  if (preference === 'vip') {
    recommended = fitting.find((v) => v.tier === 'vip') ?? fitting[fitting.length - 1];
  } else if (preference === 'economy') {
    recommended = fitting[0]; // cheapest fitting vehicle
  } else {
    // Default: if ≤4 pax → economy (camry); if 5–7 → comfort (staria); if 8+ → hiace/coaster
    recommended = fitting.find((v) => v.tier === 'comfort') ?? fitting[0];
  }

  // Build up to 2 alternatives (different tier, also fits, also priced)
  const alternatives = fitting
    .filter((v) => v.key !== recommended.key)
    .slice(0, 2)
    .map((v) => ({
      vehicle:    VEHICLE_NAMES[v.key] || v.key,
      vehicleKey: v.key,
      priceSAR:   rates[v.key],
      tier:       v.tier,
      reason:     v.reason,
    }));

  return JSON.stringify({
    found:      true,
    route:      best.name,
    distance:   best.distance,
    travelTime: best.duration,
    recommended: {
      vehicle:    VEHICLE_NAMES[recommended.key] || recommended.key,
      vehicleKey: recommended.key,
      priceSAR:   rates[recommended.key],
      reason:     recommended.reason,
    },
    alternatives,
    passengers: pax,
  });
}

/** save_lead — upsert a DraftBooking record */
async function handleSaveLead(input: Record<string, unknown>, sessionId: string): Promise<string> {
  try {
    await dbConnect();

    const filter: Record<string, unknown> = {};
    if (input.email) filter.email = input.email;
    else if (input.phone) filter.phone = input.phone;
    else if (sessionId) filter['data.sessionId'] = sessionId;

    const data = { ...input, sessionId, source: 'ai_chat', savedAt: new Date().toISOString() };

    if (Object.keys(filter).length > 0) {
      await DraftBooking.findOneAndUpdate(
        filter,
        {
          $set: {
            name: input.name,
            email: input.email,
            phone: input.phone,
            data,
            lastActive: new Date(),
          },
        },
        { upsert: true, new: true }
      );
    } else {
      await DraftBooking.create({ data, lastActive: new Date(), step: 1 });
    }

    return JSON.stringify({ saved: true });
  } catch (err) {
    console.error('[AI Assistant] save_lead error:', err);
    return JSON.stringify({ saved: false, error: 'Could not save lead' });
  }
}

/** create_booking — validate, save, trigger post-booking actions */
async function handleCreateBooking(
  input: Record<string, unknown>
): Promise<{ result: string; bookingRef?: string }> {
  const required = ['name', 'email', 'phone', 'pickup', 'dropoff', 'date', 'time', 'vehicle', 'passengers'];
  const missing = required.filter((f) => !input[f]);

  if (missing.length > 0) {
    return {
      result: JSON.stringify({
        success: false,
        error: `Missing required fields: ${missing.join(', ')}. Please collect these before creating the booking.`,
      }),
    };
  }

  try {
    const bookingData = {
      name:       String(input.name),
      email:      String(input.email),
      phone:      String(input.phone),
      pickup:     String(input.pickup),
      dropoff:    String(input.dropoff),
      date:       String(input.date),
      time:       String(input.time),
      vehicle:    VEHICLE_NAMES[String(input.vehicle)] || String(input.vehicle),
      passengers: Number(input.passengers),
      nationality:  input.nationality   ? String(input.nationality)  : undefined,
      visaType:     input.visaType      ? String(input.visaType)     : undefined,
      flightNumber: input.flightNumber  ? String(input.flightNumber) : undefined,
      arrivalDate:  input.arrivalDate   ? String(input.arrivalDate)  : undefined,
      notes:        input.notes         ? String(input.notes)        : undefined,
      country:      input.country       ? String(input.country)      : undefined,
      currency:     (input.currency === 'USD' ? 'USD' : 'SAR') as 'SAR' | 'USD',
      status:       'pending',
      paymentStatus: 'unpaid' as const,
      source:       'ai_chat',
    };

    const savedBooking = await addBooking(bookingData as any);
    const bookingId    = (savedBooking as any)._id?.toString() || (savedBooking as any).id?.toString() || '';
    const shortRef     = `AK-${bookingId.slice(-8).toUpperCase()}`;

    // Trigger post-booking tasks (email confirmation with PDF, admin notification, Pusher)
    if (bookingId) {
      try {
        await processBookingAction(bookingId);
        console.log(`[AI Assistant] Post-booking tasks completed for ${shortRef}`);
      } catch (postErr) {
        console.error('[AI Assistant] Post-booking tasks failed (non-fatal):', postErr);
      }
    }

    return {
      result: JSON.stringify({
        success:    true,
        bookingRef: shortRef,
        bookingId,
        message:    `Booking confirmed! Reference: ${shortRef}. A confirmation email with PDF receipt has been sent to ${bookingData.email}.`,
      }),
      bookingRef: shortRef,
    };
  } catch (err: any) {
    console.error('[AI Assistant] create_booking error:', err);
    return {
      result: JSON.stringify({
        success: false,
        error:
          'There was an error saving the booking. Please try again or contact us on WhatsApp: +966 54 870 7332',
      }),
    };
  }
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  // ── Extract IP ──────────────────────────────────────────────────────────
  let ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  if (ip.includes(',')) ip = ip.split(',')[0].trim();

  // ── Rate limit ──────────────────────────────────────────────────────────
  const rateLimitResult = await checkChatRateLimit(ip);
  if (!rateLimitResult.allowed) {
    const encoder = new TextEncoder();
    const stream  = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: rateLimitResult.message })}\n\n`));
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      },
    });
    return new Response(stream, {
      headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
    });
  }

  // ── Parse body ──────────────────────────────────────────────────────────
  let body: RequestBody;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400 });
  }

  const { messages = [], sessionId = '' } = body;

  if (!messages.length) {
    return new Response(JSON.stringify({ error: 'No messages provided' }), { status: 400 });
  }

  // Validate message structure
  const sanitizedMessages = messages
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .filter((m) => typeof m.content === 'string' && m.content.trim().length > 0)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) })); // truncate per message

  if (!sanitizedMessages.length) {
    return new Response(JSON.stringify({ error: 'No valid messages' }), { status: 400 });
  }

  // ── Build system blocks (with live pricing from DB + cached knowledge base) ─
  const systemBlocks = await buildSystemBlocks();

  // ── Create streaming response ────────────────────────────────────────────
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: object) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      try {
        // Accumulate full assistant text for tool handling
        let currentMessages = [...sanitizedMessages];
        let bookingRef: string | undefined;

        // Tool loop — keep calling until no more tool_use blocks
        // eslint-disable-next-line no-constant-condition
        while (true) {
          // Build the request with streaming
          const response = await anthropic.messages.create({
            model:      'claude-haiku-4-5',
            max_tokens: 160,
            system:     systemBlocks as any,
            messages:   currentMessages as any,
            tools:      ASSISTANT_TOOLS as any,
            stream:     true,
          });

          let assistantText = '';
          let stopReason    = '';
          const toolUses:   { id: string; name: string; input: Record<string, unknown> }[] = [];
          let currentToolId   = '';
          let currentToolName = '';
          let currentToolJson = '';

          // Process the stream
          for await (const event of response) {
            if (event.type === 'content_block_start') {
              if (event.content_block.type === 'tool_use') {
                currentToolId   = event.content_block.id;
                currentToolName = event.content_block.name;
                currentToolJson = '';
              }
            } else if (event.type === 'content_block_delta') {
              if (event.delta.type === 'text_delta') {
                assistantText += event.delta.text;
                send({ text: event.delta.text });
              } else if (event.delta.type === 'input_json_delta') {
                currentToolJson += event.delta.partial_json;
              }
            } else if (event.type === 'content_block_stop') {
              if (currentToolId && currentToolName) {
                try {
                  const parsedInput = currentToolJson ? JSON.parse(currentToolJson) : {};
                  toolUses.push({ id: currentToolId, name: currentToolName, input: parsedInput });
                } catch (parseErr) {
                  console.error('[AI Assistant] Failed to parse tool input JSON:', parseErr);
                }
                currentToolId   = '';
                currentToolName = '';
                currentToolJson = '';
              }
            } else if (event.type === 'message_delta') {
              stopReason = event.delta.stop_reason || '';
            }
          }

          // Add assistant turn to history
          const assistantContent: any[] = [];
          if (assistantText) {
            assistantContent.push({ type: 'text', text: assistantText });
          }
          for (const tu of toolUses) {
            assistantContent.push({ type: 'tool_use', id: tu.id, name: tu.name, input: tu.input });
          }
          if (assistantContent.length > 0) {
            currentMessages = [...currentMessages, { role: 'assistant', content: assistantContent } as any];
          }

          // ── Process tool calls ────────────────────────────────────────
          if (stopReason === 'tool_use' && toolUses.length > 0) {
            const toolResults: any[] = [];

            for (const tu of toolUses) {
              let toolResult = '';

              if (tu.name === 'lookup_price') {
                toolResult = await handleLookupPrice(tu.input as any);

              } else if (tu.name === 'save_lead') {
                toolResult = await handleSaveLead(tu.input, sessionId);

              } else if (tu.name === 'create_booking') {
                const createResult = await handleCreateBooking(tu.input);
                toolResult         = createResult.result;
                if (createResult.bookingRef) bookingRef = createResult.bookingRef;

              } else {
                toolResult = JSON.stringify({ error: `Unknown tool: ${tu.name}` });
              }

              toolResults.push({
                type:        'tool_result',
                tool_use_id: tu.id,
                content:     toolResult,
              });
            }

            // Add tool results as user turn
            currentMessages = [...currentMessages, { role: 'user', content: toolResults } as any];
            // Continue the loop for the model to process tool results
            continue;
          }

          // Stop reason is 'end_turn' or similar — we're done
          break;
        }

        // Send booking confirmation metadata if applicable
        if (bookingRef) {
          send({ bookingRef });
        }

        send({ done: true });
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));

      } catch (err: any) {
        console.error('[AI Assistant] Streaming error:', err?.message || err);
        // Send a safe user-facing error — never leak stack trace
        send({
          text: 'I apologise, I encountered a technical issue. Please try again in a moment, or contact us directly on WhatsApp: +966 54 870 7332.',
        });
        send({ done: true });
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type':  'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection':    'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
