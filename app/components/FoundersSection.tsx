"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const founders = [
    {
        name: "Suhani Panchal",
        role: "Growth & Strategy",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000",
        bio: "Visionary strategist crafting sustainable growth through data-driven creativity."
    },
    {
        name: "Rohan Mehta",
        role: "Design & Tech",
        image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=1000",
        bio: "Architecting scalable solutions that blend extreme performance with aesthetic perfection."
    },
    {
        name: "Aryan Sharma",
        role: "Brand Identity",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000",
        bio: "Design maverick turning abstract concepts into tangible, digital art forms."
    }
];

export default function FoundersSection() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-neutral-950">
            {/* Sticky Container */}
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                {/* Horizontal Scroll Track */}
                <motion.div style={{ x }} className="flex gap-12 md:gap-20 p-20 pl-10 md:pl-32 items-center">

                    {/* Title Slide */}
                    <div className="flex flex-col justify-center min-w-[80vw] md:min-w-[30vw] pr-10">
                        <h2 className="text-6xl md:text-8xl font-black text-white leading-tight font-[family-name:var(--font-faculty)]">
                            THE<br />
                            <span className="text-stone-700">MINDS</span>
                        </h2>
                        <div className="mt-8 h-px w-32 bg-orange-500" />
                        <p className="mt-8 text-stone-400 text-lg md:text-xl max-w-sm">
                            Meet the visionaries behind the screen. Architects of the digital future.
                        </p>
                    </div>

                    {/* Founder Cards - Refined & Scaled Down */}
                    {founders.map((founder, i) => (
                        <div key={i} className="group relative min-w-[85vw] md:min-w-[25vw] flex flex-col transition-all duration-500">

                            {/* Glass Card Container */}
                            <div className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-orange-500/30 hover:bg-white/10 transition-colors duration-500">
                                {/* Image Container - Scaled Down */}
                                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg bg-stone-900 mb-6 group-hover:scale-[1.02] transition-all duration-700 ease-out">
                                    <Image
                                        src={founder.image}
                                        alt={founder.name}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        sizes="(max-width: 768px) 80vw, 25vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-40" />
                                </div>

                                {/* Text Info - Compact */}
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="block text-orange-500 text-[10px] font-mono uppercase tracking-[0.2em] mb-2">
                                            0{i + 1} &bull; {founder.role}
                                        </span>
                                        <h3 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-faculty)] leading-none">
                                            {founder.name}
                                        </h3>
                                        <p className="mt-4 text-xs text-stone-400 leading-relaxed max-w-[90%] font-mono opacity-60 group-hover:opacity-100 transition-opacity">
                                            {founder.bio}
                                        </p>
                                    </div>
                                    <ArrowUpRight className="text-stone-600 group-hover:text-orange-500 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300 w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    ))}

                </motion.div>
            </div>
        </section>
    );
}
