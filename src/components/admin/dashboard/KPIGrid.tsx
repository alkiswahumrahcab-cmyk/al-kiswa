import { motion } from 'framer-motion';
import { Activity, Calendar, Car, MapPin, TrendingUp } from 'lucide-react';

interface KPIGridProps {
    totalRevenue: number;
    totalBookings: number;
    confirmedBookings: number;
    pendingBookings: number;
    activeFleet: number;
    totalFleet: number;
    routesCount: number;
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function KPIGrid({
    totalRevenue,
    totalBookings,
    confirmedBookings,
    pendingBookings,
    activeFleet,
    totalFleet,
    routesCount
}: KPIGridProps) {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
            {/* Revenue Card */}
            <motion.div variants={item} className="relative group bg-primary-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:border-gold-primary/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.1)] overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-gold-primary/10 transition-colors" />
                <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Revenue</p>
                        <h3 className="text-3xl font-bold text-white tracking-tight">
                            <span className="text-lg text-gold-primary font-normal mr-1">SAR</span>
                            {totalRevenue.toLocaleString()}
                        </h3>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl text-gold-primary border border-white/10 group-hover:bg-gold-primary/10 transition-colors">
                        <TrendingUp size={24} />
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-500/10 w-fit px-2 py-1 rounded-full border border-emerald-500/20">
                    <Activity size={12} />
                    <span>+12.5% vs last month</span>
                </div>
            </motion.div>

            {/* Bookings Card */}
            <motion.div variants={item} className="relative group bg-primary-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-blue-500/10 transition-colors" />
                <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Bookings</p>
                        <h3 className="text-3xl font-bold text-white tracking-tight">{totalBookings}</h3>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl text-blue-400 border border-white/10 group-hover:bg-blue-500/10 transition-colors">
                        <Calendar size={24} />
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                    <span className="text-white">{confirmedBookings} Confirmed</span>
                    <span className="w-1 h-1 rounded-full bg-gray-600" />
                    <span className="text-amber-400">{pendingBookings} Pending</span>
                </div>
            </motion.div>

            {/* Fleet Card */}
            <motion.div variants={item} className="relative group bg-primary-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-purple-500/10 transition-colors" />
                <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Active Fleet</p>
                        <h3 className="text-3xl font-bold text-white tracking-tight">{activeFleet} <span className="text-lg text-gray-500 font-normal">/ {totalFleet}</span></h3>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl text-purple-400 border border-white/10 group-hover:bg-purple-500/10 transition-colors">
                        <Car size={24} />
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-purple-400 bg-purple-500/10 w-fit px-2 py-1 rounded-full border border-purple-500/20">
                    <Activity size={12} />
                    <span>High Availability</span>
                </div>
            </motion.div>

            {/* Routes Card */}
            <motion.div variants={item} className="relative group bg-primary-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:border-rose-500/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(244,63,94,0.1)] overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-rose-500/10 transition-colors" />
                <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Active Routes</p>
                        <h3 className="text-3xl font-bold text-white tracking-tight">{routesCount}</h3>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl text-rose-400 border border-white/10 group-hover:bg-rose-500/10 transition-colors">
                        <MapPin size={24} />
                    </div>
                </div>
                <div className="text-xs text-gray-500">
                    Covering key locations across KSA
                </div>
            </motion.div>
        </motion.div>
    );
}
