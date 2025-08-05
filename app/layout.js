import Navbar from "@/components/leadingpage/Navbar";
import "./globals.css";
import Footer from "@/components/leadingpage/Footer";
import ChatButton from "@/components/leadingpage/ChatButton";

export const metadata = {
  title: "BM Group",
  description: "Ko'chmas mulk platformasi",
  icons: {
    icon: "/bm_logo.png", // yoki .png, agar .ico ishlamasa
    apple: "/bm_logo.png", // iOS qurilmalar uchun
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <head>
        <meta
          name="google-site-verification"
          content="google6ca257423078377b.html"
        />
      </head>
      <body>
        <Navbar />
        {children}
        <ChatButton />
        <Footer />
      </body>
    </html>
  );
}
