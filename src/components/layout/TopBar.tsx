import React from 'react';
import { Phone, Facebook, Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

import { getSettings } from '@/lib/settings-storage';


const TopBar = async () => {
    const settings = await getSettings();
    const { contact, discount } = settings;

    // Check if discount is active
    const now = new Date();
    const isDiscountActive = discount?.enabled &&
        (!discount.startDate || new Date(discount.startDate) <= now) &&
        (!discount.endDate || new Date(discount.endDate) > now);

    // if (isDiscountActive) {
    //     return null;
    // }

    return (
        <div className="hidden lg:block bg-background text-muted-foreground border-b border-border relative z-50">
            <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 h-12 flex justify-between items-center text-xs font-medium tracking-wide">

                {/* Left Side: Contact Info */}
                <div className="flex items-center gap-6">
                    {contact.email && (
                        <a
                            href={`mailto:${contact.email}`}
                            className="flex items-center gap-2 group transition-colors duration-300"
                        >
                            <div className="w-6 h-6 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-gold transition-colors duration-300">
                                <Mail size={12} className="text-gold group-hover:text-primary-foreground transition-colors duration-300" />
                            </div>
                            <span className="group-hover:text-foreground transition-colors duration-300">{contact.email}</span>
                        </a>
                    )}
                    <div className="h-4 w-px bg-border" />
                    {contact.phone && (
                        <a
                            href={`https://wa.me/${contact.phone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 group transition-colors duration-300"
                        >
                            <div className="w-6 h-6 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-[#25D366] transition-colors duration-300">
                                <Phone size={12} className="text-gold group-hover:text-white transition-colors duration-300" />
                            </div>
                            <span className="group-hover:text-foreground transition-colors duration-300">{contact.phone}</span>
                        </a>
                    )}
                    {contact.phone2 && (
                        <>
                            <div className="h-4 w-px bg-border" />
                            <a
                                href={`https://wa.me/${contact.phone2.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 group transition-colors duration-300"
                            >
                                <div className="w-6 h-6 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-[#25D366] transition-colors duration-300">
                                    <Phone size={12} className="text-gold group-hover:text-white transition-colors duration-300" />
                                </div>
                                <span className="group-hover:text-foreground transition-colors duration-300">{contact.phone2}</span>
                            </a>
                        </>
                    )}
                </div>

                {/* Right Side: Socials & Extras */}
                <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">Follow us:</span>
                    <div className="flex items-center gap-2">
                        {[
                            { icon: Facebook, href: contact.social.facebook, label: 'Facebook' },
                            { icon: Instagram, href: contact.social.instagram, label: 'Instagram' },
                            { icon: Twitter, href: contact.social.twitter, label: 'Twitter' },
                            { icon: Linkedin, href: contact.social.linkedin, label: 'LinkedIn' },
                            {
                                icon: (props: any) => (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="13"
                                        height="13"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        {...props}
                                    >
                                        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                    </svg>
                                ),
                                href: contact.social.tiktok,
                                label: 'TikTok'
                            }
                        ].map((social, index) => (
                            social.href && (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={social.label}
                                    className="w-7 h-7 flex items-center justify-center rounded-full bg-foreground/5 text-muted-foreground hover:bg-gold hover:text-primary-foreground hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    <social.icon size={13} />
                                </a>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
