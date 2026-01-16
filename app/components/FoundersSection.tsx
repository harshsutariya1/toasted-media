"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Linkedin, Twitter, ArrowRight } from "lucide-react";
import { useRef } from "react";

const founders = [
    {
        name: "Suhani Panchal",
        role: "CEO & Co-Founder",
        bio: "Strategist with a vision for disrupting the digital landscape. Guiding brands toward sustainable growth through data-driven creativity.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000",
        socials: {
            linkedin: "#",
            twitter: "#"
        }
    },
    {
        name: "Rohan Mehta",
        role: "CTO & Co-Founder",
        bio: "The technical backbone. Architecting scalable solutions that blend extreme performance with aesthetic perfection.",
        image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=1000",
        socials: {
            linkedin: "#",
            twitter: "#"
        }
    },
    {
        name: "Aryan Sharma",
        role: "Creative Director",
        bio: "Design maverick pushing the boundaries of visual storytelling. Turning abstract concepts into tangible digital art.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000",
        socials: {
            linkedin: "#",
            twitter: "#"
        }
    }
];

export default function FoundersSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-[#e7e5e4]">
            {/* Header / Title Block */}
            <div className="absolute top-0 left-0 w-full h-screen flex flex-col items-center justify-start pt-20 pointer-events-none z-10">
                <span className="text-brand-orange font-mono text-xs tracking-[0.3em] uppercase mb-4">
                    Leadership
                </span>
                <h2 className="text-4xl md:text-6xl font-black text-stone-900 font-[family-name:var(--font-syne)] uppercase tracking-tight">
                    The Minds
                </h2>
            </div>

            {/* Sticky Scrolling Area */}
            <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
                <div className="relative w-full max-w-6xl h-[70vh] md:h-[600px] flex items-center justify-center">
                    {founders.map((founder, index) => {
                        // Calculate range for each card
                        // Total scroll distance is 1. Each card takes up 1/3 roughly.
                        const rangeStep = 1 / founders.length;
                        const start = index * rangeStep;
                        const end = start + rangeStep;

                        return (
                            <FounderCard
                                key={index}
                                founder={founder}
                                i={index}
                                progress={scrollYProgress}
                                range={[start, end]}
                                total={founders.length}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

interface Founder {
    name: string;
    role: string;
    bio: string;
    image: string;
    socials: {
        linkedin: string;
        twitter: string;
    };
}

function FounderCard({ founder, i, progress, range, total }: { founder: Founder, i: number, progress: MotionValue<number>, range: [number, number], total: number }) {
    // Parallax & Slide Logic
    // Card should enter from bottom-right and settle. Then exit to top-left.

    // Logic:
    // 1. Entrance: Only relevant for i > 0 (first one is static or fades in)
    // 2. Active Phase: Locked in center
    // 3. Exit: Slides out to top-left

    // We use a broader range to smooth transitions
    const [start, end] = range;

    // Entrance (From Bottom Right)
    // For i=0, it starts in place. For i>0, it comes in as scroll progresses.
    const enterStart = start - 0.1;
    const enterEnd = start;

    const x = useTransform(progress, [enterStart, enterEnd, end, end + 0.2], [i === 0 ? 0 : 1000, 0, 0, -1000]);
    const y = useTransform(progress, [enterStart, enterEnd, end, end + 0.2], [i === 0 ? 0 : 500, 0, 0, -200]);
    const rotate = useTransform(progress, [enterStart, enterEnd, end, end + 0.2], [i === 0 ? 0 : 15, 0, 0, -10]);
    const scale = useTransform(progress, [enterStart, enterEnd, end, end + 0.2], [i === 0 ? 1 : 0.8, 1, 1, 0.9]);
    const opacity = useTransform(progress, [enterStart, enterEnd, end, end + 0.2], [i === 0 ? 1 : 0, 1, 1, 0]);

    // Z-Index is easy: higher index = on top
    const zIndex = i;

    return (
        <motion.div
            style={{ x, y, rotate, scale, opacity, zIndex }}
            className="absolute w-full px-4 md:px-0 max-w-4xl"
        >
            <div className="bg-white rounded-[2.5rem] p-4 md:p-6 shadow-2xl flex flex-col md:flex-row gap-6 md:gap-12 items-center overflow-hidden border border-stone-200">

                {/* Image Section (Left) */}
                <div className="w-full md:w-5/12 aspect-[3/4] md:aspect-[4/5] relative rounded-[2rem] overflow-hidden bg-stone-100 group">
                    <Image
                        src={founder.image}
                        alt={founder.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 saturate-0 group-hover:saturate-100"
                        sizes="(max-width: 768px) 100vw, 40vw"
                    />

                    {/* Corner Decoration */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/50 rounded-tl-lg" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/50 rounded-br-lg" />
                </div>

                {/* Content Section (Right) */}
                <div className="w-full md:w-7/12 flex flex-col justify-center pr-0 md:pr-12 text-left pb-6 md:pb-0">
                    <span className="text-brand-orange font-mono text-xs font-bold tracking-widest uppercase mb-3 inline-block bg-brand-orange/5 px-2 py-1 rounded">
                        {founder.role}
                    </span>

                    <h3 className="text-4xl md:text-5xl font-bold text-stone-900 font-[family-name:var(--font-syne)] mb-6 leading-none">
                        {founder.name}
                    </h3>

                    <p className="text-stone-500 text-lg leading-relaxed mb-8 md:max-w-md">
                        {founder.bio}
                    </p>

                    <div className="flex items-center gap-6">
                        <div className="flex gap-3">
                            <a
                                href={founder.socials.linkedin}
                                className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-900 transition-all duration-300 group"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5 group-hover:scale-90 transition-transform" />
                            </a>
                            <a
                                href={founder.socials.twitter}
                                className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-900 transition-all duration-300 group"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5 group-hover:scale-90 transition-transform" />
                            </a>
                        </div>

                        <div className="h-px flex-1 bg-stone-200" />

                        <div className="text-xs font-bold text-stone-300 tracking-widest uppercase">
                            0{i + 1} &mdash; 0{total}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
