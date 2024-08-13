import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        shantell: ["Sirin Stencil", "sans-serif"],
        Roboto: ["Roboto Slab", "sans-serif"],
      },
      colors: {
        "p-200": "#e9d5ff",
        "p-300": "#d8b4fe",
        "p-400": "#a78bfa",
        "p-500": "#a855f7",
        "p-700": "#7e22ce",
        "p-950": "#3b0764",
      },
    },
  },
  plugins: [],
};
export default config;
