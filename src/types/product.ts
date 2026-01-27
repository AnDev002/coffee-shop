// src/types/product.ts
export interface OptionValue {
  id: number;
  name: string;
  priceAdjustment: number; // Giá trị cộng thêm
}

export interface OptionGroup {
  id: number;
  name: string;
  isMultiple: boolean; // true = check box, false = radio
  isRequired: boolean;
  optionValues: OptionValue[];
}

export interface ProductDetail {
  id: number;
  name: string;
  description: string;
  basePrice: number; // Giá gốc
  imageUrl: string;
  categoryId: number;
  optionGroups: OptionGroup[]; // Danh sách nhóm option (Size, Topping...)
}