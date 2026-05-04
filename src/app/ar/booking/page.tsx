import React, { Suspense } from 'react';
import BookingWizard from '@/components/booking/BookingWizard';
import { generateMetadataAlternates } from '@/lib/hreflang';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "احجز تاكسي عمرة | الكسوة لنقل المعتمرين | حجز فوري ٢٤/٧",
        description: "احجز رحلتك الآن مع الكسوة لنقل المعتمرين. نقل خاص من مطار جدة إلى مكة المكرمة والمدينة المنورة. أسعار ثابتة وشفافة بدون رسوم مخفية. دعم ٢٤/٧.",
        keywords: [
            "حجز تاكسي عمرة",
            "نقل معتمرين جدة مكة",
            "حجز رحلة من مطار جدة",
            "توصيل من مطار الملك عبدالعزيز",
            "سيارة خاصة للعمرة",
            "أسعار نقل العمرة",
            "حجز باص هايس مكة",
            "تاكسي مكة المدينة",
            "Umrah taxi booking Jeddah",
            "book Umrah transport Saudi Arabia",
        ],
        alternates: {
            ...generateMetadataAlternates("/booking"),
            canonical: "https://kiswahumrahcab.com/ar/booking",
        },
        openGraph: {
            title: "احجز تاكسي عمرة | الكسوة لنقل المعتمرين",
            description: "احجز رحلتك الخاصة من مطار جدة إلى مكة المكرمة أو المدينة المنورة. أسعار ثابتة وموثوقة.",
            url: "https://kiswahumrahcab.com/ar/booking",
            type: "website",
            locale: "ar_SA",
            images: [{ url: "https://kiswahumrahcab.com/images/og-image.jpg", width: 1200, height: 630 }],
        },
    };
}

export default function ArabicBookingPage() {
    return (
        <main className="min-h-screen bg-primary-black relative overflow-hidden" dir="rtl" lang="ar">
            {/* Background */}
            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none" />
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gold-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold-secondary/5 rounded-full blur-[120px] pointer-events-none" />

            {/* SEO H1 - hidden visually but indexed by Google */}
            <h1 className="sr-only">احجز رحلة عمرة — الكسوة لنقل المعتمرين</h1>

            {/* Arabic intro header */}
            <div className="relative z-10 text-center pt-28 pb-6 px-4">
                <p className="text-gold-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">
                    حجز فوري — ٢٤/٧
                </p>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-sans">
                    احجز <span className="text-gold-primary">رحلتك</span> الآن
                </h2>
                <p className="text-slate-400 text-base max-w-xl mx-auto">
                    نقل خاص وموثوق من مطار جدة إلى مكة المكرمة والمدينة المنورة. أسعار شفافة بدون مفاجآت.
                </p>
            </div>

            <div className="container relative z-20 pb-20 px-4">
                <Suspense fallback={
                    <div className="max-w-4xl mx-auto h-[600px] w-full animate-pulse bg-white/5 rounded-[2rem] border border-white/10 flex items-center justify-center">
                        <div className="text-gold-primary/50 text-sm font-medium tracking-widest">جاري التحميل...</div>
                    </div>
                }>
                    <BookingWizard />
                </Suspense>
            </div>
        </main>
    );
}
