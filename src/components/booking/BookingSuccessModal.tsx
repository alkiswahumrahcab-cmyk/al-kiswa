'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle, X, Printer, MessageCircle, Home,
    Copy, Check, MapPin, Calendar, Clock, Users, Car,
    ArrowRight, Shield, Star
} from 'lucide-react';

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
    onPrint: () => void;
    whatsappNumber: string;
}

export default function BookingSuccessModal({
    isOpen,
    bookingData,
    onClose,
    onPrint,
    whatsappNumber = '966548707332',
}: BookingSuccessModalProps) {
    const [copied, setCopied] = useState(false);

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
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
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

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
                    onClick={(e) => e.target === e.currentTarget && onClose()}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.88, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 20 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
                        className="w-full max-w-md relative"
                    >
                        {/* Close */}
                        <button
                            onClick={onClose}
                            className="absolute -top-3 -right-3 z-20 w-8 h-8 bg-slate-800 border border-white/10 text-white/50 hover:text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
                        >
                            <X size={15} />
                        </button>

                        {/* ═══ TICKET CARD ═══ */}
                        <div className="bg-[#080E1D] rounded-[2rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.8)] border border-gold-primary/20">

                            {/* ── Header ── */}
                            <div className="relative bg-gradient-to-b from-[#1C1200] via-[#0D0900] to-[#080E1D] px-8 pt-10 pb-8 text-center overflow-hidden">
                                {/* Glow rings */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-48 h-48 rounded-full bg-gold-primary/5 blur-2xl" />
                                </div>

                                {/* Animated check */}
                                <div className="relative flex justify-center mb-5">
                                    <motion.div
                                        initial={{ scale: 0, rotate: -30 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ type: 'spring', stiffness: 420, damping: 18, delay: 0.1 }}
                                        className="w-20 h-20 rounded-full border-2 border-gold-primary bg-gold-primary/10 flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.35)]"
                                    >
                                        <CheckCircle size={38} className="text-gold-primary" />
                                    </motion.div>
                                    {/* Pulse ring */}
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1.6, opacity: 0 }}
                                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.5 }}
                                        className="absolute inset-0 m-auto w-20 h-20 rounded-full border border-gold-primary/40"
                                    />
                                </div>

                                {/* Status badge */}
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25 }}
                                    className="inline-flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Confirmed
                                </motion.div>

                                <motion.h2
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-2xl font-extrabold text-white tracking-tight mb-1"
                                >
                                    Booking Confirmed
                                </motion.h2>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.38 }}
                                    className="text-slate-400 text-sm"
                                >
                                    Thank you, <span className="text-white font-semibold">{bookingData.name}</span>
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.42 }}
                                    className="text-slate-500 text-xs mt-0.5"
                                >
                                    Receipt sent to <span className="text-gold-primary/90">{bookingData.email}</span>
                                </motion.p>

                                {/* Booking ID pill */}
                                <motion.button
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.48 }}
                                    onClick={copyBookingId}
                                    className="mt-5 inline-flex items-center gap-2 bg-white/5 border border-gold-primary/25 hover:border-gold-primary/60 hover:bg-gold-primary/10 text-gold-primary px-5 py-2 rounded-full text-sm font-mono font-bold transition-all duration-200 group"
                                >
                                    <span className="text-slate-400 text-xs font-sans font-normal">ID</span>
                                    <span>#{bookingData.bookingId}</span>
                                    {copied
                                        ? <Check size={13} className="text-emerald-400" />
                                        : <Copy size={13} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                                    }
                                </motion.button>
                            </div>

                            {/* ── Dashed Ticket Tear ── */}
                            <div className="relative flex items-center px-6 -my-0.5 z-10">
                                <div className="w-6 h-6 rounded-full bg-black -ml-6 shrink-0" />
                                <div className="flex-1 border-t-2 border-dashed border-white/8" />
                                <div className="w-6 h-6 rounded-full bg-black -mr-6 shrink-0" />
                            </div>

                            {/* ── Trip Details ── */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.52 }}
                                className="px-7 py-6 space-y-3"
                            >
                                {/* Route */}
                                <div className="bg-white/[0.04] border border-white/8 rounded-2xl p-4">
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-2.5 flex items-center gap-1.5">
                                        <MapPin size={10} className="text-gold-primary" /> Route
                                    </p>
                                    <div className="flex items-center gap-2 min-w-0">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white text-sm font-semibold truncate">{pickup}</p>
                                        </div>
                                        {dropoff && (
                                            <>
                                                <ArrowRight size={14} className="text-gold-primary shrink-0" />
                                                <div className="flex-1 min-w-0 text-right">
                                                    <p className="text-slate-300 text-sm font-medium truncate">{dropoff}</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Date / Time / Passengers grid */}
                                <div className="grid grid-cols-3 gap-2.5">
                                    <div className="bg-white/[0.04] border border-white/8 rounded-xl p-3 flex flex-col gap-1.5">
                                        <Calendar size={13} className="text-gold-primary" />
                                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Date</p>
                                        <p className="text-white text-xs font-semibold leading-tight">{formattedDate}</p>
                                    </div>
                                    <div className="bg-white/[0.04] border border-white/8 rounded-xl p-3 flex flex-col gap-1.5">
                                        <Clock size={13} className="text-gold-primary" />
                                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Time</p>
                                        <p className="text-white text-sm font-bold">{bookingData.time}</p>
                                    </div>
                                    <div className="bg-white/[0.04] border border-white/8 rounded-xl p-3 flex flex-col gap-1.5">
                                        <Users size={13} className="text-gold-primary" />
                                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Pax</p>
                                        <p className="text-white text-sm font-bold">{bookingData.passengers}</p>
                                    </div>
                                </div>

                                {/* Vehicle & Price */}
                                <div className="bg-gradient-to-r from-gold-primary/10 to-transparent border border-gold-primary/20 rounded-2xl px-4 py-3.5 flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-9 h-9 rounded-xl bg-gold-primary/15 flex items-center justify-center">
                                            <Car size={16} className="text-gold-primary" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Vehicle</p>
                                            <p className="text-white text-sm font-semibold">{bookingData.vehicleName}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Total</p>
                                        <p className="text-gold-primary text-xl font-extrabold tracking-tight">{priceDisplay}</p>
                                    </div>
                                </div>

                                {/* Trust badge */}
                                <div className="flex items-center justify-center gap-4 pt-1">
                                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                                        <Shield size={11} className="text-gold-primary/60" />
                                        Pay on arrival
                                    </div>
                                    <div className="w-px h-3 bg-white/10" />
                                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                                        <Star size={11} className="text-gold-primary/60" />
                                        Licensed & insured
                                    </div>
                                    <div className="w-px h-3 bg-white/10" />
                                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                                        <CheckCircle size={11} className="text-gold-primary/60" />
                                        24/7 support
                                    </div>
                                </div>
                            </motion.div>

                            {/* ── Action Buttons ── */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.62 }}
                                className="px-7 pb-7 flex flex-col gap-2.5"
                            >
                                {/* WhatsApp — Primary */}
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20c05e] active:scale-[0.98] text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-[0_8px_24px_rgba(37,211,102,0.25)] text-sm"
                                >
                                    <MessageCircle size={18} />
                                    Confirm via WhatsApp
                                </a>

                                <div className="grid grid-cols-2 gap-2.5">
                                    <button
                                        onClick={onPrint}
                                        className="flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/10 active:scale-[0.98] border border-white/10 hover:border-white/20 text-white/80 hover:text-white font-medium py-3 rounded-xl transition-all text-sm"
                                    >
                                        <Printer size={15} />
                                        Print Receipt
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/10 active:scale-[0.98] border border-white/10 hover:border-white/20 text-white/80 hover:text-white font-medium py-3 rounded-xl transition-all text-sm"
                                    >
                                        <Home size={15} />
                                        Return Home
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
