"use client";

import React from "react";
import { VEHICLES } from "@/lib/data";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, MoreHorizontal, ShieldCheck, Gauge, Wrench, CircleDollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/glass-card";

export default function VehicleDetailPage() {
    const router = useRouter();
    const { id } = useParams();
    const [activeTab, setActiveTab] = React.useState('overview');

    const vehicle = VEHICLES.find(v => v.id === id);

    if (!vehicle) return <div className="flex h-screen items-center justify-center font-black uppercase tracking-widest text-grey">Vehicle Not Found</div>;

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'specs', label: 'Specs' },
        { id: 'mods', label: 'Mods' },
        { id: 'history', label: 'History' },
    ];

    return (
        <div className="pb-32 bg-black min-h-screen">
            {/* Detail Header */}
            <div className="fixed top-0 left-0 right-0 md:pl-[80px] h-[72px] glass-navbar z-40 px-4 md:px-8 flex items-center justify-between">
                <button onClick={() => router.back()} className="p-2 text-white hover:bg-white/10 rounded-xl transition-all active:scale-90">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black text-grey uppercase tracking-[0.4em]">Node ID: {vehicle.id}</span>
                    <span className="text-sm font-black uppercase tracking-tighter text-white">{vehicle.name}</span>
                </div>
                <button className="p-2 text-white hover:bg-white/10 rounded-xl transition-all">
                    <MoreHorizontal className="w-6 h-6" />
                </button>
            </div>

            <div className="pt-[72px]">
                {/* Hero Gallery */}
                <div className="aspect-video md:aspect-[21/9] relative overflow-hidden bg-zinc-950 border-b border-white/5">
                    <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
                        <div className="w-8 h-1 rounded-full bg-white shadow-[0_0_10px_white]" />
                        <div className="w-8 h-1 rounded-full bg-white/10" />
                        <div className="w-8 h-1 rounded-full bg-white/10" />
                    </div>
                </div>

                <div className="container mx-auto max-w-2xl px-4 md:px-0 py-12 text-left">
                    {/* Identity Section */}
                    <section className="mb-12 space-y-1">
                        <p className="text-[12px] font-black text-grey uppercase tracking-[0.3em]">{vehicle.brand}</p>
                        <h1 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">{vehicle.name}</h1>
                        <div className="flex items-center gap-3 mt-4">
                            <span className="bg-white/5 border border-white/10 px-3 py-1 rounded text-[10px] font-black text-white uppercase tracking-widest">{vehicle.year}</span>
                            <span className="text-[10px] font-bold text-grey uppercase tracking-[0.2em]">{vehicle.category} Node</span>
                        </div>
                    </section>

                    {/* Tab Selector */}
                    <div className="flex border-b border-white/5 mb-12">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex-1 py-5 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative",
                                    activeTab === tab.id ? "text-white" : "text-zinc-600 hover:text-white"
                                )}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white shadow-[0_0_8px_white]" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-16">
                        <DetailStat icon={ShieldCheck} label="Registry" value="Verified" sub="Valid 2026" />
                        <DetailStat icon={Gauge} label="Avg Telemetry" value="8.4" sub="L/100KM" />
                        <DetailStat icon={Wrench} label="Modifications" value="62" sub="Active Modules" />
                        <DetailStat icon={CircleDollarSign} label="Valuation" value={vehicle.price} sub="Market Avg" />
                    </div>

                    {/* Technical Narrative */}
                    <GlassCard className="p-8 border-white/5 bg-white/[0.01]">
                        <p className="text-base text-grey leading-relaxed font-semibold italic text-zinc-400">
                            "{vehicle.description || "The baseline dynamics of this platform remain the benchmark for our current fleet operations. Every hardware revision has been calculated for peak structural integrity."}"
                        </p>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}

function DetailStat({ icon: Icon, label, value, sub }: { icon: any, label: string, value: string, sub: string }) {
    return (
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
            <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-grey" />
                <span className="text-[9px] font-black text-grey uppercase tracking-[0.3em]">{label}</span>
            </div>
            <div className="flex flex-col">
                <span className="text-xl font-black text-white uppercase tracking-tight">{value}</span>
                <span className="text-[10px] font-bold text-grey uppercase tracking-widest">{sub}</span>
            </div>
        </div>
    );
}
