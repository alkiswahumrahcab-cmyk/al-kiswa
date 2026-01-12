'use client';

import React from 'react';
import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { trackConversion } from '@/lib/analytics';
import FadeIn from '@/components/common/FadeIn';

interface ContactGridProps {
    contactSettings: {
        phone: string;
        email: string;
        address: string;
    }
}

export default function ContactGrid({ contactSettings }: ContactGridProps) {
    const { phone, email, address } = contactSettings;
    const whatsapp = phone;

    const contactCards = [
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
            icon: MessageCircle,
            title: "WhatsApp Support (واتساب)",
            value: "Instant replies for bookings",
            sub: "Average response: < 5 mins",
            action: `https://wa.me/${whatsapp.replace(/\D/g, '')}`,
            btnText: "Chat on WhatsApp",
            type: 'whatsapp'
        },
        {
            icon: Mail,
            title: "Email Us (البريد الإلكتروني)",
            value: email,
            sub: "For quote requests & inquiries",
            action: `mailto:${email}`,
            btnText: "Send Email",
            type: 'email'
        },
        {
            icon: MapPin,
            title: "Visit Our Office (موقعنا)",
            value: address,
            sub: "Open Daily: 9 AM - 10 PM",
            action: "#map",
            btnText: "View Location",
            type: 'other'
        }
    ];

    return (
        <FadeIn direction="right" delay={0.2}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {contactCards.map((card, index) => (
                    <GlassCard key={index} className="p-6 hover:border-gold-primary/50 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] bg-black/40 border-white/10">
                        <div className="flex items-start gap-4">
                            <div className="p-4 bg-gold-primary/10 rounded-2xl text-gold-primary group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                                <card.icon size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold font-sans text-lg text-white mb-1">{card.title}</h3>
                                <p className="font-medium text-gray-200 mb-1">{card.value}</p>
                                <p className="text-sm text-gray-500 mb-3">{card.sub}</p>
                                <a
                                    href={card.action}
                                    target={card.action.startsWith('http') ? "_blank" : "_self"}
                                    rel="noopener noreferrer"
                                    onClick={() => trackConversion(card.type as any, 'contact_page')}
                                    className="inline-flex items-center text-sm font-bold text-gold-primary hover:text-white transition-colors"
                                >
                                    {card.btnText} →
                                </a>
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </FadeIn>
    );
}
