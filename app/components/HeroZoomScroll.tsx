"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import ToastedHero from "./ToastedHero";

export default function HeroZoomScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    // Track scroll progress within this component container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Track mouse movement for glow effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setCursorPos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Optimize animations for performance:
    // 1. Shorter scroll interpolation ranges for snappier effect
    // 2. Hardware accelerated properties (transform, opacity)

    // Scale down to 0.4 as requested (significantly smaller)
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.4]);

    // Keep opacity at 1, but maybe dim slightly if needed.
    const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 1]);

    // Add slight rotation for 3D feel
    const rotateX = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

    // Move up slightly to make room for text at bottom
    const y = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

    // Increase border radius significantly as it shrinks
    const borderRadius = useTransform(scrollYProgress, [0, 0.3], [0, 48]);

    // Background Color Transition: Dark (#0a0a0a) -> Semi-Light Stone (#e7e5e4)
    // This matches a warm "toasted" semi-light theme
    const backgroundColor = useTransform(
        scrollYProgress,
        [0.1, 0.5],
        ["#0a0a0a", "#e7e5e4"]
    );

    // Text Animations - fade in and slide up
    const textOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
    const textScale = useTransform(scrollYProgress, [0.4, 0.6], [0.8, 1]);
    const textY = useTransform(scrollYProgress, [0.4, 0.6], [100, 0]);

    // Shadow intensity increases as it "lifts" off screen
    const boxShadow = useTransform(
        scrollYProgress,
        [0, 0.5],
        ["0px 0px 0px rgba(0,0,0,0)", "0px 40px 100px rgba(0,0,0,0.5)"]
    );

    return (
        <div ref={containerRef} className="relative h-[250vh]">
            <motion.div
                style={{ backgroundColor }}
                className="sticky top-0 h-screen w-full overflow-hidden perspective-1000 flex flex-col items-center justify-center bg-stone-200"
            >

                {/* Foreground Layer: ToastedHero Zooming Out */}
                <motion.div
                    style={{
                        scale,
                        rotateX,
                        y,
                        borderRadius,
                        boxShadow,
                        transformPerspective: 1000
                    }}
                    className="relative w-full h-full z-20 origin-center overflow-hidden will-change-[transform,border-radius,background-color,box-shadow]"
                >
                    {/* Container for the Hero Component */}
                    <div className="w-full h-full bg-stone-950">
                        <ToastedHero />
                    </div>

                    {/* Premium Glass/Border Overlay */}
                    <div className="absolute inset-0 pointer-events-none border-[1px] border-white/20 rounded-[inherit] mix-blend-overlay" />

                    {/* Subtle reflection shine */}
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-t-[inherit]" />
                </motion.div>

                {/* Text Layer: "WE TOAST IT" - Positioned at bottom center */}
                <motion.div
                    style={{
                        opacity: textOpacity,
                        scale: textScale,
                        y: textY
                    }}
                    className="absolute bottom-[10%] left-0 right-0 z-10 flex flex-col items-center justify-center pointer-events-none text-center px-4"
                >
                    <h1 className="text-6xl md:text-9xl font-black leading-none tracking-tighter select-none drop-shadow-2xl">
                        <span className="bg-gradient-to-r from-[var(--color-brand-orange)] via-[var(--color-brand-purple)] to-[var(--color-brand-blue)] bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                            WE TOAST IT
                        </span>
                    </h1>
                    <p className="mt-4 text-sm md:text-base text-stone-500 font-bold tracking-[0.4em] uppercase">
                        Digital Perfection
                    </p>
                </motion.div>

                {/* Standardized Squared Texture Background (Light Theme Adapted) */}
                <motion.div
                    style={{ opacity: textOpacity }}
                    className="absolute inset-0 z-0 pointer-events-none"
                >
                    {/* Faint Grid */}
                    <div
                        className="absolute inset-0 opacity-[0.4]"
                        style={{
                            backgroundImage: `
                                linear-gradient(to right, #a8a29e 1px, transparent 1px),
                                linear-gradient(to bottom, #a8a29e 1px, transparent 1px)
                            `,
                            backgroundSize: '40px 40px',
                        }}
                    />

                    {/* Interactive Glowing Grid (Orange Brand Color) */}
                    <div
                        className="absolute inset-0 opacity-100 transition-opacity duration-75"
                        style={{
                            backgroundImage: `
                                linear-gradient(to right, #f97316 1px, transparent 1px),
                                linear-gradient(to bottom, #f97316 1px, transparent 1px)
                            `,
                            backgroundSize: '40px 40px',
                            maskImage: `radial-gradient(circle 350px at ${cursorPos.x}px ${cursorPos.y}px, black, transparent)`,
                            WebkitMaskImage: `radial-gradient(circle 350px at ${cursorPos.x}px ${cursorPos.y}px, black, transparent)`,
                        }}
                    />

                    {/* Glowing Radial Effect (to match hero vibe but light) */}
                    <div className="absolute inset-0 bg-gradient-to-b from-stone-200/0 via-stone-200/50 to-stone-200" />

                    {/* Center Glow Area */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-brand-orange/5 rounded-full blur-[120px]" />
                </motion.div>

            </motion.div>
        </div>
    );
}
