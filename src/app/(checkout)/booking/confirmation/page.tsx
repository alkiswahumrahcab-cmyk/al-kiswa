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
                <div className="bg-surface rounded-[2rem] overflow-hidden shadow-xl border border-border">

                    {/* ── Header ── */}
                    <div className="relative bg-surface-sunken px-8 pt-12 pb-8 text-center overflow-hidden">
                        {/* Glow rings */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-48 h-48 rounded-full bg-gold/10 blur-2xl" />
                        </div>

                        {/* Animated check */}
                        <div className="relative flex justify-center mb-5">
                            <motion.div
                                initial={{ scale: 0, rotate: -30 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: 'spring', stiffness: 420, damping: 18, delay: 0.1 }}
                                className="w-20 h-20 rounded-full border-2 border-gold bg-gold/10 flex items-center justify-center shadow-[0_0_50px_hsl(var(--gold-glow) / 0.35)]"
                            >
                                <CheckCircle size={38} className="text-gold" />
                            </motion.div>
                            {/* Pulse ring */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1.6, opacity: 0 }}
                                transition={{ duration: 1.2, repeat: Infinity, delay: 0.5 }}
                                className="absolute inset-0 m-auto w-20 h-20 rounded-full border border-gold/40"
                            />
                        </div>

                        {/* Status badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                            className="inline-flex items-center gap-1.5 bg-gold/15 border border-gold/30 text-gold text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                            Confirmed
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl font-extrabold text-ink tracking-tight mb-2"
                        >
                            Booking Confirmed
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.38 }}
                            className="text-muted text-sm"
                        >
                            Thank you, <span className="text-ink font-semibold">{name}</span>
                        </motion.p>
                        {email && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.42 }}
                                className="text-muted text-xs mt-1"
                            >
                                Receipt sent to <span className="text-ink font-semibold">{email}</span>
                            </motion.p>
                        )}

                        {/* Booking ID pill */}
                        <motion.button
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.48 }}
                            onClick={copyBookingId}
                            className="mt-6 inline-flex items-center gap-2 bg-surface border border-border hover:bg-surface-alt text-ink px-5 py-2.5 rounded-btn text-sm font-mono font-bold transition-all duration-200 group"
                        >
                            <span className="text-muted text-xs font-sans font-normal">ID</span>
                            <span>#{id}</span>
                            {copied
                                ? <Check size={14} className="text-green-500" />
                                : <Copy size={14} className="text-muted group-hover:text-ink transition-colors" />
                            }
                        </motion.button>
                    </div>

                    {/* ── Dashed Ticket Tear ── */}
                    <div className="relative flex items-center px-6 -my-0.5 z-10">
                        <div className="w-6 h-6 rounded-full bg-background -ml-6 shrink-0" />
                        <div className="flex-1 border-t-2 border-dashed border-border" />
                        <div className="w-6 h-6 rounded-full bg-background -mr-6 shrink-0" />
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
                            <div className="bg-surface-alt border border-border rounded-2xl p-4">
                                <p className="text-[10px] text-muted uppercase tracking-widest font-semibold mb-2.5 flex items-center gap-1.5">
                                    <MapPin size={10} className="text-gold" /> Route
                                </p>
                                <div className="flex items-center gap-2 min-w-0">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-ink text-sm font-semibold truncate">{pickup}</p>
                                    </div>
                                    {displayDropoff && (
                                        <>
                                            <ArrowRight size={14} className="text-gold shrink-0" />
                                            <div className="flex-1 min-w-0 text-right">
                                                <p className="text-muted text-sm font-medium truncate">{displayDropoff}</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Date / Time / Passengers grid */}
                            <div className="grid grid-cols-3 gap-2.5">
                                <div className="bg-surface border border-border rounded-xl p-3 flex flex-col gap-1.5 shadow-sm">
                                    <Calendar size={13} className="text-gold" />
                                    <p className="text-[10px] text-muted uppercase tracking-wider">Date</p>
                                    <p className="text-ink text-xs font-semibold leading-tight">{formattedDate}</p>
                                </div>
                                <div className="bg-surface border border-border rounded-xl p-3 flex flex-col gap-1.5 shadow-sm">
                                    <Clock size={13} className="text-gold" />
                                    <p className="text-[10px] text-muted uppercase tracking-wider">Time</p>
                                    <p className="text-ink text-sm font-bold">{time}</p>
                                </div>
                                <div className="bg-surface border border-border rounded-xl p-3 flex flex-col gap-1.5 shadow-sm">
                                    <Users size={13} className="text-gold" />
                                    <p className="text-[10px] text-muted uppercase tracking-wider">Pax</p>
                                    <p className="text-ink text-sm font-bold">{passengers}</p>
                                </div>
                            </div>

                            {/* Vehicle & Price */}
                            <div className="bg-surface border border-gold/30 rounded-2xl px-4 py-3.5 flex items-center justify-between shadow-sm">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-10 h-10 rounded-xl bg-gold-soft flex items-center justify-center">
                                        <Car size={18} className="text-gold" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-muted uppercase tracking-wider">Vehicle</p>
                                        <p className="text-ink text-sm font-semibold">{vehicleName}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-muted uppercase tracking-wider">Total</p>
                                    <p className="text-gold text-xl font-extrabold tracking-tight">{priceDisplay}</p>
                                </div>
                            </div>

                            {/* Trust badge */}
                            <div className="flex items-center justify-center gap-4 pt-3">
                                <div className="flex items-center gap-1.5 text-muted text-[11px]">
                                    <Shield size={11} className="text-gold/60" />
                                    Pay on arrival
                                </div>
                                <div className="w-px h-3 bg-border" />
                                <div className="flex items-center gap-1.5 text-muted text-[11px]">
                                    <Star size={11} className="text-gold/60" />
                                    Licensed & insured
                                </div>
                                <div className="w-px h-3 bg-border" />
                                <div className="flex items-center gap-1.5 text-muted text-[11px]">
                                    <CheckCircle size={11} className="text-gold/60" />
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
                            className="w-full flex items-center justify-center gap-2.5 btn-primary py-4 text-base"
                        >
                            <Home size={18} />
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
        <main className="min-h-screen bg-background pt-28 pb-12">
            <Suspense fallback={<div className="text-center py-20 text-ink">Loading...</div>}>
                <ConfirmationContent />
            </Suspense>
        </main>
    );
}
