'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { generatedData } from '@/data/seo-generator';
import { ChevronDown, MapPin, Globe, Car, Star } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';

export default function ServiceDirectory() {
    // Determine which categories to show
    const categories = [
        {
            id: 'international',
            label: 'International & Western Pilgrims',
            icon: <Globe size={18} />,
            data: generatedData.categories.international
        },
        {
            id: 'routes',
            label: 'Popular Routes & Cities',
            icon: <MapPin size={18} />,
            data: generatedData.categories.routes
        },
        {
            id: 'vehicles',
            label: 'Vehicle Fleet Services',
            icon: <Car size={18} />,
            data: generatedData.categories.vehicles
        },
        {
            id: 'luxury',
            label: 'VIP & Budget Options',
            icon: <Star size={18} />,
            data: generatedData.categories.budget_luxury
        }
    ];

    const [activeTab, setActiveTab] = useState('international');
    const [isExpanded, setIsExpanded] = useState(false);

    // Stats
    const totalKeywords = generatedData.all.length;

    return (
        <section className="py-12 bg-primary-black border-t border-white/5">
            <div className="container px-4 md:px-6">
                <FadeIn>
                    <div className="mb-8">
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 font-playfair">
                            Comprehensive Service Directory
                        </h3>
                        <p className="text-gray-500 text-sm">
                            Explore our extensive range of transport solutions tailored for every pilgrim's need.
                        </p>
                    </div>

                    {/* Tabs / Category Selectors */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === cat.id
                                    ? 'bg-gold-primary text-black shadow-lg shadow-gold-primary/20'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {cat.icon}
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="bg-white/[0.02] rounded-xl p-6 border border-white/5 relative">
                        {categories.map((cat) => (
                            activeTab === cat.id && (
                                <div key={cat.id} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3 transition-all duration-500 ${isExpanded ? 'max-h-full opacity-100' : 'max-h-[400px] overflow-hidden relative'}`}>

                                        {cat.data.map((keyword, idx) => (
                                            <Link
                                                key={idx}
                                                href="/booking"
                                                className="group flex items-center gap-2 text-sm text-gray-500 hover:text-gold-primary transition-colors"
                                                title={`Book ${keyword}`}
                                            >
                                                <span className="w-1 h-1 rounded-full bg-white/10 group-hover:bg-gold-primary transition-colors flex-shrink-0" />
                                                <span className="truncate">{keyword}</span>
                                            </Link>
                                        ))}

                                        {/* Gradient Overlay when not expanded */}
                                        {!isExpanded && (
                                            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-primary-black to-transparent pointer-events-none" />
                                        )}
                                    </div>

                                    <div className="mt-8 pt-4 border-t border-white/5 text-center">
                                        <button
                                            onClick={() => setIsExpanded(!isExpanded)}
                                            className="inline-flex items-center gap-2 text-xs font-bold text-gold-primary uppercase tracking-widest hover:text-white transition-colors"
                                        >
                                            {isExpanded ? 'Show Less' : `View All ${cat.data.length} Services`}
                                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                                        </button>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>

                    {/* SEO Footer Note - purely for crawlers mostly */}
                    <div className="mt-8 text-center">
                        <p className="text-[10px] text-gray-800 uppercase tracking-widest">
                            We cover {totalKeywords}+ unique service combinations
                        </p>
                    </div>

                </FadeIn>
            </div>
        </section>
    );
}
