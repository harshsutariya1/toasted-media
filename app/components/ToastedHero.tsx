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

    // Parallax helper function
    const getParallaxStyle = (depth = 20) => ({
        transform: `translate(${mousePos.x * depth}px, ${mousePos.y * depth}px)`,
        transition: 'transform 0.1s ease-out',
    });

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

                {/* Auto-Scrolling Landscape Carousel */}
                <div className="relative w-full max-w-[90rem] h-[35vh] md:h-[50vh] flex items-center mb-12 overflow-hidden mask-linear-fade">
                    {/* Gradient Masks for smooth fade edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 z-20 bg-gradient-to-r from-stone-950 to-transparent pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 z-20 bg-gradient-to-l from-stone-950 to-transparent pointer-events-none" />

                    {/* Scrolling Track */}
                    <CarouselTrack />
                </div>

                {/* Bottom Center Text */}
                <div className="relative z-20 mt-8 text-center">
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-6 relative inline-block">
                        <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-b from-white to-stone-500">
                            IGNITING YOUR DIGITAL LEGACY
                        </span>
                        {/* Glow Effect behind text */}
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-orange-500/20 blur-[60px] rounded-full z-0"></span>
                    </h1>

                    <p className="text-stone-400 text-lg md:text-xl max-w-lg mx-auto mb-8 animate-pulse">
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


const CarouselTrack = () => {
    // Landscape Images
    const images = [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600",
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600",
        "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1600",
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600"
    ];

    // Duplicate for seamless loop
    const carouselImages = [...images, ...images, ...images];

    return (
        <motion.div
            className="flex gap-4 md:gap-8 min-w-max"
            animate={{
                x: ["0%", "-33.33%"]
            }}
            transition={{
                duration: 25,
                ease: "linear",
                repeat: Infinity
            }}
        >
            {carouselImages.map((src, index) => (
                <div
                    key={index}
                    className="relative w-[300px] md:w-[500px] h-[200px] md:h-[320px] rounded-2xl overflow-hidden shrink-0 border border-white/10 shadow-2xl group"
                >
                    <Image
                        src={src}
                        alt={`Carousel ${index}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 saturate-0 group-hover:saturate-100 opacity-60 group-hover:opacity-100"
                        sizes="(max-width: 768px) 300px, 500px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                </div>
            ))}
        </motion.div>
    );
};

export default ToastedHero;
