'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle, Shield, Star, CreditCard, ArrowLeft } from 'lucide-react';

interface CheckoutHeaderProps {
    contactSettings?: {
        phone: string;
        email?: string;
    };
}

export default function CheckoutHeader({ contactSettings }: CheckoutHeaderProps) {
    const whatsappNumber = contactSettings?.phone || '966548707332';
    const whatsappMessage = encodeURIComponent('Hello, I need help with my booking.');
    const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

    return (
        <header className="sticky top-0 z-50 bg-primary-black/95 backdrop-blur-xl border-b border-gold/20 shadow-xl">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                
                {/* Left: Logo & Home Link */}
                {/* Left: Logo & Home Link */}
                <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-80">
                    <span className="font-sans font-bold text-white tracking-wide text-xl leading-none">
                        Al Kiswah
                    </span>
                    <span className="text-[0.60rem] font-bold text-gold tracking-[0.2em] uppercase leading-none border-l border-white/20 pl-2">
                        Checkout
                    </span>
                </Link>

                {/* Center/Right: Trust Badges (Hidden on mobile) */}
                <div className="hidden md:flex items-center gap-6">
                    <div className="flex items-center gap-2 text-xs text-gray-300 font-medium">
                        <Shield size={16} className="text-gold" />
                        <span>Ministry Licensed</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-300 font-medium">
                        <CreditCard size={16} className="text-gold" />
                        <span>Pay on Arrival</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-300 font-medium">
                        <Star size={16} className="text-gold" />
                        <span>4.9★ Rated</span>
                    </div>
                </div>

                {/* Mobile Trust Line */}
                <div className="flex md:hidden items-center gap-1.5 text-[10px] text-gray-300 font-medium">
                    <Shield size={12} className="text-gold" />
                    <span>Secure Booking</span>
                </div>

                {/* Right: WhatsApp Button */}
                <div>
                    {/* Desktop Button */}
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex items-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 px-4 py-2 rounded-full text-sm font-bold transition-colors"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Need Help?
                    </a>
                    {/* Mobile Icon */}
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex md:hidden items-center justify-center w-10 h-10 bg-[#25D366]/10 text-[#25D366] rounded-full border border-[#25D366]/30"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                    </a>
                </div>
                
            </div>
        </header>
    );
}
