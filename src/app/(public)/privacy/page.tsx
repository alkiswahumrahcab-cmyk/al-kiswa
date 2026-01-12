import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export default function PrivacyPage() {
    return (
        <div className="bg-primary-black min-h-screen pb-20 relative text-gray-200">
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />

            <Hero
                title="Privacy Policy"
                subtitle="Your privacy is important to us. Learn how we handle your data."
                bgImage="/images/hero-bg.jpg"
                breadcrumbs={<Breadcrumbs />}
            />

            <div className="container mx-auto px-4 -mt-12 relative z-10">
                <FadeIn>
                    <div className="bg-neutral-900/90 rounded-3xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto border border-white/10 backdrop-blur-md">
                        <div className="mb-8 pb-8 border-b border-white/10">
                            <h1 className="text-3xl font-bold font-sans text-white mb-2">Privacy Policy</h1>
                            <p className="text-gray-400 text-sm">Last Updated: November 2025</p>
                        </div>

                        <div className="space-y-8 text-gray-300 leading-relaxed font-light">
                            <section>
                                <h2 className="text-xl font-bold text-white mb-4 font-sans">1. Introduction</h2>
                                <p>
                                    Welcome to Al Kiswah Umrah Transport. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-white mb-4 font-sans">2. Information We Collect</h2>
                                <p className="mb-4">
                                    We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                                </p>
                                <ul className="list-disc pl-5 space-y-2 marker:text-gold-primary">
                                    <li><strong className="text-white">Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                                    <li><strong className="text-white">Contact Data:</strong> includes email address and telephone numbers.</li>
                                    <li><strong className="text-white">Transaction Data:</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
                                    <li><strong className="text-white">Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-white mb-4 font-sans">3. How We Use Your Information</h2>
                                <p className="mb-4">
                                    We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                                </p>
                                <ul className="list-disc pl-5 space-y-2 marker:text-gold-primary">
                                    <li>To process and deliver your booking.</li>
                                    <li>To manage our relationship with you.</li>
                                    <li>To improve our website, products/services, marketing or customer relationships.</li>
                                    <li>To recommend products or services that may be of interest to you.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-white mb-4 font-sans">4. Data Security</h2>
                                <p>
                                    We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-white mb-4 font-sans">5. Contact Us</h2>
                                <p className="mb-6">
                                    If you have any questions about this privacy policy or our privacy practices, please contact us using the details set out below:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="flex items-center gap-3 p-4 bg-black/40 rounded-lg border border-white/5">
                                        <MapPin size={24} className="text-gold-primary" />
                                        <span className="font-medium text-white">Makkah, Saudi Arabia</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-black/40 rounded-lg border border-white/5">
                                        <Phone size={24} className="text-gold-primary" />
                                        <span className="font-medium text-white">+966 54 549 4921</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-black/40 rounded-lg border border-white/5">
                                        <Mail size={24} className="text-gold-primary" />
                                        <span className="font-medium text-white">info@alkiswahumrahtransport.com</span>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}
