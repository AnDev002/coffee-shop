// src/modules/checkout/CheckoutPage.tsx
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

// Stores
import { useCartStore, useCartItems, useCartSummary } from '@/store/useCartStore';
import { useCheckoutStore } from '@/store/useCheckoutStore';

// Actions & Components
import { placeOrder } from '@/actions/order';
import { CheckoutForm } from "./components/CheckoutForm";
import { CheckoutSummary } from "./components/CheckoutSummary";
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const CheckoutPage = () => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  // Data from Stores
  const cartItems = useCartItems();
  const { totalPrice } = useCartSummary();
  const { clearCart } = useCartStore(); 
  const { buyerInfo, receiverInfo, senderInfo, deliveryMethod } = useCheckoutStore();
  
  // Validate trước khi đặt
  const validateOrder = () => {
    if (cartItems.length === 0) return "Giỏ hàng đang trống";
    if (!buyerInfo.name || !buyerInfo.phone) return "Vui lòng nhập thông tin người đặt";
    if (!receiverInfo.address || !receiverInfo.name || !receiverInfo.phone) return "Vui lòng nhập thông tin người nhận";
    return null;
  };

  const handlePlaceOrder = async () => {
    // 1. Validate
    const error = validateOrder();
    if (error) {
      toast.error(error);
      return;
    }

    setIsProcessing(true); // Bắt đầu loading xoay vòng
    try {
      // 2. Gọi Server Action (Đã cập nhật truyền deliveryMethod)
      const result = await placeOrder({
        items: cartItems,
        buyerInfo,
        receiverInfo,
        totalAmount: totalPrice,
        deliveryMethod: deliveryMethod, // <--- TRUYỀN THÊM CÁI NÀY
        note: `Lời nhắn: ${receiverInfo.message || 'Không'}`
      });

      // 3. Xử lý kết quả
      if (result.success) {
        toast.success("Đặt hàng thành công!");
        clearCart(); // Xóa giỏ hàng
        // Chuyển hướng sang trang Thank You
        router.push(`/thank-you?orderId=${result.orderId}`);
      } else {
        toast.error(result.error || "Có lỗi xảy ra, vui lòng thử lại");
      }
    } catch (err) {
      console.error(err);
      toast.error("Lỗi kết nối hệ thống");
    } finally {
      setIsProcessing(false); // Tắt loading
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Giỏ hàng trống</h2>
        <button onClick={() => router.push('/menu')} className="text-primary hover:underline">
          Quay lại mua sắm
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8 pt-25">
        {/* Đã sửa: dùng 'name' thay vì 'label', và không cần href cho item cuối */}
        <Breadcrumbs items={[{ name: 'Trang chủ', href: '/' }, { name: 'Thanh toán' }]} />
        
        <h1 className="text-3xl font-bold mt-6 mb-8 text-gray-800">Thanh toán & Đặt hàng</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cột trái: Form nhập liệu */}
          <div className="lg:col-span-8 space-y-6">
            <CheckoutForm />
          </div>

          {/* Cột phải: Summary & Button */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <CheckoutSummary 
                items={cartItems} 
                total={totalPrice} 
                onPlaceOrder={handlePlaceOrder}
                isProcessing={isProcessing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};