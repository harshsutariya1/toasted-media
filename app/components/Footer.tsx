"use client";

import { Instagram, Linkedin, Twitter, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        {
            title: "Company",
            links: [
                { name: "About Us", href: "/#about" },
                { name: "Our Team", href: "/#founders" },
                { name: "Careers", href: "#" },
                { name: "Contact", href: "/contact" }
            ]
        },
        {
            title: "Services",
            links: [
                { name: "Social Media", href: "/#services" },
                { name: "Performance Marketing", href: "/#services" },
                { name: "Content Creation", href: "/#services" },
                { name: "Web Development", href: "/#services" }
            ]
        },
        {
            title: "Legal",
            links: [
                { name: "Privacy Policy", href: "#" },
                { name: "Terms of Service", href: "#" },
                { name: "Cookie Policy", href: "#" }
            ]
        }
    ];

    return (
        <footer className="bg-neutral-900 border-t border-white/10 pt-20 pb-8 text-white relative overflow-hidden font-sans">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden relative">
                                <Image src="/logo/logo.jpg" alt="Logo" fill sizes="40px" className="object-cover" />
                            </div>
                            <span className="font-[family-name:var(--font-faculty)] font-medium text-lg tracking-wide">THE TOASTED MEDIA</span>
                        </div>
                        <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
                            Igniting brands with creative fire and data-driven precision. Let&apos;s toast to your success.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: <Instagram className="w-5 h-5" />, href: "#" },
                                { icon: <Linkedin className="w-5 h-5" />, href: "#" },
                                { icon: <Twitter className="w-5 h-5" />, href: "#" }
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    {footerLinks.map((column, idx) => (
                        <div key={idx} className="space-y-6">
                            <h4 className="text-lg font-bold text-white">{column.title}</h4>
                            <ul className="space-y-4">
                                {column.links.map((link, linkIdx) => (
                                    <li key={linkIdx}>
                                        <Link
                                            href={link.href}
                                            className="text-neutral-400 hover:text-white transition-colors text-sm flex items-center gap-1 group w-fit"
                                        >
                                            {link.name}
                                            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-x-0.5 transition-all" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-neutral-500 text-sm">
                        © {currentYear} The Toasted Media. All rights reserved.
                    </p>
                    <div className="flex items-center gap-8 text-neutral-500 text-sm">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Sitemap</a>
                    </div>
                </div>
            </div>

            {/* Background Texture Overlay similar to hero but subtle */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(circle at 100% 0%, #f78f2d 0%, transparent 20%), radial-gradient(circle at 0% 100%, #2f72e7 0%, transparent 20%)'
                }}
            />
        </footer>
    );
}
