import { generateMetadataAlternates } from "@/lib/hreflang";
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Moon, Star, Clock, Shield, MapPin, CheckCircle, ArrowRight, Phone, Zap, AlertTriangle } from 'lucide-react';
import FAQSection from '@/components/services/FAQSection';
import FadeIn from '@/components/common/FadeIn';
import FleetCarouselWrapper from '@/components/home/FleetCarouselWrapper';
import { getSettings } from '@/lib/settings-storage';

export const metadata: Metadata = {
    title: "Ramadan Umrah Transport | Book Early | Al Kiswah Transport",
    description: "Book your Ramadan Umrah transport with Al Kiswah. 24/7 private transfers for Taraweeh, Last 10 Nights, and Laylatul Qadr. Guaranteed availability. Book early.",
    keywords: [
        "ramadan umrah transport",
        "makkah to madinah VIP ramadan",
        "last 10 nights umrah transfer",
        "laylatul qadr transport makkah",
        "taraweeh transport makkah",
        "ramadan private taxi",
        "umrah transport laylatul qadr"
    ],
    alternates: {
        ...generateMetadataAlternates("/ramadan"),
        canonical: "https://kiswahumrahcab.com/ramadan",
    },
    openGraph: {
        title: "Ramadan Umrah Transport | Book Early | Al Kiswah Transport",
        description: "Secure your VIP ride for Ramadan. Premium vehicles, fixed rates, and 24/7 availability for Taraweeh, Qiyam, and the Last 10 Nights.",
        images: [{ url: '/images/blog/ramadan-2026.png', width: 1200, height: 630, alt: 'Ramadan Umrah Transport Al Kiswah' }]
    }
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Ramadan VIP Umrah Transport",
    "provider": {
        "@type": "LocalBusiness",
        "name": "Al Kiswah Umrah Transport",
        "image": "https://kiswahumrahcab.com/logo.png",
        "url": "https://kiswahumrahcab.com"
    },
    "description": "Premium VIP private transport during Ramadan for Umrah pilgrims in Makkah and Madinah. 24/7 service for Taraweeh, Qiyam, and Laylatul Qadr.",
    "areaServed": ["Makkah", "Madinah", "Jeddah"],
    "offers": {
        "@type": "Offer",
        "priceCurrency": "SAR",
        "availability": "https://schema.org/InStock"
    }
};

const ramadanPackages = [
    {
        title: "The First 20 Days",
        subtitle: "Early Ramadan — Saver Rates",
        description: <><span>Avoid the peak crowds with our early Ramadan saver rates. <Link href="/pricing" className="text-gold-primary hover:underline">Best Umrah transport rates</Link> for early Ramadan bookings.</span></>,
        features: [
            <span key="jed"><strong><Link href="/services/jeddah-airport-transfer" className="hover:text-gold-primary transition-colors">Jeddah Airport ➔ Makkah</Link></strong>: from SAR 180</span>,
            <span key="mak"><strong><Link href="/services/makkah-madinah-taxi" className="hover:text-gold-primary transition-colors">Makkah ➔ Madinah</Link></strong>: from SAR 450</span>,
            "Available 24/7",
            "Standard Sedan or Family Van"
        ],
        highlight: false,
        icon: <Moon size={32} />
    },
    {
        title: "Last 10 Nights Special",
        subtitle: "Highest Demand — Book 3 Weeks Early",
        description: <><span>Priority booking for Laylatul Qadr nights and Eid. <Link href="/fleet" className="text-gold-primary hover:underline">Premium family Umrah taxi packages</Link> for the blessed nights.</span></>,
        features: [
            "Guaranteed Availability (no cancellations)",
            "Taraweeh Pickup & Drop Service",
            <span key="exp"><strong><Link href="/services/makkah-madinah-taxi" className="hover:text-gold-primary transition-colors">Makkah ➔ Madinah Express</Link></strong></span>,
            <span key="vip">VIP <strong><Link href="/fleet/gmc-yukon-at4" className="hover:text-gold-primary transition-colors">GMC Yukon</Link></strong> / <strong><Link href="/fleet/hyundai-staria" className="hover:text-gold-primary transition-colors">Staria</Link></strong> Options</span>
        ],
        highlight: true,
        icon: <Star size={32} />
    },
    {
        title: "Full Month Ziyarat",
        subtitle: "Flexible Schedule",
        description: "Complete spiritual tour of Makkah & Madinah with an experienced guide.",
        features: [
            <span key="ziy-mak">3–5 hrs <strong><Link href="/services/ziyarat-tours" className="hover:text-gold-primary transition-colors">Makkah Ziyarat</Link></strong> from SAR 250</span>,
            <span key="ziy-mad">3–5 hrs <strong><Link href="/services/ziyarat-tours" className="hover:text-gold-primary transition-colors">Madinah Ziyarat</Link></strong> from SAR 200</span>,
            "Visit Badar & Taif (Optional)",
            "Experienced Historic Guide"
        ],
        highlight: false,
        icon: <MapPin size={32} />
    }
];

