'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PremiumIcon, PremiumIconName } from '@/components/ui/PremiumIcon';
import FadeIn from '@/components/common/FadeIn';

interface ServiceItem {
    id: string;
    title: string;
    subtitle: string;
    description: React.ReactNode;
    image: string;
    alt: string;
    iconName: PremiumIconName;
    link: string;
}

const enServices: ServiceItem[] = [
    {
        id: 'intercity',
        title: 'Intercity Transport',
        subtitle: 'Makkah • Madinah • Jeddah',
        description: (
            <>
                Experience safe, comfortable <Link href="/services/intercity-transfer" className="text-gold hover:underline">intercity travel</Link> between major Saudi cities. Our premium intercity transport ensures a smooth journey for pilgrims performing Umrah and Ziyarat.
            </>
        ),
        image: '/images/hero/intercitytransfer.jpg',
        alt: 'GMC Yukon Intercity Taxi Makkah to Madinah',
        iconName: 'executive-sedan',
        link: '/services/intercity-transfer',
    },
    {
        id: 'airport-pickups',
        title: 'Airport Transport',
        subtitle: 'Jeddah (KAIA) • Madinah',
        description: (
            <>
                Seamless pickup and drop-off from <Link href="/services/airport-transfers" className="text-gold hover:underline">Jeddah and Madinah airports</Link>. We offer real-time flight tracking, professional meet-and-greet service, and luggage assistance.
            </>
        ),
        iconName: 'airport',
        image: '/images/hero/airportransfer.jpg',
        alt: 'Jeddah Airport Taxi Pickup Service',
        link: '/services/airport-transfers',
    },
    {
        id: 'hotel-transfers',
        title: 'Hotel Transfers',
        subtitle: 'Door-to-Door • Holy Cities',
        description: (
            <>
                Quick and reliable <Link href="/services/hotel-transfers" className="text-gold hover:underline">transfers between your hotel</Link> and the Holy Mosques. Enjoy premium comfort and cleanliness, perfectly suitable for families and groups.
            </>
        ),
        iconName: 'hotel-transfer',
        image: '/images/hero/hotel-transfers.jpg',
        alt: 'Private Hotel Transfer Makkah to Haram',
        link: '/services/hotel-transfers',
    }
];

const arServices: ServiceItem[] = [
    {
        id: 'intercity',
        title: 'النقل بين المدن',
        subtitle: 'مكة المكرمة • المدينة المنورة • جدة',
        description: (
            <>
                استمتع برحلة آمنة ومريحة بين المدن السعودية الكبرى مع <Link href="/ar/services/intercity-transfer" className="text-gold hover:underline">خدمة النقل البيني</Link> المتميزة. نضمن لك رحلة سلسة أثناء أداء العمرة والزيارات.
            </>
        ),
        image: '/images/hero/intercitytransfer.jpg',
        alt: 'تاكسي GMC يونك من مكة إلى المدينة المنورة',
        iconName: 'executive-sedan',
        link: '/ar/services/intercity-transfer',
    },
    {
        id: 'airport-pickups',
        title: 'نقل المطارات',
        subtitle: 'مطار الملك عبدالعزيز • مطار المدينة',
        description: (
            <>
                استقبال وتوصيل سلس من <Link href="/ar/services/airport-transfers" className="text-gold hover:underline">مطار جدة والمدينة المنورة</Link>. نتابع رحلتك الجوية ونصلك في الوقت المحدد مع خدمة حمل الأمتعة.
            </>
        ),
        iconName: 'airport',
        image: '/images/hero/airportransfer.jpg',
        alt: 'استقبال من مطار الملك عبدالعزيز جدة',
        link: '/ar/services/airport-transfers',
    },
    {
        id: 'hotel-transfers',
        title: 'التوصيل للفنادق',
        subtitle: 'من الباب للباب • المدن المقدسة',
        description: (
            <>
                توصيل سريع وموثوق <Link href="/ar/services/hotel-transfers" className="text-gold hover:underline">بين فندقكم والمسجد الحرام</Link>. خدمة مريحة ونظيفة مناسبة للعائلات والمجموعات.
            </>
        ),
        iconName: 'hotel-transfer',
        image: '/images/hero/hotel-transfers.jpg',
        alt: 'توصيل خاص من الفندق إلى الحرم المكي',
        link: '/ar/services/hotel-transfers',
    }
];

