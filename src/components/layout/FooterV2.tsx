'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSettings } from '@/context/SettingsContext';
import { regions } from '@/data/regions';

export default function Footer() {
    const { settings } = useSettings();

    // Default to a fallback number if settings hasn't loaded yet
    const whatsappNumber = settings?.contact?.whatsapp || "+966548707332";

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "TransportationCompany",
        "name": "Al Kiswah Umrah Transport",
        "url": "https://kiswahumrahcab.com",
        "logo": "https://kiswahumrahcab.com/logo.webp",
        "image": "https://kiswahumrahcab.com/images/blog-hero-professional.png",
        "description": "Licensed Umrah transport service in Saudi Arabia offering private taxi transfers between Jeddah Airport, Makkah, and Madinah for pilgrims from the Gulf and Europe.",
        "telephone": whatsappNumber,
        "priceRange": "$$",
        "currenciesAccepted": "SAR, USD, GBP, EUR",
        "paymentAccepted": "Cash, Bank Transfer, WhatsApp Booking",
        "areaServed": ["Jeddah", "Makkah", "Madinah", "Saudi Arabia"],
        "availableLanguage": ["Arabic", "English", "Urdu"],
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "00:00",
            "closes": "23:59"
        },
        "sameAs": [
            settings?.contact?.social?.instagram || "https://www.instagram.com/kiswahumrahcab",
            settings?.contact?.social?.facebook || "https://www.facebook.com/kiswahumrahcab",
            settings?.contact?.social?.tiktok || "https://www.tiktok.com/@kiswahumrahcab"
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "500",
            "bestRating": "5",
            "worstRating": "1"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Umrah Transport Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Jeddah Airport to Makkah Private Taxi",
                        "url": "https://kiswahumrahcab.com/services/jeddah-airport-transfer"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Makkah to Madinah Private Taxi",
                        "url": "https://kiswahumrahcab.com/services/makkah-madinah-taxi"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Ziyarat Tours Makkah and Madinah",
                        "url": "https://kiswahumrahcab.com/services/ziyarat-tours"
                    }
                }
            ]
        }
    };

    return (
        <footer className="bg-gray-900 border-t border-white/10 text-white relative">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            {/* Main 4-Column Grid */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Column 1 - Brand Block */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block relative w-[140px] h-[50px]">
                            <Image
                                src="/logo.webp"
                                alt="Al Kiswah Umrah Transport Logo"
                                fill
                                sizes="140px"
                                className="object-contain object-left"
                            />
                        </Link>
                        <div className="space-y-2">
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Your trusted companion for a blessed Umrah journey.
                            </p>
                            <p className="text-gray-500 text-xs leading-relaxed" dir="rtl">
                                رفيقكم الأمين في رحلة العمرة المباركة
                            </p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-yellow-400 text-sm tracking-widest">⭐⭐⭐⭐⭐</span>
                            <span className="text-xs text-gray-400">5.0 — Trusted by 5,000+ pilgrims</span>
                        </div>
                        <a
                            href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-6 rounded-md transition-colors w-full sm:w-auto text-sm"
                        >
                            Book via WhatsApp
                        </a>
                        <div className="pt-2">
                            <p className="text-xs text-gray-500 mb-2 font-medium">ACCEPTED PAYMENTS:</p>
                            <div className="flex flex-wrap gap-2 text-[10px] font-bold text-gray-400">
                                <span className="bg-gray-800 px-2 py-1 rounded">SAR</span>
                                <span className="bg-gray-800 px-2 py-1 rounded">USD</span>
                                <span className="bg-gray-800 px-2 py-1 rounded">GBP</span>
                                <span className="bg-gray-800 px-2 py-1 rounded">EUR</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 2 - Popular Routes */}
                    <div>
                        <h3 className="text-white font-semibold text-[14px] uppercase tracking-wider mb-6">
                            Popular Umrah Routes
                        </h3>
                        <ul className="space-y-3">
                            <li><Link href="/services/jeddah-airport-transfer" className="text-gray-400 hover:text-white transition-colors text-[15px]">Jeddah Airport to Makkah Taxi</Link></li>
                            <li><Link href="/services/makkah-madinah-taxi" className="text-gray-400 hover:text-white transition-colors text-[15px]">Makkah to Madinah Private Taxi</Link></li>
                            <li><Link href="/services/madinah-airport-transfer" className="text-gray-400 hover:text-white transition-colors text-[15px]">Madinah Airport to Hotel Transfer</Link></li>
                            <li><Link href="/services/intercity-transfer" className="text-gray-400 hover:text-white transition-colors text-[15px]">Jeddah to Madinah Direct Transfer</Link></li>
                            <li><Link href="/services/ziyarat-tours" className="text-gray-400 hover:text-white transition-colors text-[15px]">Makkah Ziyarat City Tours</Link></li>
                            <li><Link href="/ramadan-2026" className="text-gray-400 hover:text-white transition-colors text-[15px]">Ramadan 2026 Umrah Transport</Link></li>
                        </ul>
                    </div>

                    {/* Column 3 - Services & Fleet */}
                    <div>
                        <h3 className="text-white font-semibold text-[14px] uppercase tracking-wider mb-6">
                            Services & Fleet
                        </h3>
                        <ul className="space-y-3">
                            <li><Link href="/services/airport-transfers" className="text-gray-400 hover:text-white transition-colors text-[15px]">Airport Transfers</Link></li>
                            <li><Link href="/services/hotel-transfers" className="text-gray-400 hover:text-white transition-colors text-[15px]">Hotel Transfers</Link></li>
                            <li><Link href="/services/intercity-transfer" className="text-gray-400 hover:text-white transition-colors text-[15px]">Intercity Transport</Link></li>
                            <li><Link href="/fleet/gmc-yukon-at4" className="text-gray-400 hover:text-white transition-colors text-[15px]">GMC Yukon XL — VIP SUV</Link></li>
                            <li><Link href="/fleet/hyundai-staria" className="text-gray-400 hover:text-white transition-colors text-[15px]">Hyundai Staria — Family MPV</Link></li>
                            <li><Link href="/fleet/toyota-hiace" className="text-gray-400 hover:text-white transition-colors text-[15px]">Toyota Hiace — Group Bus</Link></li>
                            <li><Link href="/pricing" className="text-gray-400 hover:text-white transition-colors text-[15px]">Pricing & Rates</Link></li>
                        </ul>
                    </div>

                    {/* Column 4 - Company & Trust */}
                    <div>
                        <h3 className="text-white font-semibold text-[14px] uppercase tracking-wider mb-6">
                            Al Kiswah Transport
                        </h3>
                        <ul className="space-y-3">
                            <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors text-[15px]">About Us</Link></li>
                            <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors text-[15px]">Blog & Travel Guides</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-[15px]">Contact Us</Link></li>
                            <li><Link href="/safety" className="text-gray-400 hover:text-white transition-colors text-[15px]">Safety Policy</Link></li>
                            <li><Link href="/track-booking" className="text-gray-400 hover:text-white transition-colors text-[15px]">Track My Booking</Link></li>
                            {regions.slice(0, 4).map((region) => (
                                <li key={region.id}>
                                    <Link href={`/pilgrims/${region.id}`} className="text-gray-400 hover:text-white transition-colors text-[15px]">
                                        Umrah Taxi {region.name}
                                    </Link>
                                </li>
                            ))}
                            <li><Link href="/ar" className="text-gray-400 hover:text-white transition-colors text-[15px]" dir="rtl">للمعتمرين العرب</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Full-Width Trust Bar */}
            <div className="border-y border-white/5 py-6 bg-gray-900/50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row flex-wrap justify-between items-center gap-4 text-[13px] text-gray-500 font-medium">
                        <div className="flex items-center gap-2">
                            <span>🛡️</span>
                            <span>Ministry of Hajj Licensed</span>
                        </div>
                        <div className="hidden md:block w-px h-4 bg-gray-700" />
                        <div className="flex items-center gap-2">
                            <span>✈️</span>
                            <span>Real-Time Flight Tracking</span>
                        </div>
                        <div className="hidden md:block w-px h-4 bg-gray-700" />
                        <div className="flex items-center gap-2">
                            <span>💰</span>
                            <span>Fixed Prices — No Hidden Fees</span>
                        </div>
                        <div className="hidden md:block w-px h-4 bg-gray-700" />
                        <div className="flex items-center gap-2">
                            <span>🕐</span>
                            <span>24/7 Support — Always Available</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Legal Bar */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center text-center lg:text-left">
                    <div className="text-[13px] text-gray-500">
                        © 2026 Al Kiswah Umrah Transport. All rights reserved. | Jeddah · Makkah · Madinah
                    </div>
                    
                    <div className="text-[11px] text-gray-600 lg:text-center order-last lg:order-none flex flex-wrap justify-center gap-2">
                        <span>Serving pilgrims from:</span>
                        {regions.map((region, index) => (
                            <span key={region.id}>
                                <Link href={`/pilgrims/${region.id}`} className="hover:text-gray-400 transition-colors">
                                    {region.name}
                                </Link>
                                {index < regions.length - 1 && <span className="mx-1">·</span>}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center justify-center lg:justify-end gap-6 text-[13px] text-gray-500">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
