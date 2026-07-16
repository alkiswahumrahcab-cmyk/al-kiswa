'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Calendar, Users, ChevronDown, Clock, Car, Plus, Minus } from 'lucide-react';

export default function HeroBookingWidget() {
    const router = useRouter();
    
    // Quick state
    const [pickup, setPickup] = useState('Jeddah Airport');
    const [dropoff, setDropoff] = useState('Makkah Hotel');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [passengers, setPassengers] = useState(2);
    const [vehicle, setVehicle] = useState('Any Vehicle');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/booking?from=${encodeURIComponent(pickup)}&to=${encodeURIComponent(dropoff)}&passengers=${passengers}&vehicle=${encodeURIComponent(vehicle)}&date=${date}&time=${encodeURIComponent(time)}`);
    };

    const updatePassengers = (increment: number) => {
        setPassengers(prev => {
            const newVal = prev + increment;
            if (newVal < 1) return 1;
            if (newVal > 19) return 19;
            return newVal;
        });
    };

    return (
        <div className="w-full bg-surface rounded-xl shadow-lg p-6 lg:p-8 border border-border">
            <form onSubmit={handleSearch} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Pickup */}
                    <div className="w-full relative">
                        <label className="block text-[13px] font-semibold text-muted mb-2">From (pickup)</label>
                        <div className="relative">
                            <MapPin size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" />
                            <select 
                                value={pickup} 
                                onChange={(e) => setPickup(e.target.value)}
                                className="w-full h-12 pl-12 pr-4 rounded-md border border-border-strong bg-surface focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold appearance-none font-body text-ink cursor-pointer"
                            >
                                <option value="Jeddah Airport">Jeddah Airport (JED)</option>
                                <option value="Makkah Hotel">Makkah Hotel</option>
                                <option value="Madinah Hotel">Madinah Hotel</option>
                                <option value="Madinah Airport">Madinah Airport (MED)</option>
                                <option value="Jeddah Hotel">Jeddah Hotel</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                        </div>
                    </div>

                    {/* Dropoff */}
                    <div className="w-full relative">
                        <label className="block text-[13px] font-semibold text-muted mb-2">To (dropoff)</label>
                        <div className="relative">
                            <MapPin size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" />
                            <select 
                                value={dropoff} 
                                onChange={(e) => setDropoff(e.target.value)}
                                className="w-full h-12 pl-12 pr-4 rounded-md border border-border-strong bg-surface focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold appearance-none font-body text-ink cursor-pointer"
                            >
                                <option value="Makkah Hotel">Makkah Hotel</option>
                                <option value="Madinah Hotel">Madinah Hotel</option>
                                <option value="Jeddah Airport">Jeddah Airport (JED)</option>
                                <option value="Madinah Airport">Madinah Airport (MED)</option>
                                <option value="Jeddah Hotel">Jeddah Hotel</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Date */}
                    <div className="w-full relative">
                        <label className="block text-[13px] font-semibold text-muted mb-2">Date</label>
                        <div className="relative">
                            <Calendar size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" />
                            <input 
                                type="date" 
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full h-12 pl-12 pr-4 rounded-md border border-border-strong bg-surface focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold font-body text-ink cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Time */}
                    <div className="w-full relative">
                        <label className="block text-[13px] font-semibold text-muted mb-2">Time</label>
                        <div className="relative">
                            <Clock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" />
                            <input 
                                type="time" 
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full h-12 pl-12 pr-4 rounded-md border border-border-strong bg-surface focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold font-body text-ink cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Passengers Stepper */}
                    <div className="w-full relative">
                        <label className="block text-[13px] font-semibold text-muted mb-2">Passengers</label>
                        <div className="flex items-center justify-between w-full h-12 rounded-md border border-border-strong bg-surface px-4">
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

                    {/* Vehicle */}
                    <div className="w-full relative">
                        <label className="block text-[13px] font-semibold text-muted mb-2">Vehicle</label>
                        <div className="relative">
                            <Car size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" />
                            <select 
                                value={vehicle} 
                                onChange={(e) => setVehicle(e.target.value)}
                                className="w-full h-12 pl-12 pr-4 rounded-md border border-border-strong bg-surface focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold appearance-none font-body text-ink cursor-pointer"
                            >
                                <option value="Any Vehicle">Any Vehicle</option>
                                <option value="Toyota Camry">Toyota Camry (4 seats)</option>
                                <option value="Hyundai Staria">Hyundai Staria (7 seats)</option>
                                <option value="GMC Yukon">GMC Yukon (7 seats VIP)</option>
                                <option value="Toyota HiAce">Toyota HiAce (11 seats)</option>
                                <option value="Toyota Coaster">Toyota Coaster (19 seats)</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-2">
                    {/* Submit */}
                    <button type="submit" className="w-full md:w-auto h-12 px-10 bg-gold hover:bg-gold-soft text-ink font-semibold rounded-btn shadow-sm transition-all flex-shrink-0 text-[15px]">
                        Get Prices & Book
                    </button>
                </div>
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
