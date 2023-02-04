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
          },
          'reverse-spin': {
            from: {
              transform: 'rotate(360deg)'
            },
          },
          'sideToSide': {
            to: {
              transform: 'translateX(80%)',
              'left': '100%',
            }
          },
          'shadow': {
            '33%': {
              'clip-path': 'inset(0 0 0 -100px)'   
            },
            '50%': {
              'clip-path': 'inset(0 0 0 0)'  
            },
            '83%': {
              'clip-path': 'inset(0 -100px 0 0)' 
            }
         }
        },
        animation: {
          wiggle: "wiggle 250ms ease-in-out",
          pulse: "pulse 250ms ease-in-out",
          'reverse-spin': 'reverse-spin 1s linear infinite',
          'scanning': 'sideToSide 1s ease-in-out infinite alternate, shadow 2s ease-in-out infinite;',
        }
      }
    },
  plugins: [],
}
