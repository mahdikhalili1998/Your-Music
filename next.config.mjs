/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

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
};

export default withNextIntl(nextConfig);
