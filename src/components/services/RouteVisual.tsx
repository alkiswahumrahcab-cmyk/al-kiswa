import React from 'react';
import { MapPin, Clock } from 'lucide-react';

interface RouteVisualProps {
    from?: string;
    fromLabel?: string;
    to?: string;
    toLabel?: string;
    duration?: string;
    distance?: string;
    showMiqat?: boolean;
}

export default function RouteVisual({
    from = "Makkah Hotel",
    fromLabel = "Pickup Location",
    to = "Madinah Hotel",
    toLabel = "Drop-off Location",
    duration = "4.5 Hours",
    distance = "450 km Highway",
    showMiqat = true
}: RouteVisualProps) {
    return (
        <div className="py-8">
            <div className="relative flex flex-col md:flex-row justify-between items-center max-w-4xl mx-auto bg-neutral-900/50 p-6 md:p-10 rounded-2xl border border-white/10 backdrop-blur-md">

                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-[40%] left-20 right-20 h-0.5 bg-gradient-to-r from-gold-primary/20 via-gold-primary/100 to-gold-primary/20 -z-10" />

                {/* Point A */}
                <div className="flex flex-col items-center text-center z-10 mb-8 md:mb-0">
                    <div className="w-16 h-16 bg-black rounded-full border-4 border-gold-primary flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)] mb-4">
                        <MapPin className="text-gold-primary" size={32} />
                    </div>
                    <h3 className="text-xl font-bold font-sans text-white">{from}</h3>
                    <p className="text-sm text-gray-400">{fromLabel}</p>
                </div>

                {/* Mid Point: Distance/Time */}
                <div className="flex flex-col items-center z-10 bg-black px-6 py-2 rounded-full border border-gold-primary/30 shadow-sm mb-8 md:mb-0">
                    <span className="text-sm font-bold text-gold-primary flex items-center gap-2">
                        <Clock size={16} /> {duration}
                    </span>
                    <span className="text-xs text-gray-400 mt-1">{distance}</span>
                </div>

                {/* Stop: Miqat (Conditional) */}
                {showMiqat && (
                    <div className="flex flex-col items-center text-center z-10 mb-8 md:mb-0">
                        <div className="w-12 h-12 bg-neutral-900 rounded-full border-2 border-white/20 flex items-center justify-center mb-3">
                            <div className="w-4 h-4 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Miqat (Bir Ali)</h3>
                        <p className="text-sm text-gray-400">Optional Stop</p>
                    </div>
                )}

                {/* Point B */}
                <div className="flex flex-col items-center text-center z-10">
                    <div className="w-16 h-16 bg-gold-primary text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.5)] mb-4 border-4 border-black">
                        <MapPin size={32} />
                    </div>
                    <h3 className="text-xl font-bold font-sans text-white">{to}</h3>
                    <p className="text-sm text-gray-400">{toLabel}</p>
                </div>

            </div>
        </div>
    );
}
