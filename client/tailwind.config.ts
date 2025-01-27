import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      gridTemplateColumns: {
        equal: "1fr 1fr 1fr",
        custom: "30% 30% auto 40px 40px",
        "custom-sm": "30% 30% auto auto auto",
      },
      gridTemplateRows: {
        auto: "auto",
        // custom: "fit-content auto fit-content",
      },
    },
  },
  plugins: [],
} satisfies Config;
