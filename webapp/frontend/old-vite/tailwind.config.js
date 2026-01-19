/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'toss-blue': '#3182f6',
                'toss-bg': '#f2f4f6',
                'toss-card': '#ffffff',
            },
            fontFamily: {
                sans: ['"Inter"', '"Suit"', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
