"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    Compass,
    MapPin,
    MessageSquare,
    User
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { icon: Home, href: "/", label: "Feed" },
    { icon: Compass, href: "/explore", label: "Explore" },
    { icon: MessageSquare, href: "/community", label: "Community" },
    { icon: MapPin, href: "/meetups", label: "Meetups" },
    { icon: User, href: "/profile/motorhead_92", label: "Profile" },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="h-[76px] bg-black/60 backdrop-blur-2xl border-t border-white/5 px-6 pt-2 pb-6 flex items-center justify-around shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
            {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 relative group/nav",
                            isActive ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]" : "text-white/20 hover:text-white"
                        )}
                    >
                        <Icon className={cn(
                            "w-5.5 h-5.5 transition-all duration-300",
                            isActive ? "scale-110" : "group-hover/nav:scale-110"
                        )} strokeWidth={isActive ? 2 : 1.5} />
                    </Link>
                );
            })}
        </nav>
    );
}
