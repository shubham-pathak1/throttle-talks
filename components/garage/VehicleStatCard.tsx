"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface VehicleStatCardProps {
    icon: string | LucideIcon;
    label: string;
    value: string;
    subtitle?: string;
    className?: string;
}

export function VehicleStatCard({ icon: Icon, label, value, subtitle, className }: VehicleStatCardProps) {
    return (
        <div className={cn(
            "flex flex-col items-start gap-1 p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-all group",
            className
        )}>
            <div className="flex items-center gap-2 text-white/60 mb-1">
                {typeof Icon === 'string' ? (
                    <span className="text-xl leading-none">{Icon}</span>
                ) : (
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                )}
                <span className="text-[9px] font-black uppercase tracking-[0.2em]">{label}</span>
            </div>
            <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-white uppercase tabular-nums font-mono tracking-tighter leading-none">{value}</span>
                {subtitle && (
                    <span className="text-[9px] font-black text-white/20 uppercase tracking-widest leading-none">{subtitle}</span>
                )}
            </div>
        </div>
    );
}
