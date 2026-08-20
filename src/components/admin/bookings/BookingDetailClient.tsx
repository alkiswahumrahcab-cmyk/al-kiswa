'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, XCircle, CheckCircle2, MessageCircle, Copy, Printer, ChevronLeft, MapPin, Calendar, Clock, Car, Users, Briefcase, Plane, CreditCard, FileText, Star } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import UrgencyBadge from './UrgencyBadge';
import { format } from 'date-fns';

interface Leg {
    pickup?: string;
    dropoff?: string;
    date?: string;
    time?: string;
    flightNumber?: string;
    hours?: number;
    price?: number;
    routeVariant?: string;
}

interface SelectedVehicle {
    name?: string;
    quantity: number;
    vehicleId?: string;
}

interface BookingDetail {
    id: string;
    name: string;
    email: string;
    phone: string;
    pickup: string;
    dropoff: string;
    date: string;
    time: string;
    status: string;
    paymentStatus?: string;
    vehicle?: string;
    vehicleCount?: number;
    passengers?: number;
    luggage?: number;
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
    notes?: string;
    legs?: Leg[];
    selectedVehicles?: SelectedVehicle[];
    createdAt?: string;
    rating?: number;
    review?: string;
}

function getStatusBadge(status: string) {
    switch (status) {
        case 'confirmed': return 'bg-green-500/15 text-green-400 border-green-500/30';
        case 'pending':   return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
        case 'completed': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
        case 'cancelled': return 'bg-red-500/10 text-red-400 border-red-500/20';
        default:          return 'bg-surface-sunken text-muted border-border';
    }
}

