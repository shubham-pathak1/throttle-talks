"use client";

import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { X, Calendar, Clock, MapPin, AlignLeft, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface HostMeetupModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function HostMeetupModal({ isOpen, onClose }: HostMeetupModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal Content */}
            <GlassCard className="relative w-full max-w-lg p-0 overflow-hidden border-white/10 animate-in fade-in zoom-in duration-300">
                <header className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <div>
                        <h2 className="text-xl font-black uppercase tracking-tighter text-white">Plan Drive Protocol</h2>
                        <p className="text-[10px] font-bold text-grey uppercase tracking-[0.4em] mt-0.5">Initialize Coordinate Sync</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-all text-grey hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </header>

                <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto no-scrollbar">
                    {/* Essential Info */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-grey uppercase tracking-[0.3em] pl-1">Operation Title</label>
                            <input
                                type="text"
                                placeholder="e.g. Midnight C1 Run"
                                className="w-full h-12 bg-white/[0.02] border border-white/10 rounded-xl px-4 text-sm font-bold text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-zinc-800"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-grey uppercase tracking-[0.3em] pl-1">Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-700" />
                                    <input
                                        type="date"
                                        className="w-full h-12 bg-white/[0.02] border border-white/10 rounded-xl pl-12 pr-4 text-sm font-bold text-white focus:outline-none focus:border-white/20 transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-grey uppercase tracking-[0.3em] pl-1">T-Time</label>
                                <div className="relative">
                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-700" />
                                    <input
                                        type="time"
                                        className="w-full h-12 bg-white/[0.02] border border-white/10 rounded-xl pl-12 pr-4 text-sm font-bold text-white focus:outline-none focus:border-white/20 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-grey uppercase tracking-[0.3em] pl-1">Rendezvous Point</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-700" />
                                <input
                                    type="text"
                                    placeholder="Scanning for location nodes..."
                                    className="w-full h-12 bg-white/[0.02] border border-white/10 rounded-xl pl-12 pr-4 text-sm font-bold text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-zinc-800"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-grey uppercase tracking-[0.3em] pl-1">Briefing</label>
                            <div className="relative">
                                <AlignLeft className="absolute left-4 top-4 w-3.5 h-3.5 text-zinc-700" />
                                <textarea
                                    placeholder="Outline the drive parameters, intensity, and equipment requirements..."
                                    rows={4}
                                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sm font-medium text-grey focus:outline-none focus:border-white/20 transition-all placeholder:text-zinc-800 resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Drive Intensity */}
                    <div className="space-y-4">
                        <label className="text-[9px] font-black text-grey uppercase tracking-[0.3em] pl-1">Drive Category</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['Cruising', 'High Speed', 'Technical'].map((type) => (
                                <button
                                    key={type}
                                    className="h-10 border border-white/10 bg-white/[0.02] rounded-xl text-[10px] font-black uppercase tracking-widest text-grey hover:text-white hover:border-white/20 transition-all"
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <footer className="p-8 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-grey" />
                        <span className="text-[9px] font-black text-grey uppercase tracking-widest">Protocol Verified</span>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 text-[10px] font-black uppercase tracking-widest text-grey hover:text-white transition-all"
                        >
                            Discard
                        </button>
                        <button className="px-10 py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95">
                            Launch Sync
                        </button>
                    </div>
                </footer>
            </GlassCard>
        </div>
    );
}
