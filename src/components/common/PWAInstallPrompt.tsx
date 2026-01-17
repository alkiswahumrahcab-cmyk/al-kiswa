'use client';

import { useEffect, useState } from 'react';
import { X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PWAInstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        // Check if already in standalone mode or dismissed
        const isDismissed = localStorage.getItem('pwa_prompt_dismissed') === 'true';
        if (
            window.matchMedia('(display-mode: standalone)').matches ||
            (window.navigator as any).standalone ||
            isDismissed
        ) {
            setIsStandalone(true);
            return;
        }

        const handler = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            // Only show if not dismissed (double check inside handler for safety)
            if (!localStorage.getItem('pwa_prompt_dismissed')) {
                setShowPrompt(true);
            }
        };

        window.addEventListener('beforeinstallprompt', handler);

        // iOS Detection
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIosDevice = /iphone|ipad|ipod/.test(userAgent);

        if (isIosDevice && !(window.navigator as any).standalone && !isDismissed) {
            setIsIOS(true);
            setShowPrompt(true);
        }

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleDismiss = () => {
        setShowPrompt(false);
        localStorage.setItem('pwa_prompt_dismissed', 'true');
    };

    const handleInstallClick = async () => {
        if (isIOS) {
            // Show instructions for iOS
            alert("To install on iOS:\n1. Tap the Share button below\n2. Select 'Add to Home Screen'");
            // Don't permanently dismiss on iOS instruction view, or maybe we should?
            // Let's dismiss it to respect "show only one time"
            localStorage.setItem('pwa_prompt_dismissed', 'true');
            return;
        }

        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            setShowPrompt(false);
            localStorage.setItem('pwa_prompt_dismissed', 'true');
        }
        setDeferredPrompt(null);
    };

    if (!showPrompt || isStandalone) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-24 left-4 right-4 z-50 md:bottom-8 md:left-1/2 md:right-auto md:-translate-x-1/2 flex justify-center"
            >
                <div className="bg-[#1e293b] border border-gray-700/50 rounded-2xl shadow-2xl p-4 flex items-center gap-4 w-full max-w-sm backdrop-blur-sm">
                    {/* Icon */}
                    <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/20">
                        <Download className="text-black w-6 h-6" />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold text-sm">Install Al Kiswah App</h3>
                        <p className="text-gray-400 text-xs truncate">Add to home screen for quick access</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleDismiss}
                            className="text-gray-400 hover:text-white p-2"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleInstallClick}
                            className="bg-white text-black text-sm font-bold px-4 py-2 rounded-full hover:bg-gray-100 transition-colors shadow-sm"
                        >
                            Install
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
