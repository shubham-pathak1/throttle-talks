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
        user: USERS[1],
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
        <div className="container mx-auto max-w-2xl px-4 md:px-0 py-8 pb-32">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-white uppercase tracking-tighter">Community</h1>
                <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-all">
                    Start Discussion
                </button>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 mb-10">
                {COMMUNITY_CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-5 py-3 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${activeCategory === cat.id ? "bg-white/5 border border-white/10 text-white" : "text-grey hover:text-white"
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {THREADS.map((thread) => (
                    <DiscussionCard key={thread.id} {...thread} />
                ))}
            </div>
        </div>
    );
}
