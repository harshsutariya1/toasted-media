"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Project } from "@/app/data/portfolio";

export default function ProjectClient({ project }: { project: Project }) {
    const [pattern, setPattern] = useState<'dots' | 'grid' | 'lines'>('grid');

    return (
        <main className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-brand-orange/30 relative">
            <Navbar pattern={pattern} setPattern={setPattern} />

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20 pointer-events-none fixed z-0">
                {pattern === 'dots' && (
                    <div className="absolute inset-0 bg-[radial-gradient(#404040_1px,transparent_1px)] [background-size:20px_20px]" />
                )}
                {pattern === 'grid' && (
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#404040_1px,transparent_1px),linear-gradient(to_bottom,#404040_1px,transparent_1px)] [background-size:24px_24px]" />
                )}
                {pattern === 'lines' && (
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_23px,#404040_23px,#404040_24px)]" />
                )}
            </div>

            {/* Hero Section */}
            <section className="pt-32 pb-12 px-6 relative z-10">
                <div className="max-w-[90rem] mx-auto">
                    <Link
                        href="/portfolio"
                        className="inline-flex items-center gap-2 text-neutral-400 hover:text-brand-orange transition-colors mb-8 group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-mono text-sm uppercase tracking-wider">Back to Work</span>
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-end mb-16">
                        <div>
                            <span className="text-brand-orange font-mono tracking-wider uppercase text-sm mb-4 block">
                                {project.category}
                            </span>
                            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight font-[family-name:var(--font-faculty)] mb-6 leading-none">
                                {project.title}
                            </h1>
                        </div>
                        <div className="flex flex-col gap-8 text-neutral-400">
                            <p className="text-xl leading-relaxed">
                                {project.description}
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
                                <div>
                                    <span className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Client</span>
                                    <span className="text-white font-medium">{project.client}</span>
                                </div>
                                <div>
                                    <span className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Year</span>
                                    <span className="text-white font-medium">{project.year}</span>
                                </div>
                                <div>
                                    <span className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Services</span>
                                    <ul className="text-white font-medium">
                                        {project.services.map(s => <li key={s}>{s}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Image */}
                    <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 mb-24">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Challenge & Solution */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 mb-32">
                        <div>
                            <h2 className="text-2xl font-bold font-[family-name:var(--font-syne)] mb-6">The Challenge</h2>
                            <p className="text-neutral-400 text-lg leading-relaxed">
                                {project.challenge || "Every project starts with a problem. Our goal was to identify the core friction points and address them with design and technology."}
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold font-[family-name:var(--font-syne)] mb-6">Our Solution</h2>
                            <p className="text-neutral-400 text-lg leading-relaxed">
                                {project.solution || "We crafted a bespoke digital experience that not only solved the immediate issues but positioned the brand for future growth."}
                            </p>
                        </div>
                    </div>

                    {/* Results / Stats */}
                    {project.results && project.results.length > 0 && (
                        <div className="bg-neutral-900 rounded-3xl p-12 md:p-24 mb-32 border border-white/5">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                                {project.results.map((res, i) => (
                                    <div key={i} className="flex flex-col gap-2">
                                        <span className="text-6xl md:text-8xl font-black text-white font-[family-name:var(--font-faculty)]">
                                            {res.value}
                                        </span>
                                        <span className="text-brand-orange font-mono uppercase tracking-widest text-sm">
                                            {res.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Gallery */}
                    {project.gallery && project.gallery.length > 0 && (
                        <div className="space-y-8 mb-32">
                            {project.gallery.map((img, i) => (
                                <div key={i} className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10">
                                    <Image
                                        src={img}
                                        alt={`${project.title} screenshot ${i + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Testimonial */}
                    {project.testimonial && (
                        <div className="max-w-4xl mx-auto text-center mb-32 relative">
                            <div className="text-6xl text-brand-orange opacity-20 absolute -top-8 -left-8 font-serif">"</div>
                            <blockquote className="text-3xl md:text-5xl font-bold leading-tight mb-8 font-[family-name:var(--font-syne)]">
                                {project.testimonial.quote}
                            </blockquote>
                            <cite className="not-italic flex flex-col items-center gap-1">
                                <span className="text-white font-bold">{project.testimonial.author}</span>
                                <span className="text-neutral-500 text-sm uppercase tracking-wider">{project.testimonial.role}</span>
                            </cite>
                        </div>
                    )}

                    {/* Tech Stack */}
                    {project.technologies && (
                        <div className="border-t border-white/10 pt-16 mb-24">
                            <h3 className="text-sm font-mono uppercase tracking-widest text-neutral-500 mb-8 text-center">Technologies Used</h3>
                            <div className="flex flex-wrap justify-center gap-4">
                                {project.technologies.map(tech => (
                                    <span key={tech} className="px-6 py-3 bg-white/5 rounded-full border border-white/10 text-neutral-300">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA */}
                    <div className="bg-brand-orange rounded-3xl p-12 md:p-24 text-center text-black relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-black mb-6 font-[family-name:var(--font-faculty)]">
                                Ready to build your legacy?
                            </h2>
                            <Link href="/#contact" className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-neutral-800 transition-colors">
                                Start a Project <ArrowUpRight size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
