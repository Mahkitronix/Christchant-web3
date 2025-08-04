import { heroui } from '@heroui/react'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/components/(badge|dropdown|input|modal|pagination|menu|divider|popover|button|ripple|spinner|form).js',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)', // Use the primary color variable
        secondary: 'var(--color-secondary)', // Add other colors as needed
        'primary-dark': 'var(--color-primary-dark)', // Dark mode primary color
        'secondary-dark': 'var(--color-secondary-dark)', // Dark mode secondary color
        'dark-primary': 'var(--color-dark-primary)', // Dark mode primary color
        'dark-secondary': 'var(--color-dark-secondary)', // Dark mode secondary color
        'primary-dark-mode': 'var(--color-primary-dark-mode)', // Dark mode primary color
        'secondary-dark-mode': 'var(--color-secondary-dark-mode)', // Dark mode secondary color
        'dark-mode-primary': 'var(--color-dark-mode-primary)', // Dark mode primary color
        'dark-mode-secondary': 'var(--color-dark-mode-secondary)', // Dark mode secondary color
        'dark-primary-color': 'var(--color-dark-primary-color)', // Dark mode primary color
        'dark-secondary-color': 'var(--color-dark-secondary-color)', // Dark mode secondary color
        // Add other global CSS variables here
      },
      fontFamily: {
        sans: [
          'Matter',
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Roboto',
          'sans-serif',
        ],
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui()],
}

export default config
