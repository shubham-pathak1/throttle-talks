import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Eye } from "lucide-react";

interface DiscussionCardProps {
    user: {
        username: string;
        avatar: string;
    };
    timestamp: string;
    hashtags: string[];
    content: string;
    stats: {
        comments: number;
        views: number;
    };
}

export function DiscussionCard({ user, timestamp, hashtags, content, stats }: DiscussionCardProps) {
    return (
        <GlassCard className="cursor-pointer hover:bg-white/10 transition-colors">
            <div className="flex items-start gap-4 mb-4">
                <Avatar className="w-9 h-9 border border-white/10">
                    <AvatarImage src={user.avatar} className="object-cover" />
                    <AvatarFallback>{user.username[1].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-left">
                    <span className="text-sm font-semibold text-white">@{user.username}</span>
                    <span className="text-[12px] text-grey">{timestamp}</span>
                </div>
            </div>

            <div className="mb-4">
                <p className="text-[12px] text-grey font-medium mb-2">
                    {hashtags.map(tag => `#${tag}`).join(' ')}
                </p>
                <p className="text-base text-white leading-relaxed line-clamp-3">
                    {content}
                </p>
            </div>

            <div className="flex items-center justify-between text-sm text-grey pt-4 border-t border-white/5">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4" />
                        <span>{stats.comments} comment</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Eye className="w-4 h-4" />
                        <span>{stats.views} views</span>
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}
