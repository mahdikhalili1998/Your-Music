import "./globals.css";
import "@/font/font.css";
import "@/font/menu.css";
import "@/font/fontFace.css";
import Layout from "@/components/layout/Layout";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Viewport } from "next";

interface LayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export const viewport: Viewport = {
  themeColor: '"transparent"',
};

const RootLayout: React.FC<LayoutProps> = async ({
  children,
  params: { locale },
}) => {
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "fa" ? "rtl" : "ltr"}>
      <head>
        <title>Your Music</title>
        <meta name="description" content="Upload Your Favorite" />
        {/* safari  */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta
          name="apple-mobile-web-app-title"
          content="Upload Your Favorite"
        />
        <link rel="apple-touch-icon" sizes="48×48" href="icon/48.png" />
        <link rel="apple-touch-icon" sizes="64×64" href="icon/64.png" />
        <link rel="apple-touch-icon" sizes="96×96" href="icon/96.png" />
        <link rel="apple-touch-icon" sizes="144×144" href="icon/144.png" />
        <link rel="apple-touch-icon" sizes="180×180" href="icon/180.png" />
        <link rel="apple-touch-icon" sizes="192×192" href="icon/192.png" />
        <link rel="apple-touch-icon" sizes="512×512" href="icon/512.png" />
        {/* end safari */}
        {/* ie */}
        <meta name="msapplication-TileImage" content="/icon/144.png" />
        <meta name="msapplication-TileColor" content="transparent" />
        <meta name="msapplication-starturl" content="/" />
        {/* end ie  */}
        <meta name="theme-color" content="transparent" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={"mx-auto max-w-[1600px] font-Roboto"}>
        <NextIntlClientProvider messages={messages}>
          <NextAuthProvider>
            <Layout locale={JSON.parse(JSON.stringify(locale))}>
              {children}
            </Layout>
          </NextAuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
