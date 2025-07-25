import AboutAchievements from '@/components/about/AboutAchievements'
import AboutCertificate from '@/components/about/AboutCertificate'
import AboutHero from '@/components/about/AboutHero'
import AboutInfoSection from '@/components/about/AboutInfoSection'
import React from 'react'


export default function AboutUs() {
  return (
    <section id="about">
        <AboutHero/>
        <AboutAchievements/>
        <AboutInfoSection/>
        <AboutCertificate/>
    </section>
  )
}
