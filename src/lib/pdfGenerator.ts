import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

// ─────────────────────────────────────────────────────────────────────────────
// RTL Helpers for jsPDF (which does NOT support bidi / RTL natively)
//
// jsPDF renders text left-to-right at the glyph level. To display Arabic
// correctly (right-to-left) we must reverse the WORD order of Arabic text
// so that when jsPDF places the words LTR, a reader scanning RTL sees
// the intended reading order.
//
// CRITICAL: English words, numbers, and punctuation must NOT be reversed
// among themselves — only the overall Arabic word sequence is flipped.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Reverse word order for a pure-Arabic string.
 * Use ONLY for strings that are entirely Arabic (section titles, labels).
 * Never pass mixed Arabic+English strings here.
 */
function rtl(text: string): string {
    if (!text) return '';
    return text.split(' ').reverse().join(' ');
}

/**
 * Smart RTL for values that may be Arabic, English, numeric, or mixed.
 * - Pure Arabic  → reverse word order (so jsPDF LTR renders correct RTL).
 * - Contains Latin letters → keep as-is (English names, emails, routes).
 * - Pure numbers / symbols → keep as-is.
 */
function rtlValue(value: string): string {
    if (!value) return '—';
    const hasArabic = /[\u0600-\u06FF]/.test(value);
    const hasLatin  = /[a-zA-Z]/.test(value);

    if (hasArabic && !hasLatin) {
        // Pure Arabic (possibly with digits / punctuation) — reverse words
        return value.split(' ').reverse().join(' ');
    }
    return value;
}

// Global cache for the base64 encoded font to avoid duplicate network fetches in serverless environments
let cachedFontBase64: string | null = null;

