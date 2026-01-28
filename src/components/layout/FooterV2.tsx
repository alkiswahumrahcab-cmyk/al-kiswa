'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone, Facebook, Instagram, Twitter, Linkedin, Send, ArrowRight } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';

export default function Footer() {
    const { settings } = useSettings();

    if (!settings) return null;

    const { contact, general } = settings;

    // Force HMR update

    return (
        <footer className="bg-primary-black relative overflow-hidden pt-24 pb-12 text-white border-t border-white/5">
            {/* Background Pattern - Heritage */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                <Image
                    src="/pattern.png"
                    alt="Pattern"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Ambient Glows - Enhanced */}
            <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gold-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-emerald-900/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
                    {/* Brand Identity */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-flex items-center gap-3 group">
                            <div className="relative w-12 h-12 bg-white/5 backdrop-blur-sm rounded-xl p-1 shadow-2xl border border-gold-primary/20 overflow-hidden group-hover:border-gold-primary transition-all duration-500">
                                <Image
                                    src="/logo.png"
                                    alt="Al Kiswah Transport"
                                    fill
                                    sizes="128px"
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-sans font-bold text-2xl text-white leading-none">Al Kiswah</span>
                                <span className="text-gold-primary text-[10px] font-bold tracking-[0.2em] uppercase mt-1 opacity-90">Umrah Transport</span>
                            </div>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed font-light">
                            Official licensed transport provider for Umrah & Hajj. We specialize in VIP transfers from <strong>Jeddah Airport</strong> to <strong>Makkah</strong> and <strong>Madinah</strong> for pilgrims from UK, USA, Canada, and Europe.
                        </p>

                        <div className="space-y-3 pt-2">
                            {contact.phone && (
                                <a href={`tel:${contact.phone}`} className="flex items-center gap-3 text-gray-300 hover:text-gold-primary transition-colors group text-sm">
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-gold-primary/20 transition-colors">
                                        <Phone size={14} />
                                    </div>
                                    <span className="font-semibold">{contact.phone}</span>
                                </a>
                            )}
                            {contact.email && (
                                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-gray-300 hover:text-gold-primary transition-colors group text-sm">
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-gold-primary/20 transition-colors">
                                        <Mail size={14} />
                                    </div>
                                    <span>{contact.email}</span>
                                </a>
                            )}
                        </div>

                        <div className="flex gap-3 pt-2">
                            {contact.social.facebook && <a href={contact.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#1877F2] hover:border-transparent transition-all"><Facebook size={16} /></a>}
                            {contact.social.instagram && <a href={contact.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#ee2a7b] hover:border-transparent transition-all"><Instagram size={16} /></a>}
                            {contact.social.twitter && <a href={contact.social.twitter} target="_blank" rel="noreferrer" aria-label="Twitter" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#1DA1F2] hover:border-transparent transition-all"><Twitter size={16} /></a>}
                            {contact.social.tiktok && (
                                <a href={contact.social.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#000000] hover:border-transparent transition-all group">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* SEO Column 1: Core Transport Routes */}
                    <div>
                        <h3 className="text-lg font-bold font-sans text-white mb-6 relative flex items-center gap-3">
                            <span className="w-6 h-[2px] bg-gold-primary"></span>
                            Transport Services
                        </h3>
                        <ul className="space-y-3">
                            <li><Link href="/services/jeddah-airport-transfer" className="text-gray-400 hover:text-gold-primary hover:pl-1 transition-all duration-300 text-sm flex items-start gap-2"><span className="text-gold-primary mt-1">›</span> Jeddah Airport to Makkah Taxi</Link></li>
                            <li><Link href="/services/makkah-madinah-taxi" className="text-gray-400 hover:text-gold-primary hover:pl-1 transition-all duration-300 text-sm flex items-start gap-2"><span className="text-gold-primary mt-1">›</span> Makkah to Madinah Taxi</Link></li>
                            <li><Link href="/services/madinah-airport-transfer" className="text-gray-400 hover:text-gold-primary hover:pl-1 transition-all duration-300 text-sm flex items-start gap-2"><span className="text-gold-primary mt-1">›</span> Madinah Airport Pickup</Link></li>
                            <li><Link href="/services/ziyarat-tours" className="text-gray-400 hover:text-gold-primary hover:pl-1 transition-all duration-300 text-sm flex items-start gap-2"><span className="text-gold-primary mt-1">›</span> VIP Ziarah Tours</Link></li>
                            <li><Link href="/booking" className="text-gray-400 hover:text-gold-primary hover:pl-1 transition-all duration-300 text-sm flex items-start gap-2"><span className="text-gold-primary mt-1">›</span> Intercity Transfer Booking</Link></li>
                        </ul>
                    </div>

                    {/* SEO Column 2: Fleet & Ziarah */}
                    <div>
                        <h3 className="text-lg font-bold font-sans text-white mb-6 relative flex items-center gap-3">
                            <span className="w-6 h-[2px] bg-gold-primary"></span>
                            Our VIP Fleet
                        </h3>
                        <ul className="space-y-3">
                            <li><Link href="/fleet/gmc-yukon-at4" className="text-gray-400 hover:text-gold-primary hover:pl-1 transition-all duration-300 text-sm flex items-start gap-2"><span className="text-gold-primary mt-1">›</span> GMC Yukon XL 2025 (VIP)</Link></li>
                            <li><Link href="/fleet/hyundai-staria" className="text-gray-400 hover:text-gold-primary hover:pl-1 transition-all duration-300 text-sm flex items-start gap-2"><span className="text-gold-primary mt-1">›</span> Hyundai Staria Family Van</Link></li>
                            <li><Link href="/fleet/toyota-hiace" className="text-gray-400 hover:text-gold-primary hover:pl-1 transition-all duration-300 text-sm flex items-start gap-2"><span className="text-gold-primary mt-1">›</span> Toyota Hiace (10 Pax)</Link></li>
                            <li><Link href="/fleet/toyota-coaster" className="text-gray-400 hover:text-gold-primary hover:pl-1 transition-all duration-300 text-sm flex items-start gap-2"><span className="text-gold-primary mt-1">›</span> Toyota Coaster Bus Rental</Link></li>
                            <li><Link href="/services" className="text-gray-400 hover:text-gold-primary hover:pl-1 transition-all duration-300 text-sm flex items-start gap-2"><span className="text-gold-primary mt-1">›</span> Luxury Sedan Service</Link></li>
                        </ul>
                    </div>

                    {/* SEO Column 3: Quick Links & Trust */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-bold font-sans text-white mb-6 relative flex items-center gap-3">
                                <span className="w-6 h-[2px] bg-gold-primary"></span>
                                Company Info
                            </h3>
                            <ul className="space-y-3">
                                <li><Link href="/about" className="text-gray-400 hover:text-gold-primary hover:pl-1 transition-all duration-300 text-sm flex items-start gap-2"><span className="text-gold-primary mt-1">›</span> About Al Kiswah</Link></li>
                                <li><Link href="/blog" className="text-gray-400 hover:text-gold-primary hover:pl-1 transition-all duration-300 text-sm flex items-start gap-2"><span className="text-gold-primary mt-1">›</span> Umrah Travel Blog</Link></li>
                                <li><Link href="/safety" className="text-gray-400 hover:text-gold-primary hover:pl-1 transition-all duration-300 text-sm flex items-start gap-2"><span className="text-gold-primary mt-1">›</span> Safety & Insurance</Link></li>
                                <li><Link href="/contact" className="text-gray-400 hover:text-gold-primary hover:pl-1 transition-all duration-300 text-sm flex items-start gap-2"><span className="text-gold-primary mt-1">›</span> 24/7 Support Center</Link></li>
                            </ul>
                        </div>

                        <div className="pt-4 border-t border-white/5">
                            <h4 className="font-bold text-white text-xs mb-3 font-sans uppercase tracking-widest">Secure Payments</h4>
                            <div className="flex gap-2 opacity-70 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
                                <div className="h-6 w-10 bg-white rounded flex items-center justify-center text-[10px] text-black font-bold">VISA</div>
                                <div className="h-6 w-10 bg-white rounded flex items-center justify-center text-[10px] text-black font-bold">MC</div>
                                <div className="h-6 w-10 bg-white rounded flex items-center justify-center text-[10px] text-black font-bold">CASH</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 mt-4">
                    <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
                        <p>{general.footerText || "© 2026 Al Kiswah Transport. All rights reserved."} <span className="opacity-30 ml-2">v2.0</span></p>
                        <div className="flex items-center gap-6">
                            <Link href="/privacy" className="hover:text-gold-primary transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-gold-primary transition-colors">Terms of Service</Link>
                            <span className="flex items-center gap-1">Made with <span className="text-red-500">❤</span> for the Ummah</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
