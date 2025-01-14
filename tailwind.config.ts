import type { Config } from 'tailwindcss';

export default {
  content: ['./src/{app,components}/**/*.{tsx,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
