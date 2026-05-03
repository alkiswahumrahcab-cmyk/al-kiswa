'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowDown, MessageCircle, Phone, Star } from 'lucide-react';

interface Props {
    whatsappLink: string;
    phoneNumber: string;
}

export default function HiaceHero({ whatsappLink, phoneNumber }: Props) {
    return (
        <section className="relative h-screen min-h-[650px] flex items-center justify-center overflow-hidden">
            {/* Ken Burns Background */}
            <motion.div
                className="absolute inset-0"
                initial={{ scale: 1 }}
                animate={{ scale: 1.08, x: '-1%' }}
                transition={{ duration: 16, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
            >
                <Image
                    src="/images/fleet/hiace/toyota-hiace-2026-lifestyle-cinematic-abha.jpeg"
                    alt="Toyota Hiace 2026 cinematic shot in Abha mountains, Saudi Arabia"
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
            </motion.div>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-black/55 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

            {/* Badge */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute top-28 left-1/2 -translate-x-1/2"
            >
                <div className="flex items-center gap-2 bg-gold-primary/15 border border-gold-primary/40 backdrop-blur-sm px-5 py-2 rounded-full">
                    <Star size={14} className="text-gold-primary fill-gold-primary" />
                    <span className="text-gold-primary text-sm font-bold tracking-wider uppercase">Real Abha Photography</span>
                    <Star size={14} className="text-gold-primary fill-gold-primary" />
                </div>
            </motion.div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gold-primary font-bold tracking-[0.35em] uppercase text-sm mb-5"
                >
                    Toyota Hiace 2026 · Abha Edition
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.8 }}
                    className="text-4xl sm:text-6xl md:text-7xl font-bold font-playfair text-white leading-tight mb-6"
                >
                    Reliable, Spacious &{' '}
                    <span className="text-gold-primary">Built for</span>
                    <br />Saudi Roads
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10"
                >
                    The trusted choice for Umrah groups, families, and businesses traveling between Jeddah, Makkah, Madinah & Abha.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.85 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap"
                >
                    <Link
                        href="/booking"
                        className="inline-flex items-center justify-center gap-2 bg-gold-primary hover:bg-white text-black font-bold px-9 py-4 rounded-xl transition-all duration-300 text-base shadow-[0_0_40px_rgba(245,158,11,0.4)]"
                    >
                        Book This Vehicle
                    </Link>
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fb85a] text-white font-bold px-9 py-4 rounded-xl transition-colors text-base"
                    >
                        <MessageCircle size={18} /> WhatsApp Inquiry
                    </a>
                    <a
                        href={`tel:${phoneNumber}`}
                        className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold px-9 py-4 rounded-xl backdrop-blur-sm transition-colors text-base"
                    >
                        <Phone size={18} /> Call Now
                    </a>
                </motion.div>

                {/* Stats strip */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="flex flex-wrap justify-center gap-8 mt-14"
                >
                    {[['10–12', 'Passengers'], ['4.8★', 'Rating'], ['2.8L', 'Turbo Diesel'], ['350+', 'SAR Starting']].map(([val, lbl]) => (
                        <div key={lbl} className="text-center">
                            <p className="text-white font-bold text-2xl">{val}</p>
                            <p className="text-slate-400 text-xs uppercase tracking-wider">{lbl}</p>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 8, 0] }}
                transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-slate-500 text-xs uppercase tracking-widest">Explore</span>
                <ArrowDown size={20} className="text-gold-primary" />
            </motion.div>
        </section>
    );
}
