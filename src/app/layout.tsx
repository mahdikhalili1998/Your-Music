import type { Metadata } from "next";
import "./globals.css";
import "../font/font.css";
import "../font/menu.css";
import Layout from "@/components/layout/Layout";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app"; // استفاده از نوع AppProps

export const metadata: Metadata = {
  title: "Your Music",
  description: "Upload Your Favorite",
};

interface LayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" />
      <body className={"mx-auto max-w-[1600px] font-Roboto"}>
        <NextAuthProvider>
          <Layout>{children}</Layout>
        </NextAuthProvider>
      </body>
    </html>
  );
};

export default appWithTranslation(RootLayout);
