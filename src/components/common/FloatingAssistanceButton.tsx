'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';

export default function FloatingAssistanceButton() {
    const { settings } = useSettings();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling down a bit (e.g., past the hero)
            setVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!settings) return null;

    const whatsappNumber = settings.contact.phone.replace(/\s+/g, ''); // Ensure clean number
    const whatsappMessage = encodeURIComponent("Salam! I need help booking a ride. Please assist me.");
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return (
        <div
            className={`fixed bottom-6 right-6 z-50 flex flex-col gap-3 transition-all duration-500 transform ${visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
                }`}
        >
            {/* Helper Text Badge (Pulse Animation) */}
            <div className="absolute -top-12 right-0 bg-white text-black text-xs font-bold py-1.5 px-3 rounded-xl shadow-lg border border-gold/20 whitespace-nowrap animate-bounce origin-bottom-right hidden md:block">
                Need Help? Chat with us!
                <div className="absolute bottom-0 right-4 translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-gold/20"></div>
            </div>

            {/* Main WhatsApp Button */}
            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 px-5 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.5)] hover:scale-105 transition-all duration-300 group"
                aria-label="Book via WhatsApp"
            >
                <MessageCircle size={28} className="fill-white text-[#25D366]" />
                <span className="font-bold text-base hidden md:inline">Book on WhatsApp</span>
            </a>

            {/* Phone Button (Mobile Only - Optional secondary action) */}
            {/* 
            <a
                href={`tel:${whatsappNumber}`}
                className="md:hidden flex items-center justify-center w-14 h-14 bg-white text-black rounded-full shadow-lg border border-gray-200"
            >
               <Phone size={24} />
            </a> 
            */}
        </div>
    );
}
