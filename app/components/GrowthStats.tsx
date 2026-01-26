"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// --- Components for the Visualization ---

const FloatingBadge = ({ 
    icon, 
    label, 
    value, 
    trend, 
    delay, 
    x, 
    y 
}: { 
    icon: React.ReactNode, 
    label: string, 
    value: string, 
    trend?: string, 
    delay: number,
    x: string,
    y: string
}) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay, duration: 0.5, type: "spring" }}
        className={`absolute ${x} ${y} z-20 flex items-center gap-3 p-3 pr-5 bg-neutral-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl shadow-black/50`}
    >
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10">
            {icon}
        </div>
        <div>
            <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">{label}</div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
                {value}
                {trend && <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full">{trend}</span>}
            </div>
        </div>
    </motion.div>
);

const ModernGrowthGraph = () => {
    return (
        <div className="relative w-full aspect-[4/3] md:aspect-square max-w-[500px] flex items-center justify-center">
             {/* Background Aura */}
             <div className="absolute inset-0 bg-brand-orange/20 blur-[100px] rounded-full opacity-40 animate-pulse-slow" />
             
             {/* Main Card Container */}
             <div className="relative w-full h-full bg-neutral-900/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col">
                
                {/* Header-like top bar */}
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="text-xs font-mono text-neutral-500">Live Analytics</div>
                </div>

                {/* Grid Background */}
                <div className="absolute inset-0 top-16 z-0 opacity-20 pointer-events-none" 
                    style={{ 
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }} 
                />

                {/* The Chart Area */}
                <div className="relative flex-1 w-full h-full p-8 pt-12">
                     <svg className="w-full h-full visible overflow-visible" viewBox="0 0 300 200">
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
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
                label="Efficiency"
                value="98.5%"
                trend="+12%"
                delay={0.8}
                x="-left-4 md:-left-12"
                y="bottom-8 md:bottom-16"
            />

            <FloatingBadge 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>}
                label="Conversion"
                value="3.2x"
                trend="HIGH"
                delay={1.2}
                x="-right-2 md:-right-8"
                y="top-32"
            />
        </div>
    );
};

export default function GrowthStats() {
    return (
        <section id="about" className="relative py-16 md:py-24 bg-neutral-900 font-sans overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 w-full h-full z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/30 to-neutral-900" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
                    {/* LEFT SIDE: New Modern Visualization */}
                    <motion.div
                        className="w-full md:w-1/2 relative flex items-center justify-center p-4"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <ModernGrowthGraph />
                    </motion.div>

                    {/* RIGHT SIDE: Text Content */}
                    <motion.div
                        className="w-full md:w-1/2"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-7xl font-serif font-black mb-6 md:mb-8 leading-tight md:leading-none text-white">
                            Marketing was <span className="text-neutral-500 line-through decoration-brand-orange decoration-2 md:decoration-4">stale.</span><br />
                            So we turned up <span className="text-brand-orange">the heat.</span>
                        </h2>
                        <div className="space-y-6 text-lg text-neutral-300 leading-relaxed font-light">
                            <p>
                                <strong className="text-white font-bold">The Toasted Origin:</strong> Most agencies give you vanilla. Safe. Predictable. We realized that in a feed scrolling at 60mph, &quot;safe&quot; is invisible.
                            </p>
                            <p>
                                We founded <span className="font-[family-name:var(--font-faculty)]">Toasted Media</span> on a simple principle: <span className="bg-brand-yellow/30 px-1 font-medium text-white">Be bold or go home.</span> We layer strategy, creative, and data just like our logo layers color—creating a complex, rich, and undeniable presence for your brand.
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
