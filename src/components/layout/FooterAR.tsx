'use client';

import Link from 'next/link';
import { useSettings } from '@/context/SettingsContext';
import { regions } from '@/data/regions';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import NusukFooterSeal from '@/components/trust/NusukFooterSeal';
import ThemeLogo from '@/components/common/ThemeLogo';
import { Link003 } from '@/components/ui/skiper-ui/skiper40';

export default function FooterAR() {
    const { settings } = useSettings();

    // Default to a fallback number if settings hasn't loaded yet
    const whatsappNumber = settings?.contact?.whatsapp || "+966548707332";

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "TransportationCompany",
        "name": "الكسوة لنقل المعتمرين",
        "url": "https://kiswahumrahcab.com/ar",
        "logo": "https://kiswahumrahcab.com/logo.svg",
        "image": "https://kiswahumrahcab.com/images/blog-hero-professional.png",
        "description": "خدمة نقل معتمرين مرخصة وخاصة بين مطار جدة ومكة المكرمة والمدينة المنورة.",
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
        }
    };

    return (
        <footer className="bg-ink-bg border-t border-ink-surface text-on-ink relative" dir="rtl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            {/* Main 4-Column Grid */}
            <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Column 1 - Brand Block */}
                    <div className="space-y-6">
                        <Link href="/ar" className="inline-block relative group mb-4">
                            <ThemeLogo width={160} height={48} />
                        </Link>
                        <div className="space-y-2">
                            <p className="text-on-ink-muted text-sm leading-relaxed">
                                رفيقكم الأمين في رحلة العمرة المباركة.
                            </p>
                        </div>
                        <a 
                            href={settings?.contact?.social?.googleBusiness || "https://share.google/ARbbVaAackyOs8N7G"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group w-fit hover:bg-on-ink/5 rounded-lg border border-transparent hover:border-ink-surface transition-all p-2 -mr-2"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-yellow-400 text-sm tracking-widest group-hover:scale-105 transition-transform origin-right">⭐⭐⭐⭐⭐</span>
                                <span className="text-[10px] font-bold text-on-ink bg-blue-600/20 px-2 py-0.5 rounded border border-blue-500/30">موثوق من جوجل</span>
                            </div>
                            <span className="text-xs text-on-ink-muted mt-1 block group-hover:text-on-ink transition-colors">تقييم 5.0 — اقرأ مراجعاتنا</span>
                        </a>
                        <a
                            href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-6 rounded-md transition-colors w-full sm:w-auto text-sm"
                        >
                            احجز عبر الواتساب
                        </a>
                        <div className="pt-2">
                            <p className="text-xs text-on-ink-muted mb-2 font-medium">العملات المقبولة:</p>
                            <div className="flex flex-wrap gap-2 text-[10px] font-bold text-on-ink-muted">
                                <span className="bg-ink-surface px-2 py-1 rounded">ريال</span>
                                <span className="bg-ink-surface px-2 py-1 rounded">دولار</span>
                                <span className="bg-ink-surface px-2 py-1 rounded">جنيه</span>
                                <span className="bg-ink-surface px-2 py-1 rounded">يورو</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-4 pt-2">
                            {settings?.contact?.social?.facebook && (
                                <a href={settings.contact.social.facebook} target="_blank" rel="noopener noreferrer" className="text-on-ink-muted hover:text-blue-500 transition-colors" aria-label="Facebook">
                                    <Facebook size={20} strokeWidth={1.5} />
                                </a>
                            )}
                            {settings?.contact?.social?.instagram && (
                                <a href={settings.contact.social.instagram} target="_blank" rel="noopener noreferrer" className="text-on-ink-muted hover:text-pink-500 transition-colors" aria-label="Instagram">
                                    <Instagram size={20} strokeWidth={1.5} />
                                </a>
                            )}
                            {settings?.contact?.social?.twitter && (
                                <a href={settings.contact.social.twitter} target="_blank" rel="noopener noreferrer" className="text-on-ink-muted hover:text-blue-400 transition-colors" aria-label="Twitter">
                                    <Twitter size={20} strokeWidth={1.5} />
                                </a>
                            )}
                            {settings?.contact?.social?.linkedin && (
                                <a href={settings.contact.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-on-ink-muted hover:text-blue-600 transition-colors" aria-label="LinkedIn">
                                    <Linkedin size={20} strokeWidth={1.5} />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Column 2 - Popular Routes */}
                    <div>
                        <h3 className="text-on-ink font-semibold text-[14px] uppercase tracking-wider mb-6">
                            مسارات العمرة الشائعة
                        </h3>
                        <ul className="space-y-3">
                            <li><Link003 href="/ar/services/jeddah-airport-transfer" className="text-on-ink-muted hover:text-on-ink transition-colors text-[15px]">تاكسي مطار جدة إلى مكة</Link003></li>
                            <li><Link003 href="/ar/services/makkah-madinah-taxi" className="text-on-ink-muted hover:text-on-ink transition-colors text-[15px]">تاكسي خاص من مكة للمدينة</Link003></li>
                            <li><Link003 href="/ar/services/madinah-airport-transfer" className="text-on-ink-muted hover:text-on-ink transition-colors text-[15px]">مطار المدينة إلى الفندق</Link003></li>
                            <li><Link003 href="/ar/services/intercity-transfer" className="text-on-ink-muted hover:text-on-ink transition-colors text-[15px]">نقل مباشر من جدة للمدينة</Link003></li>
                            <li><Link003 href="/ar/services/ziyarat-tours" className="text-on-ink-muted hover:text-on-ink transition-colors text-[15px]">جولات المزارات في مكة</Link003></li>
                            <li><Link003 href="/ar/ramadan-2026" className="text-on-ink-muted hover:text-on-ink transition-colors text-[15px]">نقل العمرة رمضان 2026</Link003></li>
                        </ul>
                    </div>

                    {/* Column 3 - Services & Fleet */}
                    <div>
                        <h3 className="text-on-ink font-semibold text-[14px] uppercase tracking-wider mb-6">
                            الخدمات والأسطول
                        </h3>
                        <ul className="space-y-3">
                            <li><Link003 href="/ar/services/airport-transfers" className="text-on-ink-muted hover:text-on-ink transition-colors text-[15px]">نقل المطارات</Link003></li>
                            <li><Link003 href="/ar/services/hotel-transfers" className="text-on-ink-muted hover:text-on-ink transition-colors text-[15px]">نقل الفنادق</Link003></li>
                            <li><Link003 href="/ar/services/intercity-transfer" className="text-on-ink-muted hover:text-on-ink transition-colors text-[15px]">النقل بين المدن</Link003></li>
                            <li><Link003 href="/ar/fleet/gmc-yukon-at4" className="text-on-ink-muted hover:text-on-ink transition-colors text-[15px]">جي إم سي يوكن XL — سيارة كبار الشخصيات</Link003></li>
                            <li><Link003 href="/ar/fleet/hyundai-staria" className="text-on-ink-muted hover:text-on-ink transition-colors text-[15px]">هيونداي ستاريا — سيارة عائلية</Link003></li>
                            <li><Link003 href="/ar/fleet/toyota-hiace" className="text-on-ink-muted hover:text-on-ink transition-colors text-[15px]">تويوتا هايس — حافلة جماعية</Link003></li>
                            <li><Link003 href="/ar/pricing" className="text-on-ink-muted hover:text-on-ink transition-colors text-[15px]">الأسعار والتسعيرة</Link003></li>
                        </ul>
                    </div>

                    {/* Column 4 - Company & Trust */}
                    <div>
                        <h3 className="text-on-ink font-semibold text-[14px] uppercase tracking-wider mb-6">
                            شركة الكسوة للنقل
                        </h3>
                        <ul className="space-y-3">
                            <li><Link003 href="/ar/about" className="text-on-ink-muted hover:text-on-ink transition-colors text-[15px]">معلومات عنا</Link003></li>
                            <li><Link003 href="/ar/blog" className="text-on-ink-muted hover:text-on-ink transition-colors text-[15px]">المدونة ودلائل السفر</Link003></li>
                            <li><Link003 href="/ar/contact" className="text-on-ink-muted hover:text-on-ink transition-colors text-[15px]">اتصل بنا</Link003></li>
                            <li><Link003 href="/ar/safety" className="text-on-ink-muted hover:text-on-ink transition-colors text-[15px]">سياسة الأمان</Link003></li>
                            <li><Link003 href="/ar/track-booking" className="text-on-ink-muted hover:text-on-ink transition-colors text-[15px]">تتبع حجزك</Link003></li>
                            <li><Link003 href="/" className="text-on-ink-muted hover:text-on-ink transition-colors text-[15px]" dir="ltr">English Version</Link003></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Nusuk Footer Seal */}
            <NusukFooterSeal />

            {/* Full-Width Trust Bar */}
            <div className="border-y border-ink-surface py-6 bg-white/5">
                <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12">
                    <div className="flex flex-col md:flex-row flex-wrap justify-between items-center gap-4 text-[13px] text-on-ink-muted font-medium">
                        <div className="flex items-center gap-2">
                            <span>🛡️</span>
                            <span>مرخص من وزارة الحج والعمرة</span>
                        </div>
                        <div className="hidden md:block w-px h-4 bg-ink-surface" />
                        <div className="flex items-center gap-2">
                            <span>✈️</span>
                            <span>تتبع الرحلات الجوية لحظة بلحظة</span>
                        </div>
                        <div className="hidden md:block w-px h-4 bg-ink-surface" />
                        <div className="flex items-center gap-2">
                            <span>💰</span>
                            <span>أسعار ثابتة — لا رسوم خفية</span>
                        </div>
                        <div className="hidden md:block w-px h-4 bg-ink-surface" />
                        <div className="flex items-center gap-2">
                            <span>🕐</span>
                            <span>دعم على مدار الساعة — متواجدون دائماً</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Legal Bar */}
            <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center text-center lg:text-right">
                    <div className="text-[13px] text-on-ink-muted">
                        © 2026 شركة الكسوة لنقل المعتمرين. جميع الحقوق محفوظة. | جدة · مكة · المدينة
                    </div>
                    
                    <div className="text-[11px] text-on-ink-muted/70 lg:text-center order-last lg:order-none flex flex-wrap justify-center gap-2">
                        <span>نخدم الحجاج من:</span>
                        {regions.map((region, index) => (
                            <span key={region.id}>
                                <Link href={`/ar/pilgrims/${region.id}`} className="hover:text-on-ink-muted transition-colors">
                                    {region.name}
                                </Link>
                                {index < regions.length - 1 && <span className="mx-1">·</span>}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center justify-center lg:justify-end gap-6 text-[13px] text-on-ink-muted" dir="rtl">
                        <Link href="/ar/privacy" className="hover:text-on-ink transition-colors">سياسة الخصوصية</Link>
                        <Link href="/ar/terms" className="hover:text-on-ink transition-colors">شروط الخدمة</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
