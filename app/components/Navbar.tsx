"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll for eventual aesthetic tweaks
    useEffect(() => {
        const handleScroll = () => {
            // We can use this if we want to change style on scroll
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const links = [
        { name: "Services", href: "#services" },
        { name: "Industries", href: "#industries" },
        { name: "Process", href: "#process" },
    ];

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
                    <a href="#" className="flex items-center gap-3 group shrink-0">
                        <div className="w-9 h-9 md:w-10 md:h-10 bg-neutral-800 rounded-full flex items-center justify-center overflow-hidden shadow-sm border border-neutral-700">
                            <img src="/logo/logo2.jpg" alt="Logo" className="w-full h-full object-cover" />
                        </div>
                        <span className={`font-serif font-medium text-lg tracking-tight text-white group-hover:text-brand-orange transition-colors ${isMenuOpen ? "block" : "hidden sm:block"}`}>
                            The Toasted Media
                        </span>
                    </a>

                    {/* Desktop Horizontal Links (Visible only when menu is closed on Desktop) */}
                    {!isMenuOpen && (
                        <div className="hidden md:flex items-center gap-1 mx-4">
                            {links.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="px-4 py-2 rounded-full text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/5 transition-all"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    )}

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2">

                        {/* 'Let's Talk' Button - Visible on mobile now too, but distinct style */}
                        <AnimatePresence>
                            {!isMenuOpen && (
                                <motion.a
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    href="#contact"
                                    className="flex bg-white text-neutral-900 px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-bold items-center gap-2 hover:bg-neutral-200 transition-colors mr-1 whitespace-nowrap"
                                >
                                    <span>Let's Talk</span>
                                    <ArrowRight size={14} className="-rotate-45 md:rotate-0" />
                                </motion.a>
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
                                    {[...links, { name: "Contact", href: "#contact" }].map((link, i) => (
                                        <motion.a
                                            key={link.name}
                                            href={link.href}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.1 + i * 0.05 }}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="group flex items-center justify-between p-4 rounded-3xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer bg-white/5 md:bg-transparent"
                                        >
                                            <span className="text-lg md:text-2xl font-serif text-neutral-300 group-hover:text-white font-[family-name:var(--font-syne)]">
                                                {link.name}
                                            </span>
                                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
                                                <ArrowRight size={16} className="text-brand-orange" />
                                            </div>
                                        </motion.a>
                                    ))}
                                </div>

                                {/* Promo / Feature Card (Desktop) */}
                                <div className="hidden md:block w-full md:w-64 bg-neutral-800/50 rounded-3xl p-4 border border-white/5">
                                    <div className="h-full rounded-2xl relative overflow-hidden group cursor-pointer hover:shadow-sm transition-all flex flex-col justify-end p-5">
                                        <img
                                            src="https://blobcdn.same.energy/b/7d/cc/7dcc619bf4e02669aabfc12b11b09f00f86e5d86"
                                            alt="Bakery Case Study"
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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

                            {/* Footer Links */}
                            <div className="px-6 pb-6 pt-2 flex justify-between items-center text-[10px] md:text-xs font-semibold text-neutral-500 uppercase tracking-widest border-t border-dashed border-white/10 mt-2">
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
