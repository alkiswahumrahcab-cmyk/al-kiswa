'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'gold';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export default function GlassButton({
    href,
    variant = 'primary',
    size = 'md',
    className,
    children,
    ...props
}: GlassButtonProps) {
    const variants = {
        primary: "btn-gold",
        secondary: "glass-button",
        outline: "btn-outline border-white/20 text-white hover:border-gold/50",
        gold: "btn-gold",
    };

    const sizes = {
        sm: "h-9 px-4 text-xs tracking-wider uppercase",
        md: "h-12 px-8 text-sm tracking-wider uppercase",
        lg: "h-14 px-10 text-base tracking-widest uppercase"
    };

    const baseStyles = cn(
        "glass-button inline-flex items-center justify-center rounded-btn font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
    );

    if (href) {
        return (
            <Link href={href} className={baseStyles} {...(props as any)}>
                {children}
            </Link>
        );
    }

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={baseStyles}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {...props as any}
        >
            {children}
        </motion.button>
    );
}
