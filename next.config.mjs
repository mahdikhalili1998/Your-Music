/** @type {import('next').NextConfig} */
import config from "./next-i18next.config.js"; // Import به صورت default

const { i18n } = config; // استخراج i18n از default export

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // اگر نمی‌خواهید خطاهای TypeScript در هنگام بیلد بررسی شوند
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gxajjxknndbjfcoxazof.supabase.co", // دامنه مجاز برای بارگذاری تصاویر
        port: "", // پورت اگر وجود ندارد خالی بگذارید
        pathname: "**", // الگوی مسیرهای مجاز
      },
    ],
  },
  i18n,
};

export default nextConfig;
