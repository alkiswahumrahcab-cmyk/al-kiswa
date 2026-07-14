import { generateMetadataAlternates } from "@/lib/hreflang";
import type { Metadata } from "next";
import Hero from '@/components/common/Hero';
import Link from 'next/link';
import { ArrowRight, Shield, Star, Briefcase, Users, Wifi, LayoutGrid, MapPin } from 'lucide-react';
import FAQSection from '@/components/services/FAQSection';
import { getSettings } from '@/lib/settings-storage';
import FleetCarouselWrapper from '@/components/home/FleetCarouselWrapper';
import FleetPricingGrid from '@/components/fleet/FleetPricingGrid';
import FleetFeatureImage from '@/components/fleet/FleetFeatureImage';
import Interior360Viewer from '@/components/fleet/Interior360ViewerClient';

import { vehicleService } from '@/services/vehicleService';

const generateJsonLd = (vehicleData: any) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": vehicleData?.name || "Hyundai H1 Starex Van Transport",
    "image": "https://alkiswahumrahtransport.com/images/fleet/starex-hero-professional.webp",
    "description": `Book luxury ${vehicleData?.name || 'Hyundai H1 Starex'} in Makkah & Madinah. ${vehicleData?.passengers || 7} Seater SUV for VIP Umrah transport.`,
    "brand": { "@type": "Brand", "name": "Hyundai" },
    "offers": { 
        "@type": "Offer", 
        "price": vehicleData?.basePrice?.toString() || "250", 
        "priceCurrency": "SAR", 
        "availability": "https://schema.org/InStock",
        "priceValidUntil": '2026-12-31'
    }
});

export async function generateMetadata(): Promise<Metadata> {
    const vehicles = await vehicleService.getActiveVehicles();
    const vehicleData = vehicles.find((v: any) => v.name.toLowerCase().includes('starex'));

    return {
        title: vehicleData ? vehicleData.name + " Umrah Minivan Transport | Al Kiswah" : "Hyundai Starex Umrah Transport | Al Kiswah",
        description: vehicleData ? `Book ${vehicleData.name} in Makkah. ${vehicleData.passengers}-seater family minivan for Umrah transport. Fixed price transfers.` : "Book Hyundai Starex in Makkah. 9-seater family minivan for Umrah transport. Fixed price transfers from Jeddah Airport.",
        keywords: [
            "hyundai starex umrah transport",
            "family minivan taxi makkah",
            "jeddah airport to makkah transfer",
            "starex umrah cab",
            "??? ????? ???",
            "????? ???? ???"
        ],
        alternates: generateMetadataAlternates("/fleet/hyundai-starex"),
    };
}

const starexFAQs = [
    {
        question: "How many passengers fits in Hyundai H1 Starex?",
        answer: "The Hyundai H1 Starex is spacious and seats up to 7 passengers comfortably, making it an excellent choice for medium-sized families or groups."
    },
    {
        question: "Is there enough space for luggage?",
        answer: "Yes, the H1 has a generous cargo area that can easily accommodate 5-6 standard suitcases along with the passengers."
    },
    {
        question: "Is this vehicle suitable for long distance travel in Saudi Arabia?",
        answer: "Absolutely. The H1 is built for long journeys, offering good legroom, dual air conditioning, and a stable ride on highways between Jeddah, Makkah, and Madinah."
    },
];

