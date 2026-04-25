'use client';

import React, { useState, useEffect } from 'react';
import { Mic, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WhatsAppVoiceButtonProps {
    phoneNumber?: string;
}

export default function WhatsAppVoiceButton({ phoneNumber = '966570000000' }: WhatsAppVoiceButtonProps) {
    const [showTooltip, setShowTooltip] = useState(false);

    // Show tooltip automatically after a few seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTooltip(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 translate-x-3 4xl:translate-x-0">
            {/* Helper Tooltip (Speech Bubble) */}
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="bg-white text-black px-4 py-3 rounded-2xl rounded-br-none shadow-xl max-w-[200px] relative border border-gray-100 hidden md:block"
                    >
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowTooltip(false);
                            }}
                            className="absolute -top-2 -left-2 bg-gray-200 rounded-full p-0.5 hover:bg-red-100 hover:text-red-500 transition-colors"
                        >
                            <X size={12} />
                        </button>
                        <p className="text-sm font-bold leading-tight">
                            Difficult to type?
                            <span className="block text-xs font-normal text-gray-600 mt-1">Send us a voice note on WhatsApp! 🎙️</span>
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Button */}
            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all hover:scale-110 active:scale-95"
                aria-label="Contact on WhatsApp"
            >
                {/* Ping Animation */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-20 animate-ping duration-1000 -z-10"></span>
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-10 animate-ping duration-[1.5s] delay-150 -z-10"></span>

                {/* WhatsApp Icon SVG */}
                <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-7 h-7 md:w-9 md:h-9 relative z-10"
                >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>

                {/* Mini Mic Icon Badge */}
                <div className="absolute -bottom-1 -right-1 bg-white text-[#25D366] rounded-full p-1.5 shadow-md border border-gray-100">
                    <Mic size={14} strokeWidth={3} />
                </div>
            </a>
        </div>
    );
}
