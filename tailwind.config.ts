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
        iransans: ["IRANSansXFaNum", "sans-serif"],
        yekan: ["Yekan", "sans-serif"],
      },
      colors: {
        "p-200": "#e9d5ff",
        "p-300": "#d8b4fe",
        "p-400": "#a78bfa",
        "p-500": "#a855f7",
        "p-700": "#7e22ce",
        "p-950": "#3b0764",
      },
      screens: {
        270: "270px",
        300: "300px",
        330: "330px",
        350: "350px",
        380: "380px",
        400: "400px",
        450: "450px",
        500: "500px",
        550: "550px",
        600: "600px",
        640: "640px",
        670: "670px",
        700: "700px",
        780: "780px",
        820: "820px",
        900: "900px",
        950: "950px",
        1170: "1170px",
      },
    },
  },
  plugins: [],
};
export default config;
