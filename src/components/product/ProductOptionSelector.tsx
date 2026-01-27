"use client";
import React, { useEffect, useState } from 'react';
import { ProductDetail, OptionGroup, OptionValue } from '@/types/product';
import { SelectedOption } from '@/types/cart';

interface Props {
  optionGroups: OptionGroup[];
  onOptionsChange: (options: SelectedOption[], isValid: boolean) => void;
}

export const ProductOptionSelector: React.FC<Props> = ({ optionGroups, onOptionsChange }) => {
  const [selected, setSelected] = useState<SelectedOption[]>([]);

  const formatPrice = (price: number) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  const handleToggle = (group: OptionGroup, value: OptionValue, checked: boolean) => {
    let newSelected = [...selected];
    const optionData: SelectedOption = {
      optionId: value.id,
      groupId: group.id,
      groupName: group.name,
      name: value.name,
      priceAdjustment: Number(value.priceAdjustment),
    };

    if (group.isMultiple) {
      // Checkbox (Topping)
      if (checked) {
        newSelected.push(optionData);
      } else {
        newSelected = newSelected.filter((o) => o.optionId !== value.id);
      }
    } else {
      // Radio (Size, Sugar)
      // Xóa cái cũ cùng nhóm rồi thêm cái mới
      newSelected = newSelected.filter((o) => o.groupId !== group.id);
      newSelected.push(optionData);
    }

    setSelected(newSelected);
  };

  // Validate: Kiểm tra các nhóm bắt buộc đã được chọn chưa
  useEffect(() => {
    const missingRequired = optionGroups.some((group) => {
      if (!group.isRequired) return false;
      return !selected.some((s) => s.groupId === group.id);
    });

    onOptionsChange(selected, !missingRequired);
  }, [selected, optionGroups, onOptionsChange]);

  if (!optionGroups || optionGroups.length === 0) return null;

  return (
    <div className="space-y-6 my-6">
      {optionGroups.map((group) => (
        <div key={group.id}>
          <h4 className="text-[#c49b63] font-serif text-lg mb-3 flex items-center gap-2">
            {group.name}
            {group.isRequired && <span className="text-red-500 text-sm">*</span>}
            <span className="text-gray-500 text-xs font-sans font-light ml-auto">
              {group.isMultiple ? '(Chọn nhiều)' : '(Chọn 1)'}
            </span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {group.optionValues.map((val) => {
              const isSelected = selected.some((s) => s.optionId === val.id);
              const price = Number(val.priceAdjustment);

              return (
                <label
                  key={val.id}
                  className={`
                    relative cursor-pointer flex items-center justify-between p-3 border rounded transition-all duration-300
                    ${isSelected 
                      ? 'border-[#c49b63] bg-[#c49b63]/10 text-white' 
                      : 'border-white/10 hover:border-white/30 text-gray-400'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type={group.isMultiple ? "checkbox" : "radio"}
                      name={`group-${group.id}`}
                      className="peer sr-only" // Ẩn input mặc định đi
                      checked={isSelected}
                      onChange={(e) => handleToggle(group, val, e.target.checked)}
                    />
                    {/* Custom Radio/Check Circle */}
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center
                      ${isSelected ? 'border-[#c49b63] bg-[#c49b63]' : 'border-gray-500'}
                    `}>
                       {isSelected && <div className="w-1.5 h-1.5 bg-black rounded-full" />}
                    </div>
                    
                    <span className="font-medium text-sm">{val.name}</span>
                  </div>
                  
                  {price > 0 && (
                    <span className="text-xs text-[#c49b63]">+{formatPrice(price)}</span>
                  )}
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};