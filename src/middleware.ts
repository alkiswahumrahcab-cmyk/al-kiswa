import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ARABIC_LOCALES = ["ar", "ar-SA", "ar-AE", "ar-KW", "ar-QA", "ar-BH", "ar-OM", "ar-EG"];
const ARABIC_COUNTRIES = ["SA", "AE", "KW", "QA", "BH", "OM", "EG", "JO", "LB", "SY", "IQ", "YE", "LY", "TN", "DZ", "MA"];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // --- 1. ADMIN AUTHENTICATION ---
    if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
        if (pathname === '/admin/login' || pathname === '/api/auth/login') {
            return NextResponse.next();
        }

        const adminToken = request.cookies.get('admin_token');

        if (!adminToken) {
            if (pathname.startsWith('/api/')) {
                return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
            }
            const loginUrl = new URL('/admin/login', request.url);
            return NextResponse.redirect(loginUrl);
        }

        try {
            const { verifyToken } = await import('@/lib/auth-utils');
            const payload = await verifyToken(adminToken.value);

            if (!payload || !payload.role) {
                throw new Error('Invalid token');
            }

            const allowedRoles = ['admin', 'manager', 'operational_manager'];
            if (!allowedRoles.includes(payload.role as string)) {
                if (pathname.startsWith('/api/')) {
                    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
                }
                const loginUrl = new URL('/admin/login', request.url);
                loginUrl.searchParams.set('error', 'Unauthorized access');
                return NextResponse.redirect(loginUrl);
            }
        } catch {
            if (pathname.startsWith('/api/')) {
                return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
            }
            const loginUrl = new URL('/admin/login', request.url);
            const response = NextResponse.redirect(loginUrl);
            response.cookies.delete('admin_token');
            return response;
        }
        return NextResponse.next();
    }

    // --- 2. LANGUAGE & GEO ROUTING ---
    // Never redirect: already on language path, static files, API routes, admin
    if (
        pathname.startsWith("/ar") ||
        pathname.startsWith("/api") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/favicon") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    // Never redirect Googlebot or other crawlers — let them see English by default
    const userAgent = request.headers.get("user-agent") || "";
    const isCrawler = /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot/i.test(userAgent);
    if (isCrawler) {
        return NextResponse.next();
    }

    // Check if user has manually set a language preference (cookie)
    const languagePreference = request.cookies.get("preferred-language")?.value;
    if (languagePreference === "en") return NextResponse.next();
    if (languagePreference === "ar") {
        return NextResponse.redirect(new URL(`/ar${pathname}`, request.url));
    }

    // Detect by Cloudflare geo header (if using Cloudflare)
    const country = request.headers.get("CF-IPCountry") || "";
    if (ARABIC_COUNTRIES.includes(country)) {
        return NextResponse.redirect(new URL(`/ar${pathname}`, request.url));
    }

    // Detect by Accept-Language header
    const acceptLanguage = request.headers.get("accept-language") || "";
    const primaryLanguage = acceptLanguage.split(",")[0].split(";")[0].trim().toLowerCase();
    const isArabicBrowser = ARABIC_LOCALES.some(locale =>
        primaryLanguage === locale.toLowerCase() || primaryLanguage.startsWith("ar")
    );

    if (isArabicBrowser) {
        return NextResponse.redirect(new URL(`/ar${pathname}`, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|logo.webp|images|sitemap.xml|robots.txt).*)",
    ],
};
