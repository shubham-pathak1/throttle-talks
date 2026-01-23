"use client";

import React from "react";
import { FeedTabs } from "@/components/feed/feed-tabs";
import { PostCard } from "@/components/feed/post-card";
import { POSTS, USERS } from "@/lib/data";

export default function Home() {
  const [activeTab, setActiveTab] = React.useState('all');

  // Basic Filter Logic
  const filteredPosts = POSTS.filter(post => {
    if (activeTab === 'all') return true;
    if (activeTab === 'polls') return post.type === 'poll';
    return true;
  });

  return (
    <div className="flex flex-col items-center pt-8 px-4 md:px-0 pb-32">
      <div className="w-full max-w-[600px] space-y-8 text-left">
        <header className="">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white">Feed</h1>
        </header>

        <FeedTabs activeId={activeTab} onChange={setActiveTab} />

        <div className="space-y-6">
          {filteredPosts.map((post: any) => {
            const user = USERS.find(u => u.username === post.user)!;
            return (
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
