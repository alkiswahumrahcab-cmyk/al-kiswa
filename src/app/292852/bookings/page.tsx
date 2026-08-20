'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Search, Calendar, LayoutList, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { Toast } from '@/components/ui/Toast';
import { downloadCSV } from '@/lib/export';
import { usePusher } from '@/hooks/usePusher';
import BookingRow from '@/components/admin/bookings/BookingRow';
import BookingDetailsModal from '@/components/admin/bookings/BookingDetailsModal';
import { getUrgencyGroup, UrgencyGroup } from '@/components/admin/bookings/UrgencyBadge';

const BookingCalendar = dynamic(() => import('@/components/admin/bookings/BookingCalendar'), { ssr: false });

interface BookingWithDetails {
    id: string;
    name: string;
    email: string;
    phone: string;
    pickup: string;
    dropoff: string;
    date: string;
    time: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    paymentStatus?: 'paid' | 'unpaid' | 'refunded';
    vehicle?: string;
    vehicleCount?: number;
    passengers?: number;
    luggage?: number;
    notes?: string;
    nationality?: string;
    visaType?: string;
    visaOther?: string;
    price?: string;
    finalPrice?: number;
    originalPrice?: number;
    discountApplied?: number;
    parkingFee?: number;
    airportTerminal?: string;
    flightNumber?: string;
    arrivalDate?: string;
    country?: string;
    legs?: any[];
    selectedVehicles?: { vehicleId?: string; name?: string; quantity: number }[];
    createdAt?: string;
    rating?: number;
    review?: string;
}

const GROUP_CONFIG: { key: UrgencyGroup; label: string; icon: string; headerClass: string }[] = [
    { key: 'URGENT',    label: 'Urgent — Departing Very Soon',  icon: '🔴', headerClass: 'text-red-400 border-red-500/30' },
    { key: 'OVERDUE',   label: 'Overdue — Missed Pickup',       icon: '⏰', headerClass: 'text-red-400 border-red-500/20' },
    { key: 'TODAY',     label: 'Today',                          icon: '⚡', headerClass: 'text-amber-400 border-amber-500/30' },
    { key: 'TOMORROW',  label: 'Tomorrow',                       icon: '📅', headerClass: 'text-blue-400 border-blue-500/20' },
    { key: 'THIS_WEEK', label: 'This Week',                      icon: '📆', headerClass: 'text-green-400 border-green-500/20' },
    { key: 'FUTURE',    label: 'Future Bookings',                icon: '🗓️', headerClass: 'text-muted border-border' },
    { key: 'PAST',      label: 'Past & Completed',               icon: '✅', headerClass: 'text-muted border-border' },
];

function sortWithinGroup(bookings: BookingWithDetails[]): BookingWithDetails[] {
    return [...bookings].sort((a, b) => {
        const da = new Date(`${a.date}T${a.time}`).getTime();
        const db = new Date(`${b.date}T${b.time}`).getTime();
        return da - db;
    });
}

