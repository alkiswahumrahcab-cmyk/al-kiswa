import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import type { Metadata } from 'next';
import styles from './page.module.css';
import { blogService } from '@/services/blogService';
import FadeIn from '@/components/common/FadeIn';
import GlassCard from '@/components/ui/GlassCard';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import ShareButtons from '@/components/blog/ShareButtons';
import TableOfContents from '@/components/blog/TableOfContents';
import SidebarBookingWidget from '@/components/blog/SidebarBookingWidget';
import ReviewSnippet from '@/components/blog/ReviewSnippet';
import { JsonLdScript } from '@/components/seo/JsonLd';
import { generateArticleSchema } from '@/components/seo/schema-generator';

// Helper to inject IDs into headers
const injectIds = (content: string) => {
    return content.replace(/<h([2-3])([^>]*)>(.*?)<\/h\1>/g, (match, level, attrs, text) => {
        const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        return `<h${level} id="${id}"${attrs}>${text}</h${level}>`;
    });
};

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
    const posts = await blogService.getPosts();
    return posts.map((post) => ({
        slug: post.id,
    }));
}

// Generate metadata for the blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await blogService.getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Article Not Found',
        };
    }

    return {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt,
        keywords: post.tags,
        openGraph: {
            title: post.metaTitle || post.title,
            description: post.metaDescription || post.excerpt,
            type: 'article',
            publishedTime: post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
            authors: [post.author],
            images: [
                {
                    url: post.image.startsWith('http') ? post.image : `https://alkiswahumrahtransport.com${post.image.startsWith('/') ? '' : '/'}${post.image}`,
                    alt: post.alt || post.title,
                    width: 1200,
                    height: 630,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.metaTitle || post.title,
            description: post.metaDescription || post.excerpt,
            images: [post.image],
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = await blogService.getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // JSON-LD Structured Data
    const jsonLd = generateArticleSchema(post);

    // Find related posts (exclude current post, prioritize category)
    const allPosts = await blogService.getPosts();
    const relatedPosts = allPosts
        .filter((p) => p.id !== slug)
        .sort((a, b) => {
            // Prioritize same category
            if (a.category === post.category && b.category !== post.category) return -1;
            if (a.category !== post.category && b.category === post.category) return 1;
            return 0;
        })
        .slice(0, 3);

    return (
        <main>
            <JsonLdScript schema={jsonLd} />



            {/* Premium Hero Section */}
            <div className={styles.heroSection}>
                <div className={styles.heroBackground}>
                    {/* In a real app, use Next.js Image with fill and object-cover */}
                    {/* For now, using a placeholder div or the image if available */}
                    <div
                        className={styles.heroImage}
                        style={{ backgroundImage: `url(${post.image})` }}
                    />
                    <div className={styles.heroOverlay} />
                </div>

                <div className={styles.heroContent}>
                    <FadeIn>
                        <Breadcrumbs
                            overrideLastItem={post.title}
                            className="mb-6 justify-center"
                        />
                        <span className={styles.heroCategory}>{post.category}</span>
                        <h1 className={styles.heroTitle}>{post.title}</h1>

                        <div className={styles.heroMeta}>
                            <div className={styles.metaItem}>
                                <Calendar size={18} />
                                {post.date ? new Date(post.date).toLocaleDateString() : ''}
                            </div>
                            <div className={styles.metaDivider}>•</div>
                            <div className={styles.metaItem}>
                                <Clock size={18} />
                                {post.readTime}
                            </div>
                            <div className={styles.metaDivider}>•</div>
                            <div className={styles.metaItem}>
                                <User size={18} />
                                {post.author}
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.layout}>
                    <div className={styles.contentWrapper}>
                        <FadeIn delay={0.2}>
                            <article className={styles.articleBody}>
                                <div
                                    className={styles.content}
                                    dangerouslySetInnerHTML={{ __html: injectIds(post.content) }}
                                />
                            </article>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <div className={styles.tags}>
                                {post.tags.map((tag: string) => (
                                    <span key={tag} className={styles.tag}>
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </FadeIn>

                        {/* Author Bio Section */}
                        <FadeIn delay={0.4}>
                            <div className={styles.authorBio}>
                                <div className={styles.authorAvatar}>
                                    <User size={40} />
                                </div>
                                <div className={styles.authorInfo}>
                                    <h3 className={styles.authorName}>About {post.author}</h3>
                                    <p className={styles.authorDescription}>
                                        Expert writer and travel guide specializing in Umrah and Hajj services.
                                        Dedicated to helping pilgrims have a spiritual and comfortable journey.
                                    </p>
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    <aside className={styles.sidebar}>
                        <div className="mb-8 block md:hidden lg:block">
                            <TableOfContents content={post.content} />
                        </div>

                        {/* Booking Widget (High Conversion) */}
                        <div className="mb-8">
                            <SidebarBookingWidget />
                        </div>

                        {/* Social Proof (Trust Builder) */}
                        <div className="mb-8 hidden lg:block">
                            <ReviewSnippet
                                author="Mohammed Al-Fayed"
                                location="UK Pilgrim"
                                text="The most comfortable ride we had in Saudi. The GMC was brand new and the driver waited for us despite the flight delay."
                                rating={5}
                            />
                        </div>

                        <GlassCard delay={0.5} className={`${styles.sidebarWidget} ${styles.ctaWidget} p-8`}>
                            <h3 className={styles.ctaTitle}>Plan Your Umrah Journey</h3>
                            <p className={styles.ctaText}>
                                Book reliable and comfortable transport for your spiritual journey today.
                            </p>
                            <Link href="/ar/booking" className={styles.ctaButton}>
                                Book Your Ride
                            </Link>
                        </GlassCard>

                        <GlassCard delay={0.6} className={`${styles.sidebarWidget} p-8`}>
                            <h3 className={styles.widgetTitle}>Share this Article</h3>
                            <ShareButtons slug={slug} title={post.title} />
                        </GlassCard>

                        <GlassCard delay={0.7} className={`${styles.sidebarWidget} p-6`}>
                            <h3 className={styles.widgetTitle}>Popular Services</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="/ar/services/makkah-madinah-taxi" className="flex items-center gap-2 text-slate-700 hover:text-amber-600 transition-colors">
                                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                                        <span className="text-sm font-medium">Makkah ⇄ Madinah Taxi</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/ar/services/jeddah-airport-transfer" className="flex items-center gap-2 text-slate-700 hover:text-amber-600 transition-colors">
                                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                                        <span className="text-sm font-medium">Jeddah Airport Transfer</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/ar/services/ziyarat-tours" className="flex items-center gap-2 text-slate-700 hover:text-amber-600 transition-colors">
                                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                                        <span className="text-sm font-medium">VIP Ziyarat Tours</span>
                                    </Link>
                                </li>
                            </ul>
                        </GlassCard>
                    </aside>
                </div>

                {/* Related Articles Section */}
                <section className={styles.relatedSection}>
                    <FadeIn delay={0.7}>
                        <h2 className={styles.relatedTitle}>You Might Also Like</h2>
                        <div className={styles.relatedGrid}>
                            {relatedPosts.map((related, index) => (
                                <GlassCard key={related.id} delay={0.7 + (index * 0.1)} className="p-0 overflow-hidden group h-full">
                                    <Link href={`/blog/${related.id}`} className="flex flex-col h-full">
                                        <div className={styles.relatedImageWrapper}>
                                            {/* Placeholder for image */}
                                            <div
                                                className={styles.relatedImage}
                                                style={{ backgroundImage: `url(${related.image})` }}
                                            />
                                        </div>
                                        <div className={styles.relatedContent}>
                                            <span className={styles.relatedCategory}>{related.category}</span>
                                            <h3 className={styles.relatedCardTitle}>{related.title}</h3>
                                            <span className={styles.readMore}>Read Article <ArrowLeft size={16} className="rotate-180" /></span>
                                        </div>
                                    </Link>
                                </GlassCard>
                            ))}
                        </div>
                    </FadeIn>
                </section>
            </div>
        </main>
    );
}
