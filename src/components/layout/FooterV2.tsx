'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSettings } from '@/context/SettingsContext';
import { regions } from '@/data/regions';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import NusukFooterSeal from '@/components/trust/NusukFooterSeal';
import ThemeLogo from '@/components/common/ThemeLogo';
import { Link003 } from '@/components/ui/skiper-ui/skiper40';

export default function Footer() {
    const { settings } = useSettings();

    // Default to a fallback number if settings hasn't loaded yet
    const whatsappNumber = settings?.contact?.whatsapp || "+966548707332";

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "TransportationCompany",
        "name": "Al Kiswah Umrah Transport",
        "url": "https://kiswahumrahcab.com",
        "logo": "https://kiswahumrahcab.com/logo.svg",
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
        "sameAs": Array.from(new Set([
            settings?.contact?.social?.instagram,
            settings?.contact?.social?.facebook,
            settings?.contact?.social?.tiktok,
            "https://www.instagram.com/kiswahumrahcab",
            "https://www.facebook.com/kiswahumrahcab",
            "https://www.tiktok.com/@kiswahumrahcab"
        ].filter((url): url is string => typeof url === 'string' && url.trim().length > 0))),
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
        <footer className="bg-surface text-ink relative border-t border-border">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            {/* Main 4-Column Grid */}
            <div className="container py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Column 1 - Brand Block */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block relative group mb-4">
                            <ThemeLogo width={160} height={48} />
                        </Link>
                        <div className="space-y-2">
                            <p className="text-ink-muted text-sm leading-relaxed">
                                Your trusted companion for a blessed Umrah journey.
                            </p>
                            <p className="text-ink-muted text-xs leading-relaxed" dir="rtl">
                                رفيقكم الأمين في رحلة العمرة المباركة
                            </p>
                        </div>
                        <a 
                            href={settings?.contact?.social?.googleBusiness || "https://share.google/ARbbVaAackyOs8N7G"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group w-fit hover:bg-ink/5 rounded-lg border border-transparent hover:border-border transition-all p-2 -ml-2"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-yellow-500 text-sm tracking-widest group-hover:scale-105 transition-transform origin-left">⭐⭐⭐⭐⭐</span>
                                <span className="text-[10px] font-bold text-ink bg-blue-50 px-2 py-0.5 rounded border border-blue-200">Google Provider</span>
                            </div>
                            <span className="text-xs text-ink-muted mt-1 block group-hover:text-ink transition-colors">5.0 Rating — See our reviews</span>
                        </a>
                        <a
                            href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-6 rounded-md transition-colors w-full sm:w-auto text-sm"
                        >
                            Book via WhatsApp
                        </a>
                        <div className="pt-2">
                            <p className="text-xs text-ink-muted mb-2 font-medium">ACCEPTED PAYMENTS:</p>
                            <div className="flex flex-wrap gap-2 text-[10px] font-bold text-ink-muted">
                                <span className="bg-surface-alt px-2 py-1 rounded">SAR</span>
                                <span className="bg-surface-alt px-2 py-1 rounded">USD</span>
                                <span className="bg-surface-alt px-2 py-1 rounded">GBP</span>
                                <span className="bg-surface-alt px-2 py-1 rounded">EUR</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-4 pt-2">
                            {settings?.contact?.social?.facebook && (
                                <a href={settings.contact.social.facebook} target="_blank" rel="noopener noreferrer" className="text-ink-muted hover:text-blue-600 transition-colors" aria-label="Facebook">
                                    <Facebook size={20} strokeWidth={1.5} />
                                </a>
                            )}
                            {settings?.contact?.social?.instagram && (
                                <a href={settings.contact.social.instagram} target="_blank" rel="noopener noreferrer" className="text-ink-muted hover:text-pink-600 transition-colors" aria-label="Instagram">
                                    <Instagram size={20} strokeWidth={1.5} />
                                </a>
                            )}
                            {settings?.contact?.social?.twitter && (
                                <a href={settings.contact.social.twitter} target="_blank" rel="noopener noreferrer" className="text-ink-muted hover:text-blue-500 transition-colors" aria-label="Twitter">
                                    <Twitter size={20} strokeWidth={1.5} />
                                </a>
                            )}
                            {settings?.contact?.social?.linkedin && (
                                <a href={settings.contact.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-ink-muted hover:text-blue-700 transition-colors" aria-label="LinkedIn">
                                    <Linkedin size={20} strokeWidth={1.5} />
                                </a>
                            )}
                            {settings?.contact?.social?.tiktok && (
                                <a href={settings.contact.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-ink-muted hover:text-ink transition-colors" aria-label="TikTok">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Column 2 - Popular Routes */}
                    <div>
                        <h3 className="text-ink font-semibold text-[14px] uppercase tracking-wider mb-6">
                            Popular Umrah Routes
                        </h3>
                        <ul className="space-y-3">
                            <li><Link003 href="/services/jeddah-airport-transfer" className="text-ink-muted hover:text-ink transition-colors text-[15px]">Jeddah Airport to Makkah Taxi</Link003></li>
                            <li><Link003 href="/services/makkah-madinah-taxi" className="text-ink-muted hover:text-ink transition-colors text-[15px]">Makkah to Madinah Private Taxi</Link003></li>
                            <li><Link003 href="/services/madinah-airport-transfer" className="text-ink-muted hover:text-ink transition-colors text-[15px]">Madinah Airport to Hotel Transfer</Link003></li>
                            <li><Link003 href="/services/intercity-transfer" className="text-ink-muted hover:text-ink transition-colors text-[15px]">Jeddah to Madinah Direct Transfer</Link003></li>
                            <li><Link003 href="/services/ziyarat-tours" className="text-ink-muted hover:text-ink transition-colors text-[15px]">Makkah Ziyarat City Tours</Link003></li>
                            <li><Link003 href="/ramadan-2026" className="text-ink-muted hover:text-ink transition-colors text-[15px]">Ramadan 2026 Umrah Transport</Link003></li>
                        </ul>
                    </div>

                    {/* Column 3 - Services & Fleet */}
                    <div>
                        <h3 className="text-ink font-semibold text-[14px] uppercase tracking-wider mb-6">
                            Services & Fleet
                        </h3>
                        <ul className="space-y-3">
                            <li><Link003 href="/services/airport-transfers" className="text-ink-muted hover:text-ink transition-colors text-[15px]">Airport Transfers</Link003></li>
                            <li><Link003 href="/services/hotel-transfers" className="text-ink-muted hover:text-ink transition-colors text-[15px]">Hotel Transfers</Link003></li>
                            <li><Link003 href="/services/intercity-transfer" className="text-ink-muted hover:text-ink transition-colors text-[15px]">Intercity Transport</Link003></li>
                            <li><Link003 href="/fleet/gmc-yukon-at4" className="text-ink-muted hover:text-ink transition-colors text-[15px]">GMC Yukon XL — VIP SUV</Link003></li>
                            <li><Link003 href="/fleet/hyundai-staria" className="text-ink-muted hover:text-ink transition-colors text-[15px]">Hyundai Staria — Family MPV</Link003></li>
                            <li><Link003 href="/fleet/toyota-hiace" className="text-ink-muted hover:text-ink transition-colors text-[15px]">Toyota Hiace — Group Bus</Link003></li>
                            <li><Link003 href="/pricing" className="text-ink-muted hover:text-ink transition-colors text-[15px]">Pricing & Rates</Link003></li>
                            <li><Link href="/pricing/compare" className="text-gold-strong hover:text-ink transition-colors text-[15px]">Compare vs Other Platforms</Link></li>
                        </ul>
                    </div>

                    {/* Column 4 - Company & Trust */}
                    <div>
                        <h3 className="text-ink font-semibold text-[14px] uppercase tracking-wider mb-6">
                            Al Kiswah Transport
                        </h3>
                        <ul className="space-y-3">
                            <li><Link003 href="/about" className="text-ink-muted hover:text-ink transition-colors text-[15px]">About Us</Link003></li>
                            <li><Link003 href="/blog" className="text-ink-muted hover:text-ink transition-colors text-[15px]">Blog & Travel Guides</Link003></li>
                            <li><Link003 href="/contact" className="text-ink-muted hover:text-ink transition-colors text-[15px]">Contact Us</Link003></li>
                            <li><Link003 href="/safety" className="text-ink-muted hover:text-ink transition-colors text-[15px]">Safety Policy</Link003></li>
                            <li><Link003 href="/track-booking" className="text-ink-muted hover:text-ink transition-colors text-[15px]">Track My Booking</Link003></li>
                            {regions.slice(0, 4).map((region) => (
                                <li key={region.id}>
                                    <Link003 href={`/pilgrims/${region.id}`} className="text-ink-muted hover:text-ink transition-colors text-[15px]">
                                        Umrah Taxi {region.name}
                                    </Link003>
                                </li>
                            ))}
                            <li><Link003 href="/ar" className="text-ink-muted hover:text-ink transition-colors text-[15px]" dir="rtl">للمعتمرين العرب</Link003></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Nusuk Footer Seal */}
            <NusukFooterSeal />

            {/* Full-Width Trust Bar */}
            <div className="border-y border-border py-6 bg-surface-alt">
                <div className="container">
                    <div className="flex flex-col md:flex-row flex-wrap justify-between items-center gap-4 text-[13px] text-ink-muted font-medium">
                        <div className="flex items-center gap-2">
                            <span>🛡️</span>
                            <span>Ministry of Hajj Licensed</span>
                        </div>
                        <div className="hidden md:block w-px h-4 bg-border" />
                        <div className="flex items-center gap-2">
                            <span>✈️</span>
                            <span>Real-Time Flight Tracking</span>
                        </div>
                        <div className="hidden md:block w-px h-4 bg-border" />
                        <div className="flex items-center gap-2">
                            <span>💰</span>
                            <span>Fixed Prices — No Hidden Fees</span>
                        </div>
                        <div className="hidden md:block w-px h-4 bg-border" />
                        <div className="flex items-center gap-2">
                            <span>🕐</span>
                            <span>24/7 Support — Always Available</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Legal Bar */}
            <div className="container py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center text-center lg:text-left">
                    <div className="text-[13px] text-ink-muted">
                        © 2026 Al Kiswah Umrah Transport. All rights reserved. | Jeddah · Makkah · Madinah
                    </div>
                    
                    <div className="text-[11px] text-ink-muted/70 lg:text-center order-last lg:order-none flex flex-wrap justify-center gap-2">
                        <span>Serving pilgrims from:</span>
                        {regions.map((region, index) => (
                            <span key={region.id}>
                                <Link href={`/pilgrims/${region.id}`} className="hover:text-ink transition-colors">
                                    {region.name}
                                </Link>
                                {index < regions.length - 1 && <span className="mx-1">·</span>}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center justify-center lg:justify-end gap-6 text-[13px] text-ink-muted">
                        <Link href="/privacy" className="hover:text-ink transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-ink transition-colors">Terms of Service</Link>
                        <Link href="/sitemap.xml" className="hover:text-ink transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
