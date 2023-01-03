/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
    theme: {
        screens: {
          'tablet': '640px',
          // => @media (min-width: 640px) { ... }
    
          'laptop': '1024px',
          // => @media (min-width: 1024px) { ... }
    
          'desktop': '1280px',
          // => @media (min-width: 1280px) { ... }
        },
      extend: {
        keyframes: {
          wiggle: {
            "0%, 100%": { transform: "rotate(-1deg)" },
            "50%": { transform: "rotate(1deg)" }
          },
          pulse: {
            '0%, 100%': {
              opacity: 1
            },
            '50%': {
              opacity: .5
            }
          }
        },
        animation: {
          wiggle: "wiggle 250ms ease-in-out",
          pulse: "pulse 250ms ease-in-out"
        }
      }
    },
  plugins: [],
}
