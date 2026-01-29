'use client';

import React, { useEffect, useState } from 'react';
import ReviewsCarousel from './ReviewsCarousel';
import { Star, MessageSquarePlus, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Review {
    id: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
    avatar?: string;
}

export default function ReviewsSection() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch('/api/reviews');
                const data = await res.json();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const formattedData = data.map((review: any) => ({
                    ...review,
                    id: review._id || review.id
                }));
                setReviews(formattedData);
            } catch (error) {
                console.error('Failed to load reviews:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    // Skeleton Loader
    if (loading) {
        return (
            <section className="py-24 relative overflow-hidden bg-primary-black">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-12 space-y-4">
                        <div className="h-4 w-48 bg-white/10 rounded-full mx-auto animate-pulse" />
                        <div className="h-12 w-3/4 max-w-lg bg-white/10 rounded-2xl mx-auto animate-pulse" />
                        <div className="h-4 w-1/2 max-w-sm bg-white/10 rounded-xl mx-auto animate-pulse" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white/5 border border-white/5 rounded-3xl p-8 h-80 animate-pulse flex flex-col">
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, j) => (
                                        <div key={j} className="w-4 h-4 rounded-full bg-white/10" />
                                    ))}
                                </div>
                                <div className="space-y-3 flex-1">
                                    <div className="h-3 w-full bg-white/10 rounded" />
                                    <div className="h-3 w-5/6 bg-white/10 rounded" />
                                    <div className="h-3 w-4/6 bg-white/10 rounded" />
                                </div>
                                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/5">
                                    <div className="w-10 h-10 rounded-full bg-white/10" />
                                    <div className="space-y-2">
                                        <div className="h-3 w-24 bg-white/10 rounded" />
                                        <div className="h-2 w-16 bg-white/10 rounded" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // Calculate statistics
    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
        : "5.0";

    const ratingCounts = {
        5: reviews.filter(r => r.rating === 5).length,
        4: reviews.filter(r => r.rating === 4).length,
        3: reviews.filter(r => r.rating === 3).length,
        2: reviews.filter(r => r.rating === 2).length,
        1: reviews.filter(r => r.rating === 1).length,
    };

    return (
        <section className="py-24 relative overflow-hidden bg-primary-black">
            {/* Subtle Background */}
            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-primary/10 border border-gold-primary/20 mb-6"
                    >
                        <Star size={14} className="fill-gold-primary text-gold-primary" />
                        <span className="text-sm font-bold text-gold-primary uppercase tracking-widest">
                            <span className="text-white">{averageRating}/5</span> Average Rating
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold font-sans text-white mb-6"
                    >
                        Trusted by <span className="text-gold-primary">Pilgrims</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-light mb-12"
                    >
                        Join the community of pilgrims who trust Al Kiswah Transport for their spiritual journey.
                    </motion.p>

                    {/* Simplified Rating Summary */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16 p-10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-2xl border border-white/10 max-w-5xl mx-auto relative overflow-hidden"
                    >
                        {/* Subtle Top Shine */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                        {/* Rating Stats - Left */}
                        <div className="flex flex-col sm:flex-row items-center gap-8 lg:gap-12 flex-1">
                            {/* Big Score */}
                            <div className="text-center min-w-[140px]">
                                <div className="text-6xl font-serif font-medium text-white tracking-tight">{averageRating}</div>
                                <div className="flex gap-1 justify-center my-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={18} className={`${i < Math.round(Number(averageRating)) ? 'fill-gold-primary text-gold-primary' : 'text-gray-600'}`} />
                                    ))}
                                </div>
                                <div className="text-xs text-gray-400 font-medium tracking-widest uppercase opacity-80">{totalReviews} Reviews</div>
                            </div>

                            {/* Divider for mobile/desktop */}
                            <div className="h-px w-24 sm:w-px sm:h-20 bg-white/10" />

                            {/* Rating Bars */}
                            <div className="space-y-2 w-full max-w-xs px-2">
                                {[5, 4, 3, 2, 1].map((star) => (
                                    <div key={star} className="flex items-center gap-4 text-[11px] font-medium text-gray-400">
                                        <span className="w-2">{star}</span>
                                        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gold-primary rounded-full opacity-90"
                                                style={{ width: `${totalReviews > 0 ? (ratingCounts[star as keyof typeof ratingCounts] / totalReviews) * 100 : 0}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Call to Action - Right */}
                        <div className="flex flex-col items-center lg:items-end gap-5 lg:pl-12 lg:border-l border-white/5">
                            <div className="flex items-center gap-3 bg-[#1F1F1F] border border-white/5 pr-4 pl-3 py-1.5 rounded-full">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.24.81-.6z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                <div className="flex flex-col leading-none">
                                    <span className="text-[9px] text-gray-400 uppercase tracking-wider font-bold">Recommended on</span>
                                    <span className="text-xs font-bold text-white tracking-wide">Google Reviews</span>
                                </div>
                            </div>

                            <a
                                href="https://search.google.com/local/writereview?placeid=ChIJmdXkoZ0dwhURzAKZlMOFpLg"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 bg-white text-black hover:bg-gold-primary px-8 py-3.5 rounded-lg font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                            >
                                <span>Write a Review</span>
                                <MessageSquarePlus size={16} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </motion.div>
                </div>

                <ReviewsCarousel reviews={reviews} />

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <a
                        href="https://www.google.com/maps?cid=13304906274217460428"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold-primary hover:text-white transition-colors text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 group"
                    >
                        <span>Read all reviews on Google</span>
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
