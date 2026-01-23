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
    <div className="container mx-auto max-w-[600px] pt-8 px-4 md:px-0">
      <header className="mb-4">
        <h1 className="text-2xl font-bold uppercase tracking-tighter text-white">Feed</h1>
      </header>

      <FeedTabs activeId={activeTab} onChange={setActiveTab} />

      <div className="space-y-4 pb-32">
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
  );
}
