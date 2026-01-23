"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GlassCard } from "@/components/ui/glass-card";
import { ThumbsUp, MessageSquare, ArrowLeftRight, Share, Send } from "lucide-react";
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
    const [isCommentsExpanded, setIsCommentsExpanded] = React.useState(false);
    const [likeCount, setLikeCount] = React.useState(stats.likes);
    const [repostCount, setRepostCount] = React.useState(stats.reposts);
    const [commentText, setCommentText] = React.useState("");

    // Local state for demo comments
    const [localComments, setLocalComments] = React.useState([
        { id: 1, user: "ShiftMaster", text: "Calibration looks solid on sector 3.", time: "1h ago" },
        { id: 2, user: "AeroSpec", text: "Are you running the v2 winglet revision?", time: "45m ago" }
    ]);

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

    const handleAddComment = () => {
        if (!commentText.trim()) return;
        const newComment = {
            id: Date.now(),
            user: "CURRENT_USER", // Mock current user
            text: commentText,
            time: "Just now"
        };
        setLocalComments([newComment, ...localComments]);
        setCommentText("");
    };

    return (
        <GlassCard className="mb-4 group/card p-0 overflow-hidden border-white/12 shadow-[0_0_20px_rgba(255,255,255,0.02)]">
            <div className="p-5">
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                    <Avatar className="w-10 h-10 border border-white/10">
                        <AvatarImage src={user.avatar} className="object-cover" />
                        <AvatarFallback className="bg-zinc-800 text-[10px]">{user.username[1].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col text-left">
                        <span className="text-sm font-black text-white uppercase tracking-tight">{user.username}</span>
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{timestamp}</span>
                    </div>
                </div>

                {/* Content */}
                {image && (
                    <div className="aspect-video relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 mb-5 shadow-2xl">
                        <img src={image} className="w-full h-full object-cover opacity-90 transition-all duration-700 group-hover/card:opacity-100" alt="Post content" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                )}

                <div className="space-y-4 mb-2 text-left">
                    <p className="text-base text-zinc-200 leading-relaxed font-semibold">
                        {content}
                    </p>

                    {type === 'poll' && poll && (
                        <div className="space-y-2 py-4">
                            {poll.options.map((option, i) => (
                                <div key={i} className="relative h-14 glass-card overflow-hidden group/poll cursor-pointer active:scale-[0.99] transition-all bg-white/[0.02]">
                                    <div
                                        className="absolute inset-0 bg-white/10 transition-all duration-1000"
                                        style={{ width: `${option.percentage}%` }}
                                    />
                                    <div className="relative h-full px-5 flex items-center justify-between text-xs font-black uppercase tracking-widest">
                                        <span className="text-white/40 group-hover/poll:text-white transition-colors">{option.label}</span>
                                        <span className="text-white/40 font-mono tracking-tighter">{option.percentage}%</span>
                                    </div>
                                </div>
                            ))}
                            <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] pt-2 pl-1">
                                {poll.totalVotes} responses
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Engagement Footer */}
            <div className="flex items-center justify-between px-2 py-2 bg-white/[0.02] border-t border-white/5 relative">
                <div className="flex items-center gap-1">
                    <EngagementItem
                        icon={ThumbsUp}
                        count={likeCount}
                        active={isLiked}
                        onClick={handleLike}
                    />
                    <EngagementItem
                        icon={MessageSquare}
                        count={localComments.length}
                        active={isCommentsExpanded}
                        onClick={() => setIsCommentsExpanded(!isCommentsExpanded)}
                    />
                    <EngagementItem
                        icon={ArrowLeftRight}
                        count={repostCount}
                        active={isReposted}
                        onClick={handleRepost}
                    />
                </div>
                <button className="h-10 w-10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-all active:scale-90">
                    <Share className="w-4.5 h-4.5" strokeWidth={1.5} />
                </button>
            </div>

            {/* Functional Comment Tray */}
            {isCommentsExpanded && (
                <div className="bg-white/[0.01] border-t border-white/5 p-5 space-y-6 animate-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center gap-3">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                                placeholder="Execute Signal..."
                                className="w-full h-11 bg-white/[0.03] border border-white/5 rounded-xl px-4 text-xs font-medium focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10"
                            />
                            <button
                                onClick={handleAddComment}
                                className="absolute right-1.5 top-1.5 w-8 h-8 flex items-center justify-center bg-white text-black rounded-lg hover:bg-zinc-200 transition-all active:scale-95"
                            >
                                <Send className="w-3.5 h-3.5" strokeWidth={2.5} />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-5">
                        {localComments.map((comment) => (
                            <div key={comment.id} className="flex gap-4">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 text-[9px] font-black text-white/20 uppercase">
                                    {comment.user[0]}
                                </div>
                                <div className="flex-1 space-y-1 text-left">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-black text-white uppercase tracking-tight">{comment.user}</span>
                                        <span className="text-[9px] font-bold text-white/10 uppercase tracking-widest">{comment.time}</span>
                                    </div>
                                    <p className="text-xs text-white/60 leading-relaxed font-medium">
                                        {comment.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
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
                "flex items-center gap-2.5 h-10 px-4 rounded-xl transition-all duration-300 active:scale-90 relative overflow-hidden group",
                active ? activeColor : "text-white/40 hover:bg-white/5 hover:text-white"
            )}
        >
            <Icon className={cn("w-4.5 h-4.5 relative z-10", active && "fill-current")} strokeWidth={active ? 1.8 : 1.5} />
            <span className="text-[10px] font-black uppercase tracking-widest tabular-nums relative z-10 font-mono">
                {count}
            </span>
        </button>
    );
}
