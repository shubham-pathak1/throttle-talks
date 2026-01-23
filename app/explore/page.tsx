"use client";

import React from "react";
import { ExploreSearch } from "@/components/explore/ExploreSearch";
import { CategoryCard } from "@/components/explore/CategoryCard";
import { VehicleScrollCard } from "@/components/explore/VehicleScrollCard";
import { BrandCard } from "@/components/explore/BrandCard";
import { VEHICLES, CATEGORIES, BRANDS } from "@/lib/data";

const EXPLORE_TABS = [
    { id: 'all', label: 'All' },
    { id: 'hatchback', label: 'Hatchback' },
    { id: 'sedan', label: 'Sedan' },
    { id: 'suv', label: 'SUV' },
    { id: 'motorcycles', label: 'Motorcycles' },
    { id: 'accessories', label: 'Accessories' },
];

export default function ExplorePage() {
    const [activeTab, setActiveTab] = React.useState('all');

    const categories = ['SUV', 'Sedan', 'Hatchback', 'Motorcycles'];

    return (
        <div className="pb-32 text-left">
            <ExploreSearch />

            <div className="container mx-auto px-4 md:px-6 py-8 space-y-20">

                {/* Main Category Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
                    {EXPLORE_TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${activeTab === tab.id
                                    ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                    : "bg-white/[0.02] border-white/5 text-white/40 hover:border-white/10 hover:text-white"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Top Categories Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {CATEGORIES.map((cat) => (
                        <CategoryCard key={cat.id} {...cat} />
                    ))}
                </div>

                {/* Vehicle Category Rows */}
                <div className="space-y-16">
                    {categories.map((cat) => (
                        <section key={cat} className="space-y-8">
                            <div className="flex items-center justify-between">
                                <h1 className="text-3xl font-black text-white uppercase tracking-tighter">{cat}</h1>
                                <button className="text-[10px] font-black text-white/40 uppercase tracking-widest hover:text-white transition-colors">See all Protocols</button>
                            </div>

                            <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-4">
                                {VEHICLES.filter(v => v.category === cat).map((vehicle) => (
                                    <VehicleScrollCard key={vehicle.id} {...vehicle} />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                {/* Brands Grid */}
                <section className="space-y-10">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Manufacturing Nodes</h2>
                    <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6">
                        {BRANDS.map((brand) => (
                            <BrandCard key={brand.name} {...brand} />
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}
