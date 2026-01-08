// src/app/(admin)/admin/products/create/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FiArrowLeft, FiSave, FiPlus, FiTrash2, FiImage, 
  FiCheckCircle, FiCircle, FiCheckSquare 
} from 'react-icons/fi';
import Link from 'next/link';

// --- Types definition ---
interface OptionItem {
  id: string;
  name: string;
  price: number; // Giá thêm (VD: trân châu +5k)
}

interface OptionGroup {
  id: string;
  title: string; // VD: Mức đường, Topping
  isRequired: boolean; // Bắt buộc chọn hay không
  type: 'single' | 'multiple'; // Chọn 1 hay nhiều
  items: OptionItem[];
}

export default function CreateProductPage() {
  const router = useRouter();

  // --- State quản lý Form ---
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState('coffee');
  const [description, setDescription] = useState('');
  
  // State quản lý danh sách Option
  const [optionGroups, setOptionGroups] = useState<OptionGroup[]>([
    {
      id: 'opt-group-1',
      title: 'Mức đường',
      isRequired: true,
      type: 'single',
      items: [
        { id: 'opt-1-1', name: '100% Đường', price: 0 },
        { id: 'opt-1-2', name: '70% Đường', price: 0 },
        { id: 'opt-1-3', name: '50% Đường', price: 0 },
        { id: 'opt-1-4', name: '0% Đường', price: 0 },
      ]
    }
  ]);

  // --- Handlers ---
  
  // 1. Thêm nhóm tùy chọn mới (VD: Thêm nhóm "Topping")
  const addOptionGroup = () => {
    const newGroup: OptionGroup = {
      id: `group-${Date.now()}`,
      title: 'Nhóm tùy chọn mới',
      isRequired: false,
      type: 'single',
      items: [{ id: `item-${Date.now()}`, name: 'Tùy chọn 1', price: 0 }]
    };
    setOptionGroups([...optionGroups, newGroup]);
  };

  // 2. Xóa nhóm tùy chọn
  const removeOptionGroup = (groupId: string) => {
    setOptionGroups(optionGroups.filter(g => g.id !== groupId));
  };

  // 3. Cập nhật thông tin nhóm (Tiêu đề, loại chọn)
  const updateOptionGroup = (groupId: string, field: keyof OptionGroup, value: any) => {
    setOptionGroups(optionGroups.map(g => 
      g.id === groupId ? { ...g, [field]: value } : g
    ));
  };

  // 4. Thêm lựa chọn con (VD: Thêm "Trân châu trắng" vào nhóm "Topping")
  const addOptionItem = (groupId: string) => {
    setOptionGroups(optionGroups.map(g => {
      if (g.id === groupId) {
        return {
          ...g,
          items: [...g.items, { id: `item-${Date.now()}`, name: '', price: 0 }]
        };
      }
      return g;
    }));
  };

  // 5. Cập nhật lựa chọn con
  const updateOptionItem = (groupId: string, itemId: string, field: keyof OptionItem, value: any) => {
    setOptionGroups(optionGroups.map(g => {
      if (g.id === groupId) {
        const newItems = g.items.map(item => 
          item.id === itemId ? { ...item, [field]: value } : item
        );
        return { ...g, items: newItems };
      }
      return g;
    }));
  };

  // 6. Xóa lựa chọn con
  const removeOptionItem = (groupId: string, itemId: string) => {
    setOptionGroups(optionGroups.map(g => {
      if (g.id === groupId) {
        return { ...g, items: g.items.filter(i => i.id !== itemId) };
      }
      return g;
    }));
  };

  return (
    <div className="max-w-5xl mx-auto pb-20 font-sans">
      {/* --- Header --- */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <FiArrowLeft size={24} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[#1d150b]">Thêm món mới</h1>
            <p className="text-sm text-gray-500">Tạo món ăn và thiết lập các tùy chọn (topping, đường, đá...)</p>
          </div>
        </div>
        <div className="flex gap-3">
            <Link href="/admin/products" className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition-colors">
                Hủy bỏ
            </Link>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#c49b63] hover:bg-[#b08b55] text-white rounded-xl shadow-lg shadow-[#c49b63]/30 font-medium transition-all">
                <FiSave size={20} />
                <span>Lưu sản phẩm</span>
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- Left Column: Basic Info --- */}
        <div className="lg:col-span-2 space-y-8">
            {/* 1. Thông tin chung */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-[#1d150b] mb-4">Thông tin cơ bản</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tên món</label>
                        <input 
                            type="text" 
                            placeholder="VD: Cà phê sữa đá" 
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c49b63]/50 focus:border-[#c49b63] transition-all"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Giá bán (VNĐ)</label>
                            <input 
                                type="number" 
                                placeholder="0" 
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c49b63]/50 focus:border-[#c49b63] transition-all"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                            <select 
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c49b63]/50 focus:border-[#c49b63] transition-all"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="coffee">Cà phê</option>
                                <option value="tea">Trà trái cây</option>
                                <option value="cake">Bánh ngọt</option>
                                <option value="food">Đồ ăn vặt</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn</label>
                        <textarea 
                            rows={3}
                            placeholder="Mô tả về hương vị, thành phần..." 
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c49b63]/50 focus:border-[#c49b63] transition-all"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* 2. Cấu hình Option (Phần quan trọng) */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-[#1d150b]">Tùy chọn & Topping</h3>
                    <button 
                        onClick={addOptionGroup}
                        className="text-sm font-medium text-[#c49b63] hover:text-[#b08b55] flex items-center gap-1"
                    >
                        <FiPlus size={16} /> Thêm nhóm tùy chọn
                    </button>
                </div>

                <div className="space-y-6">
                    {optionGroups.map((group, index) => (
                        <div key={group.id} className="border border-gray-200 rounded-xl p-5 bg-gray-50/30 relative group-hover:border-[#c49b63]">
                            {/* Header của Group */}
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                                <div className="flex-1 space-y-3">
                                    <input 
                                        type="text" 
                                        value={group.title}
                                        onChange={(e) => updateOptionGroup(group.id, 'title', e.target.value)}
                                        className="font-bold text-gray-800 bg-transparent border-b border-dashed border-gray-300 focus:border-[#c49b63] focus:outline-none w-full pb-1"
                                        placeholder="Tên nhóm (VD: Size, Đường, Đá)"
                                    />
                                    <div className="flex items-center gap-4 text-sm">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name={`type-${group.id}`}
                                                checked={group.type === 'single'}
                                                onChange={() => updateOptionGroup(group.id, 'type', 'single')}
                                                className="hidden"
                                            />
                                            <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${group.type === 'single' ? 'border-[#c49b63] bg-[#c49b63]' : 'border-gray-400'}`}>
                                                {group.type === 'single' && <FiCheckCircle className="text-white text-[10px]" />}
                                            </span>
                                            <span className={group.type === 'single' ? 'text-[#c49b63] font-medium' : 'text-gray-500'}>Chọn 1 (Radio)</span>
                                        </label>

                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name={`type-${group.id}`}
                                                checked={group.type === 'multiple'}
                                                onChange={() => updateOptionGroup(group.id, 'type', 'multiple')}
                                                className="hidden"
                                            />
                                            <span className={`w-4 h-4 rounded border flex items-center justify-center ${group.type === 'multiple' ? 'border-[#c49b63] bg-[#c49b63]' : 'border-gray-400'}`}>
                                                {group.type === 'multiple' && <FiCheckSquare className="text-white text-[10px]" />}
                                            </span>
                                            <span className={group.type === 'multiple' ? 'text-[#c49b63] font-medium' : 'text-gray-500'}>Chọn nhiều (Checkbox)</span>
                                        </label>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => removeOptionGroup(group.id)}
                                    className="text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <FiTrash2 size={18} />
                                </button>
                            </div>

                            {/* Danh sách các lựa chọn bên trong Group */}
                            <div className="space-y-2 pl-4 border-l-2 border-gray-200">
                                {group.items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-3">
                                        <div className="text-gray-400">
                                            {group.type === 'single' ? <FiCircle size={14} /> : <FiCheckSquare size={14} />}
                                        </div>
                                        <input 
                                            type="text" 
                                            placeholder="Tên lựa chọn (VD: 50% Đường)" 
                                            value={item.name}
                                            onChange={(e) => updateOptionItem(group.id, item.id, 'name', e.target.value)}
                                            className="flex-1 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm focus:border-[#c49b63] focus:outline-none"
                                        />
                                        <div className="relative w-32">
                                            <input 
                                                type="number" 
                                                placeholder="Giá thêm" 
                                                value={item.price}
                                                onChange={(e) => updateOptionItem(group.id, item.id, 'price', Number(e.target.value))}
                                                className="w-full px-3 py-1.5 pl-8 bg-white border border-gray-200 rounded-lg text-sm focus:border-[#c49b63] focus:outline-none text-right"
                                            />
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">+</span>
                                        </div>
                                        <button 
                                            onClick={() => removeOptionItem(group.id, item.id)}
                                            className="text-gray-300 hover:text-red-500"
                                        >
                                            <FiTrash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                                <button 
                                    onClick={() => addOptionItem(group.id)}
                                    className="text-xs font-medium text-[#c49b63] hover:underline mt-2 flex items-center gap-1"
                                >
                                    <FiPlus /> Thêm lựa chọn
                                </button>
                            </div>
                        </div>
                    ))}
                    
                    {optionGroups.length === 0 && (
                        <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-gray-500 text-sm">
                            Sản phẩm này chưa có tùy chọn nào. <br/>
                            Nhấn "Thêm nhóm tùy chọn" để cấu hình đường, đá, topping...
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* --- Right Column: Image & Status --- */}
        <div className="space-y-8">
            {/* Ảnh sản phẩm */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-[#1d150b] mb-4">Hình ảnh</h3>
                <div className="aspect-square w-full rounded-xl border-2 border-dashed border-gray-300 hover:border-[#c49b63] hover:bg-[#c49b63]/5 transition-all cursor-pointer flex flex-col items-center justify-center text-gray-400 gap-2 group">
                    <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-white flex items-center justify-center text-gray-400 group-hover:text-[#c49b63] transition-colors">
                        <FiImage size={24} />
                    </div>
                    <span className="text-sm font-medium group-hover:text-[#c49b63]">Tải ảnh lên</span>
                    <span className="text-xs text-gray-400">PNG, JPG tối đa 5MB</span>
                </div>
            </div>

            {/* Trạng thái */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-[#1d150b] mb-4">Trạng thái</h3>
                <div className="space-y-3">
                    <label className="flex items-center justify-between cursor-pointer group">
                        <span className="text-sm font-medium text-gray-700">Đang bán (Active)</span>
                        <div className="relative inline-block w-11 h-6 transition duration-200 ease-in-out">
                            <input type="checkbox" className="peer absolute w-full h-full opacity-0 cursor-pointer" defaultChecked />
                            <span className="block w-full h-full bg-gray-200 rounded-full shadow-inner peer-checked:bg-[#c49b63] transition-colors duration-300"></span>
                            <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 peer-checked:translate-x-5"></span>
                        </div>
                    </label>
                    <div className="pt-3 border-t border-gray-100">
                        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                            <input type="checkbox" className="rounded text-[#c49b63] focus:ring-[#c49b63]" />
                            <span>Sản phẩm nổi bật (Best Seller)</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}