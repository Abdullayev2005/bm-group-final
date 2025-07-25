'use client';

import {
  FaTools,
  FaPaintBrush,
  FaHandsHelping,
  FaShieldAlt,
  FaChild,
  FaUserTie,
} from 'react-icons/fa';

const services = [
  {
    icon: FaTools,
    title: 'Infratuzilma',
    desc: "Bizning uylarda barcha yutuqlarni o‘zida jamlagan mutlaqo yangi va zamonaviy shahar infratuzilmasi rivojlanmoqda.",
  },
  {
    icon: FaPaintBrush,
    title: 'Dizayn va Bezatish',
    desc: "Kirish guruhlarining loyihasi va dizayni butun turar-joy majmuasi arxitekturasining uy va davomiy muhit timsoli bo‘lib xizmat qiladi.",
  },
  {
    icon: FaHandsHelping,
    title: 'Professional xizmatlar',
    desc: "Biz har bir mijozga turar joy tanlashda uning imkoniyatlari va istaklarini inobatga olgan holda individual yondoshamiz.",
  },
  {
    icon: FaShieldAlt,
    title: 'Xavfsizlik',
    desc: "24 soatlik videokuzatuv xavfsizlik, tinchlik va osoyishtalikni ta’minlaydi.",
  },
  {
    icon: FaChild,
    title: 'O‘yin maydoni',
    desc: "Farzandingiz bemalol o‘yin maydonlarida o‘ynashi mumkin.",
  },
  {
    icon: FaUserTie,
    title: 'Shaxsiy xizmatlar',
    desc: "Turar joy uchun shaxsiy xizmatlar (JEK) tashkil etiladi, bu sizni vaqtingizni tejashga yordam beradi.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 px-4 bg-white text-gray-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Nima uchun bizni tanlash kerak
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <Icon className="text-1xl text-[#996600]" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h4>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg text-1xl text-gray-700 leading-relaxed">
                  {item.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
