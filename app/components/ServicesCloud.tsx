"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
    Search, Layout, TrendingUp, Palette, PenTool,
    Share2, Code, Target, Compass, BarChart2
} from "lucide-react";

const services = [
    { id: 1, label: "SEO & Rankings", icon: Search },
    { id: 2, label: "UI/UX Design", icon: Layout },
    { id: 3, label: "Growth Hacking", icon: TrendingUp },
    { id: 4, label: "Brand Identity", icon: Palette },
    { id: 5, label: "Content Strategy", icon: PenTool },
    { id: 6, label: "Social Media", icon: Share2 },
    { id: 7, label: "Web Development", icon: Code },
    { id: 8, label: "PPC & Ads", icon: Target },
    { id: 9, label: "Strategic Planning", icon: Compass },
    { id: 10, label: "Data Analytics", icon: BarChart2 },
];

/**
 * Positions arranged in a circular orbit around the center video.
 * We'll use absolute percentages to place them away from center (50%, 50%).
 * 
 * Approximate layout:
 * - Center is reserved for Video (40-60% width depending on breakpoints).
 * - Items scatter in outer ring.
 */
const positions = [
    { x: 15, y: 20 },  // Top Left
    { x: 85, y: 20 },  // Top Right
    { x: 50, y: 15 },  // Top Center
    { x: 10, y: 50 },  // Mid Left
    { x: 90, y: 50 },  // Mid Right
    { x: 20, y: 80 },  // Bottom Left
    { x: 80, y: 80 },  // Bottom Right
    { x: 50, y: 85 },  // Bottom Center
    { x: 28, y: 35 },  // Inner Top Left
    { x: 72, y: 35 }   // Inner Top Right
];

export default function ServicesCloud() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(-1000);
    const mouseY = useMotionValue(-1000);

    const springConfig = { damping: 30, stiffness: 150, mass: 0.1 };
    const smoothMouseX = useSpring(mouseX, springConfig);
    const smoothMouseY = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        }
    };

    const handleMouseLeave = () => {
        mouseX.set(-1000);
        mouseY.set(-1000);
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full h-[600px] md:h-[800px] bg-black border-t border-white/5 mt-24 rounded-3xl cursor-none overflow-hidden group shadow-2xl flex items-center justify-center"
        >
            {/* --- Center Video Background --- */}
            {/* Placed absolutely in center with blend mode */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <div className="relative w-full h-full max-w-xs md:max-w-md aspect-video opacity-80 mix-blend-screen blur-[3px]">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-contain scale-110"
                    >
                        <source src="/media/logo_on_fire2.mp4" type="video/mp4" />
                    </video>
                    {/* Radial fade to blend edges into black */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] pointer-events-none" />
                </div>
            </div>


            {/* Ambient Lighting Layers */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[150px] pointer-events-none z-0" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[150px] pointer-events-none z-0" />

            {/* Interactive Flashlight Aura */}
            <motion.div
                className="absolute w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.02)_0%,_transparent_70%)] pointer-events-none z-0"
                style={{
                    left: smoothMouseX,
                    top: smoothMouseY,
                    x: "-50%",
                    y: "-50%"
                }}
            />

            {/* Custom Cursor */}
            <motion.div
                className="absolute w-8 h-8 rounded-full border border-brand-orange/50 pointer-events-none z-50 hidden md:flex items-center justify-center mix-blend-screen"
                style={{
                    left: smoothMouseX,
                    top: smoothMouseY,
                    x: "-50%",
                    y: "-50%"
                }}
            >
                <div className="w-1 h-1 bg-brand-orange rounded-full" />
            </motion.div>

            {/* Widgets Container */}
            <div className="relative w-full h-full z-10">
                {services.map((service, i) => (
                    <CloudWidget
                        key={service.id}
                        item={service}
                        initialPos={positions[i]}
                        mouseX={smoothMouseX}
                        mouseY={smoothMouseY}
                    />
                ))}
            </div>

            {/* Bottom Overlay Text */}
            <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none z-20">
                <span className="text-white/20 text-xs font-mono tracking-[0.5em] uppercase">
                    Igniting Brands Globally
                </span>
            </div>
        </div>
    );
}

function CloudWidget({
    item,
    initialPos,
    mouseX,
    mouseY
}: {
    item: typeof services[0],
    initialPos: { x: number, y: number },
    mouseX: any,
    mouseY: any
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [center, setCenter] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateCenter = () => {
            if (ref.current && ref.current.parentElement) {
                const parentRect = ref.current.parentElement.getBoundingClientRect();
                const rect = ref.current.getBoundingClientRect();
                // Store center relative to parent container
                setCenter({
                    x: rect.left - parentRect.left + rect.width / 2,
                    y: rect.top - parentRect.top + rect.height / 2
                });
            }
        };

        // Important: Recalculate on mount and resize
        const timer = setTimeout(updateCenter, 100);
        window.addEventListener('resize', updateCenter);
        return () => {
            window.removeEventListener('resize', updateCenter);
            clearTimeout(timer);
        };
    }, []);

    // Physics Calculations
    const distance = useTransform([mouseX, mouseY], ([x, y]) => {
        if ((x as number) < -500) return 1000;
        return Math.sqrt(Math.pow((x as number) - center.x, 2) + Math.pow((y as number) - center.y, 2));
    });

    // Proximity Effects (Raw)
    const scaleRaw = useTransform(distance, [0, 350], [1.3, 1]);
    const opacityRaw = useTransform(distance, [0, 500], [1, 0.5]);
    const yOffsetRaw = useTransform(distance, [0, 300], [-15, 0]);

    // Smooth Springs
    const physicsConfig = { stiffness: 150, damping: 20, mass: 0.5 };
    const scale = useSpring(scaleRaw, physicsConfig);
    const opacity = useSpring(opacityRaw, physicsConfig);
    const yOffset = useSpring(yOffsetRaw, physicsConfig);

    // Magnetic Pull
    const xPull = useTransform(distance, (d) => {
        if (d > 350) return 0;
        return (mouseX.get() - center.x) * 0.15;
    });
    const yPull = useTransform(distance, (d) => {
        if (d > 350) return 0;
        return (mouseY.get() - center.y) * 0.15;
    });

    return (
        <motion.div
            ref={ref}
            className="absolute origin-center"
            style={{
                left: `${initialPos.x}%`,
                top: `${initialPos.y}%`,
                x: xPull,
                y: yPull,
                translateX: "-50%", // Center the pivot point
                translateY: "-50%"
            }}
        >
            <motion.div
                className="
                    flex items-center gap-3 px-5 py-3 md:px-6 md:py-4
                    rounded-full border border-white/10
                    bg-black/40 backdrop-blur-md 
                    shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                    hover:bg-neutral-900/80 hover:border-brand-orange/30
                    transition-colors duration-300
                    cursor-pointer
                "
                style={{
                    scale,
                    opacity,
                    y: yOffset,
                }}
            >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/5 text-neutral-400">
                    <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <span className="text-sm md:text-base font-bold text-neutral-200 font-[family-name:var(--font-syne)] whitespace-nowrap">
                    {item.label}
                </span>
            </motion.div>
        </motion.div>
    );
}
