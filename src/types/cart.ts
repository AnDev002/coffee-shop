// src/types/cart.ts

export interface SelectedOption {
  optionId: number;       // ID của OptionValue (VD: ID của "Size L")
  groupId: number;        // ID của OptionGroup (VD: ID của "Size")
  groupName: string;      // Tên nhóm (VD: "Size", "Topping")
  name: string;           // Tên giá trị (VD: "L", "Trân châu đen")
  priceAdjustment: number; // Giá cộng thêm (VD: 5000)
}

export interface CartItem {
  id: string;             // Unique ID (thường là combination của productId + options)
  productId: string | number; // Cập nhật để support cả number từ DB
  title: string;
  imageUrl: string;
  
  // Giá:
  basePrice: number;      // Giá gốc sản phẩm
  optionsPrice: number;   // Tổng giá các option cộng thêm
  price: number;          // Giá cuối cùng của 1 đơn vị = basePrice + optionsPrice
  
  quantity: number;
  stock: number;
  
  // Options:
  selectedOptions: SelectedOption[]; // Thay thế cho color/size cứng
  
  slug?: string;
}

export interface CartResponse {
  items: CartItem[];
  total: number;
  itemCount: number;
}