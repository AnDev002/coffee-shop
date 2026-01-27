// src/app/(main)/cart/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { useCartStore, useCartItems, useCartSummary, useCartActions } from '@/store/useCartStore';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { Trash2, ArrowLeft, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const items = useCartItems();
  const { totalPrice, totalItems } = useCartSummary();
  const { removeItem, updateQuantity } = useCartActions();

  const formatPrice = (val: number) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 text-center px-4 pt-20">
        <img src="/assets/empty-cart.png" alt="Empty Cart" className="w-32 h-32 opacity-30 mb-6" onError={(e) => e.currentTarget.style.display='none'}/>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Giỏ hàng trống</h2>
        <p className="text-gray-500 mb-8">Bạn chưa chọn món nào cả.</p>
        <Link 
          href="/menu" 
          className="bg-[#c49b63] text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-[#b08b55] transition-colors"
        >
          Xem thực đơn
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 pb-24 pt-28">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* FIX: Đổi 'label' thành 'name' và thêm href cho item cuối cùng */}
        <Breadcrumbs items={[{ name: 'Trang chủ', href: '/' }, { name: 'Giỏ hàng', href: '/cart' }]} />
        
        <h1 className="text-3xl font-bold mt-6 mb-8 text-gray-800 font-serif">Giỏ hàng ({totalItems} món)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="divide-y divide-gray-100">
                    {items.map((item: any) => (
                        <div key={item.id} className="p-4 flex flex-col md:flex-row gap-4 items-center">
                            <Link href={`/products/${item.productId}`} className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                            </Link>
                            
                            <div className="flex-1 w-full text-left">
                                <Link href={`/products/${item.productId}`} className="font-bold text-gray-800 hover:text-[#c49b63]">{item.title}</Link>
                                {item.selectedOptions && item.selectedOptions.length > 0 && (
                                    <div className="text-xs text-gray-500 mt-1">
                                        {item.selectedOptions.map((opt: any) => (
                                            <span key={opt.optionId} className="block">• {opt.groupName}: {opt.name}</span>
                                        ))}
                                    </div>
                                )}
                                <div className="text-[#c49b63] font-medium mt-1 md:hidden">
                                    {formatPrice(item.price)}
                                </div>
                            </div>

                            <div className="hidden md:block text-gray-600 font-medium min-w-[100px] text-right">
                                {formatPrice(item.price)}
                            </div>

                            <div className="flex items-center border border-gray-300 rounded-lg h-9 bg-white">
                                <button 
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-8 h-full flex items-center justify-center hover:bg-gray-100 disabled:opacity-30"
                                    disabled={item.quantity <= 1}
                                >-</button>
                                <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                                <button 
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-8 h-full flex items-center justify-center hover:bg-gray-100"
                                >+</button>
                            </div>

                            <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4">
                                <span className="font-bold text-[#c49b63] min-w-[100px] text-right">
                                    {formatPrice(item.price * item.quantity)}
                                </span>
                                <button 
                                    onClick={() => removeItem(item.id)}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                    title="Xóa"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="mt-6">
                <Link href="/menu" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#c49b63] transition-colors font-medium">
                    <ArrowLeft className="w-4 h-4" /> Tiếp tục mua hàng
                </Link>
            </div>
          </div>

          <div className="lg:col-span-4">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-28">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 pb-4 border-b border-gray-100">Tổng quan đơn hàng</h3>
                  <div className="flex justify-between items-end mb-6">
                      <span className="font-bold text-gray-800">Tổng cộng:</span>
                      <span className="text-2xl font-bold text-[#c49b63]">{formatPrice(totalPrice)}</span>
                  </div>

                  <Link 
                    href="/checkout"
                    className="w-full flex items-center justify-center gap-2 bg-[#c49b63] text-white py-3.5 rounded-lg font-bold uppercase tracking-wider hover:bg-[#b08b55] transition-all shadow-lg shadow-orange-100"
                  >
                      Thanh toán ngay <ArrowRight className="w-5 h-5" />
                  </Link>
              </div>
          </div>

        </div>
      </div>
    </div>
  );
}