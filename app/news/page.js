// app/news/page.js
import NewsSection from "@/components/leadingpage/NewsSection";

export const metadata = {
  title: "Yangiliklar",
  description: "BM Group yangiliklari",
};

export default function NewsPage() {
  // Server komponent — ichida client NewsSection render bo‘ladi
  return <NewsSection />;
}
