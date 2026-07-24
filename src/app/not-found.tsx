'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Car, Phone, ArrowRight } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-bg flex items-center justify-center relative overflow-hidden font-body py-24">
            <div className="container mx-auto px-4 relative z-10 text-center">
                <FadeIn>
                    <div className="mb-6 relative inline-block">
                        <h1 className="text-8xl md:text-[150px] font-display font-bold text-ink leading-none">
                            404
                        </h1>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-display font-bold text-ink mb-6">
                        Page Not Found
                        <span dir="rtl" className="block text-xl font-normal text-gold mt-4 font-ar-head">
                            الصفحة غير موجودة
                        </span>
                    </h2>

                    <p className="text-body text-lg md:text-xl max-w-2xl mx-auto mb-12">
                        We couldn't find the page you were looking for. It might have been moved, deleted, or you may have mistyped the address.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
                        <Link href="/" className="group bg-surface hover:shadow-md border border-border p-6 rounded-xl transition-all duration-300">
                            <div className="w-12 h-12 bg-gold-soft rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform text-gold-strong">
                                <Home size={24} />
                            </div>
                            <h3 className="text-ink font-bold mb-2">Back Home</h3>
                            <p className="text-sm text-muted">Return to the main page</p>
                        </Link>

                        <Link href="/fleet" className="group bg-surface hover:shadow-md border border-border p-6 rounded-xl transition-all duration-300">
                            <div className="w-12 h-12 bg-gold-soft rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform text-gold-strong">
                                <Car size={24} />
                            </div>
                            <h3 className="text-ink font-bold mb-2">View Fleet</h3>
                            <p className="text-sm text-muted">Explore our vehicles</p>
                        </Link>

                        <Link href="/contact" className="group bg-surface hover:shadow-md border border-border p-6 rounded-xl transition-all duration-300">
                            <div className="w-12 h-12 bg-gold-soft rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform text-gold-strong">
                                <Phone size={24} />
                            </div>
                            <h3 className="text-ink font-bold mb-2">Contact Us</h3>
                            <p className="text-sm text-muted">Get in touch for help</p>
                        </Link>
                    </div>

                    <Link
                        href="/booking"
                        className="inline-flex items-center gap-3 bg-gold text-ink hover:bg-gold-soft px-8 py-4 rounded-btn font-semibold tracking-wide transition-all hover:-translate-y-0.5"
                    >
                        Book a Ride Instead <ArrowRight size={20} />
                    </Link>
                </FadeIn>
            </div>
        </div>
    );
}
