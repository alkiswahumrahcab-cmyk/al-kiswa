'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Car, Phone, ArrowLeft } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';

export default function NotFoundArabic() {
    return (
        <div className="min-h-screen bg-primary-black flex items-center justify-center relative overflow-hidden font-arabic" dir="rtl">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none" />

            {/* Glowing Effects */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gold-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 text-center">
                <FadeIn>
                    <div className="mb-8 relative inline-block">
                        <h1 className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37] to-neutral-900 leading-none select-none opacity-20 transform translate-y-4">
                            404
                        </h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-6xl md:text-8xl font-bold text-white drop-shadow-2xl">
                                404
                            </span>
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        الصفحة غير موجودة
                    </h2>

                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                        عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها. ربما تم نقلها أو حذفها، أو ربما أدخلت الرابط بشكل خاطئ.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
                        <Link href="/ar" className="group bg-neutral-900/50 hover:bg-neutral-900 border border-white/10 hover:border-gold-primary/50 p-6 rounded-2xl transition-all duration-300">
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform text-gold-primary">
                                <Home size={24} />
                            </div>
                            <h3 className="text-white font-bold mb-2 text-xl">الرئيسية</h3>
                            <p className="text-sm text-gray-500">العودة للصفحة الرئيسية</p>
                        </Link>

                        <Link href="/ar/fleet" className="group bg-neutral-900/50 hover:bg-neutral-900 border border-white/10 hover:border-gold-primary/50 p-6 rounded-2xl transition-all duration-300">
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform text-gold-primary">
                                <Car size={24} />
                            </div>
                            <h3 className="text-white font-bold mb-2 text-xl">سياراتنا</h3>
                            <p className="text-sm text-gray-500">تصفح أسطول سياراتنا</p>
                        </Link>

                        <Link href="/ar/contact" className="group bg-neutral-900/50 hover:bg-neutral-900 border border-white/10 hover:border-gold-primary/50 p-6 rounded-2xl transition-all duration-300">
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform text-gold-primary">
                                <Phone size={24} />
                            </div>
                            <h3 className="text-white font-bold mb-2 text-xl">اتصل بنا</h3>
                            <p className="text-sm text-gray-500">تواصل معنا للمساعدة</p>
                        </Link>
                    </div>

                    <Link
                        href="/ar/booking"
                        className="inline-flex items-center justify-center gap-3 bg-gold-primary text-black hover:bg-white px-10 py-4 rounded-full font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:-translate-y-1"
                    >
                        احجز رحلتك الآن <ArrowLeft size={20} />
                    </Link>
                </FadeIn>
            </div>
        </div>
    );
}
