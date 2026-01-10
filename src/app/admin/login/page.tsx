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
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-50">
            {/* Back to Home Button */}
            <Link
                href="/"
                className="absolute top-6 left-6 z-50 flex items-center gap-2 text-slate-500 hover:text-amber-600 transition-colors group"
            >
                <div className="p-2 rounded-full bg-white/80 border border-slate-200 group-hover:border-amber-200 transition-colors shadow-sm">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                </div>
                <span className="font-medium text-sm">Back to Home</span>
            </Link>

            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <Image
                    src="/images/pattern-bg.jpg" // Assuming a pattern exists, or falling back to a subtle texture if not
                    alt="Pattern"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/0 via-amber-500/5 to-slate-100/50"></div>

            {/* Decorative Orbs */}
            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-amber-400/20 rounded-full blur-[100px] animate-pulse-slow"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-slate-400/20 rounded-full blur-[100px]"></div>

            <div className="w-full max-w-md relative z-10 p-6">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10">
                    {/* Top Accent Line */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300"></div>

                    <div className="p-8 md:p-10">
                        <div className="text-center mb-10">
                            <div className="w-20 h-20 bg-gradient-to-br from-slate-50 to-white rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-md border border-slate-100 group transform transition-transform hover:scale-105">
                                <Lock className="text-amber-500 group-hover:text-amber-600 transition-colors" size={32} />
                            </div>
                            <h1 className="text-3xl font-bold text-slate-800 mb-2 tracking-tight font-playfair">Welcome Back</h1>
                            <p className="text-slate-500 text-sm">Sign in to manage Al Kiswah Transport</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm animate-in fade-in slide-in-from-top-2">
                                <AlertCircle size={18} className="shrink-0" />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" size={20} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all shadow-sm focus:bg-white"
                                        placeholder="admin@alkiswah.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">
                                    Password
                                </label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" size={20} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all shadow-sm focus:bg-white"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:-translate-y-0.5 hover:shadow-amber-500/40 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6 group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
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

                <div className="text-center mt-8 text-slate-400 text-xs">
                    &copy; {new Date().getFullYear()} Al Kiswah Umrah Transport. <br />Protected by Secure RBAC System.
                </div>
            </div>
        </div>
    );
}
