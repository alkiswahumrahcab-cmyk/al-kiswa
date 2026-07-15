'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';

interface PolicyModalProps {
    isOpen: boolean;
    type: 'cancellation' | 'privacy' | 'guide' | null;
    onClose: () => void;
}

export default function PolicyModal({ isOpen, type, onClose }: PolicyModalProps) {
    const [mounted, setMounted] = React.useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent body scroll and handle ESC key
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') onClose();
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                document.body.style.overflow = '';
                window.removeEventListener('keydown', handleKeyDown);
            };
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen, onClose]);

    if (!mounted) return null;

    let title = '';
    let content = null;

    if (type === 'cancellation') {
        title = 'Cancellation Policy';
        content = (
            <div className="space-y-4 text-sm text-body leading-relaxed">
                <ul className="list-disc pl-5 space-y-2">
                    <li>Free cancellation up to <strong className="text-ink">24 hours</strong> before scheduled pickup.</li>
                    <li>No prepayment required — payment is made in cash on arrival / to the driver.</li>
                    <li>Cancellations within 24 hours: contact us on WhatsApp so we can reassign the vehicle; no card is charged.</li>
                    <li>No-shows: please notify us as early as possible; repeated no-shows may affect future bookings.</li>
                    <li>To cancel or amend, message us on WhatsApp with your booking reference.</li>
                </ul>
            </div>
        );
    } else if (type === 'privacy') {
        title = 'Privacy Policy';
        content = (
            <div className="space-y-4 text-sm text-body leading-relaxed">
                <ul className="list-disc pl-5 space-y-2">
                    <li>We collect only the details needed to arrange your transport: name, contact, flight/itinerary details, and passenger count.</li>
                    <li>Your data is used solely to confirm and deliver your booking and to contact you about it.</li>
                    <li>We do not sell your data. It is shared only with the assigned driver/operator to fulfil your trip.</li>
                    <li>You can request access to or deletion of your data via WhatsApp/email.</li>
                </ul>
                <div className="pt-4 border-t border-border mt-4">
                    <Link href="/privacy" className="text-gold hover:underline font-medium" onClick={onClose}>
                        Read full Privacy Policy &rarr;
                    </Link>
                </div>
            </div>
        );
    } else if (type === 'guide') {
        title = 'Booking Guide';
        content = (
            <div className="space-y-4 text-sm text-body leading-relaxed">
                <ol className="list-decimal pl-5 space-y-3">
                    <li><strong>Build your itinerary:</strong> select route(s), date, time, and passengers.</li>
                    <li><strong>Choose your vehicle:</strong> select from our fleet (GMC Yukon XL, Hyundai Staria, Toyota HiAce/Coaster, Camry, Kia K5, Xpander).</li>
                    <li><strong>Enter guest details:</strong> submit your info — <strong className="text-gold">no payment is taken online.</strong></li>
                    <li><strong>Confirmation:</strong> Our team confirms availability and contacts you <strong className="text-ink">before your flight</strong> with driver and vehicle details.</li>
                    <li><strong>Arrival:</strong> Meet your driver on arrival; pay in cash. Free cancellation up to 24h.</li>
                </ol>
                <div className="bg-surface-alt p-4 rounded-lg mt-4 border border-border">
                    <p className="text-xs text-muted">
                        <strong className="text-gold">Tip:</strong> Add your flight number for airport pickups, and note any requirements for child seats or extra luggage in the details field.
                    </p>
                </div>
            </div>
        );
    }

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <div 
                    className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="policy-modal-title"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-surface border border-border rounded-2xl shadow-xl flex flex-col max-h-[85vh] overflow-hidden"
                    >
                        <div className="flex items-center justify-between p-5 border-b border-border bg-surface-alt">
                            <h3 id="policy-modal-title" className="text-lg font-semibold text-ink font-display tracking-wide">
                                {title}
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-muted hover:text-ink transition-colors p-1 rounded-btn hover:bg-surface"
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="p-6 overflow-y-auto">
                            {content}
                        </div>
                        
                        <div className="p-5 border-t border-border bg-surface-alt flex justify-end">
                            <button 
                                onClick={onClose}
                                className="px-5 py-2 bg-border hover:bg-gold/20 text-ink rounded-lg text-sm font-bold transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
}
