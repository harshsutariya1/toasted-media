"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import ServicesCloud from './ServicesCloud';
import { services, Service } from '@/app/data/services';

const ServicesSection = () => {
    return (
        <section className="bg-neutral-900 min-h-screen text-white font-[family-name:var(--font-inter)] selection:bg-brand-orange selection:text-white py-16 md:py-24 relative overflow-hidden" id="services">
            {/* Header Section */}
            <div className="px-6 pb-20 max-w-[90rem] mx-auto">
                <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <span className="text-brand-orange font-mono tracking-wider uppercase text-sm mb-2 block">Our Expertise</span>
                        <h2 className="text-3xl md:text-6xl font-bold text-white tracking-tight font-[family-name:var(--font-syne)]">
                            Services designed <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
                                to ignite growth.
                            </span>
                        </h2>
                    </div>
                    <p className="text-neutral-400 max-w-md text-lg leading-relaxed">
                        We don&apos;t just execute; we strategize. Our suite of services covers every touchpoint of the modern digital customer journey.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>

                {/* Interactive Services Cloud - Only PC/Laptops */}
                <div className="hidden md:block">
                    <ServicesCloud />
                </div>
            </div>

        </section>
    );
};

const ServiceCard = ({ service }: { service: Service }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href={`/services/${service.slug}`} className="block w-full h-full">
            <div
                className="group relative h-[320px] md:h-[400px] w-full overflow-hidden border border-neutral-800 bg-neutral-900 cursor-pointer rounded-2xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Background Image with Zoom Effect */}
                <motion.div
                    className="absolute inset-0 w-full h-full"
                    animate={{
                        scale: isHovered ? 1.15 : 1,
                    }}
                    transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }} // Bezier for smooth luxury feel
                >
                    <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
                </motion.div>

                {/* Content Container */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10">

                    {/* Top: Icon & Category */}
                    <div className="flex justify-between items-start translate-y-0 transition-transform duration-500">
                        <div className="bg-white/10 backdrop-blur-md p-2 md:p-3 rounded-full text-white group-hover:bg-brand-orange group-hover:text-black transition-colors duration-300">
                            {service.icon}
                        </div>
                        <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase border border-white/20 px-3 py-1 rounded-full text-white/70 font-[family-name:var(--font-syne)]">
                            {service.category}
                        </span>
                    </div>

                    {/* Bottom: Title & Description */}
                    <div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3 text-white group-hover:text-brand-orange transition-colors duration-300 font-[family-name:var(--font-syne)] uppercase leading-none">
                            {service.title}
                        </h3>

                        <div className="overflow-hidden">
                            <motion.p
                                className="text-neutral-300 text-sm leading-relaxed max-w-[90%]"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: isHovered ? 1 : 0.7, // Always visible enough
                                    y: 0
                                }}
                                transition={{ duration: 0.4 }}
                            >
                                {service.description}
                            </motion.p>
                        </div>

                        {/* Learn More Line Animation - Visible by default on Mobile */}
                        <div className="mt-4 md:mt-6 flex items-center gap-2 text-sm font-bold text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-300">
                            <span className="font-[family-name:var(--font-syne)] tracking-widest">EXPLORE</span>
                            <div className="h-[1px] w-8 bg-brand-orange" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ServicesSection;
