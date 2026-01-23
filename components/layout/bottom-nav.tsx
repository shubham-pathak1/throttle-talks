"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Search,
    User,
    Plus,
    Flame
} from "lucide-react";
import { cn } from "@/lib/utils";

// High-fidelity icons for a premium feel
const NAV_ITEMS = [
    { icon: Flame, href: "/", label: "Feed" },
    { icon: Search, href: "/explore", label: "Explore" },
    { icon: Plus, href: "/create", label: "Create", isCta: true },
    { icon: User, href: "/profile/motorhead_92", label: "Profile" },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[72px] bg-black/80 backdrop-blur-[30px] border-t border-white/10 z-50 px-4 pb-2 flex items-center justify-around">
            {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                if (item.isCta) {
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="relative -top-3 w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-[0_8px_30px_rgb(255,255,255,0.2)] active:scale-95 transition-all"
                        >
                            <Plus className="w-8 h-8 text-black" strokeWidth={3} />
                        </Link>
                    );
                }

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex flex-col items-center justify-center w-12 h-12 relative"
                    >
                        {isActive && (
                            <div className="absolute top-0 w-1 h-1 rounded-full bg-white shadow-[0_0_8px_white]" />
                        )}
                        <Icon className={cn(
                            "w-6 h-6 transition-all duration-300",
                            isActive ? "text-white scale-110" : "text-grey"
                        )} strokeWidth={isActive ? 2.5 : 2} />
                    </Link>
                );
            })}
        </nav>
    );
}
