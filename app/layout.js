import Navbar from "@/components/leadingpage/Navbar";
import "./globals.css";
import Footer from "@/components/leadingpage/Footer";
import ChatButton from "@/components/leadingpage/ChatButton";
import PhonePrompt from "@/components/PhonePrompt";
import I18nProvider from "@/components/I18nProvider";

export const metadata = {
  title: "BM Group",
  description: "Ko'chmas mulk platformasi",
  icons: {
    icon: "/bm_logo.png",
    apple: "/bm_logo.png",
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
        {/* 🔹 i18n Provider — butun UI shu yerda o'raladi */}
        <I18nProvider>
          <Navbar />
          <PhonePrompt />
          {children}
          <ChatButton />
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
