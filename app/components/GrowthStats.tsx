"use client";


import { motion } from "framer-motion";
import { useMemo } from "react";

const KineticBar = ({ delay, color }: { delay: number; color: string }) => {
    const randomDuration = useMemo(() => 4 + Math.random() * 2, []);
    return (
        <div className="relative w-12 h-64 md:w-16 md:h-80 bg-white/5 rounded-full overflow-hidden shadow-[inset_0_2px_10px_0_rgba(255,255,255,0.05)] border border-white/10 backdrop-blur-sm">
            {/* Liquid Fill */}
            <motion.div
                animate={{ height: ["20%", "70%", "30%", "85%", "40%", "20%"] }}
                transition={{
                    duration: randomDuration,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: delay,
                    times: [0, 0.2, 0.4, 0.6, 0.8, 1]
                }}
                className={`absolute bottom-0 left-0 right-0 ${color} rounded-full opacity-90 blur-[0.5px]`}
            />
            {/* Bubbles effect inside liquid */}
            <motion.div
                animate={{ y: [0, -200], opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: delay + 0.5, ease: "linear" }}
                className="absolute bottom-0 left-1/2 w-2 h-2 bg-white/40 rounded-full"
            />
            <motion.div
                animate={{ y: [0, -200], opacity: [0, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: delay + 1.5, ease: "linear" }}
                className="absolute bottom-4 left-1/3 w-3 h-3 bg-white/30 rounded-full"
            />

            {/* Glass Shine */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-30 pointer-events-none rounded-full" />
            <div className="absolute top-2 left-2 w-1/3 h-16 bg-gradient-to-b from-white to-transparent opacity-40 rounded-full blur-[2px]" />
        </div>
    );
};

export default function GrowthStats() {
    return (
        <section id="about" className="relative py-16 md:py-24 bg-neutral-900 border-y border-neutral-800 font-sans overflow-hidden">
            {/* Background Video */}
            {/* Background Gradient */}
            <div className="absolute inset-0 w-full h-full z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/30 to-neutral-900" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
                    {/* Artistic "Heat" Visualization */}
                    <motion.div
                        className="w-full md:w-1/2 relative flex items-center justify-center"
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <div className="relative p-6 md:p-10 bg-black/40 backdrop-blur-3xl rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-2xl shadow-brand-orange/5 flex gap-3 md:gap-6 transform scale-90 md:scale-100 origin-center">
                            {/* Decorative Background Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-brand-blue/10 via-brand-purple/5 to-brand-orange/10 blur-3xl -z-10 rounded-full animate-pulse-slow" />

                            <KineticBar delay={0} color="bg-gradient-to-t from-brand-blue to-cyan-400" />
                            <KineticBar delay={0.5} color="bg-gradient-to-t from-brand-purple to-fuchsia-400" />
                            <KineticBar delay={0.2} color="bg-gradient-to-t from-brand-orange to-amber-300" />
                            <KineticBar delay={0.7} color="bg-gradient-to-t from-brand-yellow to-yellow-200" />

                            {/* Floating "Result" Card */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -right-2 top-4 md:-right-4 md:top-12 bg-neutral-900/80 backdrop-blur-xl border border-white/20 p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl z-20 scale-90 md:scale-100 origin-top-right"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M16 12l-4-4-4 4" /><path d="M12 16V8" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest leading-none mb-1">Potential</p>
                                        <p className="text-xl font-bold text-white leading-none">Limitless</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        className="w-full md:w-1/2"
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-7xl font-serif font-black mb-6 md:mb-8 leading-tight md:leading-none text-white">
                            Marketing was <span className="text-neutral-500 line-through decoration-brand-orange decoration-2 md:decoration-4">stale.</span><br />
                            So we turned up <span className="text-brand-orange">the heat.</span>
                        </h2>
                        <div className="space-y-6 text-lg text-neutral-300 leading-relaxed font-light">
                            <p>
                                <strong className="text-white font-bold">The Toasted Origin:</strong> Most agencies give you vanilla. Safe. Predictable. We realized that in a feed scrolling at 60mph, &quot;safe&quot; is invisible.
                            </p>
                            <p>
                                We founded Toasted Media on a simple principle: <span className="bg-brand-yellow/30 px-1 font-medium text-white">Be bold or go home.</span> We layer strategy, creative, and data just like our logo layers color—creating a complex, rich, and undeniable presence for your brand.
                            </p>
                            <div className="pt-6 grid grid-cols-2 gap-y-8 gap-x-4 md:gap-x-8">
                                <div className="flex flex-col">
                                    <span className="text-4xl font-bold font-serif text-brand-blue">100%</span>
                                    <span className="text-xs md:text-sm uppercase tracking-wide text-neutral-400">Fresh Ideas</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-4xl font-bold font-serif text-brand-purple">0%</span>
                                    <span className="text-xs md:text-sm uppercase tracking-wide text-neutral-400">Boring Content</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-4xl font-bold font-serif text-brand-orange">24/7</span>
                                    <span className="text-xs md:text-sm uppercase tracking-wide text-neutral-400">Obsession</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-4xl font-bold font-serif text-brand-yellow">3</span>
                                    <span className="text-xs md:text-sm uppercase tracking-wide text-neutral-400">Core Layers</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
