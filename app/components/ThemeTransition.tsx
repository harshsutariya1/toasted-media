"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { useRef, ReactNode, useState } from "react";

interface ThemeTransitionProps {
    lightSection: ReactNode;
    darkSection: ReactNode;
    /** Optional custom height for the transition scroll area. Default: "250vh" */
    height?: string;
    /** Whether to show a separating border line during transition */
    showLine?: boolean;
}

/**
 * ThemeTransition (Wave Scroll Controlled)
 * A premium, liquid wave transition where the dark section fills up like a fluid.
 * The wave movement is controlled by scroll, with parallax layers for depth.
 */
export default function ThemeTransition({
    lightSection,
    darkSection,
    height = "300vh",
}: ThemeTransitionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Smooth out the scroll progress slightly so the wave feels "heavy" (liquid-like)
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Main vertical movement (0% to -100% moves the dark section UP)
    // We start with the dark section shifted down by 100% of the viewport
    const y = useTransform(smoothProgress, [0, 1], ["100%", "0%"]);

    // Parallax layers for the wave effect
    // Layer 1 (Back/Slowest) - Orange/Brand
    const yLayer1 = useTransform(smoothProgress, [0, 1], ["90%", "0%"]);
    // Layer 2 (Middle) - Purple/Brand
    const yLayer2 = useTransform(smoothProgress, [0, 1], ["95%", "0%"]);

    return (
        <div ref={containerRef} className="relative w-full" style={{ height }}>
            <div className="sticky top-0 h-screen w-full overflow-hidden block">

                {/* LIGHT SECTION (Bottom Layer - Background) */}
                <div className="absolute inset-0 z-0 h-full w-full bg-white">
                    {lightSection}
                </div>

                {/* WAVE CONTAINER */}
                <div className="absolute inset-0 z-10 h-full w-full pointer-events-none">

                    {/* Parallax Wave 1 (Back - Orange) */}
                    <motion.div
                        className="absolute inset-x-0 bottom-0 h-[120%] w-full"
                        style={{ y: yLayer1 }}
                    >
                        {/* Wave SVG */}
                        <div className="relative w-full h-32 -mt-16 scale-y-[-1] opacity-40">
                            <svg className="w-full h-full fill-brand-orange" viewBox="0 0 1440 320" preserveAspectRatio="none">
                                <path d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                            </svg>
                        </div>
                    </motion.div>

                    {/* Parallax Wave 2 (Middle - Purple) */}
                    <motion.div
                        className="absolute inset-x-0 bottom-0 h-[115%] w-full"
                        style={{ y: yLayer2 }}
                    >
                        {/* Wave SVG */}
                        <div className="relative w-full h-32 -mt-16 scale-y-[-1] opacity-30">
                            <svg className="w-full h-full fill-brand-purple" viewBox="0 0 1440 320" preserveAspectRatio="none">
                                <path d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,106.7C672,117,768,171,864,197.3C960,224,1056,224,1152,197.3C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                            </svg>
                        </div>
                    </motion.div>

                    {/* MAIN WAVE (Foreground - Dark Background) */}
                    <motion.div
                        className="absolute inset-x-0 bottom-0 h-full w-full flex flex-col justify-end pointer-events-auto"
                        style={{ y }}
                    >
                        {/* The Curve/Wave SVG */}
                        <div className="relative w-full h-24 md:h-32 -mb-1 scale-y-[-1] z-20 pointer-events-none select-none">
                            <svg className="w-full h-full fill-[#0a0a0a]" viewBox="0 0 1440 320" preserveAspectRatio="none">
                                {/* Organic wave path */}
                                <path fillOpacity="1" d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,224C840,245,960,267,1080,261.3C1200,256,1320,224,1380,208L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                            </svg>
                        </div>

                        {/* Solid Dark Content Area */}
                        <div className="relative w-full h-full bg-[#0a0a0a]">
                            {darkSection}
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}

/**
 * SimpleClipTransition (Previous Default)
 * Kept for reference or fallback.
 */
export function SimpleClipTransition({
    lightSection,
    darkSection,
    height = "250vh",
}: ThemeTransitionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const clipProgress = useTransform(scrollYProgress, [0, 1], [100, 0]);
    const clipPath = useTransform(clipProgress, (val) => `inset(${val}% 0 0 0)`);

    return (
        <div ref={containerRef} className="relative w-full" style={{ height }}>
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <div className="absolute inset-0 z-0 bg-white">
                    {lightSection}
                </div>
                <motion.div
                    className="absolute inset-0 z-10 overflow-hidden bg-[#0a0a0a]"
                    style={{ clipPath }}
                >
                    {darkSection}
                </motion.div>
            </div>
        </div>
    );
}
