'use client';

import React, { useEffect, useState } from 'react';
import FleetCarousel from './FleetCarousel';
import { Vehicle as FleetVehicle } from './FleetCarousel';

export default function FleetCarouselWrapper() {
    const [data, setData] = useState<{ vehicles: FleetVehicle[], discount: any } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/fleet/public');
                if (res.ok) {
                    const json = await res.json();
                    setData(json);
                }
            } catch (error) {
                console.error('Failed to load fleet data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="h-[600px] bg-zinc-900/50 animate-pulse rounded-3xl mx-4 md:mx-8 border border-white/5" />;
    }

    if (!data || data.vehicles.length === 0) return null;

    return <FleetCarousel vehicles={data.vehicles} discount={data.discount} />;
}
