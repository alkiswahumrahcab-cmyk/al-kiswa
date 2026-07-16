'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle, ArrowRight, Bell } from 'lucide-react';

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
        <section className="py-24 px-4 relative bg-ink-bg border-y border-ink-surface">
            <div className="container max-w-5xl mx-auto">
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-20">

                    {/* Text Content */}
                    <div className="flex-1 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-[0.14em] mb-6">
                            <Bell size={16} />
                            <span>Stay Updated</span>
                        </div>
                        <h2 className="text-3xl md:text-[44px] font-semibold text-on-ink mb-6 font-display leading-[1.1]">
                            Join Our Community
                        </h2>
                        <p className="text-on-ink-muted text-lg md:text-[19px] leading-[1.65] max-w-xl font-body">
                            Get exclusive travel tips, spiritual guides, and special offers for your Umrah journey delivered directly to your inbox.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="w-full md:w-auto md:min-w-[420px]">
                        {status === 'success' ? (
                            <div className="bg-success-soft border border-success/30 rounded-xl p-8 text-center animate-in fade-in zoom-in duration-300">
                                <div className="w-14 h-14 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4 text-success border border-success/30">
                                    <CheckCircle size={28} />
                                </div>
                                <h3 className="text-2xl font-semibold text-ink mb-2 font-display">Subscribed!</h3>
                                <p className="text-body text-sm">Thank you for joining our newsletter.</p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="mt-6 text-sm font-semibold text-muted hover:text-ink transition-colors"
                                >
                                    Subscribe another email
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-on-ink-muted" size={20} />
                                    <input
                                        type="email"
                                        required
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-ink-surface border border-border-strong rounded-md py-4 pl-12 pr-4 text-on-ink placeholder:text-on-ink-muted focus:ring-1 focus:ring-gold focus:border-gold outline-none transition-colors text-base"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="group bg-gold hover:bg-gold-soft text-ink font-semibold py-4 px-8 rounded-btn transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                >
                                    {status === 'loading' ? (
                                        <div className="w-5 h-5 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <span className="text-base">Subscribe</span>
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                                        </>
                                    )}
                                </button>
                                <p className="text-sm text-on-ink-muted text-center mt-2 font-body">
                                    We respect your privacy. Unsubscribe at any time.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
