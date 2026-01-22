'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronDown, CheckCircle, Shield, Clock } from 'lucide-react';
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

    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
    const y = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "30%"]), springConfig);
    const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0]), springConfig);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <section ref={ref} className="relative w-full min-h-[95vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-primary-black">
            {/* Parallax Background */}
            <motion.div className="absolute inset-0 z-0" style={{ y, opacity }}>
                <div className="relative w-full h-full">
                    {fleetImages && fleetImages.length > 0 ? (
                        <div className="relative w-full h-full flex items-end justify-center pb-0 lg:pb-12 overflow-hidden">
                            {/* Fleet Composition */}
                            {/* Left Vehicle */}
                            {fleetImages[1] && (
                                <motion.div
                                    className="absolute left-[-5%] lg:left-[5%] bottom-10 lg:bottom-16 w-[55%] lg:w-[35%] h-auto z-0 opacity-80 blur-[1px]"
                                    initial={{ x: -100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 0.8 }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                >
                                    <Image
                                        src={fleetImages[1]}
                                        alt="Fleet Left"
                                        width={800}
                                        height={600}
                                        className="w-full h-auto object-contain"
                                    />
                                </motion.div>
                            )}

                            {/* Right Vehicle */}
                            {fleetImages[2] && (
                                <motion.div
                                    className="absolute right-[-5%] lg:right-[5%] bottom-10 lg:bottom-16 w-[55%] lg:w-[35%] h-auto z-0 opacity-80 blur-[1px]"
                                    initial={{ x: 100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 0.8 }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                >
                                    <Image
                                        src={fleetImages[2]}
                                        alt="Fleet Right"
                                        width={800}
                                        height={600}
                                        className="w-full h-auto object-contain" // Flip if needed, but studio shots usually front 3/4
                                        style={{ transform: 'scaleX(-1)' }} // Assuming standard front-left angle, flip for symmetry
                                    />
                                </motion.div>
                            )}

                            {/* Center Vehicle - LCP Optimized (No Animation) */}
                            {fleetImages[0] && (
                                <div
                                    className="relative z-10 w-[70%] lg:w-[45%] h-auto mb-[-5%] lg:mb-[-2%]"
                                >
                                    <Image
                                        src={fleetImages[0]}
                                        alt="Fleet Center"
                                        width={1000}
                                        height={800}
                                        className="w-full h-auto object-contain drop-shadow-2xl"
                                        priority
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 50vw"
                                    />
                                </div>
                            )}

                            {/* Ambient Glow for Composition */}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />
                        </div>
                    ) : (
                        <Image
                            src={bgImage}
                            alt={alt || "Luxury Umrah Transport"}
                            fill
                            priority
                            className="object-cover opacity-60"
                            sizes="100vw"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-black/80 via-primary-black/40 to-primary-black" />
                    {!fleetImages && (
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-primary/10 via-transparent to-transparent opacity-60" />
                    )}
                </div>
            </motion.div>

            {/* Content Container */}
            <div className={`container relative z-10 px-4 pt-32 pb-24 ${layout === 'two-column' ? 'grid lg:grid-cols-2 gap-12 lg:gap-24 items-center' : 'flex flex-col items-center text-center'}`}>

                {/* Text Content */}
                <motion.div
                    className="flex flex-col gap-8 max-w-3xl"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Badge */}
                    <motion.div variants={itemVariants} className="flex flex-col justify-center lg:justify-start items-center lg:items-start gap-4 w-full">
                        {/* Bismillah Calligraphy - Text Version */}
                        <div className="mb-2 w-full text-center">
                            <div className="text-3xl md:text-4xl font-arabic text-white/90 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] leading-relaxed" dir="rtl">
                                بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                            </div>
                        </div>

                        {badge ? (
                            typeof badge === 'string' ? (
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-primary/10 border border-gold-primary/30 text-gold-primary text-xs font-bold tracking-widest uppercase shadow-lg shadow-gold-primary/5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gold-primary animate-pulse" />
                                    {badge}
                                </span>
                            ) : badge
                        ) : (
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-bold tracking-widest uppercase backdrop-blur-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Official Licensed Transport
                            </span>
                        )}
                    </motion.div>

                    {/* Title */}
                    <motion.div variants={itemVariants}>
                        <h1 className="font-sans font-bold text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight drop-shadow-2xl">
                            {title.split(' ').map((word, i) => (
                                <span key={i} className={i === 1 || word.includes('VIP') ? 'text-gold-metallic drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]' : ''}>
                                    {word}{' '}
                                </span>
                            ))}
                        </h1>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.div variants={itemVariants} className="text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-xl mx-auto lg:mx-0 border-l-2 border-gold-primary/30 pl-6">
                        {subtitle}
                    </motion.div>

                    {/* Buttons */}
                    <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-2 justify-center lg:justify-start">
                        {ctaText && ctaLink && (
                            <GlassButton
                                href={ctaLink}
                                variant="primary"
                                size="lg"
                                className="bg-gradient-to-r from-gold-primary to-gold-dark text-black border-none font-bold shadow-[0_0_20px_rgba(239,191,91,0.3)] hover:shadow-[0_0_40px_rgba(239,191,91,0.5)] hover:scale-105 transition-all duration-300"
                                onClick={() => trackConversion('other', 'hero_cta_booking_start')}
                            >
                                {ctaText}
                                <ArrowRight size={20} className="ml-2" />
                            </GlassButton>
                        )}
                        {secondaryCtaText && secondaryCtaLink && (
                            <GlassButton
                                href={secondaryCtaLink}
                                variant="outline"
                                size="lg"
                                className="border-white/20 text-white hover:bg-white/10 hover:border-gold-primary/50 backdrop-blur-sm"
                            >
                                {secondaryCtaText}
                            </GlassButton>
                        )}
                    </motion.div>

                    {/* Trust Indicators */}
                    {stats && (
                        <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-8 w-full max-w-2xl bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/5">
                            {stats.map((stat, i) => (
                                <div key={i} className="flex flex-col gap-1 items-center lg:items-start text-center lg:text-left">
                                    <div className="flex items-center gap-2 text-gold-primary mb-1">
                                        {stat.icon || <CheckCircle size={16} />}
                                        <span className="font-bold text-2xl text-white">{stat.value}</span>
                                    </div>
                                    <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider">{stat.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </motion.div>

                {/* Right Column: Booking Widget */}
                {children && (
                    <motion.div
                        className="w-full max-w-md mx-auto relative z-20"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <div className="relative">
                            {/* Enhanced Glow Effect */}
                            <div className="absolute -inset-1 bg-gradient-to-b from-gold-primary/30 to-transparent blur-3xl opacity-40 rounded-[2.5rem] animate-pulse" />
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-2xl" />

                            <div className="relative z-10">
                                {children}
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-primary-black via-primary-black/80 to-transparent pointer-events-none z-[1]" />
        </section >
    );
};

export default Hero;
