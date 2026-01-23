"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, MessageSquare, Calendar, Warehouse, Bell, User, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { icon: Home, href: "/", label: "Feed" },
        { icon: Compass, href: "/explore", label: "Explore" },
        { icon: MessageSquare, href: "/community", label: "Community" },
        { icon: Calendar, href: "/meetups", label: "Meetups" },
        { icon: Warehouse, href: "/garage", label: "Garage" },
        { icon: User, href: "/profile/motorhead_92", label: "Profile" },
    ];

    return (
        <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-[80px] hover:w-[240px] glass-sidebar z-50 flex-col transition-all duration-300 group overflow-hidden">
            {/* Brand Logo / Home Link */}
            <div className="h-[84px] flex items-center px-6">
                <Link href="/" className="text-xl font-bold tracking-tighter text-white whitespace-nowrap overflow-hidden">
                    <span className="group-hover:hidden">TT</span>
                    <span className="hidden group-hover:block uppercase">Throttle Talks</span>
                </Link>
            </div>

            {/* Main Nav */}
            <nav className="flex-1 px-4 space-y-2 py-4">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-4 h-12 rounded-xl transition-all duration-200 px-3",
                                isActive
                                    ? "bg-white text-black shadow-2xl"
                                    : "text-grey hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <Icon className="w-6 h-6 shrink-0" />
                            <span className={cn(
                                "text-sm font-semibold whitespace-nowrap transition-opacity duration-300",
                                "opacity-0 group-hover:opacity-100"
                            )}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="px-4 py-8 space-y-2 border-t border-white/5">
                <button className="flex items-center gap-4 w-full h-12 rounded-xl text-grey hover:bg-white/5 hover:text-white transition-all px-3">
                    <Settings className="w-6 h-6 shrink-0" />
                    <span className="text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Settings</span>
                </button>
                <button className="flex items-center gap-4 w-full h-12 rounded-xl text-grey hover:bg-white hover:text-black hover:shadow-2xl transition-all px-3">
                    <LogOut className="w-6 h-6 shrink-0" />
                    <span className="text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Logout</span>
                </button>
            </div>
        </aside>
    );
}
