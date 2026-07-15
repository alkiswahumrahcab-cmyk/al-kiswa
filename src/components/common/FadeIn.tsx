import React from 'react';

interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    scale?: boolean;
}

export default function FadeIn({ children, className = '' }: FadeInProps) {
    return (
        <div className={className}>
            {children}
        </div>
    );
}
