/**
 * src/lib/chat/tools.ts
 *
 * Anthropic tool schemas for the Al Kiswah AI assistant.
 *
 * Tools:
 *   - create_booking : collect all required fields then persist a real Booking
 *   - lookup_price   : return accurate price from pricing.json (no hallucination)
 *   - save_lead      : persist partial contact info early (lead capture)
 */

// We use the raw Anthropic Tool type shape; import it as a plain interface
// to avoid circular dependency with the Anthropic SDK import in the route.
export interface ToolDefinition {
  name: string;
  description: string;
  input_schema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

export const ASSISTANT_TOOLS: ToolDefinition[] = [
  // ── 1. create_booking ─────────────────────────────────────────────────
  {
    name: 'create_booking',
    description: `
Creates a confirmed booking in the Al Kiswah system.

IMPORTANT: You MUST collect ALL of the following required fields from the customer through natural conversation BEFORE calling this tool:
- name (customer's full name)
- email (valid email address)
- phone (with country code, e.g. +44...)
- pickup (full pickup location, e.g. "Jeddah Airport Terminal 1" or "Hilton Makkah")
- dropoff (full drop-off location)
- date (travel date in YYYY-MM-DD format)
- time (pick-up time in HH:MM 24-hour format, e.g. "14:30")
- vehicle (vehicle type key: camry | gmc | staria | starex | hiace | coaster | xpander | k5)
- passengers (number of passengers as an integer)

Always read back the collected details to the customer and ask for confirmation before calling this tool.

After a successful booking, share the booking reference and remind the customer that payment is cash on arrival.
`.trim(),
    input_schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: "Customer's full name",
        },
        email: {
          type: 'string',
          description: "Customer's email address",
        },
        phone: {
          type: 'string',
          description: 'Phone number with country code, e.g. +447911123456',
        },
        pickup: {
          type: 'string',
          description: 'Full pickup location (airport terminal, hotel name, or city)',
        },
        dropoff: {
          type: 'string',
          description: 'Full drop-off location',
        },
        date: {
          type: 'string',
          description: 'Travel date in YYYY-MM-DD format',
        },
        time: {
          type: 'string',
          description: 'Pick-up time in HH:MM 24-hour format (e.g. "14:30")',
        },
        vehicle: {
          type: 'string',
          enum: ['camry', 'gmc', 'staria', 'starex', 'hiace', 'coaster', 'xpander', 'k5'],
          description: 'Vehicle type identifier. Recommend based on group size.',
        },
        passengers: {
          type: 'integer',
          minimum: 1,
          maximum: 50,
          description: 'Number of passengers',
        },
        nationality: {
          type: 'string',
          description: "Customer's nationality (optional)",
        },
        visaType: {
          type: 'string',
          description: 'Visa type: Umrah, Hajj, Tourist, etc. (optional)',
        },
        flightNumber: {
          type: 'string',
          description: 'Flight number for airport pickups so driver can track the flight (optional)',
        },
        arrivalDate: {
          type: 'string',
          description: 'Flight arrival date if different from travel date (optional)',
        },
        notes: {
          type: 'string',
          description:
            'Special requests: child seat, wheelchair, Miqat stop, extra luggage, etc. (optional)',
        },
        country: {
          type: 'string',
          description: "Customer's country of origin (optional)",
        },
        currency: {
          type: 'string',
          enum: ['SAR', 'USD'],
          description: 'Preferred currency (optional, defaults to SAR)',
        },
      },
      required: ['name', 'email', 'phone', 'pickup', 'dropoff', 'date', 'time', 'vehicle', 'passengers'],
    },
  },

  // ── 2. lookup_price ───────────────────────────────────────────────────
  {
    name: 'lookup_price',
    description: `
Looks up the exact, real price for a transport route from our pricing data.

CRITICAL RULE — NEVER quote a price to the customer without calling this tool first.

WHEN TO CALL:
• Customer named a vehicle → call with { pickup, dropoff, vehicle } and quote the returned priceSAR exactly.
• Customer did NOT name a vehicle → ask how many passengers are travelling (one friendly question), then call with { pickup, dropoff, passengers } (omit vehicle). The tool will return a recommended vehicle with price and up to two alternatives. Present the recommendation warmly with one short human reason ("the Staria gives your family of six proper room plus luggage space"), then offer to compare alternatives on request.
• Never call with a vehicle key unless the customer has explicitly chosen or confirmed that vehicle.

AFTER THE TOOL RETURNS:
• If the response includes "recommended": present that vehicle + price as your primary suggestion.
• If "alternatives" are present: mention them briefly only if the customer asks or if there is a big price difference worth flagging.
• If "found: false": be honest — "I don't have a listed price for that route" — and offer WhatsApp: +966 54 870 7332.
• If the requested vehicle key is not in the route's prices: say it isn't listed for that route, offer the closest available option.
• Once the customer confirms a vehicle, carry it into the booking as the "vehicle" field.

TONE: Helpful host, not a spec-sheet. One clear recommendation, warmly explained. Never paste the full price table unprompted.
`.trim(),
    input_schema: {
      type: 'object',
      properties: {
        pickup: {
          type: 'string',
          description: 'Pickup location keyword, e.g. "Jeddah Airport", "Makkah", "Madinah", "Taif"',
        },
        dropoff: {
          type: 'string',
          description: 'Drop-off location keyword, e.g. "Makkah hotel", "Jeddah Airport", "Madinah hotel"',
        },
        vehicle: {
          type: 'string',
          enum: ['camry', 'gmc', 'staria', 'starex', 'hiace', 'coaster', 'xpander', 'k5'],
          description: 'Specific vehicle key — include ONLY if the customer has explicitly named or confirmed this vehicle',
        },
        passengers: {
          type: 'integer',
          minimum: 1,
          maximum: 50,
          description: 'Number of passengers — include when known so the tool can return a smart vehicle recommendation',
        },
        preference: {
          type: 'string',
          enum: ['economy', 'comfort', 'vip'],
          description: 'Customer preference if stated: economy (cheapest), comfort (standard), vip (premium/luxury)',
        },
      },
      required: ['pickup', 'dropoff'],
    },
  },

  // ── 3. save_lead ──────────────────────────────────────────────────────
  {
    name: 'save_lead',
    description: `
Saves partial customer information as a draft lead in the database.

Call this tool as soon as the customer shares ANY of their contact details (name, email, OR phone number), even before the full booking flow is complete. This ensures we capture the lead even if the customer abandons the conversation.

Do NOT wait for all booking details before calling this — the earlier the better.
`.trim(),
    input_schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: "Customer's name (if collected)",
        },
        email: {
          type: 'string',
          description: "Customer's email (if collected)",
        },
        phone: {
          type: 'string',
          description: "Customer's phone number (if collected)",
        },
        pickup: {
          type: 'string',
          description: 'Pickup location if mentioned',
        },
        dropoff: {
          type: 'string',
          description: 'Drop-off location if mentioned',
        },
        date: {
          type: 'string',
          description: 'Travel date if mentioned',
        },
        vehicle: {
          type: 'string',
          description: 'Vehicle preference if mentioned',
        },
        passengers: {
          type: 'integer',
          description: 'Passenger count if mentioned',
        },
        notes: {
          type: 'string',
          description: 'Any other details the customer has shared',
        },
        sessionId: {
          type: 'string',
          description: 'Chat session ID for deduplication',
        },
      },
      required: [],
    },
  },
];
