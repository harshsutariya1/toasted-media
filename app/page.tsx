"use client";

import { useState, useEffect } from "react";
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

import ToastedHero from "@/app/components/ToastedHero";
import BriefIntro from "@/app/components/BriefIntro";

import IndustriesGrid from "@/app/components/IndustriesGrid";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [showNavbar, setShowNavbar] = useState(false);

  const handleSplashFinish = () => {
    setShowSplash(false);
    // Show navbar smoothly as splash ends (short delay for fade to start)
    setTimeout(() => {
      setShowNavbar(true);
    }, 200);
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
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Navbar />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hero Section - scroll reveal from bottom */}
          <motion.div
            initial={{ y: "100vh" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          >
            <ToastedHero />
          </motion.div>

          {/* Rest of the page */}
          <BriefIntro />
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
