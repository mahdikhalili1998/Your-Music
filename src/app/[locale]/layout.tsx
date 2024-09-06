import type { Metadata } from "next";
import "./globals.css";
import "../../font/font.css";
import "../../font/menu.css";
import Layout from "@/components/layout/Layout";
import NextAuthProvider from "@/providers/NextAuthProvider";


export const metadata: Metadata = {
  title: "Your Music",
  description: "Upload Your Favorite",
};

interface LayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

const RootLayout: React.FC<LayoutProps> = ({
  children,
  params: { locale },
}) => {
  return (
    <html lang={locale}>
      <link rel="icon" href="/favicon.ico" />
      <body className={"mx-auto max-w-[1600px] font-Roboto"}>
        <NextAuthProvider>
          <Layout>{children}</Layout>
        </NextAuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
