"use client";

import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Eye } from "lucide-react";

interface DiscussionCardProps {
    user: {
        username: string;
        avatar: string;
    };
    timestamp: string;
    hashtags: string[];
    content: string;
    stats: {
        comments: number;
        views: number;
    };
}

export function DiscussionCard({ user, timestamp, hashtags, content, stats }: DiscussionCardProps) {
    return (
        <GlassCard className="cursor-pointer hover:bg-white/[0.04] transition-all group/disc border-white/5 p-6 border-b border-b-white/5">
            <div className="flex items-start gap-4 mb-6">
                <Avatar className="w-10 h-10 border border-white/10">
                    <AvatarImage src={user.avatar} className="object-cover" />
                    <AvatarFallback className="bg-zinc-800 text-[10px] font-black">{user.username[1].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-left">
                    <span className="text-sm font-black text-white uppercase tracking-tight">{user.username}</span>
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{timestamp}</span>
                </div>
            </div>

            <div className="mb-6 space-y-3">
                <div className="flex gap-2 opacity-40 group-hover/disc:opacity-100 transition-opacity">
                    {hashtags.map(tag => (
                        <span key={tag} className="text-[9px] font-black text-white uppercase tracking-[0.2em]">#{tag}</span>
                    ))}
                </div>
                <p className="text-base text-zinc-300 leading-relaxed font-semibold italic text-left">
                    "{content}"
                </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-white/40">
                        <MessageSquare className="w-3.5 h-3.5" strokeWidth={1.5} />
                        <span className="text-[10px] font-black uppercase tracking-widest tabular-nums">{stats.comments} Signals</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/40">
                        <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                        <span className="text-[10px] font-black uppercase tracking-widest tabular-nums">{stats.views} Scans</span>
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}