export default function BookingDetailClient({ booking: initial }: { booking: BookingDetail }) {
    const router = useRouter();
    const [booking, setBooking] = useState<BookingDetail>(initial);
    const [isUpdating, setIsUpdating] = useState(false);
    const [toast, setToast] = useState<string | null>(null);
    const [adminNote, setAdminNote] = useState('');
    const [showNoteBox, setShowNoteBox] = useState(false);

    const showMsg = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

    const updateStatus = async (newStatus: string) => {
        setIsUpdating(true);
        try {
            const res = await fetch(`/api/bookings/${booking.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            if (res.ok) {
                setBooking(prev => ({ ...prev, status: newStatus }));
                showMsg(`Booking ${newStatus}`);
            } else { showMsg('Update failed'); }
        } catch { showMsg('Update failed'); }
        setIsUpdating(false);
    };

    const updatePayment = async (newPayment: string) => {
        setIsUpdating(true);
        try {
            const res = await fetch(`/api/bookings/${booking.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paymentStatus: newPayment }),
            });
            if (res.ok) {
                setBooking(prev => ({ ...prev, paymentStatus: newPayment }));
                showMsg('Payment status updated');
            } else { showMsg('Update failed'); }
        } catch { showMsg('Update failed'); }
        setIsUpdating(false);
    };

    const copyInfo = () => {
        const text = [
            `Booking: #${booking.bookingRef || booking.id.slice(-8).toUpperCase()}`,
            `Customer: ${booking.name}`,
            `Phone: ${booking.phone}`,
            `From: ${booking.pickup}`,
            `To: ${booking.dropoff}`,
            `Date: ${booking.date} at ${booking.time}`,
            `Vehicle: ${booking.vehicle || ''}`,
            `Price: ${booking.price || (booking.finalPrice ? `${booking.finalPrice} SAR` : '')}`,
        ].join('\n');

        // navigator.clipboard only works on HTTPS or localhost
        // fallback to execCommand for local network (http://192.168.x.x)
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
        } else {
            fallbackCopy(text);
        }
        showMsg('Booking info copied to clipboard');
    };

    const fallbackCopy = (text: string) => {
        const el = document.createElement('textarea');
        el.value = text;
        el.style.position = 'fixed';
        el.style.opacity = '0';
        document.body.appendChild(el);
        el.focus();
        el.select();
        try { document.execCommand('copy'); } catch {}
        document.body.removeChild(el);
    };

    const legs = booking.legs && booking.legs.length > 0 ? booking.legs : [{
        pickup: booking.pickup,
        dropoff: booking.dropoff,
        date: booking.date,
        time: booking.time,
        flightNumber: booking.flightNumber,
    }];

    const vehicleLabel = booking.selectedVehicles && booking.selectedVehicles.length > 0
        ? booking.selectedVehicles.map(v => `${v.name || 'Vehicle'} x${v.quantity}`).join(', ')
        : booking.vehicle || 'Vehicle TBC';

    const waLink = `https://wa.me/${booking.phone?.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi ${booking.name}, your booking from ${booking.pickup} to ${booking.dropoff} on ${booking.date} at ${booking.time} is confirmed.`)}`;

    const formattedCreatedAt = booking.createdAt
        ? format(new Date(booking.createdAt), 'MMM d, yyyy HH:mm')
        : null;

    return (
        <div className="min-h-screen bg-bg">
            {/* Toast */}
            {toast && (
                <div className="fixed top-4 right-4 z-50 px-4 py-3 bg-green-500 text-white rounded-xl shadow-lg font-medium animate-in fade-in slide-in-from-top-2 duration-200">
                    {toast}
                </div>
            )}

            {/* Sticky Header */}
            <div className="sticky top-0 z-40 bg-surface border-b border-border backdrop-blur-sm">
                <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3">
                    <button
                        onClick={() => router.push('/292852/bookings')}
                        className="flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors group"
                    >
                        <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                        Bookings
                    </button>
                    <span className="text-muted">/</span>
                    <span className="font-mono text-sm text-muted">#{(booking as any).bookingRef || booking.id.slice(-8).toUpperCase()}</span>

                    <div className="flex items-center gap-2 ml-auto flex-wrap">
                        <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${getStatusBadge(booking.status)}`}>
                            {booking.status}
                        </span>
                        <UrgencyBadge date={booking.date} time={booking.time} status={booking.status} size="md" />
                        <CountdownTimer
                            date={booking.date}
                            time={booking.time}
                            className="text-xs font-bold text-gold"
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* LEFT — Quick Actions */}
                    <div className="lg:col-span-1 space-y-4">
                        {/* Actions Card */}
                        <div className="bg-surface border border-border rounded-2xl p-5 space-y-3">
                            <h2 className="text-xs font-bold text-muted uppercase tracking-widest mb-4">Quick Actions</h2>

                            {booking.status === 'pending' && (
                                <>
                                    <button
                                        onClick={() => updateStatus('confirmed')}
                                        disabled={isUpdating}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all disabled:opacity-50"
                                    >
                                        <Check size={18} /> Confirm Booking
                                    </button>
                                    <button
                                        onClick={() => updateStatus('cancelled')}
                                        disabled={isUpdating}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-bold rounded-xl transition-all disabled:opacity-50"
                                    >
                                        <XCircle size={18} /> Reject
                                    </button>
                                </>
                            )}

                            {booking.status === 'confirmed' && (
                                <>
                                    <button
                                        onClick={() => updateStatus('completed')}
                                        disabled={isUpdating}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold rounded-xl transition-all disabled:opacity-50"
                                    >
                                        <CheckCircle2 size={18} /> Mark Complete
                                    </button>
                                    <button
                                        onClick={() => updateStatus('cancelled')}
                                        disabled={isUpdating}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-bold rounded-xl transition-all disabled:opacity-50"
                                    >
                                        <XCircle size={18} /> Cancel
                                    </button>
                                </>
                            )}

                            <div className="border-t border-border pt-3 space-y-2">
                                <a
                                    href={waLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 font-semibold rounded-xl transition-all text-sm"
                                >
                                    <MessageCircle size={16} /> WhatsApp Customer
                                </a>
                                <button
                                    onClick={copyInfo}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-surface-alt hover:bg-surface-sunken text-muted hover:text-ink border border-border font-semibold rounded-xl transition-all text-sm"
                                >
                                    <Copy size={16} /> Copy Booking Info
                                </button>
                                <button
                                    onClick={() => window.print()}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-surface-alt hover:bg-surface-sunken text-muted hover:text-ink border border-border font-semibold rounded-xl transition-all text-sm"
                                >
                                    <Printer size={16} /> Print
                                </button>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="bg-surface border border-border rounded-2xl p-5">
                            <h2 className="text-xs font-bold text-muted uppercase tracking-widest mb-4">Booking Timeline</h2>
                            <ol className="space-y-4">
                                <TimelineItem done label="Booking Created" sub={formattedCreatedAt || ''} />
                                <TimelineItem done={['confirmed','completed','cancelled'].includes(booking.status)} active={booking.status === 'pending'} label="Awaiting Confirmation" />
                                <TimelineItem done={['completed'].includes(booking.status)} active={booking.status === 'confirmed'} label="Confirmed" sub={booking.status === 'confirmed' ? 'Active' : ''} />
                                <TimelineItem done={booking.status === 'completed'} label="Pickup" sub={`${booking.date} · ${booking.time}`} />
                                <TimelineItem done={booking.status === 'completed'} label="Completed" />
                            </ol>
                        </div>
                    </div>

                    {/* RIGHT — Details */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Journey */}
                        <div className="bg-surface border border-border rounded-2xl p-5">
                            <h2 className="text-xs font-bold text-muted uppercase tracking-widest mb-5 flex items-center gap-2">
                                <MapPin size={14} /> Journey Details
                            </h2>
                            <div className="space-y-4">
                                {legs.map((leg, i) => (
                                    <div key={i} className="relative pl-5 border-l-2 border-border pb-4 last:pb-0">
                                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gold border-2 border-surface flex items-center justify-center">
                                            <span className="text-[8px] font-black text-black">{i + 1}</span>
                                        </div>
                                        <p className="text-xs font-bold text-gold uppercase tracking-widest mb-2">Transfer {i + 1}</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-[10px] text-muted uppercase tracking-wide block mb-0.5">From</label>
                                                <p className="text-sm font-medium text-ink">{leg.pickup || '—'}</p>
                                            </div>
                                            <div>
                                                <label className="text-[10px] text-muted uppercase tracking-wide block mb-0.5">To</label>
                                                <p className="text-sm font-medium text-ink">{leg.dropoff || '—'}</p>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-muted">
                                                <span className="flex items-center gap-1"><Calendar size={13} className="text-gold" /> {leg.date}</span>
                                                <span className="flex items-center gap-1"><Clock size={13} className="text-gold" /> {leg.time}</span>
                                            </div>
                                            {leg.flightNumber && (
                                                <div className="flex items-center gap-1 text-sm text-muted">
                                                    <Plane size={13} className="text-gold" /> {leg.flightNumber}
                                                </div>
                                            )}
                                            {leg.hours && (
                                                <div className="text-sm text-muted">{leg.hours} hours</div>
                                            )}
                                            {leg.price != null && leg.price > 0 && (
                                                <div className="text-sm font-bold text-ink">{leg.price} SAR</div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {booking.airportTerminal && (
                                <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-sm">
                                    <Plane size={14} className="text-gold" />
                                    <span className="text-muted">Terminal:</span>
                                    <span className="font-bold text-ink">{booking.airportTerminal}</span>
                                    {booking.parkingFee && booking.parkingFee > 0 && (
                                        <span className="text-amber-400 text-xs ml-2">+{booking.parkingFee} SAR parking</span>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Customer + Vehicle grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Customer */}
                            <div className="bg-surface border border-border rounded-2xl p-5">
                                <h2 className="text-xs font-bold text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Users size={14} /> Customer
                                </h2>
                                <p className="font-bold text-ink text-lg mb-1">{booking.name}</p>
                                {booking.nationality && <p className="text-sm text-muted mb-3">{booking.nationality}</p>}
                                <div className="space-y-2 text-sm">
                                    <a href={`mailto:${booking.email}`} className="flex items-center gap-2 text-muted hover:text-gold transition-colors">
                                        <span>✉️</span> {booking.email}
                                    </a>
                                    <a href={`tel:${booking.phone}`} className="flex items-center gap-2 text-muted hover:text-gold transition-colors">
                                        <span>📞</span> {booking.phone}
                                    </a>
                                </div>
                                {(booking.visaType || booking.passengers) && (
                                    <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-3 text-sm">
                                        {booking.visaType && (
                                            <div>
                                                <label className="text-[10px] text-muted uppercase tracking-wide block mb-0.5">Visa</label>
                                                <span className={`px-2 py-0.5 rounded text-xs font-bold ${booking.visaType === 'umrah' ? 'bg-gold/10 text-gold' : 'bg-surface-sunken text-muted'}`}>
                                                    {booking.visaType === 'umrah' ? 'Umrah' : booking.visaType === 'visit' ? 'Visit' : booking.visaOther || 'Other'}
                                                </span>
                                            </div>
                                        )}
                                        {booking.passengers && (
                                            <div>
                                                <label className="text-[10px] text-muted uppercase tracking-wide block mb-0.5">Passengers</label>
                                                <div className="flex items-center gap-1 font-bold text-ink"><Users size={13} /> {booking.passengers}</div>
                                            </div>
                                        )}
                                        {booking.luggage != null && (
                                            <div>
                                                <label className="text-[10px] text-muted uppercase tracking-wide block mb-0.5">Luggage</label>
                                                <div className="flex items-center gap-1 font-bold text-ink"><Briefcase size={13} /> {booking.luggage} bags</div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Vehicle + Pricing */}
                            <div className="bg-surface border border-border rounded-2xl p-5">
                                <h2 className="text-xs font-bold text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Car size={14} /> Vehicle & Pricing
                                </h2>
                                <div className="space-y-2 mb-4">
                                    {booking.selectedVehicles && booking.selectedVehicles.length > 0
                                        ? booking.selectedVehicles.map((v, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <Car size={14} className="text-gold" />
                                                <span className="font-semibold text-ink text-sm">{v.name || 'Vehicle'}</span>
                                                <span className="text-xs text-muted ml-auto">x{v.quantity}</span>
                                            </div>
                                        ))
                                        : <div className="flex items-center gap-2"><Car size={14} className="text-gold" /><span className="font-semibold text-ink text-sm">{booking.vehicle || 'TBC'}</span></div>
                                    }
                                </div>

                                <div className="border-t border-border pt-4 space-y-2 text-sm">
                                    {booking.originalPrice && booking.originalPrice > 0 && (
                                        <div className="flex justify-between text-muted">
                                            <span>Base Fare</span><span>{booking.originalPrice} SAR</span>
                                        </div>
                                    )}
                                    {booking.discountApplied && booking.discountApplied > 0 && (
                                        <div className="flex justify-between text-green-400">
                                            <span>Discount</span><span>-{Math.round(booking.discountApplied)} SAR</span>
                                        </div>
                                    )}
                                    {booking.parkingFee && booking.parkingFee > 0 && (
                                        <div className="flex justify-between text-amber-400">
                                            <span>Parking Fee</span><span>+{booking.parkingFee} SAR</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between font-bold text-ink border-t border-border pt-2 mt-2">
                                        <span>Total</span>
                                        <span className="text-gold text-lg">{booking.price || (booking.finalPrice ? `${booking.finalPrice} SAR` : '—')}</span>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
                                    <CreditCard size={14} className="text-muted" />
                                    <span className="text-sm text-muted">Payment:</span>
                                    <select
                                        value={booking.paymentStatus || 'unpaid'}
                                        onChange={e => updatePayment(e.target.value)}
                                        className={`text-xs font-bold uppercase border rounded-lg px-2 py-1 outline-none cursor-pointer ml-auto ${booking.paymentStatus === 'paid' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-surface-sunken text-muted border-border'}`}
                                    >
                                        <option value="unpaid">Unpaid</option>
                                        <option value="paid">Paid</option>
                                        <option value="refunded">Refunded</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        {(booking.notes || showNoteBox) && (
                            <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5">
                                <h2 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <FileText size={14} /> Customer Notes
                                </h2>
                                {booking.notes && <p className="text-sm text-ink italic">&ldquo;{booking.notes}&rdquo;</p>}
                            </div>
                        )}

                        {/* Rating */}
                        {booking.rating && (
                            <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5">
                                <h2 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Star size={14} /> Customer Feedback
                                </h2>
                                <div className="flex items-center gap-1 mb-2">
                                    {[1,2,3,4,5].map(s => (
                                        <span key={s} className={`text-xl ${s <= (booking.rating || 0) ? 'text-gold' : 'text-surface-sunken'}`}>★</span>
                                    ))}
                                    <span className="ml-2 font-bold text-ink">{booking.rating}/5</span>
                                </div>
                                {booking.review && <p className="text-sm text-ink italic">&ldquo;{booking.review}&rdquo;</p>}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function TimelineItem({ done, active, label, sub }: { done?: boolean; active?: boolean; label: string; sub?: string }) {
    return (
        <li className="flex items-start gap-3">
            <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${done ? 'bg-green-500 border-green-500' : active ? 'border-gold bg-gold/20 animate-pulse' : 'border-border bg-surface'}`}>
                {done && <span className="text-white text-[8px] font-black">✓</span>}
            </div>
            <div>
                <p className={`text-sm font-medium ${done ? 'text-ink' : active ? 'text-gold' : 'text-muted'}`}>{label}</p>
                {sub && <p className="text-xs text-muted mt-0.5">{sub}</p>}
            </div>
        </li>
    );
}
