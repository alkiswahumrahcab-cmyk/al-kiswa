import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
        },
        fontFamily: {
            sans: ["var(--font-montserrat)", "var(--font-tajawal)", "sans-serif"],
            mono: ["var(--font-geist-mono)", "monospace"],
            playfair: ["var(--font-montserrat)", "var(--font-tajawal)", "sans-serif"], // Replaced Playfair with Montserrat as requested
            reem: ["var(--font-tajawal)", "sans-serif"], // Replaced Reem Kufi with Tajawal
            montserrat: ["var(--font-montserrat)", "sans-serif"],
            tajawal: ["var(--font-tajawal)", "sans-serif"],
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                // === NEW LUXURY THEME COLORS ===
                "primary-black": "hsl(var(--primary-black))",  // #0F172A
                "deep-black": "hsl(var(--deep-black))",        // #09090b
                "charcoal": "hsl(var(--charcoal))",            // #F8F9FA

                "gold-primary": "hsl(var(--gold-primary))",    // #F59E0B
                "gold-light": "hsl(var(--gold-light))",        // #FEF3C7
                "gold-dark": "hsl(var(--gold-dark))",          // #B45309
                "gold-metallic": "hsl(var(--gold-metallic))",  // #D4AF37

                // Legacy Mapping (keeping to prevent crashes, but redirected to new theme)
                // Removed to prevent overriding standard tailwind palettes
                // emerald: "hsl(var(--primary-black))",
                // mint: "hsl(var(--soft-mint))",
                // gold: "hsl(var(--gold-primary))",
                // slate: "hsl(var(--primary-black))",
                // warm: "hsl(var(--charcoal))",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
        },
    },
    plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
export default config;
