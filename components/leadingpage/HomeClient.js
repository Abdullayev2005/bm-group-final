// components/leadingpage/HomeClient.jsx
'use client';

import dynamic from "next/dynamic";

import Hero from "@/components/leadingpage/Hero";
import NewsSection from "@/components/leadingpage/NewsSection";
import TurarJoyMajmuasi from "@/components/leadingpage/TurarJoyMajmuasi";
import WhyChooseUs from "@/components/leadingpage/WhyChooseUs";
import ContactForm from "@/components/leadingpage/ContactForm";

// Hydration muammosi berayotganlarini faqat clientda render qilamiz:
const MapSection = dynamic(() => import("@/components/leadingpage/MapSection"), { ssr: false });
const HeroBuilding = dynamic(() => import("@/components/leadingpage/HeroBuilding"), { ssr: false });

export default function HomeClient() {
  return (
    <main>
      <Hero />
      <MapSection />
      <HeroBuilding />
      <NewsSection />
      <TurarJoyMajmuasi />
      <WhyChooseUs />
      <ContactForm />
    </main>
  );
}
