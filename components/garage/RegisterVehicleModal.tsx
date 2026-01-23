"use client";

import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { X, Car, Bike, Info, Cpu, Zap, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface RegisterVehicleModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function RegisterVehicleModal({ isOpen, onClose }: RegisterVehicleModalProps) {
    const [type, setType] = React.useState<'car' | 'bike'>('car');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                onClick={onClose}
            />

            <GlassCard className="relative w-full max-w-xl p-0 overflow-hidden border-white/10 animate-in fade-in zoom-in duration-300 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-zinc-950">
                <header className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <div className="space-y-1">
                        <h2 className="text-xl font-black uppercase tracking-tighter text-white">Register Vehicle</h2>
                        <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em]">Initialize new technical log</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-xl transition-all text-white/20 hover:text-white"
                    >
                        <X className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                </header>

                <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto no-scrollbar">
                    {/* Classification Toggle */}
                    <div className="space-y-3">
                        <label className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em] pl-1">Classification</label>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setType('car')}
                                className={cn(
                                    "flex-1 h-16 rounded-2xl border flex items-center justify-center gap-3 transition-all",
                                    type === 'car' ? "bg-white text-black border-white shadow-xl" : "bg-white/[0.02] border-white/5 text-white/20 hover:text-white hover:bg-white/[0.05]"
                                )}
                            >
                                <Car className="w-5 h-5" strokeWidth={1.5} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Automobile</span>
                            </button>
                            <button
                                onClick={() => setType('bike')}
                                className={cn(
                                    "flex-1 h-16 rounded-2xl border flex items-center justify-center gap-3 transition-all",
                                    type === 'bike' ? "bg-white text-black border-white shadow-xl" : "bg-white/[0.02] border-white/5 text-white/20 hover:text-white hover:bg-white/[0.05]"
                                )}
                            >
                                <Bike className="w-5 h-5" strokeWidth={1.5} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Motorcycle</span>
                            </button>
                        </div>
                    </div>

                    {/* Technical Identification */}
                    <div className="grid grid-cols-2 gap-4">
                        <InputGroup label="Manufacturer / Brand" placeholder="E.G. PORSCHE" />
                        <InputGroup label="Model Designation" placeholder="E.G. 911 GT3" />
                        <InputGroup label="Manufacture Year" placeholder="YYYY" />
                        <InputGroup label="Engine CC" placeholder="DISPLACEMENT" />
                    </div>

                    {/* Output Calibration */}
                    <div className="space-y-3">
                        <label className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em] pl-1">Performance Parameters</label>
                        <div className="grid grid-cols-3 gap-2">
                            <div className="relative">
                                <Zap className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
                                <input placeholder="BHP" className="w-full h-12 bg-white/[0.03] border border-white/5 rounded-xl pl-9 pr-3 text-[10px] font-black text-white uppercase tracking-widest focus:outline-none focus:border-white/20" />
                            </div>
                            <div className="relative">
                                <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
                                <input placeholder="NM" className="w-full h-12 bg-white/[0.03] border border-white/5 rounded-xl pl-9 pr-3 text-[10px] font-black text-white uppercase tracking-widest focus:outline-none focus:border-white/20" />
                            </div>
                            <div className="relative">
                                <Cpu className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
                                <input placeholder="TYPE" className="w-full h-12 bg-white/[0.03] border border-white/5 rounded-xl pl-9 pr-3 text-[10px] font-black text-white uppercase tracking-widest focus:outline-none focus:border-white/20" />
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="p-8 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center">
                            <Info className="w-3.5 h-3.5 text-white/20" strokeWidth={1.5} />
                        </div>
                        <span className="text-[8px] font-black text-white/20 uppercase tracking-widest max-w-[140px]">Data will be synced to the global garage registry</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="px-12 py-4 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95"
                    >
                        Register
                    </button>
                </footer>
            </GlassCard>
        </div>
    );
}

function InputGroup({ label, placeholder }: { label: string, placeholder: string }) {
    return (
        <div className="space-y-2">
            <label className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em] pl-1">{label}</label>
            <input
                type="text"
                placeholder={placeholder}
                className="w-full h-12 bg-white/[0.03] border border-white/5 rounded-xl px-4 text-[10px] font-black uppercase tracking-widest text-white placeholder:text-white/5 focus:outline-none focus:border-white/10 transition-all"
            />
        </div>
    );
}
