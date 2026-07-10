'use client';

import React, { useState, useRef, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle, X, Printer, MessageCircle, Home,
    Copy, Check, MapPin, Calendar, Clock, Users, Car,
    Download, User
} from 'lucide-react';
import Image from 'next/image';

interface BookingSuccessModalProps {
    isOpen: boolean;
    bookingData: {
        bookingId: string;
        name: string;
        email: string;
        phone: string;
        pickup: string;
        dropoff: string;
        date: string;
        time: string;
        vehicleName: string;
        passengers: number;
        currency: string;
        totalAmount: number | string;
    };
    onClose: () => void;
    whatsappNumber: string;
}

export default function BookingSuccessModal({
    isOpen,
    bookingData,
    onClose,
    whatsappNumber = '966548707332',
}: BookingSuccessModalProps) {
    const [copied, setCopied] = useState(false);
    const receiptRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // No scroll locking needed since it is inline content

    const copyBookingId = () => {
        navigator.clipboard.writeText(bookingData.bookingId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const pickup  = bookingData.pickup  || '—';
    const dropoff = bookingData.dropoff && bookingData.dropoff.toLowerCase() !== 'destination'
        ? bookingData.dropoff
        : null;

    const whatsappMessage = encodeURIComponent(
        `✅ Booking Confirmed — Al Kiswah Transport\n` +
        `────────────────────\n` +
        `📋 Booking ID: #${bookingData.bookingId}\n` +
        `👤 Name: ${bookingData.name}\n` +
        `📍 From: ${pickup}\n` +
        (dropoff ? `📍 To: ${dropoff}\n` : '') +
        `📅 Date: ${bookingData.date} at ${bookingData.time}\n` +
        `🚗 Vehicle: ${bookingData.vehicleName}\n` +
        `👥 Passengers: ${bookingData.passengers}\n` +
        `💰 Total: ${bookingData.totalAmount} ${bookingData.currency}\n` +
        `────────────────────\n` +
        `Please confirm this booking. JazakAllah Khair!`
    );
    const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

    const formattedDate = (() => {
        try {
            return new Date(bookingData.date).toLocaleDateString('en-GB', {
                year: 'numeric', month: 'long', day: 'numeric',
            });
        } catch {
            return bookingData.date;
        }
    })();

    const currencySymbol = bookingData.currency === 'USD' ? '$'
        : bookingData.currency === 'EUR' ? '€'
        : bookingData.currency === 'GBP' ? '£'
        : '';
    const currencySuffix = bookingData.currency === 'SAR' ? ' SAR' : '';
    const priceDisplay = `${currencySymbol}${bookingData.totalAmount}${currencySuffix}`;

    if (!mounted || !isOpen) return null;

    return (
        <div className="w-full max-w-2xl mx-auto py-4 md:py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="relative w-full mx-auto"
            >
                <div className="flex-1 flex flex-col w-full">
                    <div id="printable-receipt-area" ref={receiptRef} className="pt-12 pb-8 relative">
                                    {/* Watermark Logo */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
                                        <Image src="/images/logo.png" alt="Watermark" width={300} height={300} />
                                    </div>

                                    {/* Header */}
                                    <div className="text-center relative z-10">
                                        <div className="w-20 h-20 mx-auto bg-gold/20 rounded-full flex items-center justify-center mb-6 text-gold shadow-[0_0_20px_rgba(200,137,31,0.2)]">
                                            <CheckCircle size={40} />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">Booking Confirmed</h2>
                                        <p className="text-[#C9D4E0] text-lg mb-8 font-montserrat">
                                            Thank you, <span className="font-semibold text-white">{bookingData.name}</span>
                                        </p>

                                        {/* Blessing Quotes */}
                                        <div className="bg-black/20 border border-gold/20 rounded-2xl p-6 mb-8 text-center shadow-inner">
                                            <div className="mb-5">
                                                <p className="text-gold font-bold text-xl md:text-2xl mb-1.5 leading-loose drop-shadow-sm font-arabic" dir="rtl">
                                                    تقبّل الله عمرتكم وبارك في خطاكم.
                                                </p>
                                                <p className="text-[#C9D4E0] text-sm font-montserrat">
                                                    May Allah accept your Umrah and bless your steps.
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-gold font-bold text-xl md:text-2xl mb-1.5 leading-loose drop-shadow-sm font-arabic" dir="rtl">
                                                    نسأل الله أن ييسر رحلتكم ويكتب لكم الأجر.
                                                </p>
                                                <p className="text-[#C9D4E0] text-sm font-montserrat">
                                                    We ask Allah to ease your journey and grant you its reward.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Booking ID Pill */}
                                        <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white px-6 py-3 rounded-full text-sm font-mono font-bold hover:bg-white/10 transition-colors cursor-pointer backdrop-blur-sm mb-10" onClick={copyBookingId}>
                                            <span className="text-n-400 text-xs font-sans font-normal">Booking ID</span>
                                            <span className="text-base">#{bookingData.bookingId}</span>
                                            {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-n-400" />}
                                        </div>
                                    </div>

                                    {/* What happens next? */}
                                    <div className="mb-8 relative z-10 bg-black/20 border border-gold/30 rounded-2xl p-6 md:p-8 text-left shadow-lg">
                                        <h3 className="text-gold font-bold text-xl md:text-2xl mb-6">What happens next?</h3>
                                        <div className="space-y-5">
                                            <div className="flex gap-4 items-start">
                                                <div className="w-7 h-7 rounded-full bg-gold/20 text-gold flex items-center justify-center shrink-0 font-bold text-sm mt-0.5">1</div>
                                                <p className="text-white text-base font-montserrat leading-relaxed">Our team reviews your itinerary and confirms availability.</p>
                                            </div>
                                            <div className="flex gap-4 items-start">
                                                <div className="w-7 h-7 rounded-full bg-gold/20 text-gold flex items-center justify-center shrink-0 font-bold text-sm mt-0.5">2</div>
                                                <p className="text-white text-base font-montserrat leading-relaxed">We contact you <strong className="text-gold">before your flight</strong> (WhatsApp/email) with your <strong className="text-gold">driver's name, phone, and vehicle details</strong>.</p>
                                            </div>
                                            <div className="flex gap-4 items-start">
                                                <div className="w-7 h-7 rounded-full bg-gold/20 text-gold flex items-center justify-center shrink-0 font-bold text-sm mt-0.5">3</div>
                                                <p className="text-white text-base font-montserrat leading-relaxed">On arrival, your driver meets you — <strong className="text-gold">pay cash, no prepayment needed</strong>.</p>
                                            </div>
                                        </div>
                                        <div className="mt-6 pt-5 border-t border-white/10">
                                            <p className="text-n-400 text-sm italic font-montserrat">
                                                No charge has been made. Free cancellation up to 24 hours before pickup.
                                            </p>
                                        </div>
                                    </div>

                                    {/* WhatsApp CTA */}
                                    <div className="mb-10 relative z-10">
                                        <a
                                            href={whatsappLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full flex items-center justify-center gap-3 bg-gold hover:bg-[#b07718] active:scale-[0.98] text-[#012A5B] font-bold py-5 rounded-2xl transition-all shadow-[0_4px_20px_rgba(200,137,31,0.3)] text-lg"
                                        >
                                            <MessageCircle size={24} />
                                            Message us on WhatsApp
                                        </a>
                                    </div>

                                    {/* Customer Info */}
                                    <div className="space-y-3 relative z-10">
                                        <div className="bg-white/5 border border-white/5 rounded-2xl p-4 backdrop-blur-sm">
                                            <div className="flex items-center justify-between mb-3">
                                                <p className="text-xs text-n-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                                                    <User size={12} className="text-gold" /> Customer Info
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <p className="text-[10px] text-n-500 uppercase tracking-wider mb-0.5">Email</p>
                                                    <p className="text-white font-semibold text-sm truncate">{bookingData.email || '—'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-n-500 uppercase tracking-wider mb-0.5">Phone</p>
                                                    <p className="text-white font-semibold text-sm">{bookingData.phone || '—'}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Route */}
                                        <div className="bg-white/5 border border-white/5 rounded-2xl p-4 backdrop-blur-sm">
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="text-xs text-n-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                                                    <MapPin size={12} className="text-gold" /> Route
                                                </p>
                                                <p className="text-xs text-n-400 font-bold" dir="rtl">المسار</p>
                                            </div>
                                            <p className="text-white font-semibold">{pickup} {dropoff && ` → ${dropoff}`}</p>
                                        </div>

                                        {/* Grid Details */}
                                        <div className="grid grid-cols-2 gap-3">
                                            {/* Date */}
                                            <div className="bg-white/5 border border-white/5 rounded-xl p-3.5 backdrop-blur-sm">
                                                <div className="flex justify-between items-center mb-1.5">
                                                    <div className="flex items-center gap-1.5 text-xs text-n-400 uppercase tracking-wider">
                                                        <Calendar size={12} className="text-gold" /> Date
                                                    </div>
                                                    <span className="text-xs text-n-400 font-bold" dir="rtl">التاريخ</span>
                                                </div>
                                                <p className="text-white font-bold text-sm">{formattedDate}</p>
                                            </div>

                                            {/* Time */}
                                            <div className="bg-white/5 border border-white/5 rounded-xl p-3.5 backdrop-blur-sm">
                                                <div className="flex justify-between items-center mb-1.5">
                                                    <div className="flex items-center gap-1.5 text-xs text-n-400 uppercase tracking-wider">
                                                        <Clock size={12} className="text-gold" /> Time
                                                    </div>
                                                    <span className="text-xs text-n-400 font-bold" dir="rtl">الوقت</span>
                                                </div>
                                                <p className="text-white font-bold text-sm">{bookingData.time}</p>
                                            </div>

                                            {/* Vehicle */}
                                            <div className="bg-white/5 border border-white/5 rounded-xl p-3.5 backdrop-blur-sm">
                                                <div className="flex justify-between items-center mb-1.5">
                                                    <div className="flex items-center gap-1.5 text-xs text-n-400 uppercase tracking-wider">
                                                        <Car size={12} className="text-gold" /> Vehicle
                                                    </div>
                                                    <span className="text-xs text-n-400 font-bold" dir="rtl">السيارة</span>
                                                </div>
                                                <p className="text-white font-bold text-sm">{bookingData.vehicleName}</p>
                                            </div>

                                            {/* Passengers */}
                                            <div className="bg-white/5 border border-white/5 rounded-xl p-3.5 backdrop-blur-sm">
                                                <div className="flex justify-between items-center mb-1.5">
                                                    <div className="flex items-center gap-1.5 text-xs text-n-400 uppercase tracking-wider">
                                                        <Users size={12} className="text-gold" /> Pax
                                                    </div>
                                                    <span className="text-xs text-n-400 font-bold" dir="rtl">الركاب</span>
                                                </div>
                                                <p className="text-white font-bold text-sm">{bookingData.passengers}</p>
                                            </div>
                                        </div>

                                        {/* Total Amount */}
                                        <div className="flex items-stretch gap-3 mt-2">
                                            <div className="flex-1 bg-gold/10 border border-gold/30 text-white rounded-2xl p-5 flex flex-col justify-center shadow-lg backdrop-blur-sm relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-transparent pointer-events-none" />
                                                <div className="relative z-10 flex justify-between items-end">
                                                    <div>
                                                        <p className="text-xs text-gold-light/80 uppercase tracking-wider mb-0.5 font-semibold">Total Amount</p>
                                                        <p className="text-xs text-gold-light/80 font-bold" dir="rtl">الإجمالي</p>
                                                    </div>
                                                    <p className="text-2xl md:text-3xl font-extrabold text-gold relative z-10 drop-shadow-md">{priceDisplay}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ── Action Buttons ── */}
                                <div className="pt-8 flex flex-col gap-3 relative z-20">
                                    <button
                                        onClick={onClose}
                                        className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-4 rounded-xl transition-colors text-base active:scale-[0.98]"
                                    >
                                        <Home size={18} />
                                        Return Home
                                    </button>
                                </div>
                            </div>
            </motion.div>
        </div>
    );
}
