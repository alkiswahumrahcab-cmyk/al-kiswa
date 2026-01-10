'use strict';
import React from 'react';
import Image from 'next/image';
import { UserCheck, Users, HeartHandshake, CheckCircle2 } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';

export default function PassengerCare() {
    return (
        <section className="py-16 md:py-24 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <FadeIn>
                    <div className="max-w-3xl mx-auto text-center mb-20 relative">
                        {/* Decorative background for title */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-emerald-500/5 rounded-full blur-2xl" />

                        <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block translate-y-2">Dedicated Service</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-emerald-950 mb-2 font-playfair leading-tight">
                            Tailored Care for <span className="text-gradient-gold">Every Guest</span>
                        </h2>
                        <h3 className="text-2xl font-bold text-emerald-800/80 mb-6 font-reem-kufi">
                            عناية خاصة لكل ضيف
                        </h3>
                        <p className="text-lg text-emerald-900/70 leading-relaxed font-light">
                            We understand that every pilgrim's needs are unique. Our service is designed to provide specific, dignified support tailored to your personal requirements.
                        </p>
                    </div>
                </FadeIn>


                <div className="space-y-24">
                    {/* Solo Female Travelers */}
                    <FadeIn>
                        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                            <div className="w-full md:w-1/2 relative">
                                <div className="absolute inset-0 bg-emerald-100 rounded-3xl transform rotate-3 scale-105" />
                                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="/images/blog/solo-sister-travel.jpg"
                                        alt="Safe transport for female travelers"
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                                        <div className="flex items-center gap-3 text-white">
                                            <div className="bg-emerald-950/40 backdrop-blur-md p-2 rounded-lg">
                                                <UserCheck size={24} className="text-emerald-100" />
                                            </div>
                                            <span className="font-bold text-lg text-white">Female Friendly Service</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 font-playfair">
                                    Trusted & Secure for <span className="text-emerald-600 dark:text-emerald-400">Solo Sisters</span>
                                </h3>
                                <h4 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-6 font-reem-kufi">أمان تام للأخوات</h4>
                                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                                    <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-300 px-1 font-semibold">Is it safe? Absolutely.</span> We specialize in female-friendly transport where your security is our #1 priority.
                                    Our drivers are rigorously vetted professionals trained to respect your privacy and adhere to Islamic Etiquette (Adab).
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-celestial shrink-0 mt-1" />
                                        <span className="text-slate-700 dark:text-slate-300"><strong>24/7 Control Room Tracking</strong> for every second of your journey.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-pink-500 shrink-0 mt-1" />
                                        <span className="text-slate-700 dark:text-slate-300"><strong>Share Live Trip Link</strong> instantly with your family or Mahram.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-pink-500 shrink-0 mt-1" />
                                        <span className="text-slate-700 dark:text-slate-300">Direct coordination via WhatsApp for seamless meetings.</span>
                                    </li>
                                </ul>
                                <div className="mt-8">
                                    <a href="/blog/safe-solo-female-umrah-travel-guide" className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-bold hover:underline group">
                                        Read Our Sisters' Safety Guide <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                                    </a>
                                    <div className="mt-3">
                                        <a href="/blog/avoid-taxi-scams-jeddah-makkah-2025" className="text-sm text-slate-500 hover:text-emerald-600 transition-colors flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                            Essential Read: How to Avoid Airport Taxi Scams
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Families */}
                    <FadeIn>
                        <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20">
                            <div className="w-full md:w-1/2 relative">
                                <div className="absolute inset-0 bg-sky/10 rounded-3xl transform -rotate-3 scale-105" />
                                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="/images/blog/family-umrah-transport.png"
                                        alt="Spacious family transport for Umrah"
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                                        <div className="flex items-center gap-3 text-white">
                                            <div className="bg-emerald-500/20 backdrop-blur-md p-2 rounded-lg">
                                                <Users size={24} className="text-emerald-300" />
                                            </div>
                                            <span className="font-bold text-lg">Family & Kids First</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 font-playfair">
                                    Privacy & Space for <span className="text-emerald-600 dark:text-emerald-400">Families</span>
                                </h3>
                                <h4 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-6 font-reem-kufi">خصوصية وراحة للعوائل</h4>
                                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                                    <span className="bg-mint dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-300 px-1 font-semibold">Travel Together, Comfortably.</span> We provide spacious GMC Yukons and H1 Vans so your entire family stays together.
                                    We create a calm environment for children and respect your family's private moments during the journey.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" />
                                        <span className="text-slate-700 dark:text-slate-300"><strong>Spacious Interiors</strong> with room for strollers and extra luggage.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" />
                                        <span className="text-slate-700 dark:text-slate-300"><strong>Flexible Stops</strong> for prayer, food, or children's needs.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" />
                                        <span className="text-slate-700 dark:text-slate-300">Baby seats available upon request (Pre-booking required).</span>
                                    </li>
                                </ul>
                                <div className="mt-8">
                                    <a href="/blog/stress-free-family-umrah-tips" className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-bold hover:underline group">
                                        Read Family Transport Tips <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                                    </a>
                                    <div className="mt-3">
                                        <a href="/blog/gmc-yukon-vs-toyota-hiace-umrah-transport" className="text-sm text-slate-500 hover:text-emerald-600 transition-colors flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                            Guide: GMC Yukon vs Toyota Hiace - Which fits?
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Elderly Parents */}
                    <FadeIn>
                        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                            <div className="w-full md:w-1/2 relative">
                                <div className="absolute inset-0 bg-gold/10 rounded-3xl transform rotate-3 scale-105" />
                                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="/images/blog/elderly-care-gmc.jpg"
                                        alt="Assisted transport for elderly pilgrims"
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                                        <div className="flex items-center gap-3 text-white">
                                            <div className="bg-gold/20 backdrop-blur-md p-2 rounded-lg">
                                                <HeartHandshake size={24} className="text-gold" />
                                            </div>
                                            <span className="font-bold text-lg">Gentle Care for Elders</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 font-playfair">
                                    Dignity & Patience for <span className="text-gradient-gold">Elderly Parents</span>
                                </h3>
                                <h4 className="text-xl font-bold text-gold mb-6 font-reem-kufi">رعاية ورفق بكبار السن</h4>
                                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                                    <span className="bg-gold/10 text-gold-dark px-1 font-semibold">Serving them is our Honor.</span> We understand the physical challenges of Umrah.
                                    Our chauffeurs are trained to be extra patient, providing physical assistance at every step to ensure your parents perform their pilgrimage with ease.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-gold shrink-0 mt-1" />
                                        <span className="text-slate-700 dark:text-slate-300"><strong>Door-to-Door Assistance</strong> with boarding and alighting.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-gold shrink-0 mt-1" />
                                        <span className="text-slate-700 dark:text-slate-300"><strong>Closest Hotel Drop-offs</strong> to minimize walking distance.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-gold shrink-0 mt-1" />
                                        <span className="text-slate-700 dark:text-slate-300">Gentle driving style to protect sensitive backs/joints.</span>
                                    </li>
                                </ul>
                                <div className="mt-8">
                                    <a href="/blog/accessible-umrah-elderly-transport" className="inline-flex items-center text-gold font-bold hover:underline group">
                                        See Elderly Care Tips <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
