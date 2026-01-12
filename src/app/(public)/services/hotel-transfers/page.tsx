import React from 'react';
import { Metadata } from 'next';
import Hero from '@/components/common/Hero';
import FadeIn from '@/components/common/FadeIn';
import { Building2, Clock, MapPin, ShieldCheck, Star, Users, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import GlassCard from '@/components/ui/GlassCard';

export const metadata: Metadata = {
    title: 'Hotel Transfers Makkah & Madinah | Al Kiswah Umrah Transport',
    description: 'Reliable door-to-door hotel transfers in Makkah and Madinah. 24/7 comfortable transport between your hotel and the Holy Harams. Book your ride now.',
    keywords: ['hotel transfer Makkah', 'hotel transfer Madinah', 'Umrah hotel shuttle', 'family transport Makkah', 'VIP hotel transfer Saudi Arabia']
};

export default function HotelTransferPage() {
    return (
        <main className="bg-primary-black text-white min-h-screen relative">
            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none fixed" />

            {/* Hero Section */}
            <Hero
                title="Premium Hotel Transfers"
                subtitle="Seamless door-to-door transport between your hotel and the Holy Mosques in Makkah & Madinah."
                bgImage="/images/services/hotel-transfer-real.jpg"
                ctaText="Book Your Ride"
                ctaLink="/booking"
                layout="center"
            />

            {/* Introduction Section */}
            <section className="py-24 container mx-auto px-4 relative z-10">
                <FadeIn>
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-[#D4AF37] font-bold tracking-[0.2em] uppercase text-sm mb-4 block border-b border-[#D4AF37]/30 pb-2 w-fit mx-auto">Comfort & Convenience</span>
                        <h2 className="text-4xl md:text-5xl font-bold font-sans text-white mb-8">
                            Stress-Free Travel <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3D383] to-[#D4AF37]">To Your Doorstep</span>
                        </h2>
                        <p className="text-lg text-gray-400 leading-relaxed font-light">
                            Arrive refreshed and on time. Whether you are heading to the Haram for prayers or returning to your hotel after Umrah, our dedicated drivers ensure a smooth, comfortable, and private journey for you and your family.
                        </p>
                    </div>
                </FadeIn>

                {/* Key Features Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {[
                        {
                            icon: <MapPin className="text-[#D4AF37]" size={32} />,
                            title: "Door-to-Door Service",
                            desc: "Direct pickup from your hotel lobby and drop-off at the closest accessible point to the Haram."
                        },
                        {
                            icon: <Clock className="text-[#D4AF37]" size={32} />,
                            title: "24/7 Availability",
                            desc: "Round-the-clock service to align with your prayer times, Ziyarat plans, and flight schedules."
                        },
                        {
                            icon: <Users className="text-[#D4AF37]" size={32} />,
                            title: "Family Friendly",
                            desc: "Spacious vehicles (GMC, H1, HiAce) perfect for families with children, elderly, and luggage."
                        }
                    ].map((feature, idx) => (
                        <FadeIn key={idx} delay={idx * 0.1}>
                            <GlassCard className="h-full bg-neutral-900/50 p-8 rounded-3xl border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-300 hover:shadow-2xl hover:bg-neutral-900 group">
                                <div className="bg-black border border-white/10 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4 font-sans group-hover:text-[#D4AF37] transition-colors">{feature.title}</h3>
                                <p className="text-gray-400 font-light leading-relaxed">{feature.desc}</p>
                            </GlassCard>
                        </FadeIn>
                    ))}
                </div>
            </section>

            {/* Service Areas */}
            <section className="py-24 bg-neutral-900/30 border-t border-white/5 relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 relative h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 group">
                            <div className="absolute inset-0 bg-neutral-900 animate-pulse" /> {/* Loading Placeholder */}
                            <Image
                                src="/images/services/intercity-transport.png" // Fallback/Shared image for context
                                alt="Makkah Hotel Transport"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-end p-10">
                                <div>
                                    <h3 className="text-3xl font-bold text-white mb-2 font-sans">Makkah & Madinah</h3>
                                    <p className="text-gray-300 font-light">Serving all major hotels in the Holy Cities.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 space-y-12">
                            <FadeIn direction="right">
                                <h3 className="text-4xl lg:text-5xl font-bold font-sans text-white mb-8">
                                    We Cover All <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3D383] to-[#D4AF37]">Major Zones</span>
                                </h3>
                                <div className="space-y-8 mt-6">
                                    <div className="flex items-start gap-6 group">
                                        <div className="mt-1 bg-neutral-900 border border-white/10 p-3 rounded-full shadow-lg group-hover:border-[#D4AF37]/50 transition-colors">
                                            <Building2 className="text-[#D4AF37]" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-2 font-sans group-hover:text-[#D4AF37] transition-colors">Makkah Hotels</h4>
                                            <p className="text-gray-400 font-light leading-relaxed">Clock Tower (Abraj Al Bait), Jabal Omar, Ajyad, Aziziyah, and more.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-6 group">
                                        <div className="mt-1 bg-neutral-900 border border-white/10 p-3 rounded-full shadow-lg group-hover:border-[#D4AF37]/50 transition-colors">
                                            <Building2 className="text-[#D4AF37]" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-2 font-sans group-hover:text-[#D4AF37] transition-colors">Madinah Hotels</h4>
                                            <p className="text-gray-400 font-light leading-relaxed">Central Area (Markazia), Qibla, and hotels near Masjid An Nabawi.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-6 group">
                                        <div className="mt-1 bg-neutral-900 border border-white/10 p-3 rounded-full shadow-lg group-hover:border-[#D4AF37]/50 transition-colors">
                                            <ShieldCheck className="text-[#D4AF37]" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-2 font-sans group-hover:text-[#D4AF37] transition-colors">Reliable & Safe</h4>
                                            <p className="text-gray-400 font-light leading-relaxed">Licensed drivers and well-maintained vehicles for your peace of mind.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-12">
                                    <Link
                                        href="/booking"
                                        className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#D4AF37] to-[#B4932F] hover:bg-white hover:text-black text-black px-10 py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] uppercase tracking-wider text-sm transform hover:-translate-y-1"
                                    >
                                        Book Your Hotel Transfer
                                        <ArrowRight size={20} />
                                    </Link>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
