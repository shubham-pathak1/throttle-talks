import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export function GlassCard({ children, className, onClick }: GlassCardProps) {
    return (
        <div
            onClick={onClick}
            className={cn(
                "glass-card p-4 transition-all duration-200",
                onClick && "cursor-pointer hover:border-white/20 active:scale-[0.99]",
                className
            )}
        >
            {children}
        </div>
    );
}
