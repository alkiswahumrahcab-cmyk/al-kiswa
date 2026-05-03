'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type AnimationType = 'fade-up' | 'zoom-in' | 'slide-up' | 'fade-in' | 'ken-burns';

interface StariaAnimationsProps {
    children: ReactNode;
    type: AnimationType;
    delay?: number;
    className?: string;
}

export default function StariaAnimations({ children, type, delay = 0, className = '' }: StariaAnimationsProps) {
    // Ken Burns is a special always-on cinematic effect — fires immediately, not on scroll
    if (type === 'ken-burns') {
        return (
            <motion.div
                initial={{ scale: 1, x: 0 }}
                animate={{ scale: 1.15, x: -20 }}
                transition={{ duration: 25, ease: 'easeOut' }}
                className={`w-full h-full ${className}`}
                style={{ willChange: 'transform' }}
            >
                {children}
            </motion.div>
        );
    }

    const variants = {
        'fade-up': {
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: 'easeOut' } }
        },
        'zoom-in': {
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay, ease: 'easeOut' } }
        },
        'slide-up': {
            hidden: { opacity: 0, y: 60 },
            visible: { opacity: 1, y: 0, transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] } }
        },
        'fade-in': {
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.8, delay } }
        },
    } as const;

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={variants[type]}
            className={className}
        >
            {children}
        </motion.div>
    );
}
