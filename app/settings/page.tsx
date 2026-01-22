"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/app-sidebar";
import {
    User,
    Shield,
    Bell,
    Gauge,
    RotateCcw,
    ChevronRight,
    Camera,
    Globe,
    Instagram,
    Twitter,
    Car,
    CreditCard,
    Zap,
    History
} from "lucide-react";

export default function SettingsPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-white/30 relative overflow-hidden">
            <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50" />

            <Navbar />

            <div className="container mx-auto px-4 lg:px-8 pt-24 relative z-10">
                <div className="flex gap-12 py-8 lg:py-16">
                    <aside className="hidden lg:block w-[72px] shrink-0 sticky top-8 h-fit">
                        <Sidebar />
                    </aside>

                    <div className="flex-1 max-w-4xl mx-auto w-full">
                        <div className="flex flex-col gap-12 pb-32">
                            <div className="flex items-end justify-between px-2">
                                <div>
                                    <h1 className="text-4xl font-black tracking-tight uppercase leading-none font-outfit">Configuration</h1>
                                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-4 pl-1">Driver Profile & System Parameters</p>
                                </div>
                            </div>

                            <div className="space-y-20">
                                {/* 1. PUBLIC PROFILE */}
                                <section className="space-y-8">
                                    <div className="flex items-center gap-3 px-2">
                                        <User className="w-4 h-4 text-zinc-600" />
                                        <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-white">Public Profile</h2>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Banner & Avatar */}
                                        <div className="relative h-48 rounded-[32px] overflow-hidden border border-white/5 bg-zinc-900/40 group">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                            <button className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Camera className="w-6 h-6 text-white/50" />
                                            </button>

                                            <div className="absolute -bottom-6 left-8 flex items-end gap-6">
                                                <div className="relative group/avatar cursor-pointer">
                                                    <img
                                                        src="https://github.com/shubham-pathak1.png"
                                                        className="w-24 h-24 rounded-2xl ring-4 ring-black object-cover"
                                                        alt="Profile"
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover/avatar:opacity-100 transition-opacity rounded-2xl">
                                                        <RotateCcw className="w-5 h-5 text-white" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-8 rounded-[32px] bg-zinc-900/20 border border-white/5 backdrop-blur-sm pt-12 space-y-8">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <SettingsField label="Display Name" defaultValue="Shubham Pathak" />
                                                <SettingsField label="Username" defaultValue="pathak_tt" mono />
                                                <div className="md:col-span-2">
                                                    <SettingsTextArea
                                                        label="Driver Bio"
                                                        defaultValue="992 GT3 Owner. Track enthusiast. Building the ultimate automotive network."
                                                    />
                                                </div>
                                            </div>

                                            <div className="pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <SettingsField icon={<Instagram className="w-3.5 h-3.5" />} label="Instagram" defaultValue="@pathak_visuals" />
                                                <SettingsField icon={<Twitter className="w-3.5 h-3.5" />} label="X / Twitter" defaultValue="@pathak_tt" />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* 2. GARAGE HUB */}
                                <section className="space-y-8">
                                    <div className="flex items-center gap-3 px-2">
                                        <Car className="w-4 h-4 text-zinc-600" />
                                        <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-white">Garage Hub</h2>
                                    </div>
                                    <div className="p-8 rounded-[32px] bg-zinc-900/20 border border-white/5 backdrop-blur-sm space-y-6">
                                        <SettingToggle label="Public Garage" desc="Allow other drivers to view your collection" active />
                                        <SettingToggle label="Display Build Values" desc="Show estimated build costs on vehicle cards" />
                                        <div className="pt-6 border-t border-white/5">
                                            <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest pl-1 mb-3 block">Primary Vehicle</label>
                                            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all cursor-pointer group">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-8 rounded-lg bg-zinc-800 border border-white/5 overflow-hidden">
                                                        <img src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=100" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <span className="text-sm font-bold text-white block">911 GT3 (992)</span>
                                                        <span className="text-[10px] text-zinc-500 font-mono uppercase">Current Daily</span>
                                                    </div>
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-zinc-800 group-hover:text-white transition-all" />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* 3. TELEMETRY & UNITS */}
                                <section className="space-y-8">
                                    <div className="flex items-center gap-3 px-2">
                                        <Gauge className="w-4 h-4 text-zinc-600" />
                                        <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-white">Telemetry Parameters</h2>
                                    </div>
                                    <div className="p-8 rounded-[32px] bg-zinc-900/20 border border-white/5 backdrop-blur-sm grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <UnitSelector label="Power" options={["HP", "kW", "PS"]} defaultIdx={0} />
                                        <UnitSelector label="Torque" options={["Lb-ft", "Nm"]} defaultIdx={0} />
                                        <UnitSelector label="Velocity" options={["MPH", "KM/H"]} defaultIdx={1} />
                                        <UnitSelector label="Pressure" options={["PSI", "BAR"]} defaultIdx={1} />
                                        <UnitSelector label="Temp" options={["°C", "°F"]} defaultIdx={0} />
                                        <UnitSelector label="Weight" options={["KG", "LBS"]} defaultIdx={0} />
                                    </div>
                                </section>

                                {/* 4. SECURITY & PRIVACY */}
                                <section className="space-y-8">
                                    <div className="flex items-center gap-3 px-2">
                                        <Shield className="w-4 h-4 text-zinc-600" />
                                        <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-white">Security Grid</h2>
                                    </div>
                                    <div className="p-8 rounded-[32px] bg-zinc-900/20 border border-white/5 backdrop-blur-sm space-y-6">
                                        <SettingToggle label="Ghost Mode" desc="Hide active location during meetups" />
                                        <SettingToggle label="Strict Requests" desc="Only verified drivers can message you" active />
                                        <SettingToggle label="Show Online Status" desc="Broadcast when you are in 'Pit Lane'" active />
                                    </div>
                                </section>

                                {/* 5. NOTIFICATION PROTOCOLS */}
                                <section className="space-y-8">
                                    <div className="flex items-center gap-3 px-2">
                                        <Bell className="w-4 h-4 text-zinc-600" />
                                        <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-white">Alert Protocols</h2>
                                    </div>
                                    <div className="p-8 rounded-[32px] bg-zinc-900/20 border border-white/5 backdrop-blur-sm space-y-6">
                                        <SettingToggle label="Meetup Alerts" desc="Push notifications for grid invites" active />
                                        <SettingToggle label="Technical Updates" desc="New mods or logs from followed builds" active />
                                        <SettingToggle label="Community Mentions" desc="Direct tags in feed technical discussions" />
                                    </div>
                                </section>

                                <div className="pt-12 flex justify-end gap-6 border-t border-white/5">
                                    <button className="px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-all">Discard Changes</button>
                                    <button className="px-12 py-3 rounded-full bg-white text-black text-[11px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-95">Execute Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function SettingsField({ label, defaultValue, mono = false, icon }: { label: string, defaultValue: string, mono?: boolean, icon?: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2 pl-1">
                {icon && <span className="text-zinc-600">{icon}</span>}
                <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{label}</label>
            </div>
            <input
                type="text"
                defaultValue={defaultValue}
                className={`w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-[13px] font-bold text-white focus:outline-none focus:border-white/20 transition-all shadow-inner ${mono ? 'font-mono' : ''}`}
            />
        </div>
    );
}

