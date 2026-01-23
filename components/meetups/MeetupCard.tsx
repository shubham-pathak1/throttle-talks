"use client";

import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Calendar, Clock, Users, MapPin, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface MeetupCardProps {
    title: string;
    date: string;
    time: string;
    attendees: number;
    openSlots: number;
    location: string;
    image: string;
    description: string;
}

export function MeetupCard({ title, date, time, attendees, openSlots, location, image, description }: MeetupCardProps) {
    const [isJoined, setIsJoined] = React.useState(false);
    const [currentAttendees, setCurrentAttendees] = React.useState(attendees);
    const [currentSlots, setCurrentSlots] = React.useState(openSlots);

    const handleJoin = () => {
        if (isJoined) {
            setIsJoined(false);
            setCurrentAttendees(prev => prev - 1);
            setCurrentSlots(prev => prev + 1);
        } else {
            setIsJoined(true);
            setCurrentAttendees(prev => prev + 1);
            setCurrentSlots(prev => prev - 1);
        }
    };

    return (
        <GlassCard className="p-0 overflow-hidden flex flex-col group">
            <div className="aspect-[21/9] relative overflow-hidden">
                <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    Upcoming
                </div>
            </div>

            <div className="p-6 space-y-6">
                <div className="space-y-2 text-left">
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter">{title}</h3>
                    <div className="grid grid-cols-2 gap-y-3">
                        <div className="flex items-center gap-2 text-[10px] text-grey font-black uppercase tracking-widest">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-grey font-black uppercase tracking-widest">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                            <Users className="w-3.5 h-3.5" />
                            <span>{currentAttendees} Syncing • {currentSlots} Slots</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-grey font-black uppercase tracking-widest">
                            <MapPin className="w-3.5 h-3.5 text-zinc-700" />
                            <span>{location}</span>
                        </div>
                    </div>
                </div>

                <p className="text-sm text-grey leading-relaxed line-clamp-2 text-left font-medium">
                    {description}
                </p>

                <button
                    onClick={handleJoin}
                    className={cn(
                        "w-full h-12 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center justify-center gap-2",
                        isJoined
                            ? "bg-white/[0.05] border border-white/10 text-white hover:bg-white/10"
                            : "bg-white text-black hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    )}
                >
                    {isJoined && <Check className="w-4 h-4" />}
                    {isJoined ? "Synchronized" : "Join Meetup"}
                </button>
            </div>
        </GlassCard>
    );
}
