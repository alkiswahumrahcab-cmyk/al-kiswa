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
                    <div className="bg-surface backdrop-blur-xl border border-border rounded-xl shadow-xl p-6 relative overflow-hidden">
                        <div className="flex items-start gap-4 mb-5">
                            <div className="bg-gold-soft p-2.5 rounded-lg text-gold-strong shrink-0">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <h3 className="text-ink font-semibold font-display text-base mb-1">Privacy & Cookies</h3>
                                <p className="text-body text-[13px] leading-relaxed font-body">
                                    We use cookies to improve your experience and ensure secure bookings.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleAccept}
                                className="flex-1 bg-gold hover:bg-gold-soft text-ink text-[13px] font-semibold py-2.5 px-4 rounded-btn transition-colors border border-transparent shadow-sm"
                            >
                                Accept <span className="font-arabic ml-1 font-normal">موافق</span>
                            </button>
                            <button
                                onClick={handleReject}
                                className="flex-1 bg-surface text-ink hover:bg-surface-alt hover:text-gold-strong text-[13px] font-medium py-2.5 px-4 rounded-btn transition-colors border border-border shadow-sm"
                            >
                                Reject
                            </button>
                            <Link href="/cookie-preferences" className="text-[11px] text-muted hover:text-gold-strong transition-colors underline decoration-dotted font-body ml-1">
                                Manage
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
