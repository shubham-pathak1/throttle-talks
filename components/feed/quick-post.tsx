"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image, MapPin, BarChart2, Hash, Send } from "lucide-react";

interface QuickPostProps {
    onPost?: (post: any) => void;
}

export function QuickPost({ onPost }: QuickPostProps) {
    const [text, setText] = React.useState("");
    const [attachment, setAttachment] = React.useState<{
        type: 'image' | 'poll' | 'spot' | 'tag' | null;
        data: any;
    }>({ type: null, data: null });

    const handleAction = (type: 'image' | 'poll' | 'spot' | 'tag') => {
        if (type === 'image') {
            setAttachment({
                type: 'image',
                data: "https://images.unsplash.com/photo-1603584173870-7f3699617303?auto=format&fit=crop&q=80&w=2070"
            });
        } else if (type === 'poll') {
            setAttachment({
                type: 'poll',
                data: [
                    { label: "BBS LM (Forged)", votes: 0 },
                    { label: "TE37 Saga S-Plus", votes: 0 }
                ]
            });
        } else if (type === 'spot') {
            setAttachment({ type: 'spot', data: "Buddh International Circuit" });
        } else if (type === 'tag') {
            setAttachment({ type: 'tag', data: "#ProjectBuild" });
        }
    };

    const handlePost = () => {
        if (!text && !attachment.type) return;

        const newPost = {
            id: Math.random().toString(36).substr(2, 9),
            user: {
                name: "Shubham Pathak",
                avatar: "https://github.com/shubham-pathak1.png",
                title: "Pro Tuner"
            },
            type: attachment.type === 'poll' ? 'poll' : attachment.type === 'image' ? 'build_update' : 'status',
            content: {
                text: text || (attachment.type === 'image' ? "Fresh capture from the night drive." : "System update."),
                image: attachment.type === 'image' ? attachment.data : undefined,
                options: attachment.type === 'poll' ? attachment.data : undefined,
            },
            timestamp: "Just now"
        };

        onPost?.(newPost);
        setText("");
        setAttachment({ type: null, data: null });
    };

    return (
        <div className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm group focus-within:border-white/10 transition-all duration-500 mb-8">
            <div className="flex gap-4">
                <Avatar className="w-11 h-11 ring-2 ring-white/5">
                    <AvatarImage src="https://github.com/shubham-pathak1.png" />
                    <AvatarFallback className="bg-zinc-800 text-xs">SP</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-4">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Share a build update or dyno run..."
                        className="w-full bg-transparent border-none text-zinc-300 text-[15px] font-light placeholder:text-zinc-700 focus:outline-none resize-none min-h-[60px] leading-relaxed py-2"
                    />

                    {/* Attachment Previews */}
                    {attachment.type && (
                        <div className="relative group/attr animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                                {attachment.type === 'image' && (
                                    <img src={attachment.data} className="w-full h-32 object-cover rounded-xl" alt="Preview" />
                                )}
                                {attachment.type === 'poll' && (
                                    <div className="space-y-2">
                                        {attachment.data.map((opt: any, i: number) => (
                                            <div key={i} className="px-4 py-2 bg-white/5 rounded-lg text-xs text-zinc-400">{opt.label}</div>
                                        ))}
                                    </div>
                                )}
                                {(attachment.type === 'spot' || attachment.type === 'tag') && (
                                    <span className="text-xs text-white font-mono">{attachment.data}</span>
                                )}
                                <button
                                    onClick={() => setAttachment({ type: null, data: null })}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-xs font-bold shadow-xl"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="flex items-center gap-5">
                            <PostAction icon={<Image className="w-4 h-4" />} label="Media" onClick={() => handleAction('image')} />
                            <PostAction icon={<BarChart2 className="w-4 h-4" />} label="Poll" onClick={() => handleAction('poll')} />
                            <PostAction icon={<MapPin className="w-4 h-4" />} label="Spot" onClick={() => handleAction('spot')} />
                            <PostAction icon={<Hash className="w-4 h-4" />} label="Tag" onClick={() => handleAction('tag')} />
                        </div>

                        <button
                            onClick={handlePost}
                            className={`px-6 py-2 rounded-full font-black uppercase tracking-tighter text-[11px] transition-all transform active:scale-95 shadow-xl ${text || attachment.type ? 'bg-white text-black hover:bg-zinc-200' : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'}`}
                        >
                            POST
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PostAction({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-1.5 text-zinc-600 hover:text-white transition-all group/action"
        >
            <div className="group-hover/action:scale-110 transition-transform">{icon}</div>
            <span className="text-[10px] font-mono uppercase tracking-widest hidden sm:block">{label}</span>
        </button>
    );
}
