import type { Metadata, Viewport } from "next";
import { getSettings } from "@/lib/settings-storage";
import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper";
import UmrahPWA from "@/components/common/UmrahPWA";
import GlobalClientComponents from "@/components/common/GlobalClientComponents";
import CheckoutHeader from "@/components/checkout/CheckoutHeader";
import CheckoutFooter from "@/components/checkout/CheckoutFooter";

export const viewport: Viewport = {
    themeColor: 'hsl(var(--gold))', // Gold theme
    width: 'device-width',
    initialScale: 1,
};

export const metadata: Metadata = {
    manifest: '/manifest.json',
    title: {
        default: "Secure Checkout | Al Kiswah Umrah Transport",
        template: `%s | Al Kiswah Umrah Transport`
    },
    appleWebApp: {
        capable: true,
        title: 'Al Kiswah Umrah',
        statusBarStyle: 'default',
    },
    other: {
        'mobile-web-app-capable': 'yes',
    }
};

export default async function CheckoutLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const settings = await getSettings();

    return (
        <>
            <ClientLayoutWrapper>
                <UmrahPWA />
                <CheckoutHeader contactSettings={settings.contact} />
            </ClientLayoutWrapper>

            <main className="min-h-[calc(100vh-80px-300px)]">
                {children}
            </main>

            <ClientLayoutWrapper>
                <CheckoutFooter contactSettings={settings.contact} />
                <GlobalClientComponents contactSettings={settings.contact} />
            </ClientLayoutWrapper>
        </>
    );
}
