'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getLang, getNewsData } from "@/app/data/newsData";

export default function NewsSection() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState("uz");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const l = getLang(); // localStorage'dan o‘qiydi faqat browserda
    setLang(l);
    setItems(getNewsData(l));
    setMounted(true);

    const onLang = (e) => {
      const newLang = e?.detail || getLang();
      setLang(newLang);
      setItems(getNewsData(newLang));
    };
    window.addEventListener("langchange", onLang);
    return () => window.removeEventListener("langchange", onLang);
  }, []);

  if (!mounted) return null; // SSR vaqtida localStorage chaqirilmaydi

  return (
    <section className="pt-30 max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-[#1E2A64] mb-8">
        {lang === "ru" ? "Новости" : "Yangiliklar"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {items.map(({ id, title, img }) => (
          <Link href={`/news/${id}`} key={id} className="text-center block">
            <div className="relative w-full h-60">
              <Image src={img} alt={title} fill className="object-cover rounded-lg" />
            </div>
            <p className="mt-4 text-[#1E2A64] font-medium text-base">{title}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
