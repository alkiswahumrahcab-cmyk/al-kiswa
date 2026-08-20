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
        const text = bookingData.bookingId;
        // Use clipboard API when available (HTTPS/localhost), fall back to execCommand
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
        } else {
            fallbackCopy(text);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const fallbackCopy = (text: string) => {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        try { document.execCommand('copy'); } catch {}
        document.body.removeChild(ta);
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
                                    <div className="text-center relative z-10 mb-8">
                                        <div className="w-20 h-20 mx-auto bg-gold-soft rounded-full flex items-center justify-center mb-6 text-gold-strong">
                                            <CheckCircle size={40} />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold text-ink mb-2 tracking-tight">Booking Confirmed</h2>
                                        <p className="text-muted text-lg font-montserrat">
                                            Thank you, <span className="font-semibold text-ink">{bookingData.name}</span>
                                        </p>
                                    </div>

                                    {/* SINGLE RECEIPT CONTAINER (Details First) */}
                                    <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 mb-8 relative z-10 shadow-sm text-left">
                                        {/* Booking ID Header */}
                                        <div className="flex justify-between items-center border-b border-border pb-5 mb-5">
                                            <div>
                                                <p className="text-xs text-muted uppercase tracking-wider mb-1">Booking Ref</p>
                                                <div 
                                                    onClick={copyBookingId}
                                                    className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                                                >
                                                    <p className="text-lg font-mono font-bold text-ink">{bookingData.bookingId}</p>
                                                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={14} className="text-gold" />}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-muted uppercase tracking-wider mb-1">Status</p>
                                                <div className="inline-flex items-center gap-1.5 bg-success-soft text-success px-3 py-1 rounded-full text-xs font-bold border border-success/20">
                                                    <CheckCircle size={12} /> Confirmed
                                                </div>
                                            </div>
                                        </div>

                                        {/* Route */}
                                        <div className="mb-6">
                                            <div className="flex justify-between items-center mb-1">
                                                <p className="text-xs text-muted uppercase tracking-wider flex items-center gap-1.5"><MapPin size={12} className="text-gold" /> Route</p>
                                                <p className="text-xs text-muted font-bold" dir="rtl">المسار</p>
                                            </div>
                                            <p className="font-bold text-ink text-lg">{pickup} {dropoff && ` → ${dropoff}`}</p>
                                        </div>

                                        {/* Info Grid */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 border-b border-border pb-6">
                                            <div>
                                                <div className="flex justify-between items-center mb-1">
                                                    <p className="text-[10px] text-muted uppercase tracking-wider flex items-center gap-1"><Calendar size={10} className="text-gold"/> Date</p>
                                                    <p className="text-[10px] text-muted font-bold" dir="rtl">التاريخ</p>
                                                </div>
                                                <p className="font-bold text-ink text-sm">{formattedDate}</p>
                                            </div>
                                            <div>
                                                <div className="flex justify-between items-center mb-1">
                                                    <p className="text-[10px] text-muted uppercase tracking-wider flex items-center gap-1"><Clock size={10} className="text-gold"/> Time</p>
                                                    <p className="text-[10px] text-muted font-bold" dir="rtl">الوقت</p>
                                                </div>
                                                <p className="font-bold text-ink text-sm">{bookingData.time}</p>
                                            </div>
                                            <div>
                                                <div className="flex justify-between items-center mb-1">
                                                    <p className="text-[10px] text-muted uppercase tracking-wider flex items-center gap-1"><Car size={10} className="text-gold"/> Vehicle</p>
                                                    <p className="text-[10px] text-muted font-bold" dir="rtl">السيارة</p>
                                                </div>
                                                <p className="font-bold text-ink text-sm truncate pr-2">{bookingData.vehicleName}</p>
                                            </div>
                                            <div>
                                                <div className="flex justify-between items-center mb-1">
                                                    <p className="text-[10px] text-muted uppercase tracking-wider flex items-center gap-1"><Users size={10} className="text-gold"/> Pax</p>
                                                    <p className="text-[10px] text-muted font-bold" dir="rtl">الركاب</p>
                                                </div>
                                                <p className="font-bold text-ink text-sm">{bookingData.passengers}</p>
                                            </div>
                                        </div>

                                        {/* Customer */}
                                        <div className="grid grid-cols-2 gap-4 mb-6 border-b border-border pb-6">
                                            <div>
                                                <p className="text-[10px] text-muted uppercase tracking-wider mb-1">Email</p>
                                                <p className="font-semibold text-ink text-sm truncate pr-2">{bookingData.email || '—'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-muted uppercase tracking-wider mb-1">Phone</p>
                                                <p className="font-semibold text-ink text-sm">{bookingData.phone || '—'}</p>
                                            </div>
                                        </div>

                                        {/* Total */}
                                        <div className="flex justify-between items-end bg-gold-soft/30 -mx-6 md:-mx-8 -mb-6 md:-mb-8 p-6 md:p-8 rounded-b-2xl border-t border-gold/20">
                                            <div>
                                                <p className="text-xs font-bold text-muted uppercase tracking-wider mb-0.5">Total Amount</p>
                                                <p className="text-xs font-bold text-muted" dir="rtl">الإجمالي</p>
                                            </div>
                                            <p className="text-2xl md:text-3xl font-extrabold text-gold">{priceDisplay}</p>
                                        </div>
                                    </div>

                                    {/* WhatsApp CTA */}
                                    <div className="mb-8 relative z-10">
                                        <a
                                            href={whatsappLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full flex items-center justify-center gap-3 btn-primary text-base py-4 shadow-sm hover:shadow-md"
                                        >
                                            <MessageCircle size={24} />
                                            Message us on WhatsApp
                                        </a>
                                    </div>

                                    {/* What happens next? */}
                                    <div className="mb-8 relative z-10 bg-surface border border-border rounded-xl p-6 md:p-8 text-left shadow-sm">
                                        <h3 className="text-gold font-bold text-xl md:text-2xl mb-6">What happens next?</h3>
                                        <div className="space-y-5">
                                            <div className="flex gap-4 items-start">
                                                <div className="w-7 h-7 rounded-full bg-gold-soft text-gold-strong flex items-center justify-center shrink-0 font-bold text-sm mt-0.5">1</div>
                                                <p className="text-ink text-sm font-montserrat leading-relaxed">Our team reviews your itinerary and confirms availability.</p>
                                            </div>
                                            <div className="flex gap-4 items-start">
                                                <div className="w-7 h-7 rounded-full bg-gold-soft text-gold-strong flex items-center justify-center shrink-0 font-bold text-sm mt-0.5">2</div>
                                                <p className="text-ink text-sm font-montserrat leading-relaxed">We contact you <strong className="text-gold">before your flight</strong> with your <strong className="text-gold">driver's details</strong>.</p>
                                            </div>
                                            <div className="flex gap-4 items-start">
                                                <div className="w-7 h-7 rounded-full bg-gold-soft text-gold-strong flex items-center justify-center shrink-0 font-bold text-sm mt-0.5">3</div>
                                                <p className="text-ink text-sm font-montserrat leading-relaxed">On arrival, your driver meets you — <strong className="text-gold">pay cash, no prepayment needed</strong>.</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Blessing Quotes */}
                                    <div className="bg-surface-sunken border border-border rounded-xl p-6 mb-4 text-center relative z-10">
                                        <p className="text-gold font-bold text-lg mb-2 leading-loose font-arabic" dir="rtl">
                                            تقبّل الله عمرتكم وبارك في خطاكم.
                                        </p>
                                        <p className="text-muted text-xs font-montserrat">
                                            May Allah accept your Umrah and bless your steps.
                                        </p>
                                    </div>
                                </div>

                                {/* ── Action Buttons ── */}
                                <div className="pt-2 flex flex-col gap-3 relative z-20">
                                    <button
                                        onClick={onClose}
                                        className="w-full flex items-center justify-center gap-2 btn-secondary py-4"
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
