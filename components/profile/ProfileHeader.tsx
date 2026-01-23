import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, MapPin, Trophy, Car, Users } from "lucide-react";

interface ProfileHeaderProps {
    user: {
        name: string;
        username: string;
        avatar: string;
        bio: string;
        stats: {
            vehicles: number;
            followers: number;
        };
    };
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
    return (
        <div className="relative">
            {/* Cover Photo */}
            <div className="h-48 md:h-64 w-full bg-zinc-900 overflow-hidden relative">
                <img
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2083"
                    className="w-full h-full object-cover opacity-50"
                    alt="Cover"
                />
                <button className="absolute bottom-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white">
                    <Camera className="w-4 h-4" />
                </button>
            </div>

            <div className="px-4 md:px-0 -mt-12 relative z-10 flex flex-col items-center">
                {/* Avatar */}
                <Avatar className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-black ring-1 ring-white/10 shadow-2xl">
                    <AvatarImage src={user.avatar} className="object-cover" />
                    <AvatarFallback className="bg-zinc-800 text-xl font-bold">{user.username[1].toUpperCase()}</AvatarFallback>
                </Avatar>

                {/* User Info */}
                <div className="mt-4 text-center space-y-1">
                    <h1 className="text-2xl font-bold text-white uppercase tracking-tighter">{user.name}</h1>
                    <p className="text-sm text-grey font-medium">@{user.username}</p>
                </div>

                {/* Bio */}
                <p className="mt-4 text-sm text-grey font-medium max-w-md text-center">
                    {user.bio}
                </p>

                {/* Stats Bar */}
                <div className="mt-8 flex items-center justify-between w-full max-w-sm px-6 py-4 glass-card bg-white/5 border-white/10">
                    <StatItem icon={Car} label="Garage" value={user.stats.vehicles} />
                    <StatItem icon={Users} label="Followers" value={user.stats.followers} />
                    <StatItem icon={MapPin} label="Places" value="-" />
                    <StatItem icon={Trophy} label="Badges" value="-" />
                </div>

                {/* Actions */}
                <div className="mt-8 flex gap-4 w-full max-w-sm">
                    <button className="flex-1 h-12 bg-white text-black rounded-full font-bold text-sm uppercase tracking-widest hover:bg-zinc-200 transition-all">
                        Edit Profile
                    </button>
                    <button className="h-12 px-6 glass-card border-white/10 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
                        Share
                    </button>
                </div>
            </div>
        </div>
    );
}

function StatItem({ icon: Icon, label, value }: { icon: any, label: string, value: any }) {
    return (
        <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-1.5 text-grey">
                <Icon className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-widest leading-none">{label}</span>
            </div>
            <span className="text-base font-bold text-white leading-none">{value}</span>
        </div>
    );
}
