import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Hero from '@/components/common/Hero';
import FadeIn from '@/components/common/FadeIn';
import { ShieldCheck, MapPin, UserCheck, Star, Plane } from 'lucide-react';
import Link from 'next/link';
import { regions, getRegionById } from '@/data/regions';
import { generateMetadataAlternates } from '@/lib/hreflang';

interface Params {
    params: {
        region: string;
    };
}

export async function generateStaticParams() {
    return regions.map((region) => ({
        region: region.id,
    }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const region = getRegionById(params.region);
    
    if (!region) {
        return {
            title: "Premium Umrah Transport | Al Kiswah"
        };
    }

    return {
        title: `Umrah Taxi for ${region.nationality} Pilgrims | VIP Transport | Al Kiswah`,
        description: `Landing in Jeddah? Trusted by ${region.trustCount} pilgrims from ${region.name}. Secure your fixed-price Umrah transport today with premium vehicles and professional drivers.`,
        keywords: [
            `${region.nationality} Umrah Taxi`,
            `Umrah Transport from ${region.name}`,
            `Jeddah Airport Taxi for ${region.nationality}`,
            `Makkah Ziyarat Tour ${region.name}`
        ],
        alternates: {
            ...generateMetadataAlternates(`/pilgrims/${region.id}`),
            canonical: `https://kiswahumrahcab.com/pilgrims/${region.id}`
        },
        openGraph: {
            title: `VIP Umrah Transport for ${region.nationality} Pilgrims`,
            description: `Trusted by ${region.trustCount} pilgrims. Book your fixed-price transport today.`,
            images: [region.heroBg],
            type: "website",
        }
    };
}

export default function RegionalLandingPage({ params }: Params) {
    const region = getRegionById(params.region);

    if (!region) {
        notFound();
    }

    const { name, nationality, popularOrigin, heroBg, trustCount, currency } = region;

    // JSON-LD Schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": `Umrah Transport for ${name}`,
        "description": `Premium Umrah Transport serving pilgrims from ${name}.`,
        "publisher": {
            "@type": "Organization",
            "name": "Al Kiswah Umrah Transport"
        },
        "audience": {
            "@type": "Audience",
            "audienceType": "Pilgrims",
            "geographicArea": {
                "@type": "Country",
                "name": name
            }
        }
    };

    return (
        <main className="bg-primary-black text-white relative min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />

            {/* Regional Hero */}
            <Hero
                title={`Welcome ${nationality} Pilgrims`}
                subtitle={`Your trusted partner for Umrah transport. Join ${trustCount} others from ${name} who chose our premium, fixed-price services.`}
                bgImage={heroBg}
                ctaText="Book Transfer Now"
                ctaLink="/booking"
                alt={`Premium Umrah Transport for ${nationality} Pilgrims`}
            />

            {/* Trust Banner tailored to region */}
            <section className="relative z-10 -mt-12 mb-16 px-4">
                <div className="container mx-auto max-w-5xl text-center">
                    <div className="bg-neutral-900/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gold-primary/30 flex flex-col md:flex-row justify-center items-center gap-8">
                        <div className="flex items-center gap-3">
                            <Plane className="text-gold-primary min-w-[24px]" />
                            <p className="text-sm font-medium">Serving flights from <span className="text-white font-bold">{popularOrigin}</span></p>
                        </div>
                        <div className="hidden md:block w-px h-8 bg-white/20"></div>
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="text-green-500 min-w-[24px]" />
                            <p className="text-sm font-medium">Safe & Licensed Transport</p>
                        </div>
                        <div className="hidden md:block w-px h-8 bg-white/20"></div>
                        <div className="flex items-center gap-3">
                            <Star className="text-yellow-400 min-w-[24px]" />
                            <p className="text-sm font-medium">Trusted by {trustCount}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold font-sans text-white mb-4">Dedicated to <span className="text-gold-primary">{nationality}</span> Pilgrims</h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">
                                We understand the unique needs of international travelers arriving at King Abdulaziz International Airport.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-neutral-900/50 p-8 rounded-2xl border border-white/10 text-center hover:border-gold-primary/50 transition-colors group">
                            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <UserCheck className="text-gold-primary" size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Meet & Greet at Arrivals</h3>
                            <p className="text-gray-400 text-sm">
                                Our drivers track your incoming flight from {name} and will be waiting holding a personalized name sign. 
                            </p>
                        </div>
                        <div className="bg-neutral-900/50 p-8 rounded-2xl border border-white/10 text-center hover:border-gold-primary/50 transition-colors group border-b-4 border-b-gold-primary">
                            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <MapPin className="text-gold-primary" size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Clear Fixed Pricing</h3>
                            <p className="text-gray-400 text-sm">
                                No hidden fees. Pay your driver directly in SAR or use your secure credit card. The price you see is exactly what you pay.
                            </p>
                        </div>
                        <div className="bg-neutral-900/50 p-8 rounded-2xl border border-white/10 text-center hover:border-gold-primary/50 transition-colors group">
                            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <ShieldCheck className="text-gold-primary" size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">VIP Fleet Comfort</h3>
                            <p className="text-gray-400 text-sm">
                                After a long flight from {name}, relax in our modern, air-conditioned VIP SUVs or spacious family vans.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Pricing or CTA */}
            <section className="py-24 relative z-10 bg-neutral-900/30 border-t border-white/10">
                <div className="container text-center max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 font-sans">Ready to secure your transport?</h2>
                    <p className="text-gray-400 mb-10 text-lg">
                        Avoid taxi queues and negotiate meters. Book in under 60 seconds and gain instant peace of mind.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/booking?service=airport"
                            className="bg-gold-primary text-black font-bold uppercase tracking-wider px-8 py-4 rounded-full w-full sm:w-auto hover:bg-white hover:scale-105 transition-all text-sm"
                        >
                            Book Transfer Now
                        </Link>
                        <Link
                            href="/pricing"
                            className="bg-transparent border border-white/20 text-white font-bold uppercase tracking-wider px-8 py-4 rounded-full w-full sm:w-auto hover:border-white hover:bg-white/5 transition-all text-sm"
                        >
                            View Our Fleet & Rates
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
