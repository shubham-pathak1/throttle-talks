import React from "react";
import { Search } from "lucide-react";

export function ExploreSearch() {
    return (
        <div className="sticky top-[84px] z-30 bg-black/60 backdrop-blur-3xl border-b border-white/5 px-4 md:px-6 py-6">
            <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/20" strokeWidth={1.5} />
                <input
                    type="text"
                    placeholder="SCAN NETWORK FOR CHASSIS, SIGNALS, LOGS..."
                    className="w-full h-14 glass-card bg-white/[0.03] border-white/5 pl-12 pr-4 text-xs font-black uppercase tracking-widest text-white placeholder:text-white/10 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all"
                />
            </div>
        </div>
    );
}
