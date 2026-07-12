'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ThemeLogo from '@/components/common/ThemeLogo';

import { Menu, X, ChevronDown, Phone, Mail, Instagram, Facebook, MessageCircle, Linkedin } from 'lucide-react';
import { useMenu } from '@/context/MenuContext';

export default function Navbar() {
    const pathname = usePathname();
    const { isMenuOpen, setIsMenuOpen, toggleMenu } = useMenu();
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

    const toggleAccordion = (label: string) => {
        setExpandedMenu(expandedMenu === label ? null : label);
    };

    useEffect(() => {
        setMounted(true);
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 20);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
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
                { href: '/services/makkah-madinah-taxi', label: 'Makkah ⇄ Madinah', description: 'Direct transfer between the two Holy Cities' },
                { href: '/services/jeddah-airport-transfer', label: 'Jeddah Airport ⇄ Makkah', description: 'Seamless arrival to the Holy Mosque' },
                { href: '/services/madinah-airport-transfer', label: 'Madinah Airport ⇄ Hotel', description: 'Quick transfer to your Madinah hotel' },
                { href: '/services/intercity-transfer', label: 'Jeddah Airport ⇄ Madinah', description: 'Direct transfer from Jeddah to Madinah' },
                { href: '/services/ziyarat-tours', label: 'Ziyarat Tours (City Tours)', description: 'Guided tours of historical sites' },
            ]
        },
        {
            href: '/services',
            label: 'Services',
            children: [
                { href: '/services/airport-transfers', label: 'Airport Transfer (General)', description: 'Reliable airport pickups and drop-offs' },
                { href: '/services/intercity-transfer', label: 'Intercity Transfer', description: 'Comfortable travel between Saudi cities' },
                { href: '/services/hotel-transfers', label: 'Hotel Transfer', description: 'Door-to-door hotel transportation' },
                { href: '/track-booking', label: 'Track Booking', description: 'Check the status of your ride' },
            ]
        },
        {
            href: '/fleet',
            label: 'Fleet',
            children: [
                { href: '/fleet/gmc-yukon-at4', label: 'GMC Yukon XL', description: 'VIP Luxury 7-Seater. Elite comfort.' },
                { href: '/fleet/hyundai-staria', label: 'Hyundai Staria', description: 'Premium Family 7-Seater. Modern space.' },
                { href: '/fleet/hyundai-starex', label: 'Hyundai H1 Starex', description: 'Comfortable Family 7-Seater.' },
                { href: '/fleet/toyota-hiace', label: 'Toyota Hiace', description: 'Group Travel 11-Seater. Perfect for luggage.' },
                { href: '/fleet/toyota-camry', label: 'Toyota Camry', description: 'Standard Sedan 4-Seater.' },
            ]
        },
        {
            href: '/about',
            label: 'About Us',
            children: [
                { href: '/about', label: 'Company Profile', description: 'Learn more about Al Kiswah Transport' },
            ]
        },
        { href: '/blog', label: 'Blog' },
        { href: '/contact', label: 'Contact us' },
    ];

    return (
        <>
            <nav
                className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out ${scrolled
                    ? 'bg-background/90 backdrop-blur-xl border-b border-border py-3 shadow-2xl top-0'
                    : 'bg-transparent py-4 top-0 lg:top-4'
                    }`}
            >
                <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group relative z-50">
                    <ThemeLogo width={160} height={48} priority />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden xl:flex items-center gap-1 bg-card/40 backdrop-blur-md px-2 py-1.5 rounded-full border border-border shadow-lg">
                    {links.map((link) => (
                        <div key={link.href} className="relative group">
                            {link.href === '#' ? (
                                <span
                                    className={`relative text-xs font-medium transition-all duration-300 px-4 py-2.5 rounded-full flex items-center gap-1 cursor-default text-muted-foreground hover:text-foreground group-hover:bg-foreground/5`}
                                >
                                    {link.label}
                                    {link.children && <ChevronDown size={12} className="group-hover:rotate-180 transition-transform duration-300 text-gold" />}
                                </span>
                            ) : (
                                <Link
                                    href={link.href}
                                    className={`relative text-xs font-medium transition-all duration-300 px-4 py-2.5 rounded-full flex items-center gap-1 ${pathname === link.href
                                        ? 'bg-gold text-primary-foreground font-bold shadow-[0_0_15px_hsl(var(--gold-glow) / 0.4)]'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
                                        }`}
                                >
                                    {link.label}
                                    {link.children && <ChevronDown size={12} className="group-hover:rotate-180 transition-transform duration-300 text-gold" />}
                                </Link>
                            )}

                            {/* Premium Dropdown Menu */}
                            {link.children && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-400 translate-y-3 group-hover:translate-y-0">
                                    <div className={`bg-popover/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-border p-3 relative overflow-hidden ${link.children.length > 4 ? 'w-[600px]' : 'w-[320px]'}`}>
                                        
                                        {/* Subtle elegant top highlight */}
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>

                                        <div className={`grid gap-1 ${link.children.length > 4 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                            {link.children.map((child) => (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    className="group/link relative flex flex-col justify-center px-4 py-3.5 rounded-xl transition-all duration-300 hover:bg-foreground/5 overflow-hidden"
                                                >
                                                    {/* Hover accent line */}
                                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-gold transition-all duration-300 group-hover/link:h-3/4 rounded-r-full opacity-0 group-hover/link:opacity-100"></div>
                                                    
                                                    <div className="font-sans font-bold text-foreground text-sm tracking-wide transition-colors duration-300 group-hover/link:text-gold group-hover/link:translate-x-1 transform">
                                                        {child.label}
                                                    </div>
                                                    {child.description && (
                                                        <div className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed tracking-wider transition-all duration-300 group-hover/link:text-foreground group-hover/link:translate-x-1 transform">
                                                            {child.description}
                                                        </div>
                                                    )}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="hidden xl:flex items-center gap-4">
                    <Link
                        href="/booking"
                        className="bg-gradient-to-r from-gold to-gold-dark text-primary-foreground px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:scale-105 transition-transform shadow-[0_0_20px_hsl(var(--gold-glow) / 0.3)] flex items-center justify-center"
                    >
                        Book Now
                    </Link>
                </div>

                <div className="xl:hidden flex items-center gap-2">
                    {/* Mobile Menu Button */}
                    <button
                        className={`p-2 transition-all relative z-50 text-foreground hover:text-gold bg-foreground/5 rounded-lg border border-border`}
                        onClick={toggleMenu}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
        </nav>

        {/* Immersive Mobile Navigation */}
        <div
            className={`fixed inset-0 bg-background/95 backdrop-blur-2xl z-[60] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] xl:hidden flex flex-col ${isMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-8 pointer-events-none invisible'
                }`}
        >
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <ThemeLogo width={140} height={40} />
                    <button
                        className="p-2 text-muted-foreground hover:text-foreground hover:rotate-90 transition-transform duration-300 rounded-full hover:bg-foreground/10"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <X size={28} strokeWidth={1.5} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-8 px-6 flex flex-col gap-6">
                    {links.map((link, index) => (
                        <div key={link.href} className="flex flex-col border-b border-border pb-6 last:border-0" style={{ transitionDelay: `${index * 50}ms` }}>
                            {link.children ? (
                                <button
                                    onClick={() => toggleAccordion(link.label)}
                                    className="flex items-center justify-between text-2xl font-bold text-foreground hover:text-gold transition-colors group text-left"
                                >
                                    <span>{link.label}</span>
                                    <ChevronDown 
                                        size={24} 
                                        className={`transition-transform duration-400 text-gold ${expandedMenu === link.label ? 'rotate-180' : ''}`} 
                                    />
                                </button>
                            ) : (
                                <Link
                                    href={link.href}
                                    className={`text-2xl font-bold transition-all duration-300 ${pathname === link.href ? 'text-gold' : 'text-foreground hover:text-gold'}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            )}

                            {link.children && (
                                <div 
                                    className={`grid transition-all duration-500 ease-in-out ${expandedMenu === link.label ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
                                >
                                    <div className="overflow-hidden flex flex-col gap-4 pl-4 border-l-2 border-gold/30">
                                        {link.children.map((child) => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                className="text-base text-muted-foreground hover:text-gold transition-colors py-1 flex flex-col"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <span className="font-medium">{child.label}</span>
                                                {child.description && (
                                                    <span className="text-xs text-muted-foreground/70 mt-0.5">{child.description}</span>
                                                )}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="p-6 bg-gradient-to-t from-background via-background/80 to-transparent mt-auto pt-12 pb-8 flex flex-col gap-6 border-t border-border">
                    <div className="flex items-center justify-between text-muted-foreground px-2">
                        <a href="tel:+966548707332" className="flex items-center gap-3 hover:text-gold transition-colors font-medium group/phone">
                            <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center border border-border group-hover/phone:bg-gold group-hover/phone:text-primary-foreground group-hover/phone:border-gold transition-all duration-300">
                                <Phone size={18} />
                            </div>
                        </a>
                        <div className="flex items-center gap-3">
                            <a href="https://wa.me/966548707332" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center border border-border hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-300 group/social">
                                <MessageCircle size={18} className="group-hover/social:scale-110 transition-transform" />
                            </a>
                            <a href="https://www.instagram.com/exploresaudia12" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center border border-border hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent transition-all duration-300 group/social">
                                <Instagram size={18} className="group-hover/social:scale-110 transition-transform" />
                            </a>
                            <a href="https://www.facebook.com/profile.php?id=61586674295032" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center border border-border hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all duration-300 group/social">
                                <Facebook size={18} className="group-hover/social:scale-110 transition-transform" />
                            </a>
                            <a href="https://www.tiktok.com/@alkiswah_cab?_r=1&_t=ZS-97UXEVIhQeL" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center border border-border hover:bg-[#000000] hover:text-white hover:border-white/20 transition-all duration-300 group/social">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="group-hover/social:scale-110 transition-transform">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/in/al-kiswah-umrah-cab/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center border border-border hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all duration-300 group/social">
                                <Linkedin size={18} className="group-hover/social:scale-110 transition-transform" />
                            </a>
                        </div>
                    </div>



                    <Link
                        href="/booking"
                        className="w-full relative overflow-hidden group bg-gold text-primary-foreground py-4 rounded-xl text-center font-bold uppercase tracking-widest shadow-[0_0_30px_hsl(var(--gold-glow) / 0.2)] hover:shadow-[0_0_40px_hsl(var(--gold-glow) / 0.4)] transition-all duration-300"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <span className="relative z-10">Book Now</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                    </Link>
                </div>
            </div>
        </>
    );
}
