'use client';

import React, { useState } from 'react';
import FadeIn from '@/components/common/FadeIn';
import { Mail, CheckCircle, ArrowRight, Bell } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

export default function NewsletterSignup() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');

        try {
            const res = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setEmail('');
            } else {
                throw new Error(data.error || 'Failed to subscribe');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <section className="py-24 px-4 relative bg-transparent">
            <div className="container max-w-5xl mx-auto">
                <GlassCard className="relative overflow-hidden p-10 md:p-16 !bg-neutral-900/90 !border-white/10 shadow-2xl backdrop-blur-xl group">

                    {/* Background Accents */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-gold-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-20">

                        {/* Text Content */}
                        <div className="flex-1 text-center md:text-left">
                            <FadeIn>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-primary/10 text-gold-primary text-xs font-bold uppercase tracking-[0.2em] mb-6 border border-gold-primary/20 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                                    <Bell size={14} />
                                    <span>Stay Updated</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-sans">
                                    Join Our Community
                                </h2>
                                <p className="text-gray-400 text-lg leading-relaxed max-w-xl font-light">
                                    Get exclusive travel tips, spiritual guides, and special offers for your Umrah journey delivered directly to your inbox.
                                </p>
                            </FadeIn>
                        </div>

                        {/* Form */}
                        <div className="w-full md:w-auto md:min-w-[420px]">
                            <FadeIn delay={0.2}>
                                {status === 'success' ? (
                                    <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 text-center animate-in fade-in zoom-in duration-300">
                                        <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-green-400 border border-green-500/30">
                                            <CheckCircle size={28} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2 font-sans">Subscribed!</h3>
                                        <p className="text-green-300/80 text-sm">Thank you for joining our newsletter.</p>
                                        <button
                                            onClick={() => setStatus('idle')}
                                            className="mt-6 text-xs text-white/50 hover:text-white underline"
                                        >
                                            Subscribe another email
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                        <div className="relative">
                                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                            <input
                                                type="email"
                                                required
                                                placeholder="Enter your email address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-black/50 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-gold-primary/50 focus:border-gold-primary/50 outline-none transition-all shadow-inner"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="group bg-gold-primary hover:bg-white hover:text-black text-black font-bold py-5 px-8 rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                                        >
                                            {status === 'loading' ? (
                                                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    <span className="uppercase tracking-widest text-sm">Subscribe</span>
                                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                        <p className="text-xs text-gray-600 text-center mt-2 font-light">
                                            We respect your privacy. Unsubscribe at any time.
                                        </p>
                                    </form>
                                )}
                            </FadeIn>
                        </div>
                    </div>
                </GlassCard>
            </div>
        </section>
    );
}
