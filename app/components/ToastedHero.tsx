"use client";

import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ToastedHeroProps {
    pattern?: 'dots' | 'grid';
}

const ToastedHero = ({ pattern = 'dots' }: ToastedHeroProps) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef(null);

    // Track mouse movement for parallax effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Calculate normalized mouse position (-1 to 1)
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            setMousePos({ x, y });

            // Calculate local cursor position for glow effect
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setCursorPos({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                });
            }
        };

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);



    return (
        <div ref={containerRef} className="relative min-h-screen bg-stone-950 text-white font-sans overflow-hidden selection:bg-orange-500 selection:text-white">

            {/* Static Squared Texture Background with Cursor Glow */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Base Grid */}
                <div
                    className="absolute inset-0 z-0 opacity-[0.3]"
                    style={{
                        backgroundImage: pattern === 'dots'
                            ? `radial-gradient(circle, #ffffff 1.75px, transparent 1.75px)`
                            : `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                        backgroundSize: pattern === 'dots' ? '30px 30px' : '40px 40px',
                    }}
                />

                {/* Glowing Grid - Masked */}
                <div
                    className="absolute inset-0 z-10 opacity-40 transition-opacity duration-75"
                    style={{
                        backgroundImage: pattern === 'dots'
                            ? `radial-gradient(circle, #ea580c 2px, transparent 2px)`
                            : `linear-gradient(to right, #ea580c 1px, transparent 1px), linear-gradient(to bottom, #ea580c 1px, transparent 1px)`,
                        backgroundSize: pattern === 'dots' ? '30px 30px' : '40px 40px',
                        maskImage: `radial-gradient(circle 300px at ${cursorPos.x}px ${cursorPos.y}px, black, transparent)`,
                        WebkitMaskImage: `radial-gradient(circle 300px at ${cursorPos.x}px ${cursorPos.y}px, black, transparent)`,
                    }}
                />

                {/* Radial Vignette */}
                <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-transparent to-stone-950 pointer-events-none z-20" />
            </div>


            {/* Hero Content */}
            <main ref={heroRef} className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-20 pb-12 px-4">

                {/* High-Performance 80-10-10 Carousel */}
                <div className="relative w-full max-w-[95rem] mx-auto mb-12 h-[50vh] md:h-[60vh]">
                    <HeroCarousel />
                </div>

                {/* Bottom Center Text */}
                <div className="relative z-20 mt-8 text-center pointer-events-none">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6 relative inline-block">
                        <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-b from-white to-stone-500 font-[family-name:var(--font-faculty)]">
                            IGNITING YOUR DIGITAL LEGACY
                        </span>
                        {/* Glow Effect behind text */}
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-orange-500/20 blur-[60px] rounded-full z-0"></span>
                    </h1>

                    <p className="text-stone-400 text-lg md:text-xl max-w-lg mx-auto mb-8 animate-pulse font-mono uppercase tracking-widest">
                        Scroll to burn the ordinary.
                    </p>

                </div>

            </main>

            {/* Decorative Grid Overlay for texture details */}
            <div className="fixed bottom-10 left-10 hidden md:block z-0 opacity-30 font-mono text-xs">
                <div>COORDS: {Math.round(mousePos.x * 100)} / {Math.round(mousePos.y * 100)}</div>
                <div>SCROLL: {Math.round(scrollY)}</div>
            </div>

        </div>
    );
};

