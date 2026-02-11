/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                'text-body': 'var(--color-text-body)',
                'bg-light': 'var(--color-bg-light)',
            },
            fontFamily: {
                sans: ['var(--font-sans)', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
