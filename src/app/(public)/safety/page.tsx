import React from 'react';
import { Shield, Sparkles, UserCheck, CheckCircle, Clock, Search, Heart, AlertTriangle, Phone, Activity, Wrench, FileCheck, Award } from 'lucide-react';
import Hero from '@/components/common/Hero';
import Link from 'next/link';
import FadeIn from '@/components/common/FadeIn';

export const metadata = {
    title: "Safety Standards & Protocols | Al Kiswah Transport | معايير السلامة",
    description: "Your safety is our sacred duty. Comprehensive vehicle sanitation, driver checks, & 24/7 support. معايير سلامة عالية لخدمة المعتمرين. تعقيم شامل وسائقين محترفين.",
    keywords: [
        "Umrah safety", "safe taxi Makkah", "sanitized transport Saudi",
        "female solo travel Umrah", "licensed drivers Jeddah", "family transport safety",
        "معايير السلامة", "نقل معتمرين آمن", "تاكسي عائلي مكة",
        "أمان المعتمرين", "توصيل آمن للنساء", "سائقين مرخصين"
    ],
    openGraph: {
        title: "Safety Standards | Al Kiswah Umrah Transport | الأمان والراحة",
        description: "Verified drivers, sanitized vehicles, and 24/7 support. Travel with peace of mind. رحلة آمنة ومريحة مع الكسوة للنقل.",
        images: ['/images/blog/comfort-safety-new.png'],
    }
};

