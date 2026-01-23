export const VEHICLES = [
    {
        id: "v1",
        name: "911 GT3",
        brand: "Porsche",
        price: "$169,700",
        image: "/images/landing/featured_porsche_911.png",
        category: "Luxury",
        year: "2024",
        description: "The benchmark for track-focused performance.",
        specs: { hp: 502, torque: 470, weight: "1435 kg" }
    },
    {
        id: "v2",
        name: "GT-R Nismo",
        brand: "Nissan",
        price: "$210,000",
        image: "/images/landing/featured_nissan_gtr.png",
        category: "Luxury",
        year: "2024",
        description: "The ultimate expression of Japanese engineering.",
        specs: { hp: 600, torque: 652, weight: "1720 kg" }
    },
    {
        id: "v3",
        name: "M3 CSL",
        brand: "BMW",
        price: "$140,000",
        image: "/images/landing/featured_e46_m3.png",
        category: "Luxury",
        year: "2003",
        description: "The pinnacle of the E46 generation.",
        specs: { hp: 360, torque: 370, weight: "1385 kg" }
    },
    {
        id: "v4",
        name: "Civic Type R",
        brand: "Honda",
        price: "$44,000",
        image: "/images/landing/featured_civic_typer.png",
        category: "Performance",
        year: "2023",
        description: "The front-wheel drive king.",
        specs: { hp: 315, torque: 420, weight: "1450 kg" }
    }
];

export const CATEGORIES = [
    { id: "cars", name: "Cars", count: 2847, icon: "CarFront" },
    { id: "bikes", name: "Motorcycles", count: 1423, icon: "Bike" },
    { id: "ev", name: "Electric", count: 542, icon: "Zap" },
    { id: "luxury", name: "Luxury", count: 218, icon: "Diamond" }
];

export const BRANDS = [
    { name: "Porsche", logo: "PO", count: 124 },
    { name: "Nissan", logo: "NI", count: 210 },
    { name: "BMW", logo: "BM", count: 345 },
    { name: "Honda", logo: "HO", count: 428 },
    { name: "Toyota", logo: "TO", count: 245 }
];

export const USERS = [
    {
        "username": "vance_dynamics",
        "name": "Arthur Vance",
        "avatar": "https://github.com/shubham-pathak1.png",
        "bio": "992 GT3 Dynamics. Track Telemetry Specialist.",
        "stats": { "vehicles": 4, "followers": 2842 }
    }
];

export const POSTS = [
    {
        "id": "p1",
        "user": "vance_dynamics",
        "timestamp": "2h ago",
        "content": "Sector 3 timing on the Nürburgring is down by 0.4s with the new aero adjustments. The structural rigidity of the GT3 is unmatched. #TelemetryLog #911GT3",
        "image": "/images/landing/hero_bg.png",
        "stats": { "likes": 128, "comments": 24, "reposts": 15 }
    },
    {
        "id": "p2",
        "type": "poll",
        "user": "vance_dynamics",
        "timestamp": "9h ago",
        "content": "Selecting the next fleet addition. Which platform offers better structural potential for track evolution?",
        "poll": {
            "options": [
                { "label": "992 GT3 RS", "percentage": 45 },
                { "label": "718 GT4 RS", "percentage": 30 },
                { "label": "AMG GT Black Series", "percentage": 25 }
            ],
            "totalVotes": 842,
            "status": "Active Protocol"
        },
        "stats": { "likes": 42, "comments": 4, "reposts": 8 }
    }
];
