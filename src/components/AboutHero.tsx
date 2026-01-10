import React from 'react';
import Image from 'next/image';

export default function AboutHero() {
    return (
        <div className="relative h-[65vh] w-full overflow-hidden flex items-center justify-center">
            {/* Background Image with Premium Overlays */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1565552629477-ff145957811e?q=80&w=1920&auto=format&fit=crop"
                    alt="Makkah Holy Mosque"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Premium Emerald Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-emerald-900/40 to-emerald-950/90 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent opacity-70" />
                {/* Texture */}
                <div className="absolute inset-0 bg-heritage opacity-[0.05] mix-blend-overlay pointer-events-none" />
            </div>

            {/* Light Beam Effect */}
            <div className="absolute top-0 right-1/4 w-[400px] h-full bg-gradient-to-l from-emerald-400/5 to-transparent skew-x-[15deg] blur-3xl pointer-events-none z-[1]" />

            {/* Content */}
            <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto flex flex-col items-center">
                <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs mb-6 block drop-shadow-lg">Our Story & Mission</span>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 font-playfair drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                    Serving Pilgrims with <br />
                    <span className="text-gradient-gold">Sincerity & Excellence</span>
                </h1>
                <div className="w-24 h-1 bg-gold rounded-full mb-8 shadow-lg shadow-gold/20" />
                <p className="text-xl md:text-2xl font-light text-emerald-50/90 leading-relaxed drop-shadow-md max-w-2xl">
                    Your journey of faith deserves the highest level of <br className="hidden md:block" /> comfort, safety, and spiritual care.
                </p>
            </div>
        </div>
    );
}

