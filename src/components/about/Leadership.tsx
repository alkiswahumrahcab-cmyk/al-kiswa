'use client';

import { Linkedin, Twitter, Mail } from 'lucide-react';
import Image from 'next/image';
import FadeIn from '@/components/common/FadeIn';

export default function Leadership() {

    const team = [
        {
            id: 1,
            name: "Abdul Rahman",
            role: "Senior Chauffeur",
            image: "/images/team/team-1.jpg",
            socials: { linkedin: "#", twitter: "#", email: "#" }
        },
        {
            id: 2,
            name: "Fatima Al-Zahra",
            role: "Customer Care Lead",
            image: "/images/team/team-2.jpg",
            socials: { linkedin: "#", twitter: "#", email: "#" }
        },
        {
            id: 3,
            name: "Mohammed Ali",
            role: "Logistics Manager",
            image: "/images/team/team-3.jpg",
            socials: { linkedin: "#", twitter: "#", email: "#" }
        }
    ];

    return (
        <section className="py-24 bg-transparent border-t border-white/5 relative">
            <div className="container mx-auto px-4">
                <FadeIn>
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-gold-primary font-bold uppercase tracking-[0.2em] text-sm mb-4 block">The People Behind</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-sans">Meet Our Team</h2>
                        <p className="text-lg text-gray-400 leading-relaxed font-light">
                            Dedicated professionals committed to making your journey smooth and memorable.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {team.map((member, index) => (
                        <FadeIn key={member.id} delay={index * 0.1}>
                            <div className="group relative bg-neutral-900 rounded-3xl overflow-hidden border border-white/10 hover:border-gold-primary/50 transition-all duration-500 shadow-2xl">

                                <div className="relative h-96 w-full overflow-hidden">
                                    {/* Fallback pattern if image is missing, usually next/image handles empty src gracefully but better to be safe if local file missing */}
                                    <div className="absolute inset-0 bg-neutral-800 animate-pulse" />

                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 transition-opacity duration-300" />
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-2xl font-bold text-white mb-1 font-sans">{member.name}</h3>
                                    <p className="text-gold-primary font-medium tracking-wide mb-6 text-sm uppercase">{member.role}</p>

                                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        <a href={member.socials.linkedin} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-gold-primary hover:text-black transition-colors backdrop-blur-md">
                                            <Linkedin size={18} />
                                        </a>
                                        <a href={member.socials.twitter} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-gold-primary hover:text-black transition-colors backdrop-blur-md">
                                            <Twitter size={18} />
                                        </a>
                                        <a href={member.socials.email} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-gold-primary hover:text-black transition-colors backdrop-blur-md">
                                            <Mail size={18} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
