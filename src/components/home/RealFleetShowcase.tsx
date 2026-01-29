'use client';

import React from 'react';
import Image from 'next/image';
import { Camera, MapPin } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';

const realPhotos = [
    {
        id: 1,
        location: "Maien Taiba Hotel, Madinah",
        caption: "Waiting for group arrival",
        time: "Just now",
        image: "/images/real-fleet/maien-taiba.jpg"
    },
    {
        id: 2,
        location: "Hotel Pickup",
        caption: "Maximum Luggage Capacity - No Stress",
        time: "2 hours ago",
        image: "/images/real-fleet/luggage-loaded.jpg"
    },
    {
        id: 3,
        location: "Al Sham Hotel, Makkah",
        caption: "VIP Group Transfer Ready",
        time: "Today, 10:00 AM",
        image: "/images/real-fleet/hotel-pickup.jpg"
    }
];

export default function RealFleetShowcase() {
    return (
        <section className="py-20 bg-primary-black relative border-t border-white/5">
            <div className="container mx-auto px-4">
                <FadeIn>
                    <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 text-gold-primary mb-4">
                                <Camera size={20} />
                                <span className="font-bold tracking-widest uppercase text-sm">Live from the Field</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white font-serif">
                                Real Trips, <span className="text-gold-primary">Real Moments</span>
                            </h2>
                        </div>
                        <p className="text-gray-400 max-w-md text-sm md:text-base border-l-2 border-gold-primary/30 pl-4">
                            See our fleet in action across the Holy Cities. We don't just use stock photos; we are on the ground serving legitimate pilgrims every day.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {realPhotos.map((photo, idx) => (
                        <FadeIn key={photo.id} delay={idx * 0.1}>
                            <div className="group relative aspect-[4/5] bg-neutral-900 rounded-2xl overflow-hidden border border-white/10 hover:border-gold-primary/50 transition-all duration-500">
                                {/* Real Image */}
                                <div className="absolute inset-0">
                                    <Image
                                        src={photo.image}
                                        alt={photo.caption}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </div>

                                {/* Overlay Content */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="flex items-center gap-2 text-gold-primary text-xs font-bold uppercase mb-2">
                                            <MapPin size={12} />
                                            {photo.location}
                                        </div>
                                        <p className="text-white font-medium text-lg leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                            {photo.caption}
                                        </p>
                                        <span className="text-neutral-500 text-[10px] mt-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                                            {photo.time}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
