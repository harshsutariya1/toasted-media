"use client";

import { useState } from "react";
import SplashScreen from "@/app/components/SplashScreen";
import Navbar from "@/app/components/Navbar";
import GrowthStats from "@/app/components/GrowthStats";
import ServicesSection from "@/app/components/ServicesSection";

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
  const [pattern, setPattern] = useState<'dots' | 'grid' | 'lines'>('grid');
  const [carouselLayout, setCarouselLayout] = useState<'cinematic' | 'classic' | 'columns' | 'seamless'>('cinematic');

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

      {/* Navbar - Always rendered for SEO, animates in */}
      <motion.div
        initial={{ y: -150, opacity: 0 }}
        animate={{
          y: showNavbar ? 0 : -150,
          opacity: showNavbar ? 1 : 0
        }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-100"
      >
        <Navbar
          pattern={pattern}
          setPattern={setPattern}
          carouselLayout={carouselLayout}
          setCarouselLayout={setCarouselLayout}
        />
      </motion.div>

      {/* Hero Section with Zoom Scroll Effect */}
      <HeroZoomScroll pattern={pattern} layout={carouselLayout} />

      {/* Rest of the page */}
      <BriefIntro pattern={pattern} />
      <GrowthStats />
      <ServicesSection />
      <IndustriesGrid />

      <FoundersSection />
      <ProcessSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
