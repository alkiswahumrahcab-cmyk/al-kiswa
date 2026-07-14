import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: 'var(--color-bg)',
                surface: 'var(--color-surface)',
                'surface-alt': 'var(--color-surface-alt)',
                'surface-sunken': 'var(--color-surface-sunken)',
                border: 'var(--color-border)',
                'border-strong': 'var(--color-border-strong)',
                ink: 'var(--color-ink)',
                body: 'var(--color-body)',
                muted: 'var(--color-muted)',
                gold: 'var(--color-gold)',
                'gold-strong': 'var(--color-gold-strong)',
                'gold-soft': 'var(--color-gold-soft)',
                'gold-line': 'var(--color-gold-line)',
                'ink-bg': 'var(--color-ink-bg)',
                'ink-surface': 'var(--color-ink-surface)',
                'on-ink': 'var(--color-on-ink)',
                'on-ink-muted': 'var(--color-on-ink-muted)',
                success: 'var(--color-success)',
                error: 'var(--color-error)',
                warning: 'var(--color-warning)',
                info: 'var(--color-info)',
            },
            fontFamily: {
                display: ['var(--font-display)'],
                body: ['var(--font-body)'],
            },
            borderRadius: {
                btn: 'var(--radius-btn)',
                sm: 'var(--radius-sm)',
                md: 'var(--radius-md)',
                lg: 'var(--radius-lg)',
                xl: 'var(--radius-xl)',
                pill: 'var(--radius-pill)',
            },
            boxShadow: {
                xs: 'var(--shadow-xs)',
                sm: 'var(--shadow-sm)',
                md: 'var(--shadow-md)',
                lg: 'var(--shadow-lg)',
                gold: 'var(--shadow-gold)',
            },
            maxWidth: { container: '1280px' },
            transitionTimingFunction: { brand: 'cubic-bezier(0.22,1,0.36,1)' },
        },
    },
    plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
export default config;
