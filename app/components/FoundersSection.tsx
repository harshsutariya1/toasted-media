"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Linkedin, Twitter } from "lucide-react";

const founders = [
    {
        name: "Elena Vance",
        role: "Growth & Strategy",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000",
        bio: "Visionary strategist crafting sustainable growth through data-driven creativity. Elena bridges the gap between raw metrics and human connection."
    },
    {
        name: "Marcus Chen",
        role: "Design & Tech",
        image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=1000",
        bio: "Architecting scalable solutions that blend extreme performance with aesthetic perfection. Marcus ensures every pixel serves a purpose."
    },
    {
        name: "Sarah Jenkins",
        role: "Brand Identity",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000",
        bio: "Design maverick turning abstract concepts into tangible, digital art forms. Sarah defines the visual language that makes brands unforgettable."
    }
];

export default function FoundersSection() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
    const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-neutral-950">
            {/* Sticky Container */}
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                {/* Horizontal Scroll Track */}
                <motion.div
                    style={{ x, y }}
                    className="flex gap-8 md:gap-16 items-center pl-8 md:pl-24 pr-8"
                >

                    {/* Title Slide */}
                    <div className="flex flex-col justify-center min-w-[300px] md:min-w-[400px] shrink-0 z-10 pr-8 md:pr-0">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-px w-12 bg-white/30" />
                            <span className="text-brand-orange text-sm uppercase tracking-widest font-bold">The Leadership</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.9] font-[family-name:var(--font-faculty)] mb-8">
                            THE<br />
                            <span className="text-neutral-800 text-stroke-1 text-stroke-white/20">MINDS.</span>
                        </h2>
                        <p className="text-neutral-400 text-lg max-w-xs leading-relaxed font-light border-l border-white/10 pl-6">
                            The architects behind the screen. Blending creativity, data, and obsession.
                        </p>
                    </div>

                    {/* Founder Cards - Modern Horizontal Layout */}
                    {founders.map((founder, i) => (
                        <div
                            key={i}
                            className="group relative shrink-0 w-[90vw] md:w-[60vw] lg:w-[50vw] xl:w-[45vw] h-[65vh] md:h-[55vh] flex flex-col md:flex-row bg-neutral-900/50 border border-white/10 rounded-[2rem] overflow-hidden hover:border-brand-orange/50 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-orange/5"
                        >
                            {/* Image Side (Left on Desktop) */}
                            <div className="relative w-full md:w-5/12 h-1/2 md:h-full overflow-hidden">
                                <Image
                                    src={founder.image}
                                    alt={founder.name}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 40vw"
                                    priority={i === 0}
                                />
                                {/* Modern gradient overlay only for text legibility at bottom/edges */}
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-neutral-950/80 opacity-60" />

                                {/* Floating Index */}
                                <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
                                    <span className="text-xs font-mono text-white/80 px-2 py-1 rounded bg-black/30 backdrop-blur-md border border-white/10">
                                        0{i + 1}
                                    </span>
                                </div>
                            </div>

                            {/* Content Side (Right on Desktop) */}
                            <div className="w-full md:w-7/12 p-6 md:p-10 flex flex-col justify-between relative z-10 bg-neutral-900/40 backdrop-blur-sm">
                                <div>
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs md:text-sm text-brand-orange font-bold uppercase tracking-wider mb-2">
                                                {founder.role}
                                            </span>
                                            <h3 className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-faculty)] leading-tight">
                                                {founder.name}
                                            </h3>
                                        </div>
                                        <ArrowUpRight className="w-6 h-6 text-neutral-600 group-hover:text-brand-orange group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
                                    </div>
                                    <div className="w-12 h-0.5 bg-white/10 group-hover:bg-brand-orange/50 transition-colors my-4" />
                                    <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-light group-hover:text-neutral-300 transition-colors">
                                        {founder.bio}
                                    </p>
                                </div>

                                <div className="flex gap-4 pt-6 mt-auto border-t border-white/5">
                                    <button className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-500 hover:text-white transition-colors group/btn">
                                        <Linkedin className="w-4 h-4" />
                                        <span className="hidden md:inline">LinkedIn</span>
                                    </button>
                                    <button className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-500 hover:text-white transition-colors group/btn">
                                        <Twitter className="w-4 h-4" />
                                        <span className="hidden md:inline">Twitter</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* End Spacer */}
                    <div className="w-20 shrink-0" />

                </motion.div>
            </div>
        </section>
    );
}
