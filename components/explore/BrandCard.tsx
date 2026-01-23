import React from "react";
import { GlassCard } from "@/components/ui/glass-card";

interface BrandCardProps {
    name: string;
    logo: string;
}

export function BrandCard({ name, logo }: BrandCardProps) {
    return (
        <GlassCard className="aspect-square flex flex-col items-center justify-center gap-4 hover:bg-white/[0.06] border-white/5 transition-all cursor-pointer group">
            <div className="w-12 h-12 flex items-center justify-center bg-white/[0.02] border border-white/10 rounded-xl text-xs font-black text-white/40 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-500">
                {logo}
            </div>
            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">{name}</span>
        </GlassCard>
    );
}
