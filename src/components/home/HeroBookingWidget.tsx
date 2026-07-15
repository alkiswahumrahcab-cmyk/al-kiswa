'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Calendar, Users, ChevronDown, Briefcase, Plus, Minus } from 'lucide-react';

export default function HeroBookingWidget() {
    const router = useRouter();
    
    // Quick state
    const [pickup, setPickup] = useState('Jeddah Airport');
    const [dropoff, setDropoff] = useState('Makkah Hotel');
    const [date, setDate] = useState('');
    const [passengers, setPassengers] = useState(2);
    const [luggage, setLuggage] = useState(2);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/booking?from=${encodeURIComponent(pickup)}&to=${encodeURIComponent(dropoff)}&passengers=${passengers}&luggage=${luggage}&date=${date}`);
    };

    const updatePassengers = (increment: number) => {
        setPassengers(prev => {
            const newVal = prev + increment;
            if (newVal < 1) return 1;
            if (newVal > 19) return 19;
            return newVal;
        });
    };

    const updateLuggage = (increment: number) => {
        setLuggage(prev => {
            const newVal = prev + increment;
            if (newVal < 0) return 0;
            return newVal;
        });
    };

    return (
        <div className="w-full bg-surface rounded-2xl shadow-lg p-5 lg:p-8 border border-border">
            <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4 items-end">
                {/* Pickup */}
                <div className="flex-1 w-full relative">
                    <label className="block text-[13px] font-semibold text-muted mb-2">From (pickup)</label>
                    <div className="relative">
                        <MapPin size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
                        <select 
                            value={pickup} 
                            onChange={(e) => setPickup(e.target.value)}
                            className="w-full h-12 pl-10 pr-4 rounded-md border border-border-strong bg-surface focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold appearance-none font-body text-ink"
                        >
                            <option value="Jeddah Airport">Jeddah Airport (JED)</option>
                            <option value="Makkah Hotel">Makkah Hotel</option>
                            <option value="Madinah Hotel">Madinah Hotel</option>
                            <option value="Madinah Airport">Madinah Airport (MED)</option>
                            <option value="Jeddah Hotel">Jeddah Hotel</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                    </div>
                </div>

                {/* Dropoff */}
                <div className="flex-1 w-full relative">
                    <label className="block text-[13px] font-semibold text-muted mb-2">To (dropoff)</label>
                    <div className="relative">
                        <MapPin size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
                        <select 
                            value={dropoff} 
                            onChange={(e) => setDropoff(e.target.value)}
                            className="w-full h-12 pl-10 pr-4 rounded-md border border-border-strong bg-surface focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold appearance-none font-body text-ink"
                        >
                            <option value="Makkah Hotel">Makkah Hotel</option>
                            <option value="Madinah Hotel">Madinah Hotel</option>
                            <option value="Jeddah Airport">Jeddah Airport (JED)</option>
                            <option value="Madinah Airport">Madinah Airport (MED)</option>
                            <option value="Jeddah Hotel">Jeddah Hotel</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                    </div>
                </div>

                {/* Date & Time */}
                <div className="flex-1 w-full relative">
                    <label className="block text-[13px] font-semibold text-muted mb-2">Date</label>
                    <div className="relative">
                        <Calendar size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
                        <input 
                            type="date" 
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full h-12 pl-10 pr-4 rounded-md border border-border-strong bg-surface focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold font-body text-ink"
                        />
                    </div>
                </div>

                {/* Passengers Stepper */}
                <div className="w-full lg:w-32 relative">
                    <label className="block text-[13px] font-semibold text-muted mb-2">Passengers</label>
                    <div className="flex items-center justify-between w-full h-12 rounded-md border border-border-strong bg-surface px-3">
                        <button type="button" onClick={() => updatePassengers(-1)} className="text-muted hover:text-gold p-1" aria-label="Decrease passengers">
                            <Minus size={16} />
                        </button>
                        <div className="flex items-center gap-2 text-ink font-semibold">
                            <Users size={16} className="text-gold" />
                            {passengers}
                        </div>
                        <button type="button" onClick={() => updatePassengers(1)} className="text-muted hover:text-gold p-1" aria-label="Increase passengers">
                            <Plus size={16} />
                        </button>
                    </div>
                </div>

                {/* Luggage Stepper */}
                <div className="w-full lg:w-32 relative">
                    <label className="block text-[13px] font-semibold text-muted mb-2">Luggage</label>
                    <div className="flex items-center justify-between w-full h-12 rounded-md border border-border-strong bg-surface px-3">
                        <button type="button" onClick={() => updateLuggage(-1)} className="text-muted hover:text-gold p-1" aria-label="Decrease luggage">
                            <Minus size={16} />
                        </button>
                        <div className="flex items-center gap-2 text-ink font-semibold">
                            <Briefcase size={16} className="text-gold" />
                            {luggage}
                        </div>
                        <button type="button" onClick={() => updateLuggage(1)} className="text-muted hover:text-gold p-1" aria-label="Increase luggage">
                            <Plus size={16} />
                        </button>
                    </div>
                </div>

                {/* Submit */}
                <button type="submit" className="w-full lg:w-auto h-12 px-8 bg-gold hover:bg-gold-strong text-ink font-semibold rounded-btn shadow-sm transition-all flex-shrink-0">
                    Get Prices
                </button>
            </form>
            
            {/* Trust line below widget */}
            <div className="mt-5 text-center lg:text-left text-[13px] lg:text-sm text-muted flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1 font-body">
                <span>Fixed prices</span>
                <span className="w-[3px] h-[3px] rounded-full bg-border-strong hidden sm:block" />
                <span>Free cancellation</span>
                <span className="w-[3px] h-[3px] rounded-full bg-border-strong hidden sm:block" />
                <span>Nusuk-approved drivers</span>
                <span className="w-[3px] h-[3px] rounded-full bg-border-strong hidden sm:block" />
                <span>No hidden fees</span>
            </div>
        </div>
    );
}
