'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronDown, Users } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, Variants } from 'framer-motion';
import GlassButton from '@/components/ui/GlassButton';
import { trackConversion } from '@/lib/analytics';

interface HeroProps {
    title: string;
    subtitle: string | React.ReactNode;
    bgImage: string;
    ctaText?: string;
    ctaLink?: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
    showBookingForm?: boolean;
    children?: React.ReactNode;
    layout?: 'center' | 'two-column';
    badge?: string;
    backgroundChildren?: React.ReactNode;
    breadcrumbs?: React.ReactNode;
    alt?: string;
    trustBadge?: {
        count: string;
        label: string;
    };
    stats?: Array<{
        label: string;
        value: string;
        icon?: React.ReactNode;
    }>;
    fleetImages?: string[];
}

const Hero: React.FC<HeroProps> = ({
    title,
    subtitle,
    bgImage,
    ctaText,
    ctaLink,
    secondaryCtaText,
    secondaryCtaLink,
    children,
    layout = 'center',
    badge,
    backgroundChildren,
    breadcrumbs,
    alt,
    trustBadge,
    stats,
    fleetImages
}) => {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    // Smooth spring physics for parallax
    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
    const yRange = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const y = useSpring(yRange, springConfig);
    const opacityRange = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const opacity = useSpring(opacityRange, springConfig);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    return (
        <section ref={ref} className="relative w-full min-h-[95vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
            {/* Parallax Wrapper */}
            <motion.div
                className="absolute inset-0 z-0 will-change-transform"
                style={{ y, opacity }}
            >
                {/* Image Wrapper */}
                <div className="relative w-full h-full">
                    <Image
                        src={bgImage}
                        alt={alt || "Umrah Transport Saudi Arabia Hero"}
                        fill
                        priority
                        quality={90}
                        className="object-cover scale-105"
                        sizes="100vw"
                    />
                </div>
            </motion.div>

            {/* Premium Overlay - Darker for better text contrast */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/50 via-emerald-950/70 to-emerald-950/90 mix-blend-multiply" />
            <div className="absolute inset-0 z-0 bg-black/20" /> {/* Extra darken layer */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-t from-emerald-950 via-transparent to-transparent opacity-80" />

            {/* Subtle Texture Overlay - Heritage Pattern */}
            <div className="absolute inset-0 z-[1] bg-[url('/pattern.png')] opacity-[0.04] mix-blend-overlay pointer-events-none bg-repeat bg-[length:400px]" />
            <div className="absolute inset-0 z-[1] bg-[url('/noise.png')] opacity-10 mix-blend-soft-light pointer-events-none" />

            {/* Light Beam Effect */}
            <div className="absolute top-0 right-1/4 w-[500px] h-full bg-gradient-to-l from-emerald-400/5 to-transparent skew-x-[15deg] blur-3xl pointer-events-none" />

            {/* Custom Background Elements */}
            {backgroundChildren && (
                <div className="absolute inset-0 z-[1] pointer-events-none">
                    {backgroundChildren}
                </div>
            )}

            {/* Top social proof pill (Divine Redesign - More Minimal) */}
            {trustBadge && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 1, type: "spring", stiffness: 100 }}
                    className="absolute top-24 left-1/2 -translate-x-1/2 z-20"
                >
                    <div className="flex items-center gap-4 px-5 py-2 bg-emerald-950/60 backdrop-blur-2xl border border-gold/30 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.4)] group hover:border-gold hover:bg-emerald-900/80 transition-all duration-700">
                        <div className="flex -space-x-2.5">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-8 h-8 rounded-full border border-emerald-900/50 overflow-hidden bg-gradient-to-br from-gold/80 to-amber-700 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-700">
                                    <Users size={14} className="text-emerald-950" />
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-[9px] font-black text-gold/50 uppercase tracking-[0.35em]">Global Excellence</span>
                            <div className="w-[1px] h-3 bg-white/10" />
                            <span className="text-[10px] font-black text-white/90 uppercase tracking-[0.2em]">
                                <span className="text-gold shadow-sm mr-1.5">{trustBadge.count}</span> {trustBadge.label}
                            </span>
                        </div>
                    </div>
                </motion.div>
            )}

            <div className={`container relative z-10 px-4 pt-40 pb-72 ${layout === 'two-column' ? 'grid lg:grid-cols-2 gap-12 lg:gap-20 items-center' : 'flex flex-col items-center text-center'}`}>
                {/* Text Content */}
                <motion.div
                    className="flex flex-col gap-6 max-w-2xl"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {breadcrumbs && (
                        <div className="mb-4">
                            {breadcrumbs}
                        </div>
                    )}
                    {badge && (
                        <div className="mb-6">
                            {typeof badge === 'string' ? (
                                <span className="inline-block px-5 py-2 rounded-full bg-emerald-950/50 backdrop-blur-xl border border-gold/30 text-gold font-bold text-[10px] tracking-[0.3em] uppercase shadow-2xl shadow-emerald-900/40">
                                    {badge}
                                </span>
                            ) : (
                                badge
                            )}
                        </div>
                    )}

                    <motion.div variants={itemVariants} className="flex flex-col items-center justify-center text-center relative z-20 max-w-5xl mx-auto">
                        <h1 className="font-playfair font-bold text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] tracking-tight mb-8">
                            {title}
                        </h1>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="text-lg lg:text-xl text-white/90 font-medium leading-relaxed drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] max-w-xl mx-auto"
                    >
                        {subtitle}
                    </motion.div>


                    <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-4 justify-center">
                        {ctaText && ctaLink && (
                            <GlassButton
                                href={ctaLink}
                                variant="secondary"
                                size="lg"
                                className="group btn-gold border-none text-white hover:scale-105 shimmer-gold"
                                onClick={() => trackConversion('whatsapp', `hero_${title.substring(0, 10)}`)}
                            >
                                {ctaText}
                                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </GlassButton>
                        )}

                        {secondaryCtaText && secondaryCtaLink && (
                            <GlassButton href={secondaryCtaLink} variant="outline" size="lg" className="text-white border-white/50 hover:bg-white/20 hover:border-white">
                                {secondaryCtaText}
                            </GlassButton>
                        )}
                    </motion.div>

                    {/* Integrated Trust Strip - Now Static in Flow to prevent overlap */}
                    {stats && (
                        <div className="mt-16 w-full max-w-4xl border-t border-white/10 pt-8 hidden md:block">
                            <div className="flex justify-center items-center gap-4 lg:gap-16">
                                {stats.map((stat, i) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.2 + (i * 0.1) }}
                                        className="flex items-center gap-4 group cursor-default"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-white/5 backdrop-blur-sm border border-gold/20 flex items-center justify-center text-gold group-hover:border-gold group-hover:bg-gold/10 transition-all duration-500">
                                            {stat.icon}
                                        </div>
                                        <div className="flex flex-col text-left">
                                            <p className="text-xl lg:text-3xl font-black text-white leading-none tracking-tighter group-hover:text-gold transition-colors duration-500">{stat.value}</p>
                                            <p className="text-[9px] lg:text-[10px] text-white/60 font-black uppercase tracking-[0.25em]">{stat.label}</p>
                                        </div>
                                        {i < stats.length - 1 && (
                                            <div className="hidden lg:block w-px h-8 bg-gradient-to-b from-transparent via-gold/30 to-transparent ml-8" />
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Right Column / Children (BookingForm) */}
                {children && (
                    <motion.div
                        className="w-full max-w-md mx-auto lg:ml-auto relative"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    >
                        {/* Immersive Vehicle Spotlight (Implicit) */}
                        <div className="bg-emerald-950/30 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-2 relative overflow-hidden group hover:border-gold/50 transition-colors duration-500">
                            {/* Form Glow Effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-gold/30 to-emerald-500/30 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
                            <div className="relative z-10">
                                {children}
                            </div>
                        </div>

                        {/* Floating mini stats/features at side - Only on extra large screens to ensure zero overlap */}
                        {stats && (
                            <div className="hidden 3xl:flex flex-col gap-6 absolute -left-40 top-1/2 -translate-y-1/2 z-20">
                                {stats.map((stat, i) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 1.4 + (i * 0.2) }}
                                        className="bg-emerald-950/90 backdrop-blur-3xl border border-gold/40 p-6 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] flex items-center gap-6 w-64 hover:border-gold hover:scale-105 transition-all group"
                                    >
                                        <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-emerald-950 transition-all duration-500 shadow-2xl">
                                            {stat.icon}
                                        </div>
                                        <div>
                                            <p className="text-3xl font-black text-white leading-tight tracking-tighter">{stat.value}</p>
                                            <p className="text-[11px] text-emerald-50/90 font-black uppercase tracking-[0.25em]">{stat.label}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </div>

            {/* === FLEET LINEUP FOOTER (Zam Zam Style) === */}
            {
                fleetImages && fleetImages.length > 0 && (
                    <div className="absolute bottom-0 left-0 w-full z-10 flex justify-center items-end pointer-events-none overflow-hidden">
                        {/* Background Glow for Fleet */}
                        <div className="absolute bottom-0 w-full h-[400px] bg-gradient-to-t from-emerald-950 via-emerald-900/80 to-transparent z-10" />

                        <div className="relative z-20 flex items-end justify-center -mb-8 lg:-mb-12 scale-90 lg:scale-100 mix-blend-multiply opacity-90 lg:opacity-100">
                            {/* Side Vehicles (Slightly smaller & behind) */}
                            {fleetImages[1] && (
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5, duration: 1 }}
                                    className="relative w-[180px] h-[120px] lg:w-[350px] lg:h-[220px] -mr-12 lg:-mr-24 z-10 brightness-75 scale-90 origin-bottom-right"
                                >
                                    <Image src={fleetImages[1]} alt="Fleet Vehicle Left" fill className="object-contain" />
                                </motion.div>
                            )}

                            {/* Center Hero Vehicle (Largest & Front) */}
                            {fleetImages[0] && (
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 1 }}
                                    className="relative w-[280px] h-[180px] lg:w-[500px] lg:h-[320px] z-30 drop-shadow-2xl"
                                >
                                    <Image src={fleetImages[0]} alt="Fleet Hero Vehicle" fill className="object-contain" />
                                </motion.div>
                            )}

                            {/* Side Vehicles (Slightly smaller & behind) */}
                            {fleetImages[2] && (
                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7, duration: 1 }}
                                    className="relative w-[180px] h-[120px] lg:w-[350px] lg:h-[220px] -ml-12 lg:-ml-24 z-10 brightness-75 scale-90 origin-bottom-left"
                                >
                                    <Image src={fleetImages[2]} alt="Fleet Vehicle Right" fill className="object-contain" />
                                </motion.div>
                            )}
                        </div>
                    </div>
                )
            }

            {/* Heritage Wave Transition (Divine Bottom Tier) - Adjusted Z-Index to sit BEHIND fleet if needed, or blending with it */}
            <div className="absolute bottom-0 left-0 w-full z-10 pointer-events-none opacity-50">
                <svg
                    viewBox="0 0 1440 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto drop-shadow-[0_-20px_40px_rgba(6,28,22,0.5)]"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0 120V60C240 20 480 20 720 60C960 100 1200 100 1440 60V120H0Z"
                        fill="white"
                    />
                    <path
                        d="M0 60C240 20 480 20 720 60C960 100 1200 100 1440 60"
                        stroke="#BFA35A"
                        strokeWidth="1"
                        strokeOpacity="0.2"
                    />
                </svg>
            </div>


            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 animate-bounce text-gold/40">
                <ChevronDown size={32} />
            </div>
        </section >
    );
};

export default Hero;
