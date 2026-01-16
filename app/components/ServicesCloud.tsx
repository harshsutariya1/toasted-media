"use client";

import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import {
    Search, Layout, TrendingUp, Palette, PenTool,
    Share2, Code, Target, Compass, BarChart2
} from "lucide-react";

// Enriched data to match the card style
const services = [
    { name: "SEO & Rankings", desc: "Dominate search results", icon: Search },
    { name: "UI/UX Design", desc: "Pixel-perfect experiences", icon: Layout },
    { name: "Growth Hacking", desc: "Rapid scale strategies", icon: TrendingUp },
    { name: "Brand Identity", desc: "Memorable visual storytelling", icon: Palette },
    { name: "Content Strategy", desc: "Engaging narratives", icon: PenTool },
    { name: "Social Media", desc: "Community & viral reach", icon: Share2 },
    { name: "Web Development", desc: "Robust & fast platforms", icon: Code },
    { name: "PPC & Ads", desc: "High-ROI campaigns", icon: Target },
    { name: "Strategic Planning", desc: "Roadmaps for success", icon: Compass },
    { name: "Data Analytics", desc: "Insight-driven decisions", icon: BarChart2 },
];

export default function ServicesCloud() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth mouse for parallax
    const springConfig = { damping: 30, stiffness: 150 };
    const smoothMouseX = useSpring(mouseX, springConfig);
    const smoothMouseY = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        // Calculate mouse position relative to center (for parallax)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        mouseX.set(e.clientX - rect.left - centerX);
        mouseY.set(e.clientY - rect.top - centerY);
    };

    return (
        <section
            id="services"
            ref={containerRef}
            className="relative h-[120vh] bg-neutral-900 overflow-hidden border-t border-neutral-800 flex items-center justify-center"
            onMouseMove={handleMouseMove}
        >
            {/* Ambient Background Gradient */}
            <div className="absolute inset-0 bg-neutral-900 pointer-events-none" />

            {/* Central Glow Spot (Distinct color for Services) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Header (Background Layer) */}
            <div className="absolute top-24 left-0 right-0 text-center z-0 pointer-events-none">
                <h2 className="text-4xl md:text-6xl font-black text-neutral-800/50 uppercase tracking-widest font-[family-name:var(--font-syne)]">
                    Our Services
                </h2>
            </div>

            {/* Floating Cards Container */}
            <div className="relative w-full max-w-7xl h-full flex items-center justify-center perspective-1000">
                {/* 
                   Distributed 3D Cloud
                   Manually positioned for organic look, mirrored/adjusted from IndustriesSection
                */}

                {/* Deep Background Layer (Far) */}
                <FloatingServiceCard item={services[0]} x={-500} y={-300} z={-150} mouseX={smoothMouseX} mouseY={smoothMouseY} />
                <FloatingServiceCard item={services[1]} x={400} y={-350} z={-120} mouseX={smoothMouseX} mouseY={smoothMouseY} />
                <FloatingServiceCard item={services[8]} x={-200} y={350} z={-180} mouseX={smoothMouseX} mouseY={smoothMouseY} />

                {/* Mid Layer */}
                <FloatingServiceCard item={services[2]} x={250} y={200} z={-80} mouseX={smoothMouseX} mouseY={smoothMouseY} />
                <FloatingServiceCard item={services[6]} x={450} y={50} z={-70} mouseX={smoothMouseX} mouseY={smoothMouseY} />
                <FloatingServiceCard item={services[9]} x={0} y={-250} z={-60} mouseX={smoothMouseX} mouseY={smoothMouseY} />

                {/* Foreground Layer (Close) */}
                <FloatingServiceCard item={services[3]} x={0} y={0} z={0} mouseX={smoothMouseX} mouseY={smoothMouseY} />
                <FloatingServiceCard item={services[4]} x={-250} y={200} z={-30} mouseX={smoothMouseX} mouseY={smoothMouseY} />
                <FloatingServiceCard item={services[5]} x={300} y={-150} z={-20} mouseX={smoothMouseX} mouseY={smoothMouseY} />
                <FloatingServiceCard item={services[7]} x={-400} y={-100} z={-40} mouseX={smoothMouseX} mouseY={smoothMouseY} />
            </div>
        </section>
    );
}

// Background/Floating Card Component
function FloatingServiceCard({ item, x, y, z, mouseX, mouseY }: { item: { name: string; desc: string; icon: any }, x: number, y: number, z: number, mouseX: MotionValue<number>, mouseY: MotionValue<number> }) {
    // Parallax strength depends on Depth (Z)
    const depthFactor = Math.abs(z) / 100;
    const moveX = useTransform(mouseX, (val: number) => val * (0.05 * (1 - depthFactor)));
    const moveY = useTransform(mouseY, (val: number) => val * (0.05 * (1 - depthFactor)));

    // Blur maps to depth but allows hover reveal
    const initialBlur = Math.max(0, Math.abs(z) / 20);

    return (
        <motion.div
            className="absolute p-5 rounded-xl bg-neutral-900/60 border border-white/5 backdrop-blur-md flex flex-col gap-3 w-64 group hover:bg-neutral-800 transition-colors duration-300 shadow-lg cursor-default"
            style={{
                x: moveX,
                y: moveY,
                translateX: x,
                translateY: y,
                scale: 1 - (Math.abs(z) / 800), // More subtle scaling
                zIndex: Math.floor(100 - Math.abs(z)), // Ensure closer items stack on top
            }}
            initial={{ opacity: 0, filter: `blur(${initialBlur}px)` }}
            whileInView={{ opacity: 1 - (Math.abs(z) / 300), filter: `blur(${initialBlur}px)` }}
            whileHover={{
                scale: 1.05,
                zIndex: 100,
                filter: "blur(0px)",
                opacity: 1,
                transition: { duration: 0.2 }
            }}
            transition={{ duration: 1 }}
        >
            <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-brand-blue/30 group-hover:bg-brand-blue/10 transition-colors">
                    <item.icon className="w-4 h-4 text-neutral-400 group-hover:text-brand-blue transition-colors" />
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-700 group-hover:bg-brand-blue/50 transition-colors" />
            </div>

            <div>
                <h3 className="text-white font-bold text-sm mb-1 font-[family-name:var(--font-syne)]">{item.name}</h3>
                <p className="text-neutral-500 text-xs leading-relaxed line-clamp-2">{item.desc}</p>
            </div>
        </motion.div>
    );
}
