"use client";
// src/modules/menu/components/DiscoverProductsSection.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MenuCategory, MenuProduct } from '@/actions/menu'; // Import types

interface DiscoverProductsSectionProps {
    categories: MenuCategory[];
}

// Sub-component: Tab Button
const MenuTab = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
    <button 
        onClick={onClick}
        className={`
            px-4 md:px-8 py-3 text-base md:text-lg font-sans transition-all duration-300 border-b-2 whitespace-nowrap
            ${active 
                ? 'text-[#c49b63] border-[#c49b63] bg-transparent' 
                : 'text-white border-transparent hover:text-[#c49b63]'}
        `}
    >
        {label}
    </button>
);

// Sub-component: Product Card
const MenuProductCard = ({ product }: { product: MenuProduct }) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    return (
        <div className="flex flex-col items-center text-center group">
            {/* Image Container + Link */}
            <Link href={`/products/${product.id}`} className="w-full h-[270px] overflow-hidden mb-6 relative block cursor-pointer">
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10" />
                 {product.imageUrl ? (
                     <Image 
                        src={product.imageUrl} 
                        alt={product.name}
                        fill
                        className="object-cover transform group-hover:scale-110 transition-transform duration-500" 
                    />
                 ) : (
                     <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">No Image</div>
                 )}
            </Link>
            
            {/* Content */}
            <Link href={`/products/${product.id}`}>
                <h3 className="text-white text-xl uppercase tracking-wider mb-3 group-hover:text-[#c49b63] transition-colors cursor-pointer">
                    {product.name}
                </h3>
            </Link>

            <p className="text-gray-400 text-sm font-light leading-relaxed mb-4 max-w-xs line-clamp-2 min-h-[40px]">
                {product.description || "Món ngon đặc biệt của chúng tôi"}
            </p>

            <div className="flex flex-col items-center gap-2">
                <span className="text-white text-xl font-medium">{formatCurrency(product.basePrice)}</span>
                <Link href={`/products/${product.id}`}>
                    <button className="px-4 py-2 border border-[#c49b63] text-[#c49b63] text-xs uppercase tracking-widest hover:bg-[#c49b63] hover:text-white transition-colors">
                        Đặt Món Ngay
                    </button>
                </Link>
            </div>
        </div>
    );
};

// Main Component
export const DiscoverProductsSection: React.FC<DiscoverProductsSectionProps> = ({ categories = [] }) => {
    // Nếu không có category nào, tránh lỗi hook
    const safeCategories = categories.filter(c => c.products.length > 0); 
    const [activeTabId, setActiveTabId] = useState<number>(safeCategories[0]?.id || 0);

    // Update active tab nếu data thay đổi (ví dụ khi mới load)
    useEffect(() => {
        if (safeCategories.length > 0 && activeTabId === 0) {
            setActiveTabId(safeCategories[0].id);
        }
    }, [safeCategories, activeTabId]);

    // Lọc sản phẩm theo Tab đang chọn
    const activeCategory = safeCategories.find(c => c.id === activeTabId);
    const displayedProducts = activeCategory ? activeCategory.products : [];

    if (safeCategories.length === 0) return null;

    return (
        <section className="py-24 relative bg-black">
             <div className="max-w-[1140px] mx-auto px-4">
                
                {/* Header Text */}
                <div className="text-center mb-16">
                    <span className="font-serif text-[#c49b63] text-4xl md:text-5xl italic block mb-2">
                        Khám Phá
                    </span>
                    <h2 className="text-white text-3xl md:text-5xl font-bold uppercase tracking-wider mb-6">
                        Sản Phẩm Nổi Bật
                    </h2>
                    <p className="text-gray-400 font-light max-w-2xl mx-auto text-sm md:text-base">
                        Hương vị đậm đà, nguyên liệu tươi ngon, được chế biến bởi những barista chuyên nghiệp nhất.
                    </p>
                </div>

                {/* Tabs - Render động từ Categories có sản phẩm */}
                <div className="flex flex-wrap justify-center gap-2 mb-16 border-b border-white/10 pb-1">
                    {safeCategories.map((cat) => (
                        <MenuTab 
                            key={cat.id} 
                            label={cat.name} 
                            active={activeTabId === cat.id}
                            onClick={() => setActiveTabId(cat.id)}
                        />
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedProducts.length > 0 ? (
                        displayedProducts.map(product => (
                            <MenuProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500">
                            Đang cập nhật sản phẩm cho danh mục này.
                        </div>
                    )}
                </div>
             </div>
        </section>
    );
};