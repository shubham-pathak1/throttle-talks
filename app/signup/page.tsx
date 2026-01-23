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

export default function SignupPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">

            {/* Grayscale Background Atmosphere */}
            <div className="absolute top-1/2 -right-1/4 w-[60%] h-[60%] bg-white/5 blur-[150px] rounded-full" />
            <div className="absolute -bottom-1/4 -left-1/4 w-[50%] h-[50%] bg-zinc-800/10 blur-[120px] rounded-full" />

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
                        Join the Pit Lane
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter sm:text-5xl">START YOUR <span className="text-zinc-600">BUILD.</span></h1>
                    <p className="text-zinc-500 text-sm font-light max-w-[320px] mx-auto leading-relaxed">
                        Create your digital garage, track your modifications, and connect with the obsession.
                    </p>
                </div>

                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider ml-1">Username</label>
                            <div className="relative group">
                                <HelmetIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-white transition-colors" />
                                <input
                                    type="text"
                                    placeholder="ShubhamPathak"
                                    className="w-full h-14 bg-zinc-900/50 border border-white/5 rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-zinc-800 backdrop-blur-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider ml-1">Email</label>
                            <div className="relative group">
                                <HelmetIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-white transition-colors" />
                                <input
                                    type="email"
                                    placeholder="shubham@example.com"
                                    className="w-full h-14 bg-zinc-900/50 border border-white/5 rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-zinc-800 backdrop-blur-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider ml-1">Password</label>
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

                    <div className="flex items-start gap-3 px-1">
                        <input type="checkbox" className="mt-1 bg-zinc-900 border-white/10 rounded" />
                        <span className="text-[10px] text-zinc-500 leading-tight">
                            I agree to the <Link href="#" className="underline">Terms of Service</Link> and recognize that automotive builds are a serious obsession.
                        </span>
                    </div>

                    <Link href="/" className="block pt-2">
                        <button className="w-full h-14 bg-white text-black font-black uppercase tracking-tighter text-sm rounded-2xl hover:bg-zinc-100 transition-all active:scale-[0.98] shadow-lg shadow-white/5">
                            Sign Up
                        </button>
                    </Link>
                </form>

                <p className="text-center text-xs text-zinc-600 font-light">
                    Already registered? <Link href="/login" className="text-white hover:underline font-bold transition-all">Log in Here</Link>
                </p>
            </div>

            {/* Decorative B&W Element */}
            <div className="absolute -bottom-24 -right-24 aspect-square w-96 rounded-full border border-white/5 opacity-5 pointer-events-none transition-opacity group-hover:opacity-10" />
        </div>
    );
}
