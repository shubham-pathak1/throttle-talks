"use client";

import React from "react";
import { MeetupCard } from "@/components/meetups/MeetupCard";
import { HostMeetupModal } from "@/components/meetups/HostMeetupModal";
import { Search, Filter, SlidersHorizontal } from "lucide-react";

const MEETUPS = [
    {
        id: "m1",
        title: "Midnight Tokyo Run",
        date: "Jan 24, 2026",
        time: "23:00",
        attendees: 50,
        openSlots: 8,
        location: "Daikoku PA First",
        image: "https://images.unsplash.com/photo-1542362567-b05486f69246?auto=format&fit=crop&q=80&w=2070",
        description: "Strictly for automotive purists. Meeting at Daikoku First at 23:00 for a structural drive through the C1 loop. High-speed telemetry logging session included."
    },
    {
        id: "m2",
        title: "Western Ghats Sunrise",
        date: "Feb 02, 2026",
        time: "05:30",
        attendees: 12,
        openSlots: 4,
        location: "Lonavala G-Point",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2070",
        description: "Early morning hill climb for performance focus. Dynamic stability testing on mountain hairpins. Meetup includes technical debriefing at the summit."
    }
];

export default function MeetupsPage() {
    const [activeTab, setActiveTab] = React.useState('upcoming');
    const [isHostModalOpen, setIsHostModalOpen] = React.useState(false);

    const tabs = [
        { id: 'upcoming', label: 'Upcoming' },
        { id: 'past', label: 'Past Events' },
        { id: 'my', label: 'My Registry' },
    ];

    const filters = ["High Speed", "Cruising", "Track Day", "Off-road"];

    return (
        <div className="container mx-auto max-w-2xl px-4 md:px-0 py-12 pb-32 text-left">
            <HostMeetupModal
                isOpen={isHostModalOpen}
                onClose={() => setIsHostModalOpen(false)}
            />

            <header className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter text-white">Synchronization</h1>
                    <p className="text-[10px] font-bold text-grey uppercase tracking-[0.4em] mt-1">Real-time Drive Coordination</p>
                </div>
                <button className="h-12 w-12 glass-card flex items-center justify-center hover:bg-white/5 transition-all">
                    <SlidersHorizontal className="w-5 h-5 text-white" />
                </button>
            </header>

            {/* Search & Global Filter */}
            <div className="flex gap-3 mb-12">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-grey" />
                    <input
                        type="text"
                        placeholder="Search active coordinates..."
                        className="w-full h-12 bg-white/[0.02] border border-white/10 rounded-xl pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-white/20 transition-all"
                    />
                </div>
                <button
                    onClick={() => setIsHostModalOpen(true)}
                    className="h-12 px-6 bg-white text-black rounded-xl font-bold text-[10px] uppercase tracking-widest active:scale-95 transition-all"
                >
                    Host
                </button>
            </div>

            {/* Logic Tabs */}
            <div className="flex border-b border-white/5 mb-8">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === tab.id ? "text-white" : "text-zinc-600"
                            }`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white shadow-[0_0_8px_white]" />
                        )}
                    </button>
                ))}
            </div>

            {/* Quick Category Filters */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar mb-10">
                {filters.map((f) => (
                    <button key={f} className="px-5 py-2.5 rounded-full border border-white/5 bg-white/[0.02] text-[9px] font-bold text-grey uppercase tracking-wider hover:border-white/20 hover:text-white transition-all whitespace-nowrap">
                        {f}
                    </button>
                ))}
            </div>

            <div className="space-y-8">
                {MEETUPS.map((meetup) => (
                    <MeetupCard key={meetup.id} {...meetup} />
                ))}
            </div>
        </div>
    );
}
