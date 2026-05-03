'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Grid3X3 } from 'lucide-react';

const GALLERY_IMAGES = [
    { src: '/images/fleet/hiace/toyota-hiace-2026-exterior-front-view.jpeg', alt: 'Toyota Hiace 2026 front view in Abha, Saudi Arabia', category: 'Exterior' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-exterior-front-abha.jpeg', alt: 'Toyota Hiace 2026 front shot in Abha mountains', category: 'Exterior' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-exterior-side-profile.jpeg', alt: 'Toyota Hiace 2026 side profile view', category: 'Exterior' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-exterior-full-rear.jpeg', alt: 'Toyota Hiace 2026 full rear view', category: 'Exterior' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-exterior-rear-view.jpeg', alt: 'Toyota Hiace 2026 rear cargo access', category: 'Exterior' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-exterior-sliding-door-open.jpeg', alt: 'Toyota Hiace 2026 sliding passenger door open', category: 'Exterior' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-exterior-front-bumper.jpeg', alt: 'Toyota Hiace 2026 front bumper and grille detail', category: 'Exterior' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-exterior-front-rear-headlight.jpeg', alt: 'Toyota Hiace 2026 front and rear headlight', category: 'Exterior' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-exterior-led-headlight.jpeg', alt: 'Toyota Hiace 2026 LED headlight detail', category: 'Exterior' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-exterior-headlight-detail.jpeg', alt: 'Toyota Hiace 2026 headlight close-up', category: 'Exterior' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-exterior-alloy-wheel.jpeg', alt: 'Toyota Hiace 2026 alloy wheel design', category: 'Exterior' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-exterior-wheel-detail.jpeg', alt: 'Toyota Hiace 2026 tyre and wheel detail', category: 'Exterior' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-exterior-full-body-white.jpeg', alt: 'Toyota Hiace 2026 full body white exterior', category: 'Exterior' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-interior-dashboard-main.jpeg', alt: 'Toyota Hiace 2026 dashboard and infotainment system', category: 'Interior' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-interior-passenger-dashboard.jpeg', alt: 'Toyota Hiace 2026 passenger dashboard view', category: 'Interior' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-interior-steering-wheel.jpeg', alt: 'Toyota Hiace 2026 steering wheel detail', category: 'Interior' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-interior-steering-detail.jpeg', alt: 'Toyota Hiace 2026 steering column close-up', category: 'Interior' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-interior-steering-angle.jpeg', alt: 'Toyota Hiace 2026 steering angle view', category: 'Interior' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-interior-passenger-seats.jpeg', alt: 'Toyota Hiace 2026 spacious passenger seating', category: 'Interior' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-interior-passenger-comfort.jpeg', alt: 'Toyota Hiace 2026 passenger comfort and legroom', category: 'Interior' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-lifestyle-cinematic-abha.jpeg', alt: 'Toyota Hiace 2026 cinematic shot in Abha', category: 'Lifestyle' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-lifestyle-full-desert-road.jpeg', alt: 'Toyota Hiace 2026 driving on desert road in Saudi Arabia', category: 'Lifestyle' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-lifestyle-open-road.jpeg', alt: 'Toyota Hiace 2026 on open Saudi road', category: 'Lifestyle' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-lifestyle-aerial-location.jpeg', alt: 'Toyota Hiace 2026 aerial location view in Abha', category: 'Lifestyle' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-lifestyle-top-wide-view.jpeg', alt: 'Toyota Hiace 2026 top-wide view in Abha mountains', category: 'Lifestyle' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-lifestyle-night-road.jpeg', alt: 'Toyota Hiace 2026 driving at night', category: 'Lifestyle' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-lifestyle-night-flash.jpeg', alt: 'Toyota Hiace 2026 night flash photography', category: 'Lifestyle' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-lifestyle-night-grey.jpeg', alt: 'Toyota Hiace 2026 grey night exterior', category: 'Lifestyle' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-lifestyle-driving-rain.jpeg', alt: 'Toyota Hiace 2026 driving in Abha rain', category: 'Lifestyle' },
];

const CATEGORIES = ['All', 'Exterior', 'Interior', 'Lifestyle'];

