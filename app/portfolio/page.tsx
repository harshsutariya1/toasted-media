"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { projects } from "@/app/data/portfolio";

export default function PortfolioPage() {
    const [pattern, setPattern] = useState<'dots' | 'grid' | 'lines'>('grid');

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

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[350px]">
                        {projects.map((project, i) => (
                            <PortfolioCard key={project.id} project={project} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* NEW: Process Section */}
            <section className="py-32 bg-neutral-900 border-y border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,theme(colors.brand.orange/5%),transparent_50%)]" />

                <div className="max-w-[90rem] mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-start">
                        <div>
                            <span className="text-brand-orange font-mono tracking-wider uppercase text-sm mb-4 block">How We Work</span>
                            <h2 className="text-4xl md:text-6xl font-black font-[family-name:var(--font-faculty)] mb-8 leading-tight">
                                From concept to <br />
                                <span className="text-neutral-500">market dominance.</span>
                            </h2>
                            <p className="text-neutral-400 text-lg leading-relaxed max-w-md">
                                We don't just build websites; we build business assets. Our proven methodology ensures every pixel serves a purpose.
                            </p>
                        </div>

                        <div className="grid gap-8">
                            {[
                                {
                                    step: "01",
                                    title: "Discovery & Strategy",
                                    desc: "We dive deep into your business model, audience, and competitors to craft a roadmap for success."
                                },
                                {
                                    step: "02",
                                    title: "Design & Identity",
                                    desc: "Creating a visual language that resonates. We design interfaces that are beautiful, intuitive, and conversion-focused."
                                },
                                {
                                    step: "03",
                                    title: "Development",
                                    desc: "Clean, semantic, and high-performance code. We build scalable systems using the latest tech stacks."
                                },
                                {
                                    step: "04",
                                    title: "Launch & Growth",
                                    desc: "Rigorous testing, SEO optimization, and a seamless launch. We ensure you hit the ground running."
                                }
                            ].map((phase, i) => (
                                <div key={i} className="group flex gap-6 p-6 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors">
                                    <span className="text-2xl font-black text-brand-orange/50 font-[family-name:var(--font-faculty)] group-hover:text-brand-orange transition-colors">
                                        {phase.step}
                                    </span>
                                    <div>
                                        <h3 className="text-xl font-bold font-[family-name:var(--font-syne)] mb-2">{phase.title}</h3>
                                        <p className="text-neutral-400 text-sm leading-relaxed">{phase.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>



            <Footer />
        </main>
    );
}

function PortfolioCard({ project, index }: { project: any, index: number }) {
    return (
        <Link href={`/portfolio/${project.slug}`} className={`block ${project.className}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative h-full w-full overflow-hidden rounded-3xl bg-neutral-900 border border-white/5 cursor-pointer"
            >
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-8 flex flex-col justify-end">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-mono uppercase tracking-widest text-brand-orange bg-brand-orange/10 px-2 py-1 rounded">
                                {project.category}
                            </span>
                            <div className="bg-white text-black p-2 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                <ArrowUpRight size={16} />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2 font-[family-name:var(--font-syne)]">{project.title}</h3>
                        <p className="text-stone-400 text-sm max-w-[90%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                            {project.description}
                        </p>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
