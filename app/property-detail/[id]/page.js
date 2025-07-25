import propertiesData from '@/app/data/properties';
import Image from 'next/image';
import {
  TbCalendarEvent,
  TbBuildingSkyscraper,
  TbRulerMeasure,
} from 'react-icons/tb';
import ClientGallery from './ClientGallery'; // 👈 ichki client komponent

export function generateStaticParams() {
  return propertiesData.map((property) => ({
    id: property.id.toString(),
  }));
}

export default function Page({ params }) {
  const { id } = params;
  const property = propertiesData.find((p) => p.id === Number(id));

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-red-600">Obyekt topilmadi</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl pt-40 mx-auto px-6 py-12 text-[#1E2A64]">
      <h2 className="text-2xl font-semibold mb-4">
        Ko‘chmas mulk / <span className="text-[#737A94]">{property.residence}</span>
      </h2>

      <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
        <span>🏠 {property.title}</span>
        <span><TbBuildingSkyscraper className="inline-block mr-1" /> {property.floors} qavat</span>
        <span><TbRulerMeasure className="inline-block mr-1" /> {property.size}</span>
        <span><TbCalendarEvent className="inline-block mr-1" /> {property.date}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm mb-12">
        {property.rooms.map((room, idx) => (
          <div key={idx} className="border rounded-md p-4 shadow-sm hover:shadow-md transition">
            <div className="text-md font-semibold mb-1">{room.name}</div>
            <div className="text-[#737A94]">{room.size}</div>
          </div>
        ))}
      </div>

      {/* 👇 Client component faqat rasm galereyasi uchun */}
      <ClientGallery gallery={property.gallery} price={property.price} />

      <h3 className="text-xl font-bold mb-4">O‘xshash variantlar</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
        {propertiesData.slice(0, 8).map((item) => (
          <div key={item.id} className="border rounded-md p-2 hover:shadow-md transition text-sm">
            <div className="relative h-40 w-full mb-2">
              <Image src={item.img} alt={item.title} fill className="object-contain" />
            </div>
            <p className="font-medium">{item.title}</p>
            <p className="text-[#737A94]">{item.price}</p>
            <div className="flex flex-wrap gap-2 mt-2 text-xs text-[#737A94]">
              <span><TbCalendarEvent className="inline-block mr-1" />{item.date}</span>
              <span><TbBuildingSkyscraper className="inline-block mr-1" />{item.floors}</span>
              <span><TbRulerMeasure className="inline-block mr-1" />{item.size}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
