// src/components/layout/Header/MiniCartPopup.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

const MiniCartPopup = () => {
  const { items, removeItem, totalPrice, updateQuantity } = useCartStore();

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

  return (
    <div className="w-[400px] bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right flex flex-col font-sans">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h3 className="font-semibold text-gray-800 text-base">
          Giỏ hàng <span className="text-gray-500 font-normal">({items.length} sản phẩm)</span>
        </h3>
      </div>

      {/* List Items */}
      <div className="max-h-[400px] overflow-y-auto custom-scrollbar p-0">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </div>
            <p className="text-gray-500 text-sm font-medium">Giỏ hàng của bạn đang trống</p>
            <Link href="/products" className="px-5 py-2 bg-gray-900 text-white rounded-full text-sm hover:bg-gray-800 transition-colors">
              Tiếp tục đặt món
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {items.map((item: any) => (
              <div key={item.id} className="flex gap-4 p-4 hover:bg-gray-50 transition-colors group relative">
                {/* Product Image */}
                <Link 
                  href={`/product-details/${item.productId}`} // Hoặc dùng item.slug nếu có
                  className="w-20 h-20 border border-gray-100 rounded-md overflow-hidden flex-shrink-0 bg-white"
                >
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => e.currentTarget.src = '/placeholder-image.png'} // Fallback image nếu lỗi
                  />
                </Link>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <Link 
                        href={`/product-details/${item.productId}`}
                        className="text-sm font-medium text-gray-800 line-clamp-2 hover:text-brand-orange transition-colors" 
                        title={item.title}
                      >
                        {item.title}
                      </Link>
                      {/* Remove Button (Positioned top-right visually) */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1 -mr-2 -mt-1"
                        title="Xóa sản phẩm"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"></path></svg>
                      </button>
                    </div>
                    
                    {/* Variants */}
                    <div className="text-xs text-gray-500 mt-1">
                       {item.color && <span>{item.color}</span>}
                       {item.color && item.size && <span className="mx-1">|</span>}
                       {item.size && <span>Size: {item.size}</span>}
                       {!item.color && !item.size && <span>Mặc định</span>}
                    </div>
                  </div>

                  {/* Price & Quantity Bottom Row */}
                  <div className="flex justify-between items-end mt-2">
                    {/* Quantity Control */}
                    <div className="flex items-center border border-gray-200 rounded-md bg-white h-7 shadow-sm">
                      <button
                        type="button"
                        disabled={item.quantity <= 1}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-full flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-white text-gray-600 transition-colors"
                      >
                         <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14"></path></svg>
                      </button>
                      <span className="text-xs font-semibold w-6 text-center text-gray-700">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-full flex items-center justify-center hover:bg-gray-100 text-gray-600 transition-colors"
                      >
                         <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14"></path></svg>
                      </button>
                    </div>

                    {/* Price */}
                    <span className="text-sm font-bold text-brand-orange">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      {items.length > 0 && (
        <div className="p-4 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600 text-sm font-medium">Tổng tạm tính:</span>
            <span className="text-lg font-bold text-brand-orange">{formatCurrency(totalPrice)}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link 
              href="/cart" 
              className="flex items-center justify-center px-4 py-2.5 border border-gray-300 text-gray-700 rounded-md font-medium text-sm hover:bg-gray-50 hover:border-gray-400 transition-all"
            >
              Xem giỏ hàng
            </Link>
            
            <Link 
              href="/checkout" 
              className="flex items-center justify-center px-4 py-2.5 bg-black text-white rounded-md font-bold text-sm hover:brightness-110 shadow-md shadow-orange-100 transition-all"
            >
              Thanh toán ngay
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniCartPopup;