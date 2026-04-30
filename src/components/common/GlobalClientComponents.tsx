'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const ScrollToTop = dynamic(() => import('@/components/common/ScrollToTop'), { ssr: false });
const CookieConsent = dynamic(() => import('@/components/privacy/CookieConsent'), { ssr: false });

const WhatsAppVoiceButton = dynamic(() => import('@/components/common/WhatsAppVoiceButton'), { ssr: false });

interface GlobalClientComponentsProps {
    contactSettings?: {
        phone: string;
        email: string;
    };
}

export default function GlobalClientComponents({ contactSettings }: GlobalClientComponentsProps) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');

    if (isAdmin) {
        return null;
    }

    return (
        <>
            <ScrollToTop />
            <WhatsAppVoiceButton phoneNumber={contactSettings?.phone} />
            <CookieConsent />
        </>
    );
}
