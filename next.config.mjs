/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // اگر نمی‌خواهید خطاهای TypeScript در هنگام بیلد بررسی شوند
  },
  images: {
    domains: ["gxajjxknndbjfcoxazof.supabase.co"], // دامنه‌های مجاز برای بارگذاری تصاویر
  },
};

export default nextConfig;