const ramadanFAQs = [
    {
        question: "Do you operate during Taraweeh and Qiyam times?",
        answer: "Yes, we are fully operational 24/7 during Ramadan. However, please note that traffic around the Haram is restricted during prayer times, so pickups will be from the nearest accessible point."
    },
    {
        question: "Are prices higher during the Last 10 Nights?",
        answer: "Demand is extremely high during the Last 10 Nights. While we strive to keep rates stable, we recommend booking 2–3 weeks in advance to secure the standard rate."
    },
    {
        question: "Can I book a car for the whole day in Ramadan?",
        answer: "Yes, we offer daily rental packages (12 hours or 24 hours) so you can have a car at your disposal for shopping, Ziyarat, and prayers."
    },
    {
        question: "What if my flight is delayed during Ramadan rush?",
        answer: "We track all flights. Our driver will wait for you. For significant delays, simply contact our 24/7 WhatsApp support."
    },
    {
        question: "When should I book transport for Laylatul Qadr?",
        answer: "The nights of the 21st, 23rd, 25th, 27th, and 29th of Ramadan are particularly busy. We strongly recommend booking at least 3 weeks before Ramadan begins to guarantee availability at standard rates."
    }
];

export default async function RamadanLandingPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=I%20want%20to%20book%20Ramadan%20Transport`;

    return (
        <main className="min-h-screen bg-primary-black relative">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />

            {/* Custom Ramadan Hero */}
            <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/blog/ramadan-family-2026.jpg"
                        alt="Ramadan Family Umrah Transport — Al Kiswah"
                        fill
                        priority
                        className="object-cover opacity-60"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-black via-primary-black/60 to-transparent" />
                </div>

                <div className="container relative z-10 text-center px-4 pt-20">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-primary/20 text-gold-primary border border-gold-primary/30 mb-6 backdrop-blur-sm">
                            <Moon size={16} fill="currentColor" />
                            <span className="text-sm font-bold uppercase tracking-wider">Ramadan — Every Year</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-sans text-white mb-6 leading-tight">
                            Experience a <span className="text-gold-primary">Blessed Journey</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 font-light leading-relaxed">
                            Focus on your worship while we handle your travel. Reliable, comfortable, and punctual transport for the Holy Month.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/booking"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-primary text-black font-bold text-lg rounded-full hover:bg-white transition-all hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                            >
                                Book Now for Ramadan
                                <ArrowRight size={20} />
                            </Link>
                            <Link
                                href={whatsappLink}
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold text-lg rounded-full hover:bg-white/20 transition-all backdrop-blur-md border border-white/10"
                            >
                                <Phone size={20} />
                                WhatsApp Us
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <section className="py-24 relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Peace of Mind in the Holy Month</h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">Ramadan in Makkah is busy. Choose a transport partner that <Link href="/booking" className="text-gold-primary hover:underline">guarantees your arrival</Link>.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-gold-primary/50 transition-colors group">
                                <div className="w-14 h-14 bg-gold-primary/10 rounded-full flex items-center justify-center text-gold-primary mb-6 group-hover:bg-gold-primary group-hover:text-black transition-all">
                                    <Clock size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Punctual for Prayers</h3>
                                <p className="text-gray-400">We understand the importance of time. We plan routes to ensure you reach the Haram before Adhan.</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-gold-primary/50 transition-colors group">
                                <div className="w-14 h-14 bg-gold-primary/10 rounded-full flex items-center justify-center text-gold-primary mb-6 group-hover:bg-gold-primary group-hover:text-black transition-all">
                                    <Shield size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Guaranteed Booking</h3>
                                <p className="text-gray-400">Once confirmed, your ride is locked. No cancellations, no last-minute &ldquo;unavailable&rdquo; excuses.</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-gold-primary/50 transition-colors group">
                                <div className="w-14 h-14 bg-gold-primary/10 rounded-full flex items-center justify-center text-gold-primary mb-6 group-hover:bg-gold-primary group-hover:text-black transition-all">
                                    <CheckCircle size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Fixed Ramadan Rates</h3>
                                <p className="text-gray-400">No surge pricing when you book in advance. Bypass the high <Link href="/pricing" className="text-gold-primary hover:underline">on-spot taxi fares</Link>.</p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Packages Section */}
            <section className="py-24 bg-white/5 border-y border-white/5 relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">Ramadan Transport Packages</h2>
                        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {ramadanPackages.map((pkg, idx) => (
                                <div key={idx} className={`relative p-8 rounded-3xl border flex flex-col transition-all duration-300 hover:-translate-y-2
                                    ${pkg.highlight
                                        ? 'bg-gradient-to-br from-neutral-900 to-black border-gold-primary shadow-[0_0_40px_rgba(212,175,55,0.1)]'
                                        : 'bg-black/40 border-white/10 hover:border-gold-primary/30'
                                    }`}>
                                    {pkg.highlight && (
                                        <div className="absolute top-0 right-0 bg-gold-primary text-black text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl uppercase tracking-wider">
                                            High Demand
                                        </div>
                                    )}

                                    <div className="mb-6 mt-2">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white
                                            ${pkg.highlight ? 'bg-gold-primary text-black' : 'bg-white/10'}`}>
                                            {pkg.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-1">{pkg.title}</h3>
                                        <p className="text-gold-primary text-sm font-medium uppercase tracking-wide">{pkg.subtitle}</p>
                                    </div>

                                    <p className="text-gray-400 mb-8 min-h-[48px]">{pkg.description}</p>

                                    <ul className="space-y-4 mb-8 flex-grow">
                                        {pkg.features.map((feat, i) => (
                                            <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                                                <CheckCircle className="text-gold-primary shrink-0" size={18} />
                                                <span>{feat}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        href={whatsappLink}
                                        className={`w-full py-4 rounded-xl font-bold text-center uppercase tracking-wider transition-all
                                            ${pkg.highlight
                                                ? 'bg-gold-primary text-black hover:bg-white hover:shadow-lg'
                                                : 'bg-white/10 text-white hover:bg-gold-primary hover:text-black'
                                            }`}
                                    >
                                        Inquire Availability
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ========== LAYLATUL QADR SECTION — Fix 6 ========== */}
            <section className="py-24 relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="max-w-4xl mx-auto">
                            {/* Section Header */}
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-6 text-sm font-bold uppercase tracking-wider">
                                    <Zap size={14} />
                                    Highest Demand Period
                                </div>
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                    The Last 10 Nights — <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3D383] to-[#D4AF37]">Laylatul Qadr</span>
                                </h2>
                                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto font-light">
                                    The last 10 nights of Ramadan are the most sacred in the Islamic calendar.
                                    Transport demand increases <strong className="text-white">3× during this period</strong>.
                                    We recommend booking at least <strong className="text-white">2–3 weeks in advance</strong> to guarantee your vehicle.
                                </p>
                            </div>

                            {/* Demand Warning Card */}
                            <div className="bg-gradient-to-br from-amber-950/40 to-black border border-amber-500/30 rounded-3xl p-8 mb-10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-[60px]" />
                                <div className="relative z-10">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="bg-amber-500/20 p-3 rounded-xl text-amber-400 shrink-0">
                                            <AlertTriangle size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2">Night of the 27th — Critical Booking Alert</h3>
                                            <p className="text-gray-400 leading-relaxed">
                                                The night of the <strong className="text-amber-400">27th Ramadan</strong> sees the highest demand of the entire year.
                                                Vehicles are typically <strong className="text-white">fully booked 1–2 weeks prior</strong>. If this night is important to you,
                                                secure your transport immediately.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Demand Stats */}
                                    <div className="grid grid-cols-3 gap-4">
                                        {[
                                            { label: 'Demand Increase', value: '×3' },
                                            { label: 'Book By', value: '3 Weeks Prior' },
                                            { label: 'Nights to Watch', value: '21, 23, 25, 27, 29' },
                                        ].map((stat, i) => (
                                            <div key={i} className="text-center p-4 bg-black/30 rounded-xl border border-amber-500/10">
                                                <p className="text-amber-400 font-bold text-lg md:text-2xl mb-1">{stat.value}</p>
                                                <p className="text-gray-500 text-xs uppercase tracking-wider">{stat.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Key Nights Info */}
                            <div className="space-y-4 mb-10">
                                <h3 className="text-xl font-bold text-white font-sans">What Happens During the Last 10 Nights?</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Pilgrims begin Itikaf (seclusion for worship) in the Haram. Hundreds of thousands gather for Qiyam Al-Layl (night prayers).
                                    Streets around Masjid Al-Haram become restricted. Our drivers know the alternative access routes to get you as close as possible on time.
                                </p>
                                <p className="text-gray-400 leading-relaxed">
                                    For <strong className="text-white">Laylatul Qadr transport</strong>, we recommend booking a <strong className="text-white">full-night vehicle</strong> —
                                    available from Isha until Fajr — so you can focus entirely on worship without worrying about return transport.
                                </p>
                            </div>

                            {/* CTA */}
                            <div className="text-center">
                                <Link
                                    href="/booking"
                                    className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#D4AF37] to-[#B4932F] text-black px-10 py-5 rounded-full font-bold text-lg transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] hover:scale-105 uppercase tracking-wider"
                                >
                                    Secure Your Last 10 Nights Transfer
                                    <ArrowRight size={20} />
                                </Link>
                                <p className="mt-4 text-sm text-gray-500">Limited availability — book early to guarantee standard rates</p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <FleetCarouselWrapper />

            <div className="relative z-10">
                <FAQSection items={ramadanFAQs} title="Ramadan Travel FAQ" />
            </div>
        </main>
    );
}
