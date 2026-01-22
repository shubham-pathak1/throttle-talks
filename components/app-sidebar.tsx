"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Settings,
    Warehouse,
    MoreVertical,
    Home,
    MapPin
} from "lucide-react";

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="fixed left-8 inset-y-0 z-40 flex flex-col justify-center gap-4 pointer-events-none">
            {/* Standalone Logo Box (Fragmented) */}
            <div className="pointer-events-auto w-[65px] h-[65px] flex items-center justify-center shrink-0">
                <img
                    src="/logo.png"
                    alt="Throttle Talks"
                    className="w-16 h-16 rounded-full object-cover border border-white/10 shadow-2xl"
                />
            </div>

            {/* Micro-Sidebar (Expanding Fragment) */}
            <div className="pointer-events-auto group/sidebar flex flex-col h-fit w-[72px] hover:w-[260px] bg-zinc-900/40 backdrop-blur-xl border border-white/5 p-1.5 rounded-[32px] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                {/* User Profile Section - Integrated Top */}
                <div className="mb-2">
                    <Link
                        href="/profile"
                        className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-white/5 transition-all group border border-transparent hover:border-white/5 text-left whitespace-nowrap overflow-hidden"
                    >
                        <div className="relative shrink-0">
                            <Avatar className="w-10 h-10 ring-2 ring-white/5">
                                <AvatarImage src="https://github.com/shubham-pathak1.png" />
                                <AvatarFallback className="bg-zinc-800 text-xs text-white">SP</AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-white border-2 border-black" />
                        </div>
                        <div className="flex-1 opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300">
                            <p className="text-[13px] font-bold text-white tracking-tight leading-none mb-1">Shubham Pathak</p>
                            <p className="text-[10px] font-mono text-zinc-600 lowercase tracking-widest leading-none">@pathak_tt</p>
                        </div>
                    </Link>
                </div>

                <div className="flex flex-col gap-1 pb-1">
                    <NavItem
                        icon={<Home className="w-5 h-5" />}
                        label="Home"
                        href="/"
                        active={pathname === "/"}
                    />
                    <NavItem
                        icon={<MapPin className="w-5 h-5" />}
                        label="Meetups"
                        href="/meetups"
                        active={pathname === "/meetups"}
                    />
                    <NavItem
                        icon={<Warehouse className="w-5 h-5" />}
                        label="Garage"
                        href="/garage"
                        active={pathname === "/garage"}
                    />
                    <NavItem
                        icon={<Settings className="w-5 h-5" />}
                        label="Settings"
                        href="/settings"
                        active={pathname === "/settings"}
                    />
                </div>
            </div>
        </div>
    );
}

function NavItem({
    icon,
    label,
    href,
    active = false,
    badge,
    count
}: {
    icon: React.ReactNode,
    label: string,
    href: string,
    active?: boolean,
    badge?: string,
    count?: number
}) {
    return (
        <Link
            href={href}
            className={`
        group relative flex items-center gap-4 px-[14px] py-3.5 rounded-2xl transition-all duration-300 whitespace-nowrap overflow-hidden
        ${active
                    ? "bg-white/[0.08] text-white shadow-[0_0_20px_rgba(255,255,255,0.02)] border border-white/10"
                    : "text-zinc-500 hover:text-white hover:bg-white/[0.05] border border-transparent"}
      `}
        >
            <div className={`
        relative z-10 transition-all duration-500 shrink-0
        ${active ? "text-white" : "text-zinc-600 group-hover:text-white"}
      `}>
                {icon}
            </div>

            <span className="relative z-10 text-[13px] font-bold tracking-tight uppercase flex-1 opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300">{label}</span>

            {badge && (
                <span className="absolute right-4 px-1.5 py-0.5 rounded-md bg-white text-[8px] font-black text-black uppercase tracking-tighter leading-none animate-pulse opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300">
                    {badge}
                </span>
            )}

            {count && (
                <span className="absolute right-4 w-4 h-4 flex items-center justify-center rounded-full bg-zinc-800 text-[9px] font-mono text-white border border-white/10 opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300">
                    {count}
                </span>
            )}

            {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-white rounded-r-full shadow-[2px_0_8px_rgba(255,255,255,0.5)]" />
            )}
        </Link>
    );
}
