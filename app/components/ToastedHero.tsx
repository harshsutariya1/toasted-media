"use client";

import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';

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
                    className="absolute inset-0 z-0 opacity-[0.2]"
                    style={{
                        backgroundImage: pattern === 'dots'
                            ? `radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)`
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

                {/* Three Creatives Container */}
                <div className="relative w-full max-w-6xl h-[40vh] md:h-[50vh] flex items-center justify-center mb-12 perspective-1000">

                    {/* Creative 1 (Left) */}
                    <div
                        className="absolute left-4 md:left-20 top-0 md:top-10 w-48 h-64 md:w-64 md:h-80 bg-stone-800 rounded-lg shadow-2xl border border-white/10 overflow-hidden transform hover:scale-105 transition-all duration-500 hover:z-20 hover:shadow-orange-500/20"
                        style={{
                            ...getParallaxStyle(-30),
                            rotate: '-6deg',
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-orange-600 to-purple-600 opacity-80 mix-blend-overlay"></div>
                        <Image src="https://blobcdn.same.energy/a/bb/6b/bb6b239b93c7208b8c83c34a03acb60da5f73893" alt="Creative work 1" fill className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-500" sizes="(max-width: 768px) 192px, 256px" />
                        <div className="absolute bottom-4 left-4 font-bold text-sm tracking-widest uppercase">Strategy</div>
                    </div>

                    {/* Creative 2 (Center - Main) */}
                    <div
                        className="relative z-10 w-56 h-72 md:w-80 md:h-96 bg-stone-800 rounded-lg shadow-2xl border border-white/20 overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-orange-500/30"
                        style={getParallaxStyle(10)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
                        <Image src="https://blobcdn.same.energy/a/64/54/6454e1538fc392c0ea9fb164a0232b046c028b91" alt="Creative work 2" fill className="object-cover" sizes="(max-width: 768px) 224px, 320px" />
                        <div className="absolute bottom-6 left-6 z-20">
                            <div className="text-orange-500 text-xs font-bold tracking-widest mb-1">FEATURED</div>
                            <div className="text-2xl font-black italic">Creative</div>
                        </div>
                    </div>

                    {/* Creative 3 (Right) */}
                    <div
                        className="absolute right-4 md:right-20 bottom-0 md:bottom-10 w-48 h-64 md:w-64 md:h-80 bg-stone-800 rounded-lg shadow-2xl border border-white/10 overflow-hidden transform hover:scale-105 transition-all duration-500 hover:z-20 hover:shadow-orange-500/20"
                        style={{
                            ...getParallaxStyle(-20),
                            rotate: '6deg',
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-bl from-blue-600 to-emerald-600 opacity-80 mix-blend-overlay"></div>
                        <Image src="https://blobcdn.same.energy/a/fb/72/fb7257532ab1f1b79af35419571b4418338b79da" alt="Creative work 3" fill className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-500" sizes="(max-width: 768px) 192px, 256px" />
                        <div className="absolute top-4 right-4 font-bold text-sm tracking-widest uppercase text-right">Data<br />Driven</div>
                    </div>

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

export default ToastedHero;
