/** @type {import('tailwindcss').Config} */
// tailwind.config.js
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Ensure you're scanning the correct file paths for your project
  ],
  theme: {
    extend: {
      // Custom theme extensions go here
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        /* Scrollbar styles for Webkit browsers */
        '.custom-scrollbar::-webkit-scrollbar': {
          width: '8px',
        },
        '.custom-scrollbar::-webkit-scrollbar-track': {
          background: '#e5e7eb',  /* Light gray */
        },
        '.custom-scrollbar::-webkit-scrollbar-thumb': {
          background: '#6b7280',   /* Gray thumb */
          borderRadius: '10px',
          border: '2px solid #e5e7eb',  /* Padding around the thumb */
        },
        '.custom-scrollbar::-webkit-scrollbar-thumb:hover': {
          background: '#4b5563',   /* Darker gray on hover */
        },
        /* Scrollbar styles for Firefox */
        '.custom-scrollbar': {
          scrollbarWidth: 'thin',        /* Thin scrollbar for Firefox */
          scrollbarColor: '#6b7280 #e5e7eb', /* Thumb color, track color */
        },
      })
    }
  ],
}
