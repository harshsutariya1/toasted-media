"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ContactSection from '@/app/components/ContactSection';
import { services } from '@/app/data/services';
import { notFound } from 'next/navigation';

interface ServicePageClientProps {
    slug: string;
}

export default function ServicePageClient({ slug }: ServicePageClientProps) {
    const service = services.find(s => s.slug === slug);

    if (!service) {
        notFound();
    }

    const [pattern, setPattern] = useState<'dots' | 'grid' | 'lines'>('grid');
    // Carousel layout is not relevant here but Navbar expects it
    const [carouselLayout, setCarouselLayout] = useState<'cinematic' | 'classic' | 'columns' | 'seamless'>('cinematic');

    return (
        <main className="min-h-screen bg-neutral-900 text-white font-sans selection:bg-brand-orange/30">
            <Navbar
                pattern={pattern}
                setPattern={setPattern}
                carouselLayout={carouselLayout}
                setCarouselLayout={setCarouselLayout}
            />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
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

                <div className="container mx-auto px-6 relative z-10">
                    <Link href="/#services" className="inline-flex items-center gap-2 text-neutral-400 hover:text-brand-orange transition-colors mb-8 md:mb-12 group">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium text-sm tracking-wide uppercase">Back to Services</span>
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <span className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 text-brand-orange text-xs font-bold tracking-widest uppercase mb-6">
                                {service.category}
                            </span>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-syne)] leading-tight mb-6">
                                {service.title}
                            </h1>
                            <p className="text-lg md:text-xl text-neutral-400 leading-relaxed max-w-lg mb-10">
                                {service.description}
                            </p>

                            <div className="flex gap-4">
                                <Link
                                    href="/#contact"
                                    className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-colors inline-block"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border border-white/10"
                        >
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                            {/* Floating Icon */}
                            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-neutral-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-brand-orange shadow-lg">
                                {React.cloneElement(service.icon as React.ReactElement<{ size?: number; className?: string }>, { size: 32, className: "w-8 h-8" })}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Content Placeholder / Details */}
            <section className="py-20 bg-neutral-950">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-syne)] mb-8">
                        Why Choose Our {service.title}?
                    </h2>
                    <div className="prose prose-invert prose-lg max-w-none text-neutral-400">
                        <p className="mb-6">
                            Since this is a generated page for the "{service.title}" service, we can elaborate on the specifics here.
                            Imagine a detailed breakdown of the process, case studies, and specific technologies used.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mb-8 text-neutral-300">
                            <li>Comprehensive strategy tailored to your business goals.</li>
                            <li>Execution by industry experts with proven track records.</li>
                            <li>transparent reporting and analytics.</li>
                            <li>Continuous optimization and support.</li>
                        </ul>
                        <p>
                            We treat every project as a partnership, ensuring that our {service.title} services align perfectly with your broader vision.
                        </p>
                    </div>
                </div>
            </section>

            <ContactSection />
            <Footer />
        </main>
    );
}
