// src/app/(main)/checkout/page.tsx
import { CheckoutPage } from "@/modules/checkout/CheckoutPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thanh toán | NS Coffee",
  description: "Hoàn tất đơn hàng của bạn",
};

export default function Page() {
  return <CheckoutPage />;
}