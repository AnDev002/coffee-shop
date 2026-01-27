// src/modules/home/components/BestSellersSection.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductDetail } from '@/types/product';

interface BestSellersProps {
  products: ProductDetail[];
}

export const BestSellersSection: React.FC<BestSellersProps> = ({ products }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <section className="py-24 bg-[#fafafa]"> {/* Màu nền sáng để tương phản */}
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="font-serif text-[#c49b63] text-lg md:text-xl italic block mb-2">
            Discover
          </span>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wider text-gray-900 mb-6 font-serif">
            Best Coffee Sellers
          </h2>
          <p className="text-gray-500 font-light leading-relaxed">
            Tuyển chọn những hương vị cà phê được yêu thích nhất. Đậm đà bản sắc, 
            chinh phục cả những vị khách khó tính nhất.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group text-center">
              {/* Image */}
              <Link href={`/products/${product.id}`} className="block relative w-full h-64 mb-6 overflow-hidden">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </Link>

              {/* Info */}
              <div className="px-2">
                <Link href={`/products/${product.id}`}>
                  <h3 className="text-lg font-bold text-gray-900 uppercase mb-2 hover:text-[#c49b63] transition-colors cursor-pointer">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-gray-500 text-sm line-clamp-2 mb-3 min-h-[40px]">
                  {product.description}
                </p>
                <div className="text-[#c49b63] font-bold text-lg mb-4">
                  {formatCurrency(product.basePrice)}
                </div>
                
                <Link href={`/products/${product.id}`}>
                    <button className="px-6 py-2 border border-gray-300 text-gray-800 text-xs uppercase tracking-widest hover:bg-[#c49b63] hover:border-[#c49b63] hover:text-white transition-all">
                    Add to Cart
                    </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};