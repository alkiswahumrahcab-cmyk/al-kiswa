import React from 'react';

export default function BlogHero() {
    return (
        <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 bg-surface overflow-hidden">
            {/* Subtle Background Accent */}
            <div className="absolute top-0 right-0 w-[80%] md:w-1/2 h-full bg-surface-alt rounded-bl-[150px] md:rounded-bl-[250px] opacity-70 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12">
                    
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

                    {/* Right Side - Typographic Graphic */}
                    <div className="md:w-auto flex justify-start md:justify-end pb-2 md:pb-6">
                        <span className="text-7xl md:text-[120px] lg:text-[140px] font-bold font-arabic text-gold-strong opacity-[0.08] leading-none select-none" dir="rtl">
                            المدونة
                        </span>
                    </div>
                </div>

                {/* Divider */}
                <div className="max-w-5xl mx-auto mt-16 md:mt-24 h-px bg-border w-full" />
            </div>
        </section>
    );
}
