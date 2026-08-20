'use client';

import React, { useState } from 'react';
import { Search, MapPin, Calendar, User, Phone, CheckCircle, Clock, XCircle, AlertCircle, ArrowRight, Car } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TrackBookingPage() {
    const [formData, setFormData] = useState({ reference: '', email: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [booking, setBooking] = useState<any>(null);

    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchBookingDetails = async (isBackground = false) => {
        if (!isBackground) {
            setLoading(true);
            setBooking(null);
        } else {
            setIsRefreshing(true);
        }
        setError('');

        try {
            const res = await fetch('/api/bookings/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (data.success) {
                setBooking(data.booking);
            } else {
                if (!isBackground) setError(data.message || 'Booking not found');
            }
        } catch (err) {
            if (!isBackground) setError('Failed to track booking. Please try again.');
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetchBookingDetails(false);
    };

    // Real-time updates
    React.useEffect(() => {
        if (!booking || !booking.id) return;

        const initPusher = async () => {
            const Pusher = (await import('pusher-js')).default;

            const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
                cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
            });

            const channel = pusher.subscribe(`booking-channel-${booking.id}`);
            channel.bind('status-updated', (data: any) => {
                console.log('Status update received:', data);
                fetchBookingDetails(true);
            });

            return () => {
                pusher.unsubscribe(`booking-channel-${booking.id}`);
                pusher.disconnect();
            };
        };

        const cleanupPromise = initPusher();

        return () => {
            cleanupPromise.then(cleanup => cleanup && cleanup());
        };
    }, [booking?.id]);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed': return 'text-success bg-success-soft border-success/20';
            case 'confirmed': return 'text-info bg-info/10 border-info/20';
            case 'pending': return 'text-gold-strong bg-gold-soft border-gold/30';
            case 'cancelled': return 'text-error bg-error-soft border-error/20';
            default: return 'text-muted bg-surface-sunken border-border';
        }
    };

    return (
        <div className="min-h-screen bg-bg flex flex-col">
            <main className="flex-1 container mx-auto px-4 py-32 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-xl w-full"
                >
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-bold font-display text-ink mb-4">Track Your Booking</h1>
                        <p className="text-muted text-lg">Enter your booking reference and email to see real-time updates.</p>
                    </div>

                    <div className="bg-surface rounded-3xl p-8 shadow-sm border border-border relative overflow-hidden">
                        {/* Decorative BG */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2 ml-1">Booking Reference</label>
                                <input
                                    type="text"
                                    placeholder="e.g. AKT-260820-K7M2"
                                    className="w-full bg-surface-sunken rounded-xl px-4 py-4 text-ink outline-none border border-border focus:border-gold transition-all"
                                    value={formData.reference}
                                    onChange={e => setFormData({ ...formData, reference: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    className="w-full bg-surface-sunken rounded-xl px-4 py-4 text-ink outline-none border border-border focus:border-gold transition-all"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gold hover:bg-gold-strong text-ink font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_hsl(var(--gold-glow)/0.2)] flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <span className="w-5 h-5 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                                ) : (
                                    <>Check Status <ArrowRight size={20} /></>
                                )}
                            </button>
                        </form>

                        <AnimatePresence mode='wait'>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-6 p-4 bg-error-soft border border-error/20 rounded-xl flex items-center gap-3 text-error"
                                >
                                    <AlertCircle size={20} className="shrink-0" />
                                    <p className="text-sm font-medium">{error}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <AnimatePresence>
                        {booking && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                className="mt-8 bg-surface rounded-3xl shadow-sm border border-border overflow-hidden"
                            >
                                {/* Results Header */}
                                <div className="p-6 border-b border-border flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold text-ink mb-1">Booking Found</h3>
                                        <p className="text-xs text-muted font-mono">Ref: {booking.bookingRef || booking.id}</p>
                                    </div>
                                    <div className={`px-4 py-1.5 rounded-full text-sm font-bold border ${getStatusColor(booking.status)} capitalize flex items-center gap-2`}>
                                        {booking.status === 'completed' && <CheckCircle size={14} />}
                                        {booking.status === 'confirmed' && <CheckCircle size={14} />}
                                        {booking.status === 'pending' && <Clock size={14} />}
                                        {booking.status === 'cancelled' && <XCircle size={14} />}
                                        {booking.status}
                                    </div>
                                </div>

                                <div className="p-8 space-y-8">
                                    {/* Route */}
                                    <div className="flex items-start gap-4">
                                        <div className="flex flex-col items-center pt-2">
                                            <div className="w-3 h-3 rounded-full bg-gold" />
                                            <div className="w-0.5 h-12 bg-border my-1" />
                                            <div className="w-3 h-3 rounded-full bg-ink" />
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <p className="text-xs font-bold text-muted uppercase tracking-wider mb-1">Pickup</p>
                                                <p className="font-bold text-ink">{booking.pickup}</p>
                                                <div className="flex items-center gap-4 mt-1 text-sm text-muted">
                                                    <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(booking.date).toLocaleDateString()}</span>
                                                    <span className="flex items-center gap-1"><Clock size={14} /> {booking.time}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-muted uppercase tracking-wider mb-1">Destination</p>
                                                <p className="font-bold text-ink">{booking.dropoff}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Vehicle Info */}
                                    <div className="bg-surface-alt rounded-xl p-4 flex items-center gap-4 border border-border">
                                        <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center shadow-sm text-muted border border-border">
                                            <Car size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-muted uppercase tracking-wider mb-0.5">Vehicle Type</p>
                                            <p className="font-bold text-ink">{booking.vehicle}</p>
                                            <p className="text-xs text-muted">{booking.passengers} Passengers · {booking.luggage || 0} Luggage</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </main>
        </div>
    );
}
