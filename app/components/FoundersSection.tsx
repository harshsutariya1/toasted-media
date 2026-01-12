"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter, ArrowUpRight } from "lucide-react";

const founders = [
    {
        name: "Suhani Panchal",
        role: "CEO & Co-Founder",
        bio: "Strategist with a vision for disrupting the digital landscape. Guiding brands toward sustainable growth.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000",
        socials: {
            linkedin: "#",
            twitter: "#"
        }
    },
    {
        name: "Rohan Mehta",
        role: "CTO & Co-Founder",
        bio: "The technical backbone. Architecting scalable solutions that blend performance with aesthetic perfection.",
        image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=1000", // Placeholder for Harsh if no real image
        socials: {
            linkedin: "#",
            twitter: "#"
        }
    },
    {
        name: "Aryan Sharma",
        role: "Creative Director",
        bio: "Design maverick pushing the boundaries of visual storytelling. turning concepts into digital art.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000",
        socials: {
            linkedin: "#",
            twitter: "#"
        }
    }
];

export default function FoundersSection() {
    return (
        <section className="py-24 md:py-32 bg-neutral-900 border-t border-neutral-800 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-orange/5 via-neutral-900 to-neutral-900 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-brand-orange font-mono text-xs md:text-sm tracking-[0.3em] uppercase mb-4 block"
                        >
                            The Visionaries
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-[family-name:var(--font-syne)]"
                        >
                            MEET THE <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 to-neutral-600">MINDS.</span>
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="max-w-md"
                    >
                        <p className="text-neutral-400 text-lg leading-relaxed">
                            We are a collective of strategists, designers, and engineers united by a single obsession: creating digital legacy.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {founders.map((founder, index) => (
                        <FounderCard key={index} founder={founder} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FounderCard({ founder, index }: { founder: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="group relative"
        >
            <div className="relative h-[500px] w-full rounded-[2rem] overflow-hidden bg-neutral-800 border border-white/5 shadow-2xl transition-all duration-500 hover:shadow-brand-orange/10 hover:border-white/10">

                {/* Image */}
                <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700 ease-out">
                    <img
                        src={founder.image}
                        alt={founder.name}
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700"
                    />
                </div>

                {/* Gradient Overlay - Always present but changes on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                {/* Social Links (Top Right) */}
                <div className="absolute top-6 right-6 flex flex-col gap-3 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                    <a href={founder.socials.linkedin} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors border border-white/10">
                        <Linkedin className="w-4 h-4" />
                    </a>
                    <a href={founder.socials.twitter} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors border border-white/10">
                        <Twitter className="w-4 h-4" />
                    </a>
                </div>

                {/* Content (Bottom) */}
                <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="overflow-hidden mb-2">
                        <span className="text-brand-orange font-mono text-xs tracking-widest uppercase block mb-1">
                            {founder.role}
                        </span>
                        <h3 className="text-3xl font-bold text-white font-[family-name:var(--font-syne)] mb-4">
                            {founder.name}
                        </h3>
                    </div>

                    <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
                        <p className="text-neutral-300 text-sm leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            {founder.bio}
                        </p>
                        <a href="#" className="inline-flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider group/link hover:text-brand-orange transition-colors">
                            Read Profile <ArrowUpRight className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Border Lines Decoration */}
            <div className="absolute -inset-[1px] rounded-[2rem] border border-white/10 pointer-events-none group-hover:border-brand-orange/30 transition-colors duration-500" />
        </motion.div>
    );
}
