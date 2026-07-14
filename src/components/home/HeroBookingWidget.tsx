'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Calendar, Users, ChevronDown } from 'lucide-react';

export default function HeroBookingWidget() {
    const router = useRouter();
    
    // Quick state
    const [pickup, setPickup] = useState('Jeddah Airport');
    const [dropoff, setDropoff] = useState('Makkah Hotel');
    const [date, setDate] = useState('');
    const [passengers, setPassengers] = useState('2');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/booking?pickup=${encodeURIComponent(pickup)}&dropoff=${encodeURIComponent(dropoff)}&passengers=${passengers}&date=${date}`);
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

                {/* Passengers */}
                <div className="w-full lg:w-32 relative">
                    <label className="block text-[13px] font-semibold text-muted mb-2">Passengers</label>
                    <div className="relative">
                        <Users size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
                        <select 
                            value={passengers} 
                            onChange={(e) => setPassengers(e.target.value)}
                            className="w-full h-12 pl-10 pr-8 rounded-md border border-border-strong bg-surface focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold appearance-none font-body text-ink"
                        >
                            {[1,2,3,4,5,6,7,8,9,10,15,20].map(n => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                    </div>
                </div>

                {/* Submit */}
                <button type="submit" className="w-full lg:w-auto h-12 px-8 bg-gold hover:bg-gold-strong text-ink font-semibold rounded-md shadow-sm hover:shadow-gold transition-all flex-shrink-0">
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
