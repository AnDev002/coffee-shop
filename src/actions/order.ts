// src/actions/order.ts
'use server'

import { db } from "@/lib/db";
import { CartItem } from "@/types/cart";
import { UserInfo } from "@/store/useCheckoutStore";
import { OrderStatus, PaymentStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

// ... (giữ nguyên hàm generateOrderId) ...
function generateOrderId(length: number = 6): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

interface PlaceOrderParams {
  items: CartItem[];
  buyerInfo: UserInfo;
  receiverInfo: UserInfo;
  totalAmount: number;
  deliveryMethod: string;
  note?: string;
  userId?: number;
}

export async function placeOrder(data: PlaceOrderParams) {
  try {
    // 1. Validate
    if (!data.buyerInfo.name || !data.buyerInfo.phone) {
      return { success: false, error: "Thiếu thông tin người đặt hàng" };
    }

    if (!data.items || data.items.length === 0) {
      return { success: false, error: "Giỏ hàng trống" };
    }

    // --- FIX LOGIC ĐỊA CHỈ ---
    let finalShippingAddress = "Nhận tại quán";
    
    // Nếu client gửi lên method là delivery, bắt buộc phải có địa chỉ
    if (data.deliveryMethod === 'delivery') {
        const inputAddress = data.receiverInfo?.address || "";
        
        // Check kỹ: nếu địa chỉ rỗng HOẶC vẫn là "Nhận tại quán" (do lỗi client) -> Báo lỗi
        if (!inputAddress || inputAddress.trim() === "" || inputAddress === "Nhận tại quán") {
             return { success: false, error: "Vui lòng nhập địa chỉ giao hàng đầy đủ." };
        }
        finalShippingAddress = inputAddress;
    } 
    // Nếu method là pickup thì mặc định là Nhận tại quán
    // -------------------------

    let orderId = generateOrderId();
    let isUnique = false;
    while (!isUnique) {
        const existing = await db.order.findUnique({ where: { id: orderId } });
        if (!existing) isUnique = true;
        else orderId = generateOrderId();
    }

    const newOrder = await db.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          id: orderId,
          customerName: data.buyerInfo.name,
          phoneNumber: data.buyerInfo.phone,
          
          shippingAddress: finalShippingAddress,
          note: data.note || "", // Đảm bảo note không bị null
          
          receiverName: data.receiverInfo.name || data.buyerInfo.name,
          receiverPhone: data.receiverInfo.phone || data.buyerInfo.phone,

          totalAmount: data.totalAmount,
          paymentStatus: PaymentStatus.UNPAID,
          orderStatus: OrderStatus.PENDING,
          
          ...(data.userId && { userId: data.userId }),
        },
      });

      // ... (giữ nguyên logic tạo OrderItems) ...
      for (const item of data.items) {
        const productIdInt = Number(item.productId); 
        
        const orderItem = await tx.orderItem.create({
          data: {
            orderId: order.id,
            productId: productIdInt,
            quantity: item.quantity,
            unitPrice: item.price, 
          },
        });

        if (item.selectedOptions && item.selectedOptions.length > 0) {
          await tx.orderItemOption.createMany({
            data: item.selectedOptions.map((opt) => ({
              orderItemId: orderItem.id,
              optionValueName: opt.name,
              priceAdjustment: opt.priceAdjustment,
            })),
          });
        }
      }

      return order;
    });

    revalidatePath("/admin/orders");
    revalidatePath("/staff/orders");
    
    return {
      success: true,
      orderId: newOrder.id,
      message: "Đặt hàng thành công!",
    };

  } catch (error) {
    console.error("❌ Lỗi khi tạo đơn hàng:", error);
    return { success: false, error: "Có lỗi xảy ra khi xử lý đơn hàng." };
  }
}