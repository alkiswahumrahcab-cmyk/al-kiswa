'use client';

import React from 'react';

import { MapPin, Calendar, Car, ArrowRight, ShieldCheck, MousePointerClick } from 'lucide-react';
import Link from 'next/link';

const STEPS = {
    en: [
        { id: 1, title: "Search & Schedule", description: "Enter your pickup location and schedule. Our smart system instantly routes your journey.", icon: MapPin, delay: 0.1 },
        { id: 2, title: "Select VIP Vehicle", description: "Choose from our premium GMC Yukon or Family Staria fleet. Transparent pricing, no hidden costs.", icon: Car, delay: 0.2 },
        { id: 3, title: "Instant Confirmation", description: "Receive immediate booking confirmation. Pay securely upon arrival with our trusted service.", icon: ShieldCheck, delay: 0.3 },
    ],
    ar: [
        { id: 1, title: "ابحث وحدد موعدك", description: "أدخل موقع الاستقبال والوقت المطلوب. نظامنا الذكي يرسم مسار رحلتك فوراً.", icon: MapPin, delay: 0.1 },
        { id: 2, title: "اختر المركبة الفاخرة", description: "اختر من أسطولنا المتميز: GMC يونك أو ستاريا العائلي. أسعار شفافة بلا رسوم مخفية.", icon: Car, delay: 0.2 },
        { id: 3, title: "تأكيد فوري", description: "استلم تأكيد حجزك فوراً. ادفع عند الوصول بأمان مع خدمتنا الموثوقة.", icon: ShieldCheck, delay: 0.3 },
    ],
};

interface Props { lang?: 'ar' | 'en'; }

export default function BookingGuide({ lang = 'en' }: Props) {
    const steps = STEPS[lang];
    return (
        <section className="py-24 bg-bg overflow-hidden relative border-t border-border">
            {/* Elegant Background Patterns */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/pattern.png')] mix-blend-overlay" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 text-gold dark:text-gold text-xs font-bold uppercase tracking-widest border border-gold/20 mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
                        {lang === 'ar' ? 'بسيط واحترافي' : 'Simple & Professional'}
                    </div>

                    <h2
                        className="text-4xl md:text-5xl font-black text-ink mb-6 leading-tight tracking-tight"
                    >
                        {lang === 'ar' ? (
                            <>رحلتك في <span className="relative inline-block"><span className="relative z-10 text-gradient-gold">٣ خطوات بسيطة</span></span></>
                        ) : (
                            <>Your Journey in <br className="hidden md:block" /><span className="relative inline-block"><span className="relative z-10 text-gradient-gold">3 Simple Steps</span><span className="absolute bottom-2 left-0 w-full h-3 bg-gold/10 -rotate-1 z-0 rounded-full blur-sm"></span></span></>
                        )}
                    </h2>
                    <p
                        className="text-ink-muted text-lg leading-relaxed font-medium font-light"
                    >
                        {lang === 'ar' ? 'اختبر أعلى معايير نقل العمرة. سلاسة تامة لراحتكم وطمأنينتكم.' : 'Experience the gold standard of Umrah transport. Streamlined for your comfort and peace of mind.'}
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative px-4">
                    {/* Connecting Dotted Line (Desktop) */}
                    <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] border-t-2 border-dashed border-border z-0"></div>

                    {steps.map((step, idx) => (
                        <div
                            key={step.id}
                            className="relative z-10 group"
                        >
                            <div className="flex flex-col items-center text-center">
                                {/* Simplified Icon Container - No Rotation */}
                                <div className="relative mb-6">
                                    <div className="card w-24 h-24 flex items-center justify-center relative z-10 group-hover:bg-ink/5 transition-colors">
                                        <step.icon size={36} className="text-gold" />
                                    </div>

                                    {/* background glow */}
                                    <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full -z-10 transform scale-75 opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {/* Step Number Badge */}
                                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-gold text-black rounded-lg flex items-center justify-center font-bold text-sm shadow-md z-20 border-2 border-bg">
                                        {step.id}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-ink mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-ink-muted leading-relaxed max-w-[260px] mx-auto text-base">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div
                    className="mt-20 text-center"
                >
                    <Link
                        href={lang === 'ar' ? '/ar/booking' : '/booking'}
                        className="btn-primary inline-flex items-center gap-3 px-12 py-6 text-lg group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        {lang === 'ar' ? 'احجز رحلتك الآن' : 'Book Your Ride Now'}
                        <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <p className="mt-6 text-sm font-medium text-ink-muted flex items-center justify-center gap-2 uppercase tracking-wide">
                        <MousePointerClick size={16} className="text-gold" />
                        {lang === 'ar' ? 'لا دفع مسبق مطلوب • الدفع عند الوصول' : 'No prepayment required • Pay upon arrival'}
                    </p>
                </div>
            </div>
        </section>
    );
}
