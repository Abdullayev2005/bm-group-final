// app/data/newsData.js

// Tilga bog'liq matnlar — SSR uchun hech qanday window/localStorage ishlatilmaydi
export const newsTexts = {
  uz: [
    {
      id: 1,
      title: "99 mln so‘m bosh to‘lov, keyin oyiga 4.9 mln so‘mdan",
      img: "/news_image/birinchi.png",
      desc: `Ideal xonadoningizni tanlang! Siz farovon hayot uchun qulay va keng uy qidiryapsizmi? 
Biz har qanday oilaning ehtiyojlarini inobatga olgan holda xonadon variantlarini yaratdik. 
Bizning majmuamizda yosh oilalardan to katta va do‘stona oilalargacha — barcha orzudagi uyni topishi mumkin. 
Har bir xonadon — farovon hayotingiz uchun puxta o‘ylangan makondir! 

☎️ +998 78 555 00 77
📍 Ofis manzili: Toshkent shahri, Qurilish, 9`
    }
  ],
  ru: [
    {
      id: 1,
      title: "Первоначальный взнос 99 млн сум, далее от 4,9 млн сум в месяц",
      img: "/news_image/birinchi.png",
      desc: `Выберите свою идеальную квартиру! 
Ищете уютное и просторное жильё для комфортной жизни? 
Мы создали варианты планировок, которые учитывают потребности любой семьи — от молодожён до больших и дружных семей. 
Каждая квартира — это продуманное пространство для вашей жизни! 

☎️ +998 78 555 00 77
📍 Адрес офиса: г. Ташкент, ул. Курилиш, 9`
    }
  ]
};

// Brauzerdan tilni olish — serverda har doim 'uz' qaytaradi
export function getLang() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("lang") || "uz";
  }
  return "uz";
}

// Tanlangan til bo‘yicha yangiliklar ro‘yxati
export function getNewsData(lang = "uz") {
  const key = lang === "ru" ? "ru" : "uz";
  return Array.isArray(newsTexts[key]) ? newsTexts[key] : [];
}

// Id bo‘yicha bitta yangilikni olish (ixtiyoriy)
export function getNewsById(id, lang = "uz") {
  const list = getNewsData(lang);
  return list.find(item => String(item.id) === String(id));
}
