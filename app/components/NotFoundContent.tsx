"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFoundContent() {
    const router = useRouter();

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] text-white">
            {/* Background Gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-[var(--color-brand-blue)] opacity-20 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[var(--color-brand-purple)] opacity-20 blur-[120px]" />
            </div>

            <div className="container relative z-10 mx-auto flex flex-col items-center px-4 text-center">
                {/* Large 404 Text */}
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ fontFamily: "var(--font-syne)" }}
                    className="select-none text-[150px] font-bold leading-none tracking-tighter sm:text-[220px] md:text-[300px]"
                >
                    <span className="bg-gradient-to-b from-white to-white/10 bg-clip-text text-transparent">
                        404
                    </span>
                </motion.h1>

                {/* Message Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="relative mt-[-20px] md:mt-[-40px] flex flex-col items-center gap-6"
                >
                    <h2
                        style={{ fontFamily: "var(--font-syne)" }}
                        className="text-3xl font-semibold md:text-5xl"
                    >
                        Page Not Found
                    </h2>
                    <p
                        style={{ fontFamily: "var(--font-outfit)" }}
                        className="max-w-[450px] text-gray-400 md:text-lg"
                    >
                        Oops! It looks like you&apos;ve ventured into uncharted territory. The page you are looking for has been moved or toasted.
                    </p>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                        <button
                            onClick={() => router.back()}
                            className="group flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-medium text-white transition-all hover:bg-white/10 hover:border-white/20 active:scale-95"
                            style={{ fontFamily: "var(--font-outfit)" }}
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Go Back
                        </button>

                        <Link
                            href="/"
                            className="group flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-medium text-black transition-all hover:bg-gray-200 active:scale-95"
                            style={{ fontFamily: "var(--font-outfit)" }}
                        >
                            <Home className="h-4 w-4" />
                            Back to Home
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
        </div>
    );
}
