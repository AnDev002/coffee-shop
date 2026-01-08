// src/app/(admin)/admin/products/page.tsx
import React from "react";
import { FiPlus, FiSearch, FiFilter, FiEdit2, FiTrash2, FiMoreVertical } from "react-icons/fi";

// Mock Data
const MOCK_PRODUCTS = [
  {
    id: "PROD-001",
    name: "Cà Phê Sữa Đá",
    category: "Cà phê Việt Nam",
    price: 29000,
    status: "active",
    image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=200&auto=format&fit=crop",
    stock: 100,
  },
  {
    id: "PROD-002",
    name: "Latte Đá Xay",
    category: "Cà phê Máy",
    price: 45000,
    status: "active",
    image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=200&auto=format&fit=crop",
    stock: 50,
  },
  {
    id: "PROD-003",
    name: "Trà Đào Cam Sả",
    category: "Trà Trái Cây",
    price: 39000,
    status: "out_of_stock",
    image: "https://images.unsplash.com/photo-1626573967814-16a7f0e340d8?q=80&w=200&auto=format&fit=crop",
    stock: 0,
  },
  {
    id: "PROD-004",
    name: "Bánh Croissant Bơ",
    category: "Bánh Ngọt",
    price: 35000,
    status: "active",
    image: "https://images.unsplash.com/photo-1555507036-ab1f40388085?q=80&w=200&auto=format&fit=crop",
    stock: 20,
  },
  {
    id: "PROD-005",
    name: "Espresso",
    category: "Cà phê Máy",
    price: 25000,
    status: "active",
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=200&auto=format&fit=crop",
    stock: 100,
  },
];

export default function ProductsPage() {
  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#1d150b]">Danh sách món</h2>
          <p className="text-gray-500 text-sm mt-1">Quản lý thực đơn và kho hàng của bạn</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#c49b63] hover:bg-[#b08b55] text-white rounded-xl shadow-lg shadow-[#c49b63]/30 transition-all font-medium">
          <FiPlus size={20} />
          <span>Thêm món mới</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
                type="text" 
                placeholder="Tìm kiếm tên món, mã món..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c49b63]/50 focus:border-[#c49b63]"
            />
        </div>
        <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-[#c49b63] transition-colors">
                <FiFilter size={16} />
                <span>Lọc danh mục</span>
            </button>
            <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:border-[#c49b63]">
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Đang bán</option>
                <option value="out_of_stock">Hết hàng</option>
            </select>
        </div>
      </div>

      {/* Table List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold w-[80px]">Hình ảnh</th>
                <th className="px-6 py-4 font-semibold">Tên món</th>
                <th className="px-6 py-4 font-semibold">Danh mục</th>
                <th className="px-6 py-4 font-semibold">Giá bán</th>
                <th className="px-6 py-4 font-semibold">Trạng thái</th>
                <th className="px-6 py-4 font-semibold text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_PRODUCTS.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
                        {/* Lưu ý: Trong thực tế nên dùng next/image */}
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-[#1d150b]">{product.name}</div>
                    <div className="text-xs text-gray-400">{product.id}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                        {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-[#c49b63]">
                    {product.price.toLocaleString('vi-VN')}đ
                  </td>
                  <td className="px-6 py-4">
                    {product.status === 'active' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium border border-green-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                            Đang bán
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-xs font-medium border border-red-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            Hết hàng
                        </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-gray-400 hover:text-[#c49b63] hover:bg-orange-50 rounded-lg transition-colors" title="Chỉnh sửa">
                            <FiEdit2 size={16} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Xóa">
                            <FiTrash2 size={16} />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Placeholder */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
            <span>Hiển thị 1-5 trên tổng số 24 sản phẩm</span>
            <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50">Trước</button>
                <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Sau</button>
            </div>
        </div>
      </div>
    </div>
  );
}