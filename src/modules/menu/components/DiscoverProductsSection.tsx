"use client";
// src/modules/menu/components/DiscoverProductsSection.tsx
import React, { useState } from 'react';

// --- Types ---
interface TabItem {
    id: string;
    label: string;
}

interface ProductItem {
    id: number;
    image: string;
    name: string;
    description: string;
    price: string;
    category: string;
}

// --- Data ---
const TABS: TabItem[] = [
    { id: 'coffee', label: 'Coffee' },
    { id: 'drinks', label: 'Drinks' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'main', label: 'Main Dish' },
];

const PRODUCTS: ProductItem[] = [
    { 
        id: 1, 
        category: 'coffee',
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=800&auto=format&fit=crop", 
        name: "Coffee Capuccino", 
        description: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.", 
        price: "$4.90" 
    },
    { 
        id: 2, 
        category: 'coffee',
        image: "https://images.unsplash.com/photo-1614352723226-80516104c935?q=80&w=800&auto=format&fit=crop", 
        name: "Creamy Latte Coffee", 
        description: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.", 
        price: "$5.10" 
    },
    { 
        id: 3, 
        category: 'drinks',
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop", 
        name: "Cold Drink", 
        description: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.", 
        price: "$3.65" 
    },
    // Adding duplicates for demo purposes to fill grid as per category
    { 
        id: 4, 
        category: 'desserts',
        image: "https://images.unsplash.com/photo-1563729768-3980d44be09d?q=80&w=800&auto=format&fit=crop", 
        name: "Sweet Cake", 
        description: "Far far away, behind the word mountains.", 
        price: "$2.90" 
    },
];

// --- Sub Components ---

const MenuTab = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
    <button 
        onClick={onClick}
        className={`
            px-8 py-3 text-lg font-sans transition-all duration-300 border-b
            ${active 
                ? 'text-[#c49b63] border-[#c49b63] bg-transparent' 
                : 'text-white border-transparent hover:text-[#c49b63]'}
        `}
    >
        {label}
    </button>
);

const MenuProductCard = ({ image, name, description, price }: ProductItem) => (
    <div className="flex flex-col items-center text-center group">
        {/* Image Container */}
        <div className="w-full h-[270px] overflow-hidden mb-6 relative">
             <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10" />
             <img 
                src={image} 
                alt={name} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
            />
        </div>
        
        {/* Content */}
        <h3 className="text-white text-xl uppercase tracking-wider mb-3 group-hover:text-[#c49b63] transition-colors">
            {name}
        </h3>
        <p className="text-gray-400 text-sm font-light leading-relaxed mb-4 max-w-xs">
            {description}
        </p>
        <div className="flex flex-col items-center gap-2">
            <span className="text-white text-xl font-medium">{price}</span>
            <button className="px-4 py-2 border border-[#c49b63] text-[#c49b63] text-xs uppercase tracking-widest hover:bg-[#c49b63] hover:text-white transition-colors">
                Add to Cart
            </button>
        </div>
    </div>
);

// --- Main Component ---

export const DiscoverProductsSection = () => {
    const [activeTab, setActiveTab] = useState('coffee');

    // Filter logic (simplified for demo)
    const filteredProducts = PRODUCTS.length > 0 ? PRODUCTS : []; 
    // In a real app: PRODUCTS.filter(p => p.category === activeTab);
    // For visual similarity to provided code (which showed 3 items), I'll just map the demo data twice.

    return (
        <section className="py-24 relative bg-black">
             <div className="max-w-[1140px] mx-auto px-4">
                
                {/* Header Text */}
                <div className="text-center mb-16">
                    <span className="font-serif text-[#c49b63] text-4xl md:text-5xl italic block mb-2">
                        Discover
                    </span>
                    <h2 className="text-white text-3xl md:text-5xl font-bold uppercase tracking-wider mb-6">
                        Our Products
                    </h2>
                    <p className="text-gray-400 font-light max-w-2xl mx-auto text-sm md:text-base">
                        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-16 border-b border-white/10 pb-1">
                    {TABS.map((tab) => (
                        <MenuTab 
                            key={tab.id} 
                            label={tab.label} 
                            active={activeTab === tab.id}
                            onClick={() => setActiveTab(tab.id)}
                        />
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Rendering demo items to match the look */}
                    <MenuProductCard {...PRODUCTS[0]} />
                    <MenuProductCard {...PRODUCTS[1]} />
                    <MenuProductCard {...PRODUCTS[2]} />
                </div>
             </div>
        </section>
    );
};