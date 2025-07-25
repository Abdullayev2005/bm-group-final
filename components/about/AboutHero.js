'use client';

import Image from 'next/image';

export default function AboutHero() {
  return (
    <div className="relative w-full h-[80vh]">
      {/* Background Image */}
      <Image
        src="/images/1db.png" // o'zingga mos rasm nomini qo'y
        alt="About BM Group"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

    </div>
  );
}