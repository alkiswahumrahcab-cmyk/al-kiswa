'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
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

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

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

    if (!mounted) return null;

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[999999] flex flex-col justify-end md:justify-center md:items-center md:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, y: "100%", scale: 1 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: "100%", scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="relative w-full md:max-w-xl mx-auto bg-primary-black border border-white/10 rounded-t-3xl md:rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col max-h-[85vh] md:max-h-[85vh] overflow-hidden"
                    >
                        {/* Close button (Mobile only or Desktop) */}
                        <button 
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-full transition-colors md:hidden print-hidden"
                        >
                            <X size={20} />
                        </button>

                        {/* ═══ RECEIPT CARD ═══ */}
                        <div className="flex-1 flex flex-col w-full overflow-y-auto">
                            
                            {/* PDF Container (Only this part gets exported to PDF) */}
                            <div id="printable-receipt-area" ref={receiptRef} className="bg-primary-black px-6 md:px-8 pt-10 pb-6 relative">
                                {/* Watermark Logo */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                                    <Image src="/images/logo.png" alt="Watermark" width={300} height={300} />
                                </div>

                                {/* Header */}
                                <div className="text-center relative z-10">
                                    <div className="w-16 h-16 mx-auto bg-gold-primary/20 rounded-full flex items-center justify-center mb-4 text-gold-primary shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                                        <CheckCircle size={32} />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">Booking Confirmed</h2>
                                    <p className="text-gray-400 text-sm mb-6">
                                        Thank you, <span className="font-semibold text-white">{bookingData.name}</span>
                                    </p>

                                    {/* Blessing Quotes */}
                                    <div className="bg-white/5 border border-gold-primary/20 rounded-xl p-4 mb-6 text-center shadow-inner">
                                        <p className="text-gold-primary font-bold text-lg mb-1 leading-loose drop-shadow-sm" dir="rtl">
                                            تقبّل الله عمرتكم وبارك في خطاكم.
                                        </p>
                                        <p className="text-gray-300 font-bold text-sm leading-relaxed" dir="rtl">
                                            نسأل الله أن ييسر رحلتكم ويكتب لكم الأجر.
                                        </p>
                                    </div>

                                    {/* Booking ID Pill */}
                                    <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white px-5 py-2.5 rounded-full text-sm font-mono font-bold hover:bg-white/10 transition-colors cursor-pointer backdrop-blur-sm" onClick={copyBookingId}>
                                        <span className="text-gray-400 text-xs font-sans font-normal">Booking ID</span>
                                        <span>#{bookingData.bookingId}</span>
                                        {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-gray-400" />}
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="my-8 border-t border-dashed border-white/20" />

                                {/* Customer Info */}
                                <div className="space-y-3 relative z-10">
                                    <div className="bg-white/5 border border-white/5 rounded-2xl p-4 backdrop-blur-sm">
                                        <div className="flex items-center justify-between mb-3">
                                            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                                                <User size={12} className="text-gold-primary" /> Customer Info
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Email</p>
                                                <p className="text-white font-semibold text-sm truncate">{bookingData.email || '—'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Phone</p>
                                                <p className="text-white font-semibold text-sm">{bookingData.phone || '—'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Route */}
                                    <div className="bg-white/5 border border-white/5 rounded-2xl p-4 backdrop-blur-sm">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                                                <MapPin size={12} className="text-gold-primary" /> Route
                                            </p>
                                            <p className="text-xs text-gray-400 font-bold" dir="rtl">المسار</p>
                                        </div>
                                        <p className="text-white font-semibold">{pickup} {dropoff && ` → ${dropoff}`}</p>
                                    </div>

                                    {/* Grid Details */}
                                    <div className="grid grid-cols-2 gap-3">
                                        {/* Date */}
                                        <div className="bg-white/5 border border-white/5 rounded-xl p-3.5 backdrop-blur-sm">
                                            <div className="flex justify-between items-center mb-1.5">
                                                <div className="flex items-center gap-1.5 text-xs text-gray-400 uppercase tracking-wider">
                                                    <Calendar size={12} className="text-gold-primary" /> Date
                                                </div>
                                                <span className="text-xs text-gray-400 font-bold" dir="rtl">التاريخ</span>
                                            </div>
                                            <p className="text-white font-bold text-sm">{formattedDate}</p>
                                        </div>

                                        {/* Time */}
                                        <div className="bg-white/5 border border-white/5 rounded-xl p-3.5 backdrop-blur-sm">
                                            <div className="flex justify-between items-center mb-1.5">
                                                <div className="flex items-center gap-1.5 text-xs text-gray-400 uppercase tracking-wider">
                                                    <Clock size={12} className="text-gold-primary" /> Time
                                                </div>
                                                <span className="text-xs text-gray-400 font-bold" dir="rtl">الوقت</span>
                                            </div>
                                            <p className="text-white font-bold text-sm">{bookingData.time}</p>
                                        </div>

                                        {/* Vehicle */}
                                        <div className="bg-white/5 border border-white/5 rounded-xl p-3.5 backdrop-blur-sm">
                                            <div className="flex justify-between items-center mb-1.5">
                                                <div className="flex items-center gap-1.5 text-xs text-gray-400 uppercase tracking-wider">
                                                    <Car size={12} className="text-gold-primary" /> Vehicle
                                                </div>
                                                <span className="text-xs text-gray-400 font-bold" dir="rtl">السيارة</span>
                                            </div>
                                            <p className="text-white font-bold text-sm">{bookingData.vehicleName}</p>
                                        </div>

                                        {/* Passengers */}
                                        <div className="bg-white/5 border border-white/5 rounded-xl p-3.5 backdrop-blur-sm">
                                            <div className="flex justify-between items-center mb-1.5">
                                                <div className="flex items-center gap-1.5 text-xs text-gray-400 uppercase tracking-wider">
                                                    <Users size={12} className="text-gold-primary" /> Pax
                                                </div>
                                                <span className="text-xs text-gray-400 font-bold" dir="rtl">الركاب</span>
                                            </div>
                                            <p className="text-white font-bold text-sm">{bookingData.passengers}</p>
                                        </div>
                                    </div>

                                    {/* Total Amount & QR Code */}
                                    <div className="flex items-stretch gap-3">
                                        {/* QR Code (Temporarily disabled as requested)
                                        <div className="bg-white border-2 border-gold-primary/30 rounded-2xl p-2.5 flex items-center justify-center shrink-0 shadow-lg">
                                            <img 
                                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`${typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_APP_URL || 'https://alkiswahumrahcab.com'}/receipt/${bookingData.bookingId}`)}`} 
                                                alt="Verification QR Code" 
                                                className="w-[50px] h-[50px] object-contain"
                                                crossOrigin="anonymous"
                                            />
                                        </div>
                                        */}
                                        <div className="flex-1 bg-gold-primary/10 border border-gold-primary/30 text-white rounded-2xl p-4 flex flex-col justify-center shadow-lg backdrop-blur-sm relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-gold-primary/5 to-transparent pointer-events-none" />
                                            <div className="relative z-10 flex justify-between items-end">
                                                <div>
                                                    <p className="text-xs text-gold-light/80 uppercase tracking-wider mb-0.5 font-semibold">Total Amount</p>
                                                    <p className="text-xs text-gold-light/80 font-bold" dir="rtl">الإجمالي</p>
                                                </div>
                                                <p className="text-2xl md:text-3xl font-extrabold text-gold-primary relative z-10 drop-shadow-md">{priceDisplay}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ── Action Buttons ── */}
                            <div className="px-6 md:px-8 pb-8 md:pb-6 pt-4 bg-primary-black border-t border-white/10 flex flex-col gap-3 relative z-20 shadow-[0_-10px_20px_rgba(0,0,0,0.2)]">
                                
                                <div className="text-center p-3 mb-2 bg-white/5 border border-gold-primary/20 rounded-xl">
                                    <p className="text-white text-sm font-semibold mb-1">Your booking has been confirmed.</p>
                                    <p className="text-gray-300 text-sm">A PDF receipt has been sent to your email.</p>
                                    <div className="mt-2 text-gold-primary text-sm font-bold" dir="rtl">
                                        تم تأكيد الحجز. تم إرسال إيصال PDF إلى بريدك الإلكتروني.
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row gap-3">
                                    {/* WhatsApp Button */}
                                    <a
                                        href={whatsappLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 active:scale-[0.98] text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_4px_14px_rgba(34,197,94,0.2)] text-sm border border-green-500/50"
                                    >
                                        <MessageCircle size={18} />
                                        Contact on WhatsApp
                                    </a>

                                    <button
                                        onClick={onClose}
                                        className="flex-1 flex items-center justify-center gap-2 text-gray-400 hover:text-white font-medium py-3.5 transition-colors text-sm active:scale-[0.98]"
                                    >
                                        <Home size={16} />
                                        Return Home
                                    </button>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
}
