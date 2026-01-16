"use client";

import { useState } from "react";
import SplashScreen from "@/app/components/SplashScreen";
import Navbar from "@/app/components/Navbar";
import GrowthStats from "@/app/components/GrowthStats";
import ServicesSection from "@/app/components/ServicesSection";
import IndustriesSection from "@/app/components/IndustriesSection";
import FoundersSection from "@/app/components/FoundersSection";
import ProcessSection from "@/app/components/ProcessSection";
import TestimonialsSection from "@/app/components/TestimonialsSection";
import ContactSection from "@/app/components/ContactSection";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "@/app/components/Footer";

import HeroZoomScroll from "@/app/components/HeroZoomScroll";
import BriefIntro from "@/app/components/BriefIntro";

import IndustriesGrid from "@/app/components/IndustriesGrid";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [showNavbar, setShowNavbar] = useState(false);
  const [pattern, setPattern] = useState<'dots' | 'grid'>('dots');

  const handleSplashFinish = () => {
    setShowSplash(false);
    // Show navbar smoothly as splash ends
    setTimeout(() => {
      setShowNavbar(true);
    }, 50);
  };

  return (
    <main className="min-h-screen bg-neutral-900 text-white font-sans selection:bg-brand-orange/30">
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen key="splash" onFinish={handleSplashFinish} />
        )}
      </AnimatePresence>

      {!showSplash && (
        <>
          {/* Navbar - appears after hero is visible */}
          <AnimatePresence>
            {showNavbar && (
              <motion.div
                initial={{ y: -150, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-[100]"
              >
                <Navbar pattern={pattern} setPattern={setPattern} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hero Section with Zoom Scroll Effect */}
          <HeroZoomScroll pattern={pattern} />

          {/* Rest of the page */}
          <BriefIntro pattern={pattern} />
          <GrowthStats />
          <ServicesSection />
          <IndustriesGrid />
          <IndustriesSection />
          <FoundersSection />
          <ProcessSection />
          <TestimonialsSection />
          <ContactSection />
          <Footer />
        </>
      )}
    </main>
  );
}
