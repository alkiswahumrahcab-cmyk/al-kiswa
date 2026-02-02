'use client';

import React from 'react';
import { MessageCircle, Mic } from 'lucide-react';

import { useSettings } from '@/context/SettingsContext';

export default function WhatsAppVoiceButton() {
    const { settings } = useSettings();

    // Get number from settings or fallback
    const rawPhone = settings?.contact.whatsapp || settings?.contact.phone || '966545494921';
    const cleanPhone = rawPhone.replace(/\D/g, ''); // Remove all non-numeric characters

    return (
        <a
            href={`https://wa.me/${cleanPhone}?text=Salam,%20I%20would%20like%20to%20book%20a%20ride.%20Sending%20voice%20note...`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#1dbf57] text-white p-4 rounded-xl flex items-center justify-between gap-4 group transition-all shadow-lg shadow-[#25D366]/20 border border-white/10"
        >
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                    <Mic size={24} className="text-white" />
                </div>
                <div className="flex flex-col text-left">
                    <span className="font-bold text-lg leading-tight">Trouble Typing?</span>
                    <span className="text-sm text-green-50 font-medium">Send us a Voice Note instead</span>
                </div>
            </div>
            <MessageCircle size={28} className="text-white/80 group-hover:scale-110 transition-transform" />
        </a>
    );
}
