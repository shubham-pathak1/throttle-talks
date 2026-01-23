"use client";

import React from "react";
import { VehicleStatCard } from "../../../components/garage/VehicleStatCard";
import { VEHICLES } from "@/lib/data";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, MoreHorizontal, Settings, ShieldCheck, Zap, Activity, Gauge } from "lucide-react";
import { cn } from "@/lib/utils";

export default function VehicleDetailPage() {
    const router = useRouter();
    const { id } = useParams();
    const [activeTab, setActiveTab] = React.useState('overview');

    const vehicle = VEHICLES.find(v => v.id === id);

    if (!vehicle) return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="text-center space-y-4">
                <h1 className="text-2xl font-black text-white uppercase tracking-tighter">Node Not Found</h1>
                <button onClick={() => router.push('/garage')} className="text-[10px] font-black text-white/40 uppercase tracking-widest underline underline-offset-4">Return to Registry</button>
            </div>
        </div>
    );

    const tabs = [
        { id: 'overview', label: 'Systems' },
        { id: 'specs', label: 'Telemetry' },
        { id: 'mods', label: 'Mod Logs' },
        { id: 'history', label: 'Archive' },
    ];

    return (
        <div className="pb-32 bg-black min-h-screen">
            {/* High-Fidelity Detail Header */}
            <div className="fixed top-0 left-0 right-0 md:pl-[80px] h-[72px] bg-black/80 backdrop-blur-xl border-b border-white/5 z-40 px-6 flex items-center justify-between shadow-2xl">
                <button onClick={() => router.back()} className="p-2.5 text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                    <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
                </button>
                <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black text-white uppercase tracking-tighter leading-none">{vehicle.name}</span>
                    <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.4em] mt-1">Vehicle Unit</span>
                </div>
                <button className="p-2.5 text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                    <MoreHorizontal className="w-5 h-5" strokeWidth={1.5} />
                </button>
            </div>

            <div className="pt-[72px]">
                {/* Hero Technical Visual */}
                <div className="aspect-[21/9] md:aspect-[3/1] relative overflow-hidden bg-zinc-950">
                    <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
                        <div className="w-8 h-1 rounded-full bg-white shadow-[0_0_10px_white]" />
                        <div className="w-8 h-1 rounded-full bg-white/10" />
                        <div className="w-8 h-1 rounded-full bg-white/10" />
                    </div>
                </div>

                <div className="container mx-auto max-w-2xl px-4 md:px-0 py-12 text-left">
                    {/* Identity Protocol */}
                    <section className="mb-12 space-y-1">
                        <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">{vehicle.brand}</p>
                        <h1 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">{vehicle.name}</h1>
                        <div className="flex items-center gap-4 mt-3">
                            <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">{vehicle.year} Revision</span>
                            <div className="h-4 w-[1px] bg-white/10" />
                            <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Verified Registry</span>
                        </div>
                    </section>

                    {/* Navigation Protocol */}
                    <div className="flex border-b border-white/5 mb-12 bg-white/[0.01]">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex-1 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative",
                                    activeTab === tab.id ? "text-white" : "text-white/20 hover:text-white"
                                )}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Technical Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <VehicleStatCard
                            icon={ShieldCheck}
                            label="Registry"
                            value="Status: Valid"
                            subtitle="2026 Protocol"
                        />
                        <VehicleStatCard
                            icon={Gauge}
                            label="Efficiency"
                            value="8.4"
                            subtitle="L/100KM"
                        />
                        <VehicleStatCard
                            icon={Settings}
                            label="Mod Index"
                            value="62"
                            subtitle="Active Logs"
                        />
                        <VehicleStatCard
                            icon={Zap}
                            label="Performance"
                            value="Tier 1"
                            subtitle="Surgical"
                        />
                    </div>

                    {/* Summary Engineering Note */}
                    <div className="mt-16 mb-20">
                        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-white/20 group-hover:bg-white transition-colors" />
                            <p className="text-base text-white/60 leading-relaxed font-bold italic tracking-wide">
                                "The {vehicle.name} represents the backbone of our high-velocity operations. Every calibration and modification has been executed with surgical precision to maintain the equilibrium between structural stability and raw output."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
