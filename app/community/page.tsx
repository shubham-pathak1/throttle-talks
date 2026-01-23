"use client";

import React from "react";
import { DiscussionCard } from "@/components/community/DiscussionCard";
import { USERS } from "@/lib/data";

const COMMUNITY_CATEGORIES = [
    { id: 'all', label: 'All' },
    { id: 'questions', label: 'Questions (47)' },
    { id: 'mods', label: 'Mods & Upgrades' },
    { id: 'maintenance', label: 'Maintenance' },
    { id: 'buying', label: 'Buying Advice' },
    { id: 'general', label: 'General' },
];

const THREADS = [
    {
        id: "t1",
        user: USERS[0], // Fixed from USERS[1]
        timestamp: "39 minutes ago",
        hashtags: ["MegaMech", "Hyderabad"],
        content: "I have a 2nd hand 2018 Ford Figo. The steering is completely off angle, to go straight I need to hold it at least 30° in the left. I've tried alignment twice but the issue persists. Any leads on specialized mechanics in Hyderabad?",
        stats: { comments: 1, views: 23 }
    },
    {
        id: "t2",
        user: USERS[0],
        timestamp: "3 hours ago",
        hashtags: ["TechTalk", "Performance"],
        content: "What's the best way to monitor oil temps on a modern Honda? Is the OBDII port fast enough for track usage or should I switch to a dedicated sensor?",
        stats: { comments: 14, views: 156 }
    }
];

export default function CommunityPage() {
    const [activeCategory, setActiveCategory] = React.useState('all');

    return (
        <div className="container mx-auto max-w-2xl px-4 md:px-0 py-12 pb-32 text-left">
            <div className="flex items-center justify-between mb-12">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Community</h1>
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">Protocol Exchange Node</p>
                </div>
                <button className="bg-white text-black px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95">
                    Start Discussion
                </button>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-12">
                {COMMUNITY_CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${activeCategory === cat.id
                            ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                            : "bg-white/[0.02] border-white/5 text-white/40 hover:border-white/10 hover:text-white"
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            <div className="space-y-6">
                {THREADS.map((thread) => (
                    <DiscussionCard key={thread.id} {...thread} />
                ))}
            </div>
        </div>
    );
}
