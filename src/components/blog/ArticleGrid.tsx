import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FadeIn from '@/components/common/FadeIn';
import { Search, Clock, ArrowRight, CalendarDays } from 'lucide-react';

// Define a flexible shape to handle both data sources
interface BlogPost {
    _id?: string;
    id?: string;
    slug?: string;
    title: string;
    excerpt: string;
    image: string;
    alt: string;
    category: string;
    date: Date | string;
    readTime: string;
}

interface ArticleGridProps {
    posts: BlogPost[];
    categories?: string[];
    activeCategory?: string;
    onCategoryChange?: (cat: string) => void;
    searchTerm?: string;
    onSearchChange?: (term: string) => void;
    currentPage?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
}

export default function ArticleGrid({
    posts,
    categories,
    activeCategory,
    onCategoryChange,
    searchTerm,
    onSearchChange,
    currentPage,
    totalPages,
    onPageChange
}: ArticleGridProps) {
    return (
        <div>
            {/* Filters Section */}
            {(categories || searchTerm !== undefined) && (
                <div className="mb-12 space-y-6">
                    {/* Search and Categories */}
                    <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
                        {/* Categories */}
                        {categories && onCategoryChange && (
                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => onCategoryChange(cat)}
                                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat
                                            ? 'bg-gold-primary text-black shadow-lg shadow-gold-primary/20'
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Search */}
                        {onSearchChange && (
                            <div className="relative w-full md:w-64">
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchTerm}
                                    onChange={(e) => onSearchChange(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-neutral-900/50 border border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-gold-primary text-sm text-white placeholder-gray-500"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((article, index) => {
                    const linkSlug = article.slug || article.id;
                    if (!linkSlug) return null;

                    return (
                        <FadeIn key={linkSlug} delay={index * 0.05}>
                            <Link href={`/blog/${linkSlug}`} className="group h-full block">
                                <article className="h-full flex flex-col bg-black/40 rounded-3xl overflow-hidden border border-white/10 hover:border-gold-primary/30 shadow-sm hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-500 hover:-translate-y-2 relative isolate backdrop-blur-sm">

                                    {/* Image */}
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={article.image}
                                            alt={article.alt}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                                        {/* Category Badge */}
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-gold-primary rounded-full border border-white/10">
                                                {article.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex items-center gap-4 text-xs font-medium text-gray-400 mb-4">
                                            <span className="flex items-center gap-1.5">
                                                <CalendarDays size={14} className="text-gold-primary" />
                                                {// Handle both Date object and string date
                                                    new Date(article.date).toLocaleDateString(undefined, {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                            </span>
                                            <span className="w-1 h-1 rounded-full bg-white/20" />
                                            <span className="flex items-center gap-1.5">
                                                <Clock size={14} className="text-gold-primary" />
                                                {article.readTime}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold font-sans text-white mb-3 line-clamp-2 leading-tight group-hover:text-gold-primary transition-colors">
                                            {article.title}
                                        </h3>

                                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-1 font-light">
                                            {article.excerpt}
                                        </p>

                                        <div className="flex items-center gap-2 text-sm font-bold text-gold-primary uppercase tracking-wide group/btn">
                                            Read Article
                                            <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                                        </div>
                                    </div>

                                    {/* Golden Glow Border Effect on Hover */}
                                    <div className="absolute inset-0 border-2 border-gold-primary/0 group-hover:border-gold-primary/10 rounded-3xl transition-all duration-500 pointer-events-none" />
                                </article>
                            </Link>
                        </FadeIn>
                    );
                })}
            </div>

            {/* Pagination */}
            {totalPages && totalPages > 1 && onPageChange && currentPage && (
                <div className="mt-16 flex justify-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`w-10 h-10 rounded-full font-bold transition-all ${currentPage === page
                                ? 'bg-gold-primary text-black'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
