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
        { id: 'posts', label: 'Posts' },
        { id: 'snapshots', label: 'Snapshots' },
        { id: 'saved', label: 'Saved' },
    ];

    return (
        <div className="container mx-auto max-w-2xl px-4 md:px-0 py-8 pb-32">
            <ProfileHeader user={user} />

            {/* Content Tabs */}
            <div className="mt-12 flex border-b border-white/5 mb-8">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all relative",
                            activeTab === tab.id ? "text-white" : "text-grey"
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
            <div className="px-4 md:px-0 space-y-4 text-left">
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
                        <div className="py-20 text-center space-y-4">
                            <span className="text-5xl">🏎️</span>
                            <h3 className="text-xl font-bold text-white uppercase tracking-tight">No posts yet</h3>
                            <p className="text-sm text-grey font-medium">Follow this user to see their latest telemetry logs.</p>
                        </div>
                    )
                )}

                {activeTab === 'snapshots' && (
                    <div className="grid grid-cols-2 gap-2">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="aspect-square glass-card overflow-hidden">
                                <img
                                    src={`https://images.unsplash.com/photo-${1503376780353 + i}?auto=format&fit=crop&q=80&w=1000`}
                                    className="w-full h-full object-cover opacity-80"
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
