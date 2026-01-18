import { format } from 'date-fns';

// --- Constants ---
const COMPANY_NAME = "Al Kiswah Transport";
const COMPANY_ADDRESS_1 = "Makkah Al Mukarramah";
const COMPANY_ADDRESS_2 = "Saudi Arabia";
const COMPANY_PHONE = "+966 54 549 4921";
const COMPANY_EMAIL = "bookings@alkiswahumrahtransport.com";
const COMPANY_WEBSITE = "www.alkiswahumrahtransport.com";

// Colors
const COLOR_PRIMARY = "#D4AF37"; // Gold
const COLOR_SECONDARY = "#000000"; // Black
const COLOR_TEXT_GRAY = "#64748b"; // Slate 500

export interface InvoiceData {
    id: string;
    date: Date | string;
    time?: string;
    pickup: string;
    dropoff: string;
    vehicle: string;
    vehicleCount: number;
    totalPrice: number;
    customerName: string;
    customerEmail?: string;
    customerPhone: string;
    status?: string;
}

export const generateBookingInvoice = async (data: InvoiceData) => {
    // Dynamic import to prevent build-time crashes (Node.js environment issues with canvas/window)
    const { default: jsPDF } = await import('jspdf');
    const { default: autoTable } = await import('jspdf-autotable');

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;

    // --- Header Section ---
    // Top Bar (Gold)
    doc.setFillColor(COLOR_PRIMARY);
    doc.rect(0, 0, pageWidth, 5, 'F');

    // Company Logo/Name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(COLOR_SECONDARY);
    doc.text("AL KISWAH", 20, 25);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setCharSpace(2); // Tracking
    doc.text("TRANSPORT SERVICES", 20, 31);
    doc.setCharSpace(0); // Reset

    // Invoice Label
    doc.setFontSize(32);
    doc.setTextColor(COLOR_PRIMARY);
    doc.text("INVOICE", pageWidth - 20, 30, { align: "right" });

    // Invoice Metadata
    doc.setFontSize(10);
    doc.setTextColor(COLOR_TEXT_GRAY);

    const metaStartY = 45;
    const metaLineHeight = 6;
    const metaRightX = pageWidth - 20;

    // Helper for right-aligned pairs
    const addMetaRow = (label: string, value: string, y: number) => {
        doc.setFont("helvetica", "normal");
        doc.text(label, metaRightX - 60, y, { align: "left" });
        doc.setFont("helvetica", "bold");
        doc.setTextColor(COLOR_SECONDARY);
        doc.text(value, metaRightX, y, { align: "right" });
        doc.setTextColor(COLOR_TEXT_GRAY); // Reset
    };

    const invoiceNum = data.id.length > 8 ? `INV-${data.id.slice(-6).toUpperCase()}` : `INV-${data.id}`;
    const invoiceDate = data.date instanceof Date ? format(data.date, 'dd MMM yyyy') : new Date(data.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    addMetaRow("Invoice No:", invoiceNum, metaStartY);
    addMetaRow("Date:", invoiceDate, metaStartY + metaLineHeight);
    addMetaRow("Status:", (data.status || "CONFIRMED").toUpperCase(), metaStartY + metaLineHeight * 2);

    // --- Bill To & From ---
    const addrStartY = 45;

    // From
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(COLOR_SECONDARY);
    doc.text("From:", 20, addrStartY);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(COLOR_TEXT_GRAY);
    doc.text(COMPANY_NAME, 20, addrStartY + 6);
    doc.text(COMPANY_ADDRESS_1, 20, addrStartY + 11);
    doc.text(COMPANY_ADDRESS_2, 20, addrStartY + 16);
    doc.text(COMPANY_PHONE, 20, addrStartY + 21);

    // To
    const billToY = addrStartY + 35;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(COLOR_SECONDARY);
    doc.text("Bill To:", 20, billToY);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(COLOR_TEXT_GRAY);
    doc.text(data.customerName, 20, billToY + 6);
    if (data.customerEmail) doc.text(data.customerEmail, 20, billToY + 11);
    doc.text(data.customerPhone, 20, billToY + 16);

    // --- Service Details Table ---
    const tableStartY = 100;

    // Construct description with date/time
    let description = `${data.vehicle} Transfer`;
    if (data.pickup) description += `\nPickup: ${data.pickup}`;
    if (data.dropoff) description += `\nDropoff: ${data.dropoff}`;
    // @ts-ignore
    if (data.time) description += `\nTime: ${data.time}`;

    const tableBody = [
        [
            description,
            data.vehicleCount.toString(),
            `SAR ${data.totalPrice / data.vehicleCount}`,
            `SAR ${data.totalPrice}`
        ]
    ];

    autoTable(doc, {
        startY: tableStartY,
        head: [['Service Description', 'Qty', 'Rate', 'Amount']],
        body: tableBody,
        theme: 'plain',
        headStyles: {
            fillColor: COLOR_SECONDARY,
            textColor: '#FFFFFF',
            fontStyle: 'bold',
            halign: 'left'
        },
        bodyStyles: {
            textColor: COLOR_SECONDARY,
            fontSize: 10,
            cellPadding: 6
        },
        columnStyles: {
            0: { cellWidth: 90 }, // Desc
            1: { cellWidth: 20, halign: 'center' }, // Qty
            2: { cellWidth: 30, halign: 'right' }, // Rate
            3: { cellWidth: 'auto', halign: 'right' } // Amount
        },
        didDrawPage: (data) => {
            // Header is already drawn
        }
    });

    // --- Totals ---
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    const totalsWidth = 70;
    const totalsX = pageWidth - 20 - totalsWidth;

    // Line separator
    doc.setDrawColor(226, 232, 240);
    doc.line(totalsX, finalY, pageWidth - 20, finalY);

    // Subtotal
    doc.setFont("helvetica", "normal");
    doc.setTextColor(COLOR_TEXT_GRAY);
    doc.text("Subtotal", totalsX, finalY + 8);
    doc.text(`SAR ${data.totalPrice}`, pageWidth - 20, finalY + 8, { align: "right" });

    // Total (Large)
    doc.setFillColor(COLOR_PRIMARY);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(COLOR_SECONDARY);
    doc.text("Total", totalsX, finalY + 20);
    doc.text(`SAR ${data.totalPrice}`, pageWidth - 20, finalY + 20, { align: "right" });

    // Tax Note
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(COLOR_TEXT_GRAY);
    doc.text("Includes all applicable taxes and fees.", pageWidth - 20, finalY + 28, { align: "right" });

    // --- Footer ---
    const footerY = doc.internal.pageSize.height - 30;

    // Footer Line
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(20, footerY, pageWidth - 20, footerY);

    doc.setFontSize(9);
    doc.setTextColor(COLOR_TEXT_GRAY);
    doc.text("Thank you for choosing Al Kiswah Transport.", 20, footerY + 8);

    doc.text(COMPANY_WEBSITE, 20, footerY + 14);
    doc.text(COMPANY_EMAIL, 20, footerY + 19);

    // Save
    doc.save(`Al-Kiswah-Receipt-${invoiceNum}.pdf`);
};
