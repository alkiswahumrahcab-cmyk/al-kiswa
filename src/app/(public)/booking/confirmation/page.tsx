'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Home, MapPin, Calendar, Clock, Users, Car, ArrowRight, Shield, Star, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

function ConfirmationContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id') || 'Unknown';
    const [copied, setCopied] = useState(false);
    
    // We try to extract info if it was passed via query params (optional)
    const name = searchParams.get('name') || 'Guest';
    const email = searchParams.get('email') || '';
    const pickup = searchParams.get('pickup') || '—';
    const dropoff = searchParams.get('dropoff');
    const date = searchParams.get('date') || '—';
    const time = searchParams.get('time') || '—';
    const passengers = searchParams.get('passengers') || '—';
    const vehicleName = searchParams.get('vehicleName') || 'Umrah Transport';
    const totalAmount = searchParams.get('totalAmount') || '—';
    const currency = searchParams.get('currency') || 'SAR';

    const copyBookingId = () => {
        navigator.clipboard.writeText(id);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const formattedDate = (() => {
        try {
            if (date === '—') return date;
            return new Date(date).toLocaleDateString('en-GB', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            });
        } catch {
            return date;
        }
    })();

    const displayDropoff = dropoff && dropoff.toLowerCase() !== 'destination' ? dropoff : null;
    
    const currencySymbol = currency === 'USD' ? '$'
        : currency === 'EUR' ? '€'
        : currency === 'GBP' ? '£'
        : '';
    const currencySuffix = currency === 'SAR' ? ' SAR' : '';
    const priceDisplay = totalAmount !== '—' ? `${currencySymbol}${totalAmount}${currencySuffix}` : '—';

    return (
        <div className="w-full max-w-md mx-auto px-4 py-16 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 280, damping: 26 }}
                className="w-full relative"
            >
                {/* ═══ TICKET CARD ═══ */}
                <div className="bg-[#080E1D] rounded-[2rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.8)] border border-gold-primary/20">

                    {/* ── Header ── */}
                    <div className="relative bg-gradient-to-b from-[#1C1200] via-[#0D0900] to-[#080E1D] px-8 pt-12 pb-8 text-center overflow-hidden">
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
                            className="text-3xl font-extrabold text-white tracking-tight mb-2"
                        >
                            Booking Confirmed
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.38 }}
                            className="text-slate-400 text-sm"
                        >
                            Thank you, <span className="text-white font-semibold">{name}</span>
                        </motion.p>
                        {email && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.42 }}
                                className="text-slate-500 text-xs mt-1"
                            >
                                Receipt sent to <span className="text-gold-primary/90">{email}</span>
                            </motion.p>
                        )}

                        {/* Booking ID pill */}
                        <motion.button
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.48 }}
                            onClick={copyBookingId}
                            className="mt-6 inline-flex items-center gap-2 bg-white/5 border border-gold-primary/25 hover:border-gold-primary/60 hover:bg-gold-primary/10 text-gold-primary px-5 py-2.5 rounded-full text-sm font-mono font-bold transition-all duration-200 group"
                        >
                            <span className="text-slate-400 text-xs font-sans font-normal">ID</span>
                            <span>#{id}</span>
                            {copied
                                ? <Check size={14} className="text-emerald-400" />
                                : <Copy size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                            }
                        </motion.button>
                    </div>

                    {/* ── Dashed Ticket Tear ── */}
                    <div className="relative flex items-center px-6 -my-0.5 z-10">
                        <div className="w-6 h-6 rounded-full bg-black -ml-6 shrink-0" />
                        <div className="flex-1 border-t-2 border-dashed border-white/8" />
                        <div className="w-6 h-6 rounded-full bg-black -mr-6 shrink-0" />
                    </div>

                    {/* ── Trip Details (If available in URL) ── */}
                    {date !== '—' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.52 }}
                            className="px-7 py-8 space-y-4 text-left"
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
                                    {displayDropoff && (
                                        <>
                                            <ArrowRight size={14} className="text-gold-primary shrink-0" />
                                            <div className="flex-1 min-w-0 text-right">
                                                <p className="text-slate-300 text-sm font-medium truncate">{displayDropoff}</p>
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
                                    <p className="text-white text-sm font-bold">{time}</p>
                                </div>
                                <div className="bg-white/[0.04] border border-white/8 rounded-xl p-3 flex flex-col gap-1.5">
                                    <Users size={13} className="text-gold-primary" />
                                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Pax</p>
                                    <p className="text-white text-sm font-bold">{passengers}</p>
                                </div>
                            </div>

                            {/* Vehicle & Price */}
                            <div className="bg-gradient-to-r from-gold-primary/10 to-transparent border border-gold-primary/20 rounded-2xl px-4 py-3.5 flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-10 h-10 rounded-xl bg-gold-primary/15 flex items-center justify-center">
                                        <Car size={18} className="text-gold-primary" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Vehicle</p>
                                        <p className="text-white text-sm font-semibold">{vehicleName}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Total</p>
                                    <p className="text-gold-primary text-xl font-extrabold tracking-tight">{priceDisplay}</p>
                                </div>
                            </div>

                            {/* Trust badge */}
                            <div className="flex items-center justify-center gap-4 pt-3">
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
                    )}

                    {/* ── Action Buttons ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.62 }}
                        className="px-8 pb-8 pt-4 flex flex-col gap-3"
                    >
                        <Link
                            href="/"
                            className="w-full flex items-center justify-center gap-2.5 bg-gold-primary hover:bg-gold-hover active:scale-[0.98] text-black font-bold py-3.5 rounded-xl transition-all duration-200 shadow-[0_8px_24px_rgba(212,175,55,0.25)] text-sm"
                        >
                            <Home size={16} />
                            Return Home
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

export default function ConfirmationPage() {
    return (
        <main className="min-h-screen bg-black pt-28 pb-12">
            <Suspense fallback={<div className="text-center py-20 text-white">Loading...</div>}>
                <ConfirmationContent />
            </Suspense>
        </main>
    );
}
