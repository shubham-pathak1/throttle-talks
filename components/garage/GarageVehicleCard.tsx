"use client";

import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Gauge, Zap, Weight } from "lucide-react";

interface GarageVehicleCardProps {
    id: string;
    name: string;
    brand: string;
    year: string;
    image: string;
    specs?: {
        hp: number;
        torque: number;
        weight: string;
    };
    onClick: () => void;
}

export function GarageVehicleCard({ name, brand, year, image, specs, onClick }: GarageVehicleCardProps) {
    return (
        <GlassCard
            onClick={onClick}
            className="p-0 overflow-hidden group cursor-pointer"
        >
            <div className="aspect-[16/9] relative overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-black text-white uppercase tracking-widest border border-white/10">
                    Verified Build
                </div>
            </div>

            <div className="p-6 space-y-4">
                <div className="space-y-1 text-left">
                    <p className="text-[12px] font-bold text-grey uppercase tracking-[0.2em]">{brand}</p>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tight">{name}</h3>
                    <p className="text-sm text-grey font-medium uppercase tracking-widest">{year}</p>
                </div>

                {/* Technical Stats Overlay */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/5">
                    <TechnicalBadge
                        icon={Zap}
                        label="Output"
                        value={`${specs?.hp || '---'} HP`}
                    />
                    <TechnicalBadge
                        icon={Gauge}
                        label="Torque"
                        value={`${specs?.torque || '---'} Nm`}
                    />
                    <TechnicalBadge
                        icon={Weight}
                        label="Weight"
                        value={specs?.weight || '---'}
                    />
                </div>
            </div>
        </GlassCard>
    );
}

function TechnicalBadge({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="flex flex-col items-start gap-1 p-2 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-1.5 text-grey">
                <Icon className="w-3 h-3" />
                <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
            </div>
            <span className="text-xs font-bold text-white uppercase tabular-nums">{value}</span>
        </div>
    );
}
