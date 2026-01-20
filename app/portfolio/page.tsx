"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

// Portfolio Data
const projects = [
    {
        id: 1,
        title: "Lumina Financial",
        category: "FinTech",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2340",
        className: "md:col-span-2 md:row-span-2",
        description: "Reimagining the future of digital banking with a user-centric dashboard."
    },
    {
        id: 2,
        title: "Vogue Estate",
        category: "Real Estate",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=2173",
        className: "md:col-span-1 md:row-span-2",
        description: "Immersive 3D property tours for luxury market listings."
    },
    {
        id: 3,
        title: "Bloom Wellness",
        category: "Healthcare",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2340",
        className: "md:col-span-1 md:row-span-1",
        description: "Patient-first digital care platform."
    },
    {
        id: 4,
        title: "Urban Threads",
        category: "E-Commerce",
        image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=2340",
        description: "High-conversion storefront for modern streetwear.",
        className: "md:col-span-1 md:row-span-1",
    },
    {
        id: 5,
        title: "Nova SaaS",
        category: "Tech",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426",
        description: "Scalable analytics dashboard for enterprise teams.",
        className: "md:col-span-2 md:row-span-1",
    },
    {
        id: 6,
        title: "Global Logistics",
        category: "Logistics",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2340",
        description: "Connecting the world with streamlined logistics solutions.",
        className: "md:col-span-1 md:row-span-1",
    }
];

export default function PortfolioPage() {
    const [pattern, setPattern] = useState<'dots' | 'grid'>('grid');

    return (
        <main className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-brand-orange/30">
            <Navbar pattern={pattern} setPattern={setPattern} />

            <section className="pt-32 pb-24 px-6 relative">
                <div className="max-w-[90rem] mx-auto">
                    <div className="mb-20">
                        <span className="text-brand-orange font-mono tracking-wider uppercase text-sm mb-4 block">Selected Works</span>
                        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tight font-[family-name:var(--font-faculty)] mb-6">
                            Constructing <br />
                            <span className="text-stone-600">Digital Legacies.</span>
                        </h1>
                        <p className="text-stone-400 max-w-2xl text-lg md:text-xl leading-relaxed">
                            A curated selection of projects where we defined brands, built platforms, and accelerated growth.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
                        {projects.map((project, i) => (
                            <PortfolioCard key={project.id} project={project} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

function PortfolioCard({ project, index }: { project: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`group relative overflow-hidden rounded-3xl bg-neutral-900 border border-white/5 cursor-pointer ${project.className}`}
        >
            <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-8 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-mono uppercase tracking-widest text-brand-orange bg-brand-orange/10 px-2 py-1 rounded">
                            {project.category}
                        </span>
                        <ArrowUpRight className="text-white opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2 font-[family-name:var(--font-syne)]">{project.title}</h3>
                    <p className="text-stone-400 text-sm max-w-[90%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {project.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
