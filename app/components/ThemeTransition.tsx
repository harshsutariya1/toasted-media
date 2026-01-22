"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ThemeTransitionProps {
    children: ReactNode;
    lightSection: ReactNode;
    darkSection: ReactNode;
}

/**
 * ThemeTransition Component
 * Creates a smooth scroll-controlled pixel wipe transition from light to dark theme.
 * The dark section progressively reveals from left to right as the user scrolls.
 */
export default function ThemeTransition({ lightSection, darkSection }: ThemeTransitionProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Transform scroll progress to clip path percentage
    // The dark section reveals from left to right as user scrolls
    const clipProgress = useTransform(scrollYProgress, [0.3, 0.7], [0, 100]);

    return (
        <div ref={containerRef} className="relative">
            {/* Light Section (Background) */}
            <div className="relative z-10">
                {lightSection}
            </div>

            {/* Transition Zone - Dark section with animated clip-path */}
            <motion.div
                className="relative z-20"
                style={{
                    clipPath: useTransform(clipProgress, (v) => `inset(0 ${100 - v}% 0 0)`)
                }}
            >
                {darkSection}
            </motion.div>
        </div>
    );
}

/**
 * PixelWipeTransition Component
 * Alternative: Creates a columnuar pixel-by-pixel reveal animation
 */
export function PixelWipeTransition({ lightSection, darkSection }: Omit<ThemeTransitionProps, 'children'>) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    // Progress from 0 to 1 based on scroll
    const revealProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);

    return (
        <div ref={containerRef} className="relative">
            {/* Light Section - Always visible underneath */}
            <div className="relative">
                {lightSection}
            </div>

            {/* Dark Section Overlay - Revealed with pixel columns */}
            <motion.div
                className="absolute inset-0 z-20 overflow-hidden pointer-events-none"
                style={{
                    // Using clip-path polygon for progressive reveal from bottom
                    clipPath: useTransform(
                        revealProgress,
                        (p) => `polygon(0 ${100 - p}%, 100% ${100 - p}%, 100% 100%, 0 100%)`
                    )
                }}
            >
                <div className="pointer-events-auto">
                    {darkSection}
                </div>
            </motion.div>
        </div>
    );
}

/**
 * SmoothThemeMerge Component
 * Creates a seamless gradient-based transition between sections
 */
export function SmoothThemeMerge({ lightSection, darkSection }: Omit<ThemeTransitionProps, 'children'>) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Opacity transitions
    const lightOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);
    const darkOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

    return (
        <div ref={containerRef} className="relative min-h-[200vh]">
            {/* Gradient Overlay for smooth blend */}
            <div className="sticky top-0 h-screen overflow-hidden">
                {/* Light Section */}
                <motion.div
                    className="absolute inset-0"
                    style={{ opacity: lightOpacity }}
                >
                    {lightSection}
                </motion.div>

                {/* Dark Section */}
                <motion.div
                    className="absolute inset-0"
                    style={{ opacity: darkOpacity }}
                >
                    {darkSection}
                </motion.div>
            </div>
        </div>
    );
}
