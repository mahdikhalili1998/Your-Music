/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";
import withPWAInit from "@ducanh2912/next-pwa";

const withNextIntl = createNextIntlPlugin();

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
  },
});

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

export default withPWA(withNextIntl(nextConfig));
