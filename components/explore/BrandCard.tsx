import React from "react";
import { GlassCard } from "@/components/ui/glass-card";

interface BrandCardProps {
    name: string;
    logo: string;
}

export function BrandCard({ name, logo }: BrandCardProps) {
    return (
        <GlassCard className="aspect-square flex flex-col items-center justify-center gap-4 hover:bg-white/10 transition-colors cursor-pointer">
            <div className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-full text-base font-bold text-white">
                {logo}
            </div>
            <span className="text-sm font-semibold text-white">{name}</span>
        </GlassCard>
    );
}
