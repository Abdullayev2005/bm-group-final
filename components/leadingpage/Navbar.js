'use client';

import Link from 'next/link';
import Flag from 'react-world-flags';
import { FiPhoneCall } from 'react-icons/fi';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { FaChevronDown } from 'react-icons/fa';
import { TbBuildingSkyscraper } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language.toUpperCase());
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false); // 🔹 yangi til oynasi state
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const langRef = useRef(null); // 🔹 til tanlash oynasini yopish uchun ref

  const isDarkNavbarPage = ['/properties', '/residences', '/property-detail', '/news'].some(path =>
    pathname.startsWith(path)
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🔹 Boshqa joyga bosilganda yopish (til va dropdown uchun)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const changeLang = (newLang) => {
    i18n.changeLanguage(newLang.toLowerCase());
    setLang(newLang.toUpperCase());
    localStorage.setItem('lang', newLang.toLowerCase()); // 🔹 tanlangan tilni saqlash
    setIsLangOpen(false);
  };

  const navItems = [
    { name: t('nav_about'), href: '/about' },
    { name: t('nav_properties'), href: '/properties' },
    { name: t('nav_news'), href: '/news' },
    {
      name: t('nav_residences'),
      subItems: [
        { name: 'Charx Novza', href: '/residences/charx', icon: '🏢' },
        { name: 'Do‘mbirobod Residence', href: '/residences/dombrovot', icon: '🏘️' },
        { name: 'Mirobod', href: '/residences/qoyliq', icon: '🏙️' },
        { name: 'Yangi qo‘shnilar', href: '/residences/sergeli', icon: '🏙️' }
      ]
    }
  ];

  return (
    <header
      className={`fixed left-1/2 -translate-x-1/2 z-50 font-sans transition-all w-full 
      ${
        isDarkNavbarPage
          ? 'bg-[#1E2A64] text-white shadow-none'
          : scrolled
          ? 'bg-white text-black shadow-md'
          : 'bg-transparent text-white'
      }`}
    >
      {/* Yuqori qator */}
      <div className="flex items-center justify-between px-6 py-3 text-sm">
        
        {/* Til tanlash */}
        <div className="relative select-none" ref={langRef}>
          <div
            className="flex items-center gap-2 px-3 py-1 rounded-md hover:bg-gray-100 hover:text-black transition cursor-pointer"
            onClick={() => setIsLangOpen((prev) => !prev)}
          >
            <Flag code={lang} style={{ width: 24, height: 16, borderRadius: 3 }} />
            <span className="uppercase font-medium tracking-wide">{lang}</span>
          </div>

          {isLangOpen && (
            <div className="absolute left-0 mt-1 flex flex-col bg-white text-black rounded-md shadow-md overflow-hidden z-50 min-w-[100px]">
              {['UZ', 'RU']
                .filter((item) => item !== lang)
                .map((item) => (
                  <button
                    key={item}
                    onClick={() => changeLang(item)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    <Flag code={item} style={{ width: 20, height: 14, borderRadius: 3 }} />
                    <span className="uppercase font-medium">{item}</span>
                  </button>
                ))}
            </div>
          )}
        </div>

        {/* Logotip */}
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/bm_logo.png"
              alt="BM GROUP logo"
              width={100}
              height={40}
              className="h-10 w-auto object-contain"
            />
            <span
              className={`pt-5 text-1xl font-semibold tracking-wide ${
                isDarkNavbarPage ? 'text-white' : scrolled ? 'text-black' : 'text-white'
              }`}
            >
              BM GROUP
            </span>
          </div>
        </Link>

        {/* Telefon */}
        <div className="flex items-center gap-2">
          <div className="bg-black p-2 rounded-full">
            <FiPhoneCall className={`${scrolled ? 'text-white' : 'text-white'} text-base`} />
          </div>
          <a href="tel:+998785550077" className="hover:underline text-sm font-medium">
            +998 78 555 00 77
          </a>
        </div>
      </div>

      {/* Pastki menyular */}
      <nav className="flex items-center justify-center space-x-4 text-sm font-medium tracking-wide pb-3">
        {navItems.map((item) => {
          const isActive =
            pathname.startsWith('/residences') && item.name === t('nav_residences');

          return (
            <div
              key={item.name}
              className="relative"
              ref={item.name === t('nav_residences') ? dropdownRef : null}
            >
              {item.subItems ? (
                <>
                  <button
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className={`flex items-center gap-1 px-4 py-2 rounded transition duration-200 ${
                      isActive || isDropdownOpen
                        ? 'bg-gray-200 text-yellow-600'
                        : 'hover:bg-gray-100 hover:text-black'
                    }`}
                  >
                    {item.name}
                    <FaChevronDown size={12} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute left-0 mt-2 flex flex-col bg-white text-black shadow-lg z-50 min-w-[200px] rounded-md">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 border-b last:border-b-0"
                        >
                          <TbBuildingSkyscraper className="text-blue-900" />
                          <span>{sub.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`px-4 py-2 transition duration-200 rounded ${
                    pathname === item.href
                      ? 'bg-gray-200 text-yellow-600'
                      : 'hover:bg-gray-100 hover:text-black'
                  }`}
                >
                  {item.name}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </header>
  );
}
