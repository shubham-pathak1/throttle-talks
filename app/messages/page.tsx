"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GlassCard } from "@/components/ui/glass-card";
import { Send, Phone, Video, Info } from "lucide-react";
import { USERS } from "@/lib/data";

const CONVERSATIONS = [
    {
        id: "c1",
        user: USERS[0],
        lastMessage: "The aerodynamic load on the rear axle is looking better.",
        time: "2m ago",
        unread: 2
    },
    {
        id: "c2",
        user: USERS[1],
        lastMessage: "I've uploaded the new chassis alignment data.",
        time: "1h ago",
        unread: 0
    }
];

export default function MessagesPage() {
    const [activeThread, setActiveThread] = React.useState(CONVERSATIONS[0]);

    return (
        <div className="container mx-auto max-w-5xl h-[calc(100vh-4rem)] p-4 md:p-8">
            <div className="grid grid-cols-12 h-full gap-6 rounded-3xl overflow-hidden glass-card p-0 border-white/5 bg-black/40">

                {/* Signals List */}
                <div className="col-span-12 md:col-span-4 border-r border-white/5 flex flex-col">
                    <div className="p-6 border-b border-white/5">
                        <h1 className="text-xl font-bold uppercase tracking-tight text-white">Signals</h1>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
                        {CONVERSATIONS.map((conv) => (
                            <button
                                key={conv.id}
                                onClick={() => setActiveThread(conv)}
                                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeThread.id === conv.id ? "bg-white/10 border border-white/10 shadow-xl" : "hover:bg-white/5 border border-transparent"
                                    }`}
                            >
                                <Avatar className="w-12 h-12 border border-white/10">
                                    <AvatarImage src={conv.user.avatar} className="object-cover" />
                                    <AvatarFallback>{conv.user.username[1].toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 text-left">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-white uppercase">{conv.user.username}</span>
                                        <span className="text-[10px] text-grey">{conv.time}</span>
                                    </div>
                                    <p className="text-[11px] text-grey truncate leading-tight mt-0.5">{conv.lastMessage}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="hidden md:flex md:col-span-8 flex-col bg-white/[0.02]">
                    <div className="p-6 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar className="w-10 h-10 border border-white/10">
                                <AvatarImage src={activeThread.user.avatar} className="object-cover" />
                            </Avatar>
                            <div className="text-left">
                                <h3 className="text-sm font-bold text-white uppercase tracking-tight">{activeThread.user.username}</h3>
                                <span className="text-[10px] text-grey uppercase tracking-widest">Active Sync</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-grey">
                            <Phone className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
                            <Video className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
                            <Info className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
                        </div>
                    </div>

                    <div className="flex-1 p-8 overflow-y-auto no-scrollbar space-y-6">
                        <div className="text-center"><span className="text-[9px] font-bold text-grey uppercase tracking-[0.5em]">Protocol Start</span></div>
                        <div className="max-w-[70%] bg-zinc-900 border border-white/5 p-4 rounded-2xl text-left text-sm text-grey leading-relaxed">
                            {activeThread.lastMessage}
                        </div>
                        <div className="max-w-[70%] ml-auto bg-white text-black p-4 rounded-2xl text-left text-sm font-medium shadow-2xl leading-relaxed">
                            Acknowledge. Proceeding with sector 3 analysis.
                        </div>
                    </div>

                    <div className="p-6 border-t border-white/5">
                        <div className="relative">
                            <input type="text" placeholder="Execute Signal..." className="w-full h-12 bg-white/5 border border-white/10 rounded-full pl-6 pr-14 text-sm font-medium focus:outline-none focus:border-white/20 transition-all" />
                            <button className="absolute right-1.5 top-1.5 w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-zinc-100 transition-all active:scale-95">
                                <Send className="w-4 h-4 text-black" />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
