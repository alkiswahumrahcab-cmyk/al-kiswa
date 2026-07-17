import React from 'react';
import { Star } from 'lucide-react';

interface ReviewProps {
    review: {
        id: string;
        author: string;
        rating: number;
        comment: string;
        date: string;
        avatar?: string;
    };
    lang?: 'ar' | 'en';
}

export default function ReviewItem({ review, lang = 'en' }: ReviewProps) {
    return (
        <div className="bg-ivory p-8 rounded-[16px] border border-hairline h-full flex flex-col relative shadow-sm group hover:border-gold/30 hover:shadow-md transition-all duration-300">
            {/* Stars */}
            <div className="flex text-gold mb-6">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={16}
                        className={`${i < review.rating ? 'fill-gold text-gold' : 'text-muted'} transition-colors duration-300`}
                    />
                ))}
            </div>
            
            {/* Quote */}
            <p className={`text-charcoal-soft italic leading-[1.7] mb-8 text-lg group-hover:text-charcoal transition-colors duration-300 line-clamp-4 ${lang === 'ar' ? 'font-ar-body' : 'font-display'}`}>
                "{review.comment}"
            </p>
            
            {/* Footer */}
            <div className="mt-auto flex items-center justify-between pt-4 border-t border-hairline">
                <div className={`font-semibold text-charcoal ${lang === 'ar' ? 'font-ar-head' : ''}`}>{review.author}</div>
                <div className="text-muted text-sm flex items-center gap-2">
                    <span suppressHydrationWarning>{new Date(review.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}</span>
                </div>
            </div>
        </div>
    );
}