export default function BookingsPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');
    const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set(['PAST']));
    const [calendarBooking, setCalendarBooking] = useState<BookingWithDetails | null>(null);

    useEffect(() => { loadData(); }, []);

    const pusher = usePusher();
    useEffect(() => {
        if (!pusher) return;
        const channel = pusher.subscribe('admin-channel');
        channel.bind('new-booking', (data: any) => {
            if (data.data) {
                const nb = { ...data.data, id: data.data.id, status: data.data.status || 'pending', paymentStatus: data.data.paymentStatus || 'unpaid', createdAt: new Date().toISOString() };
                setBookings(prev => [nb as any, ...prev]);
                showToast(`New booking from ${nb.name}`, 'success');
            }
        });
        channel.bind('booking-updated', (data: any) => {
            setBookings(prev => prev.map(b => b.id === data.id ? { ...b, ...data } : b));
        });
        return () => { channel.unbind_all(); channel.unsubscribe(); };
    }, [pusher]);

    const loadData = async () => {
        try {
            const res = await fetch('/api/bookings');
            const data = await res.json();
            setBookings(data);
        } catch { showToast('Failed to load bookings', 'error'); }
        finally { setIsLoaded(true); }
    };

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleConfirm = async (id: string) => {
        const res = await fetch(`/api/bookings/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'confirmed' }) });
        if (res.ok) { setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'confirmed' } : b)); showToast('Booking confirmed', 'success'); }
        else showToast('Failed to confirm', 'error');
    };

    const handleCancel = async (id: string) => {
        if (!confirm('Cancel this booking?')) return;
        const res = await fetch(`/api/bookings/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'cancelled' }) });
        if (res.ok) { setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b)); showToast('Booking cancelled', 'success'); }
        else showToast('Failed to cancel', 'error');
    };

    const handleExportCSV = () => {
        const exportData = filteredBookings.map(b => ({
            'Booking ID': b.id, 'Date': b.date, 'Time': b.time, 'Name': b.name,
            'Email': b.email, 'Phone': b.phone, 'Pickup': b.pickup, 'Dropoff': b.dropoff,
            'Vehicle': b.selectedVehicles?.map(v => `${v.name} x${v.quantity}`).join('; ') || b.vehicle || '',
            'Passengers': b.passengers || 0, 'Status': b.status,
            'Price': b.finalPrice || b.originalPrice || '', 'Flight': b.flightNumber || '',
        }));
        downloadCSV(exportData, `bookings_${new Date().toISOString().split('T')[0]}`);
    };

    const filteredBookings = bookings.filter(b => {
        const matchesStatus = filter === 'All' || b.status === filter.toLowerCase();
        const matchesSearch = !searchTerm ||
            b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (b.phone && b.phone.includes(searchTerm));
        let matchesDate = true;
        if (startDate && b.date) matchesDate = matchesDate && new Date(b.date) >= new Date(startDate);
        if (endDate && b.date) matchesDate = matchesDate && new Date(b.date) <= new Date(endDate);
        return matchesStatus && matchesSearch && matchesDate;
    });

    // Group bookings
    const grouped = filteredBookings.reduce<Record<UrgencyGroup, BookingWithDetails[]>>((acc, b) => {
        const g = getUrgencyGroup(b.date, b.time, b.status);
        if (!acc[g]) acc[g] = [];
        acc[g].push(b);
        return acc;
    }, {} as any);

    const toggleGroup = (key: string) => {
        setCollapsedGroups(prev => {
            const next = new Set(prev);
            if (next.has(key)) next.delete(key); else next.add(key);
            return next;
        });
    };

    const calendarEvents = bookings.map(b => {
        try {
            const start = new Date(`${b.date}T${b.time || '00:00'}`);
            const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
            return { id: b.id, title: `${b.name}`, start, end, resource: b };
        } catch { return null; }
    }).filter(Boolean) as any[];

    const totalFiltered = filteredBookings.length;
    const pendingCount = bookings.filter(b => b.status === 'pending').length;
    const urgentCount = bookings.filter(b => getUrgencyGroup(b.date, b.time, b.status) === 'URGENT').length;

    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold" />
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
            {toast && <Toast message={toast.message} type={toast.type} isVisible onClose={() => setToast(null)} />}

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-ink tracking-tight">Bookings</h1>
                    <p className="text-muted mt-1 text-sm">
                        {totalFiltered} bookings
                        {pendingCount > 0 && <span className="ml-2 text-amber-400 font-semibold">· {pendingCount} pending</span>}
                        {urgentCount > 0 && <span className="ml-2 text-red-400 font-bold animate-pulse">· {urgentCount} URGENT</span>}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex bg-surface-sunken p-1 rounded-lg">
                        <button onClick={() => setViewMode('list')} className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'list' ? 'bg-surface text-ink shadow-sm' : 'text-muted hover:text-ink'}`}>
                            <LayoutList size={16} /> List
                        </button>
                        <button onClick={() => setViewMode('calendar')} className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'calendar' ? 'bg-surface text-ink shadow-sm' : 'text-muted hover:text-ink'}`}>
                            <Calendar size={16} /> Calendar
                        </button>
                    </div>
                    <button onClick={handleExportCSV} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gold text-black font-bold text-sm hover:bg-gold/80 transition-colors">
                        <Download size={14} /> CSV
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name, email, phone or ID..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-surface text-ink focus:ring-2 focus:ring-gold/20 outline-none text-sm"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <input type="date" className="px-3 py-2 rounded-xl border border-border bg-surface text-sm outline-none text-ink" value={startDate} onChange={e => setStartDate(e.target.value)} title="From date" />
                        <span className="self-center text-muted">—</span>
                        <input type="date" className="px-3 py-2 rounded-xl border border-border bg-surface text-sm outline-none text-ink" value={endDate} onChange={e => setEndDate(e.target.value)} title="To date" />
                    </div>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1">
                    {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map(s => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === s ? 'bg-gold text-black' : 'bg-surface border border-border text-muted hover:bg-surface-alt'}`}
                        >
                            {s}
                            {s === 'Pending' && pendingCount > 0 && <span className="ml-1.5 bg-amber-400 text-black rounded-full px-1.5 py-0.5 text-[10px] font-black">{pendingCount}</span>}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            {viewMode === 'list' ? (
                <div className="space-y-8">
                    {filteredBookings.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-muted">
                            <Calendar size={48} className="mb-4 opacity-20" />
                            <p className="text-lg font-medium">No bookings found</p>
                            <p className="text-sm mt-1">Try adjusting your search or filters</p>
                        </div>
                    ) : (
                        GROUP_CONFIG.map(({ key, label, icon, headerClass }) => {
                            const items = grouped[key];
                            if (!items || items.length === 0) return null;
                            const sorted = sortWithinGroup(items);
                            const isCollapsed = collapsedGroups.has(key);

                            return (
                                <div key={key}>
                                    {/* Group Header */}
                                    <button
                                        onClick={() => toggleGroup(key)}
                                        className={`w-full flex items-center gap-3 mb-3 group`}
                                    >
                                        <span className="text-base">{icon}</span>
                                        <h2 className={`text-xs font-bold uppercase tracking-widest ${headerClass.split(' ')[0]}`}>{label}</h2>
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${headerClass}`}>{items.length}</span>
                                        <div className={`flex-1 h-px ${key === 'URGENT' || key === 'OVERDUE' ? 'bg-red-500/20' : 'bg-border'}`} />
                                        {isCollapsed ? <ChevronDown size={14} className="text-muted shrink-0" /> : <ChevronUp size={14} className="text-muted shrink-0" />}
                                    </button>

                                    {/* Group Rows */}
                                    <AnimatePresence>
                                        {!isCollapsed && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="space-y-2 overflow-hidden"
                                            >
                                                {sorted.map(booking => (
                                                    <BookingRow
                                                        key={booking.id}
                                                        booking={booking}
                                                        onConfirm={handleConfirm}
                                                        onCancel={handleCancel}
                                                    />
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })
                    )}
                </div>
            ) : (
                <div className="p-4">
                    <BookingCalendar
                        events={calendarEvents}
                        onSelectEvent={event => setCalendarBooking(event.resource)}
                    />
                </div>
            )}

            {/* Calendar preview modal (light) */}
            <BookingDetailsModal
                booking={calendarBooking as any}
                isOpen={!!calendarBooking}
                onClose={() => setCalendarBooking(null)}
                onStatusUpdate={(id, status) => {
                    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
                    setCalendarBooking(null);
                }}
                onUpdate={(id, updates) => {
                    setBookings(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
                    if (calendarBooking && calendarBooking.id === id) setCalendarBooking(prev => prev ? { ...prev, ...(updates as any) } : null);
                }}
            />
        </div>
    );
}