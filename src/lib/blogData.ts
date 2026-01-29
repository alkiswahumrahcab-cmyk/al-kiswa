export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
    alt: string;
    author: string;
    tags: string[];
}

export interface Hadith {
    text: string;
    source: string;
    narrator?: string;
}

export const hadithCollection: Hadith[] = [
    {
        text: "The best among you are those who have the best manners and character.",
        source: "Sahih Bukhari",
        narrator: "Narrated by Abdullah bin Amr"
    },
    {
        text: "None of you will have faith till he wishes for his (Muslim) brother what he likes for himself.",
        source: "Sahih Bukhari",
        narrator: "Narrated by Anas"
    },
    {
        text: "He who does not show mercy to our young ones or recognize the rights of our elders is not one of us.",
        source: "Sunan Abu Dawood",
        narrator: "Narrated by Abdullah ibn Amr"
    },
    {
        text: "A good word is a form of charity.",
        source: "Sahih Bukhari",
        narrator: "Narrated by Abu Huraira"
    },
    {
        text: "Cleanliness is half of faith.",
        source: "Sahih Muslim",
        narrator: "Narrated by Abu Malik Al-Ashari"
    }
];

export const blogPosts: BlogPost[] = [
    {
        id: "makkah-to-madinah-transport-guide-arabic",
        title: "دليل النقل الشامل من مكة المكرمة إلى المدينة المنورة (2025)",
        excerpt: "الدليل الكامل للمعتمر: مقارنة تفصيلية بين قطار الحرمين، التاكسي الخاص، والباصات. تعرف على الأسعار، المواعيد، وأفضل الخيارات للعائلات وكبار السن.",
        content: `
            <h2>مقدمة: رحلة الروح من البلد الأمين إلى طيبة الطيبة</h2>
            <p>تعتبر الرحلة من مكة المكرمة إلى المدينة المنورة جزءاً أساسياً من رحلة العمرة. يقطع المعتمرون مسافة تقدر بـ 450 كيلومتراً عبر "طريق الهجرة"، مستذكرين هجرة المصطفى ﷺ. ولكن مع تطور وسائل النقل في المملكة، أصبح أمام المعتمر خيارات متعددة تتفاوت في <strong>الراحة، التكلفة، والسرعة</strong>.</p>
            <p>في هذا الدليل الشامل، سنساعدك على اختيار الوسيلة الأنسب لك ولعائلتك.</p>

            <h2>1. التاكسي الخاص: الخيار رقم 1 للعائلات</h2>
            <p>يُعد حجز سيارة خاصة (Private Transfer) الخيار المفضل لأكثر من 60% من العائلات، وذلك للأسباب التالية:</p>
            
            <h3>المميزات:</h3>
            <ul>
                <li><strong>الخصوصية التامة:</strong> السيارة لك ولعائلتك فقط.</li>
                <li><strong>من الباب للباب (Door-to-Door):</strong> يستقبلك السائق من باب فندقك في مكة ويوصلك لباب فندقك في المدينة. لا حاجة لحمل الحقائب في المحطات.</li>
                <li><strong>مرونة التوقف:</strong> يمكنك التوقف في "ميقات السيل الكبير" أو الاستراحات للصلاة وتناول الطعام متى شئت.</li>
                <li><strong>سعة الحقائب:</strong> سيارات الـ GMC والـ H1 تتسع لعدد كبير من الحقائب، عكس القطار الذي يفرض قيوداً.</li>
            </ul>
            
            <div style="margin: 2rem 0; text-align: center;">
                <a href="/booking" style="background: linear-gradient(90deg, #D4AF37, #f59e0b); color: white; padding: 1rem 2rem; border-radius: 12px; font-weight: bold; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                    <span>احجز سيارتك الخاصة الآن</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
                <p style="margin-top: 0.5rem; font-size: 0.85rem; color: #64748b;">تأكيد فوري - دفع عند الوصول</p>
            </div>

            <h3>أنواع السيارات المتوفرة 2025:</h3>
            <ul>
                <li><strong>GMC Yukon (موديلات 2024/2025):</strong> قمة الفخامة والراحة، تتسع لـ 7 ركاب و 5 حقائب كبيرة.</li>
                <li><strong>Hyundai Staria:</strong> فان عائلي واسع جداً ومريح، يتسع لـ 7 ركاب مع حقائب كثيرة.</li>
                <li><strong>Toyota Camry:</strong> خيار اقتصادي ومريح للأعداد الصغيرة (1-3 أشخاص).</li>
            </ul>

            <h2>2. قطار الحرمين السريع: السرعة القياسية</h2>
            <p>يعد قطار الحرمين نقلة نوعية في المواصلات، حيث يربط المدينتين في ساعتين و 20 دقيقة تقريباً.</p>
            
            <h3>الإيجابيات:</h3>
            <ul>
                <li>سرعة عالية وراحة في الجلوس.</li>
                <li>خدمات ممتازة داخل المحطات.</li>
            </ul>

            <h3>السلبيات التي يجب مراعاتها:</h3>
            <ul>
                <li><strong>موقع المحطات:</strong> محطة القطار في مكة (الرصيفة) تبعد عن الحرم، ومحطة المدينة تبعد عن المسجد النبوي. ستحتاج لتاكسي إضافي للوصول للفندق.</li>
                <li><strong>قيود العفش:</strong> يُسمح بحقيبة واحدة فقط لكل راكب. الوزن الزائد قد يكون مشكلة.</li>
                <li><strong>الحجز المسبق:</strong> تنفذ التذاكر بسرعة، خاصة في المواسم، والالتزام بالوقت دقيق جداً (لا مجال للتأخير).</li>
            </ul>

            <h2>3. باصات النقل الجماعي (SAPTCO VIP)</h2>
            <p>خيار جيد للمسافرين الاقتصاديين أو المجموعات الكبيرة جداً.</p>
            <ul>
                <li><strong>التكلفة:</strong> الأرخص سعراً.</li>
                <li><strong>المدة:</strong> تستغرق الرحلة من 5 إلى 6 ساعات.</li>
                <li><strong>محطة الوصول:</strong> تتوقف الباصات في محطات محددة، مما يستدعي أيضاً مواصلات إضافية للفندق.</li>
            </ul>

            <h2>مقارنة الأسعار التقريبية (2025)</h2>
            <p>تختلف الأسعار حسب الموسم، ولكن كمتوسط تقريبي:</p>
            <ul>
                <li><strong>التاكسي الخاص (GMC/Staria):</strong> من 600 إلى 900 ريال (للسيارة كاملة).</li>
                <li><strong>القطار (درجة اقتصادية):</strong> حوالي 170 ريال للفرد الواحد.</li>
                <li><strong>الباص VIP:</strong> حوالي 80-120 ريال للفرد.</li>
            </ul>

            <div style="margin: 2rem 0; padding: 1.5rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; text-align: center;">
                <h3 style="margin-top: 0; color: #0f172a;">هل تبحث عن أفضل سعر؟</h3>
                <p style="color: #64748b; margin-bottom: 1.5rem;">أسعارنا ثابتة وشاملة الضريبة والوقود.</p>
                <a href="/booking" style="background: white; color: #D4AF37; border: 2px solid #D4AF37; padding: 0.8rem 2rem; border-radius: 12px; font-weight: bold; text-decoration: none; display: inline-block; transition: all 0.2s;">
                    تحقق من السعر الآن
                </a>
            </div>

            <h2>نصيحة الخبراء: ماذا تختار؟</h2>
            <ul>
                <li>اذا كنت <strong>مع عائلة (كبار سن/أطفال)</strong> وحقائب: <strong>التاكسي الخاص</strong> هو الأوفر والأريح بلا منازع.</li>
                <li>اذا كنت <strong>مسافراً وحيداً</strong> وحقيبتك خفيفة: <strong>القطار</strong> تجربة رائعة.</li>
                <li>اذا كانت <strong>الميزانية محدودة جداً</strong>: <strong>الباص</strong> هو الحل.</li>
            </ul>

            <blockquote>
                "خدمة الكسوة للنقل وفرت علينا عناء التنقل بالحقائب. السائق وصل للفندق في الوقت المحدد، والسيارة كانت نظيفة جداً. تجربة روحانية مريحة." - أبو خالد، معتمر من الإمارات
            </blockquote>

            <h2>كيفية الحجز مع الكسوة للنقل؟</h2>
            <p>يمكنك حجز رحلتك معنا في دقائق:</p>
            <ol>
                <li>اختر نوع السيارة.</li>
                <li>حدد فندق الاستلام في مكة وفندق الوصول في المدينة.</li>
                <li>احصل على تأكيد فوري عبر الواتساب.</li>
            </ol>

            <p><strong>لا تدع تعب الطريق يفسد خشوعك.</strong> <a href="/booking">احجز تاكسي مكة المدينة الآن</a> واستمتع برحلة آمنة ومريحة.</p>
        `,
        category: "دليل المعتمر",
        date: "Jan 01, 2025",
        readTime: "8 دقائق للقراءة",
        image: "/images/routes/makkah-madinah-route-hero.png",
        alt: "GMC Yukon on Makkah Madinah Highway",
        author: "فريق الكسوة",
        tags: ["نقل معتمرين", "مكة المدينة", "قطار الحرمين", "حجز تاكسي", "دليل شامل"]
    },
    {
        id: "private-taxi-vs-haramain-train-umrah",
        title: "Private Taxi vs. Haramain Train: Which is Better for Umrah?",
        excerpt: "Compare the speed of the train with the convenience of a private taxi. Find out which option offers the best peace of mind for your Umrah journey with family and luggage.",
        content: `
            <h2>The Great Debate: Comfort vs. Speed</h2>
            <p>When planning your Umrah trip, one of the biggest questions is: <strong>Should I take the Haramain High-Speed Train or book a private taxi?</strong> Both are excellent options, but the right choice depends on your specific needs, especially if you are traveling with family or heavy luggage.</p>

            <h3>The Haramain Train: Fast but Rigid</h3>
            <p>The <strong>Haramain High-Speed Train</strong> is a marvel of modern engineering. It connects Jeddah Airport, Makkah, and Madinah at speeds of up to 300 km/h.</p>
            <ul>
                <li><strong>Pros:</strong> It is incredibly fast and comfortable.</li>
                <li><strong>Cons:</strong> The stations are often located far from the main hotels. You will still need to find a taxi from the station to your hotel. Also, there are strict luggage limits and fixed schedules that might not match your flight arrival.</li>
            </ul>

            <h3>Private Taxi: Door-to-Door Peace of Mind</h3>
            <p>For most pilgrims, a <strong>private taxi</strong> (like our GMC Yukon or Hyundai Staria) offers unmatched convenience.</p>
            
            <h4>1. Door-to-Door Service</h4>
            <p>Unlike the train, a private car picks you up right outside the airport terminal and drops you off at your hotel lobby. No walking with bags, no waiting for connections.</p>

            <h4>2. 24/7 Availability</h4>
            <p>Flights land at all times. While trains stop running at night, our <strong>24/7 Umrah taxi service</strong> is always ready. We track your flight and wait for you, even if you are delayed.</p>

            <h4>3. Unlimited Luggage & Privacy</h4>
            <p>Traveling with family? You need space. Our vehicles accommodate all your suitcases with ease, and you enjoy the privacy of your own vehicle without sharing with strangers.</p>

            <h3>Conclusion: Choose What Fits You</h3>
            <p>If you are a solo traveler with a backpack, the train is great. But for families, elderly pilgrims, or anyone who values stress-free, direct transport, a <strong>private taxi from Jeddah to Makkah</strong> is the clear winner.</p>

            <p>Experience the difference yourself. <a href="/booking">Book your private ride now</a> and start your Umrah with ease.</p>
        `,
        category: "Travel Guide",
        date: "Dec 30, 2024",
        readTime: "6 min read",
        image: "/images/fleet/gmc-yukon-hero-professional.png",
        alt: "Private GMC Yukon Taxi vs Haramain Train for Umrah Transport",
        author: "Al Kiswah Team",
        tags: ["Haramain Train", "Private Taxi", "Makkah Transport", "Family Travel"]
    },
    {
        id: "honoring-the-messenger-of-allah",
        title: "Honoring the Messenger of Allah (S.A.W.W)",
        excerpt: "Reflecting on the life, legacy, and teachings of the Prophet Muhammad (S.A.W.W) and how we can embody his wisdom in our daily lives.",
        content: `
            <h2>The Mercy to the Worlds</h2>
            <p>Prophet Muhammad (S.A.W.W) was sent as a mercy not just to Muslims, but to all of creation. His life is a testament to compassion, justice, and unwavering faith. As we walk in his footsteps during Umrah and Hajj, visiting the city of Madinah, we are reminded of his profound impact on humanity.</p>

            <h3>A Model of Character</h3>
            <p>The Prophet's character was the Quran walking. He treated everyone with dignity, from the noblest leaders to the poorest orphans. His patience in the face of adversity and his forgiveness of those who wronged him serve as timeless lessons for us all.</p>

            <h3>Visiting the Rawdah</h3>
            <p>One of the most spiritual moments for any pilgrim is standing before the Rawdah in Masjid an-Nabawi. It is here that we convey our Salams to the Best of Creation. Remember to approach with humility, lower your voice, and fill your heart with love and reverence.</p>

            <blockquote>
                "Indeed, Allah confers blessing upon the Prophet, and His angels [ask Him to do so]. O you who have believed, ask [ Allah to confer] blessing upon him and ask [ Allah to grant him] peace." – Qur'an (33:56)
            </blockquote>

            <h3>Carrying His Legacy</h3>
            <p>Honoring the Prophet (S.A.W.W) goes beyond words; it requires action. It means reviving his Sunnah, spreading peace, and serving our communities with the same love and dedication he showed to his Ummah.</p>
        `,
        category: "Spiritual",
        date: "Nov 29, 2024",
        readTime: "8 min read",
        image: "/images/blog/masjid-nabawi-view-new.png",
        alt: "Masjid an-Nabawi in Madinah - The Prophet's Mosque",
        author: "Sheikh Abdullah",
        tags: ["Prophet Muhammad", "Seerah", "Madinah", "Spirituality"]
    },
    {
        id: "choose-best-umrah-transport-service-saudi-arabia",
        title: "How to Choose the Best Umrah Transport Service in Saudi Arabia",
        excerpt: "Discover the ultimate guide to selecting the best Umrah transport service in Saudi Arabia. Learn about safety, reliability, and affordable options for your spiritual journey.",
        content: `
            <h2>Planning Your Spiritual Journey</h2>
            <p>Embarking on Umrah is a sacred milestone for every Muslim. While spiritual preparation is paramount, the logistics of your journey play a crucial role in ensuring a peaceful experience. Choosing the <strong>best Umrah transport service in Saudi Arabia</strong> is one of the most important decisions you will make.</p>

            <h3>Key Factors to Consider</h3>
            
            <h4>1. Safety and Licensing</h4>
            <p>Your safety is non-negotiable. Always ensure you choose a <strong>trusted Umrah transport provider</strong> that is fully licensed by the Saudi Ministry of Transport. Licensed vehicles are regularly inspected, insured, and tracked for your peace of mind.</p>

            <h4>2. Comfort and Fleet Quality</h4>
            <p>The journey between Jeddah, Makkah, and Madinah can be long. Look for a company that offers modern, air-conditioned vehicles. Whether you need a luxury GMC Yukon for a VIP experience or a spacious bus for a group, comfort is essential for maintaining your energy for worship.</p>

            <h4>3. Reliability and Punctuality</h4>
            <p>Time is precious during Umrah. The <strong>best Umrah travel company</strong> will guarantee punctual pickups and drop-offs, ensuring you never miss a prayer or a flight.</p>

            <h3>Al Kiswah Umrah Transport: Your Trusted Partner</h3>
            <p>At Al Kiswah Umrah Transport, we are committed to serving the Guests of Allah with the highest standards of care. Our professional drivers are trained to provide not just a ride, but a hospitable experience rooted in Islamic values.</p>

            <blockquote>
                “And proclaim to the people the Hajj; they will come to you on foot and on every lean camel; they will come from every distant pass.” – Qur’an (22:27)
            </blockquote>

            <p>We understand the sanctity of your journey and strive to make it as smooth as possible.</p>

            <p><strong>Ready to book?</strong> <a href="/booking">Book your Umrah transport today</a> with Al Kiswah Umrah Transport and travel with confidence.</p>
        `,
        category: "Guide",
        date: "Nov 28, 2024",
        readTime: "6 min read",
        image: "/images/blog/highway-journey-new.png",
        alt: "Best Umrah transport service in Saudi Arabia - Luxury bus and taxi fleet",
        author: "Ahmed Al-Sayed",
        tags: ["Umrah Transport", "Saudi Arabia", "Travel Guide", "Safety"]
    },
    {
        id: "top-5-travel-tips-pilgrims-makkah-madinah",
        title: "Top 5 Travel Tips for Pilgrims Using Umrah Transport in Makkah and Madinah",
        excerpt: "Essential advice for a hassle-free journey. Discover tips on booking, family travel, and safety for pilgrims visiting the Holy Cities.",
        content: `
            <h2>Making the Most of Your Journey</h2>
            <p>Traveling between the Holy Cities requires planning and patience. Here are our top 5 tips for <strong>pilgrim transport in Makkah and Madinah</strong> to ensure a smooth experience.</p>

            <h3>1. Book Your Transport in Advance</h3>
            <p>Last-minute arrangements can be stressful and expensive. Secure your ride early, especially during Ramadan and Hajj seasons, to guarantee availability and better rates.</p>

            <h3>2. Choose Group Packages for Value</h3>
            <p>If you are traveling with a large family or group, look for <strong>affordable Umrah transport packages</strong>. Renting a dedicated bus (like a Toyota Coaster) is often more economical and convenient than taking multiple taxis.</p>

            <h3>3. Prioritize Comfort for Families</h3>
            <p>Traveling with children or elders? Opt for <strong>family Umrah travel services</strong> that offer spacious vehicles like the Hyundai Staria or Toyota Hiace. Ample legroom and luggage space make a huge difference.</p>

            <h3>4. Verify Your Driver and Vehicle</h3>
            <p>Always confirm that your driver knows the routes to your hotel and the Haram. At Al Aqsa Umrah Transport, our drivers are experienced locals who know the best routes to avoid traffic.</p>

            <h3>5. Stay Connected</h3>
            <p>Ensure you have a working phone and internet connection to communicate with your driver. We provide 24/7 support to assist you at any time.</p>

            <p>Experience the difference with our modern fleet. <a href="/fleet">Explore our vehicles</a> and choose the one that fits your needs.</p>
        `,
        category: "Travel Tips",
        date: "Nov 27, 2024",
        readTime: "5 min read",
        image: "/images/blog/mobile-booking-new.png",
        alt: "Travel tips for pilgrims in Makkah and Madinah - Family Umrah transport",
        author: "Sarah Khan",
        tags: ["Travel Tips", "Makkah", "Madinah", "Family Travel"]
    },
    {
        id: "faq-umrah-transport-services-saudi-arabia",
        title: "Frequently Asked Questions About Umrah Transport Services in Saudi Arabia",
        excerpt: "Answers to your most common questions: booking, costs, safety, and more. Get the information you need for a worry-free trip.",
        content: `
            <h2>Everything You Need to Know</h2>
            <p>We receive many questions from pilgrims planning their trip. Here are answers to the most common queries about <strong>Umrah transport services in Saudi Arabia</strong>.</p>

            <h3>How can I book Umrah transport online?</h3>
            <p>Booking is simple and secure. You can <strong>book Umrah transport online in Saudi Arabia</strong> directly through our website. Just select your pickup location, destination, and vehicle type to get an instant quote.</p>

            <h3>What is the cost of transport from Jeddah Airport to Makkah?</h3>
            <p>Prices vary based on the vehicle. We offer competitive rates for <strong>Jeddah airport to Makkah transport</strong>. Whether you need a budget-friendly sedan or a luxury SUV, we provide transparent pricing with no hidden fees.</p>

            <h3>Is 24/7 booking available?</h3>
            <p>Yes! We understand that flights arrive at all hours. Our <strong>24/7 Umrah transport booking</strong> service ensures that a driver is ready to welcome you whenever you land.</p>

            <h3>Are your vehicles safe?</h3>
            <p>Absolutely. All our vehicles are modern, air-conditioned, and regularly maintained. Our drivers are licensed professionals committed to your safety.</p>

            <p>Have more questions? Visit our <a href="/contact">Contact Us</a> page or reach out to our support team.</p>
        `,
        category: "FAQ",
        date: "Nov 26, 2024",
        readTime: "4 min read",
        image: "/images/blog/faq-new.png",
        alt: "FAQ about Umrah transport services - Booking and costs",
        author: "Support Team",
        tags: ["FAQ", "Booking", "Jeddah Airport", "Online Booking"]
    },
    {
        id: "why-comfort-safety-matter-umrah-transport",
        title: "Why Comfort and Safety Matter in Umrah Transport",
        excerpt: "Umrah is physically demanding. Learn why choosing a comfortable and safe transport service is essential for your spiritual well-being.",
        content: `
            <h2>The Importance of a Stress-Free Journey</h2>
            <p>Umrah involves physical exertion, from Tawaf to Sa'i. The last thing you need is a stressful or uncomfortable journey between cities. Choosing <strong>safe and reliable Umrah transport</strong> is vital for preserving your energy for worship.</p>

            <h3>Luxury and Comfort</h3>
            <p>Our fleet includes <strong>luxury Umrah buses in Saudi Arabia</strong> and premium SUVs like the GMC Yukon. These vehicles feature plush seating, powerful air conditioning, and smooth suspension to ensure you arrive at your destination refreshed.</p>

            <h3>Professionalism You Can Trust</h3>
            <p>Safety goes beyond just the vehicle. It’s about the person behind the wheel. Our drivers are not just skilled; they are respectful and dedicated to hospitality. We provide <strong>comfortable buses for Umrah pilgrims</strong> driven by professionals who prioritize your well-being.</p>

            <h3>Voices of the Faithful</h3>
            <blockquote>
                "The journey was smooth and the car was incredibly comfortable. It made our trip so much easier." – Abdullah, UK
            </blockquote>

            <p>Don't compromise on your comfort. <a href="/booking">Book a premium ride</a> with Al Kiswah Umrah Transport today.</p>
        `,
        category: "Experience",
        date: "Nov 25, 2024",
        readTime: "5 min read",
        image: "/images/blog/luxury-interior-new.png",
        alt: "Comfortable and safe Umrah transport - Luxury GMC Yukon interior",
        author: "Mohammed Ali",
        tags: ["Comfort", "Safety", "Luxury Transport", "Testimonials"]
    },
    {
        id: "affordable-umrah-transport-packages",
        title: "Affordable Umrah Transport Packages – Travel with Peace of Mind",
        excerpt: "Quality service doesn't have to break the bank. Explore our affordable packages designed to give you the best value for your money.",
        content: `
            <h2>Value Without Compromise</h2>
            <p>We believe that every pilgrim deserves high-quality service, regardless of their budget. That’s why we offer <strong>affordable Umrah transport packages</strong> that combine reliability with competitive pricing.</p>

            <h3>Best Deals for Pilgrims</h3>
            <p>Looking for the <strong>best Umrah transport deals for pilgrims</strong>? We offer customized packages that cover your entire journey: pickup from Jeddah Airport, Ziyarat in Makkah and Madinah, and drop-off for your departure.</p>

            <h3>Group Packages</h3>
            <p>Traveling in a group is one of the best ways to save. Our <strong>group Umrah transport packages</strong> allow you to share the cost of a spacious bus while enjoying the camaraderie of your fellow travelers.</p>

            <h3>Peace of Mind</h3>
            <p>With fixed prices and no hidden charges, you can travel with peace of mind knowing exactly what you are paying for. Focus on your prayers, and let us handle the logistics.</p>

            <p>Start your journey on the right foot. <a href="/booking">Check our rates</a> and secure your affordable package now.</p>
        `,
        category: "Value",
        date: "Nov 24, 2024",
        readTime: "4 min read",
        image: "/images/blog/makkah-haram-view-new.png",
        alt: "Affordable Umrah transport packages - Group travel bus",
        author: "Fatima Hassan",
        tags: ["Affordable", "Packages", "Deals", "Group Travel"]
    },
    {
        id: "jeddah-airport-taxi-price-guide-2025",
        title: "Jeddah Airport to Makkah Taxi Price Guide (2025 Update)",
        excerpt: "How much should you pay for a taxi from Jeddah Airport to Makkah? Avoid scams and overcharging. Official 2025 price list for Camry, Hyundai Staria, and GMC Yukon.",
        content: `
            <h2>Don't Get Overcharged: 2025 Official Rates</h2>
            <p>Arriving at King Abdulaziz International Airport (JED) can be overwhelming. Dozens of unauthorized drivers ("Keddana") might approach you with confusing prices. <strong>Knowing the fair market rate before you land is your best defense against scams.</strong></p>

            <h3>Average Market Rates (Jeddah Airport ⇄ Makkah Hotel)</h3>
            <p>Prices fluctuate based on season (Ramadan/Hajj vs. Off-season), but here are the standard ranges for 2025:</p>
            
            <ul>
                <li><strong>Economy Sedan (Toyota Camry):</strong> 200 - 300 SAR</li>
                <li><strong>Family Van (Hyundai Staria / H1):</strong> 350 - 450 SAR</li>
                <li><strong>VIP SUV (GMC Yukon / Tahoe):</strong> 500 - 650 SAR</li>
            </ul>

            <div style="margin: 2rem 0; padding: 1.5rem; background: #fffbeb; border: 1px solid #fcd34d; border-radius: 16px; text-align: center;">
                <h3 style="margin-top: 0; color: #92400e;">⚠️ Warning: Hidden Fees</h3>
                <p style="color: #92400e; margin-bottom: 0;">Some random taxis quote a low price (e.g., 150 SAR) but then demand extra for luggage, gate entry, or "traffic". <strong>Always book a fixed-price service.</strong></p>
            </div>

            <h2>Why Book Online vs. Airport Taxi?</h2>
            <p>While you can hail a taxi at the curb, booking online with a licensed company like <strong>Al Kiswah Transport</strong> guarantees:</p>
            <ul>
                <li><strong>Fixed Price:</strong> The price you see is the price you pay. No negotiation.</li>
                <li><strong>Meet & Greet:</strong> Our driver waits for you at the arrival hall with a name sign.</li>
                <li><strong>Flight Tracking:</strong> We monitor your flight delay and wait for free.</li>
            </ul>

            <div style="margin: 2rem 0; text-align: center;">
                <a href="/booking" style="background: linear-gradient(90deg, #10b981, #059669); color: white; padding: 1rem 2rem; border-radius: 12px; font-weight: bold; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3);">
                    <span>Get Your Fixed Price Quote</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
            </div>

            <h2>How to Book in 3 Steps</h2>
            <ol>
                <li><strong>Select Vehicle:</strong> Choose the car that fits your family and luggage.</li>
                <li><strong>Enter Flight Details:</strong> So we can track your arrival.</li>
                <li><strong>Receive Confirmation:</strong> Get your driver's details and plate number via WhatsApp instantly.</li>
            </ol>
        `,
        category: "Guide",
        date: "Jan 28, 2025",
        readTime: "5 min read",
        image: "/images/blog/jeddah-airport-terminal.png",
        alt: "Jeddah Airport Taxi Price Guide 2025",
        author: "Al Kiswah Team",
        tags: ["Jeddah Airport", "Taxi Price", "Scam Alert", "Makkah Transport"]
    },
    {
        id: "gmc-yukon-vs-bus-family-umrah",
        title: "GMC Yukon vs. Bus: The Best Choice for Families?",
        excerpt: "Traveling with family and kids? Discover why 80% of families choose the GMC Yukon over public buses for their Umrah journey. Comfort, space, and privacy compared.",
        content: `
            <h2>The Family Dilemma: Comfort or Cost?</h2>
            <p>Umrah is a spiritual marathon. You will walk kilometers during Tawaf and Sa'i. <strong>Why start your journey exhausted from a cramped bus ride?</strong> For families traveling with children, elders, or excessive luggage, the transport choice can make or break the experience.</p>

            <h3>1. Luggage Space: The #1 Problem</h3>
            <p><strong>The Bus Reality:</strong> Most buses have limited under-carriage space. If you have 6-7 large suitcases (typical for families), you might struggle or be forced to keep bags in the aisle.</p>
            <p><strong>The Yukon Solution:</strong> The GMC Yukon XL is built for cargo. It easily swallows 5-6 large suitcases PLUS cabin bags, all while keeping the passenger cabin clutter-free.</p>

            <h3>2. The "Door-to-Door" Factor</h3>
            <p>Buses drop you at a station (often 2-3km from your hotel). Imagine dragging 6 suitcases and 3 tired kids through Makkah's heat to find a local taxi.</p>
            <p><strong>With our GMC Service:</strong> We park right at your hotel lobby. You step out of the cool AC straight into the hotel reception.</p>

            <div style="margin: 2rem 0; padding: 2rem; background: #1e293b; color: white; border-radius: 16px; text-align: center;">
                <h3 style="margin-top: 0; color: #D4AF37;">Experience VIP Comfort</h3>
                <p style="color: #cbd5e1;">Treat your parents and children to the dignity they deserve.</p>
                <a href="/booking" style="background: #D4AF37; color: white; padding: 0.8rem 2rem; border-radius: 8px; font-weight: bold; text-decoration: none; display: inline-block;">
                    Check GMC Yukon Availability
                </a>
            </div>

            <h3>3. Privacy and Flexibility</h3>
            <p>In a private car, you control the AC, the audio (Quran or silence), and the stops. Need a bathroom break for the kids? Just ask the driver. In a bus, you are on the driver's rigid schedule.</p>

            <h2>Verdict</h2>
            <p>If you are solo, take the bus/train. But for <strong>families of 3 or more</strong>, the price difference per person is small, but the difference in comfort is massive.</p>
        `,
        category: "Travel Tips",
        date: "Jan 25, 2025",
        readTime: "6 min read",
        image: "/images/fleet/gmc-yukon-interior.png",
        alt: "GMC Yukon Interior Luxury vs Bus",
        author: "Sarah Khan",
        tags: ["Family Travel", "GMC Yukon", "Comfort", "Luggage"]
    },
    {
        id: "how-to-wear-ihram-jeddah-airport",
        title: "How to Wear Ihram at Jeddah Airport (Step-by-Step)",
        excerpt: "Landing in Jeddah without Ihram? Don't panic. Here is exactly where to change, how to make Niyyah, and where the Miqat applies for air travelers.",
        content: `
            <h2>The "Miqat" Confusion for Air Travelers</h2>
            <p>One of the most common questions we get is: <em>"Can I wear Ihram at Jeddah Airport?"</em></p>
            <p><strong>The Ruling:</strong> Jeddah is <strong>inside</strong> the Miqat boundary for most international travelers. This means you must ideally be in the state of Ihram <strong>before</strong> your plane crosses the Miqat line (usually 30 mins before landing).</p>

            <h3>Option 1: Wear it from Home (Recommended)</h3>
            <p>Wear the lower towel (Izar) from your home airport. You can keep your regular shirt on until you are on the plane.</p>

            <h3>Option 2: Wear it On the Plane</h3>
            <p>Airlines usually announce "We are approaching the Miqat." Bathrooms on planes are tiny, so this is difficult for elderly people.</p>

            <h3 style="color: #dc2626;">Can I wear it at Jeddah Airport?</h3>
            <p>If you land in Jeddah without Ihram, you have passed the Miqat. You technically need to go back to a Miqat (like Al-Juhfah) to enter Ihram, or pay a Dam (penalty).</p>
            <p><strong>However, there is a solution:</strong></p>

            <div style="margin: 2rem 0; padding: 1.5rem; border: 2px dashed #D4AF37; border-radius: 16px;">
                <h3>Our Driver Can Take You to the Miqat</h3>
                <p>If you forgot or couldn't wear Ihram, book a taxi with us. Ask the driver to stop at <strong>Bi'r Ali</strong> (if going to Madinah first) or drive you to <strong>Taif/Al-Sayl Al-Kabir</strong> (if going to Makkah) to make your Niyyah correctly.</p>
                <a href="/contact" style="color: #D4AF37; font-weight: bold; text-decoration: underline;">Contact Support to Arrange This ></a>
            </div>

            <h2>Facilities at Jeddah Airport</h2>
            <p>The new Terminal 1 has designated prayer areas and huge bathrooms, but remember: physically changing clothes is not enough. You must have made the Intention (Niyyah) at the Miqat line in the air.</p>
        `,
        category: "Spiritual",
        date: "Jan 20, 2025",
        readTime: "4 min read",
        image: "/images/blog/ihram-guide.png",
        alt: "Pilgrim wearing Ihram at Jeddah Airport",
        author: "Sheikh Abdullah",
        tags: ["Ihram", "Miqat", "Jeddah Airport", "Religious Guide"]
    },
    {
        id: "al-kiswah-complete-umrah-guide-spiritual-practical",
        title: "Al Kiswah Umrah Guide: A Complete Spiritual and Practical Journey",
        excerpt: "The ultimate step-by-step guide for pilgrims. From Niyyah and Ihram to the spiritual calmness of Makkah. Discover how to perform Umrah with sincerity and peace of mind.",
        content: `
            <h2>Introduction: A Journey of the Heart</h2>
            <p>Umrah is more than a physical journey to Makkah; it is a migration of the heart towards its Creator. Millions travel annually to the House of Allah to seek forgiveness and spiritual renewal.</p>
            <p>At <strong>Al Kiswah Umrah Transport</strong>, our mission goes beyond driving. We aim to facilitate your worship by removing the worldly stress of logistics, ensuring your focus remains entirely on your connection with Allah.</p>

            <h2>1. Preparation Before Umrah</h2>
            <p>The journey begins before you leave your home. Mental and spiritual preparation is the foundation of an accepted Umrah.</p>
            <ul>
                <li><strong>Niyyah (Intention):</strong> Check your heart. Are you going for status, or purely for Allah? Sincerity (Ikhlas) is the key to acceptance.</li>
                <li><strong>Repentance (Tawbah):</strong> Seek forgiveness for past sins to start your journey with a clean slate.</li>
                <li><strong>Packing Essentials:</strong>
                    <ul>
                        <li>Two pieces of white unstitched cloth (Ihram) for men.</li>
                        <li>Comfortable, modest clothing for women.</li>
                        <li>Unscented soap and toiletries (essential for the state of Ihram).</li>
                        <li>Comfortable walking sandals.</li>
                    </ul>
                </li>
            </ul>

            <h2>2. Wearing the Ihram</h2>
            <p>Ihram is the sacred state a pilgrim enters before crossing the Miqat.</p>
            <h3>For Men:</h3>
            <p>Wear two white unstitched sheets. One (Izar) covers the lower body, and the other (Rida) covers the upper body. No underwear or stitched clothing is allowed.</p>
            <h3>For Women:</h3>
            <p>Dress in loose, modest clothing that covers the entire body (Satr) except the face and hands. There is no specific color requirement, though simple colors are preferred.</p>
            <h3>Spiritual Meaning:</h3>
            <p>The white cloth symbolizes the shroud (Kafan) and equality. King and commoner stand side-by-side, indistinguishable before Allah.</p>

            <h2>3. Making the Niyyah (Intention)</h2>
            <p>As you approach the Miqat (or fly over it), make the vocal intention:</p>
            <blockquote style="background: #f8fafc; border-left: 4px solid #D4AF37; padding: 1rem; font-style: italic;">
                "Labbayk Allahumma Umrah" <br>
                (Here I am, O Allah, for Umrah)
            </blockquote>
            <p>Then, begin reciting the Talbiyah frequently: <em>"Labbayk Allahumma Labbayk..."</em></p>

            <h2>4. Step-by-Step Guide to Performing Umrah</h2>
            
            <h3>A. Tawaf (Circumambulation)</h3>
            <p>Upon entering Masjid Al-Haram, proceed to the Kaaba. Circle the Kaaba seven times anti-clockwise, starting from the Hajar Al-Aswad (Black Stone).</p>
            <ul>
                <li><strong>Ramal:</strong> Men should walk briskly with the right shoulder uncovered (Idtiba) in the first three rounds.</li>
                <li><strong>Dua:</strong> There are no fixed duas, but reciting <em>"Rabbana atina fid-dunya hasanah..."</em> between the Yemeni Corner and the Black Stone is Sunnah.</li>
            </ul>

            <h3>B. Sa’i (Walking between Safa and Marwah)</h3>
            <p>Walk seven times between the hills of Safa and Marwah, commemorating the struggle of Hajar (AS) searching for water for Prophet Ismail (AS).</p>
            <p><strong>Reflection:</strong> This ritual teaches us that effort (action) and reliance on Allah (Tawakkul) go hand in hand.</p>

            <h3>C. Tahallul (Shaving/Cutting Hair)</h3>
            <p>After Sa'i, men shave their heads (Halq) or trim their hair (Taqsir). Women cut a fingertip length of hair. This marks the completion of Umrah and the exit from the state of Ihram.</p>

            <h2>5. The Spiritual Dimensions</h2>
            <p>The rituals are the "body" of Umrah, but the "soul" is your state of heart.
            <ul>
                <li><strong>Patience (Sabr):</strong> You will encounter crowds, heat, and delays. Respond with a smile, for you are Allah's guest.</li>
                <li><strong>Gratitude (Shukr):</strong> Every step is a blessing denied to millions who yearn to be where you are.</li>
            </ul>

            <h2>6. Practical Tips for a Smooth Journey</h2>
            <ul>
                <li><strong>Health:</strong> Drink plenty of Zamzam and stay hydrated. Avoid heavy meals before Tawaf.</li>
                <li><strong>Timing:</strong> If traveling with elderly, avoid peak hours right after prayers. Late night (1 AM - 3 AM) is often quieter.</li>
                <li><strong>Transport:</strong> Don't leave your transport to chance. Booking a reliable service ensures you arrive at the Haram fresh and ready for worship.</li>
            </ul>
            
            <div style="margin: 2rem 0; padding: 2rem; background: linear-gradient(to right, #f8fafc, #fff); border: 1px solid #e2e8f0; border-radius: 20px; text-align: center;">
                <h3 style="margin-top: 0; color: #0f172a;">Focus on Worship, We Handle the Rest</h3>
                <p style="color: #64748b; margin-bottom: 1.5rem;">Let Al Kiswah Umrah Transport take care of your transfers between Jeddah, Makkah, and Madinah with our premium fleet.</p>
                <a href="/booking" style="background: #D4AF37; color: white; padding: 1rem 2.5rem; border-radius: 99px; font-weight: bold; text-decoration: none; display: inline-block; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);">
                    Book Your Ride Now
                </a>
            </div>

            <h2>Conclusion</h2>
            <p>May Allah invite you to His House and accept your efforts. Approach this journey with a heart full of humility, and return with a soul washed of sins.</p>
        `,
        category: "Spiritual Guide",
        date: "Jan 30, 2025",
        readTime: "10 min read",
        image: "/images/blog/kaaba-tawaf-crowd.png",
        alt: "Pilgrims performing Tawaf around the Kaaba",
        author: "Al Kiswah Spiritual Team",
        tags: ["Umrah Guide", "Spiritual", "Tawaf", "Sai", "Ihram"]
    }
];

export const respectSectionData = {
    title: "Respect for Prophet Muhammad (S.A.W.W)",
    verse: {
        text: "Indeed, in the Messenger of Allah (S.A.W.W) you have an excellent example for whoever has hope in Allah and the Last Day and remembers Allah often.",
        reference: "Qur’an 33:21"
    },
    intro: "At **Al Kiswah Umrah Transport**, we believe that every journey of a pilgrim is sacred. In serving the guests of Allah, we draw inspiration from the noble character of Prophet Muhammad (S.A.W.W). His life was a beacon of mercy, humility, and respect — guiding us to treat every traveler with dignity, compassion, and care.",
    commitments: [
        {
            text: "Welcoming pilgrims with kindness and sincerity",
            icon: "Heart"
        },
        {
            text: "Ensuring comfort and safety as a reflection of his mercy",
            icon: "Shield"
        },
        {
            text: "Upholding honesty and trust in every service we provide",
            icon: "Handshake"
        }
    ],
    closing: "Through this, we strive to honor his legacy and remind ourselves that true respect is not only in words, but in living by his example."
};
