// src/store/useCheckoutStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface UserInfo {
  name: string;
  phone: string;
  email?: string;
  address: string;
  relation?: string; 
  message?: string;  
}

// Định nghĩa kiểu cho phương thức nhận hàng
export type DeliveryMethod = 'delivery' | 'pickup';

interface CheckoutState {
  // Data
  buyerInfo: UserInfo;
  senderInfo: UserInfo;
  receiverInfo: UserInfo;
  selectedVoucherId: string | null;
  deliveryMethod: DeliveryMethod; // <--- MỚI

  // Actions
  setBuyerInfo: (info: UserInfo) => void;
  setSenderInfo: (info: UserInfo) => void;
  setReceiverInfo: (info: UserInfo) => void;
  setSelectedVoucher: (id: string | null) => void;
  setDeliveryMethod: (method: DeliveryMethod) => void; // <--- MỚI
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      // Giá trị mặc định
      buyerInfo: { name: "", phone: "", address: "" },
      senderInfo: { name: "Nguyễn Văn B", relation: "Người tặng", phone: "", address: "" },
      receiverInfo: { name: "", relation: "Bạn bè", phone: "", email: "", address: "", message: "" },
      selectedVoucherId: null,
      deliveryMethod: 'delivery', // Mặc định là giao hàng

      setBuyerInfo: (info) => set({ buyerInfo: info }),
      setSenderInfo: (info) => set({ senderInfo: info }),
      setReceiverInfo: (info) => set({ receiverInfo: info }),
      setSelectedVoucher: (id) => set({ selectedVoucherId: id }),
      setDeliveryMethod: (method) => set({ deliveryMethod: method }),
    }),
    {
      name: 'checkout-storage', 
      storage: createJSONStorage(() => localStorage),
      skipHydration: true, 
    }
  )
);