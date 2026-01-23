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
        <div className="pb-32">
            <ExploreSearch />

            <div className="container mx-auto px-4 md:px-6 py-8 space-y-16">

                {/* Main Category Tabs */}
                <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
                    {EXPLORE_TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-5 py-3 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${activeTab === tab.id ? "bg-white/5 border border-white/10 text-white" : "text-grey hover:text-white"
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
                <div className="space-y-12">
                    {categories.map((cat) => (
                        <section key={cat} className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-white">{cat}</h2>
                                <button className="text-sm font-medium text-grey hover:text-white transition-colors">See all</button>
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
                <section className="space-y-8">
                    <h2 className="text-xl font-semibold text-white">Explore by brands</h2>
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
