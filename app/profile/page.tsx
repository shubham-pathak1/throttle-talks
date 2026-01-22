"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/app-sidebar";
import { Settings, Users, MessageSquare, Heart, Bookmark, ChevronRight, Share2, Award, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-white/30 relative overflow-hidden font-outfit">
            <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50 transition-all duration-1000" />

            <Navbar />

            <div className="container mx-auto px-4 lg:px-8 pt-24 relative z-10">
                <div className="flex gap-12 py-8 lg:py-16">
                    <aside className="hidden lg:block w-64 shrink-0 sticky top-32 h-fit">
                        <Sidebar />
                    </aside>

                    <div className="flex-1 max-w-5xl mx-auto w-full">
                        {/* Profile Header Block */}
                        <div className="relative mb-12">
                            <div className="h-64 md:h-80 w-full rounded-[48px] overflow-hidden border border-white/5 relative">
                                <img
                                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2070"
                                    className="w-full h-full object-cover opacity-60"
                                    alt="Profile Hero"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                            </div>

                            <div className="absolute -bottom-8 left-12 flex items-end gap-8">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700" />
                                    <Avatar className="w-32 h-32 md:w-40 md:h-40 ring-[12px] ring-black rounded-[48px] relative z-10">
                                        <AvatarImage src="https://github.com/shubham-pathak1.png" />
                                        <AvatarFallback className="bg-zinc-800 text-3xl font-black">SP</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="pb-4">
                                    <h1 className="text-4xl font-black uppercase tracking-tighter mb-1">Shubham Pathak</h1>
                                    <p className="text-xs font-mono text-zinc-500 uppercase tracking-[0.3em]">@pathak_tt • DRIVER ID: 88219</p>
                                </div>
                            </div>

                            <div className="absolute -bottom-4 right-12">
                                <Link
                                    href="/settings"
                                    className="flex items-center gap-2 px-6 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-zinc-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] active:scale-95"
                                >
                                    <Settings className="w-3.5 h-3.5" />
                                    <span>Manage Config</span>
                                </Link>
                            </div>
                        </div>

                        {/* Social Metrics Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
                            <MetricCard label="Followers" value="12.4K" icon={Users} />
                            <MetricCard label="Following" value="842" icon={Users} />
                            <MetricCard label="Total Posts" value="156" icon={MessageSquare} />
                            <MetricCard label="Reputation" value="MVP" icon={Award} />
                        </div>

                        {/* Bento Content Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Left Column: Bio & Quick Actions */}
                            <div className="lg:col-span-1 space-y-6">
                                <div className="bg-zinc-900/20 border border-white/5 p-8 rounded-[40px] backdrop-blur-sm">
                                    <h2 className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.4em] mb-6">Mission Directives</h2>
                                    <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                                        High-speed enthusiast and technical driver. Currently focusing on track-spec Porsche 911 GT3 builds. Always looking for the next Midnight Run.
                                    </p>
                                    <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                                        <div className="flex items-center justify-between text-[10px] font-mono">
                                            <span className="text-zinc-600 uppercase">Primary Base</span>
                                            <span className="text-white uppercase">Tokyo, Japan</span>
                                        </div>
                                        <div className="flex items-center justify-between text-[10px] font-mono">
                                            <span className="text-zinc-600 uppercase">Current Fleet</span>
                                            <span className="text-white uppercase">03 Vehicles</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <QuickAction label="Garage" href="/garage" icon={ExternalLink} />
                                    <QuickAction label="Meetups" href="/meetups" icon={Calendar} />
                                </div>
                            </div>

                            {/* Right Column: Recent Activity Feed */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-zinc-900/20 border border-white/5 p-8 rounded-[40px] backdrop-blur-sm min-h-[500px]">
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.4em]">Recent Transmissions</h2>
                                        <button className="text-[9px] font-black text-white/40 hover:text-white uppercase tracking-widest transition-colors">View All</button>
                                    </div>

                                    <div className="space-y-8">
                                        <ActivityItem
                                            title="Unauthorized Midnight Run Phase 4"
                                            meta="2h ago • SHUTO EXPRESSWAY"
                                            content="The new suspension setup on the GT3 is finally balanced. Shaved 2 seconds off the Shuto loop."
                                        />
                                        <ActivityItem
                                            title="Telemetry Diagnostic: GR SUPRA"
                                            meta="1d ago • DYNO LABS"
                                            content="Stable boost at 1.4 BAR. Stage 2 mapping completed. Dyno results pending."
                                        />
                                        <ActivityItem
                                            title="Joined 'Buddh Track Day' Grid"
                                            meta="2d ago • EVENT REGISTRATION"
                                            content="Authorized deployment for next week's track session. See you on the grid."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function MetricCard({ label, value, icon: Icon }: any) {
    return (
        <div className="group bg-zinc-900/20 border border-white/5 p-6 rounded-[32px] hover:bg-zinc-900/40 transition-all duration-500 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
                <Icon className="w-4 h-4 text-zinc-700 group-hover:text-white transition-colors" />
                <ChevronRight className="w-3 h-3 text-zinc-800 opacity-0 group-hover:opacity-100 transition-all" />
            </div>
            <div className="space-y-1">
                <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{label}</p>
                <p className="text-2xl font-black tracking-tighter text-white">{value}</p>
            </div>
        </div>
    );
}

function QuickAction({ label, href, icon: Icon }: any) {
    return (
        <Link
            href={href}
            className="flex flex-col items-center justify-center p-6 bg-zinc-900/20 border border-white/5 rounded-[32px] hover:bg-white hover:text-black transition-all duration-500 group"
        >
            <Icon className="w-5 h-5 mb-3 text-zinc-500 group-hover:text-black transition-colors" />
            <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
        </Link>
    );
}

function ActivityItem({ title, meta, content }: any) {
    return (
        <div className="group cursor-pointer">
            <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-black uppercase tracking-tight text-white group-hover:text-white transition-colors">
                    {title}
                </h3>
                <Share2 className="w-3.5 h-3.5 text-zinc-800 group-hover:text-white transition-colors" />
            </div>
            <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest mb-3">{meta}</p>
            <p className="text-[13px] text-zinc-500 leading-relaxed max-w-2xl line-clamp-2">
                {content}
            </p>
            <div className="mt-4 h-px w-full bg-white/5 group-hover:bg-white/10 transition-colors" />
        </div>
    );
}
