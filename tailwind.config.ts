import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  corePlugins:{
    textAlign:true,
  },
  theme: {
    extend: {
      fontFamily:{
        YekanBakh:['YekanBakh']
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        textColor:{
          'primary': '#4D4D4D'
        },
        linkColor:{
          'primary':'#3477E8'
        },
        ProjectColor:{
          'primary':'#FA5A2A',
          '50':'#FA5A2A26'
        }
      },
    },
    variants:{
      extend:{
        textAlign:['rtl'],
      }
    }
  },
  plugins: [],
  darkMode: ['variant', [
    '@media (prefers-color-scheme: dark) { &:not(.light *) }',
    '&:is(.dark *)',
  ]],
} satisfies Config;
