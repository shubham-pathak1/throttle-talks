"use client";

import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Activity, Wind, Cpu, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

interface GarageVehicleCardProps {
    id: string;
    name: string;
    brand: string;
    year: string;
    image: string;
    cc?: string;
    isModded?: boolean;
    mods?: string[];
    specs?: {
        hp: number;
        torque: number;
        weight: string;
    };
}

export function GarageVehicleCard({ name, brand, year, image, cc, isModded, mods, specs }: GarageVehicleCardProps) {
    return (
        <GlassCard
            className="p-0 overflow-hidden group border-white/10 transition-all bg-zinc-950 cursor-default"
        >
            {/* HERMETIC VISUAL SECTION - STATIC */}
            <div className="aspect-[21/9] relative overflow-hidden bg-zinc-950">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute top-4 right-4 flex gap-2">
                    {isModded && (
                        <div className="bg-white text-black px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest">
                            MODDED
                        </div>
                    )}
                    <div className="bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-xl text-[9px] font-black text-white uppercase tracking-widest border border-white/20">
                        VERIFIED
                    </div>
                </div>
            </div>

            {/* HIGH-DENSITY PROFESSIONAL DATA */}
            <div className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-0 text-left">
                        <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">{brand}</p>
                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none py-1">{name}</h3>
                        <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">{year} Revision</p>
                    </div>

                    {/* REFINED MOD LEDGER */}
                    {isModded && mods && mods.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 md:justify-end">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10">
                                <Wrench className="w-3 h-3 text-white/60" strokeWidth={2} />
                            </div>
                            {mods.map(mod => (
                                <span key={mod} className="px-3 py-1.5 rounded-xl bg-white/[0.08] border border-white/20 text-[9px] font-black text-white uppercase tracking-tight">
                                    {mod}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* PREMIUM TECHNICAL SPECIFICATIONS DASHBOARD */}
                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
                    <TechnicalBadge
                        icon={Wind}
                        label="Output"
                        value={`${specs?.hp || '---'}`}
                        unit="BHP"
                    />
                    <TechnicalBadge
                        icon={Activity}
                        label="Torque"
                        value={`${specs?.torque || '---'}`}
                        unit="Nm"
                    />
                    <TechnicalBadge
                        icon={Cpu}
                        label="Engine"
                        value={cc || '---'}
                        unit="CC"
                    />
                </div>
            </div>
        </GlassCard>
    );
}

function TechnicalBadge({ icon: Icon, label, value, unit }: { icon: any, label: string, value: string, unit: string }) {
    return (
        <div className="flex flex-col items-start gap-1 p-4 rounded-2xl bg-white/[0.02] border border-white/5 shadow-lg">
            <div className="flex items-center gap-2.5 text-white/60 mb-1 leading-none">
                <Icon className="w-4 h-4 text-white/60" strokeWidth={1.5} />
                <span className="text-[9px] font-black uppercase tracking-[0.2em]">{label}</span>
            </div>
            <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-white uppercase tabular-nums font-mono tracking-tighter leading-none">{value}</span>
                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest leading-none">{unit}</span>
            </div>
        </div>
    );
}