export async function generateBookingPDF(booking: any): Promise<Buffer> {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
    });

    // 1. Fetch and add Arabic font (Noto Sans Arabic) dynamically to avoid bundle bloat (cached globally for hot containers)
    try {
        if (!cachedFontBase64) {
            console.log('[PDF Generator] 🌐 Fetching Noto Sans Arabic font from CDN...');
            const fontUrl = 'https://raw.githubusercontent.com/googlefonts/noto-fonts/main/unhinted/ttf/NotoSansArabic/NotoSansArabic-Regular.ttf';
            const fontRes = await fetch(fontUrl);
            if (!fontRes.ok) throw new Error(`HTTP error! status: ${fontRes.status}`);
            const fontBuffer = await fontRes.arrayBuffer();
            cachedFontBase64 = Buffer.from(fontBuffer).toString('base64');
            console.log('[PDF Generator] ✅ Font fetched and cached successfully.');
        } else {
            console.log('[PDF Generator] ⚡ Using cached Noto Sans Arabic font.');
        }
        
        doc.addFileToVFS('NotoArabic.ttf', cachedFontBase64);
        doc.addFont('NotoArabic.ttf', 'NotoArabic', 'normal');
    } catch (e: any) {
        console.warn('[PDF Generator] ⚠️ Failed to load Arabic font from CDN, falling back to default:', e.message);
    }

    const goldColor = '#C9A86A';
    const blackColor = '#000000';
    
    // Setup typography helpers
    const setFontEn = (size: number, style: 'normal' | 'bold' = 'normal') => {
        doc.setFont('helvetica', style);
        doc.setFontSize(size);
    };
    
    const setFontAr = (size: number) => {
        doc.setFont('NotoArabic', 'normal');
        doc.setFontSize(size);
    };

    // --- WATERMARK ---
    doc.setTextColor(240, 240, 240); // Very light grey
    setFontEn(45, 'bold');
    doc.text('Al Kiswah Umrah Transport', 105, 150, { align: 'center', angle: 45 });

    // --- HEADER ---
    doc.setTextColor(blackColor);
    setFontEn(18, 'bold');
    doc.text('Al Kiswah Umrah Cab', 105, 20, { align: 'center' });
    
    setFontEn(12, 'normal');
    doc.text('Official Booking Receipt', 105, 28, { align: 'center' });
    
    setFontAr(14);
    doc.text(rtl('إيصال الحجز الرسمي'), 105, 36, { align: 'center' });

    const shortId = booking.id || booking.bookingId || booking._id?.toString() || 'N/A';
    
    setFontEn(10, 'bold');
    doc.text(`Receipt No: ${shortId}`, 14, 45);
    
    // Arabic receipt number — label and value rendered separately to avoid scrambling
    setFontAr(12);
    doc.text(rtl('رقم الإيصال'), 196, 42, { align: 'right' });
    setFontAr(9);
    doc.text(shortId, 196, 48, { align: 'right' });

    // QR Code
    try {
        const baseUrl = process.env.BASE_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://kiswahumrahcab.com';
        const qrUrl = `${baseUrl}/receipt/${shortId}`;
        const qrDataUrl = await QRCode.toDataURL(qrUrl, { margin: 1, color: { dark: '#000000', light: '#FFFFFF' } });
        doc.addImage(qrDataUrl, 'PNG', 160, 10, 35, 35);
    } catch (e) {
        console.warn('QR Code generation failed', e);
    }

    // Divider
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.5);
    doc.line(14, 52, 196, 52);

    let startY = 60;

    // ─────────────────────────────────────────────────────────────────────
    // Helper to draw bilingual two-column sections
    // English column on the left, Arabic column on the right.
    //
    // Arabic rendering strategy:
    //   1. Arabic LABEL is rendered right-aligned at x=190  (using rtl())
    //   2. VALUE is rendered right-aligned at x=140          (using rtlValue())
    //   This keeps label and value as independent text calls,
    //   completely avoiding the mixed-script scrambling bug.
    // ─────────────────────────────────────────────────────────────────────
    const drawSection = (
        y: number,
        titleEn: string,
        titleAr: string,
        linesEn: [string, string][],
        linesAr: [string, string][]
    ) => {
        // Calculate dynamic height
        const linesCount = Math.max(linesEn.length, linesAr.length);
        const boxHeight = 24 + (linesCount * 8); // Increased padding
        
        // Background Box (Transparent with borders so watermark shows through)
        doc.setDrawColor(230, 230, 230);
        doc.roundedRect(14, y, 182, boxHeight, 3, 3, 'S'); // 'S' is Stroke only

        // Headers
        doc.setTextColor(goldColor);
        setFontEn(11, 'bold');
        doc.text(titleEn, 20, y + 8);
        
        setFontAr(12);
        doc.text(rtl(titleAr), 190, y + 8, { align: 'right' });

        doc.setTextColor(blackColor);
        
        // English Column (Left)
        let curY = y + 18;
        linesEn.forEach(([label, value]) => {
            setFontEn(9, 'bold');
            doc.text(`${label}: `, 20, curY);
            const w = doc.getTextWidth(`${label}: `);
            setFontEn(9, 'normal');
            doc.text(`${value || '—'}`, 20 + w, curY);
            curY += 8;
        });

        // Arabic Column (Right) — label and value rendered SEPARATELY
        curY = y + 18;
        linesAr.forEach(([label, value]) => {
            // 1. Arabic label — right-aligned at the right margin
            setFontAr(10);
            const renderedLabel = rtl(label);
            doc.text(renderedLabel, 190, curY, { align: 'right' });

            // 2. Colon separator — placed to the left of the label
            const labelWidth = doc.getTextWidth(renderedLabel);
            setFontEn(9, 'normal');
            doc.text(':', 190 - labelWidth - 1, curY);

            // 3. Value — right-aligned further left, using rtlValue for Arabic values
            const colonX = 190 - labelWidth - 3;
            setFontAr(9);
            const renderedValue = rtlValue(value || '—');
            doc.text(renderedValue, colonX, curY, { align: 'right' });

            curY += 8;
        });

        return y + boxHeight + 8; // return next Y pos
    };

    // --- 1. CUSTOMER INFORMATION ---
    startY = drawSection(startY, 
        'Customer Information', 'معلومات العميل',
        [
            ['Full Name', booking.name],
            ['Phone', booking.phone],
            ['Email', booking.email],
            ['Nationality', booking.nationality || '—']
        ],
        [
            ['الاسم الكامل', booking.name],
            ['رقم الجوال', booking.phone],
            ['البريد الإلكتروني', booking.email],
            ['الجنسية', booking.nationality || '—']
        ]
    );

    // --- 2. BOOKING DETAILS ---
    startY = drawSection(startY, 
        'Booking Details', 'تفاصيل الحجز',
        [
            ['Booking ID', shortId],
            ['Pickup', booking.pickup],
            ['Drop-off', booking.dropoff],
            ['Route', booking.routeName || booking.route || `${booking.pickup} to ${booking.dropoff}`],
            ['Vehicle', booking.vehicleName || booking.vehicle],
            ['Passengers', `${booking.passengers}`],
            ['Travel Date', booking.date],
            ['Travel Time', booking.time],
            ['Notes', booking.notes || '—']
        ],
        [
            ['رقم الحجز', shortId],
            ['موقع الاستلام', booking.pickup],
            ['موقع الوصول', booking.dropoff],
            ['المسار', booking.routeName || booking.route || `${booking.pickup} to ${booking.dropoff}`],
            ['المركبة', booking.vehicleName || booking.vehicle],
            ['عدد الركاب', `${booking.passengers}`],
            ['تاريخ الرحلة', booking.date],
            ['وقت الرحلة', booking.time],
            ['ملاحظات', booking.notes || '—']
        ]
    );

    // --- 3. FARE SUMMARY ---
    // Detect currency from booking object or raw price string
    const rawFare = String(booking.totalAmount || booking.price || '0');
    const isUSD = booking.currency === 'USD' || rawFare.includes('USD') || rawFare.includes('$');
    const currencyEn = isUSD ? 'USD' : 'SAR';
    const currencyAr = isUSD ? 'دولار' : 'ريال';
    
    // Sanitize fare value
    const fareNumeric = rawFare.replace(/[^0-9.,]/g, '').trim() || '0';
    const paymentMethod = booking.paymentMethod || 'Cash / Card on Arrival';

    startY = drawSection(startY,
        'Fare Summary', 'ملخص الأجرة',
        [
            ['Base Fare', `${fareNumeric} ${currencyEn}`],
            ['Additional', `0 ${currencyEn}`],
            ['Total Fare', `${fareNumeric} ${currencyEn}`],
            ['Payment', paymentMethod]
        ],
        [
            ['الأجرة الأساسية', `${fareNumeric} ${currencyAr}`],
            ['الرسوم الإضافية', `0 ${currencyAr}`],
            ['إجمالي الأجرة', `${fareNumeric} ${currencyAr}`],
            ['طريقة الدفع', 'نقداً / بطاقة عند الوصول']
        ]
    );

    // --- FOOTER ---
    const pageHeight = doc.internal.pageSize.height;
    
    // Bottom divider
    doc.setDrawColor(220, 220, 220);
    doc.line(14, pageHeight - 45, 196, pageHeight - 45);

    doc.setTextColor(100, 100, 100); // Muted grey text
    
    // English Footer
    setFontEn(9, 'normal');
    doc.text('Thank you for choosing Al Kiswah Umrah Cab.', 105, pageHeight - 35, { align: 'center' });
    doc.text('We wish you a blessed and safe Umrah journey.', 105, pageHeight - 30, { align: 'center' });
    
    // Arabic Footer
    setFontAr(10);
    doc.text(rtl('شكرًا لاختياركم شركة الكسوة لسيارات العمرة'), 105, pageHeight - 22, { align: 'center' });
    doc.text(rtl('نتمنى لكم رحلة عمرة مباركة وآمنة'), 105, pageHeight - 17, { align: 'center' });

    // Contacts & Timestamp
    setFontEn(8, 'normal');
    doc.text('Support WhatsApp: +966-54-870-7332  |  Website: kiswahumrahcab.com', 105, pageHeight - 8, { align: 'center' });
    doc.text(`Generated: ${new Date().toLocaleString()}`, 105, pageHeight - 4, { align: 'center' });

    const pdfOutput = doc.output('arraybuffer');
    return Buffer.from(pdfOutput);
}
