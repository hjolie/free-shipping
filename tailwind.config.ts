import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "dark-ocean": "#002d72",
                "gray-dark": "#1a1a1a",
                "gray-light": "#f5f5f5",
            },
            maxWidth: {
                "1200": "1200px",
            },
        },
    },
    plugins: [],
};
export default config;
