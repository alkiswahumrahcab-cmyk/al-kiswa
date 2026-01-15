import Head from 'next/head';
import Script from 'next/script';
import { Thing, WithContext } from 'schema-dts';

interface JsonLdProps<T extends Thing> {
    schema: WithContext<T>;
}

export default function JsonLd<T extends Thing>({ schema }: JsonLdProps<T>) {
    return (
        <Script
            id="json-ld"
            type="application/ld+json"
            strategy="afterInteractive" // or beforeInteractive depending on need, but simplified usually works
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Next.js App Router specific component (if using layout.tsx)
// Since we are in App Router, we can just render the script tag directly in the body or head
export function JsonLdScript({ schema }: { schema: WithContext<any> }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
