'use client';

import Image from 'next/image';
import Link from 'next/link';
import dummyNews from '../data/newsData';
export default function NewsCard() {
  return (
    <section className="pt-30 max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-[#1E2A64] mb-8">Yangiliklar</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {dummyNews.map(({ id, title, img }) => (
          <Link href={`/news/${id}`} key={id} className="text-center block">
            <div className="relative w-full h-60">
              <Image
                src={img}
                alt={title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <p className="mt-4 text-[#1E2A64] font-medium text-base">{title}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
