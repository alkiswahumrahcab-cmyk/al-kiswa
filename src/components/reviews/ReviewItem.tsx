import React from 'react';
import Image from 'next/image';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

interface ReviewProps {
    review: {
        id: string;
        author: string;
        rating: number;
        comment: string;
        date: string;
        avatar?: string;
    };
}

export default function ReviewItem({ review }: ReviewProps) {
    return (
        <GlassCard
            className="h-full flex flex-col relative group border border-white/5 hover:border-gold-primary/30 transition-all duration-500 bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden"
            hoverEffect={true}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

            {/* Quote Icon Background */}
            <div className="absolute top-6 right-6 text-white/5 group-hover:text-gold-primary/10 transition-colors duration-500">
                <Quote size={80} className="rotate-12" />
            </div>

            <div className="relative z-10 flex flex-col h-full p-6 md:p-8">

                {/* Header: Stars & Badge */}
                <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={16}
                                className={`${i < review.rating ? 'fill-gold-primary text-gold-primary' : 'text-gray-700'} transition-colors duration-300`}
                            />
                        ))}
                    </div>
                    {review.rating >= 4 && (
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                            <CheckCircle2 size={12} className="text-emerald-400" />
                            <span>Verified</span>
                        </div>
                    )}
                </div>

                {/* Review Content */}
                <blockquote className="flex-grow mb-8">
                    <p className="text-gray-300 group-hover:text-white transition-colors duration-300 leading-relaxed font-sans text-base lg:text-lg font-light">
                        &quot;{review.comment}&quot;
                    </p>
                </blockquote>

                {/* Footer: Author Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/10 mt-auto">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white/10 border border-white/10 group-hover:border-gold-primary/50 transition-colors duration-300">
                        {review.avatar ? (
                            <Image src={review.avatar} alt={review.author} fill className="object-cover" unoptimized />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-white font-bold font-serif bg-gradient-to-br from-gray-700 to-black">
                                {review.author?.charAt(0) || '?'}
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="font-bold text-white text-base font-sans tracking-wide group-hover:text-gold-primary transition-colors">
                            {review.author}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mt-0.5">
                            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.24.81-.6z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Google Review
                            </span>
                            <span className="opacity-30">•</span>
                            <span suppressHydrationWarning className="opacity-60">{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}
