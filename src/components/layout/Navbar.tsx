'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { Menu, X, ChevronDown } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { useMenu } from '@/context/MenuContext';

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
                ? 'bg-primary-black/90 backdrop-blur-xl border-b border-white/5 py-3 shadow-2xl top-0'
                : 'bg-transparent py-4 top-0 lg:top-8'
                }`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group relative z-50">
                    <div className="relative flex items-center">
                        <div className={`relative transition-all duration-500 ${scrolled ? 'w-12 h-12' : 'w-16 h-16'} bg-white rounded-full flex items-center justify-center border-2 border-gold-primary shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] overflow-hidden lg:mr-1`}>
                            <div className={`relative ${scrolled ? 'w-8 h-8' : 'w-10 h-10'} transition-all duration-500`}>
                                <Image
                                    src="/logo.png"
                                    alt="Al Kiswah"
                                    fill
                                    className="object-contain p-0.5"
                                    priority
                                />
                            </div>
                        </div>
                        <div className={`flex flex-col ml-3 transition-all duration-500`}>
                            <span className={`font-sans font-bold text-white leading-none transition-all duration-300 ${scrolled ? 'text-lg' : 'text-xl'}`}>
                                Al Kiswah
                            </span>
                            <span className="text-[0.65rem] font-bold text-gold-primary tracking-[0.2em] uppercase leading-none mt-1">
                                Transport
                            </span>
                        </div>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden xl:flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/10 shadow-lg shadow-black/20">
                    {links.map((link) => (
                        <div key={link.href} className="relative group">
                            {link.href === '#' ? (
                                <span
                                    className={`relative text-xs font-medium transition-all duration-300 px-4 py-2.5 rounded-full flex items-center gap-1 cursor-default text-gray-300 hover:text-white group-hover:bg-white/5`}
                                >
                                    {link.label}
                                    {link.children && <ChevronDown size={12} className="group-hover:rotate-180 transition-transform duration-300 text-gold-primary" />}
                                </span>
                            ) : (
                                <Link
                                    href={link.href}
                                    className={`relative text-xs font-medium transition-all duration-300 px-4 py-2.5 rounded-full flex items-center gap-1 ${pathname === link.href
                                        ? 'bg-gold-primary text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {link.label}
                                    {link.children && <ChevronDown size={12} className="group-hover:rotate-180 transition-transform duration-300 text-gold-primary" />}
                                </Link>
                            )}

                            {/* Dropdown Menu */}
                            {link.children && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                    <div className="bg-primary-black/95 backdrop-blur-xl rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden p-1.5 min-w-[220px]">
                                        {link.children.map((child) => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                className="block px-4 py-3 text-xs font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all border border-transparent hover:border-white/5"
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
                    {/* <ThemeToggle /> */}
                    <button className="bg-gradient-to-r from-gold-primary to-gold-dark text-black px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:scale-105 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                        <Link href="/booking">Book Now</Link>
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={`xl:hidden p-2 transition-all relative z-50 text-white hover:text-gold-primary bg-white/5 rounded-lg border border-white/10`}
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Sidebar & Backdrop */}
            <div
                className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300 xl:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsMenuOpen(false)}
            />

            <div
                className={`fixed top-0 right-0 h-[100dvh] w-[85%] max-w-sm bg-primary-black shadow-2xl z-40 transform transition-transform duration-300 xl:hidden border-l border-white/10 flex flex-col ${isMenuOpen ? 'translate-x-0 visible' : 'translate-x-full invisible pointer-events-none'
                    }`}
            >
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/20">
                    <span className="text-xl font-sans font-bold text-white tracking-wide">Menu</span>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
                    {links.map((link) => (
                        <div key={link.href} className="flex flex-col">
                            <Link
                                href={link.href}
                                className={`p-4 rounded-xl text-base font-medium transition-all duration-200 flex items-center justify-between group ${pathname === link.href
                                    ? 'bg-gold-primary text-black font-bold'
                                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                    }`}
                                onClick={() => !link.children && setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                            {link.children && (
                                <div className="pl-4 flex flex-col gap-1 mt-1 border-l border-white/10 ml-4">
                                    {link.children.map((child) => (
                                        <Link
                                            key={child.href}
                                            href={child.href}
                                            className="p-3 rounded-lg text-sm font-medium text-gray-400 hover:text-gold-primary hover:bg-white/5 transition-colors"
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
                <div className="p-6 border-t border-white/10 mt-auto space-y-4 bg-black/20">
                    <button className="w-full bg-gold-primary text-black py-4 rounded-xl text-sm font-bold uppercase tracking-widest hover:brightness-110 transition-all" onClick={() => setIsMenuOpen(false)}>
                        <Link href="/booking">Book Now</Link>
                    </button>
                    <div className="flex justify-center">
                        {/* Theme Toggle Removed - Enforced Dark Mode */}
                    </div>
                </div>
            </div>
        </nav>
    );
}
