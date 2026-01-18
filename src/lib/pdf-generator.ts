import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
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
const COLOR_BORDER = "#e2e8f0"; // Slate 200

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

export const generateBookingInvoice = (data: InvoiceData) => {
    console.log("PDF generation temporarily disabled for build debug");
    /*
    const doc = new jsPDF();
    // ... rest of code
    doc.save(`Al-Kiswah-Receipt-${invoiceNum}.pdf`);
    */
};
