"use client";

import { motion } from "framer-motion";
import { ArrowRight, Instagram, Send, TrendingUp } from "lucide-react";
import { useState } from "react";

const interests = [
    "Social Media Management",
    "Performance Marketing",
    "Content Creation",
    "Web Development",
    "Brand Strategy",
    "Other"
];

const SocialLink = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
    <a
        href={href}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 group"
    >
        <div className="group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
    </a>
);

const FloatingInput = ({ label, type = "text", textarea = false }: { label: string; type?: string; textarea?: boolean }) => {
    return (
        <div className="relative group">
            {textarea ? (
                <textarea
                    placeholder=" "
                    className="block w-full px-4 py-4 bg-transparent border border-white/20 rounded-xl text-white outline-none focus:border-orange-500 transition-colors peer resize-none h-32"
                />
            ) : (
                <input
                    type={type}
                    placeholder=" "
                    className="block w-full px-4 py-4 bg-transparent border border-white/20 rounded-xl text-white outline-none focus:border-orange-500 transition-colors peer"
                />
            )}
            <label className="absolute left-4 top-4 text-neutral-400 transition-all duration-300 pointer-events-none peer-focus:-translate-y-7 peer-focus:bg-neutral-900 peer-focus:px-2 peer-focus:text-xs peer-focus:text-orange-500 peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:bg-neutral-900 peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-white">
                {label}
            </label>
        </div>
    );
};

export default function ContactSection() {
    const [activeInterest, setActiveInterest] = useState<string | null>(null);

    return (
        <section id="contact" className="py-24 bg-neutral-900 relative overflow-hidden font-sans">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32 relative z-10">

                {/* Left Column: Information */}
                <div className="flex flex-col justify-between">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-orange-500 font-sans text-sm tracking-widest uppercase mb-6 block font-bold">Contact Us</span>
                        <h2 className="text-5xl md:text-7xl font-serif font-medium leading-tight mb-8 text-white">
                            Got a vision? <br />
                            Let’s <span className="italic text-neutral-500 font-serif">ignite</span> it.
                        </h2>
                        <p className="text-neutral-400 text-lg max-w-md mb-12 leading-relaxed">
                            We help ambitious brands scale through creative strategy and data-driven execution.
                            Ready to start?
                        </p>

                        <div className="flex flex-col gap-6">
                            <a href="mailto:hello@toastedmediaagency.com" className="text-3xl md:text-4xl text-white hover:text-orange-500 transition-colors font-serif border-b border-white/20 hover:border-orange-500 pb-2 w-fit">
                                hello@toastedmediaagency.com
                            </a>
                            <p className="text-neutral-500 text-xl font-sans">+91 987-654-3210</p>
                        </div>
                    </motion.div>

                    <div className="mt-16 flex gap-6">
                        <SocialLink icon={<Instagram className="w-5 h-5" />} href="#" />
                        <SocialLink icon={<TrendingUp className="w-5 h-5" />} href="#" />
                        <SocialLink icon={<Send className="w-5 h-5" />} href="#" />
                    </div>
                </div>

                {/* Right Column: Interactive Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl relative overflow-hidden group"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-orange-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

                    <form className="space-y-8">
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FloatingInput label="Your Name" />
                                <FloatingInput label="Email Address" type="email" />
                            </div>
                            <FloatingInput label="Company Website" />

                            <div>
                                <label className="block text-sm text-neutral-400 mb-4 font-sans tracking-wide">I'm interested in...</label>
                                <div className="flex flex-wrap gap-3">
                                    {interests.map((interest) => (
                                        <button
                                            key={interest}
                                            type="button"
                                            onClick={() => setActiveInterest(interest)}
                                            className={`px-4 py-2 rounded-full text-sm border transition-all duration-300 ${activeInterest === interest
                                                ? 'bg-white text-black border-white'
                                                : 'bg-transparent text-neutral-400 border-white/20 hover:border-white/50'
                                                }`}
                                        >
                                            {interest}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <FloatingInput label="Tell us about your project" textarea />
                        </div>

                        <button type="submit" className="w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-orange-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                            Send Message <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </motion.div>

            </div>
        </section>
    );
}
