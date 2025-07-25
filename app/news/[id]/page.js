import dummyNews from '@/app/data/news';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// ✅ generateStaticParams qo‘shildi
export async function generateStaticParams() {
  return dummyNews.map((news) => ({
    id: news.id.toString(),
  }));
}

export default async function NewsDetail({ params }) {
  const { id } = params;

  const news = dummyNews.find((n) => n.id === Number(id));

  if (!news) return notFound();

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
