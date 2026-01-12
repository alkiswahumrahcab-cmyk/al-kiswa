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
                        className="flex flex-col md:flex-row items-center justify-center gap-12 mb-16 p-8 bg-white/5 rounded-3xl border border-white/5 max-w-4xl mx-auto"
                    >
                        <div className="flex items-center gap-8">
                            <div className="text-center">
                                <div className="text-6xl font-bold text-white tracking-tighter">{averageRating}</div>
                                <div className="flex gap-1 justify-center mt-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} className={`${i < Math.round(Number(averageRating)) ? 'fill-gold-primary text-gold-primary' : 'text-gray-700'}`} />
                                    ))}
                                </div>
                                <div className="text-sm text-gray-400 mt-2 font-medium uppercase tracking-wider">{totalReviews} Reviews</div>
                            </div>

                            <div className="h-16 w-px bg-white/10" />

                            <div className="space-y-2">
                                {[5, 4, 3, 2, 1].map((star) => (
                                    <div key={star} className="flex items-center gap-3 text-xs font-medium">
                                        <span className="text-gray-400 w-3">{star}</span>
                                        <div className="w-32 h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
                                            <div
                                                className="h-full bg-gold-primary rounded-full"
                                                style={{ width: `${totalReviews > 0 ? (ratingCounts[star as keyof typeof ratingCounts] / totalReviews) * 100 : 0}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-4">
                            <a
                                href="https://search.google.com/local/writereview?placeid=ChIJmdXkoZ0dwhURzAKZlMOFpLg"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-gold-primary text-black hover:bg-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs transition-all shadow-lg hover:shadow-gold-primary/20 transform hover:-translate-y-0.5"
                            >
                                <MessageSquarePlus size={18} />
                                <span>Write a Review</span>
                            </a>
                            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-green-500 text-black">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </span>
                                <span>Verified on Google</span>
                            </div>
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
