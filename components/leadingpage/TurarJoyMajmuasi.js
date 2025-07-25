'use client';

import Image from 'next/image';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { useState } from 'react';
import clsx from 'clsx'; // animatsiya uchun kerak bo‘ladi (yoki shunchaki className dinamik qilish)

const slides = [
  {
    image: '/images/Frame 34576.png',
  },
  {
    image: '/images/Frame 34577.png',
  },
  {
    image: '/images/Frame 34575.png',
  },
];

export default function ResidentialComplexes() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleSlides = slides.slice(startIndex, startIndex + 2);

  const prevSlide = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const nextSlide = () => {
    if (startIndex + 2 < slides.length) setStartIndex(startIndex + 1);
  };

  return (
    <section className="bg-[#001A70] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        {/* Matn qismi */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-4xl font-semibold">Turar-joy komplekslari</h2>
          <p className="text-base leading-relaxed">
            Toshkent shahridagi Charx Novza – bu BM Group tomonidan Shayxontohur tumanida, Samarqand Darvoza ko‘chasida barpo etilayotgan premium toifadagi 12 qavatli turar-joy majmuasi.
          </p>
          <button className="border border-white rounded-md px-6 py-2 hover:bg-white hover:text-[#001A70] transition">
            Batafsil
          </button>
        </div>

        {/* Slayder qismi */}
        <div className="md:w-1/2">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${startIndex * 50}%)` }}
            >
              {slides.map((item, index) => (
                <div key={index} className="w-1/2 px-2 flex-shrink-0">
                  <div className="relative w-[290px] h-[250px] rounded-xl overflow-hidden">
                    <img
                       src={item.image}
                       alt={item.title}
                       className="w-full h-64 object-cover rounded-lg"
/>

                    <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white p-3 text-sm">
                      <strong>{item.title}</strong><br />
                      {item.subtitle}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tugmalar: o‘ngda rasm ustida joylashgan */}
            <div className="absolute top-1/2 right-2 transform -translate-y-1/2 flex flex-col gap-3">
              <button
                onClick={prevSlide}
                disabled={startIndex === 0}
                className="p-2 bg-white text-[#001A70] rounded-full hover:bg-gray-200 transition disabled:opacity-50"
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={nextSlide}
                disabled={startIndex + 2 >= slides.length}
                className="p-2 bg-white text-[#001A70] rounded-full hover:bg-gray-200 transition disabled:opacity-50"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
