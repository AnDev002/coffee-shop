'use client';

import React, { useState } from 'react';
import { FiSearch, FiCalendar, FiFilter, FiDownload } from 'react-icons/fi';
import classNames from 'classnames';

// --- Types (Nên tách ra file types chung nếu được) ---
type OrderStatus = 'COMPLETED' | 'CANCELLED';

interface HistoryOrder {
  id: string;
  customerName: string;
  items: string[];
  total: number;
  status: OrderStatus;
  completedAt: string;
  paymentMethod: 'CASH' | 'BANKING';
}

// --- Mock Data ---
const MOCK_HISTORY: HistoryOrder[] = [
  { id: 'ORD-001', customerName: 'Nguyễn Văn A', items: ['2x Bạc Xỉu', '1x Bánh Mì'], total: 95000, status: 'COMPLETED', completedAt: '10:30 05/01/2026', paymentMethod: 'BANKING' },
  { id: 'ORD-002', customerName: 'Trần Thị B', items: ['1x Trà Đào'], total: 45000, status: 'COMPLETED', completedAt: '09:15 05/01/2026', paymentMethod: 'CASH' },
  { id: 'ORD-003', customerName: 'Lê C', items: ['1x Espresso'], total: 35000, status: 'CANCELLED', completedAt: '08:45 05/01/2026', paymentMethod: 'CASH' },
  { id: 'ORD-004', customerName: 'Phạm D', items: ['3x Latte Đá'], total: 165000, status: 'COMPLETED', completedAt: '08:30 05/01/2026', paymentMethod: 'BANKING' },
];

export default function StaffHistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('2026-01-05');

  // Logic lọc đơn giản
  const filteredHistory = MOCK_HISTORY.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
          <h2 className="text-2xl font-bold text-gray-800">Lịch sử đơn hàng</h2>
          <p className="text-gray-500 text-sm">Xem lại các đơn đã hoàn tất hoặc bị hủy trong ca làm việc.</p>
      </div>

      {/* Toolbar: Search & Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex flex-1 gap-4 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:max-w-xs">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Tìm theo mã đơn, tên khách..." 
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c49b63] text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            {/* Date Picker */}
            <div className="relative">
                <input 
                    type="date" 
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="pl-4 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c49b63] text-sm text-gray-600"
                />
            </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 w-full md:w-auto">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex-1 md:flex-none justify-center">
                <FiFilter /> Lọc nâng cao
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-[#c49b63] text-[#c49b63] rounded-lg text-sm font-medium hover:bg-[#c49b63]/5 transition-colors flex-1 md:flex-none justify-center">
                <FiDownload /> Xuất Excel
            </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                        <th className="px-6 py-4 font-semibold">Mã đơn</th>
                        <th className="px-6 py-4 font-semibold">Khách hàng</th>
                        <th className="px-6 py-4 font-semibold">Món đã gọi</th>
                        <th className="px-6 py-4 font-semibold">Tổng tiền</th>
                        <th className="px-6 py-4 font-semibold">Thanh toán</th>
                        <th className="px-6 py-4 font-semibold">Trạng thái</th>
                        <th className="px-6 py-4 font-semibold">Thời gian</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm">
                    {filteredHistory.length > 0 ? (
                        filteredHistory.map((item) => (
                            <tr key={item.id} className="hover:bg-amber-50/10 transition-colors group">
                                <td className="px-6 py-4 font-bold text-[#c49b63]">
                                    {item.id}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-800">
                                    {item.customerName}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    <p className="truncate max-w-[200px]" title={item.items.join(', ')}>
                                        {item.items.join(', ')}
                                    </p>
                                </td>
                                <td className="px-6 py-4 font-bold text-gray-800">
                                    {item.total.toLocaleString('vi-VN')}đ
                                </td>
                                <td className="px-6 py-4">
                                    <span className={classNames(
                                        "px-2 py-1 rounded border text-xs font-medium",
                                        item.paymentMethod === 'BANKING' 
                                            ? "border-blue-200 bg-blue-50 text-blue-600" 
                                            : "border-green-200 bg-green-50 text-green-600"
                                    )}>
                                        {item.paymentMethod}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {item.status === 'COMPLETED' ? (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                            Hoàn tất
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                            Đã hủy
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-gray-400 text-xs">
                                    {item.completedAt}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                                Không tìm thấy đơn hàng nào khớp với tìm kiếm.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        
        {/* Pagination Footer (Static) */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-500">Hiển thị {filteredHistory.length} kết quả</span>
            <div className="flex gap-2">
                <button disabled className="px-3 py-1 border rounded text-sm disabled:opacity-50">Trước</button>
                <button className="px-3 py-1 border rounded text-sm bg-[#1d150b] text-white border-[#1d150b]">1</button>
                <button disabled className="px-3 py-1 border rounded text-sm disabled:opacity-50">Sau</button>
            </div>
        </div>
      </div>
    </div>
  );
}