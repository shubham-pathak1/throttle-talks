import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { CarFront, Bike, Zap, Diamond, LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
    CarFront,
    Bike,
    Zap,
    Diamond
};

interface CategoryCardProps {
    name: string;
    count: number;
    icon: string;
}

export function CategoryCard({ name, count, icon }: CategoryCardProps) {
    const Icon = ICON_MAP[icon] || Zap;

    return (
        <GlassCard className="aspect-square flex flex-col items-center justify-center gap-5 hover:bg-white/[0.04] transition-all group cursor-pointer border-white/5 bg-black/40">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500 shadow-2xl">
                <Icon className="w-8 h-8 text-white/40 group-hover:text-black transition-colors duration-500" strokeWidth={1.5} />
            </div>
            <div className="text-center space-y-1">
                <h3 className="text-[11px] font-black text-white uppercase tracking-[0.2em]">{name}</h3>
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-tighter">{count.toLocaleString()} SCANS</p>
            </div>
        </GlassCard>
    );
}
