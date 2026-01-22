"use client";

import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

// Racing Helmet SVG Icon
const HelmetIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M20 18v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
        <path d="M4 16h16" />
        <path d="M7 10h.01" />
        <path d="M17 10h.01" />
    </svg>
);

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">

            {/* Background Atmosphere */}
            <div className="absolute top-1/4 -left-1/4 w-[50%] h-[50%] bg-white/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-1/4 -right-1/4 w-[50%] h-[50%] bg-zinc-800/20 blur-[120px] rounded-full" />

            {/* Back to Home */}
            <Link
                href="/"
                className="absolute top-8 left-8 flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-mono uppercase tracking-widest">Back</span>
            </Link>

            <div className="w-full max-w-md space-y-12 relative z-10">
                <div className="space-y-4 text-center">
                    <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-2">
                        Standard Authentication
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter sm:text-5xl">WELCOME <span className="text-zinc-600">BACK.</span></h1>
                    <p className="text-zinc-500 text-sm font-light max-w-[280px] mx-auto leading-relaxed">
                        The Pit Lane is waiting. Log in to sync your garage and build logs.
                    </p>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider ml-1">Email</label>
                            <div className="relative group">
                                <HelmetIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-white transition-colors" />
                                <input
                                    type="email"
                                    placeholder="racer@throttle-talks.com"
                                    className="w-full h-14 bg-zinc-900/50 border border-white/5 rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-zinc-800 backdrop-blur-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-end ml-1">
                                <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Password</label>
                                <Link href="#" className="text-[9px] text-zinc-700 hover:text-zinc-400 font-mono uppercase">Forgot?</Link>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-white transition-colors" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full h-14 bg-zinc-900/50 border border-white/5 rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-zinc-800 backdrop-blur-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <Link href="/" className="block pt-4">
                        <button className="w-full h-14 bg-white text-black font-black uppercase tracking-tighter text-sm rounded-2xl hover:bg-zinc-100 transition-all active:scale-[0.98] shadow-lg shadow-white/5">
                            Log In
                        </button>
                    </Link>
                </form>

                <p className="text-center text-xs text-zinc-600 font-light">
                    Don't have an account? <Link href="/signup" className="text-white hover:underline font-bold transition-all">Sign Up</Link>
                </p>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-10 pointer-events-none">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em]">SECURE_ACCESS</span>
            </div>
        </div>
    );
}
