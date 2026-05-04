'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Car, Plane, Building2 } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';

interface ServiceItem {
    id: string;
    title: string;
    subtitle: string;
    description: React.ReactNode;
    image: string;
    alt: string;
    icon: React.ReactElement;
    link: string;
}

const enServices: ServiceItem[] = [
    {
        id: 'intercity',
        title: 'Intercity Transport',
        subtitle: 'Makkah • Madinah • Jeddah',
        description: (
            <>
                Experience safe, comfortable <Link href="/services/intercity-transfer" className="text-gold-primary hover:underline">intercity travel</Link> between major Saudi cities. Our premium intercity transport ensures a smooth journey for pilgrims performing Umrah and Ziyarat.
            </>
        ),
        image: '/images/services/intercity-transport-new.png',
        alt: 'GMC Yukon Intercity Taxi Makkah to Madinah',
        icon: <Car size={32} />,
        link: '/services/intercity-transfer',
    },
    {
        id: 'airport-pickups',
        title: 'Airport Transport',
        subtitle: 'Jeddah (KAIA) • Madinah',
        description: (
            <>
                Seamless pickup and drop-off from <Link href="/services/airport-transfers" className="text-gold-primary hover:underline">Jeddah and Madinah airports</Link>. We offer real-time flight tracking, professional meet-and-greet service, and luggage assistance.
            </>
        ),
        icon: <Plane size={32} />,
        image: '/images/services/airport-transport-new.png',
        alt: 'Jeddah Airport Taxi Pickup Service',
        link: '/services/airport-transfers',
    },
    {
        id: 'hotel-transfers',
        title: 'Hotel Transfers',
        subtitle: 'Door-to-Door • Holy Cities',
        description: (
            <>
                Quick and reliable <Link href="/services/hotel-transfers" className="text-gold-primary hover:underline">transfers between your hotel</Link> and the Holy Mosques. Enjoy premium comfort and cleanliness, perfectly suitable for families and groups.
            </>
        ),
        icon: <Building2 size={32} />,
        image: '/images/services/hotel-transfers-new.png',
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
                استمتع برحلة آمنة ومريحة بين المدن السعودية الكبرى مع <Link href="/ar/services/intercity-transfer" className="text-gold-primary hover:underline">خدمة النقل البيني</Link> المتميزة. نضمن لك رحلة سلسة أثناء أداء العمرة والزيارات.
            </>
        ),
        image: '/images/services/intercity-transport-new.png',
        alt: 'تاكسي GMC يونك من مكة إلى المدينة المنورة',
        icon: <Car size={32} />,
        link: '/ar/services/intercity-transfer',
    },
    {
        id: 'airport-pickups',
        title: 'نقل المطارات',
        subtitle: 'مطار الملك عبدالعزيز • مطار المدينة',
        description: (
            <>
                استقبال وتوصيل سلس من <Link href="/ar/services/airport-transfers" className="text-gold-primary hover:underline">مطار جدة والمدينة المنورة</Link>. نتابع رحلتك الجوية ونصلك في الوقت المحدد مع خدمة حمل الأمتعة.
            </>
        ),
        icon: <Plane size={32} />,
        image: '/images/services/airport-transport-new.png',
        alt: 'استقبال من مطار الملك عبدالعزيز جدة',
        link: '/ar/services/airport-transfers',
    },
    {
        id: 'hotel-transfers',
        title: 'التوصيل للفنادق',
        subtitle: 'من الباب للباب • المدن المقدسة',
        description: (
            <>
                توصيل سريع وموثوق <Link href="/ar/services/hotel-transfers" className="text-gold-primary hover:underline">بين فندقكم والمسجد الحرام</Link>. خدمة مريحة ونظيفة مناسبة للعائلات والمجموعات.
            </>
        ),
        icon: <Building2 size={32} />,
        image: '/images/services/hotel-transfers-new.png',
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
        ? { eyebrow: 'خدماتنا الأساسية', title: <>نقل فاخر لـ<span className="bg-gradient-to-r from-gold-primary to-gold-metallic bg-clip-text text-transparent"> رحلتكم الروحانية</span></>, sub: 'حلول سفر شاملة مصممة لضيوف الرحمن. من استقبال المطارات إلى النقل البيني، نضمن كل ميل مريح وآمن وكريم.' }
        : { eyebrow: 'Our Core Services', title: <>Premium Transport for <span className="bg-gradient-to-r from-gold-primary to-gold-metallic bg-clip-text text-transparent">Your Spiritual Journey</span></>, sub: 'Comprehensive travel solutions designed for the Guests of Allah. From airport arrivals to intercity travel, we ensure every mile is comfortable, safe, and dignified.' };

    return (
        <section className="py-20 md:py-32 relative overflow-hidden bg-primary-black">
            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold-metallic/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="container relative z-10 px-4 md:px-8">
                <FadeIn>
                    <div className="text-center max-w-4xl mx-auto mb-20">
                        <span className="text-gold-primary font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-4 block">{heading.eyebrow}</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-sans text-white mb-8 tracking-tight leading-tight">
                            {heading.title}
                        </h2>
                        <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto font-light">
                            {heading.sub}
                        </p>
                    </div>
                </FadeIn>

                <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                    {services.map((service, index) => (
                        <FadeIn key={service.id} delay={index * 0.15}>
                            <article className="group h-full relative border border-white/10 hover:border-gold-primary/50 rounded-[2.5rem] transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.15)] hover:-translate-y-2 bg-white/5 backdrop-blur-sm overflow-hidden flex flex-col">
                                <Link href={service.link} className="relative h-72 md:h-80 overflow-hidden block">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                                    <Image
                                        src={service.image}
                                        alt={service.alt}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <div className="absolute top-6 left-6 z-20 w-14 h-14 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl group-hover:bg-gold-primary group-hover:border-gold-primary group-hover:text-black transition-all duration-300 group-hover:scale-110">
                                        {React.cloneElement(service.icon as React.ReactElement<any>, { size: 28 })}
                                    </div>
                                    <div className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">
                                        <ArrowRight size={18} />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                                        <p className="text-gold-primary text-xs font-bold uppercase tracking-widest mb-2 opacity-90">{service.subtitle}</p>
                                        <h3 className="text-3xl font-bold font-sans text-white leading-tight group-hover:text-gold-primary transition-colors duration-300">
                                            {service.title}
                                        </h3>
                                    </div>
                                </Link>
                                <div className="p-8 pt-6 flex flex-col flex-1 bg-gradient-to-b from-transparent to-black/20">
                                    <p className="text-gray-400 leading-relaxed mb-8 flex-1">{service.description}</p>
                                    <Link href={service.link} className="inline-flex items-center gap-3 text-white font-bold uppercase tracking-wider text-sm group/btn group-hover:text-gold-primary transition-colors mt-auto">
                                        <span className="border-b-2 border-white/20 group-hover:border-gold-primary transition-colors py-1">
                                            {lang === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                                        </span>
                                        <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
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
