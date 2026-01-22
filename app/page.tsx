"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/app-sidebar";
import { TrendingSidebar } from "@/components/feed/trending-sidebar";
import { PostCard } from "@/components/feed/post-card";
import { QuickPost } from "@/components/feed/quick-post";

const FOLLOWING_POSTS = [
  {
    id: "f1",
    user: {
      name: "Shubham Pathak",
      avatar: "https://github.com/shubham-pathak1.png",
      title: "Pro Tuner"
    },
    type: "build_update",
    content: {
      text: "Just finished the Stage 2 tune on the 911. The torque curve is finally where I want it. Using the new custom mapping for the PDK. +45hp gained at the wheels.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070",
      stats: [
        { label: "Power", value: "+45 HP" },
        { label: "Boost", value: "1.4 BAR" }
      ]
    },
    timestamp: "2h ago"
  },
  {
    id: "f2",
    user: {
      name: "GarageMaster",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1976",
      title: "Build Enthusiast"
    },
    type: "poll",
    content: {
      text: "Finalizing the track setup for the upcoming Buddh event. Which wheels provide the best heat dissipation for long sessions?",
      options: [
        { label: "BBS LM (Forged)", votes: 420 },
        { label: "TE37 Saga S-Plus", votes: 680 }
      ]
    },
    timestamp: "4h ago"
  }
];

const GLOBAL_POSTS = [
  {
    id: "g1",
    user: {
      name: "Tokyo Drifter",
      avatar: "https://images.unsplash.com/photo-1527010150264-770001dbdf1f?auto=format&fit=crop&q=80&w=1974",
      title: "Drift King"
    },
    type: "build_update",
    content: {
      text: "Night sessions at Daikoku Futo. The new angle kit is working wonders. Testing the limit tonight. #JDM #Drift",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2070",
      stats: [
        { label: "Angle", value: "65 DEG" },
        { label: "Tires", value: "VALINO" }
      ]
    },
    timestamp: "30m ago"
  },
  {
    id: "g2",
    user: {
      name: "Autobahn Pilot",
      avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=1974",
      title: "Speed Hunter"
    },
    type: "status",
    content: {
      text: "300km/h stable. The aero package on the GT3 is performing flawlessly. Temperature sensors showing optimal cooling even at sustained high speed."
    },
    timestamp: "1h ago"
  },
  {
    id: "g3",
    user: {
      name: "Vintage Racer",
      avatar: "https://images.unsplash.com/photo-1627081720267-0175f2c29370?auto=format&fit=crop&q=80&w=1974",
      title: "Collector"
    },
    type: "build_update",
    content: {
      text: "Restoration of the 1967 E-Type is entering its final phase. Engine is back in and humming perfectly. Heritage meets performance.",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2083"
    },
    timestamp: "5h ago"
  }
];

export default function Home() {
  const [activeTab, setActiveTab] = React.useState<'following' | 'global'>('following');
  const [followingPosts, setFollowingPosts] = React.useState(FOLLOWING_POSTS);
  const [globalPosts, setGlobalPosts] = React.useState(GLOBAL_POSTS);

  const posts = activeTab === 'following' ? followingPosts : globalPosts;

  const handleAddPost = (newPost: any) => {
    if (activeTab === 'following') {
      setFollowingPosts([newPost, ...followingPosts]);
    } else {
      setGlobalPosts([newPost, ...globalPosts]);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/30 relative overflow-hidden">

      {/* Dynamic Background Noise */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50 pointer-events-none" />

      <Navbar />

      <div className="container mx-auto px-4 lg:px-8 pt-24 relative z-10">
        <div className="flex gap-12 py-8 lg:py-16">

          {/* Left Sidebar - Navigation */}
          <aside className="hidden lg:block w-[72px] shrink-0 sticky top-8 h-fit">
            <Sidebar />
          </aside>

          {/* Center Column - Feed */}
          <div className="flex-1 max-w-2xl mx-auto w-full">
            <div className="flex flex-col gap-4">

              {/* Header / Filter */}
              <div className="flex items-end justify-between mb-8 px-2">
                <div>
                  <h1 className="text-3xl font-black tracking-tight uppercase leading-none">Pit Lane</h1>
                </div>
                <div className="flex gap-6 text-[11px] font-mono uppercase tracking-widest">
                  <button
                    onClick={() => setActiveTab('following')}
                    className={`pb-1 transition-all ${activeTab === 'following' ? 'text-white border-b border-white' : 'text-zinc-600 hover:text-zinc-400'}`}
                  >
                    Following
                  </button>
                  <button
                    onClick={() => setActiveTab('global')}
                    className={`pb-1 transition-all ${activeTab === 'global' ? 'text-white border-b border-white' : 'text-zinc-600 hover:text-zinc-400'}`}
                  >
                    Global
                  </button>
                </div>
              </div>

              <QuickPost onPost={handleAddPost} />

              {/* Feed List */}
              <div className="flex flex-col gap-10 pb-32">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    id={post.id}
                    user={post.user}
                    type={post.type as any}
                    content={post.content as any}
                    timestamp={post.timestamp}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Discovery */}
          <aside className="hidden xl:block w-80 shrink-0 sticky top-32 h-fit">
            <TrendingSidebar />
          </aside>

        </div>
      </div>
    </main>
  );
}
