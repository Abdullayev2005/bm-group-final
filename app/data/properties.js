const usdToUzs = 13000;

const sqmUsdRateByFloor = {
  1: 1400, 2: 1062, 3: 1046, 4: 992, 5: 992, 6: 954,
  7: 954, 8: 915, 9: 915, 10: 877, 11: 877, 12: 846,
  13: 846, 14: 808, 15: 777, 16: 762
};

const propertiesData = [
  {
    id: 1,
    title: '2-xonali',
    residence: 'Do‘mbirobod residence',
    date: '4/2026',
    floors: '3/14',
    size: '39.1 m²',
    img: '/properties/Hona_1.png',
    gallery: ['/properties/Hona_1.png', '/properties/floor2.png', '/properties/floor3.png'],
    link: '/property-detail/1',
    rooms: [
      { name: 'Dahliz', size: '3.7 m²' },
      { name: 'Yotoqxona1', size: '16 m²' },
      { name: 'Yotoqxona2', size: '9.4 m²' },
      { name: 'Sanuzel', size: '4.3 m²' },
      { name: 'Oshxona & Mehmonxona', size: '23.8 m²' },
      { name: 'Balkon', size: '4.6 m²' }
    ]
  },
  {
    id: 2,
    title: '3-xonali',
    residence: 'Charx Novza',
    date: '6/2026',
    floors: '5/14',
    size: '30.7 m²',
    img: '/properties/floor2.png',
    gallery: ['/properties/Hona_2.png'],
    link: '/property-detail/2',
    rooms: [
      { name: 'Yotoqxona1', size: '14.2 m²' },
      { name: 'Yotoqxona2', size: '11.5 m²' },
      { name: 'Zal', size: '25 m²' },
      { name: 'Oshxona', size: '13.5 m²' },
      { name: 'Sanuzel', size: '6 m²' }
    ]
  },
  {
    id: 3,
    title: '1-xonali',
    residence: 'BM Tower',
    date: '6/2026',
    floors: '2/9',
    size: '32.1 m²',
    img: '/properties/Hona_3.png',
    gallery: ['/properties/floor3.png'],
    link: '/property-detail/3',
    rooms: [
      { name: 'Yotoqxona', size: '20 m²' },
      { name: 'Oshxona', size: '10 m²' },
      { name: 'Sanuzel', size: '3.5 m²' }
    ]
  },
  {
    id: 4,
    title: '2-xonali',
    residence: 'Yangi Hayot',
    date: '6/2026',
    floors: '8/16',
    size: '45.0 m²',
    img: '/properties/floor4.png',
    gallery: ['/properties/Hona_4.png'],
    link: '/property-detail/4',
    rooms: [
      { name: 'Yotoqxona1', size: '16.5 m²' },
      { name: 'Oshxona', size: '14 m²' },
      { name: 'Zal', size: '20 m²' },
      { name: 'Sanuzel', size: '4.7 m²' }
    ]
  },
  {
    id: 5,
    title: '3-xonali',
    residence: 'Uchquduq Plaza',
    date: '6/2026',
    floors: '12/20',
    size: '63.7 m²',
    img: '/properties/floor5.png',
    gallery: ['/properties/Hona_5.png'],
    link: '/property-detail/5',
    rooms: [
      { name: 'Yotoqxona1', size: '18 m²' },
      { name: 'Yotoqxona2', size: '16 m²' },
      { name: 'Zal', size: '30 m²' },
      { name: 'Oshxona', size: '15 m²' },
      { name: 'Sanuzel', size: '6 m²' }
    ]
  }
];

// Qo‘shimcha: Narx hisoblovchi funksiya
function calculatePrice(floorStr, sizeStr) {
  const floor = parseInt(floorStr.split('/')[0]);
  const sqm = parseFloat(sizeStr);
  const rateUsd = sqmUsdRateByFloor[floor];
  const totalUzs = Math.round(rateUsd * usdToUzs * sqm);
  return totalUzs.toLocaleString('ru-RU') + ' UZS';
}

// Har bir obyektga yangi narx qo‘shamiz
const updatedProperties = propertiesData.map((item) => {
  const newPrice = calculatePrice(item.floors, item.size);
  return {
    ...item,
    price: newPrice
  };
});

export default updatedProperties;