export default async function HyundaiStarexPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=I%20am%20interested%20in%20booking%20Hyundai%20H1%20Starex%20for%20Umrah`;

    const vehicles = await vehicleService.getActiveVehicles();
    const vehicleData = vehicles.find((v: any) => v.name.toLowerCase().includes('starex'));

    // Try to get dynamic ID, fallback to old hardcoded Mongoose ID if not found
    const starexId = vehicleData?.id || '692db09834f15bc89b45a5fa';
    const starexImage = '/images/fleet/starex-hero-professional.webp';

    const jsonLd = generateJsonLd(vehicleData);

    return (
        <main className="overflow-x-hidden">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Hero
                title="Hyundai H1 Starex | Best Family Van for Umrah"
                subtitle="The practical choice for family travel between Jeddah, Makkah, and Madinah. Reliable, spacious, and perfect for groups."
                bgImage={starexImage}
                badge="Family Favorite"
                ctaText="Book via WhatsApp"
                ctaLink={whatsappLink}
                layout="center"
            />

            <FleetPricingGrid
                vehicleId={starexId}
                vehicleImage="/images/fleet/hyundai-h1.webp"
                vehicleType="starex"
                title="Hyundai Starex Rates | Jeddah, Makkah, Madinah"
                subtitle="Affordable comfort for up to 7 passengers. Great value for group travel."
            />

            {/* Vehicle Highlights */}
            <section className="py-16 bg-surface">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                            <FleetFeatureImage
                                src="/images/fleet/starex-feature.webp"
                                alt="Hyundai H1 Starex Interior"
                                fallbackSrc={starexImage}
                                className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute bottom-4 left-4 bg-gold text-ink px-4 py-1 rounded-full text-sm font-bold">
                                Value Choice
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold mb-6 font-playfair text-ink">
                                Why Book Hyundai Starex for Makkah Travel?
                            </h2>
                            <p className="text-ink-muted mb-6 leading-relaxed">
                                The Hyundai H1 (Starex) is the top choice for families performing Umrah. It offers excellent value for trips from <Link href="/services/jeddah-airport-transfer" className="text-gold-strong hover:underline">Jeddah Airport</Link> to Makkah and
                                provides a comfortable ride for Ziyarat tours in the Holy Cities.
                            </p>

                            <div className="bg-gold/5 border border-gold/20 p-4 rounded-xl mb-8">
                                <h3 className="font-bold text-gold-strong mb-1 flex items-center gap-2">
                                    <Star size={18} /> Who Should Choose This Vehicle?
                                </h3>
                                <p className="text-sm text-ink-muted">
                                    Best for budget-conscious families and medium-sized groups (up to 7 passengers) who need more luggage space than a sedan but want a more affordable option than the Staria or Yukon.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 font-bold text-ink">
                                        <Users className="text-gold" size={20} /> 7 Passengers
                                    </div>
                                    <p className="text-sm text-ink-muted">Ample room for full families</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 font-bold text-ink">
                                        <Briefcase className="text-gold" size={20} /> 6 Suitcases
                                    </div>
                                    <p className="text-sm text-ink-muted">Large rear cargo capacity</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 font-bold text-ink">
                                        <LayoutGrid className="text-gold" size={20} /> High Roof
                                    </div>
                                    <p className="text-sm text-ink-muted">Easy movement inside cabin</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 font-bold text-ink">
                                        <Wifi className="text-gold" size={20} /> Dual AC
                                    </div>
                                    <p className="text-sm text-ink-muted">Dedicated vents for rear seats</p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <Link href="/booking" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-soft text-ink px-8 py-3 rounded-btn font-bold transition-all shadow-lg shadow-gold/30">
                                    Book Hyundai H1 Now <ArrowRight size={20} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Specifications */}
            <section className="py-12 bg-surface-alt">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-10 font-playfair text-ink">Technical Specifications</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-surface p-6 rounded-xl shadow-sm border border-border">
                            <h3 className="font-bold text-ink-muted uppercase text-xs tracking-wider mb-2">Engine & Power</h3>
                            <p className="font-bold text-xl text-ink">2.4L MPi</p>
                            <p className="text-sm text-ink-muted/80">Reliable Performance</p>
                        </div>
                        <div className="bg-surface p-6 rounded-xl shadow-sm border border-border">
                            <h3 className="font-bold text-ink-muted uppercase text-xs tracking-wider mb-2">Climate Control</h3>
                            <p className="font-bold text-xl text-ink">Dual AC System</p>
                            <p className="text-sm text-ink-muted/80">Front & Rear Control</p>
                        </div>
                        <div className="bg-surface p-6 rounded-xl shadow-sm border border-border">
                            <h3 className="font-bold text-ink-muted uppercase text-xs tracking-wider mb-2">Space Layout</h3>
                            <p className="font-bold text-xl text-ink">Swivel Seats</p>
                            <p className="text-sm text-ink-muted/80">Flexible Configuration</p>
                        </div>
                        <div className="bg-surface p-6 rounded-xl shadow-sm border border-border">
                            <h3 className="font-bold text-ink-muted uppercase text-xs tracking-wider mb-2">Convenience</h3>
                            <p className="font-bold text-xl text-ink">Dual Sliding Doors</p>
                            <p className="text-sm text-ink-muted/80">Easy Access</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 360 Interior Preview (Placeholder) */}
            <section className="py-16 bg-ink text-surface overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <span className="text-gold font-bold tracking-widest uppercase text-sm mb-4 block">Budget Friendly Comfort</span>
                    <h2 className="text-3xl md:text-5xl font-bold font-playfair mb-8 text-surface">Step Inside</h2>

                    <div className="max-w-6xl mx-auto">
                        {/* <Interior360Viewer
                            imageUrl="/images/fleet/camry-interior-360.webp"
                            title="Hyundai H1 Starex Interior"
                        /> */}
                        <div className="w-full h-[400px] flex items-center justify-center bg-charcoal rounded-2xl border border-white/10">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-white mb-2">360° View Coming Soon</h3>
                                <p className="text-white/70">We will upload the interior view later.</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-surface/60 mt-6 text-sm">Interactive 360° Interior View not available on mobile devices in low-data mode.</p>
                </div>
            </section>

            {/* Popular Routes */}
            <section className="py-16 bg-surface-alt">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 font-playfair text-ink">Popular Routes for Hyundai Starex</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Makkah to Madinah",
                                desc: "Stable and comfortable for the long highway stretch between Makkah and Madinah.",
                                icon: Shield,
                                href: "/services/makkah-madinah-taxi"
                            },
                            {
                                title: "Jeddah Airport Pickup",
                                desc: "The perfect size for a family and all their luggage arriving at Jeddah Airport.",
                                icon: Briefcase,
                                href: "/services/jeddah-airport-transfer"
                            },
                            {
                                title: "Ziyarat Tours",
                                desc: "Private, air-conditioned, and flexible for visiting holy sites at your own pace.",
                                icon: MapPin,
                                href: "/services/ziyarat-tours"
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-surface p-6 rounded-xl shadow-md border-t-4 border-gold transition-all hover:-translate-y-1">
                                <item.icon className="w-10 h-10 text-gold mb-4" />
                                <h3 className="text-xl font-bold mb-2 text-ink">
                                    <Link href={item.href} className="hover:text-gold-strong transition-colors">
                                        {item.title}
                                    </Link>
                                </h3>
                                <p className="text-ink-muted">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <FleetCarouselWrapper />

            <FAQSection items={starexFAQs} title="Hyundai H1 Starex - Frequently Asked Questions" />
        </main>
    );
}