export default function SafetyPage() {
    return (
        <main className="min-h-screen bg-primary-black relative">
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />

            <div className="relative z-10">
                <Hero
                    title="Your Safety, Our Sacred Duty"
                    subtitle="We view your safety not just as a standard, but as an Amanah (Trust) we carry for every pilgrim."
                    bgImage="/images/blog/comfort-safety-new.png"
                />

                {/* Trust Signals Bar */}
                <section className="bg-gradient-to-r from-gold-primary to-amber-500 py-6 relative z-10 -mt-8 mx-4 md:mx-auto max-w-6xl rounded-xl shadow-lg border border-white/10">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-black text-center">
                            <div className="flex flex-col items-center">
                                <Shield className="mb-2 h-6 w-6 text-black" />
                                <span className="font-bold text-sm md:text-base">Ministry Licensed</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <UserCheck className="mb-2 h-6 w-6 text-black" />
                                <span className="font-bold text-sm md:text-base">Background Checked</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Search className="mb-2 h-6 w-6 text-black" />
                                <span className="font-bold text-sm md:text-base">GPS Tracked Trips</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Clock className="mb-2 h-6 w-6 text-black" />
                                <span className="font-bold text-sm md:text-base">24/7 Support</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Intro Section */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4 text-center max-w-3xl">
                        <span className="text-gold-primary font-bold uppercase tracking-widest text-sm mb-3 block">Peace of Mind</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-sans">
                            Traveling with Confidence
                        </h2>
                        <p className="text-lg text-gray-300 leading-relaxed font-light">
                            At Al Kiswah Umrah Transport, we understand that strict safety measures are essential for you to focus on your Ibadah.
                            We go beyond the industry standards to ensure every aspect of your journey—from the driver's conduct to the vehicle's hygiene—is perfect.
                        </p>
                    </div>
                </section>

                {/* Specialized Care Sections */}
                <section className="py-16 bg-transparent">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-white mb-4 font-sans">Tailored Safety for Every Pilgrim</h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">We understand that different guests have different needs. Our protocols are adapted to ensure everyone travels with dignity and security.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Women Safety */}
                            <FadeIn delay={0.1}>
                                <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-white/10 h-full hover:border-gold-primary/30 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)] transition-all duration-300">
                                    <div className="w-12 h-12 bg-pink-900/30 rounded-xl flex items-center justify-center text-pink-400 mb-6 border border-pink-500/20">
                                        <Heart size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">Solo Sisters Safety</h3>
                                    <p className="text-gray-400 mb-6 text-sm leading-relaxed">Travel without worry. Our "Sisters Protocol" ensures complete privacy and respect.</p>
                                    <ul className="space-y-3">
                                        <li className="flex gap-3 text-sm text-gray-300">
                                            <CheckCircle size={16} className="text-pink-500 shrink-0 mt-0.5" />
                                            <span><strong>Strict Privacy:</strong> No shared rides, ever.</span>
                                        </li>
                                        <li className="flex gap-3 text-sm text-gray-300">
                                            <CheckCircle size={16} className="text-pink-500 shrink-0 mt-0.5" />
                                            <span><strong>Live Tracking:</strong> Shareable GPS link for family.</span>
                                        </li>
                                        <li className="flex gap-3 text-sm text-gray-300">
                                            <CheckCircle size={16} className="text-pink-500 shrink-0 mt-0.5" />
                                            <span><strong>Vetted Drivers:</strong> Trained in Islamic Adab.</span>
                                        </li>
                                    </ul>
                                </div>
                            </FadeIn>

                            {/* Family Safety */}
                            <FadeIn delay={0.2}>
                                <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-white/10 h-full hover:border-gold-primary/30 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)] transition-all duration-300">
                                    <div className="w-12 h-12 bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-400 mb-6 border border-blue-500/20">
                                        <Shield size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">Family Protection</h3>
                                    <p className="text-gray-400 mb-6 text-sm leading-relaxed">Your children are our Amanah. We drive with extra care when little ones are on board.</p>
                                    <ul className="space-y-3">
                                        <li className="flex gap-3 text-sm text-gray-300">
                                            <CheckCircle size={16} className="text-blue-500 shrink-0 mt-0.5" />
                                            <span><strong>Child Seats:</strong> Available upon request.</span>
                                        </li>
                                        <li className="flex gap-3 text-sm text-gray-300">
                                            <CheckCircle size={16} className="text-blue-500 shrink-0 mt-0.5" />
                                            <span><strong>Door Logs:</strong> Child-lock checks before highway.</span>
                                        </li>
                                        <li className="flex gap-3 text-sm text-gray-300">
                                            <CheckCircle size={16} className="text-blue-500 shrink-0 mt-0.5" />
                                            <span><strong>Spacious Vans:</strong> Room for strollers & bags.</span>
                                        </li>
                                    </ul>
                                </div>
                            </FadeIn>

                            {/* Elderly Care */}
                            <FadeIn delay={0.3}>
                                <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-white/10 h-full hover:border-gold-primary/30 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)] transition-all duration-300">
                                    <div className="w-12 h-12 bg-green-900/30 rounded-xl flex items-center justify-center text-green-400 mb-6 border border-green-500/20">
                                        <Activity size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">Elderly Assistance</h3>
                                    <p className="text-gray-400 mb-6 text-sm leading-relaxed">We honor our elders with patience and physical assistance at every step.</p>
                                    <ul className="space-y-3">
                                        <li className="flex gap-3 text-sm text-gray-300">
                                            <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                                            <span><strong>Door-to-Door:</strong> Minimized walking distance.</span>
                                        </li>
                                        <li className="flex gap-3 text-sm text-gray-300">
                                            <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                                            <span><strong>Wheelchair:</strong> Assistance with loading/unloading.</span>
                                        </li>
                                        <li className="flex gap-3 text-sm text-gray-300">
                                            <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                                            <span><strong>Gentle Driving:</strong> Smooth acceleration & braking.</span>
                                        </li>
                                    </ul>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* Technical Safety Specs */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            <div>
                                <span className="text-gold-primary font-bold uppercase tracking-widest text-sm mb-3 block">Behind the Scenes</span>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-sans">Rigorous Fleet Maintenance</h2>
                                <p className="text-lg text-gray-300 mb-8 font-light">
                                    A safe journey starts long before you enter the car. Our fleet undergoes a strict maintenance schedule to ensure 100% reliability in the Saudi climate.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="bg-white/5 p-3 rounded-xl h-fit border border-white/5">
                                            <Wrench size={24} className="text-gold-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-lg">Weekly Mechanical Audit</h4>
                                            <p className="text-gray-400 text-sm">Brakes, tires, and fluid levels checked every 7 days.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="bg-white/5 p-3 rounded-xl h-fit border border-white/5">
                                            <Sparkles size={24} className="text-gold-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-lg">Daily Hygiene Protocol</h4>
                                            <p className="text-gray-400 text-sm">Interior vacuum, surface disinfection, and scenting before every trip.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="bg-white/5 p-3 rounded-xl h-fit border border-white/5">
                                            <FileCheck size={24} className="text-gold-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-lg">Legal Compliance</h4>
                                            <p className="text-gray-400 text-sm">All vehicles fully insured and licensed by the Ministry of Transport.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-gold-primary/20 to-amber-500/20 rounded-3xl opacity-50 blur-2xl transform rotate-2"></div>
                                <div className="bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden border border-white/10 relative z-10">
                                    <div className="bg-black/80 p-4 flex items-center justify-between border-b border-white/10">
                                        <span className="text-white font-mono text-sm">MAINTENANCE_LOG_V8.2.pdf</span>
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                        </div>
                                    </div>
                                    <div className="p-6 space-y-4 font-mono text-sm">
                                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                            <span className="text-gray-500">Check: <span className="text-white font-bold">Brake Pads</span></span>
                                            <span className="text-green-500 bg-green-500/10 px-2 py-1 rounded">PASS</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                            <span className="text-gray-500">Check: <span className="text-white font-bold">AC Coolant</span></span>
                                            <span className="text-green-500 bg-green-500/10 px-2 py-1 rounded">PASS</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                            <span className="text-gray-500">Check: <span className="text-white font-bold">Tire Pressure</span></span>
                                            <span className="text-green-500 bg-green-500/10 px-2 py-1 rounded">PASS</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                            <span className="text-gray-500">Check: <span className="text-white font-bold">Seatbelts</span></span>
                                            <span className="text-green-500 bg-green-500/10 px-2 py-1 rounded">PASS</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2">
                                            <span className="text-gray-500">Inspector: <span className="text-white font-bold">Ahmed Al-Sayed</span></span>
                                            <span className="text-gray-400">#8821</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Driver Vetting Process */}
                <section className="py-16 bg-transparent">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-white mb-4 font-sans">Only 1 in 10 Applicants Drive for Us</h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">Our driver selection process is rigorous because we trust them with your life and your worship.</p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-6">
                            {[
                                { step: '01', title: 'Background Check', icon: Search, desc: 'Complete criminal and Ministry of Interior verification.' },
                                { step: '02', title: 'Driving Test', icon: Award, desc: 'Defensive driving assessment on Makkah-Madinah highway.' },
                                { step: '03', title: 'Health Screen', icon: Activity, desc: 'Vision test and drug screening for 100% alertness.' },
                                { step: '04', title: 'Adab Training', icon: UserCheck, desc: 'Workshop on pilgrim interaction, patience, and history.' },
                            ].map((item, idx) => (
                                <div key={idx} className="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-gold-primary transition-colors">
                                    <span className="absolute -top-4 -right-4 text-8xl font-black text-white/5 group-hover:text-gold-primary/10 transition-colors z-0">{item.step}</span>
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 bg-gold-primary/10 text-gold-primary rounded-xl flex items-center justify-center mb-4 border border-gold-primary/20">
                                            <item.icon size={24} />
                                        </div>
                                        <h3 className="font-bold text-lg text-white mb-2">{item.title}</h3>
                                        <p className="text-sm text-gray-400 font-light">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Emergency Guarantee */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl relative border border-white/10">
                            {/* Decorative Background */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-primary/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-900/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

                            <div className="relative z-10 grid md:grid-cols-2 gap-12 p-8 md:p-16 items-center">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/30 text-red-400 text-sm font-bold mb-6 border border-red-500/20">
                                        <AlertTriangle size={16} />
                                        <span>Emergency Protocol</span>
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 font-sans">
                                        Our "Never Stranded" Promise
                                    </h3>
                                    <p className="text-gray-300 text-lg mb-8 leading-relaxed font-light">
                                        Breakdowns are rare, but our preparedness is absolute. In the unlikely event of any vehicle issue,
                                        we guarantee a replacement vehicle routed to your location immediately.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="flex items-center gap-4 bg-black/20 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                                            <div className="bg-red-600 p-2 rounded-lg text-white">
                                                <Clock size={24} />
                                            </div>
                                            <div>
                                                <p className="text-white font-bold">60 Min Target</p>
                                                <p className="text-gray-400 text-sm">Replacement arrival time</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 bg-black/20 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                                            <div className="bg-green-600 p-2 rounded-lg text-white">
                                                <Phone size={24} />
                                            </div>
                                            <div>
                                                <p className="text-white font-bold">24/7 Hotline</p>
                                                <p className="text-gray-400 text-sm">Always-on support channel</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-black/20 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                                    <h4 className="text-white font-bold text-xl mb-4 border-b border-white/10 pb-4">Standard Operating Procedure</h4>
                                    <ul className="space-y-4">
                                        <li className="flex gap-4 text-gray-300">
                                            <span className="bg-gold-primary/20 text-gold-primary flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0 border border-gold-primary/30">1</span>
                                            <span>Driver secures vehicle in safe zone and ensures passenger comfort.</span>
                                        </li>
                                        <li className="flex gap-4 text-gray-300">
                                            <span className="bg-gold-primary/20 text-gold-primary flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0 border border-gold-primary/30">2</span>
                                            <span>Control room deploys nearest standby vehicle (GMC/Starex).</span>
                                        </li>
                                        <li className="flex gap-4 text-gray-300">
                                            <span className="bg-gold-primary/20 text-gold-primary flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0 border border-gold-primary/30">3</span>
                                            <span>Full trip refund or discount issued for the inconvenience.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-16 bg-transparent border-t border-white/5">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-white mb-4 font-sans">Common Safety Questions</h2>
                            <p className="text-gray-400">Answers to common concerns from our pilgrims</p>
                        </div>

                        <div className="space-y-4">
                            <details className="group bg-neutral-900/50 rounded-xl shadow-sm border border-white/10 open:border-gold-primary/50 transition-all duration-300">
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold text-white text-lg">
                                    <span>Is it safe for solo female travelers?</span>
                                    <span className="transform group-open:rotate-180 transition-transform duration-300 text-gold-primary">▼</span>
                                </summary>
                                <div className="px-6 pb-6 text-gray-300 leading-relaxed border-t border-white/5 pt-4 font-light">
                                    <p>Absolutely. We specialize in family and female-friendly transport. Our drivers are trained in Adab (respect/etiquette), and all trips are GPS tracked by our control room. You can also share your live trip link with family members for added peace of mind.</p>
                                </div>
                            </details>

                            <details className="group bg-neutral-900/50 rounded-xl shadow-sm border border-white/10 open:border-gold-primary/50 transition-all duration-300">
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold text-white text-lg">
                                    <span>What if I leave something in the taxi?</span>
                                    <span className="transform group-open:rotate-180 transition-transform duration-300 text-gold-primary">▼</span>
                                </summary>
                                <div className="px-6 pb-6 text-gray-300 leading-relaxed border-t border-white/5 pt-4 font-light">
                                    <p>We have a strict "Lost & Found" protocol. Drivers check the vehicle after every drop-off. If you realize you've lost something, contact our 24/7 support immediately. We have a 98% recovery rate for items reported within 24 hours.</p>
                                </div>
                            </details>

                            <details className="group bg-neutral-900/50 rounded-xl shadow-sm border border-white/10 open:border-gold-primary/50 transition-all duration-300">
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold text-white text-lg">
                                    <span>Are your vehicles insured?</span>
                                    <span className="transform group-open:rotate-180 transition-transform duration-300 text-gold-primary">▼</span>
                                </summary>
                                <div className="px-6 pb-6 text-gray-300 leading-relaxed border-t border-white/5 pt-4 font-light">
                                    <p>Yes, comprehensive insurance covers all vehicles, drivers, and passengers, fulfilling all Saudi Transport Authority regulations. Your ride is legally protected.</p>
                                </div>
                            </details>
                        </div>

                        <div className="text-center mt-12">
                            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-gold-primary text-black px-8 py-3 rounded-full font-bold hover:bg-gold-primary/90 transition-opacity shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                                <Heart size={18} className="text-red-600" />
                                <span>Contact Safety Team</span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Trust Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Service",
                            "name": "Umrah Transport Safety Standards",
                            "provider": {
                                "@type": "Organization",
                                "name": "Al Kiswah Umrah Transport"
                            },
                            "serviceType": "Safe Transport",
                            "description": "Comprehensive safety protocols including vehicle sanitation, driver vetting, and 24/7 emergency support.",
                            "areaServed": ["Makkah", "Madinah", "Jeddah"],
                            "hasOfferCatalog": {
                                "@type": "OfferCatalog",
                                "name": "Safety Features",
                                "itemListElement": [
                                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "GPS Tracking" } },
                                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sanitized Vehicles" } },
                                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Female Friendly Transport" } }
                                ]
                            }
                        })
                    }}
                />
            </div>
        </main>
    );
}
