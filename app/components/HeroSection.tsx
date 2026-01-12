"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

// Particle Component
const Particle = ({ mouseX, mouseY }: { mouseX: any; mouseY: any }) => {
    // Random initial configuration
    const [config] = useState(() => ({
        x: Math.random() * 100, // %
        y: Math.random() * 100, // %
        // Varying sizes
        scale: Math.random() * 1 + 0.5,
        // Varying speeds/depths
        depth: Math.random(),
        // Random colors: Orange, Yellow, or White (hotter parts)
        color: Math.random() > 0.8 ? "bg-white" : Math.random() > 0.5 ? "bg-brand-yellow" : "bg-brand-orange"
    }));

    // Interactivity: Stronger parallax for closer particles
    // Range: 50px to 150px movement - Only moves based on mouse
    const moveRange = 50 + (config.depth * 100);

    // Reverse movement for parallax (mouse moves right, particles move left)
    const x = useTransform(mouseX, [-1, 1], [moveRange, -moveRange]);
    const y = useTransform(mouseY, [-1, 1], [moveRange, -moveRange]);

    // Shrinking Effect Calculation
    const scale = useTransform([mouseX, mouseY], ([currentX, currentY]: any) => {
        // Normalize particle position to -1 to 1 range approx (assuming center screen is 50%, 50%)
        // This is an approximation since particles are % of container, but sufficient for effect
        const particleX = (config.x / 50) - 1;
        const particleY = (config.y / 50) - 1;

        // Calculate distance
        const dist = Math.sqrt(Math.pow(currentX - particleX, 2) + Math.pow(currentY - particleY, 2));

        // Interaction Radius: 0.25 (roughly 1/8th of screen width)
        // If within radius, shrink smoothly
        const radius = 0.25;
        if (dist < radius) {
            const shrinkFactor = dist / radius; // 0 (center) to 1 (edge)
            // Scale down to minimum 20% of original size at center
            return config.scale * (0.2 + (0.8 * shrinkFactor));
        }
        return config.scale;
    });

    return (
        <motion.div
            style={{
                left: `${config.x}%`,
                top: `${config.y}%`,
                x,
                y,
                scale, // Reactive shrinking scale
                width: `${config.depth * 6 + 3}px`,
                height: `${config.depth * 6 + 3}px`,
            }}
            // No automatic animation loop here anymore
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }} // Static visibility
            transition={{ duration: 1 }}
            // Bright, glowing particles
            className={`absolute rounded-full blur-[1px] ${config.color} shadow-[0_0_10px_currentColor] mix-blend-screen pointer-events-none transition-opacity`}
        />
    );
};

