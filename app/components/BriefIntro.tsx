"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function BriefIntro() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

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
            className="relative w-full bg-[#0a0a0a] py-32 md:py-48 px-4 border-y border-white/5 overflow-hidden"
        >
            {/* Background Texture - Enhanced */}
            <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
                <svg width="100%" height="100%">
                    <pattern id="contour-new" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                        <path d="M0 120 C 30 0 60 0 120 120" fill="none" stroke="white" strokeWidth="0.8" />
                        <path d="M0 0 C 60 120 90 120 120 0" fill="none" stroke="white" strokeWidth="0.8" />
                        <circle cx="60" cy="60" r="2" fill="white" opacity="0.3" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#contour-new)" />
                </svg>
            </div>

            {/* Gradient Orbs */}
            <div className="absolute top-1/4 -right-32 w-96 h-96 bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />

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
                    className="mt-16 md:mt-24 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
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
            <span className="font-[family-name:var(--font-syne)] font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight text-[#e4e4e0] uppercase">
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
