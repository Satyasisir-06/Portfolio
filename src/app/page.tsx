'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import SkillsSection from '@/components/SkillsSection'
import EducationSection from '@/components/EducationSection'
import ServicesSection from '@/components/ServicesSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import IntroAnimation from '@/components/IntroAnimation'

export default function Home() {
  const [showContent, setShowContent] = useState(false)

  return (
    <main className="relative min-h-screen bg-dark-950">
      <IntroAnimation onComplete={() => setShowContent(true)} />

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Navigation />
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <EducationSection />
            <ServicesSection />
            <ContactSection />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
