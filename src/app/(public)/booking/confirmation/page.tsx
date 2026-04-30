'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Download, Home, FileText } from 'lucide-react';
import Link from 'next/link';

function ConfirmationContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [bookingData, setBookingData] = useState<any>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (id) {
            // In a real app we might fetch the exact booking data from an endpoint
            // For now we'll just show the ID
            setBookingData({ id });
        }
    }, [id]);

    const handleDownloadReceipt = async () => {
        if (!bookingData) return;
        setIsGenerating(true);
        try {
            const { generateBookingInvoice } = await import('@/lib/pdf-generator');
            
            // We should ideally fetch the full booking details, 
            // but for fallback we pass minimal data if we don't have it.
            // Let's assume there is an endpoint `/api/bookings/${id}` we can fetch from:
            const res = await fetch(`/api/bookings`);
            const allBookings = await res.json();
            const booking = allBookings.find((b: any) => b._id === id || b.id === id);

            if (booking) {
                await generateBookingInvoice({
                    id: booking._id || booking.id,
                    date: booking.date,
                    time: booking.time,
                    pickup: booking.pickup,
                    dropoff: booking.dropoff,
                    vehicle: booking.vehicle || 'Umrah Transport',
                    vehicleCount: booking.vehicleCount || 1,
                    totalPrice: booking.priceInSAR || 0,
                    customerName: booking.name,
                    customerEmail: booking.email,
                    customerPhone: booking.phone,
                    status: booking.status,
                    currency: booking.currency || 'SAR',
                    formattedTotal: booking.priceInSelectedCurrency || booking.priceInSAR,
                });
            } else {
                alert('Could not retrieve full booking details for the receipt.');
            }
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate receipt. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    if (!id) {
        return (
            <div className="text-center py-20">
                <p className="text-white">Invalid booking ID.</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto px-4 py-20 text-center">
            <div className="bg-primary-black/80 backdrop-blur-xl rounded-[2rem] border border-white/10 p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} className="text-green-500" />
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Booking Confirmed!</h1>
                <p className="text-gray-400 mb-2">Thank you for choosing Al Kiswah Transport.</p>
                <p className="text-gray-400 mb-8">Your booking reference is: <span className="text-white font-bold">{id.slice(-8).toUpperCase()}</span></p>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 text-left">
                    <h3 className="text-gold-primary font-bold uppercase tracking-widest text-sm mb-4">Next Steps</h3>
                    <ul className="space-y-3 text-gray-300 text-sm">
                        <li className="flex items-start gap-2">
                            <CheckCircle2 size={16} className="text-gold-primary mt-0.5 shrink-0" />
                            <span>You will receive a confirmation email shortly.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle2 size={16} className="text-gold-primary mt-0.5 shrink-0" />
                            <span>Our team will contact you via WhatsApp to coordinate pickup details.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle2 size={16} className="text-gold-primary mt-0.5 shrink-0" />
                            <span>Please keep your receipt handy for your records.</span>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <button
                        onClick={handleDownloadReceipt}
                        disabled={isGenerating}
                        className="w-full md:w-auto px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                    >
                        {isGenerating ? (
                            <span className="animate-pulse">Generating...</span>
                        ) : (
                            <>
                                <Download size={18} />
                                Download Receipt
                            </>
                        )}
                    </button>
                    
                    <Link
                        href="/"
                        className="w-full md:w-auto px-8 py-3 bg-gold-primary hover:bg-amber-500 text-black rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                    >
                        <Home size={18} />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function ConfirmationPage() {
    return (
        <main className="min-h-screen bg-black pt-24 pb-12">
            <Suspense fallback={<div className="text-center py-20 text-white">Loading...</div>}>
                <ConfirmationContent />
            </Suspense>
        </main>
    );
}
