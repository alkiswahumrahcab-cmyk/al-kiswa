import { generateMetadataAlternates } from "@/lib/hreflang";
import type { Metadata } from "next";
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Shield, Star, Briefcase, Users, Wifi, MapPin, CheckCircle, Gauge, Settings, Video } from 'lucide-react';
import FAQSection from '@/components/services/FAQSection';
import { getSettings } from '@/lib/settings-storage';
import { vehicleService } from '@/services/vehicleService';
import StariaAnimations from './StariaAnimations'; // We will create this client component
import StariaGallery from './StariaGallery';
import SeasonalPricingNote from '@/components/common/SeasonalPricingNote';

const generateJsonLd = (vehicleData: any) => ({
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://kiswahumrahcab.com" },
                { "@type": "ListItem", "position": 2, "name": "Fleet", "item": "https://kiswahumrahcab.com/fleet" },
                { "@type": "ListItem", "position": 3, "name": "Hyundai Staria", "item": "https://kiswahumrahcab.com/fleet/hyundai-staria" }
            ]
        },
        {
            "@type": "Product",
            "name": "Hyundai Staria 2026",
            "image": [
                "https://kiswahumrahcab.com/images/fleet/staria/hyundai-staria-2026-exterior-cinematic.jpeg",
                "https://kiswahumrahcab.com/images/fleet/staria/hyundai-staria-2026-exterior-front-view.jpeg"
            ],
            "description": "Hyundai Staria 2026 – premium family and business van with advanced safety, spacious interior, and futuristic design. Book your premium Umrah transport in Saudi Arabia.",
            "brand": { "@type": "Brand", "name": "Hyundai" },
            "category": "Automotive",
            "offers": {
                "@type": "Offer",
                "price": vehicleData?.basePrice?.toString() || "450",
                "priceCurrency": "SAR",
                "availability": "https://schema.org/InStock",
                "priceValidUntil": '2026-12-31',
                "url": "https://kiswahumrahcab.com/fleet/hyundai-staria"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "150",
                "bestRating": "5",
                "worstRating": "1"
            }
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "What is the price of Hyundai Staria in Saudi Arabia?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The rental price for Hyundai Staria for Umrah transport starts from 450 SAR depending on the route (e.g., Jeddah Airport to Makkah)."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How many seats does Hyundai Staria have?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The Hyundai Staria features premium captain seats and can comfortably accommodate up to 7-9 passengers along with significant luggage space."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Is Hyundai Staria good for family use?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, it is widely considered the best family van in Saudi Arabia. It offers easy entry with dual sliding doors, expansive legroom, and lounge-style seating perfect for elderly pilgrims and children."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What are the safety features of Hyundai Staria?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The Hyundai Staria includes advanced 360 collision detection, blind-spot monitoring, Smart Sense ADAS, and multiple airbags ensuring maximum safety on Saudi highways."
                    }
                }
            ]
        }
    ]
});

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Hyundai Staria 2026 – Price, Features & Interior | Saudi Arabia",
        description: "Explore the Hyundai Staria 2026 in Saudi Arabia. Premium interior, advanced safety, spacious design, and top performance. Book a test drive today.",
        keywords: [
            "Hyundai Staria Saudi Arabia",
            "Hyundai Staria price KSA",
            "Hyundai Staria interior",
            "Hyundai Staria features",
            "Hyundai Staria 2026",
            "Hyundai Staria review",
            "Hyundai Staria family van",
            "Hyundai Staria business van"
        ],
        alternates: generateMetadataAlternates("/fleet/hyundai-staria"),
    };
}

const stariaFAQs = [
    {
        question: "What is the price of Hyundai Staria in Saudi Arabia?",
        answer: "The rental price for Umrah transport starts around 450 SAR depending on your specific route and season. We offer competitive, transparent fixed pricing."
    },
    {
        question: "How many seats does Hyundai Staria have?",
        answer: "Our VIP Staria models are configured for up to 7-9 passengers, featuring ultra-comfortable captain seats with ample legroom for long journeys."
    },
    {
        question: "Is Hyundai Staria good for family use?",
        answer: "Absolutely. With its low step-in height, dual electronic sliding doors, and panoramic windows, it is the ultimate family vehicle, especially suitable for elderly pilgrims."
    },
    {
        question: "What are the safety features of Hyundai Staria?",
        answer: "It comes equipped with Hyundai Smart Sense, including forward collision-avoidance assist, blind-spot view monitor, and a reinforced safety structure."
    },
];

