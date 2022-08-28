/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
    theme: {
      extend: {
        keyframes: {
          wiggle: {
            "0%, 100%": { transform: "rotate(-3deg)" },
            "50%": { transform: "rotate(3deg)" }
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
          ping: 'ping 250ms ease-in-out',
          wiggle: "wiggle 250ms ease-in-out",
          pulse: 'pulse 250ms ease-in-out'
        }
      }
    },
  plugins: [],
}
