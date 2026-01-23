"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Bike, UsersRound, Flame, LayoutList, BarChart3 } from "lucide-react";

interface FeedTab {
    id: string;
    label: string;
    icon?: any;
}

const TABS: FeedTab[] = [
    { id: 'all', label: 'All', icon: LayoutList },
    { id: 'following', label: 'Following', icon: UsersRound },
    { id: 'polls', label: 'Polls', icon: BarChart3 },
    { id: 'motorcycles', label: 'Motorcycles', icon: Bike },
];

export function FeedTabs({ activeId, onChange }: { activeId: string, onChange: (id: string) => void }) {
    return (
        <div className="sticky top-0 z-30 pb-4 pt-4">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar glass-card p-1.5 border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl w-full">
                {TABS.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeId === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => onChange(tab.id)}
                            className={cn(
                                "flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 relative overflow-hidden whitespace-nowrap shrink-0",
                                isActive
                                    ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                    : "text-white/40 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {isActive && (
                                <div className="absolute inset-0 bg-white/10 animate-pulse" />
                            )}
                            {Icon && <Icon className={cn("w-3.5 h-3.5", isActive ? "text-black" : "text-white/40")} strokeWidth={1.5} />}
                            <span className="relative z-10">{tab.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
