"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/app-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Gauge, Zap, Activity, Info, ChevronRight, Fuel, Trash2, Check, Sliders, CircleDot } from "lucide-react";

const MY_BUILDS = [
    {
        id: "b1",
        name: "911 GT3 (992)",
        image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2070",
        specs: [
            { label: "Power", value: "502 HP" },
            { label: "Torque", value: "347 LB-FT" },
            { label: "0-60", value: "3.2s" }
        ],
        status: "Track Ready",
        mileage: "1,240 MI",
        setup: "MANTEY RACING PACK",
        drivetrain: "REAR STEER / RWD"
    },
    {
        id: "b2",
        name: "GR Supra (A90)",
        image: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&q=80&w=2070",
        specs: [
            { label: "Power", value: "485 HP" },
            { label: "Boost", value: "1.4 BAR" },
            { label: "Tuner", value: "Stage 2" }
        ],
        status: "Dyno Pending",
        mileage: "12,850 MI",
        setup: "HKS ADVAN SPEC",
        drivetrain: "ACTIVE DIFF / RWD"
    }
];

export default function GaragePage() {
    const [builds, setBuilds] = React.useState(MY_BUILDS);

    const handleDeleteVehicle = (id: string) => {
        setBuilds(builds.filter(b => b.id !== id));
    };

    const totalHP = builds.reduce((acc, b) => {
        const hpSpec = b.specs.find(s => s.label === "Power");
        const hpValue = parseInt(hpSpec?.value || "0");
        return acc + hpValue;
    }, 0);
    return (
        <main className="min-h-screen bg-black text-white selection:bg-white/30 relative overflow-hidden">
            <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50 pointer-events-none" />

            <Navbar />

            <div className="container mx-auto px-4 lg:px-8 pt-24 relative z-10">
                <div className="flex gap-12 py-8 lg:py-16">
                    <aside className="hidden lg:block w-64 shrink-0 sticky top-32 h-fit">
                        <Sidebar />
                    </aside>

                    <div className="flex-1 max-w-4xl mx-auto w-full">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-end justify-between mb-12 px-2">
                                <div>
                                    <h1 className="text-4xl font-black tracking-tight uppercase leading-none font-outfit">The Collection</h1>
                                </div>
                                <div className="flex gap-8 text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500">
                                    <div className="flex flex-col items-end">
                                        <span className="text-white font-black">{builds.length.toString().padStart(2, '0')}</span>
                                        <span>Vehicles</span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-white font-black">{totalHP}</span>
                                        <span>Total HP</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-12 pb-32">
                                {builds.map((build) => (
                                    <BuildCard key={build.id} {...build} onDelete={handleDeleteVehicle} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function BuildCard({ id, name: initialName, image, specs: initialSpecs, status: initialStatus, mileage: initialMileage, setup: initialSetup, drivetrain: initialDrivetrain, onDelete }: any) {
    const [isEditing, setIsEditing] = React.useState(false);
    const [name, setName] = React.useState(initialName);
    const [specs, setSpecs] = React.useState(initialSpecs);
    const [status, setStatus] = React.useState(initialStatus);
    const [mileage, setMileage] = React.useState(initialMileage);
    const [setup, setSetup] = React.useState(initialSetup);
    const [drivetrain, setDrivetrain] = React.useState(initialDrivetrain);

    const handleSpecChange = (index: number, value: string) => {
        const newSpecs = [...specs];
        newSpecs[index].value = value;
        setSpecs(newSpecs);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 p-1 rounded-[32px] bg-zinc-900/20 border border-white/5 transition-all duration-700 overflow-hidden backdrop-blur-sm">
            <div className="w-full lg:w-[45%] aspect-[4/3] rounded-[28px] overflow-hidden border border-white/5 relative">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover opacity-80 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-6 left-6">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        {isEditing ? (
                            <input
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="text-[10px] font-mono uppercase text-white tracking-widest bg-black/40 border border-white/10 rounded px-1 focus:outline-none focus:border-white/20"
                            />
                        ) : (
                            <span className="text-[10px] font-mono uppercase text-white tracking-widest">{status}</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex-1 p-4 lg:p-8 flex flex-col">
                <div className="flex justify-between items-start mb-10">
                    {isEditing ? (
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="text-2xl font-black uppercase tracking-tighter text-white bg-white/5 border border-white/10 rounded-lg px-2 py-1 focus:outline-none focus:border-white/20"
                        />
                    ) : (
                        <h3 className="text-2xl font-black uppercase tracking-tighter text-white">{name}</h3>
                    )}
                    <div className="flex items-center gap-6">
                        {isEditing ? (
                            <div className="flex items-center gap-8">
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="px-6 py-2.5 bg-white text-black text-[11px] font-black uppercase tracking-[0.15em] rounded-full hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)] active:scale-95"
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={() => onDelete(id)}
                                    className="text-[11px] font-black text-zinc-600 hover:text-red-500 uppercase tracking-[0.15em] transition-colors"
                                >
                                    Remove
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-6 py-2.5 bg-zinc-900 border border-white/5 text-zinc-400 text-[11px] font-black uppercase tracking-[0.15em] rounded-full hover:bg-zinc-800 hover:text-white transition-all"
                                >
                                    Edit Build
                                </button>
                                <button className="p-2.5 text-zinc-700 hover:text-white transition-all">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-auto">
                    {specs.map((spec: any, i: number) => (
                        <div key={i} className="space-y-1">
                            <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest block">{spec.label}</span>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={spec.value}
                                    onChange={(e) => handleSpecChange(i, e.target.value)}
                                    className="text-lg font-black text-white tracking-tighter block bg-white/5 border border-white/10 rounded-lg px-2 w-full focus:outline-none focus:border-white/20"
                                />
                            ) : (
                                <span className="text-lg font-black text-white tracking-tighter block">{spec.value}</span>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[10px] font-mono text-zinc-700 uppercase tracking-widest">
                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-1.5">
                            <Gauge className="w-3.5 h-3.5 text-zinc-800" />
                            {isEditing ? (
                                <input
                                    value={mileage}
                                    onChange={(e) => setMileage(e.target.value)}
                                    className="bg-white/5 border border-white/10 rounded px-2 py-0.5 text-zinc-300 focus:outline-none focus:border-white/20 w-32"
                                />
                            ) : (
                                <span className="text-zinc-500">MILEAGE: <span className="text-zinc-300">{mileage}</span></span>
                            )}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Sliders className="w-3.5 h-3.5 text-zinc-800" />
                            {isEditing ? (
                                <input
                                    value={setup}
                                    onChange={(e) => setSetup(e.target.value)}
                                    className="bg-white/5 border border-white/10 rounded px-2 py-0.5 text-zinc-300 focus:outline-none focus:border-white/20 w-40"
                                />
                            ) : (
                                <span className="text-zinc-500">SETUP: <span className="text-zinc-300">{setup}</span></span>
                            )}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CircleDot className="w-3.5 h-3.5 text-zinc-800" />
                            {isEditing ? (
                                <input
                                    value={drivetrain}
                                    onChange={(e) => setDrivetrain(e.target.value)}
                                    className="bg-white/5 border border-white/10 rounded px-2 py-0.5 text-zinc-300 focus:outline-none focus:border-white/20 w-40"
                                />
                            ) : (
                                <span className="text-zinc-500">DRIVE: <span className="text-zinc-300">{drivetrain}</span></span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
