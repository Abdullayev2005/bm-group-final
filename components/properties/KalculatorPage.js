'use client';

import { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Image from 'next/image';
import Link from 'next/link';
import propertiesData from '@/app/data/properties';
import {
  TbCalendarEvent,
  TbBuildingSkyscraper,
  TbRulerMeasure,
} from 'react-icons/tb';

export default function KalculatorPage() {
  const [area, setArea] = useState([0, 500]);
  const [price, setPrice] = useState([50, 800]);
  const [floor, setFloor] = useState([-1, 16]); // ✅ 16 qavatgacha
  const [activeRoom, setActiveRoom] = useState(2);
  const [selectedYear, setSelectedYear] = useState(2025);

  const rooms = [1, 2, 3];
  const years = [2025, 2026];

  const filteredProperties = propertiesData.filter((property) => {
    const totalPrice = parseInt(property.price.replace(/\s/g, '').replace('UZS', '')) / 1_000_000;
    const areaValue = parseFloat(property.size.match(/\d+(\.\d+)?/)[0]);
    const floorValue = parseInt(property.floors.split('/')[0]);
    const yearValue = parseInt(property.date.split('/')[1]);
    const roomCount = parseInt(property.title.match(/\d+/)[0]);

    return (
      roomCount === activeRoom &&
      areaValue >= area[0] && areaValue <= area[1] &&
      totalPrice >= price[0] && totalPrice <= price[1] &&
      floorValue >= floor[0] && floorValue <= floor[1] &&
      yearValue === selectedYear
    );
  });

  return (
    <section className="pt-40 max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-[#1E2A64] mb-6">Ko'chmas mulk</h2>

      <div className="p-6 space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex border border-[#1E2A64]">
            <button className="w-[120px] h-[48px] bg-white text-[#1E2A64] font-medium">Barchasi</button>
            <button className="w-[120px] h-[48px] bg-[#1E2A64] text-white font-medium">Turar-joy</button>
            <button className="w-[120px] h-[48px] bg-white text-[#1E2A64] font-medium">Tijorat</button>
          </div>

          <select className="px-4 py-2 border border-[#1E2A64] w-[300px]">
            <option>Turar-joy majmuasi</option>
          </select>

          <div>
            <label className="block text-sm text-[#1E2A64] mb-1">Xonalar soni</label>
            <div className="flex border border-[#1E2A64]">
              {rooms.map((r, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 w-[60px] ${activeRoom === r ? 'bg-[#1E2A64] text-white' : 'bg-white text-[#1E2A64]'}`}
                  onClick={() => setActiveRoom(r)}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-2">
          <label className="block text-sm text-[#1E2A64] mb-1">Topshirish muddati:</label>
          <div className="flex gap-2">
            {years.map((year) => (
              <button
                key={year}
                className={`px-4 py-2 border border-[#1E2A64] rounded-full w-[60px] ${selectedYear === year ? 'bg-[#1E2A64] text-white' : 'bg-white text-[#1E2A64]'}`}
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-4">
          {/* Maydon */}
          <div>
            <label className="block text-sm mb-1 text-[#1E2A64]">Maydon, m²</label>
            <div className="flex gap-2 items-center">
              <input type="number" value={area[0]} className="border border-[#1E2A64] px-2 py-1 w-24" readOnly />
              <span className="text-xs">m²</span>
              <input type="number" value={area[1]} className="border border-[#1E2A64] px-2 py-1 w-24" readOnly />
              <span className="text-xs">m²</span>
            </div>
            <div className="w-full mt-2">
              <Slider
                range
                min={0}
                max={500}
                value={area}
                onChange={(value) => setArea(value)}
                trackStyle={[{ backgroundColor: '#0B2273' }]}
                handleStyle={[
                  { backgroundColor: '#738CC6', borderColor: '#0B2273' },
                  { backgroundColor: '#738CC6', borderColor: '#0B2273' }
                ]}
              />
            </div>
          </div>

          {/* Narx */}
          <div>
            <label className="block text-sm mb-1 text-[#1E2A64]">Umumiy narx, million UZS</label>
            <div className="flex gap-2 items-center">
              <input type="number" value={price[0]} className="border border-[#1E2A64] px-2 py-1 w-24" readOnly />
              <span className="text-xs">mln</span>
              <input type="number" value={price[1]} className="border border-[#1E2A64] px-2 py-1 w-24" readOnly />
              <span className="text-xs">mln</span>
            </div>
            <div className="w-full mt-2">
              <Slider
                range
                min={50}
                max={800}
                value={price}
                onChange={(value) => setPrice(value)}
                trackStyle={[{ backgroundColor: '#0B2273' }]}
                handleStyle={[
                  { backgroundColor: '#738CC6', borderColor: '#0B2273' },
                  { backgroundColor: '#738CC6', borderColor: '#0B2273' }
                ]}
              />
            </div>
          </div>

          {/* Qavat */}
          <div>
            <label className="block text-sm mb-1 text-[#1E2A64]">Qavat</label>
            <div className="flex gap-2 items-center">
              <input type="number" value={floor[0]} className="border border-[#1E2A64] px-2 py-1 w-24" readOnly />
              <input type="number" value={floor[1]} className="border border-[#1E2A64] px-2 py-1 w-24" readOnly />
            </div>
            <div className="w-full mt-2">
              <Slider
                range
                min={-1}
                max={16} // ✅ 16 qavat
                value={floor}
                onChange={(value) => setFloor(value)}
                trackStyle={[{ backgroundColor: '#0B2273' }]}
                handleStyle={[
                  { backgroundColor: '#738CC6', borderColor: '#0B2273' },
                  { backgroundColor: '#738CC6', borderColor: '#0B2273' }
                ]}
              />
            </div>
          </div>
        </div>

        {/* Filtrlangan obyektlar */}
        <section className="max-w-7xl mx-auto px-0 pt-12">
          <h2 className="text-xl font-semibold text-[#1E2A64] mb-4">Sizga moslari</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProperties.map((item, idx) => (
              <Link
                key={idx}
                href={item.link}
                className="border bg-white border-[#CBD5E1] rounded-lg overflow-hidden hover:shadow-md transition"
              >
                <div className="h-48 relative">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <div className="p-4 border-t border-[#CBD5E1]">
                  <h3 className="text-[#1E2A64] text-base font-medium mb-1">{item.title}</h3>
                  <p className="text-[#1E2A64] text-sm font-semibold mb-3">{item.price}</p>

                  <div className="flex flex-wrap text-xs text-[#1E2A64] gap-x-3 gap-y-1">
                    <div className="flex items-center gap-1">
                      <TbCalendarEvent className="text-[#1E2A64]" />
                      {item.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <TbBuildingSkyscraper className="text-[#1E2A64]" />
                      {item.floors}
                    </div>
                    <div className="flex items-center gap-1">
                      <TbRulerMeasure className="text-[#1E2A64]" />
                      {item.size}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <p className="text-center text-[#1E2A64] col-span-full mt-6">Hech qanday obyekt topilmadi</p>
          )}

          <div className="flex justify-center mt-6">
            <button className="text-[#1E2A64] text-sm border-b border-[#1E2A64] pb-0.5">
              Yana variantlarni ko‘rsatish
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}
