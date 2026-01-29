'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Car } from 'lucide-react';
import { motion } from 'framer-motion';

interface CTAButtonProps {
    text?: string;
    href?: string;
    variant?: 'primary' | 'outline';
    className?: string;
}

export default function CTAButton({
    text = "Check Price & Book",
    href = "/booking",
    variant = 'primary',
    className = ""
}: CTAButtonProps) {
    const baseStyles = "inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:-translate-y-1 shadow-lg";
    const variants = {
        primary: "bg-gradient-to-r from-gold-primary to-amber-500 text-white hover:shadow-gold-primary/30",
        outline: "border-2 border-gold-primary text-gold-primary hover:bg-gold-primary hover:text-white"
    };

    return (
        <Link href={href}>
            <motion.button
                whileTap={{ scale: 0.98 }}
                className={`${baseStyles} ${variants[variant]} ${className}`}
            >
                <Car size={20} />
                <span>{text}</span>
                <ArrowRight size={18} />
            </motion.button>
        </Link>
    );
}
