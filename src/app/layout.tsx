import "../app/globals.css";
import "@/font/font.css";
import "@/font/menu.css";
import "@/font/fontFace.css";
interface LayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html>
      <body className={"mx-auto max-w-[1600px] font-Roboto"}>{children}</body>
    </html>
  );
};

export default RootLayout;
