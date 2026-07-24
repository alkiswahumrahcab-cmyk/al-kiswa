'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Redirect to home page if the user refreshes the login page
        const navigationEntries = performance.getEntriesByType('navigation');
        if (navigationEntries.length > 0) {
            const navEntry = navigationEntries[0] as PerformanceNavigationTiming;
            if (navEntry.type === 'reload') {
                router.push('/');
            }
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: email, password }),
            });

            const data = await res.json();

            if (data.success) {
                router.push('/admin');
                router.refresh();
            } else {
                setError(data.error || 'Login failed');
            }
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    console.log('Rendering LoginPage');

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-surface">
            {/* Left Column - Branding (Dark Anchor) */}
            <div className="w-full lg:w-5/12 bg-ink-bg relative flex flex-col justify-between p-8 lg:p-12 overflow-hidden text-on-ink">
                
                {/* Decorative Glowing Orbs for Luxury Feel */}
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-[-10%] right-[-20%] w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

                {/* Pattern overlay for extra texture */}
                <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
                    <Image
                        src="/pattern.png"
                        alt="Pattern"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                
                {/* Top decorative gradient */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>

                <div className="relative z-10">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-on-ink-muted hover:text-gold transition-colors group mb-12"
                    >
                        <div className="p-2 rounded-btn bg-white/5 border border-white/10 group-hover:border-gold/50 transition-colors">
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        </div>
                        <span className="font-medium text-sm">Back to Home</span>
                    </Link>
                    
                    <h1 className="text-4xl lg:text-5xl font-display font-semibold mb-4 leading-tight">
                        Al Kiswah <br /> <span className="text-gold italic">Command Center</span>
                    </h1>
                    <p className="text-on-ink-muted text-lg font-body max-w-sm">
                        Secure portal for managing VIP Umrah and Hajj transport operations.
                    </p>
                </div>

                <div className="relative z-10 mt-12 lg:mt-0">
                    <div className="flex items-center gap-4 text-on-ink-muted text-sm">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                            <Lock size={18} className="text-gold" />
                        </div>
                        <div>
                            <p className="font-semibold text-on-ink">Protected Access</p>
                            <p>Authorized personnel only</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column - Login Form */}
            <div className="w-full lg:w-7/12 flex items-center justify-center p-8 lg:p-12 bg-surface relative">
                <div className="w-full max-w-md">
                    <div className="mb-10">
                        <h2 className="text-3xl font-display font-semibold text-ink mb-2">Welcome Back</h2>
                        <p className="text-muted font-body">Sign in to your administrative account</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-error-soft border border-error/20 rounded-md flex items-start gap-3 text-error text-sm">
                            <AlertCircle size={18} className="shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-muted uppercase tracking-wider">
                                Email Address
                            </label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-gold transition-colors" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 h-12 rounded-md border border-border-strong bg-surface text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                                    placeholder="admin@alkiswah.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-muted uppercase tracking-wider">
                                Password
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-gold transition-colors" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-4 h-12 rounded-md border border-border-strong bg-surface text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 mt-6 bg-gold hover:bg-gold-soft text-ink font-semibold rounded-btn shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <>
                                    <span>Sign In to Dashboard</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 pt-6 border-t border-border text-center">
                        <p className="text-xs text-muted">
                            &copy; {new Date().getFullYear()} Al Kiswah Umrah Transport.<br />
                            All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
