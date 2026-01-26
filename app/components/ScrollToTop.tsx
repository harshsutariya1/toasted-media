"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const { scrollYProgress } = useScroll();

    // Smooth out the scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Check scroll position to toggle visibility
    useEffect(() => {
        const toggleVisibility = () => {
            // Show after scrolling down 300px
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ duration: 0.3 }}
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                    className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-100 group outline-none"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {/* Container with relative positioning and fixed size */}
                    <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14">

                        {/* Glow Effect (Behind) */}
                        <div className="absolute inset-0 rounded-full bg-brand-orange/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 will-change-transform" />

                        {/* Glass Background */}
                        <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-md rounded-full shadow-lg border border-white/10 overflow-hidden" />

                        {/* Progress Circle SVG */}
                        <svg className="absolute inset-0 w-full h-full -rotate-90 p-0.5" viewBox="0 0 100 100">
                            {/* Track */}
                            <circle
                                cx="50"
                                cy="50"
                                r="44"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="6"
                                className="text-white/10"
                            />
                            {/* Scroll Indicator */}
                            <motion.circle
                                cx="50"
                                cy="50"
                                r="44"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="6"
                                strokeLinecap="round"
                                className="text-brand-orange drop-shadow-[0_0_4px_rgba(247,143,45,0.6)]"
                                style={{ pathLength: smoothProgress }}
                            />
                        </svg>

                        {/* Arrow Icon */}
                        <div className="relative z-10 text-white flex items-center justify-center">
                            <ArrowUp className="w-5 h-5 md:w-6 md:h-6 text-white/90 group-hover:text-white group-hover:-translate-y-1 transition-transform duration-300 ease-out" />
                        </div>
                    </div>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
