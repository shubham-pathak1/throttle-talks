"use client";

import React from "react";
import { GarageVehicleCard } from "@/components/garage/GarageVehicleCard";
import { VEHICLES } from "@/lib/data";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { RegisterVehicleModal } from "@/components/garage/RegisterVehicleModal";

// Mock Data with Enhanced Contextual Info
const MY_VEHICLES = [
    {
        ...VEHICLES[2], // 911 GT3
        type: 'car',
        cc: '3996',
        isModded: true,
        mods: ["Manthey Racing Kit", "Carbon Buckets", "PFC Brakes"],
        specs: { hp: 502, torque: 470, weight: "1435 kg" }
    },
    {
        ...VEHICLES[0], // Supra
        type: 'car',
        cc: '2998',
        isModded: true,
        mods: ["HKS Intake", "Titan Downpipe", "Ohlins DFV"],
        specs: { hp: 382, torque: 500, weight: "1520 kg" }
    },
    {
        id: "v_bik_1",
        name: "S1000RR",
        brand: "BMW",
        year: "2024",
        type: 'bike',
        cc: '999',
        isModded: false,
        image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=2070",
        specs: { hp: 205, torque: 113, weight: "197 kg" }
    }
];

export default function GaragePage() {
    const [activeCategory, setActiveCategory] = React.useState<'all' | 'car' | 'bike'>('all');
    const [isRegisterModalOpen, setIsRegisterModalOpen] = React.useState(false);

    const filteredVehicles = MY_VEHICLES.filter(v =>
        activeCategory === 'all' || v.type === activeCategory
    );

    return (
        <div className="container mx-auto max-w-2xl px-4 md:px-0 py-12 pb-32 relative min-h-screen">
            <RegisterVehicleModal
                isOpen={isRegisterModalOpen}
                onClose={() => setIsRegisterModalOpen(false)}
            />

            <header className="flex flex-col gap-1 mb-10 text-left">
                <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Garage</h1>
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">{MY_VEHICLES.length} vehicles added</p>
            </header>

            {/* High-Density Category Toggle & Creator */}
            <div className="flex items-center justify-between mb-12 gap-4">
                <div className="flex gap-2">
                    {['all', 'car', 'bike'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat as any)}
                            className={cn(
                                "px-6 py-2.5 rounded-full border text-[9px] font-black uppercase tracking-widest transition-all",
                                activeCategory === cat
                                    ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                    : "bg-white/[0.02] border-white/5 text-white/40 hover:border-white/10 hover:text-white"
                            )}
                        >
                            {cat}s
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => setIsRegisterModalOpen(true)}
                    className="h-10 w-10 bg-white text-black rounded-xl flex items-center justify-center shadow-lg hover:bg-zinc-200 active:scale-95 transition-all group shrink-0"
                    title="Add Vehicle"
                >
                    <Plus className="w-5 h-5" strokeWidth={2.5} />
                </button>
            </div>

            {/* High-Density Feed */}
            <div className="space-y-6">
                {filteredVehicles.map((vehicle) => (
                    <GarageVehicleCard
                        key={vehicle.id}
                        {...vehicle}
                    />
                ))}
            </div>
        </div>
    );
}
