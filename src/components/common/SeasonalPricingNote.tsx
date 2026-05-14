import Link from 'next/link';
import { CalendarDays } from 'lucide-react';

export default function SeasonalPricingNote({ className = '' }: { className?: string }) {
    return (
        <div className={`flex items-start gap-3 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-xl px-5 py-4 text-sm ${className}`}>
            <CalendarDays size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
            <p className="text-gray-300 font-light leading-relaxed">
                <span className="text-white font-medium">Prices may vary by season</span> — Ramadan, Hajj, and peak periods may have adjusted rates.
                For accurate pricing on your travel dates, use our{' '}
                <Link href="/booking" className="text-[#D4AF37] hover:text-white underline underline-offset-2 font-medium transition-colors">
                    Booking Page
                </Link>.
            </p>
        </div>
    );
}
