// src/modules/home/components/MenuSection.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MenuCategory } from '@/actions/menu';

interface MenuSectionProps {
  categories: MenuCategory[];
}

export const MenuSection: React.FC<MenuSectionProps> = ({ categories }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <section className="container mx-auto px-4 py-24">
      {/* [UPDATED] Header Section theo yêu cầu */}
      {/* [NEW] Container Header - Đồng nhất style với Discover Section */}
        <div className="container mx-auto max-w-[1140px] px-4 mb-12 md:mb-16">
            <div className="text-center">
                {/* Dòng chữ trang trí (Script font) để giống style bên dưới */}
                <span className="font-serif text-[#c49b63] text-4xl md:text-5xl italic block mb-2">
                    Khám phá
                </span>
                
                {/* Tiêu đề chính */}
                <h2 className="text-white text-3xl md:text-5xl font-bold uppercase tracking-wider mb-6">
                    Thực Đơn
                </h2>
                
                {/* Mô tả */}
                <p className="text-gray-400 font-light max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                    Khám phá thực đơn đa dạng từ những hạt cà phê rang xay thượng hạng đến các món tráng miệng ngọt ngào.
                </p>
            </div>
        </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {categories.map((category) => (
          <div key={category.id} className="mb-8">
             {/* Category Title */}
            <h3 className="text-2xl font-bold text-[#c49b63] mb-8 border-b border-gray-800 pb-2 inline-block">
              {category.name}
            </h3>

            {/* Products List */}
            <div className="space-y-6">
              {category.products.map((product) => (
                <div key={product.id} className="flex items-start gap-4 group">
                    {/* Image Thumbnail */}
                    <Link href={`/products/${product.id}`} className="shrink-0 w-16 h-16 relative rounded-full overflow-hidden border-2 border-[#c49b63]/20 group-hover:border-[#c49b63] transition-colors">
                        {product.imageUrl ? (
                             <Image 
                                src={product.imageUrl} 
                                alt={product.name} 
                                fill 
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-800" />
                        )}
                    </Link>

                    {/* Content */}
                    <div className="flex-1 border-b border-gray-800 border-dashed pb-4 group-last:border-0">
                        <div className="flex justify-between items-baseline mb-1">
                            <Link href={`/products/${product.id}`}>
                                <h4 className="text-lg font-medium text-white group-hover:text-[#c49b63] transition-colors cursor-pointer uppercase">
                                    {product.name}
                                </h4>
                            </Link>
                            <span className="text-xl font-bold text-[#c49b63] ml-4">
                                {formatCurrency(product.basePrice)}
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm line-clamp-2">
                            {product.description}
                        </p>
                    </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* View Full Menu Button */}
      <div className="text-center mt-12">
          <Link href="/menu">
            <button className="px-8 py-3 bg-[#c49b63] text-white font-bold uppercase tracking-widest hover:bg-[#b08b55] transition-colors text-sm">
                View Full Menu
            </button>
          </Link>
      </div>
    </section>
  );
};