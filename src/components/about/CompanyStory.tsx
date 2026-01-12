'use client';

import GlassCard from '@/components/ui/GlassCard';
import { Flag, Trophy, Heart, Briefcase } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';

export default function CompanyStory() {

    const timeline = [
        {
            year: '2015',
            title: 'The Beginning',
            desc: 'Founded with a sincere intention to serve the guests of Allah with honor and dignity.',
            icon: Flag
        },
        {
            year: '2018',
            title: 'Growing Trust',
            desc: 'Expanded our fleet and network, earning the trust of thousands of pilgrims worldwide.',
            icon: Briefcase
        },
        {
            year: '2020',
            title: 'Resilience & Care',
            desc: 'Maintained the highest safety standards during challenging global times, putting health first.',
            icon: Heart
        },
        {
            year: '2024',
            title: 'Excellence in Motion',
            desc: 'Recognized as a premier transport provider, setting new standards for luxury and reliability.',
            icon: Trophy
        }
    ];

    return (
        <section className="py-24 bg-primary-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none" />

            {/* Center Line Background */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-primary/30 to-transparent -translate-x-1/2 hidden md:block" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <FadeIn>
                        <span className="text-gold-primary font-bold uppercase tracking-[0.2em] text-sm mb-4 block">Our History</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-sans">
                            Our Sacred Journey
                        </h2>
                        <p className="text-lg text-gray-400 leading-relaxed font-light">
                            From a humble beginning to a leading service provider, our path has always been guided by faith, dedication, and the privilege of serving pilgrims.
                        </p>
                    </FadeIn>
                </div>

                <div className="relative">
                    {/* Mobile Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10 md:hidden" />

                    <div className="space-y-12 md:space-y-0">
                        {timeline.map((item, index) => (
                            <div key={item.year} className={`relative md:flex items-center justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} group`}>

                                {/* Center Dot */}
                                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-gold-primary rounded-full border-4 border-black shadow-[0_0_15px_rgba(212,175,55,0.5)] -translate-x-1/2 z-10 group-hover:scale-150 transition-transform duration-300" />

                                {/* Empty space for the other side */}
                                <div className="hidden md:block w-5/12" />

                                {/* Content Card */}
                                <div className="ml-16 md:ml-0 md:w-5/12">
                                    <GlassCard delay={index * 0.2} className="p-8 relative hover:-translate-y-2 transition-transform duration-500 border-l-4 border-l-gold-primary bg-neutral-900/60 border-t-white/5 border-r-white/5 border-b-white/5">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="bg-gold-primary/10 p-3 rounded-xl text-gold-primary border border-gold-primary/20">
                                                <item.icon size={24} />
                                            </div>
                                            <span className="text-4xl font-bold font-sans text-white">{item.year}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3 font-sans">{item.title}</h3>
                                        <p className="text-gray-400 leading-relaxed font-light">
                                            {item.desc}
                                        </p>
                                    </GlassCard>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
