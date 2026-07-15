import React, { ReactNode } from 'react';

type AnimationType = 'fade-up' | 'zoom-in' | 'slide-up' | 'fade-in' | 'ken-burns';

interface StariaAnimationsProps {
    children: ReactNode;
    type: AnimationType;
    delay?: number;
    className?: string;
}

export default function StariaAnimations({ children, className = '' }: StariaAnimationsProps) {
    return (
        <div className={className}>
            {children}
        </div>
    );
}
