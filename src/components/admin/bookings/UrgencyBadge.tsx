'use client';

export type UrgencyGroup = 'URGENT' | 'OVERDUE' | 'TODAY' | 'TOMORROW' | 'THIS_WEEK' | 'FUTURE' | 'PAST';

export function getUrgencyGroup(date: string, time: string, status: string): UrgencyGroup {
    const now = new Date();
    const pickup = new Date(`${date}T${time}`);
    if (isNaN(pickup.getTime())) return 'FUTURE';
    const diffMs = pickup.getTime() - now.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    const isActive = status === 'pending' || status === 'confirmed';
    if (status === 'completed' || status === 'cancelled') return 'PAST';
    if (isActive && diffMs < 0) return 'OVERDUE';
    if (isActive && diffHours <= 3) return 'URGENT';
    if (diffHours <= 24) return 'TODAY';
    if (diffHours <= 48) return 'TOMORROW';
    if (diffHours <= 168) return 'THIS_WEEK';
    return 'FUTURE';
}

const BADGE_CONFIG: Record<UrgencyGroup, { label: string; className: string; pulse?: boolean }> = {
    URGENT:    { label: 'URGENT',    className: 'bg-error-soft text-error border border-error ring-1 ring-error', pulse: true },
    OVERDUE:   { label: 'OVERDUE',   className: 'bg-error-soft text-error border border-error' },
    TODAY:     { label: 'TODAY',     className: 'bg-gold-soft text-gold-strong border border-gold-line' },
    TOMORROW:  { label: 'TOMORROW',  className: 'bg-info-soft text-info border border-info' },
    THIS_WEEK: { label: 'THIS WEEK', className: 'bg-success-soft text-success border border-success' },
    FUTURE:    { label: 'UPCOMING',  className: 'bg-surface-sunken text-muted border border-border' },
    PAST:      { label: 'PAST',      className: 'bg-surface-sunken text-muted border border-border' },
};

export default function UrgencyBadge({ date, time, status, size = 'sm' }: { date: string; time: string; status: string; size?: 'sm' | 'md' }) {
    const group = getUrgencyGroup(date, time, status);
    const config = BADGE_CONFIG[group];
    const sz = size === 'md' ? 'px-3 py-1 text-xs' : 'px-2 py-0.5 text-[10px]';
    return (
        <span className={`inline-flex items-center rounded-full font-bold uppercase tracking-wider whitespace-nowrap ${sz} ${config.className} ${config.pulse ? 'animate-pulse' : ''}`}>
            {config.label}
        </span>
    );
}
