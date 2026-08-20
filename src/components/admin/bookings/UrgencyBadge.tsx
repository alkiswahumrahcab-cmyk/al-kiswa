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
    URGENT:    { label: 'URGENT',    className: 'bg-red-500/20 text-red-400 border border-red-500/40 ring-1 ring-red-500/30', pulse: true },
    OVERDUE:   { label: 'OVERDUE',   className: 'bg-red-500/10 text-red-400 border border-red-500/30' },
    TODAY:     { label: 'TODAY',     className: 'bg-amber-500/15 text-amber-400 border border-amber-500/30' },
    TOMORROW:  { label: 'TOMORROW',  className: 'bg-blue-500/10 text-blue-400 border border-blue-500/20' },
    THIS_WEEK: { label: 'THIS WEEK', className: 'bg-green-500/10 text-green-400 border border-green-500/20' },
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