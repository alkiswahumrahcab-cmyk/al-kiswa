import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface SkiperLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    children: React.ReactNode;
}

const baseClasses = "relative inline-flex items-center gap-1 group font-body rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg transition-colors";

export function Link000({ href, children, className, ...props }: SkiperLinkProps) {
    return (
        <Link href={href} className={cn(baseClasses, className)} {...props}>
            {children}
        </Link>
    );
}

export function Link001({ href, children, className, ...props }: SkiperLinkProps) {
    return (
        <Link href={href} className={cn(baseClasses, className)} {...props}>
            {children}
            <span className="absolute -bottom-1 left-0 rtl:left-auto rtl:right-0 w-full h-[2px] bg-gold origin-left rtl:origin-right scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-reduce:transition-none pointer-events-none" />
        </Link>
    );
}

export function Link002({ href, children, className, ...props }: SkiperLinkProps) {
    return (
        <Link href={href} className={cn(baseClasses, className)} {...props}>
            {children}
            <span className="absolute -bottom-1 left-0 rtl:left-auto rtl:right-0 w-full h-[2px] bg-gold origin-right rtl:origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-reduce:transition-none pointer-events-none" />
        </Link>
    );
}

export function Link003({ href, children, className, ...props }: SkiperLinkProps) {
    return (
        <Link href={href} className={cn(baseClasses, className)} {...props}>
            {children}
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gold origin-center scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-reduce:transition-none pointer-events-none" />
        </Link>
    );
}

export function Link004({ href, children, className, ...props }: SkiperLinkProps) {
    return (
        <Link href={href} className={cn(baseClasses, className)} {...props}>
            {children}
            <span className="absolute bottom-0 left-0 w-full h-0 bg-gold/10 group-hover:h-full group-focus-visible:h-full motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out motion-reduce:transition-none pointer-events-none -z-10 rounded-sm" />
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gold origin-center scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-reduce:transition-none pointer-events-none" />
        </Link>
    );
}

export function Link005({ href, children, className, ...props }: SkiperLinkProps) {
    return (
        <Link href={href} className={cn(baseClasses, className)} {...props}>
            {children}
            <span className="absolute -bottom-1 left-0 rtl:left-auto rtl:right-0 w-0 h-[2px] bg-gold group-hover:w-full group-focus-visible:w-full motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out motion-reduce:transition-none pointer-events-none" />
        </Link>
    );
}
