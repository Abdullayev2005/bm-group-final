'use client';

import { useEffect, useState } from 'react';

export default function MapSection() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!isMapLoaded && window.scrollY > 400) {
        loadYandexMap();
        setIsMapLoaded(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMapLoaded]);

  const loadYandexMap = () => {
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?lang=uz_UZ';
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => initMap();
    document.head.appendChild(script);
  };

  const initMap = () => {
    window.ymaps.ready(() => {
      const style = document.createElement("style");
      style.innerHTML = `
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.8); opacity: 0; }
        }
      `;
      document.head.appendChild(style);

      const customMainOfficeLayout = window.ymaps.templateLayoutFactory.createClass(`
        <div style="position: relative; width: 200px; height: 200px;">
          <div style="position: absolute; width: 200px; height: 200px; border-radius: 50%; background-color: rgba(0, 113, 188, 0.2); border: 6px solid rgba(0, 113, 188, 0.4); animation: pulse 2s infinite;"></div>
          <div style="position: absolute; width: 100px; height: 100px; top: 50px; left: 50px; border-radius: 50%; background-color: rgba(0, 113, 188, 0.8);"></div>
          <img src="/images/bm-logo.png" style="width: 60px; height: 60px; position: absolute; top: 70px; left: 70px; object-fit: contain;" />
        </div>
      `);

      const yellowLayout = customMainOfficeLayout;

      const locations = [
        {
          coords: [41.252880, 69.204118],
          hint: `Do'mbirobot Residence`,
          url: 'https://yandex.uz/maps/-/CHs156MH',
          layout: customMainOfficeLayout,
        },
        {
          coords: [41.304192, 69.215178],
          hint: 'CharxNovza BM Group asosiy ofis',
          url: 'https://yandex.uz/maps/-/CHs15SKL',
          layout: yellowLayout,
        },
        {
          coords: [41.239539, 69.196732],
          hint: `Sergeli Tumani Yangi qo'shnilar`,
          url: 'https://yandex.uz/maps/-/CHs1VVKY',
          layout: yellowLayout,
        },
        {
          coords: [41.244654, 69.312395],
          hint: 'Mirobod',
          url: 'https://yandex.uz/maps/-/CHs152Mh',
          layout: yellowLayout,
        }
      ];

      const map = new window.ymaps.Map('map', {
        center: [41.285842, 69.276384],
        zoom: 11,
        controls: []
      });

      locations.forEach((loc) => {
        const placemark = new window.ymaps.Placemark(loc.coords, {
          hintContent: loc.hint
        }, {
          iconLayout: loc.layout,
          iconShape: {
            type: 'Circle',
            coordinates: [100, 100],
            radius: 100
          },
          iconOffset: [-100, -100]
        });

        placemark.events.add('click', () => window.open(loc.url, '_blank'));
        map.geoObjects.add(placemark);
      });

      const bounds = window.ymaps.util.bounds.fromPoints(locations.map(loc => loc.coords));
      map.setBounds(bounds, {
        checkZoomRange: true,
        zoomMargin: 40
      });

      map.events.add('boundschange', () => {
        if (map.getZoom() > 17) {
          map.setZoom(17);
        }
      });
    });
  };

  return (
    <div className="w-full h-[650px]">
      <div id="map" className="w-full h-full rounded-lg shadow" />
    </div>
  );
}
