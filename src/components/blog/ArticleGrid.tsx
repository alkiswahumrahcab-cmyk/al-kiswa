import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
                                        className={`px-4 py-2 rounded-pill text-sm font-semibold transition-colors duration-200 ${activeCategory === cat
                                            ? 'bg-gold text-ink shadow-sm'
                                            : 'bg-surface text-body hover:bg-surface-alt border border-border'
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
                                    className="w-full pl-10 pr-4 py-3 bg-surface border border-border-strong rounded-md focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold text-base md:text-sm text-ink placeholder-muted transition-colors duration-200"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
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
                        <Link key={linkSlug} href={`/blog/${linkSlug}`} className="group h-full block">
                            <article className="h-full flex flex-col bg-surface border border-border rounded-xl shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 overflow-hidden">

                                {/* Image */}
                                <div className="relative h-64 overflow-hidden border-b border-border bg-surface-alt">
                                    <Image
                                        src={article.image}
                                        alt={article.alt}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-surface-alt/90 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-ink rounded-pill border border-border shadow-sm">
                                            {article.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 md:p-8 flex flex-col flex-1 relative bg-surface">
                                    {/* Date & Read Time */}
                                    <div className="flex items-center gap-4 text-muted mb-4 tracking-wide text-sm font-medium">
                                        <span className="flex items-center gap-1.5">
                                            <CalendarDays size={14} className="text-gold-strong" />
                                            {// Handle both Date object and string date
                                                new Date(article.date).toLocaleDateString(undefined, {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                        </span>
                                        <span className="w-1 h-1 rounded-pill bg-border-strong" />
                                        <span className="flex items-center gap-1.5">
                                            <Clock size={14} className="text-gold-strong" />
                                            {article.readTime}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-semibold font-display text-ink mb-3 line-clamp-2 leading-tight group-hover:text-gold-strong transition-colors duration-200">
                                        {article.title}
                                    </h3>

                                    <p className="text-body text-base leading-relaxed line-clamp-3 mb-6 flex-1 font-body">
                                        {article.excerpt}
                                    </p>

                                    <div className="flex items-center gap-2 text-sm font-semibold text-gold-strong uppercase tracking-widest group/btn pt-4 border-t border-border">
                                        Read Article
                                        <ArrowRight size={16} className="transition-transform duration-200 group-hover/btn:translate-x-1" />
                                    </div>
                                </div>
                            </article>
                        </Link>
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
                            className={`w-10 h-10 rounded-pill font-semibold transition-colors duration-200 ${currentPage === page
                                ? 'bg-gold text-ink'
                                : 'bg-surface text-body hover:bg-surface-alt border border-border'
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
