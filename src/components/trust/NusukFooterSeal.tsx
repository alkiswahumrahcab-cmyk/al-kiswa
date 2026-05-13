'use client';

import React from 'react';
import { ShieldCheck, Phone } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import Link from 'next/link';

const NusukFooterSeal = () => {
    const { settings } = useSettings();
    const whatsappNumber = settings?.contact?.whatsapp || "+966548707332";

    return (
        <div className="w-full bg-gradient-to-r from-[#0f3d2b] via-[#112a20] to-[#0f3d2b] border-y border-[#1b5e43] py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    
                    {/* Left: Seal and Text */}
                    <div className="flex items-center gap-6 max-w-2xl text-center lg:text-left">
                        <div className="hidden sm:flex w-20 h-20 rounded-full bg-white/5 items-center justify-center border-2 border-[#34d399]/30 shrink-0">
                            <ShieldCheck size={40} className="text-[#34d399]" />
                        </div>
                        <div>
                            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                                <ShieldCheck size={20} className="text-[#34d399] sm:hidden" />
                                <h3 className="text-white font-bold text-xl uppercase tracking-wider">
                                    Nusuk Verified Platform
                                </h3>
                            </div>
                            <p className="text-[#34d399]/80 text-sm leading-relaxed">
                                All Al Kiswah Umrah Cab vehicles are officially registered on the Nusuk platform — the Ministry of Hajj & Umrah's government-verified system for licensed pilgrim transport in Saudi Arabia.
                            </p>
                        </div>
                    </div>

                    {/* Right: Quick Links */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                        <a 
                            href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b958] text-white px-6 py-3 rounded-lg font-bold transition-colors w-full sm:w-auto text-sm whitespace-nowrap"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                            </svg>
                            WhatsApp Us
                        </a>
                        <Link 
                            href="/contact"
                            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-bold transition-colors w-full sm:w-auto text-sm border border-white/20 whitespace-nowrap"
                        >
                            <Phone size={18} />
                            Contact Support
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default NusukFooterSeal;
