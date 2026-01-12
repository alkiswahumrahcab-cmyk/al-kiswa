'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Plane, Star, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';

export default function SEOContent() {
    return (
        <section className="py-24 bg-primary-black border-t border-white/5 relative">
            <div className="container mx-auto px-4">
                <FadeIn>
                    <div className="text-center max-w-4xl mx-auto mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold font-sans text-white mb-6">Comprehensive Umrah Transport Services</h2>
                        <p className="text-lg text-gray-400 leading-relaxed font-light">
                            Your trusted partner for seamless travel between Jeddah, Makkah, and Madinah. We specialize in providing comfort, reliability, and spiritual peace of mind.
                        </p>
                    </div>
                </FadeIn>

                <div className="max-w-4xl mx-auto space-y-12 mb-20">
                    {/* English Paragraphs */}
                    <FadeIn delay={0.1}>
                        <div className="prose dark:prose-invert max-w-none text-center md:text-left bg-neutral-900/30 p-8 rounded-3xl border border-white/5">
                            <h3 className="text-2xl font-bold font-serif mb-6 text-white border-b border-white/10 pb-4 inline-block">Al Kiswah Business Profile & Pilgrim Services</h3>
                            <p className="text-lg text-gray-400 leading-relaxed mb-6 font-light">
                                At <strong className="text-white hover:text-gold-primary transition-colors">Al Kiswah Umrah Transport</strong>, we are honored to be your trusted partner for <strong className="text-white">pilgrim transportation in Saudi Arabia</strong>. Our mission is to provide seamless, comfortable, and reliable <strong className="text-white">Umrah transport services</strong> that allow you to focus entirely on your spiritual journey. From the moment you arrive, we ensure a smooth experience with our premium <strong className="text-white">Jeddah Airport transfers</strong> and <strong className="text-white">Madinah Airport pickups</strong>, guiding you safely to the holy cities. Whether you are performing Umrah, Hajj, or embarking on a spiritual visit, our professional team is dedicated to serving the Guests of Allah with the highest standards of hospitality.
                            </p>
                            <p className="text-lg text-gray-400 leading-relaxed font-light">
                                We take pride in our diverse fleet designed to cater to every need, offering <strong className="text-white">private Umrah transfers</strong> for individuals, families, and large groups. Experience the comfort of our <strong className="text-white">VIP Umrah travel</strong> options, featuring luxury GMC Yukons and spacious buses. Our expert drivers are well-versed in the routes for <strong className="text-white">Makkah to Madinah transport</strong> and comprehensive <strong className="text-white">Ziyarat transport</strong> tours, ensuring you visit every sacred site with ease and peace of mind. Choose Al Kiswah for a journey defined by safety, punctuality, and unwavering respect.
                            </p>
                        </div>
                    </FadeIn>

                    {/* Arabic Paragraphs */}
                    <FadeIn delay={0.2}>
                        <div className="prose dark:prose-invert max-w-none text-center md:text-right bg-neutral-900/30 p-8 rounded-3xl border border-white/5" dir="rtl">
                            <h3 className="text-2xl font-bold font-sans mb-6 text-white border-b border-white/10 pb-4 inline-block">خدمات نقل المعتمرين الموثوقة</h3>
                            <p className="text-lg text-gray-400 leading-relaxed font-sans mb-6 font-light">
                                في <strong className="text-white hover:text-gold-primary transition-colors">شركة الكسوة لنقل المعتمرين</strong>، نتشرف بأن نكون خياركم الأول والموثوق لخدمات <strong className="text-white">نقل المعتمرين في السعودية</strong>. مهمتنا هي توفير تجربة تنقل مريحة وآمنة تتيح لكم التفرغ الكامل لأداء مناسككم وعباداتكم. من لحظة وصولكم، نضمن لكم استقبالاً مميزاً عبر خدمات <strong className="text-white">التوصيل من مطار جدة</strong> ومطار المدينة المنورة، لنقلكم بكل يسر وسهولة إلى رحاب الحرمين الشريفين. سواء كنتم تؤدون العمرة أو الحج، فإن فريقنا المحترف ملتزم بتقديم أرقى مستويات <strong className="text-white">خدمة ضيوف الرحمن</strong> مع الالتزام التام بقيم الضيافة الإسلامية الأصيلة.
                            </p>
                            <p className="text-lg text-gray-400 leading-relaxed font-sans font-light">
                                نحن نفخر بأسطولنا المتنوع الذي يلبي كافة احتياجاتكم، حيث نقدم <strong className="text-white">نقل خاص للمعتمرين</strong>، العائلات، والمجموعات الكبيرة. استمتعوا بتجربة سفر فاخرة مع سياراتنا الحديثة التي تشمل الجمس يوكن والحافلات الواسعة والمجهزة لراحتكم. سائقونا ذوو الخبرة العالية على دراية تامة بجميع مسارات <strong className="text-white">النقل من مكة إلى المدينة</strong> وجولات <strong className="text-white">رحلات الزيارات</strong> للمعالم المقدسة، مما يضمن لكم زيارة كل موقع بقلب مطمئن. اختاروا الكسوة لرحلة عنوانها الأمان، الدقة في المواعيد، والراحة التامة.
                            </p>
                        </div>
                    </FadeIn>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { icon: Plane, title: "Jeddah Airport to Makkah Taxi", link: "/services/jeddah-airport-transfer", linkText: "Jeddah Airport to Makkah taxi service", desc: "Start your spiritual journey with ease. Our service ensures a smooth pickup from King Abdulaziz International Airport (KAIA). We track your flight to guarantee timely arrival, offering a stress-free transfer directly to your hotel." },
                        { icon: MapPin, title: "Makkah to Madinah Taxi", link: "/services/makkah-madinah-taxi", linkText: "Makkah to Madinah taxi", desc: "Travel between the two Holy Cities in ultimate comfort. Our service offers a scenic and relaxing drive. Choose from our fleet of GMC Yukons, Hyundai Starias, or Toyota Hiaces for a private and convenient inter-city transfer." },
                        { icon: Star, title: "VIP & Luxury Transport", link: "/fleet", linkText: "VIP Umrah transport", desc: "Experience the pinnacle of travel with our premium vehicles like the GMC Yukon XL, driven by professional chauffeurs who understand the needs of VIP pilgrims. Perfect for those seeking privacy and luxury." },
                        { icon: Clock, title: "Ziyarat Tours in Makkah & Madinah", link: "/services/ziyarat-tours", linkText: "Ziyarat taxi services", desc: "Explore the historical sites of Islam. We provide comprehensive tours in both Makkah and Madinah. Visit Jabal al-Nour, Masjid Quba, Mount Uhud, and more with knowledgeable drivers." },
                        { icon: ShieldCheck, title: "Safe & Licensed Drivers", desc: "Safety is our priority. All our drivers are fully licensed, experienced, and trained to serve Hajj and Umrah pilgrims. Our vehicles undergo regular maintenance checks to ensure a safe journey." },
                        { icon: HeartHandshake, title: "Affordable Umrah Taxi Rates", link: "/booking", linkText: "Umrah taxi rates", desc: "We believe in transparent pricing. Get the best rates with no hidden fees. Whether you need a budget-friendly sedan or a spacious bus for a group, we offer competitive packages." }
                    ].map((item, index) => (
                        <FadeIn key={index} delay={0.1 * (index + 1)}>
                            <div className="bg-neutral-900 border border-white/5 rounded-3xl p-8 hover:border-gold-primary/30 transition-colors duration-300 h-full group">
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3 font-sans">
                                    <item.icon className="text-gold-primary group-hover:scale-110 transition-transform duration-300" size={24} />
                                    {item.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed font-light">
                                    {item.desc.split(item.linkText || "").map((part, i, arr) => (
                                        <React.Fragment key={i}>
                                            {part}
                                            {i < arr.length - 1 && item.link && (
                                                <Link href={item.link} className="text-gold-primary hover:text-white underline underline-offset-2 transition-colors font-medium">
                                                    {item.linkText}
                                                </Link>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </p>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div >
        </section >
    );
}
