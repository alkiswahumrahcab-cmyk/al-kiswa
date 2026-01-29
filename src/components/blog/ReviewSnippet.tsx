'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';

interface ReviewSnippetProps {
    author: string;
    text: string;
    rating?: number;
    location?: string;
}

export default function ReviewSnippet({
    author,
    text,
    rating = 5,
    location
}: ReviewSnippetProps) {
    return (
        <div className="my-8 relative group">
            {/* Decorative background blur */}
            <div className="absolute -inset-1 bg-gradient-to-r from-gold-primary/20 to-emerald-500/20 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition duration-500" />

            <div className="relative bg-white dark:bg-slate-900 border border-gold-primary/20 p-6 rounded-xl shadow-sm">
                <div className="flex gap-1 text-amber-400 mb-3">
                    {[...Array(rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                    ))}
                </div>

                <p className="text-slate-700 dark:text-slate-300 italic mb-4 text-lg leading-relaxed font-serif">
                    &quot;{text}&quot;
                </p>

                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                    <div>
                        <p className="font-bold text-slate-900 dark:text-white text-sm">{author}</p>
                        {location && <p className="text-xs text-slate-500 uppercase tracking-wider">{location}</p>}
                    </div>
                    <Quote className="text-gold-primary/20" size={32} />
                </div>
            </div>
        </div>
    );
}
