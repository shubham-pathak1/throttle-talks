"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, MapPin, Warehouse, Users, Share2 } from "lucide-react";
import { EditProfileModal } from "./EditProfileModal";

interface ProfileHeaderProps {
    user: {
        name: string;
        username: string;
        avatar: string;
        bio: string;
        stats: {
            vehicles: number;
            followers: number;
        };
    };
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

    return (
        <div className="relative">
            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                user={user}
            />

            {/* Cover Photo */}
            <div className="h-48 md:h-64 w-full bg-zinc-950 overflow-hidden relative">
                <img
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2083"
                    className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000"
                    alt="Cover"
                />
                <button className="absolute bottom-6 right-6 p-3 bg-black/60 backdrop-blur-md rounded-2xl border border-white/5 text-white/40 hover:text-white transition-all shadow-2xl">
                    <Camera className="w-4.5 h-4.5" strokeWidth={1.5} />
                </button>
            </div>

            <div className="px-4 md:px-0 -mt-16 relative z-10 flex flex-col items-center">
                {/* Avatar */}
                <Avatar className="w-28 h-28 md:w-36 md:h-36 rounded-full border-[6px] border-black shadow-[0_0_40px_rgba(255,255,255,0.1)] ring-1 ring-white/20 transition-transform duration-500 hover:scale-105">
                    <AvatarImage src={user.avatar} className="object-cover" />
                    <AvatarFallback className="bg-zinc-900 text-2xl font-black">{user.username[1].toUpperCase()}</AvatarFallback>
                </Avatar>

                {/* User Info */}
                <div className="mt-6 text-center space-y-1">
                    <h1 className="text-3xl font-black text-white uppercase tracking-tighter">{user.name}</h1>
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Node ID: @{user.username}</p>
                </div>

                {/* Bio */}
                <p className="mt-6 text-[12px] font-bold text-white/40 uppercase tracking-widest leading-relaxed max-w-md text-center">
                    {user.bio}
                </p>

                {/* Stats Bar */}
                <div className="mt-10 flex items-center justify-around w-full max-w-sm px-8 py-6 rounded-3xl bg-white/[0.02] border border-white/15 shadow-2xl">
                    <StatItem icon={Warehouse} label="Garage" value={user.stats.vehicles} />
                    <StatItem icon={Users} label="Followers" value={user.stats.followers} />
                    <StatItem icon={MapPin} label="Logs" value="128" />
                </div>

                {/* Actions */}
                <div className="mt-10 flex gap-3 w-full max-w-sm">
                    <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="flex-[2] h-14 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
                    >
                        Edit Profile
                    </button>
                    <button className="flex-1 h-14 rounded-2xl bg-white/[0.03] border border-white/10 text-white group hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                        <Share2 className="w-4 h-4 text-white/20 group-hover:text-white" strokeWidth={1.5} />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/20 group-hover:text-white">Share</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

function StatItem({ icon: Icon, label, value }: { icon: any, label: string, value: any }) {
    return (
        <div className="flex flex-col items-center gap-2 group cursor-pointer">
            <div className="flex items-center gap-2 text-white/20 group-hover:text-white transition-colors">
                <Icon className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-[8px] font-black uppercase tracking-[0.2em] leading-none">{label}</span>
            </div>
            <span className="text-xl font-black text-white leading-none font-mono tracking-tighter">{value}</span>
        </div>
    );
}
