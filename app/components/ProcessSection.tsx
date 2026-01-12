"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Search, Map, Zap, TrendingUp } from "lucide-react";

const steps = [
    {
        id: "01",
        title: "Discovery",
        subtitle: "Unearthing Potential",
        description: "We dive deep into your brand's core DNA, auditing competitors and identifying the hidden gaps in the market ready to be seized.",
        color: "text-brand-blue",
        border: "border-brand-blue",
        glow: "shadow-brand-blue/20",
        icon: Search
    },
    {
        id: "02",
        title: "Strategy",
        subtitle: "The Battle Plan",
        description: "No guessing. We engineer a bespoke roadmap combining data insights with creative angles to ensure maximum impact upon launch.",
        color: "text-brand-purple",
        border: "border-brand-purple",
        glow: "shadow-brand-purple/20",
        icon: Map
    },
    {
        id: "03",
        title: "Execution",
        subtitle: "Ignition Sequence",
        description: "We deploy. High-velocity content production, surgical ad targeting, and precision web development working in perfect sync.",
        color: "text-brand-orange",
        border: "border-brand-orange",
        glow: "shadow-brand-orange/20",
        icon: Zap
    },
    {
        id: "04",
        title: "Optimization",
        subtitle: "Fueling the Fire",
        description: "Launch is just the start. We relentlessly analyze data, kill what doesn't work, and double down on what scales.",
        color: "text-brand-yellow",
        border: "border-brand-yellow",
        glow: "shadow-brand-yellow/20",
        icon: TrendingUp
    },
];

export default function ProcessSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    return (
        <section id="process" ref={containerRef} className="py-20 md:py-32 bg-neutral-900 relative overflow-hidden">

            {/* Background Noise/Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("/noise.png")' }}></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-20 md:mb-32">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-brand-orange font-mono tracking-widest uppercase text-sm mb-4 block"
                    >
                        How We Work
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold text-white font-[family-name:var(--font-syne)]"
                    >
                        THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">PROCESS</span>.
                    </motion.h2>
                </div>

                {/* Central Timeline Line (Desktop Only) */}
                <div className="absolute left-1/2 top-48 bottom-32 w-[2px] bg-neutral-800 transform -translate-x-1/2 z-0 hidden md:block">
                    <motion.div
                        style={{ scaleY: scrollYProgress }}
                        className="w-full h-full bg-gradient-to-b from-brand-orange via-brand-purple to-brand-blue origin-top"
                    />
                </div>

                <div className="relative z-10 space-y-12 md:space-y-32">
                    {steps.map((step, index) => (
                        <ProcessStep key={index} step={step} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProcessStep({ step, index }: { step: any, index: number }) {
    const isEven = index % 2 === 0;

    return (
        <div className={`relative flex gap-6 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} md:items-center`}>

            {/* --- Mobile Elements --- */}

            {/* Mobile Timeline Line */}
            <div className="absolute left-[23px] top-0 bottom-[-3rem] w-[2px] bg-neutral-800 md:hidden z-0" />

            {/* Mobile Icon */}
            <div className="md:hidden shrink-0 relative z-20">
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    viewport={{ once: false, amount: 0.5 }}
                    className={`w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center ${step.glow} shadow-lg`}
                >
                    <step.icon className={`w-6 h-6 ${step.color}`} />
                </motion.div>
            </div>


            {/* --- Desktop Center Icon (Absolute) --- */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-20">
                <motion.div
                    initial={{ scale: 0, rotate: 180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    viewport={{ once: false, amount: 0.8 }}
                    className={`
                        w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-700 flex items-center justify-center
                        shadow-[0_0_30px_-5px_var(--tw-shadow-color)] ${step.glow}
                    `}
                >
                    <step.icon className={`w-8 h-8 ${step.color}`} />
                </motion.div>
            </div>


            {/* --- Content Side --- */}
            <motion.div
                initial={{ opacity: 0, x: 0, y: 20 }} // Simple fade up for mobile default
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                // Override for desktop variants
                variants={{
                    desktop: { opacity: 0, x: isEven ? -100 : 100, y: 0 },
                    visible: { opacity: 1, x: 0, y: 0 }
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.3 }}
                className={`
                    w-full md:w-1/2
                    ${isEven ? 'md:pr-24 md:text-right' : 'md:pl-24 md:text-left'}
                    pb-4 md:pb-0
                `}
            >
                {/* Desktop Background Number */}
                <span className={`font-[family-name:var(--font-syne)] text-8xl font-bold opacity-5 absolute top-0 -translate-y-1/2 ${isEven ? 'right-24' : 'left-24'} hidden md:block select-none pointer-events-none`}>
                    {step.id}
                </span>

                <h3 className={`text-2xl md:text-4xl font-bold text-white mb-2 font-[family-name:var(--font-syne)] flex flex-col md:block ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                    {step.title}
                </h3>
                <p className={`text-sm md:text-lg font-mono mb-3 uppercase tracking-widest ${step.color}`}>{step.subtitle}</p>
                <p className="text-neutral-400 leading-relaxed text-base md:text-lg">
                    {step.description}
                </p>
            </motion.div>

            {/* Empty Side for Desktop Balance */}
            <div className="hidden md:block w-1/2" />
        </div>
    );
}