export default function HeroSection() {
    // Mouse position state for parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring for the mouse values - Adjusted damping for crisper reponse
    const smoothX = useSpring(mouseX, { stiffness: 50, damping: 25 });
    const smoothY = useSpring(mouseY, { stiffness: 50, damping: 25 });

    // Window dimensions for normalization
    const handleMouseMove = (e: React.MouseEvent) => {
        if (typeof window === 'undefined') return;
        const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
        const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
        mouseX.set(x);
        mouseY.set(y);
    };

    // Parallax transforms for the 3D Triptych effect
    const containerRotateX = useTransform(smoothY, [-1, 1], [5, -5]);
    const containerRotateY = useTransform(smoothX, [-1, 1], [-5, 5]);

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    const particles = Array.from({ length: 80 });

    return (
        <section
            className="relative min-h-screen w-full flex flex-col justify-end items-center overflow-hidden bg-[#0a0a0a] text-white selection:bg-orange-500/30 perspective-2000"
            onMouseMove={handleMouseMove}
        >
            {/* Background Texture */}
            <div className="absolute inset-0 z-0 grid-texture pointer-events-none opacity-40"></div>

            {/* Flaming Particles Layer */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {isMounted && particles.map((_, i) => (
                    <Particle key={i} mouseX={smoothX} mouseY={smoothY} />
                ))}
            </div>

            {/* Accent Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-orange/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

            {/* 3D Triptych Container */}
            <div className="absolute inset-0 z-10 flex items-center justify-center perspective-[1000px] pointer-events-none">
                <motion.div
                    className="relative flex items-center justify-center gap-6 md:gap-12 transform-style-3d"
                    style={{ rotateX: containerRotateX, rotateY: containerRotateY }}
                >

                    {/* Left Card - Angled In */}
                    <motion.div
                        initial={{ opacity: 0, x: -100, rotateY: 25, z: -100 }}
                        animate={{ opacity: 1, x: 0, rotateY: 25, z: 0 }}
                        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                        className="w-48 h-80 md:w-64 md:h-[26rem] lg:w-72 lg:h-[30rem] relative group cursor-pointer pointer-events-auto"
                        whileHover={{ scale: 1.05, rotateY: 15, z: 20 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl border border-white/10 backdrop-blur-sm shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden">
                            <div className="absolute inset-0 bg-neutral-900/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                            <img src="https://blobcdn.same.energy/a/bb/6b/bb6b239b93c7208b8c83c34a03acb60da5f73893" alt="Strategy" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />

                            {/* Glass Reflection */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" />

                            {/* Label */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <p className="text-brand-orange text-xs font-bold tracking-[0.2em] uppercase mb-1">Step 01</p>
                                <h3 className="text-2xl font-serif font-medium text-white">Strategy</h3>
                            </div>
                        </div>
                    </motion.div>

                    {/* Center Card - Front & Center */}
                    <motion.div
                        initial={{ opacity: 0, y: 50, z: 0 }}
                        animate={{ opacity: 1, y: 0, z: 50 }}
                        transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                        className="w-56 h-96 md:w-80 md:h-[32rem] lg:w-96 lg:h-[36rem] relative group cursor-pointer pointer-events-auto z-20"
                        whileHover={{ scale: 1.02, z: 80 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-2xl border border-white/20 backdrop-blur-md shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-hidden">
                            <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                            {/* <img src="https://blobcdn.same.energy/b/9b/9c/9b9c953237687a616a73ce49be7fcf0ea5f1fb24" alt="Creative" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" /> */}
                            <img src="https://blobcdn.same.energy/a/64/54/6454e1538fc392c0ea9fb164a0232b046c028b91" alt="Creative" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                            {/* <img src="https://blobcdn.same.energy/a/eb/a0/eba0abc699edc3b1ba1d198bf0fb0b744700c0c4" alt="Creative" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" /> */}

                            {/* Label */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20">
                                <p className="text-brand-orange text-sm font-bold tracking-[0.2em] uppercase mb-1">Step 02</p>
                                <h3 className="text-4xl font-serif font-medium text-white">Creative</h3>
                                <p className="text-neutral-400 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">Where magic happens.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Card - Angled In */}
                    <motion.div
                        initial={{ opacity: 0, x: 100, rotateY: -25, z: -100 }}
                        animate={{ opacity: 1, x: 0, rotateY: -25, z: 0 }}
                        transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                        className="w-48 h-80 md:w-64 md:h-[26rem] lg:w-72 lg:h-[30rem] relative group cursor-pointer pointer-events-auto"
                        whileHover={{ scale: 1.05, rotateY: -15, z: 20 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-bl from-white/10 to-transparent rounded-2xl border border-white/10 backdrop-blur-sm shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden">
                            <div className="absolute inset-0 bg-neutral-900/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                            {/* <img src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?q=80&w=1000&auto=format&fit=crop" alt="Data" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" /> */}
                            {/* <img src="https://blobcdn.same.energy/a/96/a0/96a0911070187bd8bce24357e341aba232180bdf" alt="Data" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" /> */}
                            <img src="https://blobcdn.same.energy/a/fb/72/fb7257532ab1f1b79af35419571b4418338b79da" alt="Data" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />

                            {/* Label */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <p className="text-brand-orange text-xs font-bold tracking-[0.2em] uppercase mb-1">Step 03</p>
                                <h3 className="text-2xl font-serif font-medium text-white">Data</h3>
                            </div>
                        </div>
                    </motion.div>

                </motion.div>
            </div>

            {/* Bottom Heading - New Replacement Text */}
            <div className="absolute bottom-32 md:bottom-12 left-0 right-0 z-20 text-center pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="relative inline-block group cursor-default pointer-events-auto"
                >
                    <h1 className="font-[family-name:var(--font-oswald)] text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase select-none text-white drop-shadow-2xl">
                        ELEVATE YOUR <br className="md:hidden" />
                        <span className="text-brand-orange">BRAND.</span>
                    </h1>
                    <p className="text-neutral-400 text-sm md:text-base uppercase tracking-[0.4em] mt-6 font-[family-name:var(--font-inter)]">
                        Premium Digital Solutions
                    </p>
                </motion.div>
            </div>

        </section>
    );
}
