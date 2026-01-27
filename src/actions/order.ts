// src/actions/order.ts
'use server'

import { CartItem } from "@/types/cart";
import { UserInfo } from "@/store/useCheckoutStore";

interface PlaceOrderParams {
  items: CartItem[];
  buyerInfo: UserInfo;
  receiverInfo: UserInfo;
  totalAmount: number;
  deliveryMethod: string;
  note?: string;
}

export async function placeOrder(data: PlaceOrderParams) {
  // 1. Validate dữ liệu phía server (bảo mật)
  if (!data.buyerInfo.name || !data.buyerInfo.phone) {
    return { success: false, error: "Thiếu thông tin người đặt hàng" };
  }

  // 2. Giả lập delay xử lý (để test hiệu ứng loading UI)
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // 3. TẠI ĐÂY: Viết logic lưu vào Database (Prisma, MySQL...)
  // const newOrder = await prisma.order.create({ ... })
  
  // 4. Giả lập mã đơn hàng ngẫu nhiên
  const fakeOrderId = `DH-${Math.floor(100000 + Math.random() * 900000)}`;

  console.log("Đơn hàng mới:", {
    id: fakeOrderId,
    customer: data.buyerInfo.name,
    total: data.totalAmount,
    method: data.deliveryMethod
  });

  // 5. Trả về kết quả thành công
  return {
    success: true,
    orderId: fakeOrderId,
    message: "Đặt hàng thành công!"
  };
}