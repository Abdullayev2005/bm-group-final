'use client';

import { FaTelegramPlane, FaYoutube, FaInstagram, FaFacebookF } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#002366] text-white pt-10 pb-4 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 grid-cols-1 gap-8">
        
        {/* Chap qism: aloqa, kompaniya, social */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-3 tracking-wide">BM GROUP</h2>
            <p className="text-sm text-gray-300 leading-6 mb-6">
              2013 yildan buyon O‘zbekiston ko‘chmas mulk bozorida faoliyat yuritib kelmoqda. Ishonchli, zamonaviy va qulay turar joy majmualari.
            </p>

            <h3 className="text-lg font-semibold mb-2 text-yellow-400">Aloqa</h3>
            <ul className="text-sm space-y-2">
              <li>📍 Shayxontohur tumani, Samarqand Darvoza ko‘chasi</li>
              <li>📞 <a href="tel:+998785550077" className="hover:underline">+998 78 555 00 77</a></li>
              <li>🕒 Har kuni 09:00 – 19:00</li>
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-yellow-400">Bizni kuzating</h3>
            <div className="flex gap-4 text-xl">
              <a href="https://t.me/bmgroupuzbekistan"><FaTelegramPlane className="hover:text-yellow-400 transition" /></a>
              <a href="https://www.instagram.com/bmgroup_uz?igsh=NG5tNnhjcWdiOHU%3D&utm_source=qr"><FaInstagram className="hover:text-yellow-400 transition" /></a>
            </div>
          </div>
        </div>

        {/* O‘ng qism: xarita */}
        <div className="w-full h-[300px] md:h-[400px] rounded overflow-hidden">
  <iframe
    src="https://yandex.uz/map-widget/v1/?um=constructor%3Ab74039802138d56c8c7717ee41cc17e952bc793ddace9892f92ac53cdacf9aa1&source=constructor"
    width="100%"
    height="100%"
    style={{ border: '0' }}
    allowFullScreen
    loading="lazy"
    title="BM Group Locations"
  ></iframe>
</div>

      </div>

      {/* Pastki chiziq */}
      <div className="mt-8 border-t border-white/20 pt-4 text-center text-xs text-gray-400">
        © 2025 – BARCHA HUQUQLAR HIMOYALANGAN
      </div>
    </footer>
  );
}
