'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { Menu, X, ChevronDown } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { useMenu } from '@/context/MenuContext';
import GlassButton from '@/components/ui/GlassButton';

export default function Navbar() {
    const pathname = usePathname();
    const { isMenuOpen, setIsMenuOpen, toggleMenu } = useMenu();
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    // Auto-close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname, setIsMenuOpen]);

    const links = [
        { href: '/', label: 'Home' },
        {
            href: '/routes',
            label: 'Routes',
            children: [
                { href: '/services/makkah-madinah-taxi', label: 'Makkah ⇄ Madinah' },
                { href: '/services/jeddah-airport-transfer', label: 'Jeddah Airport ⇄ Makkah' },
                { href: '/services/madinah-airport-transfer', label: 'Madinah Airport ⇄ Hotel' },
                { href: '/services/intercity-transfer', label: 'Jeddah Airport ⇄ Madinah' },
                { href: '/services/ziyarat-tours', label: 'Ziyarat Tours (City Tours)' },
            ]
        },
        {
            href: '/services',
            label: 'Services',
            children: [
                { href: '/services/airport-transfers', label: 'Airport Transfer (General)' },
                { href: '/services/intercity-transfer', label: 'Intercity Transfer' },
                { href: '/services/hotel-transfers', label: 'Hotel Transfer' },
                { href: '/track-booking', label: 'Track Booking' },
            ]
        },
        {
            href: '/fleet',
            label: 'Fleet',
            children: [
                { href: '/fleet/gmc-yukon-at4', label: 'GMC Yukon XL' },
                { href: '/fleet/hyundai-staria', label: 'Hyundai Staria' },
                { href: '/fleet/hyundai-starex', label: 'Hyundai H1 Starex' },
                { href: '/fleet/toyota-hiace', label: 'Toyota Hiace' },
                { href: '/fleet/toyota-camry', label: 'Toyota Camry' },
            ]
        },
        {
            href: '/about',
            label: 'About Us',
            children: [
                { href: '/about', label: 'Company Profile' },
            ]
        },
        { href: '/blog', label: 'Blog' },
        { href: '/contact', label: 'Contact us' },
    ];

    return (
        <nav
            className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out ${scrolled
                ? 'glass bg-white/80 py-3 shadow-sm top-0'
                : 'bg-transparent py-6 top-0 lg:top-12'
                }`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group relative z-50">
                    <div className="relative flex items-center">
                        <div className={`relative transition-all duration-500 ${scrolled ? 'w-12 h-12' : 'w-16 h-16'} bg-white rounded-full p-1.5 shadow-lg border-2 border-gold/50 overflow-hidden`}>
                            <Image
                                src="/logo.png"
                                alt="Al Kiswah Transport"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <div className={`flex flex-col ml-3 transition-all duration-500`}>
                            <span className={`font-playfair font-bold text-emerald-950 leading-none transition-all duration-300 ${scrolled ? 'text-lg' : 'text-xl'}`}>
                                Al Kiswah
                            </span>
                            <span className="text-[0.6rem] font-bold text-gold tracking-[0.3em] uppercase leading-none mt-1">
                                Transport
                            </span>
                        </div>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden xl:flex items-center gap-8 bg-white/60 backdrop-blur-md px-8 py-2.5 rounded-full border border-white/40 shadow-sm transition-all duration-300 hover:shadow-md hover:border-emerald-100">
                    {links.map((link) => (
                        <div key={link.href} className="relative group">
                            {link.href === '#' ? (
                                <span
                                    className={`relative text-sm font-medium transition-colors duration-300 py-2 flex items-center gap-1 cursor-default text-emerald-950 hover:text-emerald-700`}
                                >
                                    {link.label}
                                    {link.children && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300 text-gold" />}
                                </span>
                            ) : (
                                <Link
                                    href={link.href}
                                    className={`relative text-sm font-medium transition-colors duration-300 py-2 flex items-center gap-1 ${pathname === link.href ? 'text-emerald-700 font-bold' : 'text-emerald-900 hover:text-emerald-700'
                                        }`}
                                >
                                    {link.label}
                                    {link.children && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300 text-gold" />}

                                    {/* Link Underline Animation */}
                                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gold transform origin-left transition-transform duration-300 ${pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                        }`} />
                                </Link>
                            )}

                            {/* Dropdown Menu */}
                            {link.children && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                    <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-xl shadow-sky-200/50 border border-white/50 overflow-hidden p-2 min-w-[240px]">
                                        {link.children.map((child) => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                className="block px-4 py-3 text-sm font-medium text-charcoal hover:text-celestial hover:bg-sky-50/50 rounded-lg transition-colors"
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="hidden xl:flex items-center gap-4">
                    <ThemeToggle />
                    <button className="btn-gold text-sm uppercase tracking-wider shimmer-gold shadow-lg shadow-gold/20">
                        <Link href="/booking">Book Now</Link>
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={`xl:hidden p-2 transition-colors relative z-50 text-slate-800 hover:text-primary`}
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Sidebar & Backdrop */}
            {/* Kept similar logic but updated colors to White/Gold */}
            <div
                className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity duration-300 xl:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsMenuOpen(false)}
            />

            <div
                className={`fixed top-0 right-0 h-[100dvh] w-[85%] max-w-sm bg-white shadow-2xl z-40 transform transition-transform duration-300 xl:hidden border-l border-slate-100 flex flex-col ${isMenuOpen ? 'translate-x-0 visible' : 'translate-x-full invisible pointer-events-none'
                    }`}
            >
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                    <span className="text-xl font-playfair font-bold text-secondary">Menu</span>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
                    {links.map((link) => (
                        <div key={link.href} className="flex flex-col">
                            <Link
                                href={link.href}
                                className={`p-4 rounded-xl text-lg font-medium transition-all duration-200 flex items-center justify-between group ${pathname === link.href
                                    ? 'bg-amber-50 text-primary font-bold'
                                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                                onClick={() => !link.children && setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                            {link.children && (
                                <div className="pl-4 flex flex-col gap-1 mt-1 border-l-2 border-slate-100 ml-4">
                                    {link.children.map((child) => (
                                        <Link
                                            key={child.href}
                                            href={child.href}
                                            className="p-3 rounded-lg text-base font-medium text-slate-600 hover:text-primary hover:bg-slate-50"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {child.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="p-6 border-t border-slate-100 mt-auto space-y-4">
                    <button className="w-full btn-gold py-4 text-center block" onClick={() => setIsMenuOpen(false)}>
                        <Link href="/booking">Book Now</Link>
                    </button>
                </div>
            </div>
        </nav>
    );
}
