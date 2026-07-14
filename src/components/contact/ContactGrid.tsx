'use client';

import React from 'react';
import { Mail, MapPin, Phone, MessageCircle, Star } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { trackConversion } from '@/lib/analytics';
import FadeIn from '@/components/common/FadeIn';
import { useSettings } from '@/context/SettingsContext';

interface ContactGridProps {
    contactSettings: {
        phone: string;
        email: string;
        address: string;
    }
}

export default function ContactGrid({ contactSettings }: ContactGridProps) {
    const { phone, email, address } = contactSettings;
    const { settings } = useSettings();
    const whatsapp = settings?.contact?.whatsapp || phone;
    const googleBusiness = settings?.contact?.social?.googleBusiness || "https://share.google/ARbbVaAackyOs8N7G";

    const contactCards = [
        {
            icon: MessageCircle,
            title: "WhatsApp Support (??????)",
            value: "Instant replies for bookings",
            sub: "Average response: < 5 mins",
            action: `https://wa.me/${whatsapp.replace(/\D/g, '')}`,
            btnText: "Chat on WhatsApp",
            type: 'whatsapp'
        },
        {
            icon: Phone,
            title: "Call Us 24/7 (???? ???)",
            value: phone,
            sub: "Support in English, Arabic, Urdu",
            action: `tel:${phone.replace(/\s/g, '')}`,
            btnText: "Call Now",
            type: 'call'
        },
        {
            icon: Mail,
            title: "Email Us (?????? ??????????)",
            value: email,
            sub: "For quote requests & inquiries",
            action: `mailto:${email}`,
            btnText: "Send Email",
            type: 'email'
        },
        {
            icon: MapPin,
            title: "Visit Our Office (??????)",
            value: address,
            sub: "Open Daily: 9 AM - 10 PM",
            action: "#map",
            btnText: "View Location",
            type: 'other'
        },
        {
            icon: Star,
            title: "Google Verified Business",
            value: "5.0 Rating \u2B50\u2B50\u2B50\u2B50\u2B50",
            sub: "Read our verified pilgrim reviews",
            action: googleBusiness,
            btnText: "View on Google",
            type: 'other'
        }
    ];

    return (
        <FadeIn direction="right" delay={0.2}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {contactCards.map((card, index) => (
                    <GlassCard 
                        key={index} 
                        className={`p-6 transition-all duration-300 group border-white/10 ${
                            card.type === 'whatsapp' 
                                ? 'bg-gold-dark/30 border-gold/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]' 
                                : 'bg-black/40 hover:border-gold/50 hover:shadow-[0_0_20px_hsl(var(--gold-glow) / 0.15)]'
                        }`}
                    >
                        <div className="flex items-start gap-4">
                            <div className={`p-4 rounded-2xl group-hover:scale-110 transition-transform ${
                                card.type === 'whatsapp'
                                    ? 'bg-gold/20 text-gold shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                                    : 'bg-gold/10 text-gold shadow-[0_0_10px_hsl(var(--gold-glow) / 0.2)]'
                            }`}>
                                <card.icon size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold font-display text-lg text-white mb-1 flex items-center gap-2">
                                    {card.title}
                                    {card.type === 'whatsapp' && (
                                        <span className="text-[10px] uppercase tracking-wider bg-gold/20 text-gold px-2 py-0.5 rounded-full">Primary</span>
                                    )}
                                </h3>
                                <p className="font-medium text-white/90 mb-1">{card.value}</p>
                                <p className="text-sm text-white/50 mb-3">{card.sub}</p>
                                <a
                                    href={card.action}
                                    target={card.action.startsWith('http') ? "_blank" : "_self"}
                                    rel="noopener noreferrer"
                                    onClick={() => trackConversion(card.type as any, 'contact_page')}
                                    className={`inline-flex items-center text-sm font-bold transition-colors ${
                                        card.type === 'whatsapp'
                                            ? 'bg-gold hover:bg-gold text-black px-4 py-2 rounded-btn mt-2'
                                            : 'text-gold hover:text-white'
                                    }`}
                                >
                                    {card.btnText} ?
                                </a>
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </FadeIn>
    );
}

