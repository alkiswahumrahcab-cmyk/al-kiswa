'use client';

import { useRouter } from 'next/navigation';
import { Check, X, ChevronRight, MessageCircle, Users, Car, Calendar, Clock } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import UrgencyBadge, { getUrgencyGroup } from './UrgencyBadge';

interface SelectedVehicle { name?: string; quantity: number; vehicleId?: string; }

interface BookingRowProps {
    booking: {
        id: string; name: string; email: string; phone: string;
        pickup: string; dropoff: string; date: string; time: string;
        status: string; paymentStatus?: string; vehicle?: string;
        vehicleCount?: number; passengers?: number; nationality?: string;
        visaType?: string; visaOther?: string; price?: string;
        finalPrice?: number; legs?: any[]; selectedVehicles?: SelectedVehicle[];
        bookingRef?: string;
    };
    onConfirm: (id: string) => void;
    onCancel: (id: string) => void;
}

function getStatusBadge(status: string) {
    switch (status) {
        case 'confirmed': return 'bg-success-soft text-success border-success';
        case 'pending':   return 'bg-warning-soft text-warning border-warning';
        case 'completed': return 'bg-info-soft text-info border-info';
        case 'cancelled': return 'bg-error-soft text-error border-error';
        default:          return 'bg-surface-sunken text-muted border-border';
    }
}

export default function BookingRow({ booking, onConfirm, onCancel }: BookingRowProps) {
    const router = useRouter();
    const urgencyGroup = getUrgencyGroup(booking.date, booking.time, booking.status);
    const isUrgent = urgencyGroup === 'URGENT';
    const isOverdue = urgencyGroup === 'OVERDUE';

    const vehicleLabel = booking.selectedVehicles && booking.selectedVehicles.length > 0
        ? booking.selectedVehicles.map(v => `${v.name || 'Vehicle'} x${v.quantity}`).join(', ')
        : booking.vehicle
            ? `${booking.vehicle}${booking.vehicleCount && booking.vehicleCount > 1 ? ` x${booking.vehicleCount}` : ''}`
            : 'Vehicle TBC';

    const legCount = booking.legs?.length ?? 0;
    const priceLabel = booking.price || (booking.finalPrice ? `${booking.finalPrice} SAR` : null);
    const waMsg = `Hi ${booking.name}, regarding your booking from ${booking.pickup} to ${booking.dropoff} on ${booking.date} at ${booking.time}.`;
    const waLink = `https://wa.me/${booking.phone?.replace(/\D/g, '')}?text=${encodeURIComponent(waMsg)}`;

    return (
        <div
            className={`relative group flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                isUrgent ? 'bg-error-soft border-error hover:bg-error-soft' :
                isOverdue ? 'bg-error-soft border-error hover:bg-error-soft' :
                'bg-surface border-border hover:border-gold/40 hover:bg-surface-alt'}`}
            onClick={() => router.push(`/292852/bookings/${booking.id}`)}
        >
            <div className={`hidden sm:block w-1 self-stretch rounded-full shrink-0 ${
                isUrgent || isOverdue ? 'bg-error' :
                booking.status === 'confirmed' ? 'bg-success' :
                booking.status === 'pending' ? 'bg-warning' : 'bg-border'
            }`} />

            <div className="flex-1 min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                    <UrgencyBadge date={booking.date} time={booking.time} status={booking.status} />
                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border ${getStatusBadge(booking.status)}`}>
                        {booking.status}
                    </span>
                    {booking.paymentStatus && (
                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border ${booking.paymentStatus === 'paid' ? 'bg-success-soft text-success border-success' : 'bg-surface-sunken text-muted border-border'}`}>
                            {booking.paymentStatus}
                        </span>
                    )}
                    {legCount > 1 && (
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-gold-soft text-gold-strong border border-gold-line">
                            {legCount} Transfers
                        </span>
                    )}
                    <span className="font-mono text-xs text-muted">#{booking.bookingRef || booking.id.slice(-8).toUpperCase()}</span>
                    <CountdownTimer date={booking.date} time={booking.time} className={`text-xs ml-auto ${isUrgent ? 'text-error font-bold' : 'text-muted'}`} />
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="font-bold text-ink text-sm">{booking.name}</span>
                    {booking.nationality && <span className="text-xs text-muted">{booking.nationality}</span>}
                    {booking.visaType && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${booking.visaType === 'umrah' ? 'bg-gold-soft text-gold-strong' : 'bg-surface-sunken text-muted'}`}>
                            {booking.visaType === 'umrah' ? 'Umrah' : booking.visaType === 'visit' ? 'Visit' : booking.visaOther || 'Other'}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted">
                    <span className="text-success font-medium truncate max-w-[180px]">{booking.pickup}</span>
                    <ChevronRight size={14} className="shrink-0 text-gold" />
                    <span className="text-error font-medium truncate max-w-[180px]">{booking.dropoff}</span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {booking.date}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {booking.time}</span>
                    <span className="flex items-center gap-1"><Car size={11} /> {vehicleLabel}</span>
                    {booking.passengers && <span className="flex items-center gap-1"><Users size={11} /> {booking.passengers} pax</span>}
                    {priceLabel && <span className="font-bold text-ink ml-auto">{priceLabel}</span>}
                </div>
            </div>

            <div className="flex items-center gap-2 shrink-0" onClick={e => e.stopPropagation()}>
                {booking.status === 'pending' && (
                    <>
                        <button onClick={() => onConfirm(booking.id)} className="p-2 rounded-lg bg-success-soft hover:bg-success-soft text-success transition-colors" title="Confirm"><Check size={16} /></button>
                        <button onClick={() => onCancel(booking.id)} className="p-2 rounded-lg bg-error-soft hover:bg-error-soft text-error transition-colors" title="Cancel"><X size={16} /></button>
                    </>
                )}
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] transition-colors" title="WhatsApp" onClick={e => e.stopPropagation()}>
                    <MessageCircle size={16} />
                </a>
                <div className="p-2 rounded-lg text-muted group-hover:text-gold transition-colors"><ChevronRight size={16} /></div>
            </div>
        </div>
    );
}
