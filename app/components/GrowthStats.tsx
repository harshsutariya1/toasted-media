"use client";

import { motion } from "framer-motion";
import React from "react";

// --- Components for the Visualization ---

const FloatingBadge = ({ 
    icon, 
    label, 
    value, 
    trend, 
    delay, 
    className
}: { 
    icon: React.ReactNode, 
    label: string, 
    value: string, 
    trend?: string, 
    delay: number,
    className: string
}) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay, duration: 0.5, type: "spring" }}
        className={`absolute z-20 flex items-center gap-2 md:gap-3 p-2 md:p-3 pr-4 md:pr-5 bg-neutral-950/90 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl shadow-2xl shadow-black/50 ${className}`}
    >
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10 shrink-0">
            <div className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                {icon}
            </div>
        </div>
        <div className="min-w-0">
            <div className="text-[8px] md:text-[10px] text-neutral-400 font-bold uppercase tracking-wider truncate">{label}</div>
            <div className="text-xs md:text-sm font-bold text-white flex items-center gap-1.5 md:gap-2">
                <span className="whitespace-nowrap">{value}</span>
                {trend && <span className="text-[8px] md:text-[10px] text-emerald-400 bg-emerald-500/10 px-1 md:px-1.5 py-0.5 rounded-full">{trend}</span>}
            </div>
        </div>
    </motion.div>
);

const ModernGrowthGraph = () => {
    return (
        <div className="relative w-full max-w-125 aspect-square flex items-center justify-center group scale-90 sm:scale-100 transition-transform duration-500">
             {/* Background Aura */}
             <div className="absolute inset-0 bg-brand-orange/10 blur-[80px] rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-1000" />
             
             {/* Main Card Container */}
             <div className="relative w-full h-full bg-neutral-900/40 backdrop-blur-md rounded-4xl border border-white/10 shadow-3xl overflow-hidden flex flex-col">
                
                {/* Header-like top bar */}
                <div className="p-5 border-b border-white/5 flex justify-between items-center bg-white/5">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                        <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Live Analytics</div>
                    </div>
                </div>

                {/* Grid Background */}
                <div className="absolute inset-0 top-16 z-0 opacity-[0.03] pointer-events-none" 
                    style={{ 
                        backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
                        backgroundSize: '10% 10%'
                    }} 
                />

                {/* The Chart Area */}
                <div className="relative flex-1 w-full h-full p-4 md:p-6 md:pt-10">
                     <svg 
                        className="w-full h-full drop-shadow-2xl overflow-visible" 
                        viewBox="0 0 300 200" 
                        preserveAspectRatio="xMidYMid meet"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#2f72e7" />
                                <stop offset="50%" stopColor="#7e3af1" />
                                <stop offset="100%" stopColor="#f78f2d" />
                            </linearGradient>
                            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#f78f2d" stopOpacity="0.15" />
                                <stop offset="100%" stopColor="#f78f2d" stopOpacity="0" />
                            </linearGradient>
                            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Area under curve */}
                        <motion.path 
                            d="M0,200 L0,150 C40,150 70,180 120,130 C170,80 220,100 300,20 L300,200 Z"
                            fill="url(#areaGradient)"
                            className="pointer-events-none"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                        />

                        {/* The Stroke Line */}
                        <motion.path 
                            d="M0,150 C40,150 70,180 120,130 C170,80 220,100 300,20"
                            fill="none"
                            stroke="url(#lineGradient)"
                            strokeWidth="4"
                            strokeLinecap="round"
                            filter="url(#glow)"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                        
                        {/* Animated Points */}
                        <motion.circle cx="120" cy="130" r="4" fill="#7e3af1" 
                            initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 1, type:'spring' }} />
                        <motion.circle cx="300" cy="20" r="6" fill="#f78f2d" stroke="white" strokeWidth="2"
                             initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 1.8, type:'spring' }} />
                     </svg>
                </div>
             </div>

            {/* Floating Widgets */}
            <FloatingBadge 
                icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
                label="Efficiency"
                value="98.5%"
                trend="+12%"
                delay={0.8}
                className="-left-2 sm:-left-4 lg:-left-8 max-[360px]:-bottom-2 bottom-2 lg:bottom-12"
            />

            <FloatingBadge 
                icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>}
                label="Conversion"
                value="3.2x"
                trend="HIGH"
                delay={1.2}
                className="-right-2 sm:-right-4 lg:-right-8 top-12 lg:top-24"
            />
        </div>
    );
};

export default function GrowthStats() {
    return (
        <section id="about" className="relative py-16 lg:py-24 bg-neutral-900 font-sans overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 w-full h-full z-0">
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-neutral-900/30 to-neutral-900" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                    {/* LEFT SIDE: New Modern Visualization */}
                    <motion.div
                        className="w-full lg:w-1/2 relative flex items-center justify-center p-4"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <ModernGrowthGraph />
                    </motion.div>

                    {/* RIGHT SIDE: Text Content */}
                    <motion.div
                        className="w-full lg:w-1/2"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl lg:text-7xl font-serif font-black mb-6 lg:mb-8 leading-tight lg:leading-none text-white">
                            Marketing was <span className="text-neutral-500 line-through decoration-brand-orange decoration-2 lg:decoration-4">stale.</span><br />
                            So we turned up <span className="text-brand-orange">the heat.</span>
                        </h2>
                        <div className="space-y-6 text-lg text-neutral-300 leading-relaxed font-light">
                            <p>
                                <strong className="text-white font-bold">The Toasted Origin:</strong> Most agencies give you vanilla. Safe. Predictable. We realized that in a feed scrolling at 60mph, &quot;safe&quot; is invisible.
                            </p>
                            <p>
                                We founded <span className="font-faculty">Toasted Media</span> on a simple principle: <span className="bg-brand-yellow/30 px-1 font-medium text-white">Be bold or go home.</span> We layer strategy, creative, and data just like our logo layers color—creating a complex, rich, and undeniable presence for your brand.
                            </p>
                            <div className="pt-6 grid grid-cols-2 gap-y-8 gap-x-4 md:gap-x-8">
                                <div className="flex flex-col">
                                    <span className="text-4xl font-bold font-serif text-brand-blue">100%</span>
                                    <span className="text-xs md:text-sm uppercase tracking-wide text-neutral-400">Fresh Ideas</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-4xl font-bold font-serif text-brand-purple">0%</span>
                                    <span className="text-xs md:text-sm uppercase tracking-wide text-neutral-400">Boring Content</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-4xl font-bold font-serif text-brand-orange">24/7</span>
                                    <span className="text-xs md:text-sm uppercase tracking-wide text-neutral-400">Obsession</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-4xl font-bold font-serif text-brand-yellow">3</span>
                                    <span className="text-xs md:text-sm uppercase tracking-wide text-neutral-400">Core Layers</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
