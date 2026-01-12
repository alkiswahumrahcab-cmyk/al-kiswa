'use client';

import Link from 'next/link';
import { CheckCircle2, Quote } from 'lucide-react';

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
                    <Link href={linkMatch[2]} key={index} className="text-gold-primary font-semibold hover:underline decoration-2 underline-offset-2">
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
                    <span className="text-gold-primary font-bold uppercase tracking-widest text-sm mb-3 block">
                        Welcome | أهلاً بك
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-sans leading-tight">
                        Welcome to Al Kiswah Umrah Transport
                        <span className="block text-2xl md:text-4xl mt-3 font-reem-kufi text-gold-primary">الكسوة لنقل المعتمرين</span>
                    </h2>
                    <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto">
                        Your trusted partner in pilgrim travel across Saudi Arabia.
                        <span className="block font-arabic text-lg mt-1 text-gray-500">شريكك الموثوق في رحلات العمرة عبر المملكة العربية السعودية.</span>
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">

                    {/* Intro Content */}
                    <div className="space-y-8">
                        <p className="text-lg leading-relaxed text-gray-300">
                            {parseMarkdown("We specialize in providing **safe, comfortable, and affordable [Umrah transport services](/services)** for pilgrims traveling to Makkah, Madinah, and beyond.")}
                        </p>

                        <div className="bg-gold-primary/10 border-l-4 border-gold-primary p-6 rounded-r-xl">
                            <p className="text-xl font-medium text-white italic mb-2">
                                &quot;Serving the Guests of Allah with comfort and care is our mission.&quot;
                            </p>
                            <p className="text-lg font-arabic text-gold-primary" dir="rtl">
                                "خدمة ضيوف الرحمن راحة وأمانة."
                            </p>
                        </div>

                        <p className="text-lg leading-relaxed text-gray-300">
                            {parseMarkdown("Our fleet of [modern buses and vans](/fleet) ensures **stress‑free [Jeddah Airport transfers](/services/jeddah-airport-transfer) and [Makkah to Madinah journeys](/services/makkah-madinah-taxi)**. We provide professional drivers dedicated to hospitality and punctuality. Whether you are traveling solo, with family, or in large groups, Al Kiswah Umrah Transport offers **[customized packages](/booking)** to meet your needs.")}
                        </p>
                    </div>

                    {/* Features & Quote */}
                    <div className="space-y-8">
                        {/* Features Box */}
                        <div className="bg-black/60 p-8 rounded-3xl border border-white/10 backdrop-blur-md">
                            <h3 className="text-2xl font-bold text-white mb-6 font-sans flex justify-between items-center">
                                Why Choose Us?
                                <span className="font-reem-kufi text-xl text-gold-primary">لماذا نحن؟</span>
                            </h3>
                            <ul className="space-y-4">
                                {whyChooseUsItems.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="text-gold-primary shrink-0 mt-1" size={20} />
                                        <span className="text-gray-300">{parseMarkdown(item)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Spiritual Quote */}
                        <div className="bg-gradient-to-br from-neutral-900 to-black text-white p-8 rounded-3xl relative overflow-hidden border border-white/5 shadow-2xl">
                            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10 mix-blend-overlay pointer-events-none" />
                            <Quote className="absolute top-4 right-4 text-gold-primary/10" size={80} />
                            <blockquote className="relative z-10 text-lg font-serif leading-relaxed opacity-90 mb-4 text-gray-200">
                                “And proclaim to the people the Hajj; they will come to you on foot and on every lean camel; they will come from every distant pass.”
                            </blockquote>
                            <blockquote className="relative z-10 text-xl font-arabic leading-relaxed opacity-90 mb-4 text-right text-gold-primary" dir="rtl">
                                "وَأَذِّن فِي النَّاسِ بِالْحَجِّ يَأْتُوكَ رِجَالًا وَعَلَىٰ كُلِّ ضَامِرٍ يَأْتِينَ مِن كُلِّ فَجٍّ عَمِيقٍ"
                            </blockquote>
                            <cite className="block text-gray-500 font-medium not-italic text-sm">– Qur’an (22:27) | سورة الحج</cite>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
