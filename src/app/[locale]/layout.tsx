import type { Metadata } from "next";
import "./globals.css";
import "@/font/font.css";
import "@/font/menu.css";
import "@/font/fontFace.css";
import Layout from "@/components/layout/Layout";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: "Your Music",
  description: "Upload Your Favorite",
};

interface LayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

const RootLayout: React.FC<LayoutProps> = async ({
  children,
  params: { locale },
}) => {
  const messages = await getMessages();
  return (
    <html lang={locale} dir={locale === "fa" ? "rtl" : "ltr"}>
      <link rel="icon" href="/favicon.ico" />
      <body className={"mx-auto max-w-[1600px] px-2 font-Roboto"}>
        <NextIntlClientProvider messages={messages}>
          <NextAuthProvider>
            <Layout locale={locale}>{children}</Layout>
          </NextAuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
