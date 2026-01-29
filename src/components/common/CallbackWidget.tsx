'use client';

import React, { useState, useEffect } from 'react';
import { Phone, X, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CallbackWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [phone, setPhone] = useState('');

    // Show widget after 15 seconds or scroll
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 15000); // 15 seconds delay to not be annoying

        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/callback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone }),
            });

            if (response.ok) {
                console.log("Callback requested for:", phone);
                setSubmitted(true);
                setTimeout(() => {
                    setIsOpen(false);
                    setTimeout(() => setSubmitted(false), 500);
                }, 3000);
            } else {
                console.error("Failed to request callback");
                // Optional: Show error state
            }
        } catch (error) {
            console.error("Error submitting callback:", error);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-36 md:bottom-40 right-4 z-40 flex flex-col items-end gap-2">

            {/* Expanded Widget */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="bg-primary-black/90 backdrop-blur-xl border border-gold-primary/30 p-6 rounded-2xl shadow-2xl w-80 mb-4"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-white"
                        >
                            <X size={18} />
                        </button>

                        {!submitted ? (
                            <>
                                <div className="flex items-center gap-3 mb-4 text-gold-primary">
                                    <div className="bg-gold-primary/10 p-2 rounded-full">
                                        <Clock size={20} />
                                    </div>
                                    <h3 className="font-bold text-lg text-white">Request a Call</h3>
                                </div>
                                <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                                    Prefer to talk to a human? Enter your number and our VIP team will call you back within 5 minutes.
                                </p>
                                <form onSubmit={handleSubmit} className="space-y-3">
                                    <input
                                        type="tel"
                                        placeholder="Your Phone Number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-gold-primary/50 focus:outline-none transition-colors"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="w-full bg-gold-primary hover:bg-gold-dark text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                                    >
                                        Call Me Back <ArrowRight size={18} />
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="text-center py-4">
                                <div className="mx-auto bg-green-500/10 text-green-500 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                                    <CheckCircle size={24} />
                                </div>
                                <h3 className="font-bold text-white mb-2">Request Received!</h3>
                                <p className="text-sm text-gray-400">
                                    Stand by, our agent is dialing you now.
                                </p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Trigger Button */}
            {!isOpen && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setIsOpen(true)}
                    className="group flex items-center gap-3 bg-white text-black px-4 py-3 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(239,191,91,0.4)] border border-transparent hover:border-gold-primary transition-all duration-300"
                >
                    <div className="bg-black text-white p-2 rounded-full relative">
                        <Phone size={18} className="fill-current" />
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse border-2 border-white" />
                    </div>
                    <div className="flex flex-col items-start">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Have Questions?</span>
                        <span className="text-sm font-bold">Request Callback</span>
                    </div>
                </motion.button>
            )}
        </div>
    );
}
