import React, { Suspense } from 'react';
import BookingForm from '@/components/booking/BookingForm';
import { Star, Shield, CreditCard, MessageCircle, CheckCircle2 } from 'lucide-react';

export async function generateMetadata() {
    return {
        title: "Book Umrah Taxi Online | Instant Confirmation | Al Kiswah Transport",
        description: "Book your private Umrah taxi in seconds. Jeddah Airport to Makkah, Makkah to Madinah, and Ziyarat tours. Pay on arrival. Instant confirmation. Book now.",
        keywords: [
            "book umrah taxi online",
            "umrah taxi booking instant confirmation",
            "jeddah to makkah taxi book now",
            "makkah to madinah transport booking",
            "pay on arrival umrah taxi",
            "al kiswah booking",
            "حجز تاكسي المعتمرين"
        ],
        alternates: {
            canonical: 'https://kiswahumrahcab.com/booking',
        },
        openGraph: {
            title: "Book Umrah Taxi Online | Instant Confirmation | Al Kiswah Transport",
            description: "Book your private Umrah taxi in seconds. Pay on arrival. Instant confirmation. No hidden fees.",
            url: "https://kiswahumrahcab.com/booking",
            type: "website",
        }
    };
}

export default function BookingPage() {
    return (
        <main className="min-h-screen bg-primary-black relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none" />
            {/* Ambient Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-secondary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container relative z-20 pt-32 md:pt-40 lg:pt-48 pb-20 px-4 max-w-5xl mx-auto">

                {/* Page Header — visible H1 for SEO */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white font-sans mb-2">
                        Book Your Private <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3D383] to-[#D4AF37]">Umrah Taxi</span>
                    </h1>
                    <p className="text-gray-400 font-light text-lg">Instant confirmation &bull; No prepayment required &bull; Available 24/7</p>
                </div>

                {/* Trust Strip — 4 badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                    {[
                        { icon: <Star size={18} className="text-[#D4AF37]" />, title: '4.9★ Google Rating', sub: 'Verified Reviews' },
                        { icon: <Shield size={18} className="text-[#D4AF37]" />, title: 'Ministry Licensed', sub: 'Saudi Transport Auth.' },
                        { icon: <CreditCard size={18} className="text-[#D4AF37]" />, title: 'Pay on Arrival', sub: 'Cash — no card needed' },
                        { icon: <MessageCircle size={18} className="text-[#D4AF37]" />, title: 'WhatsApp Support', sub: '24/7 instant replies' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 hover:border-[#D4AF37]/30 transition-colors">
                            <div className="bg-[#D4AF37]/10 p-2 rounded-lg shrink-0">{item.icon}</div>
                            <div>
                                <p className="text-white font-bold text-sm leading-tight">{item.title}</p>
                                <p className="text-gray-500 text-xs">{item.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Booking Form */}
                <Suspense fallback={
                    <div className="max-w-4xl mx-auto h-[600px] w-full animate-pulse bg-white/5 rounded-[2rem] border border-white/10 flex items-center justify-center">
                        <div className="text-gold-primary/50 text-sm font-medium tracking-widest uppercase">Loading Booking Engine...</div>
                    </div>
                }>
                    <BookingForm />
                </Suspense>

                {/* Pay on Arrival Guarantee Bar */}
                <div className="mt-6 p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                    {[
                        { icon: <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />, text: 'Pay cash on arrival — zero prepayment' },
                        { icon: <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />, text: 'Free cancellation up to 24 hrs before' },
                        { icon: <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />, text: 'Fixed price — no surge, no surprises' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-emerald-300 font-medium">
                            {item.icon}
                            <span>{item.text}</span>
                        </div>
                    ))}
                </div>

            </div>
        </main>
    );
}