function SettingsTextArea({ label, defaultValue }: { label: string, defaultValue: string }) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest pl-1">{label}</label>
            <textarea
                defaultValue={defaultValue}
                rows={3}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-[13px] font-medium text-zinc-300 focus:outline-none focus:border-white/20 transition-all resize-none leading-relaxed"
            />
        </div>
    );
}

function UnitSelector({ label, options, defaultIdx }: { label: string, options: string[], defaultIdx: number }) {
    const [selected, setSelected] = React.useState(defaultIdx);
    return (
        <div className="space-y-3">
            <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest pl-1">{label}</label>
            <div className="flex gap-1 bg-white/[0.02] border border-white/5 p-1 rounded-2xl">
                {options.map((opt, i) => (
                    <button
                        key={opt}
                        onClick={() => setSelected(i)}
                        className={`flex-1 py-2 text-[10px] font-black uppercase tracking-tighter rounded-xl transition-all ${selected === i ? 'bg-white text-black shadow-lg' : 'text-zinc-600 hover:text-white'}`}
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
}

function SettingToggle({ label, desc, active = false }: { label: string, desc: string, active?: boolean }) {
    const [isOn, setIsOn] = React.useState(active);

    return (
        <div className="flex items-center justify-between group py-1">
            <div className="space-y-1">
                <span className="text-sm font-bold text-white block group-hover:text-zinc-200 transition-colors uppercase tracking-tight">{label}</span>
                <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-tighter">{desc}</span>
            </div>
            <button
                onClick={() => setIsOn(!isOn)}
                className={`w-12 h-6 rounded-full relative transition-all duration-500 overflow-hidden border ${isOn ? 'bg-white border-white' : 'bg-transparent border-white/10'}`}
            >
                <div className={`absolute top-1 bottom-1 w-4 rounded-full transition-all duration-500 ${isOn ? 'left-[26px] bg-black' : 'left-1 bg-white/20'}`} />
            </button>
        </div>
    );
}
