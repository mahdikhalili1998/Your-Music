/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  typescript: {
    ignoreBuildErrors: true, // اگر نمی‌خواهید خطاهای TypeScript در هنگام بیلد بررسی شوند
  },
};

export default nextConfig;
