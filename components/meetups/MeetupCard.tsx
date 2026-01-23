"use client";

import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Calendar, Clock, Users, MapPin, Check, MessageSquare, Navigation } from "lucide-react";
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
        <GlassCard className="p-0 overflow-hidden flex flex-col group border-white/5 hover:border-white/10 transition-all">
            <div className="aspect-[21/9] relative overflow-hidden">
                <img src={image} alt={title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute top-4 left-4 bg-white text-black px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] shadow-2xl">
                    Upcoming Event
                </div>
            </div>

            <div className="p-8 space-y-8">
                <div className="space-y-4 text-left">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{title}</h3>

                    <div className="grid grid-cols-2 gap-y-4 pt-2">
                        <div className="flex items-center gap-3 text-[10px] text-white/60 font-black uppercase tracking-widest">
                            <Calendar className="w-4 h-4 text-white/20" strokeWidth={1.5} />
                            <span>{date}</span>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] text-white/60 font-black uppercase tracking-widest">
                            <Clock className="w-4 h-4 text-white/20" strokeWidth={1.5} />
                            <span>{time}</span>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] text-white/40 font-bold uppercase tracking-widest leading-none">
                            <Users className="w-4 h-4 text-white/20" strokeWidth={1.5} />
                            <span>{currentAttendees} Attendees • {currentSlots} Slots Left</span>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] text-white/60 font-black uppercase tracking-widest">
                            <MapPin className="w-4 h-4 text-white/20" strokeWidth={1.5} />
                            <span>{location}</span>
                        </div>
                    </div>
                </div>

                <p className="text-sm text-white/60 leading-relaxed text-left font-medium line-clamp-2">
                    {description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button
                        onClick={handleJoin}
                        className={cn(
                            "h-12 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center justify-center gap-2",
                            isJoined
                                ? "bg-white text-black hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                                : "bg-white/[0.03] border border-white/5 text-white/60 hover:text-white hover:bg-white/10"
                        )}
                    >
                        {isJoined && <Check className="w-3.5 h-3.5" strokeWidth={2.5} />}
                        {isJoined ? "Joined" : "Join Meetup"}
                    </button>

                    {isJoined && (
                        <div className="flex gap-2">
                            <button className="flex-1 h-12 rounded-xl bg-white/[0.03] border border-white/5 text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                                <MessageSquare className="w-3.5 h-3.5" strokeWidth={1.5} />
                                Chat
                            </button>
                            <button className="flex-1 h-12 rounded-xl bg-white/[0.03] border border-white/5 text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                                <Navigation className="w-3.5 h-3.5" strokeWidth={1.5} />
                                Map
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </GlassCard>
    );
}
