
'use client';

import { useState } from 'react';
import { Mail, RefreshCw, AlertCircle, CheckCircle, Send, ShoppingCart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MarketingPage() {
    const [stats, setStats] = useState<{ processed: number; succeeded: number; failed: number, skipped?: number } | null>(null);
    const [loadingType, setLoadingType] = useState<string | null>(null);
    const [error, setError] = useState('');

    const runBatchProcessing = async (type: 'reviews' | 'abandoned-recovery') => {
        setLoadingType(type);
        setError('');
        setStats(null);

        const endpoint = type === 'reviews'
            ? '/api/marketing/reviews/send-batch'
            : '/api/marketing/abandoned-recovery/send-batch';

        try {
            const res = await fetch(endpoint, { method: 'POST' });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Failed to run batch');

            // Different response structures for different endpoints, normalize if needed
            // Review Batch returns { stats: ... }
            // Recovery Batch returns { results: ... }
            setStats(type === 'reviews' ? data.stats : data.results);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoadingType(null);
        }
    };

    return (
        <div className="min-h-screen p-8 font-sans">
            <h1 className="text-3xl font-bold text-ink mb-2">Marketing Automation</h1>
            <p className="text-muted mb-8">Manage automated email campaigns and measure effectiveness.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Review Collection Card */}
                <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-ink flex items-center gap-2">
                                <Mail className="text-gold" />
                                Post-Trip Reviews
                            </h2>
                            <p className="text-sm text-muted mt-1">
                                Automatically ask customers for feedback 2 hours after their trip is completed.
                            </p>
                        </div>
                    </div>

                    <div className="bg-surface-sunken rounded-xl p-4 mb-6 border border-border">
                        <div className="flex items-center gap-3 text-sm text-muted">
                            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                            <span>Status: <strong className="text-ink">Active (Manual Trigger)</strong></span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={() => runBatchProcessing('reviews')}
                            disabled={!!loadingType}
                            className="w-full py-3 bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loadingType === 'reviews' ? (
                                <>
                                    <RefreshCw className="animate-spin" /> Processing...
                                </>
                            ) : (
                                <>
                                    <Send size={18} /> Run Review Batch
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Abandoned Cart Recovery */}
                <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-ink flex items-center gap-2">
                                <div className="bg-error/10 p-1.5 rounded-lg">
                                    <AlertCircle className="w-5 h-5 text-error" />
                                </div>
                                Abandoned Cart Recovery
                            </h2>
                            <p className="text-sm text-muted mt-1">
                                Recover lost bookings by emailing users who dropped off ({'>'} 15 mins inactive).
                            </p>
                        </div>
                    </div>

                    <div className="bg-surface-sunken rounded-xl p-4 mb-6 border border-border">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted">Recovery Window</span>
                            <span className="font-bold text-ink">15m - 24h</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={() => runBatchProcessing('abandoned-recovery')}
                            disabled={!!loadingType}
                            className="w-full py-3 bg-rose-500 hover:bg-rose-600 active:scale-[0.98] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loadingType === 'abandoned-recovery' ? (
                                <>
                                    <RefreshCw className="animate-spin" /> Processing...
                                </>
                            ) : (
                                <>
                                    <Send size={18} /> Run Recovery Batch
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Results Display */}
            {stats && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 p-6 bg-surface border border-border rounded-2xl shadow-lg"
                >
                    <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                        <CheckCircle className="text-success" /> Batch Results
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="bg-surface-sunken p-4 rounded-xl border border-border">
                            <div className="text-xs text-muted uppercase font-bold mb-1">Processed</div>
                            <div className="text-2xl font-black text-ink">{stats.processed}</div>
                        </div>
                        <div className="bg-success/10 p-4 rounded-xl border border-success/20">
                            <div className="text-xs text-success uppercase font-bold mb-1">Sent Successfully</div>
                            <div className="text-2xl font-black text-success">{stats.succeeded}</div>
                        </div>
                        <div className="bg-error/10 p-4 rounded-xl border border-error/20">
                            <div className="text-xs text-error uppercase font-bold mb-1">Failed</div>
                            <div className="text-2xl font-black text-error">{stats.failed}</div>
                        </div>
                        <div className="bg-info/10 p-4 rounded-xl border border-info/20">
                            <div className="text-xs text-info uppercase font-bold mb-1">Skipped (Converted)</div>
                            <div className="text-2xl font-black text-info">{stats.skipped || 0}</div>
                        </div>
                    </div>
                </motion.div>
            )}

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-error/10 text-error rounded-xl flex items-center gap-2 border border-error/20"
                >
                    <AlertCircle size={18} /> {error}
                </motion.div>
            )}
        </div>
    );
}
