'use client';

import React, { useState, useEffect } from 'react';
import { FiClock, FiCheckCircle, FiLoader, FiRefreshCw, FiCoffee } from 'react-icons/fi';
import classNames from 'classnames';

// Định nghĩa kiểu dữ liệu cho đơn hàng
type OrderStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  note?: string;
}

interface Order {
  id: string;
  customerName: string;
  tableName?: string; // Nếu bán tại bàn
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
}

// Mock Data
const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Nguyễn Văn A',
    tableName: 'Bàn 05',
    items: [
      { id: '1', name: 'Bạc Xỉu Đá', quantity: 2, note: 'Ít ngọt' },
      { id: '2', name: 'Croissant Trứng Muối', quantity: 1 }
    ],
    total: 85000,
    status: 'PENDING',
    createdAt: new Date()
  },
  {
    id: 'ORD-002',
    customerName: 'Trần Thị B',
    items: [
      { id: '3', name: 'Trà Đào Cam Sả', quantity: 1 }
    ],
    total: 45000,
    status: 'PROCESSING',
    createdAt: new Date(Date.now() - 1000 * 60 * 5) // 5 mins ago
  }
];

export default function StaffOrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderStatus>('PENDING');
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  // --- Real-time Logic Placeholder ---
  useEffect(() => {
    // TODO: Connect Socket.io here to listen for 'new-order' events
    // socket.on('new-order', (order) => { setOrders(prev => [order, ...prev]) });
    
    console.log("Listening for new orders...");
  }, []);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    // Call API update status here
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = orders.filter(o => o.status === activeTab);

  // Helper render badge trạng thái
  const renderStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING': return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold flex items-center gap-1"><FiClock/> Chờ xác nhận</span>;
      case 'PROCESSING': return <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold flex items-center gap-1"><FiLoader className="animate-spin"/> Đang pha chế</span>;
      case 'COMPLETED': return <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold flex items-center gap-1"><FiCheckCircle/> Hoàn thành</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Xử lý đơn hàng</h2>
          <p className="text-gray-500 text-sm">Quản lý trạng thái pha chế và phục vụ món</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors shadow-sm">
            <FiRefreshCw /> Làm mới
        </button>
      </div>

      {/* Filter Tabs - Style to rõ dễ bấm */}
      <div className="flex p-1 bg-white rounded-xl shadow-sm border border-gray-100 w-fit">
        {[
          { id: 'PENDING', label: 'Đơn mới', color: 'text-yellow-600' },
          { id: 'PROCESSING', label: 'Đang pha chế', color: 'text-blue-600' },
          { id: 'COMPLETED', label: 'Hoàn thành', color: 'text-green-600' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as OrderStatus)}
            className={classNames(
              "px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200",
              activeTab === tab.id 
                ? "bg-gray-800 text-white shadow-md" 
                : "text-gray-500 hover:bg-gray-50"
            )}
          >
            {tab.label} {activeTab === tab.id && `(${filteredOrders.length})`}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-gray-400 flex flex-col items-center">
             <FiCoffee size={48} className="mb-4 opacity-50"/>
             <p>Hiện không có đơn hàng nào ở trạng thái này.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="p-4 font-semibold text-gray-600 text-sm">Mã & Thời gian</th>
                  <th className="p-4 font-semibold text-gray-600 text-sm">Khách hàng / Bàn</th>
                  <th className="p-4 font-semibold text-gray-600 text-sm min-w-[250px]">Chi tiết món</th>
                  <th className="p-4 font-semibold text-gray-600 text-sm">Tổng tiền</th>
                  <th className="p-4 font-semibold text-gray-600 text-sm">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-amber-50/30 transition-colors group">
                    <td className="p-4 align-top">
                      <div className="font-bold text-[#c49b63]">{order.id}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {order.createdAt.toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}
                      </div>
                      <div className="mt-2">{renderStatusBadge(order.status)}</div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="font-medium text-gray-800">{order.customerName}</div>
                      {order.tableName && (
                        <div className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs mt-1">
                          {order.tableName}
                        </div>
                      )}
                    </td>
                    <td className="p-4 align-top">
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-gray-700">
                                <span className="font-bold mr-1">{item.quantity}x</span> 
                                {item.name}
                            </span>
                            {item.note && (
                                <span className="text-xs text-red-500 italic ml-2">({item.note})</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 align-top font-bold text-gray-800">
                      {order.total.toLocaleString('vi-VN')}đ
                    </td>
                    <td className="p-4 align-top">
                      {/* ACTION BUTTONS */}
                      <div className="flex flex-col gap-2">
                        {order.status === 'PENDING' && (
                            <button 
                                onClick={() => handleStatusChange(order.id, 'PROCESSING')}
                                className="px-4 py-2 bg-[#c49b63] hover:bg-[#b08b55] text-white text-sm font-bold rounded-lg shadow-sm shadow-[#c49b63]/30 transition-all active:scale-95"
                            >
                                Nhận đơn & Pha chế
                            </button>
                        )}

                        {order.status === 'PROCESSING' && (
                            <button 
                                onClick={() => handleStatusChange(order.id, 'COMPLETED')}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-lg shadow-sm shadow-green-600/30 transition-all active:scale-95"
                            >
                                Hoàn tất & Giao
                            </button>
                        )}
                        
                        {order.status !== 'COMPLETED' && (
                             <button className="text-xs text-gray-400 hover:text-red-500 underline mt-1">
                                Hủy đơn
                             </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}