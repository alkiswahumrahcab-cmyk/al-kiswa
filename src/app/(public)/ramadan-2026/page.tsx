import type { Metadata } from 'next';
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Link from 'next/link';
import { Moon, Star, Clock, Shield, MapPin, CheckCircle, ArrowRight, Phone } from 'lucide-react';
import FAQSection from '@/components/services/FAQSection';
import FadeIn from '@/components/common/FadeIn';
import FleetCarouselWrapper from '@/components/home/FleetCarouselWrapper';
import { getSettings } from '@/lib/settings-storage';

export const metadata: Metadata = {
    title: "Ramadan Umrah Taxi Service 2026 | Makkah to Madinah",
    description: "Book cheap Umrah transport for Ramadan 2026. 24/7 Umrah cab service for Makkah to Madinah. Family Umrah taxi packages available for Last 10 Nights.",
    keywords: [
        "umrah taxi ramadan 2026",
        "makkah to madinah taxi ramadan",
        "cheap umrah transport ramadan",
        "24/7 umrah cab service",
        "family umrah taxi packages",
        "ramadan umrah transportation",
        "Ramadan Transport Makkah",
        "Last 10 Nights Umrah Taxi",
        "Taraweeh Transport Makkah"
    ],
    alternates: {
        canonical: '/ramadan-2026',
    },
    openGraph: {
        title: "Ramadan 2026 Umrah Taxi Services | Al Kiswa Cab",
        description: "Secure your ride for Ramadan 2026. Premium vehicles, fixed rates, and 24/7 availability for Taraweeh and Qiyam.",
        images: [{ url: '/images/blog/ramadan-2026.png', width: 1200, height: 630, alt: 'Ramadan 2026 Umrah Transport' }]
    }
};

const ramadanPackages = [
    {
        title: "The First 20 Days",
        subtitle: "Feb 17 - Mar 8, 2026",
        description: <>Avoid the peak crowds with our early Ramadan saver rates. <Link href="/pricing" className="text-gold-primary hover:underline">Cheap Umrah transport rates</Link> for early Ramadan bookings.</>,
        features: [
            <span key="jed"><strong><Link href="/services/jeddah-airport-transfer" className="hover:text-gold-primary transition-colors">Jeddah Airport ➔ Makkah</Link></strong>: 200 SAR</span>,
            <span key="mak"><strong><Link href="/services/makkah-madinah-taxi" className="hover:text-gold-primary transition-colors">Makkah ➔ Madinah</Link></strong>: 450 SAR</span>,
            "Available 24/7",
            "Standard Sedan or Family Van"
        ],
        highlight: false,
        icon: <Moon size={32} />
    },
    {
        title: "Last 10 Nights Special",
        subtitle: "Mar 9 - Mar 19, 2026",
        description: <>Priority booking for Laylatul Qadr nights and Eid. <Link href="/fleet" className="text-gold-primary hover:underline">Premium family Umrah taxi packages</Link> for Laylatul Qadr.</>,
        features: [
            "Guaranteed Availability",
            "Taraweeh Pickup/Drop Service",
            <span key="exp"><strong><Link href="/services/makkah-madinah-taxi" className="hover:text-gold-primary transition-colors">Makkah ➔ Madinah Express</Link></strong></span>,
            <span key="vip">VIP <strong><Link href="/fleet/gmc-yukon-at4" className="hover:text-gold-primary transition-colors">GMC</Link></strong> / <strong><Link href="/fleet/hyundai-staria" className="hover:text-gold-primary transition-colors">Staria</Link></strong> Options</span>
        ],
        highlight: true,
        icon: <Star size={32} />
    },
    {
        title: "Full Month Ziyarat",
        subtitle: "Flexible Schedule",
        description: "Complete spiritual tour of Makkah & Madinah.",
        features: [
            <span key="ziy-mak">3 Hours <strong><Link href="/services/ziarah-makkah" className="hover:text-gold-primary transition-colors">Makkah Ziyarat</Link></strong></span>,
            <span key="ziy-mad">3 Hours <strong><Link href="/services/ziarah-madinah" className="hover:text-gold-primary transition-colors">Madinah Ziyarat</Link></strong></span>,
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
        answer: "Demand is extremely high during the Last 10 Nights. While we strive to keep rates stable, we recommend booking weeks in advance to secure the standard rate."
    },
    {
        question: "Can I book a car for the whole day in Ramadan?",
        answer: "Yes, we offer daily rental packages (12 hours or 24 hours) so you can have a car at your disposal for shopping, Ziyarat, and prayers."
    },
    {
        question: "What if my flight is delayed during Ramadan rush?",
        answer: "We track all flights. Our driver will wait for you. For significant delays, simply contact our 24/7 WhatsApp support."
    }
];

export default async function RamadanLandingPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=I%20want%20to%20book%20Ramadan%202026%20Transport`;

    return (
        <main className="min-h-screen bg-primary-black relative">
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />

            {/* Custom Ramadan Hero */}
            <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/blog/ramadan-family-2026.jpg"
                        alt="Ramadan 2026 Family Umrah Transport"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-black via-primary-black/60 to-transparent" />
                </div>

                <div className="container relative z-10 text-center px-4 pt-20">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-primary/20 text-gold-primary border border-gold-primary/30 mb-6 backdrop-blur-sm">
                            <Moon size={16} fill="currentColor" />
                            <span className="text-sm font-bold uppercase tracking-wider">Ramadan 1447H / 2026</span>
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
                                <p className="text-gray-400">Once confirmed, your ride is locked. No cancellations, no last-minute "unavailable" excuses.</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-gold-primary/50 transition-colors group">
                                <div className="w-14 h-14 bg-gold-primary/10 rounded-full flex items-center justify-center text-gold-primary mb-6 group-hover:bg-gold-primary group-hover:text-black transition-all">
                                    <CheckCircle size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Fixed Ramadan Rates</h3>
                                <p className="text-gray-400">No surge pricing when you book in advance. Bypassing the high <Link href="/pricing" className="text-gold-primary hover:underline">on-spot taxi fares</Link>.</p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Packages Section */}
            <section className="py-24 bg-white/5 border-y border-white/5 relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">Ramadan 2026 Packages</h2>
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

            <FleetCarouselWrapper />

            <div className="relative z-10">
                <FAQSection items={ramadanFAQs} title="Ramadan Travel FAQ" />
            </div>

            <Breadcrumbs />
        </main>
    );
}
