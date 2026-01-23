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
        <GlassCard className="w-[200px] md:w-[240px] shrink-0 p-0 overflow-hidden flex flex-col">
            <div className="aspect-[16/9] relative">
                <img src={image} alt={name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 space-y-1">
                <h4 className="text-base font-semibold text-white line-clamp-1">{name}</h4>
                <p className="text-sm text-grey">{brand}</p>
                <div className="pt-2">
                    <p className="text-xs text-grey">Starting</p>
                    <p className="text-base font-semibold text-white">₹ {price}</p>
                </div>
            </div>
        </GlassCard>
    );
}
