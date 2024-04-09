/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                custom: [
                    "FavoritBookC",
                    "Inter",
                    "system-ui",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "Segoe UI",
                    "Roboto",
                    "Helvetica Neue",
                    "Arial",
                    "Noto Sans",
                    "sans-serif",
                    "Apple Color Emoji",
                    "Segoe UI Emoji",
                    "Segoe UI Symbol",
                    "Noto Color Emoji",
                ],
            },

            screens: {
                vsm: "480px",
                // => @media (min-width: 640px) { ... }

                sm: "640px",
                // => @media (min-width: 640px) { ... }

                md: "768px",
                // => @media (min-width: 768px) { ... }

                mdb: "900px",

                lg: "1024px",
                // => @media (min-width: 1024px) { ... }

                xl: "1280px",
                // => @media (min-width: 1280px) { ... }

                "2xl": "1536px",
                // => @media (min-width: 1536px) { ... }
                "3xl": "1700px",
                // => @media (min-width: 1700px) { ... }
                appcontainer: "1168px", //w-6xl + px-2 = 1152px + 16px
            },

            animation: {
                enter: "enter .2s ease-out",
                leave: "leave .15s ease-in forwards",
            },
            keyframes: {
                enter: {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(40px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                },
                leave: {
                    "0%": {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                    "100%": {
                        opacity: "0",
                        transform: "translateY(40px)",
                    },
                },
            },
            colors: {
                "my-neutral-900": "var(--900)",
                "my-neutral-800": "var(--800)",
                "my-neutral-600": "var(--600)",
                "my-neutral-500": "var(--500)",
                "my-neutral-400": "var(--400)",
                "my-neutral-300": "var(--300)",
                "my-neutral-200": "var(--200)",
                "my-neutral-100": "var(--100)",
                "my-neutral-50": "var(--50)",
                "my-white": "var(--white)",
                "my-sky-200": "var(--sky-200-opacity)",
                "my-green-200": "var(--green-200)",
                "my-green-500": "var(--green-500)",
                "my-red-200": "var(--red-200)",
                "my-red-300": "var(--red-300)",
                "my-red-500": "var(--red-500)",
                "my-green-600": "var(--green-600)",
                border: "var(--border)",
            },
        },
    },
    plugins: [],
};
