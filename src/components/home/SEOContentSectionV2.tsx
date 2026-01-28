'use client';

import React from 'react';
import Link from 'next/link';
import FadeIn from '@/components/common/FadeIn';

export default function SEOContentSectionV2() {
    return (
        <section className="py-12 md:py-16 bg-primary-black relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gold-primary/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-gold-metallic/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />

            <div className="container relative z-10 px-4 md:px-6">
                <FadeIn>
                    <div className="max-w-4xl mx-auto space-y-10">

                        {/* Block 1: English - Core Service Offering */}
                        <div className="prose prose-invert max-w-none text-center md:text-left space-y-8">
                            {/* Introduction */}
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-6 text-white text-center md:text-left">
                                    Trusted Umrah Transport Services: Your Gateway to a Spiritual Journey in Saudi Arabia
                                </h2>
                                <p className="text-lg text-gray-400 leading-relaxed mb-4">
                                    Embarking on the spiritual journey of Umrah or Hajj is a profound experience for every Muslim. At <strong>Al Kiswa Umrah Transport</strong>, we understand that your focus should remain entirely on your worship and connection with Allah (SWT). That is why we have dedicated ourselves to providing the most reliable, comfortable, and professional <strong>Umrah transport services</strong> in the Kingdom of Saudi Arabia. As an officially licensed transport provider, we specialize in seamless transfers between <strong>Jeddah</strong>, <strong>Makkah</strong>, and <strong>Madinah</strong>, serving thousands of pilgrims annually with our premium fleet and experienced chauffeurs.
                                </p>
                                <p className="text-lg text-gray-400 leading-relaxed mb-4">
                                    Choosing the right transport partner is crucial for a stress-free pilgrimage. Whether you are arriving at <strong>King Abdulaziz International Airport (KAIA)</strong> in Jeddah or <strong>Prince Mohammad Bin Abdulaziz International Airport</strong> in Madinah, our team is ready to welcome you with the warmth and hospitality that befits the Guests of God. Our commitment to excellence is reflected in our 24/7 support, transparent pricing, and a diverse fleet that caters to individuals, families, and large groups alike.
                                </p>
                            </div>

                            {/* Section 1: Jeddah Airport Transfers */}
                            <div>
                                <h3 className="text-2xl font-bold font-playfair mb-4 text-gold-primary">
                                    Seamless Jeddah Airport to Makkah Taxi Transfers
                                </h3>
                                <p className="text-lg text-gray-400 leading-relaxed mb-4">
                                    For most pilgrims, the journey begins at Jeddah. Our <strong><Link href="/services/jeddah-airport-transfer" className="text-gold-primary hover:text-white transition-colors underline decoration-gold-primary/30 underline-offset-4">Jeddah Airport to Makkah taxi service</Link></strong> is designed to eliminate the hassle of navigating a new city after a long flight. Upon your arrival at the Hajj Terminal or the North Terminal, our professional drivers will greet you with a name board, assist with your luggage, and guide you to your pre-booked luxury vehicle.
                                </p>
                                <p className="text-lg text-gray-400 leading-relaxed mb-4">
                                    We offer strictly private transfers, ensuring privacy and hygiene for you and your family. Unlike shared buses or standard street taxis, our service guarantees that your vehicle is reserved exclusively for you. The journey from Jeddah to Makkah takes approximately 60-90 minutes, and our drivers utilize the best routes to ensure you reach your hotel or the Haram efficiently. We also monitor flight schedules in real-time, so if your flight is delayed, your driver will be waiting for you without any extra waiting charges.
                                </p>
                            </div>

                            {/* Section 2: Makkah to Madinah */}
                            <div>
                                <h3 className="text-2xl font-bold font-playfair mb-4 text-gold-primary">
                                    Reliable Makkah to Madinah Taxi & Intercity Travel
                                </h3>
                                <p className="text-lg text-gray-400 leading-relaxed mb-4">
                                    After completing your Umrah rituals in Makkah, the next leg of your spiritual voyage is often a visit to the Prophet’s City, Madinah Munawwarah. Our <strong><Link href="/services/makkah-madinah-taxi" className="text-gold-primary hover:text-white transition-colors underline decoration-gold-primary/30 underline-offset-4">Makkah to Madinah taxi service</Link></strong> offers a smooth, safe, and scenic drive spanning approximately 450 kilometers.
                                </p>
                                <p className="text-lg text-gray-400 leading-relaxed mb-4">
                                    We prioritize your comfort during this 4-5 hour journey. Our vehicles are equipped with high-quality air conditioning, plush seating, and ample legroom to ensure you arrive in Madinah rested and ready to pay your respects at Masjid Nabawi. Whether you prefer a direct non-stop trip or a leisurely drive with a break at a rest station, our drivers accommodate your preferences. We also offer return trips from <strong>Madinah to Makkah</strong> or direct transfers from <strong>Madinah to Jeddah Airport</strong> for your departure.
                                </p>
                            </div>

                            {/* Section 3: Premium Fleet */}
                            <div>
                                <h3 className="text-2xl font-bold font-playfair mb-4 text-gold-primary">
                                    Our Premium Fleet: Comfort for Every Pilgrim
                                </h3>
                                <div className="text-lg text-gray-400 leading-relaxed mb-4">
                                    At Al Kiswa Umrah Transport, we take pride in maintaining a modern, meticulously cleaned, and well-serviced fleet. We understand that every group has unique needs, which is why we offer a variety of vehicle options:
                                </div>
                                <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4 mb-4">
                                    <li>
                                        <strong>GMC Yukon / Chevrolet Tahoe:</strong> The epitome of luxury and power. Perfect for families of up to 7 passengers looking for a VIP experience. Book your <Link href="/fleet/gmc-yukon-at4" className="text-white hover:text-gold-primary transition-colors">GMC Yukon XL</Link> for maximum luggage space and comfort.
                                    </li>
                                    <li>
                                        <strong>Hyundai Staria / H1:</strong> A versatile and spacious MPV, ideal for families or small groups (7-9 passengers). It offers excellent visibility, modern interiors, and a smooth ride. Explore our <Link href="/fleet/hyundai-staria" className="text-white hover:text-gold-primary transition-colors">Hyundai Staria fleet</Link>.
                                    </li>
                                    <li>
                                        <strong>Toyota Hiace / Coaster:</strong> For larger groups, Ziarah tours, or budget-conscious travelers requiring specialized transport. Our buses are fully air-conditioned and driven by licenced heavy-vehicle operators.
                                    </li>
                                    <li>
                                        <strong>Luxury Sedans:</strong> For business travelers or solo pilgrims, offering a premium yet economical <Link href="/services" className="text-white hover:text-gold-primary transition-colors">private car service</Link>.
                                    </li>
                                </ul>
                            </div>

                            {/* Section 4: Ziarah Services */}
                            <div>
                                <h3 className="text-2xl font-bold font-playfair mb-4 text-gold-primary">
                                    Comprehensive Ziarah Tours in Makkah and Madinah
                                </h3>
                                <p className="text-lg text-gray-400 leading-relaxed mb-4">
                                    No Umrah trip is complete without visiting the historical sites that bear witness to the history of Islam. We offer comprehensive <strong><Link href="/services/ziarah-makkah" className="text-gold-primary hover:text-white transition-colors underline decoration-gold-primary/30 underline-offset-4">Ziarah services in Makkah</Link></strong>, taking you to sacred landmarks such as Jabal Al-Noor (Cave of Hira), Jannat al-Mualla, and the sites of Hajj (Mina, Arafat, Muzdalifah).
                                </p>
                                <p className="text-lg text-gray-400 leading-relaxed mb-4">
                                    Similarly, our <strong><Link href="/services/ziarah-madinah" className="text-gold-primary hover:text-white transition-colors underline decoration-gold-primary/30 underline-offset-4">Madinah Ziarah packages</Link></strong> cover Masjid Quba, Mount Uhud, Masjid Qiblatayn, and the Seven Mosques. Our knowledgeable drivers often share local insights and ensure you have ample time to pray and reflect at each location. These tours are fully customizable—you can choose which sites to visit and how long to stay.
                                </p>
                            </div>

                            {/* Section 5: Why Us */}
                            <div>
                                <h3 className="text-2xl font-bold font-playfair mb-4 text-gold-primary">
                                    Why Choose Al Kiswa Umrah Transport?
                                </h3>
                                <div className="text-lg text-gray-400 leading-relaxed mb-4">
                                    In a market flooded with options, Al Kiswa stands out for its unwavering commitment to integrity and quality. Here is why thousands of pilgrims trust us:
                                </div>
                                <ol className="list-decimal list-inside text-gray-400 space-y-2 ml-4 mb-4">
                                    <li><strong>Official & Insured:</strong> We are a legally registered transport entity in Saudi Arabia, complying with all <a href="https://www.haj.gov.sa/" target="_blank" rel="noopener noreferrer" className="text-gold-primary hover:underline">Ministry of Hajj and Umrah</a> regulations.</li>
                                    <li><strong>Fixed Pricing:</strong> The price you see is the price you pay. We have a strict <Link href="/pricing" className="text-white hover:text-gold-primary transition-colors">no-hidden-fee policy</Link>, covering fuel, tolls, and parking.</li>
                                    <li><strong>Multilingual Drivers:</strong> Communication is key. Our team consists of drivers who speak Arabic, English, Urdu, and other languages to assist tailored needs.</li>
                                    <li><strong>User-Friendly Booking:</strong> You can book your ride in seconds through our website or contact our support team via WhatsApp for instant arrangements.</li>
                                </ol>
                                <p className="text-lg text-gray-400 leading-relaxed">
                                    Your journey of faith deserves a travel partner that respects the sanctity of your trip. Let Al Kiswa Umrah Transport handle the logistics while you focus on the spiritual rewards of your Umrah. <strong><Link href="/booking" className="text-gold-primary font-bold hover:underline">Book your ride today</Link></strong> and travel with peace of mind.
                                </p>
                            </div>
                            {/* Section 5: Dedicated Service for Western Pilgrims (UK, USA, Canada) */}
                            <div>
                                <h3 className="text-2xl font-bold font-playfair mb-4 text-gold-primary">
                                    Trusted by Pilgrims from UK, USA, Canada & Europe
                                </h3>
                                <p className="text-lg text-gray-400 leading-relaxed mb-4">
                                    We specialize in serving pilgrims travelling from the West. We understand the specific needs of travelers arriving from <strong>London Heathrow, Manchester, New York (JFK), Toronto, and Paris</strong>. Our team monitors international flight schedules to ensure your driver is waiting for you upon arrival, regardless of delays.
                                </p>
                                <div className="text-lg text-gray-400 leading-relaxed mb-6">
                                    <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                                        <li><strong>For UK Pilgrims:</strong> Reliable connections for flights arriving from British Airways and Saudia. We offer spacious vehicles like the GMC Yukon for families carrying extra luggage from the UK.</li>
                                        <li><strong>For US & Canadian Pilgrims:</strong> We accept US Dollars (USD) and offer clear communication in English. Our chauffeurs are accustomed to the service standards expected by North American travelers.</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Section 6: Additional Keyword Rich Content - hidden in natural flow */}
                            <div className="bg-white/5 p-6 rounded-lg border border-white/10 my-8">
                                <h4 className="text-xl font-bold text-gold-primary mb-3">Frequently Asked Questions about Umrah Transport</h4>
                                <div className="space-y-4">
                                    <div>
                                        <h5 className="font-semibold text-white">How much is a taxi from Jeddah Airport to Makkah?</h5>
                                        <p className="text-sm text-gray-400">Our prices are fixed and affordable. We offer the best rates for private taxis from Jeddah Airport to Makkah hotels, starting from competitive prices for sedans up to VIP GMCs.</p>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold text-white">Can I book a GMC Yukon for Umrah?</h5>
                                        <p className="text-sm text-gray-400">Yes, the <strong>GMC Yukon 2024/2025</strong> is our most popular choice for families seeking luxury and comfort. It offers ample space for 7 passengers and luggage.</p>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold text-white">Do you offer Ziarah within Makkah and Madinah?</h5>
                                        <p className="text-sm text-gray-400">Absolutely. We provide comprehensive Ziarah tours visiting historical sites like Cave Hira, Cave Thawr, Masjid Quba, and Mount Uhud with knowledgeable drivers.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Block 2: Arabic - Local Relevance & Keywords */}
                        <div className="prose prose-invert max-w-none text-center md:text-right space-y-6" dir="rtl">
                            <h2 className="text-3xl md:text-4xl font-bold font-reem-kufi mb-6 text-white">
                                خدمة توصيل من مطار جدة الى مكة - VIP
                            </h2>
                            <p className="text-lg text-gray-400 leading-relaxed font-amiri">
                                هل تبحث عن <strong>أفضل شركة نقل معتمرين</strong>؟ نحن في الكسوة للنقل نقدم لكم خدمات <strong>توصيل من مطار جدة الى مكة</strong> بأعلى معايير الراحة والأمان. ندرك أن رحلة العمرة تبدأ من لحظة الوصول، لذا نوفر لكم استقبالاً خاصاً في المطار مع خدمة حمل الحقائب والترحيب.
                            </p>
                            <p className="text-lg text-gray-400 leading-relaxed font-amiri">
                                أسطولنا يضم أحدث السيارات لضمان راحتكم. يمكنكم <strong>حجز جمس يوكن 2025</strong> للعائلات التي تبحث عن الفخامة، أو باصات هيونداي H1 للمجموعات. نوفر أيضاً <strong>ارخص تاكسي من مطار جدة</strong> بخدمة ممتازة وأسعار ثابتة بدون أي رسوم خفية.
                            </p>
                            <p className="text-lg text-gray-400 leading-relaxed font-amiri">
                                سافروا معنا واستفيدوا من خدمة <strong>التوصيل من مكة للمدينة</strong> بسيارات خاصة ومكيفة. سائقونا محترفون وعلى دراية تامة بطرق مكة والمدينة لضمان وصولكم في الوقت المحدد. لا عناء بعد اليوم في البحث عن <strong>سيارة عائلية في مكة</strong>، فنحن هنا لخدمتكم على مدار 24 ساعة.
                            </p>
                        </div>

                        {/* Block 3: Combined - Why Choose Us / Routes */}
                        <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                            <div>
                                <h3 className="text-xl font-bold mb-3 font-playfair text-white">
                                    Popular Umrah Routes
                                </h3>
                                <ul className="space-y-2 text-gray-400">
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gold-primary" />
                                        Jeddah Airport (KAIA) to Makkah Hotel
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                        Makkah Hotel to Madinah Munawwarah
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                        Madinah Airport to Masjid Nabawi
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                        VIP Ziarah & Haram Shuttle Services
                                    </li>
                                </ul>
                            </div>

                            <div dir="rtl" className="text-right">
                                <h3 className="text-xl font-bold mb-3 font-reem-kufi text-white">
                                    أهم مسارات النقل
                                </h3>
                                <ul className="space-y-2 text-gray-400 font-amiri">
                                    <li className="flex items-center gap-2 justify-end">
                                        توصيل من مطار جدة إلى فنادق مكة
                                        <span className="w-1.5 h-1.5 rounded-full bg-gold-primary" />
                                    </li>
                                    <li className="flex items-center gap-2 justify-end">
                                        نقل من مكة المكرمة إلى المدينة المنورة
                                        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                    </li>
                                    <li className="flex items-center gap-2 justify-end">
                                        استقبال من مطار الأمير محمد بن عبدالعزيز
                                        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                    </li>
                                    <li className="flex items-center gap-2 justify-end">
                                        جولات مزارات مكة والمدينة
                                        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </FadeIn>
            </div >
        </section >
    );
}
