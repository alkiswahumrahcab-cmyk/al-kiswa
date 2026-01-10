'use client';

import { motion } from 'framer-motion';

export default function AnimatedBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            {/* Top Right Golden Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-gold/10 rounded-full blur-[120px] mix-blend-screen"
            />

            {/* Bottom Left White/Silver Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
                className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-white/20 rounded-full blur-[100px] mix-blend-overlay"
            />

            {/* Floating Shapes */}
            <motion.div
                animate={{
                    y: [0, -40, 0],
                    rotate: [0, 10, 0],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px]"
            />

            {/* Divine Dust Motes & Particles */}
            <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-gold/30 rounded-full blur-[1px]"
                        initial={{
                            x: Math.random() * 100 + "%",
                            y: Math.random() * 100 + "%",
                            opacity: 0,
                            scale: Math.random() * 0.5 + 0.5
                        }}
                        animate={{
                            y: [null, "-20vh"],
                            opacity: [0, 0.4, 0],
                            x: [null, (Math.random() - 0.5) * 10 + "vw"]
                        }}
                        transition={{
                            duration: 10 + Math.random() * 20,
                            repeat: Infinity,
                            delay: Math.random() * 10,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            {/* Light Rays Effect */}
            <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-tr from-emerald-950/20 via-transparent to-gold/5" />
        </div>
    );
}
