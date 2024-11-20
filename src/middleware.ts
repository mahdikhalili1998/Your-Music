import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)", "/(fa|en)/:path*"],
};

export default createMiddleware(routing);

// "/((?!fa|en|.*\\..*).*)"
