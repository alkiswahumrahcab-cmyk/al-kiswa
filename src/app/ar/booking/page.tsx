import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import BookingFormSkeleton from '@/components/booking/BookingFormSkeleton';

const BookingForm = dynamic(() => import('@/components/booking/BookingForm'), {
    loading: () => <BookingFormSkeleton />
});
import { CheckCircle2 } from 'lucide-react';
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
        <main className="min-h-screen bg-bg relative overflow-hidden" dir="rtl" lang="ar">
            {/* Ambient Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-soft/50 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-surface-alt rounded-full blur-[120px] pointer-events-none" />

            <div className="container relative z-20 pt-8 md:pt-10 pb-10 px-4 max-w-5xl mx-auto">

                {/* Booking Form */}
                <div className="booking-container">
                    <Suspense fallback={<BookingFormSkeleton />}>
                        <BookingForm />
                    </Suspense>
                </div>

                {/* Pay on Arrival Guarantee Bar - Translated to Arabic */}
                <div className="mt-6 mb-8 p-5 rounded-xl bg-surface border border-border flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 shadow-sm">
                    {[
                        { icon: <CheckCircle2 size={18} className="text-gold shrink-0" />, text: 'ادفع نقداً عند الوصول — بدون دفع مسبق' },
                        { icon: <CheckCircle2 size={18} className="text-gold shrink-0" />, text: 'إلغاء مجاني حتى ٢٤ ساعة قبل الرحلة' },
                        { icon: <CheckCircle2 size={18} className="text-gold shrink-0" />, text: 'سعر ثابت — بدون رسوم خفية أو مفاجآت' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-body font-medium font-ar-body">
                            {item.icon}
                            <span>{item.text}</span>
                        </div>
                    ))}
                </div>

                {/* Booking Page Pixel Event */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            if (typeof fbq === 'function') {
                                fbq('track', 'InitiateCheckout');
                            }
                        `
                    }}
                />

            </div>
        </main>
    );
}
