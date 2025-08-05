'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function AboutCertificate() {
  const certificates = [
    '/about_image/hijjat2.jpg',
    '/about_image/hijjat3.jpg',
    '/about_image/hijjat5.jpg',
  ];

  const [current, setCurrent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (index) => {
    setCurrent(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % certificates.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    if (isModalOpen) {
      document.addEventListener('keydown', handleKey);
    } else {
      document.removeEventListener('keydown', handleKey);
    }
    return () => document.removeEventListener('keydown', handleKey);
  }, [isModalOpen]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 text-center">
      <h2 className="text-[48px] sm:text-[64px] font-semibold text-slate-600 tracking-widest mb-12">
        Hujjatlar
      </h2>

      {/* Rasmlar qatorda */}
      <div className="flex gap-6 justify-center overflow-x-auto">
        {certificates.map((src, idx) => (
          <div key={idx} className="cursor-pointer" onClick={() => openModal(idx)}>
            <Image
              src={src}
              alt={`Certificate ${idx + 1}`}
              width={300}
              height={420}
              className="rounded-xl shadow-md object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* Modal – Telegram uslubida */}
      {isModalOpen && (
  <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
    {/* ✅ Har doim ekranning yuqori o‘ng burchagida ko‘rinadigan X tugma */}
    <button
      onClick={closeModal}
      className="fixed top-6 right-6 z-[9999] w-10 h-10 bg-white/30 text-white text-2xl rounded-full flex items-center justify-center hover:bg-red-600 hover:scale-110 transition duration-300"
    >
      &times;
    </button>

    <div className="relative max-w-2xl w-full px-4 pt-20 overflow-visible">
      {/* RASM */}
      <Image
        src={certificates[current]}
        alt="Modal rasm"
        width={500}
        height={800}
        className="w-full h-auto object-contain rounded-xl shadow-2xl"
      />

      {/* Oldingi tugma */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 -translate-y-1/2 -left-16 z-[9999] w-12 h-12 bg-white/20 text-white text-3xl rounded-full flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition duration-300"
      >
        &#8592;
      </button>

      {/* Keyingi tugma */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 -translate-y-1/2 -right-16 z-[9999] w-12 h-12 bg-white/20 text-white text-3xl rounded-full flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition duration-300"
      >
        &#8594;
      </button>
    </div>
  </div>
)}

    </section>
  );
}
