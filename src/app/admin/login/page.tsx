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
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-primary-black">
            {/* Back to Home Button */}
            <Link
                href="/"
                className="absolute top-6 left-6 z-50 flex items-center gap-2 text-gray-400 hover:text-gold-primary transition-colors group"
            >
                <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:border-gold-primary/50 transition-colors shadow-sm">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                </div>
                <span className="font-medium text-sm">Back to Home</span>
            </Link>

            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                <Image
                    src="/pattern.png"
                    alt="Pattern"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary-black via-primary-black to-emerald-950/20"></div>

            {/* Decorative Orbs */}
            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-gold-primary/10 rounded-full blur-[100px] animate-pulse-slow"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-gem-emerald/10 rounded-full blur-[100px]"></div>

            <div className="w-full max-w-md relative z-10 p-6">
                <div className="bg-primary-black/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:border-gold-primary/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                    {/* Top Accent Line */}
                    <div className="h-1 w-full bg-gradient-to-r from-transparent via-gold-primary to-transparent opacity-50"></div>

                    <div className="p-8 md:p-10">
                        <div className="text-center mb-10">
                            <div className="w-20 h-20 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-inner border border-white/5 group transform transition-transform hover:scale-105">
                                <Lock className="text-gold-primary group-hover:text-gold-light transition-colors drop-shadow-md" size={32} />
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight font-sans">Welcome Back</h1>
                            <p className="text-gray-400 text-sm">Sign in to manage Al Kiswah Transport</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm animate-in fade-in slide-in-from-top-2">
                                <AlertCircle size={18} className="shrink-0" />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 ml-1 uppercase tracking-wider">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gold-primary transition-colors" size={20} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gold-primary/20 focus:border-gold-primary/50 transition-all shadow-sm focus:bg-white/10"
                                        placeholder="admin@alkiswah.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 ml-1 uppercase tracking-wider">
                                    Password
                                </label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gold-primary transition-colors" size={20} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gold-primary/20 focus:border-gold-primary/50 transition-all shadow-sm focus:bg-white/10"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-gold-primary to-gold-dark hover:from-white hover:to-white hover:text-black text-black font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8 group relative overflow-hidden"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin relative z-10" />
                                        <span className="relative z-10">Signing in...</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="relative z-10">Sign In to Dashboard</span>
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform relative z-10" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="text-center mt-8 text-gray-500 text-xs">
                    &copy; {new Date().getFullYear()} Al Kiswah Umrah Transport. <br />Protected by Secure RBAC System.
                </div>
            </div>
        </div>
    );
}
