'use client';

import { useEffect, useState } from 'react';
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

// yordamchi: million UZSga aylantirish (UZS matndan)
const parseMillion = (t) => {
  const n = (t || '')
    .toString()
    .replace(/[^0-9]/g, ''); // barcha raqamdan tashqarilarni olib tashlaydi (shu jumladan NBSP)
  return n ? Number(n) / 1_000_000 : 0;
};

export default function KalculatorPage() {
  const [area, setArea] = useState([0, 500]);
  const [price, setPrice] = useState([50, 800]); // mln UZS
  const [floor, setFloor] = useState([-1, 16]);

  const [areaInput, setAreaInput] = useState(['0', '500']);
  const [priceInput, setPriceInput] = useState(['50', '800']);
  const [floorInput, setFloorInput] = useState(['-1', '16']);

  const [activeRoom, setActiveRoom] = useState(2);
  const [selectedYear, setSelectedYear] = useState(2026); // faqat 2026

  const rooms = [1, 2, 3];
  const years = [2026];

  // Inputni string holatda boshqarish
  const handleStringInputChange = (value, index, setter) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  // string inputlardan number state ga o'tkazish
  useEffect(() => {
    setArea([parseFloat(areaInput[0]) || 0, parseFloat(areaInput[1]) || 0]);
  }, [areaInput]);

  useEffect(() => {
    setPrice([parseFloat(priceInput[0]) || 0, parseFloat(priceInput[1]) || 0]);
  }, [priceInput]);

  useEffect(() => {
    setFloor([parseFloat(floorInput[0]) || 0, parseFloat(floorInput[1]) || 0]);
  }, [floorInput]);

  // Filtrlash
  const filteredProperties = propertiesData.filter((property) => {
    // narx (faqat UZS): totalPrice bo'lsa o'sha, bo'lmasa price
    const totalPriceMln = parseMillion(property.totalPrice || property.price);

    // maydon m²
    const areaValue = parseFloat((property.size || '').match(/\d+(\.\d+)?/)?.[0] || 0);

    // qavat: floors -> "8/16", yoki floorsText, yoki floor raqami
    const floorsText = property.floors || property.floorsText || (property.floor ? `${property.floor}/16` : '0/0');
    const floorValue = parseInt(floorsText.split('/')[0]) || 0;

    // yil (MM/YYYY)
    const yearValue = parseInt((property.date || '0/0').split('/')[1]) || 0;

    // xonalar soni (title dan)
    const roomCount = parseInt((property.title || '').match(/\d+/)?.[0] || 0);

    return (
      roomCount === activeRoom &&
      areaValue >= area[0] && areaValue <= area[1] &&
      totalPriceMln >= price[0] && totalPriceMln <= price[1] &&
      floorValue >= floor[0] && floorValue <= floor[1] &&
      yearValue === selectedYear
    );
  });

  return (
    <section className="pt-40 max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-[#1E2A64] mb-6">Ko'chmas mulk</h2>

      <div className="p-6 space-y-4">
        {/* Filter tugmalari */}
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

        {/* Yil tanlovi */}
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

        {/* Sliders */}
        <div className="grid md:grid-cols-3 gap-6 mt-4">
          {/* Maydon */}
          <div>
            <label className="block text-sm mb-1 text-[#1E2A64]">Maydon, m²</label>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                value={areaInput[0]}
                onChange={(e) => handleStringInputChange(e.target.value, 0, setAreaInput)}
                className="border border-[#1E2A64] px-2 py-1 w-24"
              />
              <span className="text-xs">m²</span>
              <input
                type="number"
                value={areaInput[1]}
                onChange={(e) => handleStringInputChange(e.target.value, 1, setAreaInput)}
                className="border border-[#1E2A64] px-2 py-1 w-24"
              />
              <span className="text-xs">m²</span>
            </div>
            <Slider
              range
              min={0}
              max={500}
              value={area}
              onChange={(value) => {
                setArea(value);
                setAreaInput([value[0].toString(), value[1].toString()]);
              }}
              className="mt-2"
              trackStyle={[{ backgroundColor: '#0B2273' }]}
              handleStyle={[
                { backgroundColor: '#738CC6', borderColor: '#0B2273' },
                { backgroundColor: '#738CC6', borderColor: '#0B2273' }
              ]}
            />
          </div>

          {/* Narx */}
          <div>
            <label className="block text-sm mb-1 text-[#1E2A64]">Umumiy narx, million UZS</label>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                value={priceInput[0]}
                onChange={(e) => handleStringInputChange(e.target.value, 0, setPriceInput)}
                className="border border-[#1E2A64] px-2 py-1 w-24"
              />
              <span className="text-xs">mln</span>
              <input
                type="number"
                value={priceInput[1]}
                onChange={(e) => handleStringInputChange(e.target.value, 1, setPriceInput)}
                className="border border-[#1E2A64] px-2 py-1 w-24"
              />
              <span className="text-xs">mln</span>
            </div>
            <Slider
              range
              min={50}
              max={800}
              value={price}
              onChange={(value) => {
                setPrice(value);
                setPriceInput([value[0].toString(), value[1].toString()]);
              }}
              className="mt-2"
              trackStyle={[{ backgroundColor: '#0B2273' }]}
              handleStyle={[
                { backgroundColor: '#738CC6', borderColor: '#0B2273' },
                { backgroundColor: '#738CC6', borderColor: '#0B2273' }
              ]}
            />
          </div>

          {/* Qavat */}
          <div>
            <label className="block text-sm mb-1 text-[#1E2A64]">Qavat</label>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                value={floorInput[0]}
                onChange={(e) => handleStringInputChange(e.target.value, 0, setFloorInput)}
                className="border border-[#1E2A64] px-2 py-1 w-24"
              />
              <input
                type="number"
                value={floorInput[1]}
                onChange={(e) => handleStringInputChange(e.target.value, 1, setFloorInput)}
                className="border border-[#1E2A64] px-2 py-1 w-24"
              />
            </div>
            <Slider
              range
              min={-1}
              max={16}
              value={floor}
              onChange={(value) => {
                setFloor(value);
                setFloorInput([value[0].toString(), value[1].toString()]);
              }}
              className="mt-2"
              trackStyle={[{ backgroundColor: '#0B2273' }]}
              handleStyle={[
                { backgroundColor: '#738CC6', borderColor: '#0B2273' },
                { backgroundColor: '#738CC6', borderColor: '#0B2273' }
              ]}
            />
          </div>
        </div>

        {/* Natijalar */}
        <section className="max-w-7xl mx-auto px-0 pt-12">
          <h2 className="text-xl font-semibold text-[#1E2A64] mb-4">Sizga moslari</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProperties.map((item, idx) => {
              const CardInner = (
                <>
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
                    <p className="text-[#1E2A64] text-sm font-semibold mb-3">
                      {item.totalPrice || item.price}
                    </p>

                    <div className="flex flex-wrap text-xs text-[#1E2A64] gap-x-3 gap-y-1">
                      <div className="flex items-center gap-1">
                        <TbCalendarEvent className="text-[#1E2A64]" />
                        {item.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <TbBuildingSkyscraper className="text-[#1E2A64]" />
                        {item.floors || item.floorsText || (item.floor ? `${item.floor}/16` : '—')}
                      </div>
                      <div className="flex items-center gap-1">
                        <TbRulerMeasure className="text-[#1E2A64]" />
                        {item.size}
                      </div>
                    </div>
                  </div>
                </>
              );

              // Agar link bor bo‘lsa — Link, bo‘lmasa oddiy karta div
              return item.link ? (
                <Link
                  key={idx}
                  href={item.link}
                  className="border bg-white border-[#CBD5E1] rounded-lg overflow-hidden hover:shadow-md transition"
                >
                  {CardInner}
                </Link>
              ) : (
                <div
                  key={idx}
                  className="border bg-white border-[#CBD5E1] rounded-lg overflow-hidden"
                >
                  {CardInner}
                </div>
              );
            })}
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
