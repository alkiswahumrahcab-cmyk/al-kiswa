'use strict';
import React from 'react';
import { AlertTriangle, Clock, Phone, ShieldCheck, Zap } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';

export default function SafetyPromise() {
    return (
        <section className="py-24 relative overflow-hidden bg-transparent">
            <div className="container mx-auto px-4">
                <div className="bg-neutral-900/50 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl relative border border-white/10">
                    {/* Decorative Background Effects */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>

                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 p-8 md:p-12 items-center">

                        {/* Left Column: Content */}
                        <div className="order-2 lg:order-1 flex flex-col justify-center">
                            {/* Alert Banner */}
                            <FadeIn>
                                <div className="inline-flex items-start md:items-center gap-3 px-4 py-3 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-sm md:text-base font-medium mb-8 max-w-xl group hover:bg-[#D4AF37]/15 transition-colors cursor-default">
                                    <AlertTriangle className="shrink-0 text-[#D4AF37] animate-pulse" size={20} />
                                    <span className="leading-snug text-gray-200">
                                        <strong className="text-[#D4AF37]">Guarantee:</strong> In the unlikely event of any issue, a replacement vehicle is routed to you instantly.
                                    </span>
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.1}>
                                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-sans leading-tight tracking-tight">
                                    Our "Never Stranded" <br className="hidden md:block" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3D383] to-[#D4AF37]">Promise</span>
                                </h2>

                                <p className="text-gray-400 text-base md:text-lg lg:text-xl mb-10 leading-relaxed max-w-xl font-light">
                                    We don't just hope for the best; we engineer for the unexpected.
                                    Our <strong>Emergency Deployment Protocol</strong> ensures your spiritual journey remains uninterrupted, no matter what.
                                </p>
                            </FadeIn>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                {/* Feature Card 1: 60 Min Target */}
                                <FadeIn delay={0.2}>
                                    <div className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300">
                                        <div className="bg-[#D4AF37]/10 rounded-lg p-3 text-[#D4AF37] group-hover:scale-110 transition-transform border border-[#D4AF37]/20">
                                            <Clock size={24} strokeWidth={2.5} />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-lg leading-none mb-1.5 group-hover:text-[#D4AF37] transition-colors font-sans">60 Min Target</h4>
                                            <p className="text-gray-500 text-xs md:text-sm font-medium group-hover:text-gray-400">Max wait for replacement</p>
                                        </div>
                                    </div>
                                </FadeIn>

                                {/* Feature Card 2: 24/7 Command */}
                                <FadeIn delay={0.3}>
                                    <div className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300">
                                        <div className="bg-[#D4AF37]/10 rounded-lg p-3 text-[#D4AF37] group-hover:scale-110 transition-transform border border-[#D4AF37]/20">
                                            <Phone size={24} strokeWidth={2.5} />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-lg leading-none mb-1.5 group-hover:text-[#D4AF37] transition-colors font-sans">24/7 Command</h4>
                                            <p className="text-gray-500 text-xs md:text-sm font-medium group-hover:text-gray-400">Direct Ops Manager Line</p>
                                        </div>
                                    </div>
                                </FadeIn>
                            </div>
                        </div>

                        {/* Right Column: Visual SOP Interface */}
                        <div className="order-1 lg:order-2">
                            <FadeIn delay={0.4}>
                                <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-white/10 to-transparent shadow-2xl">
                                    <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 md:p-8 relative overflow-hidden border border-white/5">

                                        {/* Status Badge */}
                                        <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
                                            <div className="flex items-center gap-2">
                                                <ShieldCheck className="text-[#D4AF37]" size={20} />
                                                <span className="text-gray-400 text-xs font-mono uppercase tracking-widest">Protocol Status</span>
                                            </div>
                                            <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-[10px] md:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-2 animate-pulse">
                                                <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
                                                Active & Ready
                                            </div>
                                        </div>

                                        <h4 className="text-white font-bold text-xl md:text-2xl mb-6 font-sans">Standard Operating Procedure</h4>

                                        <div className="space-y-4">
                                            {[
                                                {
                                                    step: 1,
                                                    title: "Secure & Comfort",
                                                    desc: "Driver secures vehicle in safe zone. AC & Water provided immediately."
                                                },
                                                {
                                                    step: 2,
                                                    title: "Rapid Deployment",
                                                    desc: "Nearest standby unit dispatched from Makkah/Madinah bases."
                                                },
                                                {
                                                    step: 3,
                                                    title: "Instant Refund",
                                                    desc: "Full refund or credit processed for the inconvenience."
                                                }
                                            ].map((item, idx) => (
                                                <div key={idx} className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-default border border-transparent hover:border-white/5">
                                                    <div className="flex-shrink-0 relative">
                                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black border border-white/10 flex items-center justify-center text-[#D4AF37] font-bold font-mono group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300 z-10 relative shadow-lg">
                                                            {item.step}
                                                        </div>
                                                        {idx !== 2 && <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1px] h-full bg-white/10 group-hover:bg-white/20 transition-colors -z-0"></div>}
                                                    </div>
                                                    <div>
                                                        <h5 className="text-white font-bold text-sm md:text-base mb-1 group-hover:text-[#D4AF37] transition-colors font-sans">{item.title}</h5>
                                                        <p className="text-gray-400 text-xs md:text-sm leading-relaxed group-hover:text-gray-300 transition-colors font-light">
                                                            {item.desc}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Action Button */}
                                        <div className="mt-8 pt-6 border-t border-white/5 text-center">
                                            <a href="/safety" className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2 group">
                                                View Full Safety Documentation
                                                <Zap size={14} className="text-[#D4AF37] group-hover:fill-[#D4AF37] transition-all" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
