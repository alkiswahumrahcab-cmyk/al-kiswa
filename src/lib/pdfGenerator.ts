import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import autoTable from 'jspdf-autotable';

// Global cache for the base64 encoded font
let cachedFontBase64: string | null = null;

export async function generateBookingPDF(booking: any): Promise<Buffer> {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
    });

    const goldColor = '#C9A86A';
    const blackColor = '#000000';
    const darkGray = '#333333';

    // Fonts
    try {
        if (!cachedFontBase64) {
            const fontUrl = 'https://raw.githubusercontent.com/googlefonts/noto-fonts/main/unhinted/ttf/NotoSansArabic/NotoSansArabic-Regular.ttf';
            const fontRes = await fetch(fontUrl);
            if (fontRes.ok) {
                const fontBuffer = await fontRes.arrayBuffer();
                cachedFontBase64 = Buffer.from(fontBuffer).toString('base64');
            }
        }
        if (cachedFontBase64) {
            doc.addFileToVFS('NotoArabic.ttf', cachedFontBase64);
            doc.addFont('NotoArabic.ttf', 'NotoArabic', 'normal');
        }
    } catch (e: any) {
        console.warn('Failed to load Arabic font:', e.message);
    }

    const setFontEn = (size: number, style: 'normal' | 'bold' = 'normal') => {
        doc.setFont('helvetica', style);
        doc.setFontSize(size);
    };

    const rawId = booking.id || booking.bookingId || booking._id?.toString() || 'N/A';
    const shortId = rawId !== 'N/A' ? (rawId.length > 8 ? `AK-${rawId.slice(-8).toUpperCase()}` : rawId.toUpperCase()) : 'N/A';
    
    // ==========================================
    // PAGE 1: INVOICE
    // ==========================================
    
    // Top Header Banner
    doc.setFillColor(201, 168, 106); // Gold
    doc.rect(0, 0, 210, 30, 'F');
    
    doc.setTextColor(255, 255, 255);
    setFontEn(24, 'bold');
    doc.text('AL KISWAH UMRAH TRANSPORT', 105, 16, { align: 'center' });
    setFontEn(12, 'normal');
    doc.text('GOLD TRANSFER', 105, 24, { align: 'center' });

    // Header Details
    doc.setTextColor(blackColor);
    
    // From Column
    setFontEn(10, 'bold');
    doc.text('From:', 14, 40);
    setFontEn(11, 'bold');
    doc.text('AL KISWAH UMRAH TRANSPORT', 14, 46);
    setFontEn(10, 'normal');
    doc.text('Makkah Saudi Arabia', 14, 52);
    doc.text('kiswahumrahcab.com', 14, 58);
    doc.text('+966-54-870-7332', 14, 64);

    // Bill To Column
    setFontEn(10, 'bold');
    doc.text('Bill To:', 90, 40);
    setFontEn(11, 'bold');
    doc.text(booking.name || 'Guest', 90, 46);
    setFontEn(10, 'normal');
    doc.text(`Phone: ${booking.phone || 'N/A'}`, 90, 52);
    doc.text(`Email: ${booking.email || 'N/A'}`, 90, 58);

    // Invoice Details Column
    setFontEn(10, 'bold');
    doc.text('Invoice No:', 150, 46);
    doc.text('Date:', 150, 52);
    doc.text('Status:', 150, 58);
    doc.text('Payment:', 150, 64);
    
    setFontEn(10, 'normal');
    doc.text(shortId, 175, 46);
    doc.text(new Date().toLocaleDateString('en-GB'), 175, 52);
    
    const paymentStatus = booking.paymentStatus?.toUpperCase() || 'UNPAID';
    if (paymentStatus === 'PAID') {
        doc.setTextColor(0, 128, 0); // Green
    } else {
        doc.setTextColor(200, 0, 0); // Red
    }
    doc.text(paymentStatus, 175, 58);
    
    doc.setTextColor(blackColor);
    doc.text(booking.paymentMethod || 'Cash', 175, 64);

    // Service Details Table
    const tableData: any[][] = [];
    let totalSAR = 0;
    
    const currency = booking.currency || 'SAR';
    const isUSD = currency === 'USD';
    const symbol = isUSD ? '$' : 'SAR';
    const exchangeRate = 3.75;
    const isPending = booking.price === 'Pending Quote';

    const legs = booking.legs && booking.legs.length > 0 ? booking.legs : [{
        pickup: booking.pickup,
        dropoff: booking.dropoff,
        date: booking.date,
        time: booking.time,
        price: booking.priceInSAR || booking.finalPrice
    }];

    const vehicleName = booking.vehicleName || booking.vehicle || 'Standard Vehicle';

    legs.forEach((leg: any, index: number) => {
        const hoursText = leg.hours ? ` (${leg.hours} Hours)` : '';
        const desc = `${leg.pickup || 'Unknown'} to ${leg.dropoff || 'Unknown'}${hoursText}`;
        const amountSAR = Number(leg.price || 0);
        totalSAR += amountSAR;
        
        let displayAmount: string = isUSD ? Math.round(amountSAR / exchangeRate).toString() : amountSAR.toString();
        if (isPending) displayAmount = 'TBD';

        tableData.push([
            (index + 1).toString(),
            desc,
            `${leg.date || ''} ${leg.time || ''}`,
            vehicleName,
            '1',
            displayAmount
        ]);
    });

    autoTable(doc, {
        startY: 80,
        head: [['#', 'Service Description', 'Date & Time', 'Vehicle', 'Qty', `Amount (${symbol})`]],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [0, 0, 0], textColor: 255, fontStyle: 'bold' },
        styles: { fontSize: 9, cellPadding: 4, halign: 'center' },
        columnStyles: {
            1: { halign: 'left' }
        }
    });

    const finalY = (doc as any).lastAutoTable.finalY + 10;

    // Totals Box
    const finalTotalSAR = Number(booking.finalPrice || booking.priceInSAR || totalSAR);
    const displaySubtotal = isPending ? 'TBD' : `${isUSD ? symbol : ''}${isUSD ? Math.round(totalSAR / exchangeRate) : totalSAR} ${!isUSD ? symbol : ''}`.trim();
    const displayFinalTotal = isPending ? 'Pending Quote' : `${isUSD ? symbol : ''}${isUSD ? Math.round(finalTotalSAR / exchangeRate) : finalTotalSAR} ${!isUSD ? symbol : ''}`.trim();

    doc.setFillColor(245, 245, 245);
    doc.rect(130, finalY, 66, 24, 'F');
    doc.setDrawColor(200, 200, 200);
    doc.rect(130, finalY, 66, 24, 'S');

    setFontEn(10, 'bold');
    doc.text('Subtotal:', 135, finalY + 8);
    doc.text(displaySubtotal, 190, finalY + 8, { align: 'right' });
    
    const discountSAR = Math.max(0, totalSAR - finalTotalSAR);
    if (!isPending && discountSAR > 0) {
        const displayDiscount = isUSD ? Math.round(discountSAR / exchangeRate) : discountSAR;
        doc.text('Discount:', 135, finalY + 15);
        doc.text(`-${isUSD ? symbol : ''}${displayDiscount} ${!isUSD ? symbol : ''}`.trim(), 190, finalY + 15, { align: 'right' });
    }

    doc.setFillColor(201, 168, 106); // Gold
    doc.rect(130, finalY + 18, 66, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text('Total:', 135, finalY + 24);
    doc.text(displayFinalTotal, 190, finalY + 24, { align: 'right' });

    // Terms and Conditions
    doc.setTextColor(blackColor);
    let currentY = finalY + 50;
    
    setFontEn(11, 'bold');
    doc.text('TERMS & CONDITION', 14, currentY);
    setFontEn(9, 'normal');
    const terms = [
        "1. All bookings are subject to availability and confirmation.",
        "2. Cancellation within 24 hours of pickup time is non-refundable.",
        "3. Toll gates, parking fees, and other miscellaneous charges are not included unless specified.",
        "4. AL KISWAH UMRAH TRANSPORT reserves the right to change the vehicle model within the same category if the selected vehicle is unavailable.",
        "5. The company is not responsible for any items left in the vehicle."
    ];
    
    currentY += 6;
    terms.forEach(term => {
        doc.text(term, 14, currentY);
        currentY += 5;
    });

    // ==========================================
    // PAGE 2: RULES & REGULATIONS
    // ==========================================
    doc.addPage();
    
    // Top Banner
    doc.setFillColor(0, 0, 0); // Black
    doc.rect(0, 0, 210, 25, 'F');
    doc.setTextColor(201, 168, 106); // Gold
    setFontEn(20, 'bold');
    doc.text('WELCOME TO AL KISWAH TRANSFER', 105, 16, { align: 'center' });

    doc.setTextColor(blackColor);
    setFontEn(14, 'bold');
    doc.text('Rules & Regulations:', 14, 40);

    setFontEn(10, 'normal');
    let ruleY = 50;
    const rules = [
        "• Maximum Wait Time: 90 Minutes at the Airport. Wait time begins from the flight's",
        "  actual arrival time.",
        "• We monitor all flight arrivals, so your driver will be there when you land.",
        "• Hotel Pickup: Maximum 20 minutes wait time from the scheduled pickup time.",
        "• Our driver will meet you at the Airport Arrivals holding a Name Sign.",
        "• If you encounter any issues finding the driver, please contact us immediately.",
        "• We do not provide child car seats. You must bring your own.",
        "• Consuming food or beverages inside the vehicle is strictly prohibited to maintain cleanliness.",
        "• Smoking is absolutely not allowed in the vehicle.",
        "• Any damages caused to the vehicle by the passenger will incur repair or cleaning charges."
    ];
    
    rules.forEach(rule => {
        doc.text(rule, 14, ruleY);
        ruleY += 6;
    });

    ruleY += 10;
    doc.setTextColor(220, 0, 0); // Red
    setFontEn(14, 'bold');
    doc.text('IMPORTANT - PLEASE READ CAREFULLY', 14, ruleY);
    
    doc.setTextColor(blackColor);
    setFontEn(10, 'normal');
    ruleY += 10;
    
    const importantRules = [
        "1. Vehicle Capacity:",
        "   - Toyota Camry / Hyundai Sonata: Max 4 Passengers & 3 Medium Bags.",
        "   - GMC Yukon / Chevrolet Tahoe: Max 7 Passengers & 7 Medium Bags.",
        "   - Hyundai Staria / H1: Max 7 Passengers & 7 Medium Bags.",
        "   - Toyota Hiace: Max 10 Passengers & 10 Medium Bags.",
        "   - Ford Transit: Max 12 Passengers & 12 Medium Bags.",
        "   - VIP Coaster Bus: Max 20 Passengers & 20 Medium Bags.",
        "",
        "2. Luggage Policy:",
        "   - Please adhere to the luggage limits. Overloading is not permitted.",
        "   - If you have extra luggage, you must inform us in advance to arrange a suitable vehicle.",
        "   - Additional charges may apply for a larger or extra vehicle.",
        "",
        "3. Ziyarat & Hourly Bookings:",
        "   - Ziyarat (City Tour) duration is 3 Hours.",
        "   - Any extra hour will be charged at 50 SAR per hour.",
        "   - The driver will strictly follow the agreed Ziyarat itinerary.",
        "   - Any deviation or extra stops requested by the passenger may incur additional charges."
    ];

    importantRules.forEach(line => {
        if (line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.')) {
            setFontEn(10, 'bold');
        } else {
            setFontEn(10, 'normal');
        }
        doc.text(line, 14, ruleY);
        ruleY += 6;
    });

    // Footer bottom page 2
    doc.setFillColor(201, 168, 106); // Gold
    doc.rect(0, 280, 210, 17, 'F');
    doc.setTextColor(255, 255, 255);
    setFontEn(10, 'bold');
    doc.text('Contact: +966-54-870-7332   |   Email: booking@kiswahumrahcab.com   |   Web: kiswahumrahcab.com', 105, 289, { align: 'center' });

    const pdfOutput = doc.output('arraybuffer');
    return Buffer.from(pdfOutput);
}
