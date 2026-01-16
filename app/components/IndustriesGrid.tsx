"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Building2, Globe, HeartPulse, Laptop, ShoppingBag, Wallet } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// Industries with brand-specific colors based on the "T" logo palette
const industries = [
    {
        id: 1,
        title: "FinTech",
        desc: "Secure financial ecosystems.",
        icon: Wallet,
        color: "#2563EB", // Blue from logo
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2340",
        className: "md:col-span-2 md:row-span-2",
    },
    {
        id: 4,
        title: "Real Estate",
        desc: "Immersive property tours.",
        icon: Building2,
        color: "#F97316", // Orange from logo
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=2173",
        className: "md:col-span-1 md:row-span-2",
    },
    {
        id: 3,
        title: "E-Commerce",
        desc: "Conversion-driven.",
        icon: ShoppingBag,
        color: "#FACC15", // Yellow from logo
        image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=2340",
        className: "md:col-span-1 md:row-span-1",
    },
    {
        id: 2,
        title: "Healthcare",
        desc: "Patient-first care.",
        icon: HeartPulse,
        color: "#8B5CF6", // Purple/Violet from logo
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2340",
        className: "md:col-span-1 md:row-span-1",
    },
    {
        id: 5,
        title: "SaaS",
        desc: "Scalable dashboards.",
        icon: Laptop,
        color: "#10B981", // Teal/Green from logo
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426",
        className: "md:col-span-2 md:row-span-1",
    },
    {
        id: 6,
        title: "Global Brands",
        desc: "Cross-border experiences.",
        icon: Globe,
        color: "#3B82F6", // Blue again or mixed
        image: "https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?auto=format&fit=crop&q=80&w=2340",
        className: "md:col-span-2 md:row-span-1",
    }
];

export default function IndustriesGrid() {
    const [activeId, setActiveId] = useState<number | null>(null);

    // Find active color
    const activeColor = industries.find(i => i.id === activeId)?.color || "#0a0a0a";

    return (
        <section className="relative py-24 overflow-hidden transition-colors duration-700 ease-in-out"
            style={{ backgroundColor: activeId ? activeColor : '#0a0a0a' }}
        >
            {/* Dynamic Background Overlay for smooth transition if needed */}
            <div className={`absolute inset-0 bg-neutral-950 transition-opacity duration-500 ${activeId ? 'opacity-0' : 'opacity-100'}`} />

            {/* Background Texture - Only visible when NO active ID or blended */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className={`mb-16 md:mb-20 flex flex-col md:flex-row items-end justify-between gap-6 transition-opacity duration-300 ${activeId ? 'opacity-0 pointer-events-none translate-y-[-10px]' : 'opacity-100'}`}>
                    <div>
                        <span className="text-brand-orange font-mono text-xs tracking-[0.2em] uppercase block mb-3">
                            Our Playground
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white font-[family-name:var(--font-syne)] leading-tight">
                            Industries We <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-600">Transform.</span>
                        </h2>
                    </div>
                    <div className="hidden md:block h-[1px] flex-1 bg-white/10 mx-10 mb-6" />
                    <p className="text-neutral-500 text-sm md:text-base max-w-xs">
                        Tailored strategies for high-impact sectors.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px] md:auto-rows-[280px]">
                    {industries.map((item, index) => (
                        <BentoCard
                            key={item.id}
                            item={item}
                            index={index}
                            activeId={activeId}
                            onHover={(id) => setActiveId(id)}
                            onLeave={() => setActiveId(null)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

interface IndustryItem {
    id: number;
    title: string;
    desc: string;
    icon: any;
    color: string;
    image: string;
    className: string;
}

function BentoCard({
    item,
    index,
    activeId,
    onHover,
    onLeave
}: {
    item: IndustryItem,
    index: number,
    activeId: number | null,
    onHover: (id: number) => void,
    onLeave: () => void
}) {
    // If ANY card is active, but THIS one is NOT, it should fade/hide
    const isOtherActive = activeId !== null && activeId !== item.id;
    const isActive = activeId === item.id;

    return (
        <motion.div
            layout // Smooth layout transitions if needed
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            onMouseEnter={() => onHover(item.id)}
            onMouseLeave={onLeave}
            className={`
                group relative overflow-hidden rounded-3xl cursor-pointer bg-neutral-900 border border-white/5
                ${item.className}
                transition-all duration-500 ease-out
                ${isOtherActive ? 'opacity-0 scale-90 blur-sm pointer-events-none' : 'opacity-100 scale-100'}
                ${isActive ? 'z-50 shadow-2xl scale-[1.02] !bg-transparent border-white/20' : ''}
            `}
        >
            {/* Background Image Area */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={`
                        object-cover transition-all duration-700 ease-out
                        ${isActive ? 'scale-110 grayscale-0 opacity-40' : 'scale-100 grayscale-[100%] opacity-60'}
                    `}
                    sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className={`
                    absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity duration-500
                    ${isActive ? 'opacity-30' : 'opacity-100'}
                `} />
            </div>

            {/* Content Container */}
            <div className="relative h-full z-20 p-6 md:p-8 flex flex-col justify-between">

                {/* Top Row */}
                <div className="flex justify-between items-start">
                    <div className={`
                        w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300
                        ${isActive
                            ? 'bg-white text-black border-white scale-110'
                            : 'bg-white/5 backdrop-blur-md border-white/10 text-zinc-300 group-hover:bg-white/10'}
                    `}>
                        <item.icon className="w-5 h-5" />
                    </div>

                    <div className={`
                        bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/5 transition-all duration-300
                        ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
                    `}>
                        <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                </div>

                {/* Bottom Row */}
                <div className={`transform transition-transform duration-500 ${isActive ? 'translate-y-0' : 'translate-y-2'}`}>
                    <h3 className="text-xl md:text-3xl font-bold text-white mb-2 font-[family-name:var(--font-syne)] tracking-tight">
                        {item.title}
                    </h3>
                    <p className={`
                        text-white/90 text-sm md:text-base leading-relaxed max-w-[90%] transition-all duration-500
                        ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                    `}>
                        {item.desc}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
