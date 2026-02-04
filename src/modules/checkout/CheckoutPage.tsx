// src/modules/checkout/CheckoutPage.tsx
'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react'; // <--- 1. THÊM IMPORT NÀY

// Stores
import { useCartStore, useCartItems, useCartSummary } from '@/store/useCartStore';
import { useCheckoutStore } from '@/store/useCheckoutStore';
// import { useUserStore } from '@/store/useUserStore'; // <--- 2. BỎ IMPORT NÀY

// Actions & Components
import { placeOrder } from '@/actions/order';
import { CheckoutForm } from "./components/CheckoutForm";
import { CheckoutSummary } from "./components/CheckoutSummary";
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const CheckoutPage = () => {
  const router = useRouter();
  
  // 3. LẤY USER TỪ SESSION (Thay vì useUserStore)
  // useSession hook sẽ tự động lấy thông tin người dùng đã đăng nhập từ Cookie/Token
  const { data: session } = useSession();
  const user = session?.user; 

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Data from Stores
  const cartItems = useCartItems();
  const { totalPrice } = useCartSummary();
  const { clearCart } = useCartStore(); 
  
  // const { user } = useUserStore(); // <--- 4. KHÔNG DÙNG DÒNG NÀY NỮA
  
  const { buyerInfo, receiverInfo, senderInfo, deliveryMethod, note } = useCheckoutStore();
  
  // Debug: Kiểm tra xem user có dữ liệu không
  useEffect(() => {
     console.log("Current User form Session:", user);
  }, [user]);

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
      
      console.log("User sending to placeOrder:", user); // Log để check lần cuối

      const result = await placeOrder({
        items: cartItems,
        buyerInfo,
        receiverInfo,
        totalAmount: totalPrice,
        deliveryMethod: deliveryMethod,
        note: finalNote.trim(),
        
        // 5. QUAN TRỌNG: Truyền ID từ biến user của Session
        // Đảm bảo user.id tồn tại và ép kiểu về string
        userId: user?.id ? String(user.id) : undefined 
      });

      if (result.success) {
        setIsSuccess(true); 
        toast.success("Đặt hàng thành công!");
        clearCart(); 
        router.push(`/thank-you?orderId=${result.orderId}`);
      } else {
        toast.error(result.error || "Có lỗi xảy ra, vui lòng thử lại");
        setIsProcessing(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Lỗi kết nối hệ thống");
      setIsProcessing(false);
    } 
  };

  // 6. UI Loading khi thành công
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center space-y-4">
        <div className="relative w-20 h-20">
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