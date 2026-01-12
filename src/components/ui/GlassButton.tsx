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
        primary: "bg-gold-primary text-black hover:bg-white hover:text-black border-transparent shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]",
        secondary: "bg-white/10 text-white hover:bg-gold-primary hover:text-black border-white/10 hover:border-gold-primary backdrop-blur-md",
        outline: "bg-transparent border-gold-primary/30 hover:border-gold-primary hover:bg-gold-primary/10 text-gold-primary",
        gold: "bg-gradient-to-r from-gold-primary to-gold-metallic text-black hover:brightness-110 border-0 shadow-lg shadow-gold-primary/20",
    };

    const sizes = {
        sm: "h-9 px-4 text-xs tracking-wider uppercase",
        md: "h-12 px-8 text-sm tracking-wider uppercase",
        lg: "h-14 px-10 text-base tracking-widest uppercase"
    };

    const baseStyles = cn(
        "glass-button inline-flex items-center justify-center rounded-none font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary disabled:pointer-events-none disabled:opacity-50",
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
