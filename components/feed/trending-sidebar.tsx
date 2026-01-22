export function TrendingSidebar() {
    return (
        <div className="flex flex-col gap-10">

            {/* Trending Builds */}
            <div className="p-8 rounded-[32px] bg-zinc-900/40 border border-white/5 group hover:border-white/10 transition-all duration-700">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase">Trending Builds</h3>
                </div>
                <div className="flex flex-col gap-6">
                    <TrendingItem title="992 GT3 RS" specs="850 HP • Manthey Kit" views="12.4k" color="bg-orange-500" />
                    <TrendingItem title="R34 Skyline GT-R" specs="Stage 3 • Midnight Purple" views="8.2k" color="bg-purple-500" />
                    <TrendingItem title="E46 M3 CSL" specs="OEM+ • Manual Swap" views="5.1k" color="bg-blue-500" />
                </div>
            </div>

            {/* Community Events */}
            <div className="p-8 rounded-[32px] bg-zinc-900/40 border border-white/5 group hover:border-white/10 transition-all duration-700">
                <h3 className="text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase mb-8">Upcoming Events</h3>
                <div className="flex flex-col gap-6">
                    <EventItem name="C&C Vadodara" date="Tomorrow, 07:00" location="THE_FERN" />
                    <EventItem name="Track Day: Buddh" date="Sat, Jan 24" location="B_I_C" />
                </div>
            </div>

        </div>
    );
}

function TrendingItem({ title, specs, views, color }: { title: string, specs: string, views: string, color: string }) {
    return (
        <div className="group cursor-pointer">
            <div className="flex items-center gap-3">
                <div className={`w-1 h-3 rounded-full ${color} opacity-40 group-hover:opacity-100 transition-opacity`} />
                <h4 className="text-sm font-bold text-white group-hover:text-zinc-300 transition-colors uppercase tracking-tight">{title}</h4>
            </div>
            <div className="flex justify-between items-center mt-2 pl-4">
                <span className="text-[9px] text-zinc-600 font-mono tracking-wider">{specs}</span>
                <span className="text-[9px] text-zinc-500 font-mono">{views}_TRACKS</span>
            </div>
        </div>
    );
}

function EventItem({ name, date, location }: { name: string, date: string, location: string }) {
    return (
        <div className="group/event cursor-pointer flex gap-4">
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 border border-white/5 w-12 h-12 group-hover/event:bg-white/10 transition-all">
                <span className="text-[8px] font-mono text-zinc-500 uppercase">{date.split(',')[0]}</span>
                <span className="text-xs font-black text-white">{date.includes('Tomorrow') ? '01' : '24'}</span>
            </div>
            <div>
                <h4 className="text-[13px] font-bold text-white group-hover/event:text-zinc-300 transition-colors uppercase tracking-tight">{name}</h4>
                <div className="text-[9px] text-zinc-600 font-mono mt-1 tracking-widest">
                    {location} • {date.includes('Tomorrow') ? 'LIVE_SOON' : 'CONFIRMED'}
                </div>
            </div>
        </div>
    );
}
