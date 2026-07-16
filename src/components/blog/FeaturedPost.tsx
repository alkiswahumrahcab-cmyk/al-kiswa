import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Sparkles } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

interface FeaturedPostProps {
    post: {
        slug: string;
        title: string;
        excerpt: string;
        image: string;
        alt: string;
        category: string;
        author: string;
        readTime: string;
        date: Date | string;
    };
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
    const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <section className="mb-24 relative group">
            <div className="p-0 overflow-hidden rounded-xl border border-border shadow-md bg-surface transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
                <Link href={`/blog/${post.slug}`} className="grid grid-cols-1 lg:grid-cols-5 min-h-[500px]">

                    {/* Image Section (60%) */}
                    <div className="relative h-[300px] lg:h-full lg:col-span-3 overflow-hidden bg-surface-alt">
                        <Image
                            src={post.image}
                            alt={post.alt}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 1024px) 100vw, 60vw"
                        />
                    </div>

                    {/* Content Section (40%) */}
                    <div className="relative p-8 lg:p-12 lg:col-span-2 flex flex-col justify-center bg-surface border-t lg:border-t-0 lg:border-l border-border">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-4 py-1 bg-gold text-ink text-xs font-semibold uppercase tracking-widest rounded-pill flex items-center gap-2">
                                <Sparkles size={12} />
                                Featured
                            </span>
                            <span className="text-sm font-semibold text-gold-strong uppercase tracking-widest">
                                {post.category}
                            </span>
                        </div>

                        <h3 className="text-3xl lg:text-4xl font-semibold font-display text-ink mb-4 leading-tight">
                            {post.title}
                        </h3>

                        <p className="text-lg text-body mb-8 leading-relaxed font-body">
                            {post.excerpt}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center gap-4 text-sm font-medium text-muted mb-8">
                            <span className="flex items-center gap-1.5">
                                <Calendar size={14} className="text-gold-strong" />
                                {formattedDate}
                            </span>
                            <span className="w-1 h-1 rounded-pill bg-border-strong" />
                            <span className="flex items-center gap-1.5">
                                <Clock size={14} className="text-gold-strong" />
                                {post.readTime}
                            </span>
                        </div>

                        <div className="inline-flex items-center gap-2 text-gold-strong font-semibold uppercase tracking-widest text-sm group/btn">
                            Read Full Article
                            <ArrowRight size={18} className="transition-transform duration-200 group-hover/btn:translate-x-1" />
                        </div>
                    </div>
                </Link>
            </div>
        </section>
    );
}
