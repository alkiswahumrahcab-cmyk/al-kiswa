export const DEFAULT_BOOKING_CONFIRMATION_TEMPLATE = `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1a1a1a; line-height: 1.6; max-width: 600px; margin: 0 auto; direction: ltr; background-color: #ffffff;">
    <!-- Premium Header -->
    <div style="background-color: #000000; padding: 40px 20px; text-align: center; border-bottom: 4px solid #D4AF37;">
        <h1 style="color: #D4AF37; margin: 0; font-size: 28px; text-transform: uppercase; letter-spacing: 2px; font-weight: 900;">Umrah Mabroor</h1>
        <p style="color: #ffffff; margin-top: 10px; font-size: 18px; font-family: 'Amiri', serif;">عمرة مبرورة وسعي مشكور</p>
    </div>

    <!-- Spiritual Greeting -->
    <div style="padding: 30px 20px; text-align: center; background-color: #fffdf5;">
        <div style="font-size: 20px; color: #D4AF37; font-family: 'Amiri', serif; margin-bottom: 10px;">أهلاً بك يا ضيف الرحمن لخدمات الكسوة</div>
        <h2 style="font-size: 22px; color: #1a1a1a; margin: 0;">Welcome, Guest of Allah</h2>
        <p style="color: #666; font-size: 16px; margin-top: 15px;">
            May Allah accept your Umrah, your prayers, and your good deeds. 
            We are honored to be part of your spiritual journey.
        </p>
        <p style="color: #D4AF37; font-size: 16px; font-family: 'Amiri', serif; margin-top: 5px;">
            تقبل الله منكم العمرة وصالح الأعمال، ونسعد بخدمتكم في رحلتكم الإيمانية
        </p>
    </div>

    <!-- Booking Summary Section -->
    <div style="padding: 20px;">
        <div style="border: 1px solid #eee; border-radius: 15px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
            <div style="background-color: #fcfcfc; padding: 15px 20px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-weight: bold; color: #1a1a1a; text-transform: uppercase; font-size: 13px; letter-spacing: 1px;">Booking Confirmation</span>
                <span style="color: #D4AF37; font-weight: bold; font-family: monospace;">#{{booking_id}}</span>
            </div>
            
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 15px 20px; border-bottom: 1px solid #f5f5f5; color: #888; font-size: 12px; text-transform: uppercase;">Route / المسار</td>
                    <td style="padding: 15px 20px; border-bottom: 1px solid #f5f5f5; color: #1a1a1a; font-weight: 600;">
                        {{pickup}} <span style="color: #D4AF37;">→</span> {{dropoff}}
                    </td>
                </tr>
                <tr>
                    <td style="padding: 15px 20px; border-bottom: 1px solid #f5f5f5; color: #888; font-size: 12px; text-transform: uppercase;">Date & Time / الموعد</td>
                    <td style="padding: 15px 20px; border-bottom: 1px solid #f5f5f5; color: #1a1a1a; font-weight: 600;">
                        {{date}} @ <span style="color: #D4AF37;">{{time}}</span>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 15px 20px; border-bottom: 1px solid #f5f5f5; color: #888; font-size: 12px; text-transform: uppercase;">Vehicle(s) / نوع السيارة</td>
                    <td style="padding: 15px 20px; border-bottom: 1px solid #f5f5f5; color: #1a1a1a; font-weight: 600;">
                        {{vehicle_details}}
                    </td>
                </tr>
                <tr>
                    <td style="padding: 15px 20px; border-bottom: 1px solid #f5f5f5; color: #888; font-size: 12px; text-transform: uppercase;">Passengers / الركاب</td>
                    <td style="padding: 15px 20px; border-bottom: 1px solid #f5f5f5; color: #1a1a1a; font-weight: 600;">
                        {{passengers}} Persons | {{luggage}} Bags
                    </td>
                </tr>
                {{price_row}}
            </table>
        </div>
    </div>

    <!-- Instructions -->
    <div style="padding: 0 20px 20px 20px;">
        <div style="background-color: #fdfdfd; border-radius: 12px; padding: 20px; border-left: 4px solid #D4AF37;">
            <h4 style="margin: 0 0 10px 0; color: #1a1a1a; font-size: 14px; text-transform: uppercase;">Important Notes | ملاحظات هامة</h4>
            <ul style="margin: 0; padding: 0 0 0 18px; font-size: 13px; color: #666; line-height: 1.8;">
                <li>Please be ready at the pickup point 15 minutes early.</li>
                <li>Your driver will contact you via WhatsApp upon arrival.</li>
                <li>Payment should be made in cash directly to the driver.</li>
            </ul>
        </div>
    </div>

    <!-- WhatsApp CTA -->
    <div style="padding: 0 20px 40px 20px; text-align: center;">
        <p style="font-size: 14px; color: #888; margin-bottom: 15px;">Need immediate assistance?</p>
        <a href="{{whatsapp_link}}" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 15px 35px; border-radius: 50px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);">
            Chat with us on WhatsApp
        </a>
    </div>

    <!-- Footer -->
    <div style="background-color: #000000; padding: 30px 20px; text-align: center; color: #888; font-size: 12px;">
        <p style="color: #D4AF37; font-weight: bold; margin-bottom: 10px; font-size: 14px;">Al Kiswah Umrah Transport</p>
        <p style="margin: 5px 0;">Kingdom of Saudi Arabia | Makkah & Madinah</p>
        <p style="margin: 5px 0;">&copy; {{year}} Al Kiswah Transport. All rights reserved.</p>
    </div>
</div>
`;

