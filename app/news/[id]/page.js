'use client';

import Image from 'next/image';
import { getNewsData } from '@/app/data/newsData';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    const allNews = getNewsData();
    const found = allNews.find((n) => n.id === Number(id));
    setNews(found);
  }, [id]);

  if (!news) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-[#1E2A64] mb-6">{news.title}</h1>
      <div className="relative w-full h-80 mb-6">
        <Image
          src={news.img}
          alt={news.title}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <p className="text-gray-700 text-lg whitespace-pre-line">{news.desc}</p>
    </div>
  );
}
