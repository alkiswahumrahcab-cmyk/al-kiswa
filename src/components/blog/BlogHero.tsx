import React from 'react';
import Image from 'next/image';

export default function BlogHero() {
    return (
        <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 bg-surface overflow-hidden">
            {/* Subtle Background Accent */}
            <div className="absolute top-0 right-0 w-[80%] md:w-1/2 h-full bg-surface-alt rounded-bl-[150px] md:rounded-bl-[250px] opacity-70 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 lg:gap-16">
                    
                    {/* Left Side */}
                    <div className="flex-1 space-y-6 md:space-y-8">
                        <div className="inline-block border border-gold/30 bg-gold-soft/50 px-4 py-2 rounded-pill mb-2">
                            <span className="text-gold-strong font-bold uppercase tracking-[0.15em] text-xs">
                                Knowledge Center
                            </span>
                        </div>
                        
                        <h1 className="text-5xl md:text-[80px] lg:text-[96px] font-semibold font-display text-ink leading-[1] tracking-tight">
                            Pilgrim <span className="text-gold-strong italic">Insights</span>
                        </h1>
                        
                        <p className="text-lg md:text-[22px] text-body leading-[1.65] font-body max-w-[42ch]">
                            Expert guides, travel tips, and spiritual resources for a <span className="text-ink font-medium">blessed Umrah journey</span>.
                        </p>
                    </div>

                    {/* Right Side - Professional Image */}
                    <div className="w-full md:w-[50%] lg:w-[55%] relative mt-8 md:mt-0">
                        <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-white/20">
                            <Image
                                src="/images/blog.jpg"
                                alt="Umrah Travel Insights"
                                fill
                                priority
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            {/* Overlay for Arabic Text */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/20 to-transparent pointer-events-none" />
                            <div className="absolute bottom-6 right-8 pointer-events-none drop-shadow-lg">
                                <span className="text-6xl md:text-[100px] font-bold font-arabic text-white/60 leading-none select-none" dir="rtl">
                                    المدونة
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="mt-16 md:mt-24 h-px bg-border w-full" />
            </div>
        </section>
    );
}
