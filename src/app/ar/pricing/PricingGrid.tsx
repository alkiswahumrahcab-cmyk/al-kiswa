'use client';

import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { usePricing } from '@/context/PricingContext';
import { useCurrency } from '@/context/CurrencyContext';

const PRICING_CARDS = [
    {
        routeId: "692db09934f15bc89b45a5fd", // مطار جدة إلى مكة
        title: "مطار جدة ➔ مكة المكرمة",
        duration: "ساعة واحدة",
        features: [
            "الاستقبال والترحيب في المطار",
            "تتبع الرحلة الجوية",
            "انتظار مجاني لمدة 60 دقيقة",
            "المساعدة في حمل الأمتعة"
        ],
        link: "/ar/services/jeddah-airport-transfer",
        highlight: true
    },
    {
        routeId: "692db09934f15bc89b45a5ff", // مكة إلى المدينة
        title: "مكة المكرمة ➔ المدينة المنورة",
        duration: "4.5 ساعات",
        features: [
            "خدمة من الباب إلى الباب",
            "توقف للصلاة في الميقات",
            "استراحات للراحة حسب الطلب",
            "طريق سريع وآمن"
        ],
        link: "/ar/services/makkah-madinah-taxi",
        highlight: false
    },
    {
        routeId: "6949b368a41f6410e88ed732", // مزارات مكة
        title: "المزارات (جولة سياحية)",
        duration: "3 ساعات",
        features: [
            "زيارة المواقع التاريخية",
            "سائق ومرشد خاص",
            "توقف مرن للصور",
            "توصيل من وإلى الفندق"
        ],
        link: "/ar/services/ziyarat-tours",
        highlight: false
    }
];

export default function PricingGrid() {
    const { routes, calculatePrice, isLoading } = usePricing();
    const { currency, formatPrice } = useCurrency();

    if (isLoading) {
        return (
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto opacity-50 animate-pulse" dir="rtl">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-96 bg-white/5 rounded-3xl border border-white/10" />
                ))}
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto" dir="rtl">
            {PRICING_CARDS.map((card, idx) => {
                // Find base price for standard sedan
                const route = routes.find(r => r.id === card.routeId);
                const basePriceSar = route ? calculatePrice(route.id, 'camry').price : 0;
                
                // Format with selected currency
                const formatted = formatPrice(basePriceSar);

                return (
                    <div key={idx} className={`relative p-8 rounded-3xl border transition-all duration-300 group hover:-translate-y-2
                        ${card.highlight
                            ? 'bg-gradient-to-b from-white/10 to-black border-gold-primary shadow-[0_0_30px_rgba(212,175,55,0.15)]'
                            : 'bg-white/5 border-white/10 hover:border-gold-primary/50'
                        }`}>
                        {card.highlight && (
                            <div className="absolute -top-4 right-1/2 translate-x-1/2 bg-gold-primary text-black font-bold px-4 py-1 rounded-full text-sm uppercase tracking-wider shadow-lg">
                                الأكثر طلباً
                            </div>
                        )}
                        <div className="text-center mb-8">
                            <h3 className="text-xl font-bold text-white mb-4">{card.title}</h3>
                            <div className="flex justify-center items-end gap-1 mb-2">
                                <span className="text-sm text-gray-400 mb-2">من</span>
                                {currency === 'USD' && <span className="text-3xl font-bold text-gold-primary mb-1">$</span>}
                                <span className="text-5xl font-bold text-gold-primary">{formatted.amount}</span>
                                <span className="text-xl font-bold text-gray-400 mb-2">{currency}</span>
                            </div>
                            <p className="text-gray-500 font-light text-sm">{card.duration} • سيارة سيدان</p>
                        </div>

                        <ul className="space-y-4 mb-8">
                            {card.features.map((feat, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                                    <Check className="text-gold-primary shrink-0" size={18} />
                                    <span>{feat}</span>
                                </li>
                            ))}
                        </ul>

                        <Link
                            href={card.link}
                            className={`block w-full py-4 rounded-xl font-bold text-center uppercase tracking-wider transition-all
                                ${card.highlight
                                    ? 'bg-gold-primary text-black hover:bg-white hover:shadow-lg'
                                    : 'bg-white/10 text-white hover:bg-gold-primary hover:text-black'
                                }`}
                        >
                            تحقق من التوافر
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}
