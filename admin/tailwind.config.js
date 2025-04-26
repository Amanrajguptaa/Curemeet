/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		  colors: {
			'primary':"#3AAFB9",
			'secondary':"#E6FDFB",
			'tertiary':"#B6FDFB",
			'light':"E0FDFB"
		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

