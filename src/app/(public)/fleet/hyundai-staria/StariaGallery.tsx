'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const IMAGES = [
    '/images/fleet/staria/hyundai-staria-2026-exterior-cinematic.jpeg',
    '/images/fleet/staria/hyundai-staria-2026-exterior-full-body.jpeg',
    '/images/fleet/staria/hyundai-staria-2026-exterior-front-view.jpeg',
    '/images/fleet/staria/hyundai-staria-2026-exterior-full-front.jpeg',
    '/images/fleet/staria/hyundai-staria-2026-exterior-front-details.jpeg',
    '/images/fleet/staria/hyundai-staria-2026-exterior-side-view.jpeg',
    '/images/fleet/staria/hyundai-staria-2026-exterior-side-profile.jpeg',
    '/images/fleet/staria/hyundai-staria-2026-exterior-sliding-doors-open.jpeg',
    '/images/fleet/staria/hyundai-staria-2026-exterior-rear-view.jpeg',
    '/images/fleet/staria/hyundai-staria-2026-exterior-rear-full.jpeg',
    '/images/fleet/staria/hyundai-staria-2026-exterior-back-door.jpeg',
    '/images/fleet/staria/hyundai-staria-2026-exterior-roof-top.jpeg',
    '/images/fleet/staria/hyundai-staria-2026-exterior-led-headlight.jpeg',
    '/images/fleet/staria/hyundai-staria-2026-exterior-headlight-detail.jpeg',
    '/images/fleet/staria/hyundai-staria-2026-exterior-rear-led-lights.jpeg',
    '/images/fleet/staria/hyundai-staria-2026-exterior-rear-lights-combo.jpeg',
    '/images/fleet/staria/hyundai-staria-2026-exterior-alloy-wheels.jpeg',
    '/images/fleet/staria/hyundai-staria-2026-exterior-wheel-design.jpeg',
    '/images/fleet/staria/hyundai-staria-2026-interior-dashboard-main.jpeg',
    '/images/fleet/staria/hyundai-staria-2026-interior-dashboard-angle.jpeg',
    '/images/fleet/staria/hyundai-staria-2026-interior-captain-seat.jpeg',
    '/images/fleet/staria/hyundai-staria-2026-interior-spacious-seating.jpeg',
    '/images/fleet/staria/hyundai-staria-2026-interior-rear-seats.jpeg',
    '/images/fleet/staria/hyundai-staria-2026-lifestyle-on-road-driving.jpeg',
    '/images/fleet/staria/hyundai-staria-2026-lifestyle-desert-road.jpeg',
];

export default function StariaGallery() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [showAll, setShowAll] = useState(false);

    // Prevent body scrolling when lightbox is open
    useEffect(() => {
        if (selectedIndex !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedIndex]);

    const openLightbox = (index: number) => setSelectedIndex(index);
    const closeLightbox = () => setSelectedIndex(null);
    
    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex + 1) % IMAGES.length);
        }
    };
    
    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex - 1 + IMAGES.length) % IMAGES.length);
        }
    };

    const displayedImages = showAll ? IMAGES : IMAGES.slice(0, 8);

    return (
        <section className="py-24 bg-deep-black border-y border-primary-black">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold font-playfair text-white mb-4">
                        Full Gallery Experience
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Explore every angle of the Hyundai Staria 2026. Click any image to view in high-resolution full screen.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {displayedImages.map((src, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            onClick={() => openLightbox(idx)}
                            className="relative h-48 md:h-64 rounded-xl overflow-hidden cursor-pointer group bg-primary-black border border-gold-primary/20"
                        >
                            <Image 
                                src={src} 
                                alt={`Hyundai Staria Gallery Image ${idx + 1}`} 
                                fill 
                                className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" 
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="bg-gold-primary/90 p-3 rounded-full text-primary-black transform scale-50 group-hover:scale-100 transition-transform duration-300">
                                    <Maximize2 size={24} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {!showAll && (
                    <div className="text-center mt-12">
                        <button 
                            onClick={() => setShowAll(true)}
                            className="px-8 py-3 border-2 border-gold-primary text-gold-primary rounded-full font-bold hover:bg-gold-primary hover:text-primary-black transition-colors"
                        >
                            View All 25 Images
                        </button>
                    </div>
                )}
            </div>

            {/* Full Screen Lightbox */}
            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
                    >
                        <button 
                            onClick={closeLightbox}
                            className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors z-[110] bg-black/50 p-2 rounded-full"
                        >
                            <X size={32} />
                        </button>

                        <button 
                            onClick={prevImage}
                            className="absolute left-4 md:left-10 text-white/50 hover:text-white transition-colors z-[110] bg-black/50 p-3 rounded-full"
                        >
                            <ChevronLeft size={36} />
                        </button>

                        <div className="relative w-full max-w-6xl h-[70vh] md:h-[85vh]" onClick={(e) => e.stopPropagation()}>
                            <Image 
                                src={IMAGES[selectedIndex]} 
                                alt={`Hyundai Staria Full View ${selectedIndex + 1}`}
                                fill
                                className="object-contain"
                                priority
                            />
                            <div className="absolute bottom-[-40px] left-0 right-0 text-center text-slate-400 font-mono text-sm">
                                {selectedIndex + 1} / {IMAGES.length}
                            </div>
                        </div>

                        <button 
                            onClick={nextImage}
                            className="absolute right-4 md:right-10 text-white/50 hover:text-white transition-colors z-[110] bg-black/50 p-3 rounded-full"
                        >
                            <ChevronRight size={36} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
