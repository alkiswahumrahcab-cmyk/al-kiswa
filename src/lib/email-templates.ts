export const DEFAULT_BOOKING_CONFIRMATION_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
</head>
<body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937; line-height: 1.6; max-width: 600px; margin: 0 auto; direction: ltr; background-color: #f9fafb; padding: 20px;">
    
    <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
        <!-- Premium Header -->
        <div style="background-color: #000000; padding: 40px 20px; text-align: center; border-bottom: 4px solid #d4af37;">
            <h1 style="color: #d4af37; margin: 0; font-size: 28px; text-transform: uppercase; letter-spacing: 3px; font-weight: 800;">Al Kiswah</h1>
            <p style="color: #a1a1aa; margin-top: 8px; font-size: 14px; letter-spacing: 1px; text-transform: uppercase;">Umrah Transport</p>
            <p style="color: #ffffff; margin-top: 15px; font-size: 20px; font-family: 'Amiri', serif;">عمرة مبرورة وسعي مشكور</p>
        </div>

        <!-- Spiritual Greeting -->
        <div style="padding: 40px 30px; text-align: center; background-color: #fffbeb;">
            <div style="font-size: 22px; color: #d4af37; font-family: 'Amiri', serif; margin-bottom: 12px;">أهلاً بك يا ضيف الرحمن لخدمات الكسوة</div>
            <h2 style="font-size: 24px; color: #111827; margin: 0; font-weight: 700;">Welcome, Guest of Allah</h2>
            <p style="color: #4b5563; font-size: 16px; margin-top: 16px; line-height: 1.8;">
                May Allah accept your Umrah, your prayers, and your good deeds. 
                We are honored to be part of your spiritual journey.
            </p>
        </div>

        <!-- Booking Summary Section -->
        <div style="padding: 30px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid #f3f4f6;">
                <div>
                    <h3 style="margin: 0; color: #111827; font-size: 18px; text-transform: uppercase; letter-spacing: 1px;">Booking Confirmation</h3>
                    <p style="margin: 4px 0 0 0; color: #6b7280; font-size: 14px;">Thank you for choosing us.</p>
                </div>
                <div style="text-align: right;">
                    <span style="display: block; color: #d4af37; font-weight: 700; font-size: 18px;">#{{booking_id}}</span>
                    <span style="display: block; color: #9ca3af; font-size: 12px; margin-top: 4px;">{{submission_time}}</span>
                </div>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h4 style="margin: 0 0 15px 0; color: #374151; font-weight: 600; font-size: 15px; text-transform: uppercase; letter-spacing: 0.5px;">Trip Details / تفاصيل الرحلة</h4>
                <div style="border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left;">
                        <thead>
                            <tr style="background-color: #f9fafb;">
                                <th style="padding: 12px 15px; color: #4b5563; font-weight: 600; border-bottom: 1px solid #e5e7eb; width: 5%;">#</th>
                                <th style="padding: 12px 15px; color: #4b5563; font-weight: 600; border-bottom: 1px solid #e5e7eb; width: 45%;">Route</th>
                                <th style="padding: 12px 15px; color: #4b5563; font-weight: 600; border-bottom: 1px solid #e5e7eb; width: 25%;">Date & Time</th>
                                <th style="padding: 12px 15px; color: #4b5563; font-weight: 600; border-bottom: 1px solid #e5e7eb; width: 25%;">Vehicle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {{legs_html}}
                        </tbody>
                    </table>
                </div>
            </div>

            <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 50%;">Passengers / الركاب</td>
                        <td style="padding: 8px 0; color: #111827; font-weight: 600; text-align: right; font-size: 15px;">
                            {{passengers}} Persons
                        </td>
                    </tr>
                    {{country_row}}
                    {{flight_row}}
                    {{arrival_date_row}}
                    {{notes_row}}
                </table>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-top: 10px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px;">
                {{price_row}}
            </table>
        </div>

        <!-- Instructions -->
        <div style="padding: 0 30px 30px 30px;">
            <div style="background-color: #fefce8; border-radius: 8px; padding: 20px; border-left: 4px solid #eab308;">
                <h4 style="margin: 0 0 10px 0; color: #854d0e; font-size: 15px; font-weight: 600;">Important Notes | ملاحظات هامة</h4>
                <ul style="margin: 0; padding: 0 0 0 20px; font-size: 14px; color: #713f12; line-height: 1.6;">
                    <li style="margin-bottom: 6px;">Please be ready at the pickup point 15 minutes early.</li>
                    <li style="margin-bottom: 6px;">Your driver will contact you via WhatsApp upon arrival.</li>
                    <li>Payment should be made in cash directly to the driver unless pre-paid online.</li>
                </ul>
            </div>
        </div>

        <!-- WhatsApp CTA -->
        <div style="padding: 0 30px 40px 30px; text-align: center;">
            <p style="font-size: 15px; color: #6b7280; margin-bottom: 16px;">Need immediate assistance?</p>
            <a href="{{whatsapp_link}}" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 600; font-size: 16px; letter-spacing: 0.5px;">
                Chat on WhatsApp
            </a>
        </div>

        <!-- Footer -->
        <div style="background-color: #000000; padding: 30px 20px; text-align: center; color: #a1a1aa; font-size: 13px;">
            <p style="color: #d4af37; font-weight: 600; margin-bottom: 8px; font-size: 15px; letter-spacing: 1px; text-transform: uppercase;">Al Kiswah Umrah Transport</p>
            <p style="margin: 4px 0;">Kingdom of Saudi Arabia | Makkah & Madinah</p>
            <p style="margin: 15px 0 0 0; font-size: 12px; color: #52525b;">&copy; {{year}} Al Kiswah Transport. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

