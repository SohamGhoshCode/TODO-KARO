/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#090d16',
        cardBg: 'rgba(16, 22, 37, 0.65)',
        accentPurple: '#6366f1',
        accentPurpleHover: '#4f46e5',
        borderPurple: 'rgba(99, 102, 241, 0.2)',
        highPriority: '#ef4444',
        mediumPriority: '#eab308',
        lowPriority: '#22c55e',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
