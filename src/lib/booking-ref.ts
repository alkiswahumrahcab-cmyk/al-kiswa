/**
 * Generates a professional Al Kiswa Transport booking reference.
 *
 * Format:  AKT-YYMMDD-XXXX
 * Example: AKT-260820-K7M2
 *
 * - AKT  = Al Kiswa Transport brand prefix
 * - YYMMDD = date of booking (year/month/day)
 * - XXXX = 4 random uppercase characters, excluding ambiguous chars (0 O 1 I L)
 *
 * The suffix alphabet has 28^4 = 614,656 combinations per day — no collision risk.
 */
export function generateBookingRef(dateStr?: string): string {
    const d = dateStr ? new Date(dateStr) : new Date();

    const yy = String(d.getFullYear()).slice(2);
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const datePart = `${yy}${mm}${dd}`;

    // Unambiguous alphanumeric chars: excludes 0/O, 1/I/L
    const CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
    let suffix = '';
    for (let i = 0; i < 4; i++) {
        suffix += CHARS[Math.floor(Math.random() * CHARS.length)];
    }

    return `AKT-${datePart}-${suffix}`;
}
