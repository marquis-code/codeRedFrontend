// const plugin = require('tailwindcss/plugin');
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./components/**/*.{js,vue,ts}",
//     "./layouts/**/*.vue",
//     "./pages/**/*.vue",
//     "./plugins/**/*.{js,ts}",
//     "./nuxt.config.{js,ts}",
//     "./app.vue",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         gorditas: ['Gordita', 'sans-serif'], // Custom font family
//       },
//       colors: {
//         gray: {
//           25:  "#fafafa",
//           50:  "#f2f2f2",
//           100: "#e6e6e6",
//           200: "#cccccc",
//           300: "#b3b3b3",
//           400: "#999999",
//           500: "#808080",
//           600: "#666666",
//           700: "#4d4d4d",
//           800: "#333333",
//           900: "#1a1a1a",
//           925: "#0d0d0d",
//         },
//       },
//     },
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [
//     plugin(function({ addUtilities }) {
//       addUtilities({
//         '.bg-green-striped': {
//           'background-image': `linear-gradient(45deg, #0a2000 10%, transparent 10%,
//             transparent 20%, #0a2000 20%, #0a2000 30%, transparent 30%, transparent 40%,
//             #0a2000 40%, #0a2000 50%, transparent 50%, transparent 60%, #0a2000 60%,
//             #0a2000 70%, transparent 70%, transparent 80%, #0a2000 80%, #0a2000 90%,
//             transparent 90%, transparent)`,
//         },
//       })
//     })
//   ],
// }

const plugin = require('tailwindcss/plugin');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['RoobertPRO', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'roobert': ['RoobertPRO', 'sans-serif'],
      },
      backgroundImage: {
        'custom-bg': "url('/heroBg.png')",
      },
      animation: {
        marquee: 'marquee linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
      },
      colors: {
        primary: '#3BAB22',             
        background: '#3BAB22',         
        foreground: '#1A1A1B', 
        background: {
          DEFAULT: '#FAFAFA',
          soft: 'rgba(26, 26, 27, 0.03)', 
          greenSoft: 'rgba(59, 171, 34, 0.1)' 
        },
         
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			// border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				// border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
        green: {
          200: '#C8E6C9',
          300: '#A5D6A7',
          500: '#4CAF50'
        },
        gray: {
          25:  "#fafafa",
          50:  "#f2f2f2",
          100: "#e6e6e6",
          150: "#EAECF0",
          200: "#cccccc",
          250: "#7A7A7A",
          300: "#b3b3b3",
          400: "#999999",
          500: "#808080",
          600: "#666666",
          700: "#4d4d4d",
          800: "#333333",
          900: "#1a1a1a",
          925: "#0d0d0d",
          
        },
        green: {
          50: '#f0faf0',
          100: '#dbf5db',
          200: '#b8eab8',
          300: '#8dd88d',
          400: '#5dc15d',
          500: '#4caf50', // Primary green
          600: '#3d8c3d',
          700: '#2e682e',
          800: '#1f451f',
          900: '#0f220f',
          925: '#1C5210',
        },
      },
      // fontSize: {
      //   sm: ['14px', { lineHeight: '20px', fontWeight: '300' }],
      //   base: ['16px', { lineHeight: '24px', fontWeight: '300', }],       // regular
      //   medium: ['18px', { lineHeight: '24px', fontWeight: '400' }],       // medium
      //   heading: ['30px', { lineHeight: '38px', fontWeight: '500' }],   // medium weight
      //   'heading-bold': ['30px', { lineHeight: '38px', fontWeight: '700' }], // strong headings
      // },
      // borderRadius: {
  		// 	lg: 'var(--radius)',
  		// 	md: 'calc(var(--radius) - 2px)',
  		// 	sm: 'calc(var(--radius) - 4px)'
  		// },
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		}
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.bg-green-striped': {
          'background-image': `linear-gradient(45deg, #0a2000 10%, transparent 10%,
            transparent 20%, #0a2000 20%, #0a2000 30%, transparent 30%, transparent 40%,
            #0a2000 40%, #0a2000 50%, transparent 50%, transparent 60%, #0a2000 60%,
            #0a2000 70%, transparent 70%, transparent 80%, #0a2000 80%, #0a2000 90%,
            transparent 90%, transparent)`,
        },
      })
    })
  ],
}