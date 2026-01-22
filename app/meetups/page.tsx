"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/app-sidebar";
import { Calendar, MapPin, Users, Clock, ChevronRight, Plus, Search, Filter, X } from "lucide-react";

const INITIAL_MEETS = [
    {
        id: "m1",
        title: "Midnight Tokyo Run",
        type: "CRUISE",
        location: "Shuto Expressway",
        date: "JAN 24, 2026",
        time: "23:00",
        attendees: 42,
        totalSeats: 50,
        image: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80&w=2070",
        details: "Strictly for automotive purists. Meeting at Daikoku PA first.",
        isOrganizer: false
    },
    {
        id: "m2",
        title: "Buddh Track Day",
        type: "TRACK",
        location: "BIC, Greater Noida",
        date: "JAN 30, 2026",
        time: "07:00",
        attendees: 18,
        totalSeats: 25,
        image: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&q=80&w=2070",
        details: "Open pit lane session. Technical inspection mandatory.",
        isOrganizer: false
    },
    {
        id: "m3",
        title: "Coffee & Cold Starts",
        type: "SOCIAL",
        location: "Blue Tokai HQ",
        date: "FEB 01, 2026",
        time: "08:30",
        attendees: 85,
        totalSeats: 150,
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070",
        details: "Early morning gathering for all builds. Strictly no revving.",
        isOrganizer: false
    }
];

const CATEGORIES = ["ALL", "CRUISE", "TRACK", "SOCIAL", "DRAG"];

