import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)"
      },
      boxShadow: {
        "primary-normal": "0px 0px 0px 1px #18181B",
        "outline-normal":
          "0px 1px 1px 0px rgba(18, 18, 18, 0.10), 0px 0px 0px 1px rgba(18, 18, 18, 0.07), 0px 1px 3px 0px rgba(18, 18, 18, 0.10)"
      }
    }
  },
  plugins: []
} satisfies Config;
