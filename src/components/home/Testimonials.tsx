'use client';

import React, { useState, useMemo } from 'react';
import { curatedTestimonials } from '@/data/testimonials';
import { Quote, Star, CheckCircle2, Navigation, Calendar, Car, ArrowRight, ShieldCheck, Clock, Users, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '@/context/SettingsContext';

// Filters available
const FILTERS = [
    "All Reviews",
    "Airport Transfers",
    "Makkah ↔ Madinah",
    "Ziyarat Tours",
    "Family Trip",
    "VIP Service"
];

// Map filter to testimonial tags/trip types
const matchFilter = (filter: string, testimonial: any) => {
    if (filter === "All Reviews") return true;
    const searchString = `${testimonial.trip} ${testimonial.tags.join(' ')}`.toLowerCase();
    
    switch (filter) {
        case "Airport Transfers":
            return searchString.includes("airport");
        case "Makkah ↔ Madinah":
            return searchString.includes("madinah") && searchString.includes("makkah");
        case "Ziyarat Tours":
            return searchString.includes("ziyarat");
        case "Family Trip":
            return searchString.includes("family");
        case "VIP Service":
            return searchString.includes("vip") || searchString.includes("solo") || searchString.includes("spacious");
        default:
            return true;
    }
};

export default function Testimonials() {
    const { settings } = useSettings();
    const [activeFilter, setActiveFilter] = useState("All Reviews");
    const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

    const filteredTestimonials = useMemo(() => {
        return curatedTestimonials.filter(t => matchFilter(activeFilter, t));
    }, [activeFilter]);

    const toggleExpand = (id: string) => {
        setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <section className="py-24 relative overflow-hidden bg-[#070709] border-t border-white/5">
            {/* PHASE 8: Premium Background with deep gradient & gold lighting */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Midnight gradient mesh */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,hsl(var(--gold-glow) / 0.03),transparent_40%),radial-gradient(circle_at_85%_30%,hsl(var(--gold-glow) / 0.05),transparent_40%),radial-gradient(circle_at_50%_100%,hsl(var(--gold-glow) / 0.02),transparent_50%)]" />
                {/* Floating Particles (CSS simulated) */}
                <div className="absolute inset-0 opacity-20 bg-[url('/pattern.png')] bg-repeat opacity-[0.015] mix-blend-overlay" />
                
                {/* Ambient Lighting */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px] -mr-48 -mt-48 mix-blend-screen" />
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gold-metallic/5 rounded-full blur-[150px] -ml-48 -mb-48 mix-blend-screen" />
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                
                {/* PHASE 2: Premium Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 flex flex-col items-center"
                >
                    {/* Glowing Glass Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-gold/30 shadow-[0_0_20px_hsl(var(--gold-glow) / 0.15)] mb-6 hover:shadow-[0_0_30px_hsl(var(--gold-glow) / 0.3)] transition-all duration-300">
                        <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} size={14} className="fill-gold text-gold drop-shadow-[0_0_8px_hsl(var(--gold-glow) / 0.5)]" />
                            ))}
                        </div>
                        <span className="text-white text-sm font-semibold tracking-wide">5.0 Google Rating</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-sans text-white mb-6 tracking-tight drop-shadow-xl max-w-4xl">
                        Trusted by <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent drop-shadow-[0_0_10px_hsl(var(--gold-glow) / 0.3)]">Pilgrims</span> Worldwide
                    </h2>
                    
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
                        Thousands of pilgrims from around the world trust Al Kiswah Umrah Cab for reliable airport transfers, Makkah–Madinah journeys, VIP chauffeur services, and comfortable transportation.
                    </p>
                </motion.div>

                {/* PHASE 3: Trust Dashboard */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
                >
                    {[
                        { icon: Star, value: "5.0", label: "Google Rating", delay: 0 },
                        { icon: Users, value: "25,000+", label: "Happy Pilgrims", delay: 0.1 },
                        { icon: MapPin, value: "60,000+", label: "Trips Completed", delay: 0.2 },
                        { icon: Clock, value: "99.8%", label: "On-Time Pickup", delay: 0.3 }
                    ].map((stat, idx) => (
                        <div key={idx} className="glass-panel p-6 flex flex-col items-center justify-center text-center group hover:bg-[#14171c]/80 transition-all duration-300 hover:-translate-y-1">
                            <stat.icon size={28} className="text-gold/70 mb-3 group-hover:text-gold group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_15px_hsl(var(--gold-glow) / 0.2)]" />
                            <div className="text-3xl md:text-4xl font-bold text-white mb-1 drop-shadow-md">{stat.value}</div>
                            <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* PHASE 6: Review Filters */}
                <div className="flex overflow-x-auto pb-6 mb-8 gap-3 snap-x scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:justify-center">
                    {FILTERS.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`snap-center whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-md ${
                                activeFilter === filter 
                                ? "bg-gradient-to-r from-gold to-gold-dark text-black shadow-[0_0_20px_hsl(var(--gold-glow) / 0.3)] scale-105 font-bold" 
                                : "glass-button text-gray-300 hover:text-white border-white/10"
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* PHASE 4 & 5: Redesigned Testimonial Cards & Mobile Experience (Phase 10) */}
                <motion.div layout className="flex overflow-x-auto pb-12 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 snap-x snap-mandatory scrollbar-hide md:overflow-visible items-stretch">
                    <AnimatePresence mode='popLayout'>
                        {filteredTestimonials.map((testimonial, index) => {
                            const isExpanded = expandedCards[testimonial.id];
                            const shouldClamp = testimonial.story.length > 150;
                            
                            return (
                                <motion.article 
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
                                    key={testimonial.id}
                                    className="snap-center w-[90vw] md:w-auto flex-shrink-0 glass-panel p-6 md:p-8 group flex flex-col h-full border border-gold/20 hover:border-gold/50 relative overflow-hidden"
                                >
                                    {/* Gold Accent Line */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    
                                    {/* Quote Icon Watermark */}
                                    <Quote className="absolute -top-4 -right-4 text-white/5 group-hover:text-gold/10 transition-colors duration-500 rotate-180" size={120} />

                                    <div className="relative z-10 flex flex-col h-full">
                                        
                                        {/* Customer Header */}
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold to-gold-dark p-[2px] shadow-[0_0_15px_hsl(var(--gold-glow) / 0.3)] flex-shrink-0">
                                                <div className="w-full h-full rounded-full bg-[#13151a] flex items-center justify-center">
                                                    <span className="text-gold font-bold text-xl font-sans">
                                                        {testimonial.name.charAt(0)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-white text-lg font-sans flex items-center gap-2">
                                                    {testimonial.name}
                                                    <CheckCircle2 size={16} className="text-blue-400" />
                                                </div>
                                                <div className="text-sm font-medium text-gray-400">
                                                    {testimonial.origin} • Verified Customer
                                                </div>
                                            </div>
                                        </div>

                                        {/* Journey Information Chips */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md glass-panel !bg-white/5 !border-white/10 text-xs font-medium text-gray-300">
                                                <Navigation size={12} className="text-gold" />
                                                {testimonial.trip}
                                            </div>
                                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md glass-panel !bg-white/5 !border-white/10 text-xs font-medium text-gray-300">
                                                <Calendar size={12} className="text-gold" />
                                                {testimonial.date}
                                            </div>
                                        </div>

                                        {/* Rating & Featured Quote */}
                                        <div className="flex gap-1 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={18}
                                                    className={`drop-shadow-sm ${i < testimonial.rating ? "fill-gold text-gold" : "text-gray-700"}`}
                                                />
                                            ))}
                                        </div>
                                        <h4 className="text-xl md:text-2xl font-semibold text-white mb-3 leading-tight italic drop-shadow-md">
                                            "{testimonial.title}"
                                        </h4>

                                        {/* Review Body */}
                                        <blockquote className="mb-8 flex-1">
                                            <p className={`text-base md:text-lg font-sans text-gray-300 leading-relaxed font-light ${!isExpanded && shouldClamp ? 'line-clamp-4' : ''}`}>
                                                {testimonial.story}
                                            </p>
                                            {shouldClamp && (
                                                <button 
                                                    onClick={() => toggleExpand(testimonial.id)}
                                                    className="text-gold hover:text-gold-light font-medium text-sm mt-2 transition-colors focus:outline-none flex items-center gap-1"
                                                >
                                                    {isExpanded ? "Read Less" : "Read Full Review"}
                                                </button>
                                            )}
                                        </blockquote>

                                        {/* Footer */}
                                        <div className="mt-auto pt-5 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                                            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-gold" /> Google Verified</span>
                                            <span>Journey Completed</span>
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* PHASE 7: Google Reviews Panel CTA */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-4 md:mt-12 glass-panel p-8 md:p-12 text-center relative overflow-hidden group"
                >
                    {/* Inner gold glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5 pointer-events-none group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
                        <div className="text-left flex flex-col md:flex-row items-center gap-6">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)] p-4 transform group-hover:scale-110 transition-transform duration-500">
                                {/* Google "G" Logo SVG placeholder */}
                                <svg viewBox="0 0 24 24" className="w-full h-full">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                            </div>
                            <div className="text-center md:text-left">
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Excellent</h3>
                                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                                    <span className="font-bold text-xl text-gold">5.0</span>
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} size={18} className="fill-gold text-gold drop-shadow-[0_0_8px_hsl(var(--gold-glow) / 0.5)]" />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-400 font-medium tracking-wide">Based on 500+ verified reviews</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <a
                                href={settings?.contact?.social?.googleBusiness || "https://share.google/ARbbVaAackyOs8N7G"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="glass-button w-full sm:w-auto px-8 py-4 text-lg font-semibold flex items-center justify-center gap-2 hover:bg-white/10"
                            >
                                Write a Review
                            </a>
                            <a
                                href={settings?.contact?.social?.googleBusiness || "https://share.google/ARbbVaAackyOs8N7G"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-gold w-full sm:w-auto px-8 py-4 text-lg font-bold flex items-center justify-center gap-2"
                            >
                                Read All Reviews <ArrowRight size={20} />
                            </a>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
