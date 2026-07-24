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
            <motion.div variants={item} className="relative group bg-surface border border-border p-6 rounded-xl hover:shadow-md transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-soft rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none transition-colors" />
                <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                        <p className="text-xs font-bold text-muted uppercase tracking-wider mb-1">Total Revenue</p>
                        <h3 className="text-3xl font-bold text-ink tracking-tight">
                            <span className="text-lg text-gold-strong font-normal mr-1">SAR</span>
                            {totalRevenue.toLocaleString()}
                        </h3>
                    </div>
                    <div className="p-3 bg-gold-soft rounded-xl text-gold-strong transition-colors">
                        <TrendingUp size={24} />
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-success bg-success-soft w-fit px-2 py-1 rounded-full border border-success/20">
                    <Activity size={12} />
                    <span>+12.5% vs last month</span>
                </div>
            </motion.div>

            {/* Bookings Card */}
            <motion.div variants={item} className="relative group bg-surface border border-border p-6 rounded-xl hover:shadow-md transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none transition-colors" />
                <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                        <p className="text-xs font-bold text-muted uppercase tracking-wider mb-1">Total Bookings</p>
                        <h3 className="text-3xl font-bold text-ink tracking-tight">{totalBookings}</h3>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-xl text-blue-600 transition-colors">
                        <Calendar size={24} />
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-muted">
                    <span className="text-ink">{confirmedBookings} Confirmed</span>
                    <span className="w-1 h-1 rounded-full bg-border-strong" />
                    <span className="text-warning">{pendingBookings} Pending</span>
                </div>
            </motion.div>

            {/* Fleet Card */}
            <motion.div variants={item} className="relative group bg-surface border border-border p-6 rounded-xl hover:shadow-md transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none transition-colors" />
                <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                        <p className="text-xs font-bold text-muted uppercase tracking-wider mb-1">Active Fleet</p>
                        <h3 className="text-3xl font-bold text-ink tracking-tight">{activeFleet} <span className="text-lg text-muted font-normal">/ {totalFleet}</span></h3>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-xl text-purple-600 transition-colors">
                        <Car size={24} />
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-purple-600 bg-purple-50 w-fit px-2 py-1 rounded-full border border-purple-200">
                    <Activity size={12} />
                    <span>High Availability</span>
                </div>
            </motion.div>

            {/* Routes Card */}
            <motion.div variants={item} className="relative group bg-surface border border-border p-6 rounded-xl hover:shadow-md transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none transition-colors" />
                <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                        <p className="text-xs font-bold text-muted uppercase tracking-wider mb-1">Active Routes</p>
                        <h3 className="text-3xl font-bold text-ink tracking-tight">{routesCount}</h3>
                    </div>
                    <div className="p-3 bg-rose-50 rounded-xl text-rose-600 transition-colors">
                        <MapPin size={24} />
                    </div>
                </div>
                <div className="text-xs text-muted">
                    Covering key locations across KSA
                </div>
            </motion.div>
        </motion.div>
    );
}
