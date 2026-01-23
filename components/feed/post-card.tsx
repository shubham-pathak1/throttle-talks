"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GlassCard } from "@/components/ui/glass-card";
import { Heart, MessageSquare, Repeat2, Share } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostCardProps {
    user: {
        username: string;
        avatar: string;
    };
    timestamp: string;
    content: string;
    image?: string;
    type?: 'status' | 'poll';
    poll?: {
        options: { label: string; percentage: number }[];
        totalVotes: number;
        status: string;
    };
    stats: {
        likes: number;
        comments: number;
        reposts: number;
    };
}

export function PostCard({ user, timestamp, content, image, type = 'status', poll, stats }: PostCardProps) {
    const [isLiked, setIsLiked] = React.useState(false);
    const [isReposted, setIsReposted] = React.useState(false);
    const [likeCount, setLikeCount] = React.useState(stats.likes);
    const [repostCount, setRepostCount] = React.useState(stats.reposts);

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    const handleRepost = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsReposted(!isReposted);
        setRepostCount(prev => isReposted ? prev - 1 : prev + 1);
    };

    return (
        <GlassCard className="mb-4">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-10 h-10 border border-white/10">
                    <AvatarImage src={user.avatar} className="object-cover" />
                    <AvatarFallback className="bg-zinc-800 text-[10px]">{user.username[1].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-white uppercase tracking-tight">@{user.username}</span>
                    <span className="text-[10px] font-bold text-grey uppercase tracking-widest">{timestamp}</span>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-4 mb-6 text-left">
                <p className="text-base text-zinc-200 leading-relaxed font-medium">
                    {content}
                </p>

                {image && (
                    <div className="aspect-video relative rounded-2xl overflow-hidden border border-white/5 bg-zinc-950">
                        <img src={image} className="w-full h-full object-cover opacity-90 transition-opacity hover:opacity-100 duration-500" alt="Post content" />
                    </div>
                )}

                {type === 'poll' && poll && (
                    <div className="space-y-2 py-2">
                        {poll.options.map((option, i) => (
                            <div key={i} className="relative h-14 glass-card overflow-hidden group cursor-pointer active:scale-[0.99] transition-transform">
                                <div
                                    className="absolute inset-0 bg-white/5 transition-all duration-1000"
                                    style={{ width: `${option.percentage}%` }}
                                />
                                <div className="relative h-full px-5 flex items-center justify-between text-xs font-black uppercase tracking-widest">
                                    <span>{option.label}</span>
                                    <span className="text-white/40">{option.percentage}%</span>
                                </div>
                            </div>
                        ))}
                        <div className="text-[10px] font-black text-grey uppercase tracking-widest pt-2">
                            {poll.status} • {poll.totalVotes} responses
                        </div>
                    </div>
                )}
            </div>

            {/* Engagement Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <EngagementItem
                    icon={Heart}
                    count={likeCount}
                    active={isLiked}
                    activeColor="text-red-500"
                    onClick={handleLike}
                />
                <EngagementItem
                    icon={MessageSquare}
                    count={stats.comments}
                />
                <EngagementItem
                    icon={Repeat2}
                    count={repostCount}
                    active={isReposted}
                    activeColor="text-green-500"
                    onClick={handleRepost}
                />
                <button className="p-2 text-grey hover:text-white transition-all active:scale-90">
                    <Share className="w-4 h-4" strokeWidth={2.5} />
                </button>
            </div>
        </GlassCard>
    );
}

function EngagementItem({
    icon: Icon,
    count,
    active = false,
    activeColor = "text-white",
    onClick
}: {
    icon: any,
    count: number,
    active?: boolean,
    activeColor?: string,
    onClick?: (e: React.MouseEvent) => void
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-300 active:scale-90",
                active ? activeColor : "text-grey hover:bg-white/5 hover:text-white"
            )}
        >
            <Icon className={cn("w-4 h-4", active && "fill-current")} strokeWidth={active ? 3 : 2.5} />
            <span className="text-[11px] font-black uppercase tracking-widest tabular-nums">{count}</span>
        </button>
    );
}
