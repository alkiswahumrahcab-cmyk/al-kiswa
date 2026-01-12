'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone, Facebook, Instagram, Twitter, Linkedin, Send, ArrowRight } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';

export default function Footer() {
    const { settings } = useSettings();

    if (!settings) return null;

    const { contact, general } = settings;

    return (
        <footer className="bg-primary-black relative overflow-hidden pt-24 pb-12 text-white border-t border-white/5">
            {/* Background Pattern - Heritage */}
            <div className="absolute inset-0 bg-heritage opacity-[0.03] pointer-events-none mix-blend-overlay" />

            {/* Ambient Glows */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gold-primary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gold-secondary/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
                    {/* Brand Identity & Contact */}
                    <div className="space-y-8">
                        <Link href="/" className="inline-flex items-center gap-4 group">
                            <div className="relative w-14 h-14 bg-white/5 backdrop-blur-sm rounded-2xl p-1 shadow-2xl border border-gold-primary/20 overflow-hidden group-hover:border-gold-primary group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-500">
                                <Image
                                    src="/logo.png"
                                    alt="Al Kiswah Transport"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-sans font-bold text-3xl text-white leading-none tracking-tight">Al Kiswah</span>
                                <span className="text-gold-primary text-xs font-bold tracking-[0.3em] uppercase mt-1.5 opacity-90">Transport</span>
                            </div>
                        </Link>
                        <p className="text-gray-400 leading-relaxed max-w-sm font-light">
                            {general.description}
                        </p>

                        <div className="flex gap-4 pt-2">
                            {contact.social.facebook && <a href={contact.social.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#1877F2] hover:border-[#1877F2] hover:scale-110 transition-all duration-300"><Facebook size={18} /></a>}
                            {contact.social.instagram && <a href={contact.social.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:border-transparent hover:scale-110 transition-all duration-300"><Instagram size={18} /></a>}
                            {contact.social.twitter && <a href={contact.social.twitter} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#1DA1F2] hover:border-[#1DA1F2] hover:scale-110 transition-all duration-300"><Twitter size={18} /></a>}
                            {contact.social.linkedin && <a href={contact.social.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:scale-110 transition-all duration-300"><Linkedin size={18} /></a>}
                        </div>
                    </div>

                    {/* Quick Link Groups */}
                    <div>
                        <h3 className="text-xl font-bold font-sans text-white mb-8 relative inline-flex items-center gap-3">
                            <span className="w-8 h-[1px] bg-gold-primary/50"></span>
                            Company
                        </h3>
                        <ul className="space-y-4">
                            <li><Link href="/about" className="text-gray-400 hover:text-gold-primary hover:pl-2 transition-all duration-300 flex items-center gap-2 text-sm">About Us</Link></li>
                            <li><Link href="/blog" className="text-gray-400 hover:text-gold-primary hover:pl-2 transition-all duration-300 flex items-center gap-2 text-sm">Blog & Updates</Link></li>
                            <li><Link href="/safety" className="text-gray-400 hover:text-gold-primary hover:pl-2 transition-all duration-300 flex items-center gap-2 text-sm">Safety Guide</Link></li>
                            <li><Link href="/track-booking" className="text-gray-400 hover:text-gold-primary hover:pl-2 transition-all duration-300 flex items-center gap-2 text-sm">Track Booking</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-gold-primary hover:pl-2 transition-all duration-300 flex items-center gap-2 text-sm">Contact Support</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold font-sans text-white mb-8 relative inline-flex items-center gap-3">
                            <span className="w-8 h-[1px] bg-gold-primary/50"></span>
                            Services
                        </h3>
                        <ul className="space-y-4">
                            <li><Link href="/services/jeddah-airport-transfer" className="text-gray-400 hover:text-gold-primary hover:pl-2 transition-all duration-300 flex items-center gap-2 text-sm">Jeddah Airport Transfer</Link></li>
                            <li><Link href="/services/makkah-madinah-taxi" className="text-gray-400 hover:text-gold-primary hover:pl-2 transition-all duration-300 flex items-center gap-2 text-sm">Makkah ⇄ Madinah Taxi</Link></li>
                            <li><Link href="/services/madinah-airport-transfer" className="text-gray-400 hover:text-gold-primary hover:pl-2 transition-all duration-300 flex items-center gap-2 text-sm">Madinah Airport Transfer</Link></li>
                            <li><Link href="/services/ziyarat-tours" className="text-gray-400 hover:text-gold-primary hover:pl-2 transition-all duration-300 flex items-center gap-2 text-sm">Ziyarat Tours</Link></li>
                            <li><Link href="/services/intercity-transfer" className="text-gray-400 hover:text-gold-primary hover:pl-2 transition-all duration-300 flex items-center gap-2 text-sm">Intercity Transfer</Link></li>
                        </ul>
                    </div>

                    {/* Contact & Newsletter */}
                    <div className="space-y-8">
                        <h3 className="text-xl font-bold font-sans text-white mb-8 relative inline-flex items-center gap-3">
                            <span className="w-8 h-[1px] bg-gold-primary/50"></span>
                            Get in Touch
                        </h3>

                        <div className="space-y-5">
                            {contact.address && (
                                <div className="flex items-start gap-4 text-gray-400 group">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-gold-primary/10 group-hover:text-gold-primary transition-colors">
                                        <MapPin size={18} />
                                    </div>
                                    <span className="text-sm leading-relaxed mt-2">{contact.address}</span>
                                </div>
                            )}
                            {contact.phone && (
                                <a href={`tel:${contact.phone}`} className="flex items-center gap-4 text-gray-400 hover:text-gold-primary transition-colors group">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-gold-primary/10 group-hover:text-gold-primary transition-colors">
                                        <Phone size={18} />
                                    </div>
                                    <span className="text-sm font-bold tracking-wide">{contact.phone}</span>
                                </a>
                            )}
                            {contact.email && (
                                <a href={`mailto:${contact.email}`} className="flex items-center gap-4 text-gray-400 hover:text-gold-primary transition-colors group">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-gold-primary/10 group-hover:text-gold-primary transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <span className="text-sm">{contact.email}</span>
                                </a>
                            )}
                        </div>

                        <div className="pt-8 border-t border-white/5">
                            <h4 className="font-bold text-white text-sm mb-4 font-sans">Subscribe to Newsletter</h4>
                            <form className="flex gap-2 relative group" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-gold-primary/50 focus:bg-white/10 text-sm text-white placeholder-white/30 transition-all"
                                />
                                <button type="submit" className="absolute right-1.5 top-1.5 w-10 h-10 rounded-lg bg-gold-primary text-black flex items-center justify-center hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg">
                                    <Send size={16} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 mt-4 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500 font-light">
                    <div>
                        {general.footerText}
                    </div>
                    <div className="flex items-center gap-8">
                        <Link href="/privacy" className="hover:text-gold-primary transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-gold-primary transition-colors">Terms of Service</Link>
                        <span className="flex items-center gap-1">Made with <span className="text-red-500">❤</span> for the Ummah</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
