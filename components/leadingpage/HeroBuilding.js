'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const buildings = [
  { id: 1, name: 'A Bino', top: '40.3%', left: '12.7%', img: '/buil_image/tayyor 1.png', width: '40.8%', height: '40.8%' },
  { id: 2, name: 'B Bino', top: '57%', left: '23.6%', img: '/buil_image/tayyor 2.png', width: '46.4%', height: '46.4%' },
  { id: 3, name: 'C Bino', top: '63.2%', left: '44.6%', img: '/buil_image/tayyor 3.png', width: '55.0%', height: '55.0%' },
  { id: 4, name: 'D Bino', top: '62.7%', left: '67%', img: '/buil_image/tayyor 4.png', width: '55%', height: '55%' },
  { id: 5, name: 'E Bino', top: '65%', left: '87.8%', img: '/buil_image/tayyor 5.png', width: '55%', height: '55%' },
];

const doors = [
  { id: 1, name: 'Eshik 1', img: '/buil_image/eshik_1.png', top: '64.5%', left: '20%', width: '40%', height: '84.0%' },
  { id: 2, name: 'Eshik 2', img: '/buil_image/eshik_2.png', top: '65%', left: '29.5%', width: '30.3%', height: '65%' },
  { id: 3, name: 'Eshik 3', img: '/buil_image/eshik_3.png', top: '58%', left: '34.2%', width: '8.6%', height: '46.3%' },
  { id: 4, name: 'Eshik 4', img: '/buil_image/eshik_4.png', top: '55.3%', left: '43.6%', width: '10.9%', height: '50.9%' },
  { id: 5, name: 'Eshik 5', img: '/buil_image/eshik_5.png', top: '58.5%', left: '53%', width: '7.5%', height: '74.0%' },
  { id: 6, name: 'Eshik 6', img: '/buil_image/eshik_6.png', top: '62.9%', left: '67.5%', width: '16.9%', height: '60.7%' },
];

export default function HeroBuilding() {
  const [activeBuilding, setActiveBuilding] = useState(null);
  const [activeDoor, setActiveDoor] = useState(null);
  const router = useRouter();

  const handleDoorClick = (id) => {
    router.push(`/property-detail/${id}`);
  };

  const handleBuildingClick = (id) => {
    setActiveBuilding(id);
    setActiveDoor(null);
  };

  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden">
      <Image src="/buil_image/tour.jpg" alt="Panorama" fill className="object-cover" />

      {buildings.map(({ id, top, left, name, img, width, height }) => (
        <div
          key={id}
          title={name}
          onClick={() => handleBuildingClick(id)}
          className="absolute cursor-pointer group hover:scale-105 transition-transform duration-300"
          style={{ top, left, width, height, transform: 'translate(-50%, -50%)' }}
        >
          <Image
            src={img}
            alt={name}
            fill
            className="object-contain z-10 relative mix-blend-multiply group-hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]"
          />
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-white text-xs bg-blue-600 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {name} haqida ma'lumot
          </div>
        </div>
      ))}

      {activeBuilding && (
        <div className="absolute bottom-0 left-0 w-full bg-white border-t z-20 p-6 animate-slideUp overflow-hidden">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold text-[#1E2A64]">
              {buildings.find(b => b.id === activeBuilding)?.name}
            </h2>
            <button onClick={() => setActiveBuilding(null)} className="text-sm text-red-600">
              Yopish
            </button>
          </div>
          <p className="mt-2 text-gray-700">
            Bu yerda {buildings.find(b => b.id === activeBuilding)?.name} haqida batafsil ma'lumot bo‘ladi.
          </p>
          <div className="mt-4 relative w-full aspect-[16/9] bg-gray-100 rounded shadow-inner overflow-hidden">
            <Image
              src="/buil_image/eshik_section.png"
              alt="Eshiklar bilan koridor"
              fill
              className="object-cover rounded"
            />
            {doors.map(({ id, img, top, left, name, width, height }) => (
              <div
                key={id}
                onClick={() => handleDoorClick(id)}
                className="absolute cursor-pointer group"
                style={{ top, left, width, height, transform: 'translate(-50%, -50%)' }}
              >
                <Image
                  src={img}
                  alt={name}
                  fill
                  className="object-contain group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                />
              </div>
            ))}
          </div>

          {activeDoor && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded shadow">
              <h3 className="text-lg font-semibold text-blue-800">
                {doors.find(d => d.id === activeDoor)?.name}
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                Bu yerda {doors.find(d => d.id === activeDoor)?.name}ga oid batafsil ma'lumot va uy chizmasi bo‘ladi.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}