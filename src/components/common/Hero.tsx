'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronDown, CheckCircle, Shield, Clock } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import GlassButton from '@/components/ui/GlassButton';
import { trackConversion } from '@/lib/analytics';
import NusukHeroBadges from '@/components/trust/NusukHeroBadges';

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
    layout?: 'center' | 'two-column' | 'right';
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
    isSpiritual?: boolean;
    theme?: 'dark' | 'light';
    imageQuality?: number;
    removeBlur?: boolean;
    leftOverlay?: boolean;
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
    fleetImages,
    isSpiritual = false,
    theme,
    imageQuality,
    removeBlur,
    leftOverlay
}) => {
    // Default to dark theme unless explicitly set to light or if it's a spiritual hero
    const isDark = theme === 'dark' || (!isSpiritual && theme !== 'light');

    const ref = useRef<HTMLElement>(null);
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
        <section ref={ref} className={`relative w-full min-h-[95vh] lg:min-h-screen flex items-center justify-center overflow-hidden ${isDark ? 'bg-ink' : 'bg-surface'}`}>
            {/* Static Background */}
            <div className="absolute inset-0 z-0">
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
                                        className="w-full h-auto object-contain"
                                        style={{ transform: 'scaleX(-1)' }}
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
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/80 to-transparent z-20 pointer-events-none" />
                        </div>
                    ) : (
                        <Image
                            src={bgImage}
                            alt={alt || "Al Kiswah Umrah Taxi Fleet"}
                            fill
                            priority
                            quality={imageQuality || 75}
                            className={`object-cover object-center ${removeBlur ? '' : 'opacity-80'}`}
                            sizes="100vw"
                        />
                    )}
                    
                    {/* Dark vs Light Overlays */}
                    {isDark ? (
                        <>
                            {leftOverlay || layout === 'two-column' ? (
                                <>
                                    <div className={`absolute left-0 top-0 bottom-0 w-full lg:w-[65%] bg-gradient-to-r from-black/80 via-black/50 to-transparent ${removeBlur ? '' : 'backdrop-blur-[1px]'} z-[1]`} />
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50 z-[1]" />
                                </>
                            ) : layout === 'right' ? (
                                <>
                                    <div className={`absolute inset-0 bg-gradient-to-r from-black/10 via-black/40 to-black/80 z-[1]`} />
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 z-[1]" />
                                </>
                            ) : (
                                <>
                                    <div className={`absolute inset-0 bg-black/30 ${removeBlur ? '' : 'backdrop-blur-[2px]'} z-[1]`} />
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/60 z-[1]" />
                                </>
                            )}
                        </>
                    ) : (
                        <div className={`absolute inset-0 bg-white/85 ${removeBlur ? '' : 'backdrop-blur-md'} z-[1]`} />
                    )}
                </div>
            </div>

            {/* Content Container */}
            <div className={`container relative z-10 px-4 pt-24 md:pt-28 lg:pt-32 pb-24 ${layout === 'two-column' ? 'grid lg:grid-cols-2 gap-12 lg:gap-24 items-center' : layout === 'right' ? 'flex flex-col items-end text-left w-full' : 'flex flex-col items-center text-center'} ${isSpiritual && layout === 'two-column' ? 'lg:grid-cols-[1.2fr,0.8fr]' : ''}`}>

                {/* Text Content */}
                <div className={`flex flex-col gap-8 ${layout === 'center' ? 'items-center text-center max-w-4xl' : layout === 'right' ? 'w-full lg:w-[50%] max-w-[640px] md:ml-auto items-start text-left lg:max-w-none' : 'max-w-3xl'}`}>
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                        className={`flex flex-col ${layout === 'right' ? 'justify-start items-start' : 'justify-center lg:justify-start items-center lg:items-start'} gap-4 w-full`}
                    >

                        {badge ? (
                            typeof badge === 'string' ? (
                                <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${isDark ? 'bg-gold/20 border-gold/40 text-gold shadow-[0_0_15px_rgba(239,191,91,0.2)]' : 'bg-gold/10 border-gold/30 text-gold-strong'} text-xs font-bold tracking-widest uppercase`}>
                                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                                    {badge}
                                </span>
                            ) : badge
                        ) : (
                            <div className="flex gap-3">
                                <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${isDark ? 'bg-gold/20 border-gold/40 text-gold shadow-[0_0_15px_rgba(239,191,91,0.2)]' : 'bg-gold/10 border-gold/30 text-gold-strong'} text-xs font-bold tracking-widest uppercase`}>
                                    <Shield size={14} className="text-gold" />
                                    Ministry Licensed Operator
                                </span>
                            </div>
                        )}
                    </motion.div>

                    {/* Title */}
                    <div className="w-full">
                        <h1 className={`font-display font-semibold text-[32px] sm:text-[40px] md:text-[58px] ${isDark ? 'text-white' : 'text-ink'} leading-[1.1] tracking-[-0.01em]`}>
                            {title}
                        </h1>
                    </div>

                    {/* Subtitle */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                        className={`text-lg md:text-xl font-light leading-relaxed max-w-2xl ${isDark ? 'text-white/90' : 'text-muted'} ${layout === 'center' ? 'mx-auto' : 'mx-auto lg:mx-0 border-l-2 border-gold/30 pl-6'}`}
                    >
                        {subtitle}
                    </motion.div>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                        className="flex flex-wrap gap-4 mt-2 justify-center lg:justify-start"
                    >
                        {ctaText && ctaLink && (
                            <GlassButton
                                href={ctaLink}
                                variant="primary"
                                size="lg"
                                className="btn-primary"
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
                                className={`btn-secondary ${isDark ? 'border-white/30 text-white hover:bg-white/10' : 'border-border text-ink'}`}
                            >
                                {secondaryCtaText}
                            </GlassButton>
                        )}
                    </motion.div>

                    {/* Nusuk Hero Badges */}
                    <NusukHeroBadges />

                    {/* Trust Indicators */}
                    {stats && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
                            className={`mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-2xl p-6 rounded-2xl shadow-sm ${isDark ? 'bg-black/40 border border-white/10 backdrop-blur-md' : 'bg-surface-alt border border-border'}`}
                        >
                            {stats.map((stat, i) => (
                                <div key={i} className="flex flex-col gap-1 items-center lg:items-start text-center lg:text-left">
                                    <div className="flex items-center gap-2 text-gold-strong mb-1">
                                        {stat.icon || <CheckCircle size={16} />}
                                        <span className={`font-bold text-2xl ${isDark ? 'text-surface' : 'text-ink'}`}>{stat.value}</span>
                                    </div>
                                    <span className={`text-[10px] md:text-xs uppercase tracking-wider ${isDark ? 'text-white/70' : 'text-muted'}`}>{stat.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </div>

                {/* Right Column: Booking Widget */}
                {children && (
                    <motion.div
                        className="w-full max-w-md mx-auto relative z-20"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-surface rounded-[2rem] border border-border shadow-md" />

                            <div className="relative z-10">
                                {children}
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </section >
    );
};

export default Hero;
