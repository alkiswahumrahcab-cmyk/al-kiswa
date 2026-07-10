'use client';

import React from 'react';
import Image from 'next/image';
import { Star, ShieldCheck, UserCheck, Languages } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';

const enDrivers = [
    {
        name: "Capt. Ahmed Al-Harbi",
        role: "Senior Chauffeur",
        experience: "12 Years",
        languages: ["Arabic", "English"],
        image: "/images/drivers/driver-placeholder-1.jpg",
        badge: "Top Rated"
    },
    {
        name: "Capt. Muhammad Yasin",
        role: "VIP Specialist",
        experience: "8 Years",
        languages: ["Urdu", "Arabic", "English"],
        image: "/images/drivers/driver-placeholder-2.jpg",
        badge: "Hajj Expert"
    },
    {
        name: "Capt. Ibrahim S.",
        role: "Bus Captain",
        experience: "15 Years",
        languages: ["Arabic", "Indonesian"],
        image: "/images/drivers/driver-placeholder-3.jpg",
        badge: "Safety Award"
    }
];

const arDrivers = [
    {
        name: "الكابتن أحمد الحربي",
        role: "كبير السائقين",
        experience: "١٢ سنة",
        languages: ["العربية", "الإنجليزية"],
        image: "/images/drivers/driver-placeholder-1.jpg",
        badge: "الأعلى تقييماً"
    },
    {
        name: "الكابتن محمد ياسين",
        role: "أخصائي كبار الشخصيات",
        experience: "٨ سنوات",
        languages: ["الأردية", "العربية", "الإنجليزية"],
        image: "/images/drivers/driver-placeholder-2.jpg",
        badge: "خبير الحج"
    },
    {
        name: "الكابتن إبراهيم س.",
        role: "كابتن حافلة",
        experience: "١٥ سنة",
        languages: ["العربية", "الإندونيسية"],
        image: "/images/drivers/driver-placeholder-3.jpg",
        badge: "جائزة السلامة"
    }
];

interface Props {
    lang?: 'ar' | 'en';
}

export default function MeetOurDrivers({ lang = 'en' }: Props) {
    const isAr = lang === 'ar';
    const drivers = isAr ? arDrivers : enDrivers;

    const content = {
        badgeTitle: isAr ? "فريق محترف" : "Professional Team",
        title: isAr ? (
            <>
                تعرف على <span className="text-gold">سائقينا الموثوقين</span>
            </>
        ) : (
            <>
                Meet Your <span className="text-gold">Trusted Chauffeurs</span>
            </>
        ),
        subtitle: isAr ? "الأمر لا يقتصر على السيارة فحسب، بل على من يقودها. سائقونا محترفون مرخصون من الوزارة، تم اختيارهم بعناية وتدريبهم لخدمة ضيوف الرحمن بكل كرامة واهتمام." : "It’s not just about the car; it’s about who drives it. Our chauffeurs are handpicked, Ministry-licensed professionals trained to serve the Guests of Allah with dignity and care.",
        expLabel: isAr ? "خبرة" : "Experience",
        speaksLabel: isAr ? "يتحدث" : "Speaks"
    };

    return (
        <section className={`py-20 bg-neutral-900 border-t border-white/5 relative overflow-hidden ${isAr ? 'rtl font-cairo' : 'ltr'}`} dir={isAr ? 'rtl' : 'ltr'}>
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <FadeIn>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full mb-6">
                            <ShieldCheck size={18} />
                            <span className="text-sm font-bold uppercase tracking-wider" style={isAr ? { fontFamily: 'var(--font-tajawal)' } : {}}>{content.badgeTitle}</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-serif">
                            {content.title}
                        </h2>
                        <p className="text-n-400 text-lg font-light leading-relaxed" style={isAr ? { fontFamily: 'var(--font-tajawal)' } : {}}>
                            {content.subtitle}
                        </p>
                    </div>
                </FadeIn>

                <div className="grid md:grid-cols-3 gap-8">
                    {drivers.map((driver, index) => (
                        <FadeIn key={index} delay={index * 0.1}>
                            <div className="group relative bg-charcoal border border-white/10 rounded-3xl overflow-hidden hover:border-gold/40 transition-all duration-500">
                                {/* Image Area */}
                                <div className="relative h-80 overflow-hidden bg-neutral-800">
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-charcoal/90 z-10" />
                                    <div className="w-full h-full flex items-center justify-center bg-neutral-800 group-hover:scale-105 transition-transform duration-700">
                                        <UserCheck size={64} className="text-neutral-700" />
                                    </div>

                                    <div className={`absolute bottom-4 ${isAr ? 'right-4' : 'left-4'} z-20`}>
                                        <div className="bg-gold text-black text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block" style={isAr ? { fontFamily: 'var(--font-tajawal)' } : {}}>
                                            {driver.badge}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 relative">
                                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-gold transition-colors font-sans">{driver.name}</h3>
                                    <p className="text-gold/80 mb-6" style={isAr ? { fontFamily: 'var(--font-tajawal)' } : {}}>{driver.role}</p>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-n-400 text-sm">
                                            <div className="bg-white/5 p-2 rounded-lg shrink-0">
                                                <ShieldCheck size={16} className="text-gold" />
                                            </div>
                                            <span style={isAr ? { fontFamily: 'var(--font-tajawal)' } : {}}>
                                                {isAr ? `${driver.experience} ${content.expLabel}` : `${driver.experience} ${content.expLabel}`}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 text-n-400 text-sm">
                                            <div className="bg-white/5 p-2 rounded-lg shrink-0">
                                                <Languages size={16} className="text-gold" />
                                            </div>
                                            <span style={isAr ? { fontFamily: 'var(--font-tajawal)' } : {}}>
                                                {content.speaksLabel} {driver.languages.join("، ")}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
