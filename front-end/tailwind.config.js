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
          ping: {
            "0%": { transform: "scale(0.95)"},
            "50%": {boxshadow: "rgba(0, 0, 0, 0.7)"}
            }
        },
        animation: {
          ping: 'ping 250ms ease-out',
          wiggle: "wiggle 200ms ease-in-out"
        }
      }
    },
  plugins: [],
}
