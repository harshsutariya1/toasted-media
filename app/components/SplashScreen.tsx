"use client";

import React, { useState, useEffect } from 'react';

/**
 * Toasted Media Agency - Splash Screen (Production Ready)
 * 
 * Logic:
 * 1. Initial State: 'hover' (Bread hovers)
 * 2. 0.5s: 'lowering' (Lever goes down)
 * 3. 1.0s: 'toasting' (Heating up loop) -> STAYS HERE UNTIL ASSETS LOAD
 * 4. Loaded & Min Time: 'popped' (Bread jumps up)
 * 5. +1.5s: 'fading' (Screen fade out)
 * 6. Finish
 */

interface SplashScreenProps {
    onFinish: () => void;
}

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
    const [phase, setPhase] = useState<'hover' | 'lowering' | 'toasting' | 'popped' | 'fading'>('hover');
    const [isLoaded, setIsLoaded] = useState(false);
    const [minTimeElapsed, setMinTimeElapsed] = useState(false);

    useEffect(() => {
        let isMounted = true;
        let imagesLoadedCount = 0;

        // Critical assets to preload (Logo + Hero Images)
        const criticalImages = [
            "/logo/logo2.jpg",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600",
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600",
            "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1600",
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600"
        ];

        const checkGlobalLoad = () => {
            if (imagesLoadedCount >= criticalImages.length && document.readyState === 'complete') {
                if (isMounted) setIsLoaded(true);
            }
        };

        // 1. Preload Images
        criticalImages.forEach(src => {
            const img = new window.Image();
            img.src = src;
            img.onload = () => {
                imagesLoadedCount++;
                checkGlobalLoad();
            };
            img.onerror = () => {
                imagesLoadedCount++; // Count error as done to avoid blocking
                checkGlobalLoad();
            };
        });

        // 2. Window Load Fallback (in case cached or other assets)
        const handleWindowLoad = () => {
            checkGlobalLoad();
        };

        if (document.readyState === 'complete') {
            checkGlobalLoad();
        } else {
            window.addEventListener('load', handleWindowLoad);
        }

        // 3. Fallback Timeout (Force load after 8s if something gets stuck)
        const fallbackTimer = setTimeout(() => {
            if (isMounted) setIsLoaded(true);
        }, 8000);

        return () => {
            isMounted = false;
            window.removeEventListener('load', handleWindowLoad);
            clearTimeout(fallbackTimer);
        };
    }, []);

    // Animation Sequence Controller
    useEffect(() => {
        // Start Sequence
        const t1 = setTimeout(() => setPhase('lowering'), 500);
        const t2 = setTimeout(() => setPhase('toasting'), 1000);

        // Ensure user sees the toasting animation for at least a moment (2.5s total splash time minimum)
        const tMin = setTimeout(() => setMinTimeElapsed(true), 2500);

        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(tMin); };
    }, []);

    // Watch for Transition to Popped
    useEffect(() => {
        if (phase === 'toasting' && isLoaded && minTimeElapsed) {
            setPhase('popped');
        }
    }, [phase, isLoaded, minTimeElapsed]);

    // Cleanup Sequence
    useEffect(() => {
        if (phase === 'popped') {
            const t3 = setTimeout(() => setPhase('fading'), 2000); // Look at the logo for 2s
            return () => clearTimeout(t3);
        }
        if (phase === 'fading') {
            const t4 = setTimeout(onFinish, 800); // Wait for fade transition
            return () => clearTimeout(t4);
        }
    }, [phase, onFinish]);

    return (
        <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900 transition-opacity duration-700 ${phase === 'fading' ? 'opacity-0' : 'opacity-100'}`}>

            {/* Ambient Glow Background (Intensifies during toasting) */}
            <div
                className={`absolute inset-0 bg-radial-orange transition-opacity duration-1000 ease-in-out pointer-events-none ${phase === 'toasting' ? 'opacity-20' : 'opacity-0'}`}
                style={{ background: 'radial-gradient(circle at center, #ea580c 0%, transparent 70%)' }}
            ></div>

            <div className="relative flex flex-col items-center">

                {/* --- Animation Container --- */}
                <div className="relative w-72 h-72">

                    {/* Bread */}
                    <div
                        className={`
              absolute left-1/2 -translate-x-1/2 w-36 h-32 rounded-t-3xl rounded-b-lg border-4 
              flex items-center justify-center overflow-hidden shadow-lg
              transition-all duration-500 ease-in-out
              ${phase === 'hover' ? '-top-12 scale-100' : ''}
              ${phase === 'lowering' || phase === 'toasting' ? 'top-20 scale-90 brightness-75' : ''} 
              ${phase === 'popped' || phase === 'fading' ? '-top-16 scale-105' : ''}
              ${phase === 'popped' || phase === 'fading' ? 'bg-[#f97316] border-[#c2410c] shadow-orange-500/50' : 'bg-[#fef3c7] border-[#dde5ed]'}
            `}
                        style={{
                            transitionTimingFunction: phase === 'popped' ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' : 'ease-in-out',
                            zIndex: 0
                        }}
                    >
                        {/* Bread Texture Details */}
                        <div className="absolute inset-0 bg-white/10 opacity-50"></div>

                        {/* The Logo (Revealed when toasted) */}
                        <div className={`
              transform transition-all duration-300 relative z-10
              ${phase === 'popped' || phase === 'fading' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
            `}>
                            <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg overflow-hidden p-2 ring-4 ring-orange-600/20">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/logo/logo2.jpg"
                                    alt="Toasted Media Logo"
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                        (e.target as HTMLElement).style.display = 'none';
                                        (e.target as HTMLElement).parentElement?.classList.remove('p-2');
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Toaster Body (Back Layer) */}
                    <div className="absolute top-20 left-1/2 -translate-x-1/2 w-56 h-36 bg-slate-800 rounded-2xl z-10 shadow-2xl border border-slate-700" />

                    {/* Toaster Body (Front Layer) */}
                    <div
                        className={`
              absolute top-20 left-1/2 -translate-x-1/2 w-56 h-36 rounded-2xl z-20
              flex flex-col items-center justify-center overflow-hidden
              border-b-8 border-r-2 border-l-2 border-slate-950/50
              shadow-2xl transition-all duration-300
            `}
                        style={{
                            // Metallic Gradient
                            background: 'linear-gradient(135deg, #475569 0%, #1e293b 100%)',
                        }}
                    >
                        {/* Chrome Trim Top */}
                        <div className="absolute top-0 w-full h-3 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 opacity-80"></div>

                        {/* Heating Glow (Internal) */}
                        <div className={`absolute inset-0 bg-orange-500 mix-blend-color-dodge transition-opacity duration-1000 ${phase === 'toasting' ? 'opacity-60 animate-pulse' : 'opacity-0'}`}></div>

                        {/* Toaster Design Elements */}
                        <div className="relative w-full h-full p-4 flex flex-col justify-between items-center z-10">
                            {/* Slot Shadow */}
                            <div className="w-40 h-1 bg-slate-900/80 rounded-full blur-[1px]"></div>

                            {/* Decorative Lines/Grill */}
                            <div className="flex space-x-2 opacity-30">
                                <div className="w-1 h-12 bg-slate-900 rounded-full"></div>
                                <div className="w-1 h-12 bg-slate-900 rounded-full"></div>
                                <div className="w-1 h-12 bg-slate-900 rounded-full"></div>
                            </div>

                            {/* Dial / Controls */}
                            <div className="flex items-center space-x-8 w-full justify-center opacity-80 mt-2">
                                <div className="w-3 h-3 rounded-full bg-slate-900 shadow-inner border border-slate-600"></div>
                                <div className={`w-8 h-8 rounded-full border-2 border-slate-500 flex items-center justify-center transition-colors duration-500 ${phase === 'toasting' ? 'bg-orange-500/20 border-orange-500' : 'bg-slate-800'}`}>
                                    <div className={`w-1 h-3 bg-slate-400 rounded-full transform transition-transform duration-1000 ${phase === 'toasting' ? 'rotate-180 bg-orange-200' : 'rotate-0'}`}></div>
                                </div>
                                <div className="w-3 h-3 rounded-full bg-slate-900 shadow-inner border border-slate-600"></div>
                            </div>
                        </div>
                    </div>

                    {/* Toaster Lever Track */}
                    <div className="absolute top-24 right-2 w-5 h-28 bg-slate-800 rounded-full z-10 border border-slate-700 shadow-inner">
                        <div className="absolute left-1/2 -translate-x-1/2 w-1.5 h-full bg-black/40 rounded-full"></div>
                    </div>

                    {/* The Lever Handle */}
                    <div
                        className={`
              absolute -right-2 w-10 h-5 bg-gradient-to-r from-slate-700 to-slate-900 
              rounded-md shadow-xl z-30 cursor-pointer border border-slate-600
              transition-all duration-500 ease-in-out hover:brightness-110
              ${phase === 'hover' ? 'top-24' : ''}
              ${phase === 'lowering' || phase === 'toasting' ? 'top-44' : ''}
              ${phase === 'popped' || phase === 'fading' ? 'top-24' : ''}
            `}
                    >
                        {/* Handle Detail */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-3 bg-slate-500/50 rounded-l-sm"></div>
                    </div>

                    {/* Shadow underneath */}
                    <div className="absolute top-56 left-1/2 -translate-x-1/2 w-48 h-6 bg-black/40 blur-md rounded-full z-0 transition-all duration-500"
                        style={{
                            transform: phase === 'toasting' ? 'translateX(-50%) scale(1.1)' : 'translateX(-50%) scale(1)',
                            opacity: phase === 'toasting' ? 0.8 : 0.4
                        }}
                    ></div>

                </div>

                {/* Loading Text */}
                <div className={`mt-16 font-mono text-orange-500 text-xs font-bold tracking-[0.3em] uppercase transition-opacity duration-500 ${phase === 'toasting' ? 'opacity-100 animate-pulse' : 'opacity-0'}`}>
                    Heating Up...
                </div>

            </div>
        </div>
    );
};

export default SplashScreen;
