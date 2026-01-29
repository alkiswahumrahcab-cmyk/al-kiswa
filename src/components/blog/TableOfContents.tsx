'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, List } from 'lucide-react';

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
    const [headings, setHeadings] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        // Extract headings from HTML string
        const regex = /<h([2-3])[^>]*>(.*?)<\/h\1>/g;
        const matches = [];
        let match;

        while ((match = regex.exec(content)) !== null) {
            const level = parseInt(match[1]);
            const text = match[2].replace(/<[^>]*>/g, '');
            const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            matches.push({ id, text, level });
        }

        setHeadings(matches);
    }, [content]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-10% 0px -80% 0px' }
        );

        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden sticky top-24">
            <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                <div className="flex items-center gap-2 text-gold-primary font-bold text-sm uppercase tracking-wider">
                    <List size={16} />
                    <span>Table of Contents</span>
                </div>
                <ChevronRight
                    size={16}
                    className={`text-gray-400 transition-transform duration-300 ${isCollapsed ? 'rotate-90' : '-rotate-90'}`}
                />
            </div>

            <AnimatePresence>
                {!isCollapsed && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <nav className="p-4 pt-0 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gold-primary/20 scrollbar-track-transparent">
                            <ul className="space-y-1">
                                {headings.map((heading) => (
                                    <li
                                        key={heading.id}
                                        style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
                                    >
                                        <a
                                            href={`#${heading.id}`}
                                            className={`block py-1.5 text-sm transition-all duration-200 border-l-2 pl-3 ${activeId === heading.id
                                                    ? 'border-gold-primary text-gold-primary font-medium bg-gold-primary/5'
                                                    : 'border-transparent text-gray-400 hover:text-white hover:border-white/20'
                                                }`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                                                setActiveId(heading.id);
                                            }}
                                        >
                                            {heading.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
