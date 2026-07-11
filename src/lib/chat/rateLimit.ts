/**
 * src/lib/chat/rateLimit.ts
 *
 * Chat-specific rate limiting wrapper around the existing rateLimit() utility.
 * Two tiers:
 *   - Hourly : 20 messages / hour  per IP
 *   - Daily  : 60 messages / day   per IP
 *
 * Returns { allowed: boolean; message?: string }
 * The message is user-facing and includes the WhatsApp handoff link when tripped.
 */

import { rateLimit } from '@/lib/rate-limit';

const WHATSAPP = '+966 54 870 7332';
const WA_LINK  = `https://wa.me/966548707332`;

export interface ChatRateLimitResult {
  allowed: boolean;
  message?: string;
}

export async function checkChatRateLimit(ip: string): Promise<ChatRateLimitResult> {
  // ── Hourly bucket ────────────────────────────────────────────────────────
  const hourly = await rateLimit(ip, {
    interval: 60 * 60 * 1000, // 1 hour
    limit: 20,
    endpoint: 'ai_chat_hourly',
  });

  if (!hourly.success) {
    return {
      allowed: false,
      message:
        `I'm sorry, you've sent a lot of messages in the last hour — our service has a fair-use limit to keep costs sustainable. ` +
        `Please try again in an hour, or reach our team directly on WhatsApp for immediate help: [${WHATSAPP}](${WA_LINK}).`,
    };
  }

  // ── Daily bucket ─────────────────────────────────────────────────────────
  const daily = await rateLimit(ip, {
    interval: 24 * 60 * 60 * 1000, // 24 hours
    limit: 60,
    endpoint: 'ai_chat_daily',
  });

  if (!daily.success) {
    return {
      allowed: false,
      message:
        `Today's message limit has been reached for your connection. ` +
        `Please contact us directly on WhatsApp for assistance: [${WHATSAPP}](${WA_LINK}). ` +
        `JazakAllah khayran for your patience!`,
    };
  }

  return { allowed: true };
}
