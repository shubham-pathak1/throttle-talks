import React from "react";
import { Search } from "lucide-react";

export function ExploreSearch() {
    return (
        <div className="sticky top-[64px] z-30 bg-black/80 backdrop-blur-xl border-b border-white/5 px-4 md:px-6 py-4">
            <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-grey" />
                <input
                    type="text"
                    placeholder="Search vehicles, users, posts..."
                    className="w-full h-12 glass-card bg-white/5 pl-12 pr-4 text-base text-white placeholder:text-grey focus:outline-none focus:ring-1 focus:ring-white transition-all"
                />
            </div>
        </div>
    );
}