export default function MeetupsPage() {
    const [meetups, setMeetups] = React.useState(INITIAL_MEETS);
    const [activeCategory, setActiveCategory] = React.useState("ALL");
    const [searchQuery, setSearchQuery] = React.useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

    const filteredMeets = meetups.filter(meet => {
        const matchesCategory = activeCategory === "ALL" || meet.type === activeCategory;
        const matchesSearch = meet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            meet.location.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleCreateMeetup = (newMeet: any) => {
        setMeetups([newMeet, ...meetups]);
        setIsCreateModalOpen(false);
    };

    const handleDeleteMeetup = (id: string) => {
        setMeetups(meetups.filter(m => m.id !== id));
    };

    return (
        <main className="min-h-screen bg-black text-white selection:bg-white/30 relative overflow-hidden font-outfit">
            <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50 pointer-events-none" />

            <Navbar />

            <div className="container mx-auto px-4 lg:px-8 pt-24 relative z-10">
                <div className="flex gap-12 py-8 lg:py-16">
                    <aside className="hidden lg:block w-[72px] shrink-0 sticky top-8 h-fit">
                        <Sidebar />
                    </aside>

                    <div className="flex-1 max-w-4xl mx-auto w-full">
                        <div className="flex flex-col gap-8">
                            {/* Meetups Header */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
                                <div className="flex items-center gap-6">
                                    <h1 className="text-4xl font-black tracking-tight uppercase leading-none">The Grid</h1>
                                    <button
                                        onClick={() => setIsCreateModalOpen(true)}
                                        className="flex items-center gap-2 px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                        <span>Create Meetup</span>
                                    </button>
                                </div>
                                <div className="flex items-center gap-8 text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500">
                                    <div className="flex flex-col items-end">
                                        <span className="text-white font-black">{filteredMeets.length.toString().padStart(2, '0')}</span>
                                        <span>Visible Events</span>
                                    </div>
                                </div>
                            </div>

                            {/* Search & Filter Bar */}
                            <div className="space-y-6 px-2 mb-4">
                                <div className="flex flex-col md:flex-row gap-4 items-center">
                                    <div className="relative flex-1 group w-full">
                                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                                            <Search className="w-4 h-4 text-zinc-600 group-focus-within:text-white transition-colors" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="SEARCH BY NAME OR LOCATION..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full bg-zinc-900/40 border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-[10px] font-mono tracking-widest uppercase focus:outline-none focus:border-white/20 transition-all placeholder:text-zinc-700"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 bg-zinc-900/40 border border-white/5 p-1.5 rounded-2xl self-stretch md:self-auto">
                                        {CATEGORIES.map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => setActiveCategory(cat)}
                                                className={`px-4 py-2 text-[10px] font-black tracking-tighter rounded-xl transition-all ${activeCategory === cat ? 'bg-white text-black' : 'text-zinc-600 hover:text-white'}`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Events Grid */}
                            <div className="flex flex-col gap-10 pb-32">
                                {filteredMeets.length > 0 ? (
                                    filteredMeets.map((meet) => (
                                        <EventCard
                                            key={meet.id}
                                            {...meet}
                                            onDelete={handleDeleteMeetup}
                                        />
                                    ))
                                ) : (
                                    <div className="py-32 flex flex-col items-center justify-center border border-dashed border-white/5 rounded-[40px] bg-zinc-900/10">
                                        <Search className="w-12 h-12 text-zinc-800 mb-6" />
                                        <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em]">No matching events found in grid</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Meetup Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsCreateModalOpen(false)} />
                    <div className="relative w-full max-w-xl bg-zinc-900 border border-white/10 rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="p-8 md:p-12">
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-1">New Event Protocol</h2>
                                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Organize a gathering on the grid</p>
                                </div>
                                <button
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="p-3 rounded-full hover:bg-white/5 text-zinc-500 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form className="space-y-6" onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                handleCreateMeetup({
                                    id: Date.now().toString(),
                                    title: formData.get('title'),
                                    type: formData.get('type'),
                                    location: formData.get('location'),
                                    date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase(),
                                    time: formData.get('time'),
                                    attendees: 0,
                                    totalSeats: parseInt(formData.get('seats') as string),
                                    image: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80&w=2070",
                                    details: formData.get('details'),
                                    isOrganizer: true
                                });
                            }}>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Title</label>
                                        <input required name="title" className="w-full bg-black border border-white/5 rounded-2xl px-5 py-4 text-sm font-bold text-white focus:outline-none focus:border-white/20 transition-all" placeholder="e.g. Midnight Run Phase 4" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Type</label>
                                            <select name="type" className="w-full bg-black border border-white/5 rounded-2xl px-5 py-4 text-sm font-bold text-white focus:outline-none focus:border-white/20 transition-all appearance-none">
                                                <option value="CRUISE">CRUISE</option>
                                                <option value="TRACK">TRACK</option>
                                                <option value="SOCIAL">SOCIAL</option>
                                                <option value="DRAG">DRAG</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Seats</label>
                                            <input required name="seats" type="number" defaultValue="50" className="w-full bg-black border border-white/5 rounded-2xl px-5 py-4 text-sm font-bold text-white focus:outline-none focus:border-white/20 transition-all" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Location</label>
                                        <input required name="location" className="w-full bg-black border border-white/5 rounded-2xl px-5 py-4 text-sm font-bold text-white focus:outline-none focus:border-white/20 transition-all" placeholder="Enter Coordinates or Address" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Time</label>
                                        <input required name="time" type="time" className="w-full bg-black border border-white/5 rounded-2xl px-5 py-4 text-sm font-bold text-white focus:outline-none focus:border-white/20 transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Description</label>
                                        <textarea required name="details" rows={3} className="w-full bg-black border border-white/5 rounded-2xl px-5 py-4 text-sm font-medium text-zinc-300 focus:outline-none focus:border-white/20 transition-all resize-none" placeholder="Describe the mission parameters..." />
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <button type="submit" className="w-full py-4 bg-white text-black text-[11px] font-black uppercase tracking-widest rounded-full hover:bg-zinc-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] active:scale-95">
                                        Authorize Event
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

function EventCard({ id, title: initialTitle, type, location: initialLocation, date: initialDate, time: initialTime, attendees, totalSeats, image, details: initialDetails, isOrganizer, onDelete }: any) {
    const [joined, setJoined] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);
    const [title, setTitle] = React.useState(initialTitle);
    const [location, setLocation] = React.useState(initialLocation);
    const [date, setDate] = React.useState(initialDate);
    const [time, setTime] = React.useState(initialTime);
    const [details, setDetails] = React.useState(initialDetails);

    const seatsLeft = totalSeats - attendees;

    return (
        <div className="group relative">
            <div className="absolute inset-x-0 -top-px h-[0.5px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute inset-x-0 -bottom-px h-[0.5px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="bg-zinc-900/10 border border-white/5 group-hover:bg-zinc-900/20 group-hover:border-white/10 transition-all duration-500 overflow-hidden backdrop-blur-sm rounded-sm">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-[320px] h-[300px] relative overflow-hidden shrink-0 m-1">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover transition-all duration-1000 rounded-[36px]"
                        />
                        <div className="absolute inset-0 bg-black/40 transition-all duration-700 rounded-[36px]" />
                        <div className="absolute top-6 left-6 flex gap-2">
                            <span className="px-3 py-1 bg-white text-black text-[9px] font-black uppercase tracking-tighter rounded-full">
                                {type}
                            </span>
                            {isOrganizer && (
                                <span className="px-3 py-1 bg-zinc-800 text-white text-[9px] font-black uppercase tracking-tighter rounded-full border border-white/10">
                                    ORGANIZER
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 p-8 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start">
                                {isEditing ? (
                                    <input
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="text-2xl font-black text-white uppercase tracking-tight mb-2 bg-white/5 border border-white/10 rounded-lg px-2 py-1 w-full focus:outline-none focus:border-white/20"
                                    />
                                ) : (
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
                                        {title}
                                    </h3>
                                )}
                                {isOrganizer && (
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setIsEditing(!isEditing)}
                                            className="text-[10px] font-mono text-zinc-500 hover:text-white uppercase tracking-widest transition-colors"
                                        >
                                            {isEditing ? "[ Save ]" : "[ Edit ]"}
                                        </button>
                                        <button
                                            onClick={() => onDelete(id)}
                                            className="text-[10px] font-mono text-zinc-600 hover:text-red-500 uppercase tracking-widest transition-colors"
                                        >
                                            [ Delete Event ]
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-6 text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-4">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-3.5 h-3.5 text-zinc-700" />
                                    {isEditing ? (
                                        <input
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            className="bg-white/5 border border-white/10 rounded-lg px-2 text-zinc-300 focus:outline-none focus:border-white/20"
                                        />
                                    ) : (
                                        <span className="text-zinc-300">{location}</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-3.5 h-3.5 text-zinc-700" />
                                    <span className="text-zinc-300">
                                        {attendees} RSVP • {totalSeats} TOTAL • {seatsLeft} LEFT
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-6 text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-2">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5 text-zinc-700" />
                                    {isEditing ? (
                                        <input
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            className="bg-white/5 border border-white/10 rounded-lg px-2 text-zinc-300 focus:outline-none focus:border-white/20"
                                        />
                                    ) : (
                                        <span className="text-zinc-300">{date}</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-3.5 h-3.5 text-zinc-700" />
                                    {isEditing ? (
                                        <input
                                            value={time}
                                            onChange={(e) => setTime(e.target.value)}
                                            className="bg-white/5 border border-white/10 rounded-lg px-2 text-zinc-300 focus:outline-none focus:border-white/20"
                                        />
                                    ) : (
                                        <span className="text-zinc-300">{time}</span>
                                    )}
                                </div>
                            </div>

                            {isEditing ? (
                                <textarea
                                    value={details}
                                    onChange={(e) => setDetails(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-zinc-300 text-xs leading-relaxed mt-6 uppercase tracking-tight focus:outline-none focus:border-white/20 resize-none"
                                    rows={3}
                                />
                            ) : (
                                <p className="text-zinc-500 text-xs leading-relaxed mt-6 max-w-lg uppercase tracking-tight">
                                    {details}
                                </p>
                            )}
                        </div>

                        <div className="mt-8">
                            <button
                                onClick={() => setJoined(!joined)}
                                className={`
                                    px-10 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all transform active:scale-95
                                    ${joined
                                        ? "bg-white/10 text-white border border-white/20 hover:bg-white/15"
                                        : "bg-white text-black hover:bg-zinc-200"}
                                `}
                            >
                                {joined ? "JOINED" : "JOIN GRID"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