export default async function HyundaiStariaPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=I%20am%20interested%20in%20booking%20Hyundai%20Staria%20for%20Umrah`;

    const vehicles = await vehicleService.getActiveVehicles();
    const vehicleData = vehicles.find((v: any) => v.name.toLowerCase().includes('staria'));
    const jsonLd = generateJsonLd(vehicleData);

    return (
        <main className="overflow-x-hidden bg-charcoal dark:bg-deep-black font-sans">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            
            {/* 1. Hero Section (Cinematic Intro) */}
            <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <StariaAnimations type="ken-burns" className="absolute inset-0">
                        <Image
                            src="/images/fleet/staria/hyundai-staria-2026-exterior-cinematic.jpeg"
                            alt="Hyundai Staria 2026 Premium People Mover"
                            fill
                            priority
                            className="object-cover object-center"
                        />
                    </StariaAnimations>
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-black via-primary-black/80 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-black via-transparent to-black/30" />
                </div>
                
                <div className="relative z-10 container mx-auto px-4 text-center mt-20">
                    <StariaAnimations type="fade-up">
                        <span className="inline-block py-1 px-3 rounded-full bg-gold-primary/90 text-primary-black text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-md border border-gold-light/50">
                            The Future of Mobility
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-playfair tracking-tight leading-tight">
                            Hyundai Staria 2026 <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold-primary">
                                Premium Family & Business Van
                            </span>
                        </h1>
                        <p className="text-lg md:text-2xl text-slate-200 mb-10 max-w-3xl mx-auto font-light">
                            Premium comfort, futuristic design, and unmatched versatility in Saudi Arabia.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a href="#features" className="px-8 py-4 bg-transparent border-2 border-gold-primary text-white rounded-full font-bold hover:bg-gold-primary hover:text-primary-black transition-colors shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                                Explore Features
                            </a>
                            <Link href="/booking" className="px-8 py-4 bg-gold-primary text-primary-black rounded-full font-bold hover:bg-gold-metallic transition-colors shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center gap-2">
                                Book Now <ArrowRight size={20} />
                            </Link>
                        </div>
                    </StariaAnimations>
                </div>
            </section>

            {/* 2. Exterior Highlights & 360-style Scroll */}
            <section id="features" className="py-24 bg-white dark:bg-primary-black">
                <div className="container mx-auto px-4">
                    <StariaAnimations type="fade-up">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold font-playfair text-slate-900 dark:text-white mb-4">
                                Futuristic Exterior Design
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg">
                                Designed like a spaceship. Aerodynamic curves, an imposing parametric grille, and signature LED lighting define the Staria&apos;s unmistakable presence.
                            </p>
                        </div>
                    </StariaAnimations>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <StariaAnimations type="zoom-in" delay={0.1}>
                            <div className="group relative h-[300px] rounded-2xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800">
                                <Image src="/images/fleet/staria/hyundai-staria-2026-exterior-led-headlight.jpeg" alt="LED Headlamps" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-black/90 via-primary-black/20 to-transparent"></div>
                                <div className="absolute bottom-6 left-6">
                                    <h3 className="text-gold-light text-xl font-bold mb-2">LED Headlamps</h3>
                                    <p className="text-slate-300 text-sm">Signature horizon styling</p>
                                </div>
                            </div>
                        </StariaAnimations>
                        
                        <StariaAnimations type="zoom-in" delay={0.2}>
                            <div className="group relative h-[300px] rounded-2xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800">
                                <Image src="/images/fleet/staria/hyundai-staria-2026-exterior-full-front.jpeg" alt="Parametric Grille" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-black/90 via-primary-black/20 to-transparent"></div>
                                <div className="absolute bottom-6 left-6">
                                    <h3 className="text-gold-light text-xl font-bold mb-2">Parametric Grille</h3>
                                    <p className="text-slate-300 text-sm">Bold and commanding fascia</p>
                                </div>
                            </div>
                        </StariaAnimations>

                        <StariaAnimations type="zoom-in" delay={0.3}>
                            <div className="group relative h-[300px] rounded-2xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800">
                                <Image src="/images/fleet/staria/hyundai-staria-2026-exterior-alloy-wheels.jpeg" alt="Alloy Wheels" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-black/90 via-primary-black/20 to-transparent"></div>
                                <div className="absolute bottom-6 left-6">
                                    <h3 className="text-gold-light text-xl font-bold mb-2">Premium Alloy Wheels</h3>
                                    <p className="text-slate-300 text-sm">Diamond-cut geometric design</p>
                                </div>
                            </div>
                        </StariaAnimations>

                        <StariaAnimations type="zoom-in" delay={0.4} className="md:col-span-2">
                            <div className="group relative h-[300px] rounded-2xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800">
                                <Image src="/images/fleet/staria/hyundai-staria-2026-exterior-sliding-doors-open.jpeg" alt="Sliding Doors" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-black/90 via-primary-black/20 to-transparent"></div>
                                <div className="absolute bottom-6 left-6">
                                    <h3 className="text-gold-light text-2xl font-bold mb-2">Dual Smart Sliding Doors</h3>
                                    <p className="text-slate-300 text-sm max-w-md">Effortless entry and exit, perfect for families and VIP guests with automatic opening features.</p>
                                </div>
                            </div>
                        </StariaAnimations>

                        <StariaAnimations type="zoom-in" delay={0.5}>
                            <div className="group relative h-[300px] rounded-2xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800">
                                <Image src="/images/fleet/staria/hyundai-staria-2026-exterior-rear-lights-combo.jpeg" alt="Aerodynamic Body" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-black/90 via-primary-black/20 to-transparent"></div>
                                <div className="absolute bottom-6 left-6">
                                    <h3 className="text-gold-light text-xl font-bold mb-2">Parametric Pixel Lights</h3>
                                    <p className="text-slate-300 text-sm">Futuristic rear illumination</p>
                                </div>
                            </div>
                        </StariaAnimations>
                    </div>
                </div>
            </section>

            {/* 3. Interior Luxury Showcase */}
            <section className="py-24 bg-deep-black relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <Image src="/images/fleet/staria/hyundai-staria-2026-interior-dashboard-main.jpeg" alt="Background" fill className="object-cover blur-sm" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-primary-black/90 via-primary-black/80 to-deep-black"></div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <StariaAnimations type="slide-up">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold font-playfair text-white mb-4">
                                Interior Luxury & Comfort
                            </h2>
                            <p className="text-slate-300 max-w-2xl mx-auto text-lg">
                                A lounge-inspired cabin that transforms travel time into relaxation time. Featuring premium captain seats, panoramic windows, and advanced infotainment.
                            </p>
                        </div>
                    </StariaAnimations>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-8 h-[400px] md:h-[600px] relative rounded-2xl overflow-hidden shadow-2xl border border-gold-primary/20">
                            <Image src="/images/fleet/staria/hyundai-staria-2026-interior-spacious-seating.jpeg" alt="Spacious Cabin" fill className="object-cover" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-primary-black/90 to-transparent">
                                <h3 className="text-2xl font-bold text-gold-light mb-2">Expansive Space</h3>
                                <p className="text-slate-200">Unrivaled headroom and legroom for all passengers.</p>
                            </div>
                        </div>
                        <div className="md:col-span-4 flex flex-col gap-4">
                            <div className="h-[200px] md:h-[292px] relative rounded-2xl overflow-hidden shadow-xl border border-gold-primary/20">
                                <Image src="/images/fleet/staria/hyundai-staria-2026-interior-captain-seat.jpeg" alt="Captain Seats" fill className="object-cover" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-primary-black/90 to-transparent">
                                    <h3 className="text-xl font-bold text-gold-light">Premium Captain Seats</h3>
                                </div>
                            </div>
                            <div className="h-[200px] md:h-[292px] relative rounded-2xl overflow-hidden shadow-xl border border-gold-primary/20">
                                <Image src="/images/fleet/staria/hyundai-staria-2026-interior-dashboard-angle.jpeg" alt="Dashboard" fill className="object-cover" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-primary-black/90 to-transparent">
                                    <h3 className="text-xl font-bold text-gold-light">Advanced Dashboard</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Feature Blocks */}
            <section className="py-24 bg-charcoal dark:bg-deep-black">
                <div className="container mx-auto px-4">
                    <StariaAnimations type="fade-up">
                        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 font-playfair text-slate-900 dark:text-white">
                            Technology & Features
                        </h2>
                    </StariaAnimations>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: Shield, title: "Smart Safety", desc: "Hyundai SmartSense including Forward Collision-Avoidance and Blind-Spot Monitoring." },
                            { icon: Star, title: "Ultimate Comfort", desc: "Ventilated and heated seats, multi-zone climate control, and supreme suspension." },
                            { icon: Video, title: "Advanced Tech", desc: "10.25-inch digital cluster, premium infotainment, and surround-view cameras." },
                            { icon: Gauge, title: "Performance", desc: "Powerful 3.5L V6 engine delivering smooth acceleration and optimal fuel efficiency." },
                            { icon: Briefcase, title: "Massive Space", desc: "Flexible seating configurations allowing up to 9 passengers and extensive luggage." },
                            { icon: Wifi, title: "Smart Connectivity", desc: "Wireless charging, multiple USB ports, and seamless smartphone integration." }
                        ].map((feature, idx) => (
                            <StariaAnimations key={idx} type="slide-up" delay={idx * 0.1}>
                                <div className="bg-white dark:bg-primary-black p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 hover:-translate-y-2 transition-transform duration-300">
                                    <div className="w-14 h-14 bg-gold-light/30 dark:bg-gold-primary/10 rounded-xl flex items-center justify-center mb-6 text-gold-dark dark:text-gold-primary">
                                        <feature.icon size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                                </div>
                            </StariaAnimations>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Comparison Section */}
            <section className="py-24 bg-white dark:bg-primary-black border-y border-slate-100 dark:border-slate-800">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <StariaAnimations type="fade-up">
                            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-gold-primary/10">
                                <Image src="/images/fleet/staria/hyundai-staria-2026-lifestyle-on-road-driving.jpeg" alt="Staria vs Competitors" fill className="object-cover" />
                            </div>
                        </StariaAnimations>
                        
                        <StariaAnimations type="slide-up" delay={0.2}>
                            <div>
                                <h2 className="text-3xl md:text-5xl font-bold mb-6 font-playfair text-slate-900 dark:text-white">
                                    Hyundai Staria vs Competitors
                                </h2>
                                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                                    Why choose the Staria over the Toyota Hiace or Kia Carnival for your journey in Saudi Arabia?
                                </p>

                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="mt-1 text-gold-primary"><CheckCircle /></div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white text-xl">Superior Aesthetics</h4>
                                            <p className="text-slate-600 dark:text-slate-400">Unlike the commercial look of the Hiace, the Staria offers a premium, VIP appearance suitable for luxury transfers.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="mt-1 text-gold-primary"><CheckCircle /></div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white text-xl">Lounge-Like Interior</h4>
                                            <p className="text-slate-600 dark:text-slate-400">More spacious headroom and panoramic windows compared to the Carnival, offering breathtaking views of the Holy Lands.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="mt-1 text-gold-primary"><CheckCircle /></div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white text-xl">Better Accessibility</h4>
                                            <p className="text-slate-600 dark:text-slate-400">Lower step-in height and wider sliding doors make it the absolute best choice for elderly pilgrims.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </StariaAnimations>
                    </div>
                </div>
            </section>

            {/* 6. Variants & Details (Images) */}
            <section className="py-24 bg-charcoal dark:bg-deep-black">
                <div className="container mx-auto px-4 text-center">
                    <StariaAnimations type="fade-up">
                        <h2 className="text-3xl md:text-5xl font-bold mb-16 font-playfair text-slate-900 dark:text-white">
                            Variants & Colors
                        </h2>
                    </StariaAnimations>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-primary-black p-4 rounded-2xl shadow border border-slate-100 dark:border-slate-800">
                            <div className="relative h-[250px] rounded-xl overflow-hidden mb-4">
                                <Image src="/images/fleet/staria/hyundai-staria-2026-exterior-rear-view.jpeg" alt="Rear View" fill className="object-cover" />
                            </div>
                            <h4 className="font-bold text-lg dark:text-white text-gold-dark dark:text-gold-light">Premium Trims</h4>
                            <p className="text-slate-500 text-sm">Tinted brass chrome accents and distinctive rear lighting.</p>
                        </div>
                        <div className="bg-white dark:bg-primary-black p-4 rounded-2xl shadow border border-slate-100 dark:border-slate-800">
                            <div className="relative h-[250px] rounded-xl overflow-hidden mb-4">
                                <Image src="/images/fleet/staria/hyundai-staria-2026-exterior-roof-top.jpeg" alt="Roof View" fill className="object-cover" />
                            </div>
                            <h4 className="font-bold text-lg dark:text-white text-gold-dark dark:text-gold-light">Panoramic Roof</h4>
                            <p className="text-slate-500 text-sm">Dual sunroof options for expansive sky views.</p>
                        </div>
                        <div className="bg-white dark:bg-primary-black p-4 rounded-2xl shadow border border-slate-100 dark:border-slate-800">
                            <div className="relative h-[250px] rounded-xl overflow-hidden mb-4">
                                <Image src="/images/fleet/staria/hyundai-staria-2026-exterior-side-view.jpeg" alt="Side View" fill className="object-cover" />
                            </div>
                            <h4 className="font-bold text-lg dark:text-white text-gold-dark dark:text-gold-light">Sleek Profile</h4>
                            <p className="text-slate-500 text-sm">Available in Abyss Black, Creamy White, and Shimmering Silver.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6.5 Full Gallery Section */}
            <StariaGallery />

            {/* 7. Booking Section (Lifestyle) */}
            <section className="relative py-32 bg-primary-black text-white overflow-hidden">
                <div className="absolute inset-0">
                    <Image src="/images/fleet/staria/hyundai-staria-2026-lifestyle-desert-road.jpeg" alt="Desert Road" fill className="object-cover opacity-30" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-black/95 to-primary-black/50"></div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-2xl">
                        <StariaAnimations type="fade-up">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair text-white">
                                Ready to Experience the Future of Travel?
                            </h2>
                            <p className="text-xl text-slate-300 mb-10">
                                Book the Hyundai Staria 2026 today for your family's Umrah transport. Enjoy fixed pricing, professional chauffeurs, and ultimate comfort.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/booking" className="px-8 py-4 bg-gold-primary text-primary-black text-center rounded-full font-bold hover:bg-gold-metallic transition-colors shadow-lg shadow-gold-primary/20 text-lg">
                                    Book a Ride Now
                                </Link>
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#25D366] text-white text-center rounded-full font-bold hover:bg-[#20bd5a] transition-colors shadow-lg shadow-[#25D366]/20 text-lg flex items-center justify-center gap-2">
                                    Contact via WhatsApp
                                </a>
                            </div>
                        </StariaAnimations>
                        <div className="mt-8">
                            <SeasonalPricingNote />
                        </div>
                    </div>
                </div>
            </section>

            {/* Internal Links & FAQ */}
            <section className="py-24 bg-white dark:bg-primary-black">
                <FAQSection items={stariaFAQs} title="Frequently Asked Questions" />
                
                <div className="container mx-auto px-4 mt-20 border-t border-slate-200 dark:border-slate-800 pt-10">
                    <h3 className="font-bold text-xl mb-4 text-slate-900 dark:text-white">Explore More</h3>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/services/makkah-madinah-taxi" className="text-gold-dark dark:text-gold-primary hover:underline">Makkah to Madinah Transport</Link>
                        <span className="text-slate-300">•</span>
                        <Link href="/services/jeddah-airport-transfer" className="text-gold-dark dark:text-gold-primary hover:underline">Jeddah Airport Taxi</Link>
                        <span className="text-slate-300">•</span>
                        <Link href="/fleet/gmc-yukon-at4" className="text-gold-dark dark:text-gold-primary hover:underline">GMC Yukon Fleet</Link>
                        <span className="text-slate-300">•</span>
                        <Link href="/contact" className="text-gold-dark dark:text-gold-primary hover:underline">Contact Support</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