interface Props {
    lang?: 'ar' | 'en';
}

export default function TransportServices({ lang = 'en' }: Props) {
    const services = lang === 'ar' ? arServices : enServices;
    const heading = lang === 'ar'
        ? { eyebrow: 'خدماتنا الأساسية', title: <>نقل فاخر لـ<span className="bg-gradient-to-r from-gold-deep to-gold bg-clip-text text-transparent"> رحلتكم الروحانية</span></>, sub: 'حلول سفر شاملة مصممة لضيوف الرحمن. من استقبال المطارات إلى النقل البيني، نضمن كل ميل مريح وآمن وكريم.' }
        : { eyebrow: 'Our Core Services', title: <>Premium Transport for <span className="bg-gradient-to-r from-gold-deep to-gold bg-clip-text text-transparent">Your Spiritual Journey</span></>, sub: 'Comprehensive travel solutions designed for the Guests of Allah. From airport arrivals to intercity travel, we ensure every mile is comfortable, safe, and dignified.' };

    return (
        <section className="pt-20 md:pt-32 pb-10 md:pb-16 relative overflow-hidden bg-bg">
            <div className="container relative z-10 px-4 md:px-8">
                <FadeIn>
                    <div className="text-center max-w-4xl mx-auto mb-20">
                        <span className={`text-gold font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-4 block ${lang === 'ar' ? 'font-ar-body tracking-normal' : ''}`}>{heading.eyebrow}</span>
                        <h2 className={`text-4xl md:text-5xl lg:text-6xl font-semibold text-ink mb-8 tracking-tight leading-tight ${lang === 'ar' ? 'font-ar-head' : 'font-display font-black'}`}>
                            {heading.title}
                        </h2>
                        <p className={`text-lg md:text-xl text-ink-muted leading-relaxed max-w-2xl mx-auto font-light ${lang === 'ar' ? 'font-ar-body' : ''}`}>
                            {heading.sub}
                        </p>
                    </div>
                </FadeIn>

                <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                    {services.map((service, index) => (
                        <FadeIn key={service.id} delay={index * 0.15}>
                            <article className="card group h-full relative hover:border-gold/50 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col">
                                <Link href={service.link} className="relative h-64 md:h-72 overflow-hidden block">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                                    <Image
                                        src={service.image}
                                        alt={service.alt}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                                        style={{ objectFit: 'cover' }}
                                    />

                                    <div className={`absolute top-6 ${lang === 'ar' ? 'right-6 -translate-x-4 group-hover:translate-x-0' : 'left-6 translate-x-4 group-hover:translate-x-0'} z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100`}>
                                        <ArrowRight size={18} className={lang === 'ar' ? 'rotate-180' : ''} />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
                                        <p className={`text-gold text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 opacity-90 ${lang === 'ar' ? 'font-ar-body tracking-normal' : ''}`}>{service.subtitle}</p>
                                        <h3 className={`text-2xl md:text-3xl font-semibold text-white leading-tight group-hover:text-gold transition-colors duration-300 ${lang === 'ar' ? 'font-ar-head' : 'font-display'}`}>
                                            {service.title}
                                        </h3>
                                    </div>
                                </Link>
                                <div className="p-6 md:p-8 pt-6 flex flex-col flex-1">
                                    <p className={`text-ink-muted leading-relaxed mb-6 text-sm md:text-base ${lang === 'ar' ? 'font-ar-body' : ''}`}>{service.description}</p>
                                    <Link href={service.link} className={`inline-flex items-center gap-3 text-ink font-bold uppercase tracking-wider text-xs md:text-sm group/btn group-hover:text-gold transition-colors mt-auto ${lang === 'ar' ? 'font-ar-body tracking-normal' : ''}`}>
                                        <span className="border-b-2 border-border group-hover:border-gold transition-colors py-1">
                                            {lang === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                                        </span>
                                        <ArrowRight size={16} className={`transform transition-transform ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                                    </Link>
                                </div>
                            </article>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
