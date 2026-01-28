// src/actions/admin-orders.ts
'use server'

import { db } from "@/lib/db";
import { OrderStatus, PaymentStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

// 1. CẬP NHẬT TYPE: id đổi thành string
export type OrderWithDetails = {
  id: string; // <-- Đổi từ number sang string
  totalAmount: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  customerName: string | null;
  phoneNumber: string | null;
  note: string | null;
  cancelReason: string | null;
  shippingAddress: string | null;
  receiverName: string | null;
  receiverPhone: string | null;
  userId: number | null;
  createdAt: Date;
  updatedAt: Date;

  user: {
    id: number;
    userName: string;
    fullName: string | null;
    phoneNumber: string | null;
  } | null;

  orderItems: {
    id: number;
    quantity: number;
    unitPrice: number;
    product: {
      id: number;
      name: string;
      basePrice: number;
      imageUrl: string | null;
    };
    options: {
      id: number;
      optionValueName: string;
      priceAdjustment: number;
    }[];
  }[];
};

export async function getAdminOrders(status?: OrderStatus, searchId?: string) {
  try {
    const whereCondition: any = {};
    
    if (status) {
      whereCondition.orderStatus = status;
    }

    // 2. LOGIC TÌM KIẾM MỚI CHO STRING ID
    if (searchId) {
      // Tìm kiếm tương đối (contains) và không phân biệt hoa thường (mode: insensitive)
      whereCondition.id = {
        contains: searchId,
        mode: 'insensitive', 
      };
    }
    
    const rawOrders = await db.order.findMany({
      where: whereCondition,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true, 
        orderItems: {
          include: {
            product: true, 
            options: true,
          }
        }
      }
    });

    const formattedOrders = rawOrders.map((order) => ({
      ...order,
      totalAmount: Number(order.totalAmount),
      orderItems: order.orderItems.map((item) => ({
        ...item,
        unitPrice: Number(item.unitPrice),
        product: {
          ...item.product,
          basePrice: Number(item.product.basePrice),
        },
        options: item.options.map((opt) => ({
          ...opt,
          priceAdjustment: Number(opt.priceAdjustment),
        }))
      }))
    }));

    return { success: true, data: formattedOrders as unknown as any[] };

  } catch (error) {
    console.error("Get orders error:", error);
    return { success: false, error: "Không thể tải danh sách đơn hàng" };
  }
}

// 3. CẬP NHẬT THAM SỐ ĐẦU VÀO: orderId là string
const POINT_CONVERSION_RATE = 10000;

export async function updateOrderStatus(orderId: string, newStatus: OrderStatus, cancelReason?: string) {
  try {
    const updateData: any = { orderStatus: newStatus };
    
    if (newStatus === OrderStatus.COMPLETED) {
        updateData.paymentStatus = PaymentStatus.PAID;
    }

    if (newStatus === OrderStatus.CANCELLED && cancelReason) {
        updateData.cancelReason = cancelReason;
    }

    // Sử dụng Transaction để đảm bảo tính toàn vẹn dữ liệu
    await db.$transaction(async (tx) => {
      // 1. Cập nhật trạng thái đơn hàng
      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: updateData,
      });

      // 2. LOGIC TÍCH ĐIỂM: Chỉ thực hiện khi đơn hàng hoàn thành và có userId
      if (newStatus === OrderStatus.COMPLETED && updatedOrder.userId) {
        const amount = Number(updatedOrder.totalAmount);
        const earnedPoints = Math.floor(amount / POINT_CONVERSION_RATE);

        // Cập nhật points và totalSpent cho User
        await tx.user.update({
          where: { id: updatedOrder.userId },
          data: {
            points: { increment: earnedPoints },
            totalSpent: { increment: amount }
          }
        });
        
        console.log(`✅ Đã cộng ${earnedPoints} điểm cho User ID: ${updatedOrder.userId}`);
      }
    });
    
    // Revalidate để cập nhật UI ngay lập tức
    revalidatePath("/admin/orders");
    revalidatePath("/staff/orders");
    revalidatePath("/admin/users"); 
    
    return { success: true };
  } catch (error) {
    console.error("Update status error:", error);
    return { success: false, error: "Cập nhật trạng thái thất bại" };
  }
}