'use client';

import Link from 'next/link';
import { CheckCircle2, Quote } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';

export default function WelcomeSection() {

    const parseMarkdown = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
        return parts.map((part, index) => {
            if (part && part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index} className="font-bold text-white">{part.slice(2, -2)}</strong>;
            }
            const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
            if (linkMatch) {
                return (
                    <Link href={linkMatch[2]} key={index} className="text-gold-primary font-semibold hover:underline decoration-2 underline-offset-2 transition-all hover:text-gold-light">
                        {linkMatch[1]}
                    </Link>
                );
            }
            return part;
        });
    };

    const whyChooseUsItems = [
        "**Reliable pilgrim transport** across Saudi Arabia",
        "**Specialized routes for Umrah pilgrims** (Makkah, Madinah, Jeddah)",
        "**Comfortable seating and air‑conditioned vehicles**",
        "**Affordable packages with transparent pricing**",
        "**Spiritual commitment to serving the Guests of Allah**"
    ];

    return (
        <section className="py-20 md:py-24 bg-transparent relative z-10">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <FadeIn>
                        <span className="text-gold-primary font-bold uppercase tracking-[0.2em] text-sm mb-4 block">
                            Welcome | أهلاً بك
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-sans leading-tight">
                            Welcome to Al Kiswah <br />
                            <span className="text-gold-primary italic font-serif">Umrah Transport</span>
                            <span className="block text-3xl md:text-5xl mt-4 font-reem-kufi text-white/90">الكسوة لنقل المعتمرين</span>
                        </h2>
                        <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
                            Your trusted partner in pilgrim travel across Saudi Arabia.
                            <span className="block font-arabic text-lg mt-2 text-gold-primary/80">شريكك الموثوق في رحلات العمرة عبر المملكة العربية السعودية.</span>
                        </p>
                    </FadeIn>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">

                    {/* Intro Content */}
                    <div className="space-y-8">
                        <FadeIn delay={0.2}>
                            <p className="text-lg leading-relaxed text-gray-300">
                                {parseMarkdown("We specialize in providing **safe, comfortable, and affordable [Umrah transport services](/services)** for pilgrims traveling to Makkah, Madinah, and beyond.")}
                            </p>

                            <div className="bg-gradient-to-r from-gold-primary/10 to-transparent border-l-4 border-gold-primary p-8 rounded-r-2xl my-8">
                                <p className="text-2xl font-serif italic text-white mb-3">
                                    &quot;Serving the Guests of Allah with comfort and care is our mission.&quot;
                                </p>
                                <p className="text-xl font-arabic text-gold-primary" dir="rtl">
                                    "خدمة ضيوف الرحمن راحة وأمانة."
                                </p>
                            </div>

                            <p className="text-lg leading-relaxed text-gray-300">
                                {parseMarkdown("Our fleet of [modern buses and vans](/fleet) ensures **stress‑free [Jeddah Airport transfers](/services/jeddah-airport-transfer) and [Makkah to Madinah journeys](/services/makkah-madinah-taxi)**. We provide professional drivers dedicated to hospitality and punctuality. Whether you are traveling solo, with family, or in large groups, Al Kiswah Umrah Transport offers **[customized packages](/booking)** to meet your needs.")}
                            </p>
                        </FadeIn>
                    </div>

                    {/* Features & Quote */}
                    <div className="space-y-8">
                        {/* Features Box */}
                        <FadeIn delay={0.4}>
                            <div className="glass-card-emerald p-8 md:p-10">
                                <h3 className="text-2xl font-bold text-white mb-8 font-sans flex justify-between items-center border-b border-white/10 pb-4">
                                    Why Choose Us?
                                    <span className="font-reem-kufi text-2xl text-gold-primary">لماذا نحن؟</span>
                                </h3>
                                <ul className="space-y-5">
                                    {whyChooseUsItems.map((item, index) => (
                                        <li key={index} className="flex items-start gap-4 group">
                                            <CheckCircle2 className="text-emerald-500 shrink-0 mt-1 bg-emerald-500/10 rounded-full p-0.5" size={24} />
                                            <span className="text-gray-300 group-hover:text-white transition-colors">{parseMarkdown(item)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </FadeIn>

                        {/* Spiritual Quote */}
                        <FadeIn delay={0.6}>
                            <div className="bg-gradient-to-br from-neutral-900 to-black text-white p-8 rounded-3xl relative overflow-hidden border border-white/5 shadow-2xl group hover:border-gold-primary/30 transition-colors duration-500">
                                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10 mix-blend-overlay pointer-events-none" />
                                <Quote className="absolute top-6 right-6 text-gold-primary/10 group-hover:text-gold-primary/20 transition-colors duration-500" size={100} />
                                <blockquote className="relative z-10 text-xl font-serif leading-relaxed opacity-90 mb-6 text-gray-200 italic">
                                    “And proclaim to the people the Hajj; they will come to you on foot and on every lean camel; they will come from every distant pass.”
                                </blockquote>
                                <blockquote className="relative z-10 text-2xl font-arabic leading-relaxed opacity-90 mb-4 text-right text-gold-primary" dir="rtl">
                                    "وَأَذِّن فِي النَّاسِ بِالْحَجِّ يَأْتُوكَ رِجَالًا وَعَلَىٰ كُلِّ ضَامِرٍ يَأْتِينَ مِن كُلِّ فَجٍّ عَمِيقٍ"
                                </blockquote>
                                <cite className="block text-gray-500 font-medium not-italic text-sm border-t border-white/10 pt-4 mt-6">– Qur’an (22:27) | سورة الحج</cite>
                            </div>
                        </FadeIn>
                    </div>

                </div>
            </div>
        </section>
    );
}
