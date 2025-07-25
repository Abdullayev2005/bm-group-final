'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const cardData = [
  {
    img: '/about_image/yutuq1.png',
    title: 'Kompaniya yutuqlari',
    text: `BM GROUP, nafaqat mintaqada balki O‘zbekiston ko‘chmas mulk bozorida
      o‘zining nufuzli mavqeini saqlab qolishga, balki asosiy novator bo‘lishga ham intiladi.`
  },
  {
    img: '/about_image/yutuq2.jpg',
    title: 'Innovatsion yondashuv',
    text: `Yangi texnologiyalarni joriy etish orqali BM GROUP qurilish sifati va samaradorligini
      doimiy ravishda oshirishga intiladi.`
  },
  {
    img: '/about_image/yutuq3.jpg',
    title: 'Barqaror rivojlanish',
    text: `Kompaniya ekologik standartlarga rioya qilgan holda, barqarorlik va ijtimoiy mas’uliyatni
      o‘z faoliyatining asosiy tamoyili sifatida ko‘radi.`
  }
];

export default function AboutAchievements() {
  const [index, setIndex] = useState(0);
  const cardRef = useRef(null);

  useEffect(() => {
    const handleWheel = (e) => {
      if (!cardRef.current) return;

      const bounds = cardRef.current.getBoundingClientRect();
      const inView = bounds.top <= window.innerHeight && bounds.bottom >= 0;

      if (!inView) return;

      e.preventDefault();

      if (e.deltaY > 20) {
        setIndex((prev) => Math.min(prev + 1, cardData.length - 1));
      } else if (e.deltaY < -20) {
        setIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    const node = cardRef.current;
    node?.addEventListener('wheel', handleWheel, { passive: false });
    return () => node?.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
          <span className="text-[#C5A46D] font-bold">BM GROUP</span> 2013 yildan buyon Ozbekiston bozorida faoliyat yuritib kelmoqda.
        </h1>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-12 max-w-5xl">
          Hozirda, kompaniya O‘zbekiston reytingida BB toifaga ega. Komfort darajasidagi turar-joy majmualari,
          Premium darajadagi loyihalari, shuningdek tijoriy (savdo) ko‘chmas mulk – qurilishga doir barcha
          bozor segmentlarida developmentning to‘liq siklini amalga oshirib kelmoqda.
        </p>

        {/* Card with Controlled Scroll Animation */}
        <div ref={cardRef} className="relative h-[350px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="absolute top-0 left-0 w-full h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-md flex flex-col md:flex-row gap-6 items-center rounded-xl"
            >
              <div className="flex-1 w-[250px] h-[300px] relative">
                <Image
                  src={cardData[index].img}
                  alt={cardData[index].title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-4xl font-semibold text-[#1E2A64] mb-2">{cardData[index].title}</h3>
                <p className="text-gray-700 pt-5 dark:text-gray-300">
                  {cardData[index].text}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}