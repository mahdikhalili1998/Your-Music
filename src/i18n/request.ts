import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { headers } from "next/headers";

export default getRequestConfig(async () => {
  const headersObject = await headers(); // `await` اضافه شد زیرا headers نیاز دارد
  const locale = headersObject.get("X-NEXT-INTL-LOCALE");

  if (!locale || !routing.locales.includes(locale as "fa" | "en")) {
    notFound();
  }

  return {
    locale, // بازگشت locale
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