const HeroCarousel = () => {
    const slides = [
        {
            src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1600",
            title: "Strategic Vision",
            category: "Consulting"
        },
        {
            src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1600",
            title: "Creative Hub",
            category: "Workspace"
        },
        {
            src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600",
            title: "Data Driven",
            category: "Analytics"
        },
        {
            src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1600",
            title: "Client Focus",
            category: "Partnership"
        },
        {
            src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600",
            title: "Team Synergy",
            category: "Culture"
        },
    ];

    const [index, setIndex] = useState(0);

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 5000);
        return () => clearInterval(timer);
    }, [index]);

    const handleNext = () => {
        setIndex((prev) => (prev + 1) % slides.length);
    };

    const handlePrev = () => {
        setIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const getPosition = (i: number) => {
        const diff = (i - index + slides.length) % slides.length;
        if (diff === 0) return "center";
        if (diff === 1 || diff === -(slides.length - 1)) return "right";
        if (diff === slides.length - 1 || diff === -1) return "left";
        return diff < slides.length / 2 ? "hiddenRight" : "hiddenLeft";
    };

    // Refined Motion Variants
    const variants = {
        center: {
            left: "12%",
            width: "76%",
            zIndex: 30,
            opacity: 1,
            scale: 1,
            x: 0,
            filter: "brightness(1) saturate(1) blur(0px)"
        },
        left: {
            left: "0%",
            width: "10%",
            zIndex: 20,
            opacity: 0.5,
            scale: 0.9,
            x: "-2%", // Slight pull-away
            filter: "brightness(0.4) saturate(0) blur(2px)"
        },
        right: {
            left: "90%",
            width: "10%",
            zIndex: 20,
            opacity: 0.5,
            scale: 0.9,
            x: "2%", // Slight pull-away
            filter: "brightness(0.4) saturate(0) blur(2px)"
        },
        hiddenLeft: {
            left: "-20%",
            width: "10%",
            zIndex: 10,
            opacity: 0,
            scale: 0.8,
            x: 0,
            filter: "brightness(0) blur(10px)"
        },
        hiddenRight: {
            left: "120%",
            width: "10%",
            zIndex: 10,
            opacity: 0,
            scale: 0.8,
            x: 0,
            filter: "brightness(0) blur(10px)"
        }
    };

    return (
        <div className="relative w-full h-full overflow-hidden flex items-center">

            {slides.map((slide, i) => {
                const position = getPosition(i);
                const isLeft = position === "left";
                const isRight = position === "right";
                const isCenter = position === "center";

                return (
                    <motion.div
                        key={i}
                        animate={position}
                        variants={variants}
                        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                        className="absolute top-0 bottom-0 overflow-hidden rounded-xl border border-white/10 bg-stone-950"
                        style={{ transformOrigin: "center" }}
                        onClick={() => {
                            if (isLeft) handlePrev();
                            if (isRight) handleNext();
                        }}
                    >
                        {/* Parallax Image Effect container */}
                        <motion.div
                            className="relative w-full h-full"
                        >
                            <Image
                                src={slide.src}
                                alt={slide.title}
                                fill
                                priority={isCenter}
                                className="object-cover"
                                sizes={isCenter ? '80vw' : '10vw'}
                            />
                        </motion.div>

                        {/* Active Slide Glass Overlay */}
                        {isCenter && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-40 hidden md:block"
                            >
                                <div className="flex flex-col items-start gap-2">
                                    <div className="px-3 py-1 bg-orange-500/90 backdrop-blur-md rounded-full border border-orange-400/20 shadow-lg shadow-orange-900/20">
                                        <span className="text-white text-[10px] font-bold uppercase tracking-widest leading-none">
                                            {slide.category}
                                        </span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-white drop-shadow-lg tracking-tight font-[family-name:var(--font-faculty)]">
                                        {slide.title}
                                    </h2>
                                </div>
                            </motion.div>
                        )}

                        {/* Inactive Overlay - Darkens non-active slides */}
                        <div className={`absolute inset-0 bg-stone-950/20 transition-opacity duration-500 ${isCenter ? 'opacity-0' : 'opacity-100'}`} />
                    </motion.div>
                );
            })}

            {/* Custom Progress Bar */}
            <div className="absolute bottom-6 right-6 md:right-10 z-50 flex items-center gap-4">
                {/* Arrow Controls */}
                <div className="flex gap-2">
                    <button
                        onClick={handlePrev}
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-all"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                    </button>
                    <button
                        onClick={handleNext}
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-all"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ToastedHero;


