// components/RealEstateSection.jsx
import Image from 'next/image'
import { FiUsers, FiGrid, FiLayers } from 'react-icons/fi'

export default function AboutInfoSection() {
  const imageSrc = '/about_image/info1.jpg';
  const imageSrc2 = '/about_image/info2.jpg';
  const imageSrc3 = '/about_image/info3.png'

  return (
    <section className="max-w-7xl max-h-150 mx-auto px-6 py-12 space-y-4">
      {/* Yuqori blok */}
      <div className="flex flex-col-reverse md:flex-row-reverse items-center md:space-x-34 md:space-x-reverse">
        <div className="w-full md:w-1/2 mt-8 md:mt-0">
          <h2 className="text-4xl font-bold leading-snug">
            10 yildan buyon<br/>
            O‘zbekiston ko‘chmas mulk bozorida
          </h2>
        </div>
        <div className="pr-12 w-full md:w-[400px] md:h-[180px]">
          <Image
            src={imageSrc}
            alt="Charx"
            width={300}
            height={800}
            className="w-full h-full rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>

      {/* Pastki blok: features + images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start md:flex-row-reverse">
        {/* O‘ng tomondagi rasm-guruh */}
        <div className="pl-20 grid grid-cols-2 grid-rows-2 gap-2 order-2 md:order-1">
          {/* Bosh rasm: ikki qatorda baland */}
          <div className="row-span-2 w-[240px] h-[180px]">
            <Image
              src={imageSrc2}
              alt="Charx"
              width={400}
              height={1200}
              className="w-full h-full rounded-lg shadow-md object-cover"
            />
          </div>
          {/* Yuqori-o‘ng rasm */}
          <div className="w-[250px] h-[370px]">
            <Image
              src={imageSrc3}
              alt="Charx"
              width={280}
              height={180}
              className="w-full h-full rounded-lg shadow-md object-cover"
            />
          </div>
        </div>

        {/* Chap tomondagi feature’lar */}
        <ul className="space-y-10 order-1 md:order-2">
          <li className="flex items-start">
            <FiUsers size={32} className="text-amber-500 flex-shrink-0 mt-1" />
            <div className="ml-4">
              <h3 className="text-2xl font-semibold">5 000+ istiqomat qiluvchi</h3>
              <p className="text-gray-700 mt-1">
                BM GROUP kompaniyasining uylarida 5000 kishi istiqomat qilayapti.
                Bu o‘zining qulay uy-joyiga ega bo‘lgan 1250 ga yaqin baxtli oila.
              </p>
            </div>
          </li>
          <li className="flex items-start">
            <FiGrid size={32} className="text-amber-500 flex-shrink-0 mt-1" />
            <div className="ml-4">
              <h3 className="text-2xl font-semibold">500 000+ kvadrat metr</h3>
              <p className="text-gray-700 mt-1">
                Ko‘chmas mulk shahar ko‘rinishiga uyg‘unlik bilan moslashadi 
                va kelajakka ajoyib sarmoya bo‘ladi.
              </p>
            </div>
          </li>
          <li className="flex items-start">
            <FiLayers size={32} className="text-amber-500 flex-shrink-0 mt-1" />
            <div className="ml-4">
              <h3 className="text-2xl font-semibold">20+ ob’yekt</h3>
              <p className="text-gray-700 mt-1">
                Biznes, komfort va iqtisod darajasidagi eng qulay joylashuvga ega 
                bo‘lgan turar-joy majmualari allaqachon foydalanishga topshirilgan.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  )
}
