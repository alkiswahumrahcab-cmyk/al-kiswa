'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Plane, CheckCircle2, Navigation } from 'lucide-react';

interface VisualRouteSelectorProps {
    onSelect: (location: string, type: 'pickup' | 'dropoff') => void;
    currentPickup: string;
    currentDropoff: string;
}

const locations = [
    {
        id: 'jeddah-airport',
        name: 'Jeddah Airport',
        type: 'airport',
        image: '/images/routes/jeddah-airport-hero-professional.png',
        label: 'Jeddah Airport (JED)',
        arabic: 'مطار جدة'
    },
    {
        id: 'makkah',
        name: 'Makkah Hotel',
        type: 'city',
        image: '/images/routes/makkah-ziyarat-hero.png',
        label: 'Makkah Hotel / Haram',
        arabic: 'فندق مكة'
    },
    {
        id: 'madinah',
        name: 'Madinah Hotel',
        type: 'city',
        image: '/images/services/hotel-transfers-new.png',
        label: 'Madinah Hotel / Haram',
        arabic: 'فندق المدينة'
    },
    {
        id: 'madinah-airport',
        name: 'Madinah Airport',
        type: 'airport',
        image: '/images/routes/madinah-airport-hero.png', // Fallback or specific if available
        label: 'Madinah Airport (MED)',
        arabic: 'مطار المدينة'
    }
];

export default function VisualRouteSelector({ onSelect, currentPickup, currentDropoff }: VisualRouteSelectorProps) {
    const isComplete = currentPickup && currentDropoff;
    const selectionStage = !currentPickup ? 'pickup' : 'dropoff';

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <motion.div
                    key={isComplete ? 'complete' : selectionStage}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                >
                    <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                        {isComplete ? (
                            <><CheckCircle2 className="text-green-500" /> Great Selection!</>
                        ) : selectionStage === 'pickup' ? (
                            <><MapPin className="text-gold-primary" /> Where are you starting?</>
                        ) : (
                            <><MapPin className="text-gold-primary" /> Where are you going?</>
                        )}
                    </h3>
                    <p className="text-sm text-gray-400">
                        {isComplete
                            ? 'Scroll down to select your date and time'
                            : selectionStage === 'pickup'
                                ? 'Tap your pickup location'
                                : `Starting from ${currentPickup.split(' ')[0]}... Select destination`
                        }
                    </p>
                </motion.div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {locations.map((loc) => {
                    const isPickup = currentPickup === loc.name;
                    const isDropoff = currentDropoff === loc.name;
                    const isDisabled = isPickup; // Disable pickup if it's already selected (so we don't pick it as dropoff)

                    return (
                        <motion.button
                            key={loc.id}
                            whileHover={!isDisabled ? { scale: 1.02 } : {}}
                            whileTap={!isDisabled ? { scale: 0.98 } : {}}
                            onClick={() => !isDisabled && onSelect(loc.name, selectionStage)}
                            disabled={isDisabled && !isComplete} // Allow clicking to reset if needed? No, logic handles stage.
                            className={`
                                relative group overflow-hidden rounded-2xl aspect-[4/5] border transition-all
                                ${isPickup ? 'border-gold-primary ring-2 ring-gold-primary bg-gold-primary/10' : ''}
                                ${isDropoff ? 'border-green-500 ring-2 ring-green-500 bg-green-500/10' : ''}
                                ${!isPickup && !isDropoff ? 'border-white/10 hover:border-gold-primary/50' : ''}
                                ${isDisabled && !isPickup ? 'opacity-50 grayscale' : ''}
                            `}
                        >
                            <Image
                                src={loc.image}
                                alt={loc.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex flex-col justify-end text-left">
                                {isPickup && (
                                    <div className="absolute top-3 left-3 bg-gold-primary text-black text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                        <MapPin size={10} /> PICKUP
                                    </div>
                                )}
                                {isDropoff && (
                                    <div className="absolute top-3 left-3 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                        <Navigation size={10} /> DROPOFF
                                    </div>
                                )}
                                <span className="text-gold-primary text-xs font-bold uppercase tracking-wider mb-1">
                                    {loc.arabic}
                                </span>
                                <span className="text-white font-bold text-sm md:text-base leading-tight">
                                    {loc.label}
                                </span>
                                {loc.type === 'airport' && <Plane className="absolute top-3 right-3 text-white/50 w-4 h-4" />}
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            {currentPickup && (
                <button
                    onClick={() => onSelect('', 'pickup')} // Reset
                    className="mx-auto block text-xs text-gray-500 hover:text-white underline mt-4"
                >
                    Reset Selection
                </button>
            )}
        </div>
    );
}
