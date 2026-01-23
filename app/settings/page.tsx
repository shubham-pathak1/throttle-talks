"use client";

import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import {
    User,
    Shield,
    Gauge,
    Camera,
    RotateCcw,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = React.useState('account');

    const tabs = [
        { id: 'account', label: 'Account' },
        { id: 'security', label: 'Security' },
        { id: 'standards', label: 'Standards' },
    ];

    return (
        <div className="container mx-auto max-w-2xl px-4 md:px-0 py-12 pb-32 text-left">
            <header className="mb-12">
                <h1 className="text-4xl font-black uppercase tracking-tighter text-white">Configuration</h1>
                <p className="text-[10px] font-bold text-grey uppercase tracking-[0.4em] mt-1">System Protocols & User Logic</p>
            </header>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar mb-12">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border",
                            activeTab === tab.id
                                ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                : "bg-white/[0.02] border-white/5 text-grey hover:border-white/20 hover:text-white"
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="space-y-12">
                {activeTab === 'account' && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <section className="space-y-6">
                            <div className="flex items-center gap-2 px-1">
                                <User className="w-4 h-4 text-grey" />
                                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white">Identity Node</h2>
                            </div>
                            <div className="relative group mb-8">
                                <div className="aspect-[3/1] rounded-2xl overflow-hidden glass-card p-0 border-white/5 relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                    <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                        <Camera className="w-6 h-6 text-white" />
                                    </button>
                                </div>
                                <div className="absolute left-6 -bottom-6 w-20 h-20 rounded-2xl overflow-hidden border-4 border-black group/avatar cursor-pointer">
                                    <img src="https://github.com/shubham-pathak1.png" className="w-full h-full object-cover" alt="Profile" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center">
                                        <RotateCcw className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                            </div>
                            <GlassCard className="pt-10 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <SettingsInput label="Full Designation" defaultValue="Arthur Vance" />
                                    <SettingsInput label="Network Handle" defaultValue="vance_dynamics" mono />
                                    <div className="md:col-span-2">
                                        <SettingsTextarea label="Protocol Bio" defaultValue="992 GT3 Dynamics. Track Telemetry Specialist. Building the ultimate automotive vanguard." />
                                    </div>
                                </div>
                            </GlassCard>
                        </section>
                    </div>
                )}

                {activeTab === 'security' && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <section className="space-y-6">
                            <div className="flex items-center gap-2 px-1">
                                <Shield className="w-4 h-4 text-grey" />
                                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white">Security Logic</h2>
                            </div>
                            <GlassCard className="space-y-4">
                                <SettingsToggle label="Stealth Mode" desc="Hide active location during grid meetups" />
                                <SettingsToggle label="Encrypted Signals" desc="Only verified nodes can transmit messages" active />
                                <SettingsToggle label="Broadcast Status" desc="Show node activity in Pit Lane" active />
                            </GlassCard>
                        </section>
                    </div>
                )}

                {activeTab === 'standards' && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <section className="space-y-6">
                            <div className="flex items-center gap-2 px-1">
                                <Gauge className="w-4 h-4 text-grey" />
                                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white">Engineering Standards</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <UnitSelector label="Power" options={["HP", "kW", "PS"]} defaultIdx={0} />
                                <UnitSelector label="Torque" options={["Nm", "lb-ft"]} defaultIdx={0} />
                                <UnitSelector label="Speed" options={["km/h", "mph"]} defaultIdx={0} />
                                <UnitSelector label="Weight" options={["kg", "lbs"]} defaultIdx={0} />
                            </div>
                        </section>
                    </div>
                )}
            </div>

            <div className="mt-16 flex justify-between items-center border-t border-white/5 pt-12">
                <button className="flex items-center gap-2 text-red-500/60 hover:text-red-500 transition-colors text-[10px] font-black uppercase tracking-widest">
                    <LogOut className="w-4 h-4" />
                    Terminate Session
                </button>
                <div className="flex gap-4">
                    <button className="px-6 py-2 text-[10px] font-black uppercase tracking-widest text-grey hover:text-white transition-all">Discard</button>
                    <button className="px-10 py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95">Execute Commit</button>
                </div>
            </div>
        </div>
    );
}

function SettingsInput({ label, defaultValue, mono = false }: { label: string, defaultValue: string, mono?: boolean }) {
    return (
        <div className="space-y-2">
            <label className="text-[9px] font-black text-grey uppercase tracking-[0.3em] pl-1">{label}</label>
            <input type="text" defaultValue={defaultValue} className={cn(
                "w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-sm font-bold text-white focus:outline-none focus:border-white/20 transition-all",
                mono && "font-mono"
            )} />
        </div>
    );
}

function SettingsTextarea({ label, defaultValue }: { label: string, defaultValue: string }) {
    return (
        <div className="space-y-2">
            <label className="text-[9px] font-black text-grey uppercase tracking-[0.3em] pl-1">{label}</label>
            <textarea defaultValue={defaultValue} rows={3} className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-sm font-semibold text-grey leading-relaxed focus:outline-none focus:border-white/20 transition-all resize-none" />
        </div>
    );
}

function SettingsToggle({ label, desc, active = false }: { label: string, desc: string, active?: boolean }) {
    const [isOn, setIsOn] = React.useState(active);
    return (
        <div className="flex items-center justify-between group py-2">
            <div className="space-y-0.5">
                <span className="text-sm font-bold text-white block uppercase tracking-tight">{label}</span>
                <span className="text-[9px] text-grey font-bold uppercase tracking-widest">{desc}</span>
            </div>
            <button
                onClick={() => setIsOn(!isOn)}
                className={cn(
                    "w-10 h-6 rounded-full relative transition-all duration-300 border-2",
                    isOn ? "bg-white border-white" : "bg-transparent border-white/10"
                )}
            >
                <div className={cn(
                    "absolute top-1 w-3 h-3 rounded-full transition-all duration-300",
                    isOn ? "left-5 bg-black" : "left-1 bg-white/20"
                )} />
            </button>
        </div>
    );
}

function UnitSelector({ label, options, defaultIdx }: { label: string, options: string[], defaultIdx: number }) {
    const [selected, setSelected] = React.useState(defaultIdx);
    return (
        <div className="space-y-3">
            <label className="text-[9px] font-black text-grey uppercase tracking-[0.3em] pl-1">{label} Unit</label>
            <div className="flex bg-white/[0.02] border border-white/5 p-1 rounded-2xl h-12">
                {options.map((opt, i) => (
                    <button
                        key={opt}
                        onClick={() => setSelected(i)}
                        className={cn(
                            "flex-1 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                            selected === i ? "bg-white text-black font-black" : "text-grey hover:text-white"
                        )}
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
}
