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
            sans:       ["var(--font-montserrat)", "var(--font-tajawal)", "sans-serif"],
            mono:       ["var(--font-geist-mono)", "monospace"],
            montserrat: ["var(--font-montserrat)", "sans-serif"],
            tajawal:    ["var(--font-tajawal)", "sans-serif"],
            reem:       ["var(--font-tajawal)", "sans-serif"],
            // Cormorant Garamond display serif
            cormorant:  ["var(--font-cormorant)", "serif"],
            serif:      ["var(--font-cormorant)", "serif"],
            display:    ["var(--font-cormorant)", "serif"],
            playfair:   ["var(--font-cormorant)", "serif"],
        },
        extend: {
            colors: {
                // === SHADCN / SEMANTIC TOKENS (with alpha support) ===
                border:      "hsl(var(--border) / <alpha-value>)",
                input:       "hsl(var(--input) / <alpha-value>)",
                ring:        "hsl(var(--ring) / <alpha-value>)",
                background:  "hsl(var(--background) / <alpha-value>)",
                foreground:  "hsl(var(--foreground) / <alpha-value>)",
                primary: {
                    DEFAULT:    "hsl(var(--primary) / <alpha-value>)",
                    foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
                },
                secondary: {
                    DEFAULT:    "hsl(var(--secondary) / <alpha-value>)",
                    foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
                },
                destructive: {
                    DEFAULT:    "hsl(var(--destructive) / <alpha-value>)",
                    foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
                },
                muted: {
                    DEFAULT:    "hsl(var(--muted) / <alpha-value>)",
                    foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
                },
                accent: {
                    DEFAULT:    "hsl(var(--accent) / <alpha-value>)",
                    foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
                },
                popover: {
                    DEFAULT:    "hsl(var(--popover) / <alpha-value>)",
                    foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
                },
                card: {
                    DEFAULT:    "hsl(var(--card) / <alpha-value>)",
                    foreground: "hsl(var(--card-foreground) / <alpha-value>)",
                },

                // === BRAND TOKENS ===
                gold:      "hsl(var(--gold) / <alpha-value>)",       // #E2A336 canonical
                "gold-light": "hsl(var(--gold-light) / <alpha-value>)", // #E8C17D
                "gold-dark":  "hsl(var(--gold-dark) / <alpha-value>)",  // #A7731B
                charcoal:  "hsl(var(--charcoal) / <alpha-value>)",   // #15140F
                ivory:     "hsl(var(--ivory) / <alpha-value>)",      // #FDFCF8

                // === WARM NEUTRAL RAMP ===
                n: {
                    50:  "hsl(var(--n-50)  / <alpha-value>)",
                    100: "hsl(var(--n-100) / <alpha-value>)",
                    200: "hsl(var(--n-200) / <alpha-value>)",
                    300: "hsl(var(--n-300) / <alpha-value>)",
                    400: "hsl(var(--n-400) / <alpha-value>)",
                    500: "hsl(var(--n-500) / <alpha-value>)",
                    600: "hsl(var(--n-600) / <alpha-value>)",
                    700: "hsl(var(--n-700) / <alpha-value>)",
                    800: "hsl(var(--n-800) / <alpha-value>)",
                    900: "hsl(var(--n-900) / <alpha-value>)",
                },
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
