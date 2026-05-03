'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, Printer, MessageCircle, Home, Copy, Check, MapPin, Calendar, Clock, Users, Car } from 'lucide-react';
import { useState } from 'react';

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
        setTimeout(() => setCopied(false), 2000);
    };

    const whatsappMessage = encodeURIComponent(
        `Hello Al Kiswah! I just confirmed my booking.\nBooking ID: ${bookingData.bookingId}\nRoute: ${bookingData.pickup} → ${bookingData.dropoff}\nDate: ${bookingData.date} at ${bookingData.time}\nName: ${bookingData.name}`
    );
    const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

    const formattedDate = (() => {
        try {
            return new Date(bookingData.date).toLocaleDateString('en-GB', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            });
        } catch {
            return bookingData.date;
        }
    })();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                    onClick={(e) => e.target === e.currentTarget && onClose()}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                        className="w-full max-w-lg bg-[#0F172A] rounded-3xl overflow-hidden shadow-2xl border border-gold-primary/20 relative"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 text-white/40 hover:text-white transition-colors bg-white/5 p-1.5 rounded-full"
                        >
                            <X size={18} />
                        </button>

                        {/* Gold Header */}
                        <div className="relative bg-gradient-to-br from-[#1a1200] to-[#0F172A] pt-10 pb-8 px-8 flex flex-col items-center text-center border-b border-gold-primary/20">
                            {/* Animated Check Icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.15 }}
                                className="w-20 h-20 rounded-full bg-gold-primary/10 border-2 border-gold-primary flex items-center justify-center mb-5 shadow-[0_0_40px_rgba(245,158,11,0.3)]"
                            >
                                <motion.div
                                    initial={{ scale: 0, rotate: -90 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.25, type: 'spring', stiffness: 500 }}
                                >
                                    <CheckCircle size={40} className="text-gold-primary" />
                                </motion.div>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-2xl font-bold text-white mb-1"
                            >
                                Booking Confirmed!
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-slate-400 text-sm"
                            >
                                A confirmation email has been sent to <span className="text-gold-primary">{bookingData.email}</span>
                            </motion.p>

                            {/* Booking ID */}
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.45 }}
                                onClick={copyBookingId}
                                className="mt-4 flex items-center gap-2 bg-gold-primary/10 border border-gold-primary/30 text-gold-primary px-4 py-2 rounded-full text-sm font-mono font-bold hover:bg-gold-primary/20 transition-colors"
                            >
                                <span>#{bookingData.bookingId}</span>
                                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                            </motion.button>
                        </div>

                        {/* Trip Summary */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="px-8 py-6 space-y-3"
                        >
                            {/* Route */}
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                                <MapPin size={16} className="text-gold-primary mt-0.5 shrink-0" />
                                <div className="min-w-0">
                                    <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-0.5">Route</p>
                                    <p className="text-white text-sm font-semibold truncate">{bookingData.pickup}</p>
                                    <p className="text-slate-400 text-xs">→ {bookingData.dropoff}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                {/* Date */}
                                <div className="flex flex-col gap-1 p-3 rounded-xl bg-white/5 border border-white/5">
                                    <Calendar size={14} className="text-gold-primary" />
                                    <p className="text-xs text-slate-500">Date</p>
                                    <p className="text-white text-xs font-semibold leading-tight">{formattedDate}</p>
                                </div>
                                {/* Time */}
                                <div className="flex flex-col gap-1 p-3 rounded-xl bg-white/5 border border-white/5">
                                    <Clock size={14} className="text-gold-primary" />
                                    <p className="text-xs text-slate-500">Time</p>
                                    <p className="text-white text-sm font-semibold">{bookingData.time}</p>
                                </div>
                                {/* Passengers */}
                                <div className="flex flex-col gap-1 p-3 rounded-xl bg-white/5 border border-white/5">
                                    <Users size={14} className="text-gold-primary" />
                                    <p className="text-xs text-slate-500">Pax</p>
                                    <p className="text-white text-sm font-semibold">{bookingData.passengers}</p>
                                </div>
                            </div>

                            {/* Vehicle & Price */}
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                                <div className="flex items-center gap-2">
                                    <Car size={14} className="text-gold-primary shrink-0" />
                                    <p className="text-white text-sm font-semibold">{bookingData.vehicleName}</p>
                                </div>
                                <p className="text-gold-primary text-lg font-bold">
                                    {bookingData.currency === 'USD' ? '$' : ''}{bookingData.totalAmount}{bookingData.currency === 'SAR' ? ' SAR' : ''}
                                </p>
                            </div>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="px-8 pb-8 flex flex-col gap-3"
                        >
                            {/* WhatsApp — Primary CTA */}
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fb85a] text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-[#25D366]/20"
                            >
                                <MessageCircle size={18} />
                                Confirm via WhatsApp
                            </a>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={onPrint}
                                    className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-3 rounded-xl transition-colors"
                                >
                                    <Printer size={16} />
                                    Print Receipt
                                </button>
                                <button
                                    onClick={onClose}
                                    className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-3 rounded-xl transition-colors"
                                >
                                    <Home size={16} />
                                    Return Home
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
