"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ContactSection from "@/app/components/ContactSection";

export default function ContactPage() {
    const [pattern, setPattern] = useState<'dots' | 'grid' | 'lines'>('grid');

    return (
        <main className="min-h-screen bg-neutral-900 text-white font-sans selection:bg-brand-orange/30">
            <Navbar pattern={pattern} setPattern={setPattern} />

            {/* Added padding top to account for fixed navbar */}
            <div className="pt-20">
                <ContactSection />
            </div>

            <Footer />
        </main>
    );
}
