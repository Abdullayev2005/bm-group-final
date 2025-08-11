// Har bir qavat uchun m² narxi (UZS)
const sqmUzsRateByFloor = {
  1: 18_000_000,
  2: 13_800_000,
  3: 13_600_000,
  4: 12_900_000,
  5: 12_900_000,
  6: 12_400_000,
  7: 12_400_000,
  8: 11_900_000,
  9: 11_900_000,
  10: 11_400_000,
  11: 11_400_000,
  12: 11_000_000,
  13: 11_000_000,
  14: 10_500_000,
  15: 10_100_000,
  16: 9_900_000
};

// Asosiy planlar (siz bergan ma’lumotlar + rooms)
const baseProperties = [
  { title: '1В kom.', residence: 'Do‘mbirobod residence', date: '4/2026', size: '39.1 m²', img: '/properties/Hona_1.png', gallery: ['/properties/Hona_1.png'], rooms: [
    { name: 'Yotoqxona', size: '20 m²' },
    { name: 'Oshxona', size: '10 m²' },
    { name: 'Sanuzel', size: '4 m²' }
  ]},
  { title: '1Г kom.', residence: 'Charx Novza', date: '6/2026', size: '30.7 m²', img: '/properties/Hona_2.png', gallery: ['/properties/Hona_2.png'], rooms: [
    { name: 'Yotoqxona', size: '18 m²' },
    { name: 'Oshxona', size: '8 m²' },
    { name: 'Sanuzel', size: '4 m²' }
  ]},
  { title: '1Д kom.', residence: 'BM Tower', date: '6/2026', size: '32.1 m²', img: '/properties/Hona_3.png', gallery: ['/properties/Hona_3.png'], rooms: [
    { name: 'Yotoqxona', size: '19 m²' },
    { name: 'Oshxona', size: '9 m²' },
    { name: 'Sanuzel', size: '4 m²' }
  ]},
  { title: '1 kom.', residence: 'Yangi Hayot', date: '6/2026', size: '31.4 m²', img: '/properties/Hona_4.png', gallery: ['/properties/Hona_4.png'], rooms: [
    { name: 'Yotoqxona', size: '18 m²' },
    { name: 'Oshxona', size: '9 m²' },
    { name: 'Sanuzel', size: '4 m²' }
  ]},
  { title: '2 kom.', residence: 'Uchquduq Plaza', date: '6/2026', size: '45.0 m²', img: '/properties/Hona_5.png', gallery: ['/properties/Hona_5.png'], rooms: [
    { name: 'Yotoqxona', size: '25 m²' },
    { name: 'Oshxona', size: '12 m²' },
    { name: 'Sanuzel', size: '5 m²' }
  ]},
  { title: '2К kom.', residence: 'Do‘mbirobod Residence', date: '6/2026', size: '63.7 m²', img: '/properties/Hona_6.png', gallery: ['/properties/Hona_6.png'], rooms: [
    { name: 'Yotoqxona', size: '30 m²' },
    { name: 'Oshxona', size: '20 m²' },
    { name: 'Sanuzel', size: '6 m²' }
  ]},
  { title: '2Д kom.', residence: 'Charx Novza', date: '6/2026', size: '62.3 m²', img: '/properties/Hona_7.png', gallery: ['/properties/Hona_7.png'], rooms: [
    { name: 'Yotoqxona', size: '28 m²' },
    { name: 'Oshxona', size: '20 m²' },
    { name: 'Sanuzel', size: '6 m²' }
  ]},
  { title: '1Б kom.', residence: 'BM Tower', date: '6/2026', size: '38.1 m²', img: '/properties/Hona_8.png', gallery: ['/properties/Hona_8.png'], rooms: [
    { name: 'Yotoqxona', size: '20 m²' },
    { name: 'Oshxona', size: '10 m²' },
    { name: 'Sanuzel', size: '4 m²' }
  ]},
  { title: '2Д kom.', residence: 'Do‘mbirobod Residence', date: '6/2026', size: '56.7 m²', img: '/properties/Hona_9.png', gallery: ['/properties/Hona_9.png'], rooms: [
    { name: 'Yotoqxona', size: '25 m²' },
    { name: 'Oshxona', size: '15 m²' },
    { name: 'Sanuzel', size: '5 m²' }
  ]},
  { title: '2И kom.', residence: 'Charx Novza', date: '6/2026', size: '45.3 m²', img: '/properties/Hona_10.png', gallery: ['/properties/Hona_10.png'], rooms: [
    { name: 'Yotoqxona', size: '22 m²' },
    { name: 'Oshxona', size: '15 m²' },
    { name: 'Sanuzel', size: '4 m²' }
  ]}
];

// Narx hisoblovchi funksiya
function calculatePrice(floor, sizeStr) {
  const sqm = parseFloat(sizeStr);
  const rateUzs = sqmUzsRateByFloor[floor] || sqmUzsRateByFloor[16];
  const totalUzs = Math.round(rateUzs * sqm);
  return totalUzs.toLocaleString('ru-RU') + ' UZS';
}

// Shuffle (Fisher–Yates)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 1–16 qavat variantlarini yaratish
let idCounter = 1;
let propertiesData = [];

baseProperties.forEach((plan) => {
  for (let floor = 1; floor <= 16; floor++) {
    const thisId = idCounter++;
    propertiesData.push({
      id: thisId,
      title: plan.title,
      residence: plan.residence,
      date: plan.date,
      size: plan.size,
      img: plan.img,
      gallery: plan.gallery,
      rooms: plan.rooms,
      floors: `${floor}/16`,
      price: calculatePrice(floor, plan.size),
      link: `/property-detail/${thisId}`
    });
  }
});

// 🔀 Randomlashtirish
propertiesData = shuffleArray(propertiesData);

export default propertiesData;