export default function HiaceGallery() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState('All');
    const [showAll, setShowAll] = useState(false);

    const filtered = activeCategory === 'All' ? GALLERY_IMAGES : GALLERY_IMAGES.filter(img => img.category === activeCategory);
    const displayed = showAll ? filtered : filtered.slice(0, 9);

    useEffect(() => {
        document.body.style.overflow = selectedIndex !== null ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedIndex]);

    const handleKey = useCallback((e: KeyboardEvent) => {
        if (selectedIndex === null) return;
        if (e.key === 'ArrowRight') setSelectedIndex((i) => ((i ?? 0) + 1) % filtered.length);
        if (e.key === 'ArrowLeft') setSelectedIndex((i) => ((i ?? 0) - 1 + filtered.length) % filtered.length);
        if (e.key === 'Escape') setSelectedIndex(null);
    }, [selectedIndex, filtered.length]);

    useEffect(() => {
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [handleKey]);

    return (
        <section className="py-24 bg-[#0a0a0a] border-y border-white/5" id="gallery">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-gold-primary text-sm font-bold tracking-[0.3em] uppercase mb-3 block">Visual Gallery</span>
                    <h2 className="text-4xl md:text-5xl font-bold font-playfair text-white mb-4">
                        Toyota Hiace 2026 in Abha
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Real photography from Abha's mountains, roads and fog. Click any image to view in full-screen high resolution.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex justify-center gap-3 mb-10 flex-wrap">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => { setActiveCategory(cat); setShowAll(false); }}
                            className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
                                activeCategory === cat
                                    ? 'bg-gold-primary border-gold-primary text-black'
                                    : 'border-white/20 text-slate-400 hover:border-gold-primary/60 hover:text-white'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {displayed.map((img, idx) => (
                        <motion.div
                            key={img.src}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.04 }}
                            onClick={() => setSelectedIndex(idx)}
                            className={`relative overflow-hidden cursor-pointer group bg-primary-black border border-white/5 rounded-xl ${
                                idx === 0 ? 'col-span-2 md:col-span-1 h-64 md:h-80' :
                                idx === 3 ? 'col-span-2 h-56 md:h-72' : 'h-52 md:h-64'
                            }`}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 768px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <div className="bg-gold-primary/90 p-3 rounded-full transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                    <Maximize2 size={22} className="text-black" />
                                </div>
                            </div>
                            <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-gold-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                                {img.category}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                {!showAll && filtered.length > 9 && (
                    <div className="text-center mt-10">
                        <button
                            onClick={() => setShowAll(true)}
                            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-gold-primary text-gold-primary rounded-full font-bold hover:bg-gold-primary hover:text-black transition-all duration-300"
                        >
                            <Grid3X3 size={18} />
                            View All {filtered.length} Images
                        </button>
                    </div>
                )}
            </div>

            {/* Full-Screen Lightbox */}
            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedIndex(null)}
                        className="fixed inset-0 z-[100] bg-black/97 backdrop-blur-md flex items-center justify-center p-4"
                    >
                        {/* Close */}
                        <button onClick={() => setSelectedIndex(null)} className="absolute top-6 right-6 z-[110] text-white/50 hover:text-white bg-white/10 p-2.5 rounded-full transition-colors">
                            <X size={28} />
                        </button>

                        {/* Prev */}
                        <button
                            onClick={(e) => { e.stopPropagation(); setSelectedIndex((selectedIndex - 1 + filtered.length) % filtered.length); }}
                            className="absolute left-4 md:left-8 z-[110] text-white/60 hover:text-white bg-white/10 hover:bg-gold-primary/80 p-3 rounded-full transition-all"
                        >
                            <ChevronLeft size={32} />
                        </button>

                        {/* Image */}
                        <div className="relative w-full max-w-6xl h-[75vh] md:h-[88vh]" onClick={(e) => e.stopPropagation()}>
                            <Image
                                src={filtered[selectedIndex].src}
                                alt={filtered[selectedIndex].alt}
                                fill
                                className="object-contain"
                                priority
                                sizes="100vw"
                            />
                            <div className="absolute bottom-[-36px] left-0 right-0 text-center">
                                <p className="text-slate-400 text-sm font-mono">{filtered[selectedIndex].alt}</p>
                                <p className="text-slate-600 text-xs mt-1">{selectedIndex + 1} / {filtered.length}</p>
                            </div>
                        </div>

                        {/* Next */}
                        <button
                            onClick={(e) => { e.stopPropagation(); setSelectedIndex((selectedIndex + 1) % filtered.length); }}
                            className="absolute right-4 md:right-8 z-[110] text-white/60 hover:text-white bg-white/10 hover:bg-gold-primary/80 p-3 rounded-full transition-all"
                        >
                            <ChevronRight size={32} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
