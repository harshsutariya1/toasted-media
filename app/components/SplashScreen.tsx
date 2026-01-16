"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface SplashScreenProps {
    onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
    const [progress, setProgress] = useState(0);





    useEffect(() => {
        let isMounted = true;
        let loadedCount = 0;

        // Images to preload
        const imagesToPreload = [
            "/logo/logo2.jpg",
            "https://blobcdn.same.energy/a/bb/6b/bb6b239b93c7208b8c83c34a03acb60da5f73893",
            "https://blobcdn.same.energy/a/64/54/6454e1538fc392c0ea9fb164a0232b046c028b91",
            "https://blobcdn.same.energy/a/fb/72/fb7257532ab1f1b79af35419571b4418338b79da"
        ];

        const totalAssets = imagesToPreload.length;
        const startTime = Date.now();
        const minDuration = 1000; // Minimum splash duration in ms

        const updateProgress = () => {
            if (!isMounted) return;
            const calculatedProgress = Math.round((loadedCount / totalAssets) * 100);
            // Ensure progress doesn't jump backwards if we implemented a time-based fake progress before
            setProgress(prev => Math.max(prev, calculatedProgress));
        };

        const preloadImage = (src: string) => {
            return new Promise<void>((resolve) => {
                const img = new window.Image();
                img.src = src;
                img.onload = () => {
                    loadedCount++;
                    updateProgress();
                    resolve();
                };
                img.onerror = () => {
                    // Even if error, count as loaded to avoid blocking
                    loadedCount++;
                    updateProgress();
                    resolve();
                };
            });
        };



        const loadAllAssets = async () => {
            // Start preloading images and videos
            const imagePromises = imagesToPreload.map(preloadImage);


            // Wait for assets AND minimum time
            await Promise.all([
                ...imagePromises,

                new Promise<void>(resolve => setTimeout(resolve, minDuration))
            ]);

            if (isMounted) {
                setProgress(100);
                setTimeout(onFinish, 500); // Short delay at 100% before unmounting
            }
        };

        loadAllAssets();

        // Optional: Fake progress for visual feedback while waiting for minDuration
        const fakeInterval = setInterval(() => {
            if (!isMounted) return;
            const elapsed = Date.now() - startTime;
            const timeProgress = Math.min((elapsed / minDuration) * 90, 90); // Cap time progress at 90%

            setProgress(prev => {
                // Only update if time-based progress is greater than current image-based progress
                // But generally image-based logic above will override this if images load fast.
                // We want to show activity mainly.
                return Math.max(prev, Math.floor(timeProgress));
            });
        }, 100);

        return () => {
            isMounted = false;
            clearInterval(fakeInterval);
        };
    }, [onFinish]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a] text-white"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
            {/* Background Texture */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="relative z-10 flex flex-col items-center gap-8">
                {/* Logo Container with Pulse */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative"
                >
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden shadow-2xl relative">
                        <Image
                            src="/logo/logo2.jpg"
                            alt="Logo"
                            fill
                            className="object-cover"
                        />
                        {/* Shine effect */}
                        <motion.div
                            className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg]"
                            animate={{ left: "200%" }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 1 }}
                        />
                    </div>
                </motion.div>

                {/* Text & Progress */}
                <div className="flex flex-col items-center gap-4">
                    <motion.h1
                        className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        The Toasted <span className="text-orange-500">Media</span>
                    </motion.h1>

                    <div className="flex items-center gap-4 w-64">
                        <div className="h-[2px] w-full bg-neutral-800 rounded-full overflow-hidden relative">
                            <motion.div
                                className="absolute left-0 top-0 h-full bg-orange-500"
                                style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                        </div>
                        <span className="font-mono text-sm text-neutral-500 tabular-nums w-12 text-right">
                            {Math.min(progress, 100)}%
                        </span>
                    </div>

                    <motion.p
                        className="text-neutral-500 text-xs uppercase tracking-[0.3em] animate-pulse"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Turning up the heat...
                    </motion.p>
                </div>
            </div>

        </motion.div>
    );
}
