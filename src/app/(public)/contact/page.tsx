import { generateMetadataAlternates } from "@/lib/hreflang";
import React from 'react';

import { Clock, ShieldCheck, Globe, Star } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';
import ContactForm from '@/components/contact/ContactForm';
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import GlassCard from '@/components/ui/GlassCard';
import { getSettings } from '@/lib/settings-storage';
import ContactGrid from '@/components/contact/ContactGrid';
import dynamic from 'next/dynamic';
import { JsonLdScript } from '@/components/seo/JsonLd';
import { generateContactPageSchema } from '@/components/seo/schema-generator';

const HotelsAndDistricts = dynamic(() => import('@/components/home/HotelsAndDistricts'));

export async function generateMetadata() {
    return {
        title: "Contact 24/7 VIP Umrah Transport Support | Al Kiswah",
        description: "Contact Al Kiswah Umrah Transport for bookings. 24/7 support via WhatsApp & phone. Let us serve the transport needs of your spiritual journey.",
        keywords: [
            "umrah transport contact", 
            "book umrah transport", 
            "jeddah airport pickup contact",
            "makkah to madinah transport booking", 
            "vip umrah taxi contact", 
            "al kiswah support"
        ],
        alternates: generateMetadataAlternates("/contact"),
        openGraph: {
            title: "Contact 24/7 VIP Umrah Transport Support | Al Kiswah",
            description: "Contact Al Kiswah Umrah Transport for bookings. 24/7 support via WhatsApp & phone.",
            type: 'website',
            locale: 'en_US',
        }
    };
}

export default async function ContactPage() {
    const settings = await getSettings();

    // Fallback values
    const phone1 = settings?.contact.phone || '+966 54 870 7332';
    const email = settings?.contact.email || 'info@alkiswahumrahtransport.com';
    const address = settings?.contact.address || 'Al Aziziyah, Makkah, Saudi Arabia';

    return (
        <div className="bg-bg min-h-screen relative text-body selection:bg-gold-soft">
            <JsonLdScript schema={generateContactPageSchema()} />

            <Hero
                title="Get in Touch | تواصل معنا"
                subtitle="Reliable Booking & 24/7 Support for Your Umrah Journey. Premium Transport Services from Makkah to Madinah."
                bgImage="/images/hero/contact page.jpeg"
                breadcrumbs={<Breadcrumbs />}
                imageQuality={100}
                removeBlur={true}
                theme="dark"
                layout="two-column"
                leftOverlay={true}
            />

            <div className="container mx-auto px-4 pt-12 relative z-10 pb-20">
                {/* Intro Trust Strip */}
                <FadeIn direction="up" delay={0.1}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16 max-w-5xl mx-auto">
                        {[
                            { icon: Clock, text: "24/7 Service", sub: "خدمة على مدار الساعة" },
                            { icon: ShieldCheck, text: "Licensed & Safe", sub: "مرخص ومؤمن" },
                            { icon: Globe, text: "Multilingual", sub: "دعم متعدد اللغات" },
                            { icon: Star, text: "Top Rated", sub: "أعلى تقييم" }
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center">
                                <div className="w-14 h-14 rounded-full bg-gold-soft flex items-center justify-center mb-4">
                                    <item.icon className="w-6 h-6 text-gold-strong" />
                                </div>
                                <h4 className="text-[17px] md:text-[19px] font-bold text-ink mb-1">{item.text}</h4>
                                <p className="text-[13px] md:text-[14px] text-muted font-arabic">{item.sub}</p>
                            </div>
                        ))}
                    </div>
                </FadeIn>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    {/* Contact Info Column */}
                    <div className="lg:col-span-5 space-y-6">
                        <ContactGrid contactSettings={{
                            phone: phone1,
                            email,
                            address
                        }} />

                        {/* Map Placeholder */}
                        <FadeIn direction="up" delay={0.4}>
                            <GlassCard className="p-0 overflow-hidden min-h-[400px] relative flex items-center justify-center bg-surface border-border shadow-sm rounded-[20px]" id="map">
                                <div className="absolute inset-0 bg-gold/5 pointer-events-none z-10 mix-blend-overlay" />
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3713.526883410923!2d39.8126588!3d21.447833599999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c21d9da1e4d599%3A0xb8a485c3949902cc!2zQWwgS2lzd2FoIFVtyoNoIFRyYW5zcG9ydA!5e0!3m2!1sen!2s"
                                    width="100%"
                                    height="100%"
                                    loading="lazy"
                                    className="w-full h-full min-h-[400px] border-0 opacity-90 hover:opacity-100 transition-opacity"
                                    title="Al Kiswah Umrah Transport Map"
                                    allowFullScreen
                                />
                            </GlassCard>
                        </FadeIn>
                    </div>

                    {/* Contact Form Column */}
                    <div className="lg:col-span-7">
                        <FadeIn direction="left" delay={0.3}>
                            <GlassCard className="p-8 md:p-12 bg-surface border-border shadow-lg rounded-[20px]">
                                <div className="mb-8">
                                    <h2 className="text-3xl font-semibold text-ink mb-2 font-display">
                                        Send Us a Message
                                        <span className="block text-xl font-arabic font-normal text-gold-strong mt-1">أرسل لنا رسالة</span>
                                    </h2>
                                    <p className="text-muted font-light">
                                        Need a custom quote for your Umrah group? Have questions about our GMC Yukon fleet?
                                        Fill out the form below and our team will get back to you within minutes.
                                    </p>
                                </div>
                                <ContactForm />
                            </GlassCard>
                        </FadeIn>
                    </div>
                </div>
            </div>

            <HotelsAndDistricts />
        </div >
    );
}
