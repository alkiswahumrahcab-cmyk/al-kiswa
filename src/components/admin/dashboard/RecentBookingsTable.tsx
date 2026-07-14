import { motion } from 'framer-motion';
import { Check, Clock, MapPin, X, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

// Helper icon component for arrows
function ArrowUpRightIcon({ size = 24 }: { size?: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
    );
}

interface RecentBookingsTableProps {
    bookings: any[];
    onStatusChange: (id: string, status: string) => void;
}

export default function RecentBookingsTable({ bookings, onStatusChange }: RecentBookingsTableProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white backdrop-blur-xl border border-slate-200 rounded-2xl overflow-hidden shadow-sm shadow-slate-200/50"
        >
            <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Clock size={20} className="text-blue-500" />
                    Recent Bookings
                </h3>
                <Link href="/admin/bookings" className="text-sm font-semibold text-gold hover:text-[#f3e5ab] transition-colors flex items-center gap-1">
                    View All <ArrowUpRightIcon size={14} />
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200">
                            <th className="p-4 font-semibold">Customer</th>
                            <th className="p-4 font-semibold">Route</th>
                            <th className="p-4 font-semibold">Date & Time</th>
                            <th className="p-4 font-semibold">Status</th>
                            <th className="p-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {bookings.map((booking) => (
                            <tr key={booking.id} className="group hover:bg-slate-50 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                                            {booking.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900 text-sm">{booking.name}</div>
                                            <div className="text-xs text-slate-500">{booking.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-col gap-1">
                                        <div className="text-sm text-slate-700 flex items-center gap-1">
                                            <MapPin size={10} className="text-emerald-500" /> {booking.pickup}
                                        </div>
                                        <div className="text-sm text-slate-700 flex items-center gap-1">
                                            <MapPin size={10} className="text-rose-500" /> {booking.dropoff}
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="text-sm text-slate-700 font-mono">
                                        {new Date(booking.date).toLocaleDateString()}
                                    </div>
                                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                        <Clock size={10} /> {booking.time}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`
                                        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                                        ${booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-600 border border-emerald-200' :
                                            booking.status === 'cancelled' ? 'bg-red-100 text-red-600 border border-red-200' :
                                                'bg-amber-100 text-amber-600 border border-amber-200'}
                                    `}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${booking.status === 'confirmed' ? 'bg-emerald-500' :
                                            booking.status === 'cancelled' ? 'bg-red-500' :
                                                'bg-amber-500'
                                            }`} />
                                        {booking.status || 'Pending'}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    {booking.status === 'pending' && (
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => onStatusChange(booking.id, 'confirmed')}
                                                className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 transition-all"
                                                title="Confirm"
                                            >
                                                <Check size={16} />
                                            </button>
                                            <button
                                                onClick={() => onStatusChange(booking.id, 'cancelled')}
                                                className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-all"
                                                title="Cancel"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {bookings.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-slate-500">
                                    No recent bookings found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}
