import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export const config = {
  matcher: [
    "/((?!api|_next|manifest\\.json|.*\\..*).*)", // هندل مسیرهای معمول
    "/(fa|en)/:path*", // مسیرهای بین‌المللی
  ],
};

export default createMiddleware(routing);

// "/((?!fa|en|.*\\..*).*)"
