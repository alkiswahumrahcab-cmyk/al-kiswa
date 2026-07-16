'use client';

import React from 'react';
import { Mail, MapPin, Phone, MessageCircle, Star, ArrowRight } from 'lucide-react';
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
            title: "WhatsApp Support (دعم واتساب)",
            value: "Instant replies for bookings",
            sub: "Average response: < 5 mins",
            action: `https://wa.me/${whatsapp.replace(/\D/g, '')}`,
            btnText: "Chat on WhatsApp",
            type: 'whatsapp'
        },
        {
            icon: Phone,
            title: "Call Us 24/7 (اتصل بنا)",
            value: phone,
            sub: "Support in English, Arabic, Urdu",
            action: `tel:${phone.replace(/\s/g, '')}`,
            btnText: "Call Now",
            type: 'call'
        },
        {
            icon: Mail,
            title: "Email Us (راسلنا)",
            value: (
                <div className="flex flex-col gap-1 py-1">
                    <a href="mailto:booking@kiswahumrahcab.com" className="hover:text-gold-strong transition-colors truncate">booking@kiswahumrahcab.com</a>
                    <a href="mailto:info@kiswahumrahcab.com" className="hover:text-gold-strong transition-colors truncate">info@kiswahumrahcab.com</a>
                    <a href="mailto:partnership@kiswahumrahcab.com" className="hover:text-gold-strong transition-colors truncate">partnership@kiswahumrahcab.com</a>
                </div>
            ),
            sub: "For quote requests & inquiries",
            action: `mailto:${email}`,
            btnText: "Send Email",
            type: 'email'
        },
        {
            icon: MapPin,
            title: "Visit Our Office (مكتبنا)",
            value: address,
            sub: "Open Daily: 9 AM - 10 PM",
            action: "#map",
            btnText: "View Location",
            type: 'other'
        },
        {
            icon: Star,
            title: "Google Verified Business",
            value: "5.0 Rating ⭐⭐⭐⭐⭐",
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
                        className={`p-8 transition-all duration-300 group border-border rounded-[20px] ${
                            card.type === 'whatsapp' 
                                ? 'bg-surface-alt border-gold-line shadow-sm hover:shadow-md' 
                                : 'bg-surface shadow-sm hover:shadow-md'
                        }`}
                    >
                        <div className="flex items-start gap-5">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gold-soft text-gold shrink-0 transition-transform group-hover:scale-110">
                                <card.icon size={22} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold font-display text-lg text-ink mb-1 flex items-center gap-2">
                                    {card.title}
                                    {card.type === 'whatsapp' && (
                                        <span className="text-[10px] uppercase tracking-wider bg-gold text-white px-2 py-0.5 rounded-full">Primary</span>
                                    )}
                                </h3>
                                <div className="font-medium text-body mb-1">{card.value}</div>
                                <p className="text-sm text-muted mb-4">{card.sub}</p>
                                <a
                                    href={card.action}
                                    target={card.action.startsWith('http') ? "_blank" : "_self"}
                                    rel="noopener noreferrer"
                                    onClick={() => trackConversion(card.type as any, 'contact_page')}
                                    className={`inline-flex items-center gap-1.5 text-sm font-bold transition-colors ${
                                        card.type === 'whatsapp'
                                            ? 'btn-primary px-5 py-2.5 rounded-[12px]'
                                            : 'text-gold-strong hover:text-gold-deep'
                                    }`}
                                >
                                    {card.btnText} <ArrowRight size={16} className={card.type === 'whatsapp' ? "" : "transition-transform group-hover:translate-x-1"} />
                                </a>
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </FadeIn>
    );
}

