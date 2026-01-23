import React from "react";
import { GlassCard } from "@/components/ui/glass-card";

interface VehicleScrollCardProps {
    name: string;
    brand: string;
    price: string;
    image: string;
}

export function VehicleScrollCard({ name, brand, price, image }: VehicleScrollCardProps) {
    return (
        <GlassCard className="w-[200px] md:w-[260px] shrink-0 p-0 overflow-hidden flex flex-col group/vcard border-white/5 hover:border-white/20 transition-all">
            <div className="aspect-[4/3] relative overflow-hidden">
                <img src={image} alt={name} className="w-full h-full object-cover opacity-80 group-hover/vcard:opacity-100 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-5 space-y-4">
                <div className="space-y-1">
                    <h4 className="text-[13px] font-black text-white uppercase tracking-tight line-clamp-1">{name}</h4>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider">{brand}</p>
                </div>
                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Starting Protocol</span>
                    <span className="text-[13px] font-black text-white font-mono tracking-tighter">₹ {price}</span>
                </div>
            </div>
        </GlassCard>
    );
}
