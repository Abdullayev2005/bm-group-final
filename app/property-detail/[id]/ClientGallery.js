'use client';

import { useState } from 'react';
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb';
import Image from 'next/image';

export default function ClientGallery({ gallery, price }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? gallery.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === gallery.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div id="plan-section" className="mb-16 scroll-mt-32 pt-10">
      <div className="text-right text-xl font-semibold mb-4">{price}</div>

      <div className="relative w-full h-200 border rounded-lg overflow-hidden shadow-md flex items-center justify-center">
        <Image
          src={gallery[currentImageIndex]}
          alt={`Rasm ${currentImageIndex + 1}`}
          width={560}
          height={560}
          className="object-contain transition-all duration-300"
        />

        <button
          onClick={prevImage}
          className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white text-[#1E2A64] p-2 rounded-full shadow hover:bg-gray-200 z-10"
        >
          <TbChevronLeft size={20} />
        </button>

        <button
          onClick={nextImage}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white text-[#1E2A64] p-2 rounded-full shadow hover:bg-gray-200 z-10"
        >
          <TbChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
