// src/store/useCartStore.ts
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { persist, createJSONStorage } from 'zustand/middleware';
import { apiClient } from '@/lib/api/ApiClient';
import { CartItem, SelectedOption, CartState, CartActions } from '@/types/cart';
import { toast } from 'react-hot-toast';

// --- 1. ĐỊNH NGHĨA THÊM STATE CHO UI (MỚI) ---
interface CartUIState {
  isMiniCartOpen: boolean;
}

interface CartUIActions {
  openMiniCart: () => void;
  closeMiniCart: () => void;
  toggleMiniCart: () => void;
}

// --- Debounce Map & Helpers (Giữ nguyên) ---
const debounceMap = new Map<string, NodeJS.Timeout>();

const areOptionsEqual = (options1: SelectedOption[], options2: SelectedOption[]) => {
  if (options1.length !== options2.length) return false;
  const sorted1 = [...options1].sort((a, b) => a.optionId - b.optionId);
  const sorted2 = [...options2].sort((a, b) => a.optionId - b.optionId);
  return sorted1.every((opt, index) => opt.optionId === sorted2[index].optionId);
};

const calculateSummary = (items: CartItem[]) => {
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return { totalItems, totalPrice };
};

const isIgnorableError = (error: any) => {
  const msg = error?.message || '';
  if (msg.includes('401') || msg.includes('404')) return true;
  return false;
};

// --- Store ---
// Kết hợp CartState, CartActions và UI State/Actions
const useCartStoreBase = create<CartState & CartActions & CartUIState & CartUIActions>()(
  persist(
    (set, get) => ({
      // --- Data State ---
      items: [],
      totalItems: 0,
      totalPrice: 0,
      isLoading: false,

      // --- UI State (MỚI) ---
      isMiniCartOpen: false,

      // --- UI Actions (MỚI) ---
      openMiniCart: () => set({ isMiniCartOpen: true }),
      closeMiniCart: () => set({ isMiniCartOpen: false }),
      toggleMiniCart: () => set((state) => ({ isMiniCartOpen: !state.isMiniCartOpen })),

      // --- Logic cũ ---
      fetchCart: async () => {
        try {
          const res = await apiClient.get('/api/store/cart');
          if (res && res.items) {
            set({ items: res.items, ...calculateSummary(res.items) });
          }
        } catch (error) {
          if (isIgnorableError(error)) return;
          console.error("Fetch cart error:", error);
        }
      },

      addToCart: async (product, quantity, selectedOptions = []) => {
        const prevItems = get().items;

        const basePrice = typeof product.basePrice === 'string'
          ? parseFloat(product.basePrice)
          : (product.basePrice || product.price);

        const optionsPrice = selectedOptions.reduce((acc, opt) => acc + Number(opt.priceAdjustment), 0);
        const finalUnitPrice = basePrice + optionsPrice;

        const existingItemIndex = prevItems.findIndex(i =>
          i.productId === product.id && areOptionsEqual(i.selectedOptions, selectedOptions)
        );

        let newItems = [...prevItems];

        if (existingItemIndex > -1) {
          const existingItem = newItems[existingItemIndex];
          newItems[existingItemIndex] = {
            ...existingItem,
            quantity: existingItem.quantity + quantity
          };
        } else {
          const tempId = `temp-${product.id}-${Date.now()}`;
          const newItem: CartItem = {
            id: tempId,
            productId: product.id,
            title: product.name || product.title,
            imageUrl: product.imageUrl || product.image,
            basePrice: basePrice,
            optionsPrice: optionsPrice,
            price: finalUnitPrice,
            quantity: quantity,
            stock: product.stockRemaining || 999,
            selectedOptions: selectedOptions,
            slug: product.slug
          };
          newItems.push(newItem);
        }

        // [QUAN TRỌNG] Thêm isMiniCartOpen: true để tự động mở popup
        set({ 
          items: newItems, 
          ...calculateSummary(newItems),
          isMiniCartOpen: true 
        });
        
        toast.success("Đã thêm vào giỏ hàng!");

        try {
          await apiClient.post('/api/store/cart', {
            productId: product.id,
            quantity: quantity,
            options: selectedOptions.map(o => o.optionId)
          });
        } catch (error) {
          if (isIgnorableError(error)) {
            console.log("Cart synced local only (Guest or API not ready)");
          } else {
            console.error("Sync cart failed:", error);
          }
        }
      },

      updateQuantity: async (itemId, newQuantity) => {
        if (newQuantity < 1) return;

        const prevItems = get().items;
        const newItems = prevItems.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        );

        set({ items: newItems, ...calculateSummary(newItems) });

        if (debounceMap.has(itemId)) {
          clearTimeout(debounceMap.get(itemId));
        }

        const timeoutId = setTimeout(async () => {
          try {
            const item = newItems.find(i => i.id === itemId);
            if (!item) return;
            await apiClient.patch(`/api/store/cart/${item.productId}`, { quantity: newQuantity });
            debounceMap.delete(itemId);
          } catch (error) {
            if (isIgnorableError(error)) return;
            console.error("Update quantity failed:", error);
          }
        }, 500);

        debounceMap.set(itemId, timeoutId);
      },

      removeItem: async (itemId) => {
        const prevItems = get().items;
        const newItems = prevItems.filter(item => item.id !== itemId);
        set({ items: newItems, ...calculateSummary(newItems) });

        if (debounceMap.has(itemId)) {
          clearTimeout(debounceMap.get(itemId));
          debounceMap.delete(itemId);
        }

        try {
          const item = prevItems.find(i => i.id === itemId);
          if (!item) return;
          await apiClient.delete(`/api/store/cart/${item.productId}`);
        } catch (error) {
          if (isIgnorableError(error)) return;
          set({ items: prevItems, ...calculateSummary(prevItems) }); 
          toast.error("Xóa thất bại (Lỗi Server)");
        }
      },

      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
      }),
      // XÓA HOẶC COMMENT DÒNG DƯỚI ĐÂY
      // skipHydration: true, 
    }
  )
);

// --- Exports ---

// Export thêm các actions UI
export const useCartActions = () => useCartStoreBase(
  useShallow((state) => ({
    fetchCart: state.fetchCart,
    addToCart: state.addToCart,
    updateQuantity: state.updateQuantity,
    removeItem: state.removeItem,
    clearCart: state.clearCart,
    openMiniCart: state.openMiniCart,
    closeMiniCart: state.closeMiniCart,
    toggleMiniCart: state.toggleMiniCart,
  }))
);

// [MỚI] Hook để lấy trạng thái UI cho Header
export const useCartUI = () => useCartStoreBase(useShallow((state) => ({
  isOpen: state.isMiniCartOpen
})));

export const useCartItems = () => useCartStoreBase(useShallow((state) => state.items));

export const useCartSummary = () => useCartStoreBase(useShallow((state) => ({
  totalItems: state.totalItems,
  totalPrice: state.totalPrice,
  isLoading: state.isLoading
})));

export const useCartStore = useCartStoreBase;