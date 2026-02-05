"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, GalleryHorizontal, LayoutTemplate, Columns, Film } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Grid3X3, CircleDot, Minus } from "lucide-react";

interface NavbarProps {
    pattern: 'dots' | 'grid' | 'lines';
    setPattern: (pattern: 'dots' | 'grid' | 'lines') => void;
    carouselLayout?: 'cinematic' | 'classic' | 'columns' | 'seamless';
    setCarouselLayout?: (layout: 'cinematic' | 'classic' | 'columns' | 'seamless') => void;
}

export default function Navbar({ pattern, setPattern, carouselLayout = 'cinematic', setCarouselLayout }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Scroll effect logic (kept same as before)
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const links = [
        { name: "Services", href: "/#services" },
        { name: "Portfolio", href: "/portfolio" },
        { name: "Process", href: "/#process" },
    ];

    {/* Footer Links & Toggles */ }
    <div className="px-6 pb-6 pt-2 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs font-semibold text-neutral-500 uppercase tracking-widest border-t border-dashed border-white/10 mt-2 gap-4 md:gap-0">
        <span>© 2025 Toasted Media</span>

        {/* Pattern Toggle */}
        <div className="flex items-center gap-3 bg-white/5 rounded-full p-1 border border-white/5">
            <button
                onClick={() => setPattern('dots')}
                className={`p-2 rounded-full transition-all ${pattern === 'dots' ? 'bg-neutral-700 text-brand-orange shadow-sm' : 'hover:bg-white/5 text-neutral-500 hover:text-white'}`}
                title="Dot Pattern"
            >
                <CircleDot size={14} />
            </button>
            <button
                onClick={() => setPattern('grid')}
                className={`p-2 rounded-full transition-all ${pattern === 'grid' ? 'bg-neutral-700 text-brand-orange shadow-sm' : 'hover:bg-white/5 text-neutral-500 hover:text-white'}`}
                title="Grid Pattern"
            >
                <Grid3X3 size={14} />
            </button>
        </div>

        <div className="flex gap-4">
            <a href="#" className="hover:text-brand-orange transition-colors">Instagram</a>
            <a href="#" className="hover:text-brand-orange transition-colors">Twitter</a>
        </div>
    </div>

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
            <motion.nav
                className={`
                    pointer-events-auto
                    relative
                    backdrop-blur-2xl
                    border border-white/10
                    shadow-xl shadow-black/20
                    overflow-hidden
                    transition-[width,background-color,backdrop-filter] duration-500 ease-in-out
                    ${isMenuOpen
                        ? "w-[95vw] md:w-[600px] rounded-3xl bg-neutral-950/90 backdrop-blur-3xl"
                        : `w-[90vw] md:w-auto rounded-full pr-2 ${scrolled ? "py-1 bg-neutral-950/50 backdrop-blur-xl" : "py-2 bg-neutral-950/30 backdrop-blur-md"}`
                    }
                `}
            >
                {/* Main Bar (Always Visible parts) */}
                <div className={`flex items-center justify-between ${isMenuOpen ? "p-3 pr-4" : "pl-3 pr-1 md:pr-0 p-0"}`}>

                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-3 group shrink-0">
                        <div className="w-9 h-9 md:w-10 md:h-10 bg-neutral-800 rounded-full flex items-center justify-center overflow-hidden shadow-sm border border-neutral-700 relative">
                            <Image src="/logo/logo2.jpg" alt="Logo" fill className="object-cover" />
                        </div>
                        <span className={`font-[family-name:var(--font-faculty)] font-medium text-lg tracking-tight text-white group-hover:text-brand-orange transition-colors ${isMenuOpen ? "block" : "hidden sm:block"}`}>
                            The Toasted Media
                        </span>
                    </Link>

                    {/* Desktop Horizontal Links (Visible only when menu is closed on Desktop) */}
                    {!isMenuOpen && (
                        <div className="hidden md:flex items-center gap-1 mx-4">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="px-4 py-2 rounded-full text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/5 transition-all"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2">

                        {/* 'Let's Talk' Button - Visible on mobile now too, but distinct style */}
                        <AnimatePresence>
                            {!isMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                >
                                    <Link
                                        href="/#contact"
                                        className="flex bg-white text-neutral-900 px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-bold items-center gap-2 hover:bg-neutral-200 transition-colors mr-1 whitespace-nowrap cursor-pointer"
                                    >
                                        <span>Let&apos;s Talk</span>
                                        <ArrowRight size={14} className="-rotate-45 md:rotate-0" />
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Hamburger Toggle */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center transition-colors focus:outline-none shrink-0 border border-white/5"
                            aria-label="Toggle Menu"
                        >
                            <AnimatePresence mode="wait">
                                {isMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
                                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                        exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X size={18} className="text-white" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ scale: 0.5, rotate: 90, opacity: 0 }}
                                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                        exit={{ scale: 0.5, rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu size={18} className="text-white" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>

                {/* Expanded Menu Content (Dropdown) */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <div className="p-4 pt-2 flex flex-col md:flex-row gap-6">
                                {/* Navigation Links List */}
                                <div className="flex flex-col gap-2 flex-1">
                                    {[...links, { name: "Contact", href: "/contact" }].map((link, i) => (
                                        <motion.div
                                            key={link.name}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.1 + i * 0.05 }}
                                            className="w-full"
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsMenuOpen(false)}
                                                className="group flex items-center justify-between p-4 rounded-3xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer bg-white/5 md:bg-transparent w-full"
                                            >
                                                <span className="text-lg md:text-2xl font-serif text-neutral-300 group-hover:text-white font-[family-name:var(--font-syne)]">
                                                    {link.name}
                                                </span>
                                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
                                                    <ArrowRight size={16} className="text-brand-orange" />
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}

                                    {/* Pattern Toggle Mobile Location */}
                                    <div className="flex items-center gap-3 mt-4 pl-4">
                                        <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest mr-2">Theme</span>
                                        <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5">
                                            <button
                                                onClick={() => setPattern('dots')}
                                                className={`p-2 rounded-full transition-all ${pattern === 'dots' ? 'bg-neutral-700 text-brand-orange shadow-sm' : 'hover:bg-white/5 text-neutral-500 hover:text-white'}`}
                                                title="Dot Pattern"
                                            >
                                                <CircleDot size={14} />
                                            </button>
                                            <button
                                                onClick={() => setPattern('grid')}
                                                className={`p-2 rounded-full transition-all ${pattern === 'grid' ? 'bg-neutral-700 text-brand-orange shadow-sm' : 'hover:bg-white/5 text-neutral-500 hover:text-white'}`}
                                                title="Grid Pattern"
                                            >
                                                <Grid3X3 size={14} />
                                            </button>
                                            <button
                                                onClick={() => setPattern('lines')}
                                                className={`p-2 rounded-full transition-all ${pattern === 'lines' ? 'bg-neutral-700 text-brand-orange shadow-sm' : 'hover:bg-white/5 text-neutral-500 hover:text-white'}`}
                                                title="Lines Pattern"
                                            >
                                                <Minus size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Layout Toggle (Only if setCarouselLayout is provided) */}
                                    {setCarouselLayout && (
                                        <div className="flex items-center gap-3 mt-4 pl-4">
                                            <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest mr-2">Layout</span>
                                            <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5">
                                                <button
                                                    onClick={() => setCarouselLayout('cinematic')}
                                                    className={`p-2 rounded-full transition-all ${carouselLayout === 'cinematic' ? 'bg-neutral-700 text-brand-orange shadow-sm' : 'hover:bg-white/5 text-neutral-500 hover:text-white'}`}
                                                    title="Cinematic Layout"
                                                >
                                                    <GalleryHorizontal size={14} />
                                                </button>
                                                <button
                                                    onClick={() => setCarouselLayout('classic')}
                                                    className={`p-2 rounded-full transition-all ${carouselLayout === 'classic' ? 'bg-neutral-700 text-brand-orange shadow-sm' : 'hover:bg-white/5 text-neutral-500 hover:text-white'}`}
                                                    title="Classic Layout"
                                                >
                                                    <LayoutTemplate size={14} />
                                                </button>
                                                <button
                                                    onClick={() => setCarouselLayout('columns')}
                                                    className={`p-2 rounded-full transition-all ${carouselLayout === 'columns' ? 'bg-neutral-700 text-brand-orange shadow-sm' : 'hover:bg-white/5 text-neutral-500 hover:text-white'}`}
                                                    title="Columns Layout"
                                                >
                                                    <Columns size={14} />
                                                </button>
                                                <button
                                                    onClick={() => setCarouselLayout('seamless')}
                                                    className={`p-2 rounded-full transition-all ${carouselLayout === 'seamless' ? 'bg-neutral-700 text-brand-orange shadow-sm' : 'hover:bg-white/5 text-neutral-500 hover:text-white'}`}
                                                    title="Seamless Layout"
                                                >
                                                    <Film size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Promo / Feature Card (Desktop) */}
                                <div className="hidden md:block w-full md:w-64 bg-neutral-800/50 rounded-3xl p-4 border border-white/5">
                                    <div className="h-full rounded-2xl relative overflow-hidden group cursor-pointer hover:shadow-sm transition-all flex flex-col justify-end p-5">
                                        <Image
                                            src="https://blobcdn.same.energy/b/7d/cc/7dcc619bf4e02669aabfc12b11b09f00f86e5d86"
                                            alt="Bakery Case Study"
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                        <div className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                            <p className="text-xs font-semibold uppercase tracking-wider text-brand-orange mb-2">Featured</p>
                                            <p className="text-base font-bold text-white leading-snug">
                                                See how we transformed a local bakery into a global brand.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Links & Toggles */}
                            <div className="px-6 pb-6 pt-2 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs font-semibold text-neutral-500 uppercase tracking-widest border-t border-dashed border-white/10 mt-2 gap-4 md:gap-0">
                                <span>© 2025 Toasted Media</span>

                                <div className="flex gap-4">
                                    <a href="#" className="hover:text-brand-orange transition-colors">Instagram</a>
                                    <a href="#" className="hover:text-brand-orange transition-colors">Twitter</a>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </header>
    );
}
