'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { 
    Search, MapPin, Clock, ArrowRight, CheckCircle2, ChevronDown, ChevronUp, 
    X, ShieldCheck, Banknote, CreditCard, Filter, ArrowUp, Users, Luggage
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
type RouteWithPrices = any; // Assuming passed from Server
type Vehicle = any;

interface Props {
    routes: RouteWithPrices[];
    vehicles: Vehicle[];
    exchangeRate: number;
}

// Utility formatting
function formatSAR(amount: number) {
    return amount.toLocaleString('en-SA', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function formatUSD(amount: number, rate: number) {
    return Math.round(amount / rate).toLocaleString('en-US');
}

// Vehicle Display Config (Shared logic from LivePricingTable)
const VEHICLE_DISPLAY: Record<string, { label: string; pax: string; bags: string; badge?: string }> = {
    camry:  { label: 'Sedan', pax: '3 Pax', bags: '2 Bags' },
    staria: { label: 'Family Van', pax: '7 Pax', bags: '5 Bags' },
    starex: { label: 'Family Van', pax: '7 Pax', bags: '5 Bags' },
    gmc:    { label: 'VIP SUV', pax: '7 Pax', bags: '5 Bags', badge: 'VIP' },
    yukon:  { label: 'VIP SUV', pax: '7 Pax', bags: '5 Bags', badge: 'VIP' },
    hiace:  { label: 'Group Bus', pax: '10 Pax', bags: '10 Bags' },
};

function getVehicleDisplay(vehicleName: string) {
    const n = vehicleName.toLowerCase();
    for (const [key, val] of Object.entries(VEHICLE_DISPLAY)) {
        if (n.includes(key)) return val;
    }
    return { label: vehicleName, pax: '—', bags: '—' };
}

const ROUTE_FEATURES: Record<string, string[]> = {
    'Jeddah': ['Meet & Greet', 'Flight Tracking', 'Free Waiting'],
    'Madinah': ['Door-to-Door', 'Prayer Stop', 'Comfort Break'],
    'Ziyarat': ['Private Guide', 'Photo Stops', 'Hotel Pickup'],
};

function getFeatures(origin: string, destination: string) {
    const combined = `${origin} ${destination}`;
    for (const [key, feats] of Object.entries(ROUTE_FEATURES)) {
        if (combined.includes(key)) return feats;
    }
    return ['Door-to-Door', 'Fixed Price', '24/7 Support'];
}

// Filter Categories
const CATEGORIES = [
    "All Routes",
    "Airport Transfers",
    "Makkah",
    "Madinah",
    "Jeddah",
    "Ziyarat",
    "VIP",
    "Popular"
];

function categoryMatches(route: any, category: string) {
    if (category === "All Routes") return true;
    const lowerOrigin = route.origin?.toLowerCase() || "";
    const lowerDest = route.destination?.toLowerCase() || "";
    const combined = `${lowerOrigin} ${lowerDest}`;

    switch (category) {
        case "Airport Transfers": return combined.includes("airport");
        case "Makkah": return combined.includes("makkah");
        case "Madinah": return combined.includes("madinah");
        case "Jeddah": return combined.includes("jeddah");
        case "Ziyarat": return combined.includes("ziyarat") || combined.includes("tour");
        case "VIP": return true; // Could filter based on VIP vehicle presence if needed, here we just show all
        case "Popular": return combined.includes("jeddah") && combined.includes("makkah");
        default: return true;
    }
}

export default function PricingClientUX({ routes, vehicles, exchangeRate }: Props) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All Routes");
    const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
    const [compareDrawerRoute, setCompareDrawerRoute] = useState<RouteWithPrices | null>(null);

    // Mobile sticky visibility logic
    const [showBackToTop, setShowBackToTop] = useState(false);
    useEffect(() => {
        const handleScroll = () => setShowBackToTop(window.scrollY > 500);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const toggleExpand = (id: string) => {
        setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
    };

    // Filter Logic
    const filteredRoutes = useMemo(() => {
        return routes.filter(route => {
            const matchesSearch = 
                route.origin?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                route.destination?.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesCategory = categoryMatches(route, activeCategory);
            
            return matchesSearch && matchesCategory;
        });
    }, [routes, searchQuery, activeCategory]);

    const TrustIndicators = () => (
        <div className="flex flex-col gap-3 glass-panel p-5 mt-6">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2">Why Book Direct?</h4>
            <div className="flex items-center gap-3 text-sm text-white/80">
                <CheckCircle2 size={16} className="text-gold shrink-0" />
                <span>Ministry Licensed</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/80">
                <CheckCircle2 size={16} className="text-gold shrink-0" />
                <span>Fixed Pricing</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/80">
                <CheckCircle2 size={16} className="text-gold shrink-0" />
                <span>No Hidden Fees</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/80">
                <CheckCircle2 size={16} className="text-gold shrink-0" />
                <span>Direct Operator</span>
            </div>
        </div>
    );

    return (
        <div className="relative">
            {/* Desktop Two-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative pb-24 md:pb-0">
                
                {/* ── LEFT SIDEBAR (Sticky on Desktop) ── */}
                <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
                    
                    {/* PHASE 3: Premium Search */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="text-gold/60 group-focus-within:text-gold transition-colors" size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search routes, cities, airports..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-4 glass-input text-lg bg-black/40 border-gold/20 focus:border-gold rounded-xl transition-all shadow-[0_0_15px_hsl(var(--gold-glow) / 0.05)]"
                        />
                        {searchQuery && (
                            <button 
                                onClick={() => setSearchQuery("")}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/60 hover:text-white"
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>

                    {/* PHASE 4: Filter Chips */}
                    <div className="glass-panel p-5">
                        <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Filter size={16} className="text-gold" /> Filter Categories
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                        activeCategory === cat 
                                        ? "bg-gradient-to-r from-gold to-gold-dark text-black shadow-[0_0_15px_hsl(var(--gold-glow) / 0.3)] font-bold" 
                                        : "glass-button py-2 border-white/10 text-white/80 hover:text-white"
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* PHASE 14: Trust Enhancements */}
                    <div className="hidden lg:block">
                        <TrustIndicators />
                    </div>
                </div>

                {/* ── RIGHT COLUMN (Pricing Cards) ── */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="flex justify-between items-center text-white/60 text-sm border-b border-white/10 pb-2 mb-4">
                        <span>Showing {filteredRoutes.length} routes</span>
                        <span>Prices include all taxes</span>
                    </div>

                    <AnimatePresence mode="popLayout">
                        {filteredRoutes.length === 0 ? (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="glass-panel p-12 text-center"
                            >
                                <div className="text-gold/50 mb-4 flex justify-center"><Search size={48} /></div>
                                <h3 className="text-2xl font-bold text-white mb-2">No Routes Found</h3>
                                <p className="text-white/60 mb-6">Try adjusting your search or filters.</p>
                                <button onClick={() => { setSearchQuery(""); setActiveCategory("All Routes"); }} className="btn-gold">
                                    Clear All Filters
                                </button>
                            </motion.div>
                        ) : (
                            filteredRoutes.map((route, idx) => {
                                const features = getFeatures(route.origin, route.destination);
                                
                                const priceRows = (route.prices || [])
                                    .map((p: any) => {
                                        const vehicle = vehicles.find(v => v.id === p.vehicleId || v._id?.toString() === p.vehicleId || String(v.id) === String(p.vehicleId));
                                        if (!vehicle || p.price <= 0) return null;
                                        const display = getVehicleDisplay(vehicle.name);
                                        return { ...display, priceSAR: p.price, vehicleName: vehicle.name };
                                    })
                                    .filter(Boolean)
                                    .sort((a: any, b: any) => a!.priceSAR - b!.priceSAR);

                                const lowestPrice = priceRows[0]?.priceSAR ?? 0;
                                const isExpanded = expandedCards[route.id] || false;
                                const isPopular = idx === 0 && activeCategory === "All Routes" && !searchQuery;

                                return (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                        key={route.id}
                                        className={`glass-panel border ${isPopular ? 'border-gold/40' : 'border-white/10'} overflow-hidden group`}
                                    >
                                        {/* PHASE 5: Compact Route Header */}
                                        <div className="p-5 md:p-6 flex flex-col md:flex-row justify-between gap-4 md:items-center relative">
                                            {isPopular && (
                                                <div className="absolute top-0 right-0 bg-gold text-black text-[10px] font-bold uppercase px-3 py-1 rounded-bl-lg z-10">
                                                    Popular
                                                </div>
                                            )}
                                            
                                            <div className="flex-1">
                                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                                                    {route.origin} <ArrowRight size={18} className="text-gold" /> {route.destination}
                                                </h3>
                                                <div className="flex flex-wrap gap-3 text-xs md:text-sm text-white/60">
                                                    {route.distance && (
                                                        <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md">
                                                            <MapPin size={14} className="text-gold" /> {route.distance} km
                                                        </span>
                                                    )}
                                                    {route.duration && (
                                                        <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md">
                                                            <Clock size={14} className="text-gold" /> {route.duration}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
                                                <div className="text-left md:text-right">
                                                    <p className="text-[10px] md:text-xs text-white/50 uppercase tracking-wider mb-0.5">From</p>
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="text-2xl md:text-3xl font-black text-gold">{formatSAR(lowestPrice)}</span>
                                                        <span className="text-sm font-bold text-white/60">SAR</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex gap-2 mt-0 md:mt-3">
                                                    {/* Mobile Only: Compare Button triggers drawer */}
                                                    <button 
                                                        onClick={() => setCompareDrawerRoute(route)}
                                                        className="md:hidden glass-button py-2 px-4 text-xs flex items-center gap-1 border-white/20"
                                                    >
                                                        Compare
                                                    </button>
                                                    
                                                    <Link href={`/booking?route=${route.id}`} className="btn-gold py-2 px-6 text-sm">
                                                        Book
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Desktop Expansion Toggle (Optional on mobile since they have Compare drawer) */}
                                        <button 
                                            onClick={() => toggleExpand(route.id)}
                                            className="w-full py-2 bg-white/5 hover:bg-white/10 border-t border-white/10 flex items-center justify-center gap-2 text-xs font-semibold text-white/80 uppercase tracking-wider transition-colors focus:outline-none"
                                        >
                                            {isExpanded ? (
                                                <><ChevronUp size={16} /> Hide Details</>
                                            ) : (
                                                <><ChevronDown size={16} /> Show Vehicles & Details</>
                                            )}
                                        </button>

                                        {/* Expanded Details */}
                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden bg-black/30 border-t border-white/5"
                                                >
                                                    <div className="p-5 md:p-6 grid md:grid-cols-2 gap-6">
                                                        {/* Vehicle List */}
                                                        <div>
                                                            <h5 className="text-xs text-white/50 uppercase font-bold mb-3">Vehicle Classes</h5>
                                                            <div className="space-y-2">
                                                                {priceRows.map((row: any, i: number) => row && (
                                                                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:border-gold/30 transition-colors">
                                                                        <div>
                                                                            <span className="text-white font-medium text-sm block">{row.label}</span>
                                                                            <span className="text-white/50 text-[10px]">{row.pax} • {row.bags}</span>
                                                                        </div>
                                                                        <div className="text-right">
                                                                            <span className="text-white font-bold">{formatSAR(row.priceSAR)}</span>
                                                                            <span className="text-gold text-xs ml-1">SAR</span>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Included Services (Icon Chips) */}
                                                        <div>
                                                            <h5 className="text-xs text-white/50 uppercase font-bold mb-3">Included Services</h5>
                                                            <div className="flex flex-wrap gap-2">
                                                                {features.map((f, i) => (
                                                                    <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold-light text-xs font-medium">
                                                                        <CheckCircle2 size={12} className="text-gold" /> {f}
                                                                    </div>
                                                                ))}
                                                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold-light text-xs font-medium">
                                                                    <CheckCircle2 size={12} className="text-gold" /> Taxes & Tolls Included
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* PHASE 8: Sticky Mobile Toolbar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-black/80 backdrop-blur-xl border-t border-white/10 flex items-center justify-between gap-3 safe-area-bottom">
                <button 
                    onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); document.querySelector('input')?.focus(); }}
                    className="flex-1 glass-button py-3 px-2 flex items-center justify-center gap-2 border-white/10 text-sm"
                >
                    <Search size={16} className="text-gold" /> Search
                </button>
                <Link href="/booking" className="flex-[2] btn-gold py-3 px-2 flex justify-center text-sm shadow-lg">
                    Book Now
                </Link>
                {showBackToTop && (
                    <button onClick={scrollToTop} className="w-12 h-12 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center text-white backdrop-blur-md">
                        <ArrowUp size={20} />
                    </button>
                )}
            </div>

            {/* PHASE 7: Vehicle Comparison Drawer (Mobile Bottom Sheet) */}
            <AnimatePresence>
                {compareDrawerRoute && (
                    <React.Fragment>
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setCompareDrawerRoute(null)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden"
                        />
                        <motion.div 
                            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                            className="fixed bottom-0 left-0 right-0 bg-[#0f1115] border-t border-white/20 rounded-t-3xl z-50 p-6 pb-12 lg:hidden max-h-[85vh] overflow-y-auto"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-white leading-tight">Compare Vehicles</h3>
                                    <p className="text-sm text-gold font-medium">{compareDrawerRoute.origin} → {compareDrawerRoute.destination}</p>
                                </div>
                                <button onClick={() => setCompareDrawerRoute(null)} className="p-2 bg-white/10 rounded-full text-white">
                                    <X size={20} />
                                </button>
                            </div>
                            
                            <div className="space-y-3">
                                {compareDrawerRoute.prices?.map((p: any) => {
                                    const vehicle = vehicles.find(v => v.id === p.vehicleId || v._id?.toString() === p.vehicleId || String(v.id) === String(p.vehicleId));
                                    if (!vehicle || p.price <= 0) return null;
                                    const display = getVehicleDisplay(vehicle.name);
                                    
                                    return (
                                        <div key={p.vehicleId} className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10">
                                            <div>
                                                <div className="font-bold text-white text-lg flex items-center gap-2">
                                                    {display.label}
                                                    {display.badge && <span className="bg-gold text-black text-[9px] px-1.5 py-0.5 rounded-full uppercase tracking-wider">{display.badge}</span>}
                                                </div>
                                                <div className="text-xs text-white/60 mt-1 flex gap-2">
                                                    <span className="flex items-center gap-1"><Users size={12} className="text-white/50" /> {display.pax}</span>
                                                    <span className="flex items-center gap-1"><Luggage size={12} className="text-white/50" /> {display.bags}</span>
                                                </div>
                                            </div>
                                            <div className="text-right flex flex-col items-end">
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-xl font-black text-gold">{formatSAR(p.price)}</span>
                                                    <span className="text-xs font-bold text-white/60">SAR</span>
                                                </div>
                                                <Link 
                                                    href={`/booking?route=${compareDrawerRoute.id}&vehicle=${p.vehicleId}`}
                                                    className="mt-2 text-[10px] font-bold uppercase tracking-wider text-black bg-gold px-4 py-1.5 rounded-full"
                                                >
                                                    Select
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                }).sort((a: any, b: any) => {
                                    // Hacky sort by extracting SAR value from JSX
                                    const aPrice = a?.props?.children[1]?.props?.children[0]?.props?.children[0]?.props?.children;
                                    const bPrice = b?.props?.children[1]?.props?.children[0]?.props?.children[0]?.props?.children;
                                    return (Number(String(aPrice).replace(/,/g,'')) || 0) - (Number(String(bPrice).replace(/,/g,'')) || 0);
                                })}
                            </div>
                        </motion.div>
                    </React.Fragment>
                )}
            </AnimatePresence>

        </div>
    );
}
