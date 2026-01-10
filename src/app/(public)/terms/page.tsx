import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export default function TermsPage() {
    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <Hero
                title="Terms and Conditions"
                subtitle="Please read our terms and conditions carefully."
                bgImage="/images/hero-bg.jpg"
                breadcrumbs={<Breadcrumbs />}
            />

            <div className="container mx-auto px-4 -mt-12 relative z-10">
                <FadeIn>
                    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto border border-slate-100">
                        <div className="mb-8 pb-8 border-b border-slate-100">
                            <h1 className="text-3xl font-bold font-playfair text-slate-900 mb-2">Terms and Conditions</h1>
                            <p className="text-slate-500 text-sm">Last Updated: November 2025</p>
                        </div>

                        <div className="space-y-8 text-slate-600 leading-relaxed">
                            <section>
                                <h2 className="text-xl font-bold text-slate-800 mb-4 font-playfair">1. Introduction</h2>
                                <p>
                                    Welcome to Al Kiswah Umrah Transport. By accessing our website and using our services, you agree to be bound by these Terms and Conditions. Please read them carefully before making a booking.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-slate-800 mb-4 font-playfair">2. Bookings and Payments</h2>
                                <p className="mb-4">
                                    All bookings are subject to availability and confirmation. We reserve the right to decline any booking at our discretion.
                                </p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><strong>Pricing:</strong> Prices are subject to change without notice, but confirmed bookings will be honored at the agreed rate.</li>
                                    <li><strong>Payment:</strong> Full payment or a deposit may be required to secure your reservation, as specified during the booking process.</li>
                                    <li><strong>Confirmation:</strong> You will receive a booking confirmation via email or WhatsApp once your reservation is processed.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-slate-800 mb-4 font-playfair">3. Cancellations and Refunds</h2>
                                <p className="mb-4">
                                    We understand that plans can change. Our cancellation policy is designed to be fair to both parties.
                                </p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Cancellations made more than 48 hours before the scheduled pickup time may be eligible for a full refund.</li>
                                    <li>Cancellations made within 24-48 hours may incur a cancellation fee.</li>
                                    <li>No-shows or cancellations made less than 24 hours in advance are non-refundable.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-slate-800 mb-4 font-playfair">4. User Responsibilities</h2>
                                <p className="mb-4">
                                    As a user of our services, you agree to:
                                </p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Provide accurate and complete information during booking.</li>
                                    <li>Be ready at the designated pickup location at the scheduled time.</li>
                                    <li>Treat our drivers and vehicles with respect.</li>
                                    <li>Comply with all local laws and regulations during your journey.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-slate-800 mb-4 font-playfair">5. Limitation of Liability</h2>
                                <p>
                                    Al Kiswah Umrah Transport shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of our services.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-slate-800 mb-4 font-playfair">6. Contact Us</h2>
                                <p className="mb-6">
                                    If you have any questions about these Terms and Conditions, please contact us:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                                        <MapPin size={24} className="text-gold" />
                                        <span className="font-medium">Makkah, Saudi Arabia</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                                        <Phone size={24} className="text-gold" />
                                        <span className="font-medium">+966 54 549 4921</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                                        <Mail size={24} className="text-gold" />
                                        <span className="font-medium">info@alkiswahumrahtransport.com</span>
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
