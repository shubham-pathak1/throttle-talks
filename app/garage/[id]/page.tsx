"use client";

import React from "react";
import { VehicleStatCard } from "@/components/garage/VehicleStatCard";
import { VEHICLES } from "@/lib/data";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export default function VehicleDetailPage() {
    const router = useRouter();
    const { id } = useParams();
    const [activeTab, setActiveTab] = React.useState('overview');

    const vehicle = VEHICLES.find(v => v.id === id);

    if (!vehicle) return <div>Vehicle not found</div>;

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'specs', label: 'Specs' },
        { id: 'mods', label: 'Mods' },
        { id: 'history', label: 'History' },
    ];

    return (
        <div className="pb-32">
            {/* Detail Header */}
            <div className="fixed top-0 left-0 right-0 md:pl-[80px] h-[64px] glass-navbar z-40 px-4 md:px-6 flex items-center justify-between">
                <button onClick={() => router.back()} className="p-2 text-white hover:bg-white/10 rounded-full transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <span className="text-sm font-bold uppercase tracking-widest">{vehicle.name}</span>
                <button className="p-2 text-white hover:bg-white/10 rounded-full transition-colors">
                    <MoreHorizontal className="w-6 h-6" />
                </button>
            </div>

            <div className="pt-[64px]">
                {/* Hero Gallery */}
                <div className="aspect-[4/3] relative overflow-hidden bg-zinc-900">
                    <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />
                    <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-white" />
                        <div className="w-1.5 h-1.5 rounded-full bg-grey/50" />
                        <div className="w-1.5 h-1.5 rounded-full bg-grey/50" />
                    </div>
                </div>

                <div className="container mx-auto max-w-2xl px-4 md:px-0 py-8 text-left">
                    {/* Identity Section */}
                    <section className="mb-8 space-y-1">
                        <p className="text-[12px] font-bold text-grey uppercase tracking-[0.2em]">{vehicle.brand}</p>
                        <h1 className="text-4xl font-extrabold text-white uppercase tracking-tighter">{vehicle.name}</h1>
                        <p className="text-base text-grey font-medium">{vehicle.variant || vehicle.year}</p>
                    </section>

                    {/* Tab Selector */}
                    <div className="flex border-b border-white/5 mb-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-all relative",
                                    activeTab === tab.id ? "text-white" : "text-grey"
                                )}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <VehicleStatCard
                            icon="🛡️"
                            label="Registry"
                            value="Valid 2026"
                            subtitle="Verified"
                        />
                        <VehicleStatCard
                            icon="⚙️"
                            label="Avg Consump"
                            value="8.4"
                            subtitle="L/100km"
                        />
                        <VehicleStatCard
                            icon="🔧"
                            label="Active Mods"
                            value="62"
                            subtitle="Functional"
                        />
                        <VehicleStatCard
                            icon="💰"
                            label="Value Est"
                            value="₹ 1,240K"
                            subtitle="Market Rate"
                        />
                    </div>

                    {/* Summary / Description */}
                    <div className="mt-10 mb-20 whitespace-pre-line text-left">
                        <p className="text-base text-grey leading-relaxed font-medium italic">
                            "The {vehicle.name} has been the backbone of this journey. Every mod has been chosen with precision to maintain the balance between high-speed stability and daily usability."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
