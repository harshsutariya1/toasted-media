"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface BriefIntroProps {
    pattern?: 'dots' | 'grid' | 'lines';
}

export default function BriefIntro({ pattern = 'dots' }: BriefIntroProps) {
    const containerRef = useRef<HTMLElement>(null);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Track mouse movement for glow effect overlap
    useEffect(() => {
        const updateMouse = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setCursorPos({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                });
            }
        };

        window.addEventListener('mousemove', updateMouse);
        return () => window.removeEventListener('mousemove', updateMouse);
    }, []);

    // Create multiple text lines with different scroll-based animations
    const textLines = [
        {
            text: "Redefining",
            accent: "Limits",
            accentColor: "text-brand-yellow",
            delay: 0
        },
        {
            text: "Fighting For",
            accent: "Wins",
            accentColor: "text-brand-orange",
            delay: 0.1
        },
        {
            text: "Bringing It All In",
            accent: "All Ways",
            accentColor: "text-brand-blue",
            delay: 0.2
        },
        {
            text: "Defining A",
            accent: "Legacy",
            accentColor: "text-brand-purple",
            delay: 0.3
        },
        {
            text: "In Digital On And Off The",
            accent: "Screen",
            accentColor: "text-brand-orange",
            delay: 0.4
        }
    ];

    return (
        <section
            ref={containerRef}
            className="relative w-full bg-stone-200 py-32 md:py-48 px-4 overflow-hidden"
        >
            {/* Background Layers from HeroZoomScroll (adapted for section flow) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Pattern Layer */}
                <div
                    className="absolute inset-0 opacity-[0.4]"
                    style={{
                        backgroundImage: pattern === 'dots'
                            ? `radial-gradient(circle, #a8a29e 1.75px, transparent 1.75px)`
                            : pattern === 'lines'
                                ? `linear-gradient(to right, #a8a29e 1px, transparent 1px)`
                                : `linear-gradient(to right, #a8a29e 1px, transparent 1px), linear-gradient(to bottom, #a8a29e 1px, transparent 1px)`,
                        backgroundSize: pattern === 'lines' ? '40px 100%' : '40px 40px',
                    }}
                />

                {/* Interactive Glowing Layer */}
                <div
                    className="absolute inset-0 opacity-100 transition-opacity duration-75"
                    style={{
                        backgroundImage: pattern === 'dots'
                            ? `radial-gradient(circle, #f97316 2px, transparent 2px)`
                            : pattern === 'lines'
                                ? `linear-gradient(to right, #f97316 1px, transparent 1px)`
                                : `linear-gradient(to right, #f97316 1px, transparent 1px), linear-gradient(to bottom, #f97316 1px, transparent 1px)`,
                        backgroundSize: pattern === 'lines' ? '40px 100%' : '40px 40px',
                        maskImage: `radial-gradient(circle 350px at ${cursorPos.x}px ${cursorPos.y}px, black, transparent)`,
                        WebkitMaskImage: `radial-gradient(circle 350px at ${cursorPos.x}px ${cursorPos.y}px, black, transparent)`,
                    }}
                />

                {/* Glowing Radial Effect (to match hero vibe but light) */}
                <div className="absolute inset-0 bg-linear-to-b from-stone-200/0 via-stone-200/50 to-stone-200" />

                {/* Center Glow Area */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-brand-orange/5 rounded-full blur-[120px]" />
            </div>


            <div className="max-w-360 mx-auto relative z-10">
                {/* Section Eyebrow */}
                <motion.div
                    className="mb-12 md:mb-16 flex justify-start"
                    style={{
                        opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]),
                        x: useTransform(scrollYProgress, [0, 0.1], [50, 0])
                    }}
                >
                    <div className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-stone-100/50 backdrop-blur-md border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-orange-500/30 hover:bg-white/80">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
                        </span>
                        <span className="text-stone-500 font-mono text-xs font-bold tracking-[0.25em] uppercase group-hover:text-brand-orange transition-colors duration-300">
                            Who We Are
                        </span>
                    </div>
                </motion.div>

                {/* Animated Text Lines */}
                <div className="space-y-4 md:space-y-6">
                    {textLines.map((line, index) => (
                        <TextLine
                            key={index}
                            text={line.text}
                            accent={line.accent}
                            accentColor={line.accentColor}
                            scrollProgress={scrollYProgress}
                            index={index}
                        />
                    ))}
                </div>

                {/* Bottom Decorative Line */}
                <motion.div
                    className="mt-16 md:mt-24 h-px bg-linear-to-r from-transparent via-neutral-900/20 to-transparent"
                    style={{
                        scaleX: useTransform(scrollYProgress, [0.2, 0.6], [0, 1]),
                        opacity: useTransform(scrollYProgress, [0.2, 0.3, 0.9, 1], [0, 1, 1, 0])
                    }}
                />
            </div>

            {/* Scroll-Controlled Theme Transition Overlay */}
            {/* Creates a pixel-like wipe effect from light to dark */}
            <motion.div
                className="absolute inset-0 z-30 pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, transparent, #171717)',
                    opacity: useTransform(scrollYProgress, [0.6, 0.9], [0, 1])
                }}
            />

            {/* Pixel Columns Reveal Effect */}
            <div className="absolute bottom-0 left-0 right-0 h-48 z-40 pointer-events-none overflow-hidden">
                <motion.div
                    className="w-full h-full flex"
                    style={{
                        opacity: useTransform(scrollYProgress, [0.5, 0.7], [0, 1])
                    }}
                >
                    {/* Generate pixel columns for animated reveal */}
                    {Array.from({ length: 20 }).map((_, i) => (
                        <PixelColumn key={i} index={i} scrollProgress={scrollYProgress} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

import { MotionValue } from "framer-motion";

interface PixelColumnProps {
    index: number;
    scrollProgress: MotionValue<number>;
}

function PixelColumn({ index, scrollProgress }: PixelColumnProps) {
    const scaleY = useTransform(
        scrollProgress,
        [0.5 + (index * 0.015), 0.7 + (index * 0.015)],
        [0, 1]
    );

    return (
        <motion.div
            className="flex-1 bg-neutral-900"
            style={{
                transformOrigin: 'bottom',
                scaleY
            }}
        />
    );
}

interface TextLineProps {
    text: string;
    accent: string;
    accentColor: string;
    scrollProgress: MotionValue<number>;
    index: number;
}

function TextLine({ text, accent, accentColor, scrollProgress, index }: TextLineProps) {
    // Calculate scroll range for this line
    // Accelerate animations to ensure completion when section is fully visible
    const start = index * 0.08;
    const end = start + 0.25;

    // Horizontal position (right to left)
    const x = useTransform(scrollProgress, [start, end], [200, 0]);

    // Opacity
    const opacity = useTransform(scrollProgress, [start, start + 0.1, end + 0.3, end + 0.4], [0, 1, 1, 0]);

    // Slight rotation for dynamic feel
    const rotate = useTransform(scrollProgress, [start, end], [2, 0]);

    return (
        <motion.div
            className="flex flex-wrap items-center gap-3 md:gap-6"
            style={{ x, opacity, rotate }}
        >
            <span className="font-(family-name:--font-syne) font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight text-neutral-800 uppercase">
                {text}
            </span>
            <span className={`font-(family-name:--font-dm-serif) italic text-4xl md:text-6xl lg:text-7xl tracking-wide lowercase ${accentColor} relative`}>
                {accent}
                {/* Underline decoration */}
                <motion.span
                    className={`absolute -bottom-2 left-0 h-0.5 ${accentColor.replace('text-', 'bg-')}`}
                    style={{
                        width: useTransform(scrollProgress, [start + 0.1, start + 0.2], ["0%", "100%"])
                    }}
                />
            </span>
        </motion.div>
    );
}
