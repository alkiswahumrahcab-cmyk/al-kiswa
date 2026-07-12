/**
 * src/app/api/assistant/route.ts
 *
 * Streaming POST endpoint for the Al Kiswah AI assistant — GUIDE-ONLY MODE.
 *
 * Flow:
 *   1. Rate-limit check (IP)
 *   2. Build cached system prompt (knowledge base — no live pricing dependency)
 *   3. Call Claude with streaming (no tools — guide only)
 *   4. Stream text to client as SSE
 *   5. Never leak API key or stack traces to client
 *
 * Tools removed (create_booking, lookup_price, save_lead) — the assistant is a
 * conversational guide. All pricing and booking is handled by the booking page.
 */

import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { checkChatRateLimit } from '@/lib/chat/rateLimit';
import { buildSystemBlocks } from '@/lib/chat/systemPrompt';

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

  const { messages = [] } = body;

  if (!messages.length) {
    return new Response(JSON.stringify({ error: 'No messages provided' }), { status: 400 });
  }

  // Validate and sanitise message structure
  const sanitizedMessages = messages
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .filter((m) => typeof m.content === 'string' && m.content.trim().length > 0)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));

  if (!sanitizedMessages.length) {
    return new Response(JSON.stringify({ error: 'No valid messages' }), { status: 400 });
  }

  // ── Build system blocks (sync — no DB dependency in guide mode) ─────────
  const systemBlocks = buildSystemBlocks();

  // ── Create streaming response ────────────────────────────────────────────
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: object) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      try {
        // Single streaming call — no tool loop needed in guide-only mode
        const response = await anthropic.messages.create({
          model:      'claude-haiku-4-5',
          max_tokens: 300,
          system:     systemBlocks as any,
          messages:   sanitizedMessages as any,
          stream:     true,
        });

        // Stream text tokens directly to the client
        for await (const event of response) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            send({ text: event.delta.text });
          }
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
      'Content-Type':      'text/event-stream',
      'Cache-Control':     'no-cache, no-transform',
      'Connection':        'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
