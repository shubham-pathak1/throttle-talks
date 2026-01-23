"use client";

import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { X, User, AlignLeft, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: {
        name: string;
        username: string;
        bio: string;
    };
}

export function EditProfileModal({ isOpen, onClose, user }: EditProfileModalProps) {
    const [name, setName] = React.useState(user.name);
    const [bio, setBio] = React.useState(user.bio);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                onClick={onClose}
            />

            <GlassCard className="relative w-full max-w-lg p-0 overflow-hidden border-white/10 animate-in fade-in zoom-in duration-300 shadow-2xl">
                <header className="px-10 py-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <div className="space-y-1">
                        <h2 className="text-xl font-black uppercase tracking-tighter text-white">Edit Profile</h2>
                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">Update your profile protocol</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2.5 hover:bg-white/10 rounded-xl transition-all text-white/20 hover:text-white"
                    >
                        <X className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                </header>

                <div className="p-10 space-y-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] pl-1">Display Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" strokeWidth={1.5} />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter display name..."
                                className="w-full h-14 bg-white/[0.03] border border-white/10 rounded-xl pl-12 pr-4 text-xs font-black uppercase tracking-widest text-white focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] pl-1">Biography</label>
                        <div className="relative">
                            <AlignLeft className="absolute left-4 top-5 w-4 h-4 text-white/20" strokeWidth={1.5} />
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="Describe your mechanical relationship..."
                                rows={4}
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-12 pr-4 py-5 text-xs font-bold uppercase tracking-widest text-white focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all resize-none min-h-[120px]"
                            />
                        </div>
                    </div>
                </div>

                <footer className="p-10 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="w-4 h-4 text-white/20" strokeWidth={1.5} />
                        <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Protocol Sync</span>
                    </div>
                    <div className="flex gap-6 items-center">
                        <button
                            onClick={onClose}
                            className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-all underline underline-offset-4"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onClose}
                            className="px-10 py-4 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-95"
                        >
                            Save Changes
                        </button>
                    </div>
                </footer>
            </GlassCard>
        </div>
    );
}
