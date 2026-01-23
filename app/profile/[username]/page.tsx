"use client";

import React from "react";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { PostCard } from "@/components/feed/post-card";
import { USERS, POSTS } from "@/lib/data";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function UserProfilePage() {
    const { username } = useParams();
    const [activeTab, setActiveTab] = React.useState('posts');

    const user = USERS.find(u => u.username === username) || USERS[0];
    const userPosts = POSTS.filter(p => p.user === user.username);

    const tabs = [
        { id: 'posts', label: 'Nodes' },
        { id: 'snapshots', label: 'Snapshots' },
        { id: 'saved', label: 'Archive' },
    ];

    return (
        <div className="container mx-auto max-w-2xl px-4 md:px-0 py-12 pb-32">
            <ProfileHeader user={user} />

            {/* Content Tabs */}
            <div className="mt-16 flex border-b border-white/5 mb-10 bg-white/[0.01]">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "flex-1 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative",
                            activeTab === tab.id ? "text-white" : "text-white/20 hover:text-white"
                        )}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                        )}
                    </button>
                ))}
            </div>

            {/* Posts Grid */}
            <div className="space-y-6 text-left">
                {activeTab === 'posts' && (
                    userPosts.length > 0 ? (
                        userPosts.map((post) => (
                            <PostCard
                                key={post.id}
                                user={{
                                    username: user.username,
                                    avatar: user.avatar
                                }}
                                timestamp={post.timestamp}
                                content={post.content}
                                image={post.image}
                                type={post.type as 'status' | 'poll'}
                                poll={post.poll}
                                stats={post.stats}
                            />
                        ))
                    ) : (
                        <div className="py-24 text-center space-y-6">
                            <div className="w-20 h-20 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center mx-auto text-3xl opacity-20">
                                🏎️
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-black text-white uppercase tracking-widest">No Active Nodes</h3>
                                <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Telemetry logs for this user are currently private or unavailable.</p>
                            </div>
                        </div>
                    )
                )}

                {activeTab === 'snapshots' && (
                    <div className="grid grid-cols-2 gap-3">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="aspect-square glass-card bg-white/[0.02] border-white/15 overflow-hidden group/snap cursor-pointer transition-all hover:border-white/30">
                                <img
                                    src={`https://images.unsplash.com/photo-${1503376780353 + i}?auto=format&fit=crop&q=80&w=1000`}
                                    className="w-full h-full object-cover opacity-60 grayscale group-hover/snap:grayscale-0 group-hover/snap:opacity-100 transition-all duration-700"
                                    alt="Snapshot"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
