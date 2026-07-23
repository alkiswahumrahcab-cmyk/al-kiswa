'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';

interface Props {
    whatsappLink: string;
    phoneNumber: string;
}

export default function HiaceHero({ whatsappLink, phoneNumber }: Props) {
    return (
        <section className="relative h-[90vh] min-h-[560px] flex items-center justify-center overflow-hidden">
            {/* Ken Burns Background */}
            <motion.div
                className="absolute inset-0"
                initial={{ scale: 1 }}
                animate={{ scale: 1.06 }}
                transition={{ duration: 14, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
            >
                <Image
                    src="/images/fleet/hiace/toyota-hiace-2026-lifestyle-cinematic-abha.jpeg"
                    alt="Toyota Hiace 2026 in Abha mountains, Saudi Arabia"
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
            </motion.div>

            {/* Overlay Gradient for readability */}
            <div className="absolute inset-0 bg-ink/30 backdrop-blur-[2px] z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/60 z-[1]" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 text-center">
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-gold font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-4"
                >
                    Toyota Hiace 2026
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.7 }}
                    className="text-3xl sm:text-5xl md:text-6xl font-bold font-playfair text-white leading-tight mb-4"
                >
                    Reliable & Built for <span className="text-gold">Saudi Roads</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-white/90 text-base md:text-lg max-w-xl mx-auto mb-8"
                >
                    Group transport for Umrah, families & business — Jeddah, Makkah, Madinah & Abha.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75 }}
                    className="flex flex-col sm:flex-row gap-3 justify-center"
                >
                    <Link
                        href="/booking"
                        className="btn-primary"
                    >
                        Book Now
                    </Link>
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-whatsapp flex gap-2"
                    >
                        <MessageCircle size={18} /> WhatsApp
                    </a>
                    <a
                        href={`tel:${phoneNumber}`}
                        className="btn-secondary border-white/30 text-white hover:bg-white/10 flex gap-2 items-center justify-center"
                    >
                        <Phone size={18} /> Call
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
