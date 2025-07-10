/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'status-in-process': '#f59e0b',
        'status-need-start': '#3b82f6',
        'status-complete': '#10b981',
        'status-blocked': '#ef4444',
        'priority-high': '#ef4444',
        'priority-medium': '#f59e0b',
        'priority-low': '#10b981',
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
      }
    },
  },
  plugins: [],
}