"use client";

import React from "react";
import { MeetupCard } from "@/components/meetups/MeetupCard";
import { HostMeetupModal } from "@/components/meetups/HostMeetupModal";
import { Search, Filter, SlidersHorizontal, SearchX, MapPin, Target, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const MEETUPS_DATA = [
    {
        id: "m1",
        title: "Midnight Tokyo Run",
        date: "Jan 24, 2026",
        time: "11:00 PM",
        attendees: 50,
        openSlots: 8,
        location: "Daikoku PA First",
        city: "Tokyo",
        type: "Ride",
        image: "https://images.unsplash.com/photo-1542362567-b05486f69246?auto=format&fit=crop&q=80&w=2070",
        description: "Strictly for automotive purists. Meeting at Daikoku First for a high-intensity drive through the C1 loop. All experience levels welcome for this night run.",
        category: "Cruising"
    },
    {
        id: "m2",
        title: "Western Ghats Sunrise",
        date: "Feb 02, 2026",
        time: "05:30 AM",
        attendees: 12,
        openSlots: 4,
        location: "Lonavala G-Point",
        city: "Lonavala",
        type: "Ride",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2070",
        description: "Early morning mountain pass celebration. Focused on driving purity and morning light photography. Technical briefing provided before the descent.",
        category: "Technical"
    },
    {
        id: "m3",
        title: "Mumbai Coffee & Chassis",
        date: "Feb 15, 2026",
        time: "08:00 AM",
        attendees: 25,
        openSlots: 20,
        location: "Worli Seaface",
        city: "Mumbai",
        type: "Meetup",
        image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=2070",
        description: "A stationary gathering for mechanical appreciation. Exchange telemetry logs and discuss suspension geometry over coffee.",
        category: "Cruising"
    }
];

export default function MeetupsPage() {
    const [activeTab, setActiveTab] = React.useState('upcoming');
    const [searchQuery, setSearchQuery] = React.useState("");
    const [activeFilter, setActiveFilter] = React.useState('All');
    const [isHostModalOpen, setIsHostModalOpen] = React.useState(false);

    // Advanced Filters
    const [isFilterExpanded, setIsFilterExpanded] = React.useState(false);
    const [activeCity, setActiveCity] = React.useState('All');
    const [activeType, setActiveType] = React.useState('All');

    const tabs = [
        { id: 'upcoming', label: 'Upcoming' },
        { id: 'past', label: 'Past Events' },
        { id: 'my', label: 'Joined' },
    ];

    const categoryFilters = ["All", "Cruising", "Track Day", "Off-road", "Technical"];
    const cities = ["All", "Tokyo", "Mumbai", "Lonavala"];
    const types = ["All", "Ride", "Meetup"];

    const filteredMeetups = MEETUPS_DATA.filter(meetup => {
        const matchesSearch =
            meetup.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            meetup.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            meetup.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = activeFilter === 'All' || meetup.category === activeFilter;
        const matchesCity = activeCity === 'All' || meetup.city === activeCity;
        const matchesType = activeType === 'All' || meetup.type === activeType;

        // Tab-based logic (simplified for demo)
        const matchesTab = activeTab === 'upcoming';

        return matchesSearch && matchesCategory && matchesCity && matchesType && matchesTab;
    });

    return (
        <div className="container mx-auto max-w-2xl px-4 md:px-0 py-12 pb-32 text-left">
            <HostMeetupModal
                isOpen={isHostModalOpen}
                onClose={() => setIsHostModalOpen(false)}
            />

            <header className="flex items-center justify-between mb-12">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black uppercase tracking-tighter text-white">Meetups</h1>
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">Plan rides and meetups</p>
                </div>
                <button
                    onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                    className={cn(
                        "h-12 w-12 glass-card flex items-center justify-center border transition-all",
                        isFilterExpanded ? "bg-white border-white shadow-[0_0_15px_white]" : "border-white/10 hover:bg-white/5"
                    )}
                >
                    <SlidersHorizontal className={cn("w-4 h-4 transition-colors", isFilterExpanded ? "text-black" : "text-white/40")} strokeWidth={1.5} />
                </button>
            </header>

            {/* Enhanced Search Row */}
            <div className="flex gap-3 mb-8 group/search">
                <div className="flex-1 relative">
                    <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${searchQuery ? 'text-white' : 'text-white/20'}`} strokeWidth={1.5} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for meetups and events..."
                        className="w-full h-14 bg-white/[0.03] border border-white/5 rounded-2xl pl-12 pr-4 text-sm font-medium text-white placeholder:text-white/10 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                        >
                            <SearchX className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                    )}
                </div>
                <button
                    onClick={() => setIsHostModalOpen(true)}
                    className="h-14 px-8 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                >
                    Host
                </button>
            </div>

            {/* Advanced Filter Shelf */}
            {isFilterExpanded && (
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 mb-8 animate-in slide-in-from-top-2 duration-300 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* City Select */}
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">
                                <MapPin className="w-3 h-3" strokeWidth={1.5} />
                                Select Node (City)
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {cities.map(city => (
                                    <button
                                        key={city}
                                        onClick={() => setActiveCity(city)}
                                        className={cn(
                                            "px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                                            activeCity === city ? "bg-white text-black" : "bg-white/5 text-white/40 hover:text-white"
                                        )}
                                    >
                                        {city}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Event Type */}
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">
                                <Target className="w-3 h-3" strokeWidth={1.5} />
                                Operation Type
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {types.map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setActiveType(type)}
                                        className={cn(
                                            "px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                                            activeType === type ? "bg-white text-black" : "bg-white/5 text-white/40 hover:text-white"
                                        )}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation Tabs */}
            <div className="flex border-b border-white/5 mb-10 bg-white/[0.01]">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === tab.id ? "text-white" : "text-white/20 hover:text-white"
                            }`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                        )}
                    </button>
                ))}
            </div>

            {/* Category Filter Chips */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar mb-12">
                {categoryFilters.map((f) => (
                    <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        className={`px-6 py-3 rounded-full border transition-all whitespace-nowrap text-[9px] font-black uppercase tracking-widest ${activeFilter === f
                                ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                : "bg-white/[0.02] border-white/5 text-white/40 hover:border-white/10 hover:text-white"
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Meetup Feed / Empty State */}
            <div className="space-y-10">
                {filteredMeetups.length > 0 ? (
                    filteredMeetups.map((meetup) => (
                        <MeetupCard key={meetup.id} {...meetup} />
                    ))
                ) : (
                    <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center">
                            <SearchX className="w-6 h-6 text-white/10" strokeWidth={1} />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-sm font-black text-white uppercase tracking-widest">No Matches Found</h3>
                            <p className="text-[10px] font-medium text-white/20 uppercase tracking-[0.2em]">Adjust coordinates or search parameters</p>
                        </div>
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setActiveFilter("All");
                                setActiveCity("All");
                                setActiveType("All");
                            }}
                            className="text-[9px] font-black text-white/40 hover:text-white underline underline-offset-4 uppercase tracking-widest pt-2"
                        >
                            Reset System
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
