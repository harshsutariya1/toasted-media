"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function BriefIntro() {
    const containerRef = useRef<HTMLElement>(null);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Track mouse movement for glow effect overlap
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setCursorPos({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                });
            }
        };
        // Add listener to window so we can track even if slightly outside, 
        // but calculating relative to the section is good for the mask. 
        // Actually, for fixed global feels, we usually use window coords.
        // Let's stick to consistent window coords like HeroZoomScroll if we want identical feel,
        // BUT HeroZoomScroll used window coords directly for the mask. 
        // Let's use relative coords for this section since it's in the flow.

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
            className="relative w-full bg-stone-200 py-32 md:py-48 px-4 border-y border-white/5 overflow-hidden"
        >
            {/* Background Layers from HeroZoomScroll (adapted for section flow) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
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
            </div>


            <div className="max-w-[90rem] mx-auto relative z-10">
                {/* Section Eyebrow */}
                <motion.div
                    className="mb-12 md:mb-16 flex items-center gap-4"
                    style={{
                        opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]),
                        x: useTransform(scrollYProgress, [0, 0.1], [100, 0])
                    }}
                >
                    <div className="h-[1px] w-12 bg-brand-orange" />
                    <span className="text-brand-orange font-mono text-xs md:text-sm tracking-[0.3em] uppercase">
                        Who We Are
                    </span>
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
                            totalLines={textLines.length}
                        />
                    ))}
                </div>

                {/* Bottom Decorative Line */}
                <motion.div
                    className="mt-16 md:mt-24 h-[1px] bg-gradient-to-r from-transparent via-neutral-900/20 to-transparent"
                    style={{
                        scaleX: useTransform(scrollYProgress, [0.2, 0.6], [0, 1]),
                        opacity: useTransform(scrollYProgress, [0.2, 0.3, 0.9, 1], [0, 1, 1, 0])
                    }}
                />
            </div>
        </section>
    );
}

interface TextLineProps {
    text: string;
    accent: string;
    accentColor: string;
    scrollProgress: any;
    index: number;
    totalLines: number;
}

function TextLine({ text, accent, accentColor, scrollProgress, index, totalLines }: TextLineProps) {
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
            <span className="font-[family-name:var(--font-syne)] font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight text-neutral-800 uppercase">
                {text}
            </span>
            <span className={`font-[family-name:var(--font-dm-serif)] italic text-4xl md:text-6xl lg:text-7xl tracking-wide lowercase ${accentColor} relative`}>
                {accent}
                {/* Underline decoration */}
                <motion.span
                    className={`absolute -bottom-2 left-0 h-[2px] ${accentColor.replace('text-', 'bg-')}`}
                    style={{
                        width: useTransform(scrollProgress, [start + 0.1, start + 0.2], ["0%", "100%"])
                    }}
                />
            </span>
        </motion.div>
    );
}
