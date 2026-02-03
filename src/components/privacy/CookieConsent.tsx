'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';
import Link from 'next/link';

declare global {
    interface Window {
        gtag: (...args: any[]) => void;
    }
}

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    const updateConsent = (granted: boolean) => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('consent', 'update', {
                'ad_storage': granted ? 'granted' : 'denied',
                'ad_user_data': granted ? 'granted' : 'denied',
                'ad_personalization': granted ? 'granted' : 'denied',
                'analytics_storage': granted ? 'granted' : 'denied'
            });
        }
    };

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');

        if (consent) {
            if (consent === 'accepted') updateConsent(true);
            else if (consent === 'rejected') updateConsent(false);
        } else {
            // Delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'accepted');
        updateConsent(true);
        setIsVisible(false);
    };

    const handleReject = () => {
        localStorage.setItem('cookie_consent', 'rejected');
        updateConsent(false);
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:bottom-8 md:right-8 z-[9999] max-w-sm w-full"
                >
                    <div className="bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] p-6 relative overflow-hidden">
                        {/* Decorative Gradient */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />

                        <div className="flex items-start gap-4 mb-4">
                            <div className="bg-[#D4AF37]/10 p-2.5 rounded-xl text-[#D4AF37] border border-[#D4AF37]/20">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm mb-1">Privacy & Cookies</h3>
                                <p className="text-gray-400 text-xs leading-relaxed">
                                    We use cookies to improve your experience and ensure secure bookings.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleAccept}
                                className="flex-1 bg-white text-black hover:bg-gray-200 text-xs font-bold py-2.5 px-4 rounded-lg transition-colors"
                            >
                                Accept <span className="font-arabic ml-1">موافق</span>
                            </button>
                            <button
                                onClick={handleReject}
                                className="flex-1 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 text-xs font-medium py-2.5 px-4 rounded-lg transition-colors border border-white/5"
                            >
                                Reject
                            </button>
                            <Link href="/cookie-preferences" className="text-[10px] text-gray-500 hover:text-[#D4AF37] transition-colors underline decoration-dotted">
                                Manage
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
