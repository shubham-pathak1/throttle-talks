"use client";

import React from "react";
import { GarageVehicleCard } from "@/components/garage/GarageVehicleCard";
import { VEHICLES } from "@/lib/data";
import { useRouter } from "next/navigation";

// Extended Mock Data for high-density Garage
const MY_VEHICLES = [
    {
        ...VEHICLES[2], // 911 GT3
        specs: { hp: 502, torque: 470, weight: "1435 kg" }
    },
    {
        ...VEHICLES[0], // Supra
        specs: { hp: 382, torque: 500, weight: "1520 kg" }
    }
];

export default function GaragePage() {
    const router = useRouter();

    return (
        <div className="container mx-auto max-w-2xl px-4 md:px-0 py-12 pb-32">
            <header className="flex flex-col gap-1 mb-12 text-left">
                <h1 className="text-4xl font-black text-white uppercase tracking-tighter">The Fleet</h1>
                <p className="text-sm text-grey font-bold uppercase tracking-[0.3em]">{MY_VEHICLES.length} active vessels</p>
            </header>

            <button className="w-full h-20 glass-card bg-white/[0.02] border-dashed border-white/20 flex flex-col items-center justify-center gap-1 mb-12 hover:bg-white/5 transition-all group active:scale-98">
                <span className="text-2xl text-grey group-hover:text-white transition-colors">+</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-grey group-hover:text-white transition-colors">Register New Vehicle</span>
            </button>

            <div className="space-y-8">
                {MY_VEHICLES.map((vehicle) => (
                    <GarageVehicleCard
                        key={vehicle.id}
                        {...vehicle}
                        onClick={() => router.push(`/garage/${vehicle.id}`)}
                    />
                ))}
            </div>
        </div>
    );
}
