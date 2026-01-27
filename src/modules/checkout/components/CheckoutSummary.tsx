// src/modules/checkout/components/CheckoutSummary.tsx
'use client'

import { CartItem } from "@/types/cart";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import Image from "next/image";

interface CheckoutSummaryProps {
  items: CartItem[];
  total: number;
  onPlaceOrder: () => void;
  isProcessing: boolean;
}

export const CheckoutSummary = ({ items, total, onPlaceOrder, isProcessing }: CheckoutSummaryProps) => {
  const { deliveryMethod } = useCheckoutStore();

  // Logic mới: Không cộng phí ship vào tổng đơn hàng trên web
  const shippingFee = 0; 
  const finalTotal = total + shippingFee;

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden sticky top-24">
      <div className="p-4 bg-gray-50 border-b border-gray-100">
        <h3 className="font-bold text-gray-800">Đơn hàng ({items.length} món)</h3>
      </div>

      <div className="p-5">
        {/* List items */}
        <div className="space-y-4 max-h-[300px] overflow-y-auto mb-6 pr-1 custom-scrollbar">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="relative w-14 h-14 rounded border border-gray-200 overflow-hidden flex-shrink-0">
                <Image 
                  src={item.imageUrl || '/placeholder.png'} 
                  alt={item.title} 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-800 line-clamp-2">{item.title}</h4>
                <div className="text-xs text-gray-500 mt-0.5">
                   x{item.quantity} 
                   {item.selectedOptions?.length > 0 && ` • ${item.selectedOptions.map(o => o.name).join(', ')}`}
                </div>
              </div>
              <div className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                {formatCurrency(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-dashed border-gray-200 my-4"></div>

        {/* Calculations */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Tạm tính</span>
            <span>{formatCurrency(total)}</span>
          </div>
          
         

          {/* Note phí ship cho trường hợp giao hàng */}
          {deliveryMethod === 'delivery' && (
             <p className="text-[11px] text-orange-500 italic text-right mt-0.5">
               * Phí ship tính theo thực tế đơn vị vận chuyển & người nhận thanh toán.
             </p>
          )}
          
          <div className="flex justify-between items-end text-brand-orange mt-4 pt-4 border-t border-gray-100">
            <span className="font-semibold text-base text-gray-800">Tổng thanh toán</span>
            <span className="text-xl font-bold">{formatCurrency(finalTotal)}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onPlaceOrder}
          disabled={isProcessing}
          className="w-full mt-6 bg-black text-white py-3.5 rounded-lg font-bold hover:bg-black transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-md hover:shadow-orange-200 active:scale-[0.98]"
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang xử lý...
            </>
          ) : (
            "ĐẶT HÀNG NGAY"
          )}
        </button>
        
        <p className="text-[11px] text-center text-gray-400 mt-3 px-2 leading-tight">
          Bằng việc đặt hàng, bạn đồng ý với <span className="underline cursor-pointer">điều khoản sử dụng</span> của chúng tôi.
        </p>
      </div>
    </div>
  );
};