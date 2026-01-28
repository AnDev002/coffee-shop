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
  // 1. MỚI: Thêm state để đánh dấu đã đặt hàng thành công
  const [isSuccess, setIsSuccess] = useState(false);

  // Data from Stores
  const cartItems = useCartItems();
  const { totalPrice } = useCartSummary();
  const { clearCart } = useCartStore(); 
  
  const { buyerInfo, receiverInfo, senderInfo, deliveryMethod, note } = useCheckoutStore();
  
  const validateOrder = () => {
    if (cartItems.length === 0) return "Giỏ hàng đang trống";
    if (!buyerInfo.name || !buyerInfo.phone) return "Vui lòng nhập thông tin người đặt";
    if (deliveryMethod === 'delivery' && (!receiverInfo.address || receiverInfo.address === "Nhận tại quán")) {
        return "Vui lòng nhập địa chỉ giao hàng";
    }
    return null;
  };

  const handlePlaceOrder = async () => {
    const error = validateOrder();
    if (error) {
      toast.error(error);
      return;
    }

    setIsProcessing(true); 
    try {
      let finalNote = note || "";
      if (receiverInfo.message) {
         finalNote += ` (Lời nhắn thiệp: ${receiverInfo.message})`;
      }

      const result = await placeOrder({
        items: cartItems,
        buyerInfo,
        receiverInfo,
        totalAmount: totalPrice,
        deliveryMethod: deliveryMethod,
        note: finalNote.trim() 
      });

      if (result.success) {
        // 2. MỚI: Đánh dấu thành công TRƯỚC khi clear cart
        setIsSuccess(true); 
        toast.success("Đặt hàng thành công!");
        
        // Clear cart sẽ làm cartItems = [], nhưng nhờ isSuccess = true 
        // ta sẽ hiển thị màn hình Loading thay vì màn hình Giỏ hàng trống
        clearCart(); 
        
        router.push(`/thank-you?orderId=${result.orderId}`);
        // LƯU Ý: Không set setIsProcessing(false) ở đây để giữ hiệu ứng loading
      } else {
        toast.error(result.error || "Có lỗi xảy ra, vui lòng thử lại");
        setIsProcessing(false); // Chỉ tắt loading khi có lỗi
      }
    } catch (err) {
      console.error(err);
      toast.error("Lỗi kết nối hệ thống");
      setIsProcessing(false);
    } 
    // BỎ finally block để tránh tắt loading khi đang redirect thành công
  };

  // 3. MỚI: Màn hình Loading/Skeleton chuyên nghiệp khi đang chuyển trang
  // Hiển thị khi đang xử lý thành công HOẶC đang xử lý nói chung (nếu muốn che toàn bộ)
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center space-y-4">
        <div className="relative w-20 h-20">
            {/* Hiệu ứng Spinner vòng tròn cam */}
            <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-brand-orange rounded-full animate-spin border-t-transparent"></div>
        </div>
        <div className="text-center space-y-2 animate-pulse">
            <h2 className="text-xl font-bold text-gray-800">Đang xử lý đơn hàng...</h2>
            <p className="text-gray-500 text-sm">Vui lòng không tắt trình duyệt</p>
        </div>
      </div>
    );
  }

  // Logic cũ: Chỉ hiển thị Empty khi cart rỗng VÀ không phải đang trong trạng thái success
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
    <div className="bg-gray-50 min-h-screen pb-20 relative">
      {/* Optional: Overlay mờ khi đang processing (nhưng chưa success) */}
      {isProcessing && !isSuccess && (
         <div className="absolute inset-0 bg-white/50 z-50 cursor-not-allowed" />
      )}

      <div className="container mx-auto px-4 py-8 pt-25">
        <Breadcrumbs items={[{ name: 'Trang chủ', href: '/' }, { name: 'Thanh toán' }]} />
        
        <h1 className="text-3xl font-bold mt-6 mb-8 text-gray-800">Thanh toán & Đặt hàng</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <CheckoutForm />
          </div>

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