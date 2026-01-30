"use client";

import { motion } from "framer-motion";
import { ArrowRight, Instagram, Send, TrendingUp, Mail, Phone, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";

const interests = [
    "Social Media Management",
    "Performance Marketing",
    "Content Creation",
    "Web Development",
    "Brand Strategy",
    "Other"
];

const ContactDetail = ({ icon, label, value, href }: { icon: React.ReactNode, label: string, value: string, href?: string }) => {
    const Component = href ? 'a' : 'div';
    return (
        <Component 
            href={href}
            className={`group relative flex items-center gap-5 p-5 pr-6 rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-orange-500/40 transition-all duration-500 w-full max-w-md overflow-hidden ${href ? 'cursor-pointer' : ''}`}
        >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 w-12 h-12 rounded-xl bg-neutral-950 border border-white/10 flex items-center justify-center text-neutral-400 group-hover:text-orange-500 group-hover:border-orange-500/50 group-hover:scale-105 transition-all duration-500 shadow-lg">
                {icon}
            </div>
            
            <div className="relative z-10 flex-1 min-w-0">
                <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] mb-1.5 group-hover:text-orange-400 transition-colors">{label}</div>
                <div className="text-lg font-medium text-white truncate font-serif group-hover:translate-x-1 transition-transform duration-300">{value}</div>
            </div>

            {href && (
                <div className="relative z-10 text-neutral-600 group-hover:text-white transform opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowRight className="w-5 h-5" />
                </div>
            )}
        </Component>
    );
};

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

const FloatingInput = ({ 
    label, 
    type = "text", 
    textarea = false,
    name,
    value,
    onChange,
    required = false
}: { 
    label: string; 
    type?: string; 
    textarea?: boolean;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    required?: boolean;
}) => {
    return (
        <div className="relative group">
            {textarea ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    placeholder=" "
                    className="block w-full px-4 py-4 bg-transparent border border-white/20 rounded-xl text-white outline-none focus:border-orange-500 transition-colors peer resize-none h-32"
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
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
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        website: "",
        message: "",
        honeypot: "" // Hidden field for security
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, interest: activeInterest || "Not specified" }),
            });

            if (!response.ok) throw new Error('Failed to send message');

            setStatus('success');
            // Reset form
            setFormData({ name: "", email: "", website: "", message: "", honeypot: "" });
            setActiveInterest(null);
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

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
                            Let&apos;s <span className="relative inline-block group">
                                <span className="relative z-10 italic bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent font-serif pr-2">ignite</span>
                                <motion.span 
                                    className="absolute bottom-1 left-0 w-full h-3 bg-orange-500/20 -rotate-1 rounded-full -z-0"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '100%' }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                />
                                <span className="absolute -top-1 -right-1 flex">
                                    <motion.span 
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: 0.8 }}
                                        className="text-orange-500 text-2xl"
                                    >✦</motion.span>
                                </span>
                            </span> it.
                        </h2>
                        <p className="text-neutral-400 text-lg max-w-md mb-12 leading-relaxed">
                            We help ambitious brands scale through creative strategy and data-driven execution.
                            Ready to start?
                        </p>

                        <div className="flex flex-col gap-4">
                            <ContactDetail 
                                icon={<Mail className="w-5 h-5" />} 
                                label="Email Us" 
                                value="hello@toastedmediaagency.com" 
                                href="mailto:hello@toastedmediaagency.com" 
                            />
                            <ContactDetail 
                                icon={<Phone className="w-5 h-5" />} 
                                label="Call Us" 
                                value="+91 987-654-3210" 
                            />
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

                    {status === 'success' ? (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="h-full flex flex-col items-center justify-center text-center py-12"
                        >
                            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 text-green-500">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                            <p className="text-neutral-400 mb-8 max-w-sm">
                                Thanks for reaching out. We&apos;ll analyze your request and get back to you within 24 hours.
                            </p>
                            <button 
                                onClick={() => setStatus('idle')}
                                className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors font-medium text-sm"
                            >
                                Send another message
                            </button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Security: Honeypot Field (Hidden) */}
                            <input 
                                type="text" 
                                name="honeypot" 
                                value={formData.honeypot} 
                                onChange={handleChange} 
                                style={{ display: 'none' }} 
                                tabIndex={-1} 
                                autoComplete="off"
                            />

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FloatingInput 
                                        label="Your Name" 
                                        name="name" 
                                        value={formData.name} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                    <FloatingInput 
                                        label="Email Address" 
                                        type="email" 
                                        name="email" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <FloatingInput 
                                    label="Company Website" 
                                    name="website" 
                                    value={formData.website} 
                                    onChange={handleChange} 
                                />

                                <div>
                                    <label className="block text-sm text-neutral-400 mb-4 font-sans tracking-wide">I&apos;m interested in...</label>
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

                                <FloatingInput 
                                    label="Tell us about your project" 
                                    textarea 
                                    name="message" 
                                    value={formData.message} 
                                    onChange={handleChange} 
                                    required
                                />
                            </div>

                            {status === 'error' && (
                                <div className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>Something went wrong. Please try again or email us directly.</span>
                                </div>
                            )}

                            <button 
                                type="submit" 
                                disabled={status === 'loading'}
                                className="w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-orange-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message 
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </motion.div>

            </div>
        </section>
    );
}
