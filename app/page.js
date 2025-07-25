import Hero from "@/components/leadingpage/Hero"
import NewsSection from "@/components/leadingpage/NewsSection"
import TurarJoyMajmuasi from "@/components/leadingpage/TurarJoyMajmuasi"
import WhyChooseUs from "@/components/leadingpage/WhyChooseUs"
import MapSection from "@/components/leadingpage/MapSection"
import HeroBuilding from "@/components/leadingpage/HeroBuilding"
import ContactForm from "@/components/leadingpage/ContactForm"



export default function HomePage() {
  return (
    <main>
      <Hero />
      <MapSection/>
      <HeroBuilding/>
      <NewsSection/>
      <TurarJoyMajmuasi/>
      <WhyChooseUs/>
      <ContactForm/>
    </main>
  )
}
