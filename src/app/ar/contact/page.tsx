import { generateMetadataAlternates } from "@/lib/hreflang";
import React from 'react';
import { Clock, ShieldCheck, Globe, Star, Phone, Mail, MapPin } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';
import ContactForm from '@/components/contact/ContactForm';
import Hero from '@/components/common/Hero';
import GlassCard from '@/components/ui/GlassCard';
import { getSettings } from '@/lib/settings-storage';
import ContactGrid from '@/components/contact/ContactGrid';
import { JsonLdScript } from '@/components/seo/JsonLd';
import { generateContactPageSchema } from '@/components/seo/schema-generator';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "تواصل معنا | الكسوة لنقل المعتمرين | واتساب ٢٤/٧",
        description: "تواصل مع الكسوة لنقل المعتمرين عبر واتساب أو الهاتف. دعم متواصل ٢٤/٧ لحجز رحلات العمرة من جدة إلى مكة المكرمة والمدينة المنورة.",
        keywords: [
            "رقم واتساب تاكسي مكة",
            "تواصل مع شركة نقل العمرة",
            "رقم سائق معتمرين جدة",
            "اتصال حجز نقل العمرة",
            "شركة نقل في مكة المكرمة",
            "واتساب خدمة العملاء نقل المعتمرين",
            "contact Umrah transport Saudi Arabia",
            "Al Kiswah WhatsApp booking",
        ],
        alternates: {
            ...generateMetadataAlternates("/contact"),
            canonical: "https://kiswahumrahcab.com/ar/contact",
        },
        openGraph: {
            title: "تواصل معنا | الكسوة لنقل المعتمرين",
            description: "نحن هنا لخدمتكم ٢٤/٧. تواصل معنا عبر واتساب للحجز الفوري.",
            url: "https://kiswahumrahcab.com/ar/contact",
            type: "website",
            locale: "ar_SA",
            images: [{ url: "https://kiswahumrahcab.com/images/og-image.jpg", width: 1200, height: 630 }],
        },
    };
}

export default async function ArabicContactPage() {
    const settings = await getSettings();
    const phone1 = settings?.contact.phone || '+966 54 870 7332';
    const email = settings?.contact.email || 'info@alkiswahumrahtransport.com';
    const address = settings?.contact.address || 'العزيزية، مكة المكرمة، المملكة العربية السعودية';

    return (
        <div className="bg-primary-black min-h-screen relative text-white" dir="rtl" lang="ar">
            <JsonLdScript schema={generateContactPageSchema()} />
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />

            <Hero
                title="تواصل معنا"
                subtitle="خدمة عملاء متواصلة ٢٤/٧ لجميع استفساراتكم وحجوزات رحلات العمرة المباركة"
                bgImage="/images/contact-hero.png"
            />

            {/* Trust Strip */}
            <div className="container mx-auto px-4 -mt-10 relative z-10 pb-20">
                <FadeIn direction="up" delay={0.1}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        {[
                            { icon: Clock, text: "خدمة ٢٤/٧", sub: "24/7 Support" },
                            { icon: ShieldCheck, text: "مرخص ومؤمن", sub: "Licensed & Insured" },
                            { icon: Globe, text: "دعم متعدد اللغات", sub: "Multilingual Support" },
                            { icon: Star, text: "أعلى تقييم", sub: "Top Rated" }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-black/60 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/10 text-center hover:-translate-y-1 transition-all duration-300 hover:border-gold-primary/30">
                                <item.icon className="w-8 h-8 mx-auto mb-2 text-gold-primary" />
                                <h3 className="font-bold text-white text-sm md:text-base">{item.text}</h3>
                                <p className="text-xs text-gray-400">{item.sub}</p>
                            </div>
                        ))}
                    </div>
                </FadeIn>

                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    {/* Contact Info */}
                    <div className="lg:col-span-5 space-y-6">
                        <ContactGrid contactSettings={{ phone: phone1, email, address }} />

                        {/* Map */}
                        <FadeIn direction="up" delay={0.4}>
                            <GlassCard className="p-0 overflow-hidden min-h-[400px] relative flex items-center justify-center bg-black/40 border-white/10" id="map">
                                <div className="absolute inset-0 bg-gold-primary/5 pointer-events-none z-10 mix-blend-overlay" />
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3713.526883410923!2d39.8126588!3d21.447833599999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c21d9da1e4d599%3A0xb8a485c3949902cc!2zQWwgS2lzd2FoIFVtyoNoIFRyYW5zcG9ydA!5e0!3m2!1sen!2s"
                                    width="100%"
                                    height="100%"
                                    loading="lazy"
                                    className="w-full h-full min-h-[400px] border-0 opacity-80 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                                    title="خريطة الكسوة لنقل المعتمرين"
                                    allowFullScreen
                                />
                            </GlassCard>
                        </FadeIn>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-7">
                        <FadeIn direction="left" delay={0.3}>
                            <GlassCard className="p-8 md:p-10 border-t-4 border-t-gold-primary bg-black/40 border-white/10">
                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold text-white mb-2 font-sans">
                                        أرسل لنا رسالة
                                        <span className="block text-xl font-normal text-gold-primary mt-1">Send Us a Message</span>
                                    </h2>
                                    <p className="text-gray-400 font-light">
                                        هل تحتاج إلى عرض سعر مخصص لمجموعة العمرة؟ لديك استفسار حول أسطولنا؟ أرسل لنا رسالتك وسيرد عليك فريقنا خلال دقائق.
                                    </p>
                                </div>
                                <ContactForm />
                            </GlassCard>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </div>
    );
}
