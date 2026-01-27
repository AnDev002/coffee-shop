// src/actions/product.ts
"use server";

import { db } from "@/lib/db";
import { ProductDetail } from "@/types/product";

export async function getBestSellingProducts(limit: number = 4): Promise<ProductDetail[]> {
  try {
    const products = await db.product.findMany({
      take: limit,
      // Logic: Sắp xếp theo số lượng orderItems (bán chạy nhất)
      // Nếu chưa có quan hệ orderItems, hãy đổi thành: orderBy: { createdAt: 'desc' }
      orderBy: {
        orderItems: {
          _count: 'desc'
        }
      },
      include: {
        category: true,
        productOptions: {
          include: {
            optionGroup: { include: { optionValues: true } },
          },
        },
      },
    });

    // Transform dữ liệu cho khớp với type ProductDetail
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description || "",
      basePrice: Number(product.basePrice),
      imageUrl: product.imageUrl || "",
      categoryId: product.categoryId,
      optionGroups: product.productOptions.map((po) => ({
        id: po.optionGroup.id,
        name: po.optionGroup.name,
        isMultiple: po.optionGroup.isMultiple,
        isRequired: po.optionGroup.isRequired,
        optionValues: po.optionGroup.optionValues.map((val) => ({
          id: val.id,
          name: val.name,
          priceAdjustment: Number(val.priceAdjustment),
        })),
      })),
    }));
  } catch (error) {
    console.error("Error fetching best sellers:", error);
    return [];
  }
}

export async function getProductById(id: number): Promise<ProductDetail | null> {
  try {
    const product = await db.product.findUnique({
      where: { id },
      include: {
        category: true,
        productOptions: {
          include: {
            optionGroup: {
              include: {
                optionValues: true,
              },
            },
          },
        },
      },
    });

    if (!product) return null;

    // Transform dữ liệu từ Prisma sang cấu trúc Frontend (ProductDetail)
    const productDetail: ProductDetail = {
      id: product.id,
      name: product.name,
      description: product.description || "",
      basePrice: Number(product.basePrice), // Convert Decimal -> Number
      imageUrl: product.imageUrl || "",
      categoryId: product.categoryId,
      // Map quan hệ nhiều-nhiều (product_option) về danh sách OptionGroup phẳng
      optionGroups: product.productOptions.map((po) => ({
        id: po.optionGroup.id,
        name: po.optionGroup.name,
        isMultiple: po.optionGroup.isMultiple,
        isRequired: po.optionGroup.isRequired,
        optionValues: po.optionGroup.optionValues.map((val) => ({
          id: val.id,
          name: val.name,
          priceAdjustment: Number(val.priceAdjustment),
        })),
      })),
    };

    return productDetail;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}