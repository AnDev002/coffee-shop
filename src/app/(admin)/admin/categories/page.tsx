// src/app/(admin)/admin/categories/page.tsx
import React from "react";
import { FiPlus, FiMoreHorizontal, FiEdit3, FiGrid, FiList } from "react-icons/fi";

// Mock Data Categories
const MOCK_CATEGORIES = [
    { id: 1, name: "Cà Phê Việt Nam", count: 12, description: "Phin sữa đá, Bạc xỉu, Cà phê đen..." },
    { id: 2, name: "Cà Phê Máy", count: 8, description: "Espresso, Capuchino, Latte..." },
    { id: 3, name: "Trà Trái Cây", count: 15, description: "Trà đào, Trà vải, Trà sen..." },
    { id: 4, name: "Đá Xay (Ice Blended)", count: 6, description: "Cookie đá xay, Matcha đá xay..." },
    { id: 5, name: "Bánh Ngọt & Ăn Vặt", count: 10, description: "Tiramisu, Croissant, Mousse..." },
];

export default function CategoriesPage() {
  return (
    <div className="space-y-6 font-sans">
       {/* Header */}
       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#1d150b]">Danh mục món</h2>
          <p className="text-gray-500 text-sm mt-1">Phân loại thực đơn để khách hàng dễ dàng tìm kiếm</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#1d150b] hover:bg-[#3d2e1e] text-white rounded-xl shadow-lg shadow-[#1d150b]/20 transition-all font-medium">
          <FiPlus size={20} />
          <span>Thêm danh mục</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_CATEGORIES.map((cat) => (
            <div key={cat.id} className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[#c49b63]/30 transition-all duration-300 relative">
                
                {/* Action Menu (Hover to show) */}
                <div className="absolute top-4 right-4">
                    <button className="text-gray-300 hover:text-[#c49b63]">
                        <FiMoreHorizontal size={20} />
                    </button>
                </div>

                {/* Icon Placeholder */}
                <div className="w-12 h-12 rounded-xl bg-[#c49b63]/10 text-[#c49b63] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <FiGrid size={24} />
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-[#c49b63] transition-colors">{cat.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">{cat.description}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs font-semibold">
                        {cat.count} sản phẩm
                    </span>
                    <button className="p-2 text-gray-400 hover:text-[#c49b63] hover:bg-orange-50 rounded-lg transition-colors">
                        <FiEdit3 size={16} />
                    </button>
                </div>
            </div>
        ))}

        {/* Add New Quick Card */}
        <button className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#c49b63] hover:bg-[#c49b63]/5 transition-all gap-3 text-gray-400 hover:text-[#c49b63] h-full min-h-[200px]">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-white">
                <FiPlus size={24} />
            </div>
            <span className="font-medium">Tạo danh mục mới</span>
        </button>
      </div>
    </div>
  );
}