export const DEFAULT_ADMIN_NOTIFICATION_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
</head>
<body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937; background-color: #f3f4f6; margin: 0; padding: 20px;">
    
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background-color: #111827; padding: 25px 20px; text-align: center; border-top: 4px solid #d4af37;">
            <h2 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 600; letter-spacing: 0.5px;">
                <span style="color: #d4af37; margin-right: 8px;">🔔</span>New Booking Received
            </h2>
            <p style="margin: 8px 0 0 0; font-size: 14px; color: #9ca3af;">Reference ID: <strong style="color: #d4af37;">#{{booking_id}}</strong></p>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px;">
            <!-- Customer Info -->
            <div style="margin-bottom: 30px;">
                <h3 style="margin: 0 0 15px 0; font-size: 15px; text-transform: uppercase; color: #6b7280; letter-spacing: 1px; border-bottom: 1px solid #f3f4f6; padding-bottom: 8px;">Customer Information</h3>
                <table style="width: 100%; font-size: 15px; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0; color: #6b7280; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: 600; color: #111827;">{{name}}</td></tr>
                    <tr><td style="padding: 8px 0; color: #6b7280;">Phone</td><td style="padding: 8px 0; font-weight: 600; color: #2563eb;">{{phone}}</td></tr>
                    <tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0; color: #111827;">{{email}}</td></tr>
                    {{country_row}}
                </table>
            </div>

            <!-- Trip Info -->
            <div style="margin-bottom: 30px;">
                <h3 style="margin: 0 0 15px 0; font-size: 15px; text-transform: uppercase; color: #6b7280; letter-spacing: 1px; border-bottom: 1px solid #f3f4f6; padding-bottom: 8px;">Trip & Itinerary</h3>
                <div style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; margin-bottom: 15px;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left;">
                        <thead style="background-color: #f9fafb;">
                            <tr>
                                <th style="padding: 10px 15px; color: #4b5563; font-weight: 600; border-bottom: 1px solid #e5e7eb;">#</th>
                                <th style="padding: 10px 15px; color: #4b5563; font-weight: 600; border-bottom: 1px solid #e5e7eb;">Route</th>
                                <th style="padding: 10px 15px; color: #4b5563; font-weight: 600; border-bottom: 1px solid #e5e7eb;">Date/Time</th>
                                <th style="padding: 10px 15px; color: #4b5563; font-weight: 600; border-bottom: 1px solid #e5e7eb;">Vehicle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {{legs_html_admin}}
                        </tbody>
                    </table>
                </div>
                
                <table style="width: 100%; font-size: 15px; border-collapse: collapse; background-color: #f9fafb; padding: 15px; border-radius: 8px;">
                    <tr><td style="padding: 8px 15px; color: #6b7280; width: 120px;">Passengers</td><td style="padding: 8px 15px; font-weight: 600; color: #111827;">{{passengers}} Pax</td></tr>
                    {{arrival_date_row}}
                    {{notes_row}}
                </table>
            </div>

            <!-- Price -->
            <div style="margin-bottom: 30px;">
                <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                    {{price_row}}
                </table>
            </div>

            <!-- Action -->
            <div style="text-align: center; margin-top: 10px;">
                <a href="https://wa.me/{{phone}}" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-weight: 600; font-size: 15px;">
                    Reply to Customer via WhatsApp
                </a>
            </div>
        </div>
        
        <div style="background-color: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb;">
            Automated notification from Al Kiswah Website<br>
            Submitted at: {{submission_time}}
        </div>
    </div>
</body>
</html>
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