export const DEFAULT_ADMIN_NOTIFICATION_TEMPLATE = `
<div style="font-family: 'Segoe UI', Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
    <div style="background-color: #D4AF37; color: #000; padding: 20px; text-align: center;">
        <h2 style="margin: 0; text-transform: uppercase; letter-spacing: 1px;">🔔 New Booking Alert</h2>
        <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.8;">Reference: <strong>#{{booking_id}}</strong></p>
    </div>
    
    <div style="padding: 20px;">
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
            <h3 style="margin: 0 0 15px 0; border-bottom: 2px solid #D4AF37; padding-bottom: 8px; font-size: 16px;">Customer Information</h3>
            <table style="width: 100%; font-size: 14px;">
                <tr><td style="padding: 5px 0; color: #666; width: 100px;">Name:</td><td style="font-weight: bold;">{{name}}</td></tr>
                <tr><td style="padding: 5px 0; color: #666;">Phone:</td><td style="font-weight: bold; color: #D4AF37;">{{phone}}</td></tr>
                <tr><td style="padding: 5px 0; color: #666;">Email:</td><td>{{email}}</td></tr>
                {{country_row}}
            </table>

            <h3 style="margin: 25px 0 15px 0; border-bottom: 2px solid #D4AF37; padding-bottom: 8px; font-size: 16px;">Trip & Vehicle Details</h3>
            <table style="width: 100%; font-size: 14px;">
                <tr><td style="padding: 5px 0; color: #666; width: 100px;">Pickup:</td><td style="font-weight: bold;">{{pickup}}</td></tr>
                <tr><td style="padding: 5px 0; color: #666;">Dropoff:</td><td style="font-weight: bold;">{{dropoff}}</td></tr>
                <tr><td style="padding: 5px 0; color: #666;">Schedule:</td><td style="font-weight: bold;">{{date}} at {{time}}</td></tr>
                <tr><td style="padding: 5px 0; color: #666;">Vehicles:</td><td style="font-weight: bold; color: #D4AF37;">{{vehicle_details}}</td></tr>
                <tr><td style="padding: 5px 0; color: #666;">Passengers:</td><td>{{passengers}} Pax | {{luggage}} Bags</td></tr>
                {{flight_row}}
                {{arrival_date_row}}
                {{notes_row}}
                {{price_row}}
            </table>
        </div>

        <div style="margin-top: 25px; text-align: center;">
            <a href="https://wa.me/{{phone}}" style="display: inline-block; background-color: #25D366; color: #fff; text-decoration: none; padding: 12px 25px; border-radius: 8px; font-weight: bold; font-size: 14px;">
                Quick Reply via WhatsApp
            </a>
        </div>
    </div>
    
    <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 11px; color: #999;">
        This booking was submitted via Al Kiswah Umrah Transport Website.<br>
        Submission ID: {{booking_id}} | {{submission_time}}
    </div>
</div>
`;

// Template variable replacer
export const replaceTemplateVariables = (template: string, variables: Record<string, string | number | undefined>) => {
    let result = template;
    for (const [key, value] of Object.entries(variables)) {
        // Replace {{key}} case-insensitive
        const regex = new RegExp(`{{${key}}}`, 'gi');
        result = result.replace(regex, value !== undefined && value !== null ? String(value) : '');
    }
    return result;
};
