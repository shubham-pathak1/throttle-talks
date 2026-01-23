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
        <GlassCard className="aspect-square flex flex-col items-center justify-center gap-4 hover:bg-white/10 transition-all group cursor-pointer border-white/5 bg-black/40">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                <Icon className="w-8 h-8 text-grey group-hover:text-black transition-colors duration-300" strokeWidth={2.5} />
            </div>
            <div className="text-center">
                <h3 className="text-sm font-black text-white uppercase tracking-widest">{name}</h3>
                <p className="text-[10px] font-bold text-grey uppercase tracking-tighter mt-0.5">{count.toLocaleString()} units</p>
            </div>
        </GlassCard>
    );
}
