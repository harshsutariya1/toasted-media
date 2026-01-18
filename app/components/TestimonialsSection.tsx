"use client";

import { motion, useAnimationFrame, useMotionValue, animate } from "framer-motion";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const testimonials = [
    {
        quote: <><span className="font-[family-name:var(--font-faculty)]">The Toasted Media</span> turned our vague vision into a digital masterpiece. The ROI has been undeniable.</>,
        author: "Sarah Johnson",
        role: "CMO @ TechFlow",
        image: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
        quote: "They don't just build websites; they build brand engines. Our conversion rate doubled in 3 months.",
        author: "Michael Chen",
        role: "Founder @ GreenEarth",
        image: "https://randomuser.me/api/portraits/men/44.jpg"
    },
    {
        quote: "Finally, an agency that understands 'premium' isn't just a buzzword—it's a standard.",
        author: "Emily Davis",
        role: "Director @ StyleStudio",
        image: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
        quote: "The team operates at a speed and quality level I haven't seen elsewhere. Pure excellence.",
        author: "David Wilson",
        role: "VP @ NovaSystems",
        image: "https://randomuser.me/api/portraits/men/86.jpg"
    },
    {
        quote: "From the initial pitch to the final launch, every interaction was professional and inspiring.",
        author: "Jessica Lee",
        role: "CEO @ UrbanArchitects",
        image: "https://randomuser.me/api/portraits/women/24.jpg"
    }
];

// Duplicate for infinite loop
const marqueeTestimonials = [...testimonials, ...testimonials];

export default function TestimonialsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [contentWidth, setContentWidth] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            // Half because we doubled the items
            setContentWidth(containerRef.current.scrollWidth / 2);
        }
    }, []);

    const x = useMotionValue(0);
    const isAnimating = useRef(false);

    // Auto scroll speed (pixels per frame)
    const speed = 0.8;

    useAnimationFrame(() => {
        if (!contentWidth || isAnimating.current) return;

        let newX = x.get() - speed;
        // Wrap logic
        if (newX <= -contentWidth) {
            newX += contentWidth;
        } else if (newX > 0) {
            newX -= contentWidth;
        }
        x.set(newX);
    });

    const scrollManual = (direction: 'left' | 'right') => {
        if (!contentWidth) return;
        isAnimating.current = true;

        const currentX = x.get();
        // Scroll amount: slightly more than card width
        const scrollAmount = direction === 'left' ? 400 : -400;
        const targetX = currentX + scrollAmount;

        animate(x, targetX, {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            onComplete: () => {
                isAnimating.current = false;
            }
        });
    };

    return (
        <section className="py-24 md:py-32 bg-neutral-900 relative overflow-hidden border-t border-neutral-800">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800/30 via-neutral-900/0 to-neutral-900 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 mb-20 text-center">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-brand-orange font-mono text-xs md:text-sm tracking-[0.3em] uppercase mb-4 block"
                >
                    Social Proof
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    DON&apos;T TAKE OUR <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-600">WORD FOR IT.</span>
                </motion.h2>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full overflow-hidden">
                {/* Fade Edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-neutral-900 to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-neutral-900 to-transparent z-20 pointer-events-none" />

                <motion.div
                    ref={containerRef}
                    className="flex gap-6 md:gap-8 w-max pl-6 md:pl-0"
                    style={{ x }}
                >
                    {marqueeTestimonials.map((t, index) => (
                        <div
                            key={index}
                            className="w-[300px] md:w-[450px] flex-shrink-0 group"
                        >
                            <div className="h-full p-8 md:p-10 rounded-[2rem] bg-neutral-800/30 backdrop-blur-md border border-white/5 hover:border-brand-orange/30 hover:bg-neutral-800/50 transition-all duration-500 relative flex flex-col justify-between">
                                {/* Quote Icon Background */}
                                <Quote className="absolute top-8 right-8 text-white/5 w-12 h-12 rotate-180 group-hover:text-brand-orange/10 transition-colors duration-500" />

                                <div className="relative z-10">
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-brand-orange fill-brand-orange" />
                                        ))}
                                    </div>
                                    <p className="text-xl md:text-2xl font-[family-name:var(--font-syne)] font-medium text-neutral-200 leading-normal mb-8">
                                        &quot;{t.quote}&quot;
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 relative z-10 border-t border-white/5 pt-6 group-hover:border-white/10 transition-colors duration-500">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 group-hover:border-brand-orange/50 transition-colors duration-500 relative">
                                        <Image src={t.image} alt={t.author} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" sizes="48px" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold tracking-wide uppercase text-sm">{t.author}</h4>
                                        <p className="text-xs text-neutral-500 font-mono tracking-wider mt-1">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Navigation Buttons - Aesthetic Pill Design */}
            <div className="flex justify-center mt-16 relative z-20">
                <div className="flex items-center bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-full p-2 shadow-2xl ring-1 ring-white/5">
                    <button
                        onClick={() => scrollManual('left')}
                        className="w-16 h-16 flex items-center justify-center rounded-full text-neutral-400 hover:text-brand-orange hover:bg-white/5 transition-all duration-300 active:scale-90 group"
                        aria-label="Previous testimonial"
                    >
                        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </button>

                    <div className="w-[1px] h-8 bg-white/5 mx-2" />

                    <button
                        onClick={() => scrollManual('right')}
                        className="w-16 h-16 flex items-center justify-center rounded-full text-neutral-400 hover:text-brand-orange hover:bg-white/5 transition-all duration-300 active:scale-90 group"
                        aria-label="Next testimonial"
                    >
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
}
