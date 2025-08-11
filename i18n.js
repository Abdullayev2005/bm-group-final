"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    uz: {
      translation: {
        nav_about: "Biz haqimizda",
        nav_properties: "Ko‘chmas mulk",
        nav_news: "Yangiliklar",
        nav_residences: "Turar joy majmuasi",
        nav_calculator: "Kalkulyator",
        hero_title: "Yangi uyingizga bir qadam yaqin",
        hero_sub: "BM Group’dan ishonchli va qulay uy-joy loyihalari",
      },
    },
    ru: {
      translation: {
        nav_about: "О нас",
        nav_properties: "Недвижимость",
        nav_news: "Новости",
        nav_residences: "Жилой комплекс",
        nav_calculator: "Калькулятор",
        hero_title: "На шаг ближе к новому дому",
        hero_sub: "Надежные и удобные жилые проекты от BM Group",
      },
    },
  },
  lng: "uz", // default til
  fallbackLng: "uz",
  interpolation: { escapeValue: false },
});

export default i18n;
