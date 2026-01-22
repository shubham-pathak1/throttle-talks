"use client"

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageSquare, Share2, MoreHorizontal, ChevronRight } from "lucide-react";

interface PostProps {
    id: string;
    user: {
        name: string;
        avatar: string;
        title: string;
    };
    type: 'status' | 'build_update' | 'poll';
    content: {
        text: string;
        image?: string;
        stats?: { label: string, value: string }[];
        options?: { label: string, votes: number }[];
    };
    timestamp: string;
}

export function PostCard({ id, user, type, content, timestamp }: PostProps) {
    const [isLiked, setIsLiked] = React.useState(false);
    const [likesCount, setLikesCount] = React.useState(124);
    const [showComments, setShowComments] = React.useState(false);
    const [commentText, setCommentText] = React.useState("");

    const toggleLike = () => {
        setIsLiked(!isLiked);
        setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    const handleShare = () => {
        navigator.clipboard.writeText(`https://throttle-talks.com/post/${id}`);
        alert("Link copied to clipboard!");
    };

    return (
        <div className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-all duration-700 group relative overflow-hidden will-change-transform">

            {/* Ambient background glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            {/* Post Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Avatar className="w-11 h-11 ring-2 ring-white/5 group-hover:ring-white/10 transition-all">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="bg-zinc-800 text-[10px] font-bold text-white">{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white border-2 border-black" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white tracking-tight group-hover:text-zinc-200 transition-colors">{user.name}</span>
                            <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] font-medium text-zinc-400 uppercase tracking-widest">{user.title}</span>
                        </div>
                        <span className="text-[10px] text-zinc-500 font-mono uppercase mt-1 block tracking-tight">{timestamp} • PHANTOM_NETWORK</span>
                    </div>
                </div>
                <button className="text-zinc-700 hover:text-white transition-colors p-2">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            {/* Post Content */}
            <div className="space-y-6">
                <p className="text-zinc-300 text-[15px] leading-relaxed font-light tracking-wide">
                    {content.text}
                </p>

                {/* Conditional Content based on Type */}
                {type === 'build_update' && content.image && (
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black group/image shadow-2xl">
                        <img
                            src={content.image}
                            alt="Build update"
                            className="w-full aspect-[16/10] object-cover opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                        {/* Film Grain / Noise Overlay */}
                        <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                        {/* Technical Stats Overlay */}
                        {content.stats && (
                            <div className="absolute bottom-6 left-6 flex gap-3">
                                {content.stats.map((stat, i) => (
                                    <div key={i} className="px-4 py-2 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg">
                                        <span className="block text-[8px] text-zinc-500 uppercase font-mono tracking-widest mb-0.5">{stat.label}</span>
                                        <span className="block text-sm text-white font-black tracking-tighter">{stat.value}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono text-zinc-400 uppercase tracking-widest">
                            RAW_ASSET_LOG.V2
                        </div>
                    </div>
                )}

                {type === 'poll' && content.options && (
                    <div className="flex flex-col gap-3">
                        {content.options.map((opt, i) => {
                            const totalVotes = content.options!.reduce((acc, curr) => acc + curr.votes, 0);
                            const percentage = Math.round((opt.votes / totalVotes) * 100);
                            return (
                                <button key={i} className="relative w-full p-5 rounded-2xl bg-white/[0.03] border border-white/5 text-left overflow-hidden hover:bg-white/[0.07] transition-all group/poll">
                                    <div className="relative z-10 flex justify-between items-center">
                                        <span className="text-sm font-bold text-zinc-400 group-hover/poll:text-white transition-colors uppercase tracking-tight">{opt.label}</span>
                                        <span className="text-[10px] text-zinc-600 font-mono group-hover/poll:text-white transition-colors">{percentage}%</span>
                                    </div>
                                    <div
                                        className="absolute inset-y-0 left-0 bg-white/[0.05] transition-all duration-1000 ease-out"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Post Actions */}
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <button
                        onClick={toggleLike}
                        className={`flex items-center gap-2.5 transition-all duration-300 transform active:scale-90 ${isLiked ? 'text-white' : 'text-zinc-600 hover:text-zinc-200'}`}
                    >
                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-white stroke-white' : ''} transition-all`} />
                        <span className="text-xs font-mono font-bold tracking-tighter">{likesCount}</span>
                    </button>
                    <button
                        onClick={() => setShowComments(!showComments)}
                        className={`flex items-center gap-2.5 text-zinc-600 hover:text-zinc-200 transition-all ${showComments ? 'text-zinc-200' : ''}`}
                    >
                        <MessageSquare className="w-5 h-5" />
                        <span className="text-xs font-mono font-bold tracking-tighter">18</span>
                    </button>
                </div>
                <button
                    onClick={handleShare}
                    className="flex items-center gap-2 text-zinc-600 hover:text-white transition-all transform active:scale-90"
                >
                    <Share2 className="w-5 h-5" />
                </button>
            </div>

            {/* Expandable Comment Section */}
            {showComments && (
                <div className="mt-6 space-y-4 animate-in slide-in-from-top-4 duration-500 overflow-hidden">
                    <div className="flex gap-3">
                        <Avatar className="w-8 h-8 rounded-lg ring-1 ring-white/10">
                            <AvatarFallback className="bg-zinc-800 text-[8px] text-white">U</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 flex gap-2">
                            <input
                                type="text"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && setCommentText("")}
                                placeholder="Write a comment..."
                                className="flex-1 bg-white/[0.03] border border-white/5 rounded-xl h-9 px-3 text-xs focus:outline-none focus:border-white/20 transition-all font-light"
                            />
                            <button
                                onClick={() => {
                                    if (commentText) {
                                        alert("Comment posted!");
                                        setCommentText("");
                                    }
                                }}
                                className="p-2 rounded-xl bg-white text-black hover:bg-zinc-200 transition-all active:scale-95"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Thread Layout */}
                    <div className="space-y-4 pl-11 opacity-60">
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold text-white uppercase">TurboTom</span>
                            <p className="text-xs text-zinc-400 font-light uppercase">The fitment on those BBS wheels is insane! 🔥</p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold text-white uppercase">GhostRider</span>
                            <p className="text-xs text-zinc-400 font-light uppercase">Stock turbo or upgraded?</p>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

function ActionBtn({ icon, label }: { icon: React.ReactNode, label?: string }) {
    return (
        <button className="flex items-center gap-2 text-zinc-600 hover:text-white transition-all group">
            <div className="group-hover:scale-110 transition-transform">{icon}</div>
            {label && <span className="text-xs font-mono">{label}</span>}
        </button>
    );
}
