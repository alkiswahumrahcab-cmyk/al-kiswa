import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import BookingFormSkeleton from '@/components/booking/BookingFormSkeleton';

const BookingForm = dynamic(() => import('@/components/booking/BookingForm'), {
    loading: () => <BookingFormSkeleton />
});


export async function generateMetadata() {
    return {
        title: "Book Umrah Taxi Online | Instant Confirmation | Al Kiswah Transport",
        description: "Book your private Umrah taxi in seconds. Jeddah Airport to Makkah, Makkah to Madinah, and Ziyarat tours. Pay on arrival. Instant confirmation. Book now.",
        keywords: [
            "book umrah taxi online",
            "umrah taxi booking instant confirmation",
            "jeddah to makkah taxi book now",
            "makkah to madinah transport booking",
            "pay on arrival umrah taxi",
            "al kiswah booking",
            "حجز تاكسي المعتمرين"
        ],
        alternates: {
            canonical: 'https://kiswahumrahcab.com/booking',
        },
        openGraph: {
            title: "Book Umrah Taxi Online | Instant Confirmation | Al Kiswah Transport",
            description: "Book your private Umrah taxi in seconds. Pay on arrival. Instant confirmation. No hidden fees.",
            url: "https://kiswahumrahcab.com/booking",
            type: "website",
        }
    };
}

export default function BookingPage() {
    return (
        <main className="min-h-screen bg-bg relative overflow-hidden">
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
