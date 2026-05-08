import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

// RTL helper as per requirements
function rtl(text: string) {
    if (!text) return '';
    return text.split(' ').reverse().join(' ');
}

export async function generateBookingPDF(booking: any): Promise<Buffer> {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
    });

    // 1. Fetch and add Arabic font (Noto Sans Arabic) dynamically to avoid bundle bloat
    try {
        const fontUrl = 'https://raw.githubusercontent.com/googlefonts/noto-fonts/main/unhinted/ttf/NotoSansArabic/NotoSansArabic-Regular.ttf';
        const fontRes = await fetch(fontUrl);
        const fontBuffer = await fontRes.arrayBuffer();
        
        // Convert to base64 for jsPDF VFS
        const base64Font = Buffer.from(fontBuffer).toString('base64');
        doc.addFileToVFS('NotoArabic.ttf', base64Font);
        doc.addFont('NotoArabic.ttf', 'NotoArabic', 'normal');
    } catch (e) {
        console.warn('Failed to load Arabic font from CDN, falling back to default', e);
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
    setFontAr(12);
    doc.text(rtl(`رقم الإيصال: ${shortId}`), 196, 45, { align: 'right' });

    // QR Code
    try {
        const baseUrl = process.env.BASE_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://alkiswahumrahcab.com';
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

    // Helper to draw two-column sections
    const drawSection = (y: number, titleEn: string, titleAr: string, linesEn: [string, string][], linesAr: [string, string][]) => {
        // Calculate dynamic height
        const linesCount = Math.max(linesEn.length, linesAr.length);
        const boxHeight = 16 + (linesCount * 8);
        
        // Background Box (Light Grey, Soft borders)
        doc.setFillColor(248, 248, 248);
        doc.setDrawColor(230, 230, 230);
        doc.roundedRect(14, y, 182, boxHeight, 3, 3, 'FD');

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

        // Arabic Column (Right)
        curY = y + 18;
        linesAr.forEach(([label, value]) => {
            setFontAr(10);
            doc.text(rtl(`${value || '—'} :${label}`), 190, curY, { align: 'right' });
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
            ['المسار', booking.routeName || booking.route || `${booking.pickup} إلى ${booking.dropoff}`],
            ['المركبة', booking.vehicleName || booking.vehicle],
            ['عدد الركاب', `${booking.passengers}`],
            ['تاريخ الرحلة', booking.date],
            ['وقت الرحلة', booking.time],
            ['ملاحظات', booking.notes || '—']
        ]
    );

    // --- 3. FARE SUMMARY ---
    const baseFare = booking.totalAmount || booking.price || '0';
    const paymentMethod = booking.paymentMethod || 'Cash / Card on Arrival';
    const paymentMethodAr = 'نقداً / بطاقة عند الوصول';

    startY = drawSection(startY,
        'Fare Summary', 'ملخص الأجرة',
        [
            ['Base Fare', `${baseFare} SAR`],
            ['Additional', '0 SAR'],
            ['Total Fare', `${baseFare} SAR`],
            ['Payment', paymentMethod]
        ],
        [
            ['الأجرة الأساسية', `${baseFare} ريال`],
            ['الرسوم الإضافية', '0 ريال'],
            ['إجمالي الأجرة', `${baseFare} ريال`],
            ['طريقة الدفع', paymentMethodAr]
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
    doc.text(rtl('شكرًا لاختياركم شركة الكسوة لسيارات العمرة.'), 105, pageHeight - 22, { align: 'center' });
    doc.text(rtl('نتمنى لكم رحلة عمرة مباركة وآمنة.'), 105, pageHeight - 17, { align: 'center' });

    // Contacts & Timestamp
    setFontEn(8, 'normal');
    doc.text(`Support WhatsApp: +966-54-870-7332  |  Website: alkiswahumrahcab.com`, 105, pageHeight - 8, { align: 'center' });
    doc.text(`Generated: ${new Date().toLocaleString()}`, 105, pageHeight - 4, { align: 'center' });

    const pdfOutput = doc.output('arraybuffer');
    return Buffer.from(pdfOutput);
}
