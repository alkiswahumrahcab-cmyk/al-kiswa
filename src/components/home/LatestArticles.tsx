import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import styles from './LatestArticles.module.css';
import { blogService } from '@/services/blogService';
import FadeIn from '@/components/common/FadeIn';

interface Props {
    lang?: 'ar' | 'en';
}

export default async function LatestArticles({ lang = 'en' }: Props) {
    const isAr = lang === 'ar';
    // Get the first 3 articles from DB
    const posts = await blogService.getPosts();
    const latestPosts = posts.slice(0, 3);

    // If no posts, don't render the section
    if (latestPosts.length === 0) {
        return null;
    }

    const title = isAr ? 'أحدث مقالات المدونة' : 'Latest from Our Blog';
    const readMore = isAr ? 'اقرأ المزيد' : 'Read More';

    return (
        <section className={`${styles.section} ${isAr ? 'rtl font-cairo' : 'ltr'}`} dir={isAr ? 'rtl' : 'ltr'}>
            <div className="container">
                <FadeIn>
                    <h2 className={styles.sectionTitle} style={isAr ? { fontFamily: 'var(--font-tajawal)' } : {}}>{title}</h2>
                </FadeIn>
                <div className={styles.grid}>
                    {latestPosts.map((post, index) => (
                        <FadeIn key={post.id} delay={index * 0.1}>
                            <Link href={isAr ? `/ar/blog/${post.slug}` : `/blog/${post.slug}`} className={styles.card}>
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={post.image}
                                        alt={post.alt || post.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className={styles.content}>
                                    <span className={styles.category}>{post.category}</span>
                                    <h3 className={styles.title}>{post.title}</h3>
                                    <p className={styles.excerpt}>{post.excerpt}</p>
                                    <div className={styles.footer}>
                                        <span className={styles.readTime}>
                                            <Clock size={14} className={isAr ? 'ml-1' : 'mr-1'} />
                                            {post.readTime}
                                        </span>
                                        <span className={styles.readMore} style={isAr ? { fontFamily: 'var(--font-tajawal)' } : {}}>
                                            {readMore} 
                                            {isAr ? <ArrowLeft size={16} className="mr-1" /> : <ArrowRight size={16} className="ml-1" />}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
