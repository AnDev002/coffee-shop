'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FiClock, FiCheckCircle, FiCoffee, FiAlertCircle, 
  FiTrendingUp, FiCalendar 
} from 'react-icons/fi';

export default function StaffDashboardPage() {
  // Mock data cho ca làm việc hiện tại
  const shiftStats = {
    pendingOrders: 3,     // Số đơn đang chờ xử lý (quan trọng nhất)
    completedToday: 45,   // Số đơn đã hoàn thành trong ca
    revenueToday: 1250000,// Doanh thu ước tính (nếu cho phép staff xem)
    shiftStart: '07:00',
    shiftEnd: '15:00',
    currentDate: new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })
  };

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Header & Welcome */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-[#1d150b]">Xin chào, Staff! 👋</h2>
          <p className="text-gray-500 mt-1">Chúc bạn một ca làm việc năng lượng.</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium bg-gray-50 px-4 py-2 rounded-lg text-gray-600 border border-gray-200">
          <FiCalendar className="text-[#c49b63]" />
          <span>{shiftStats.currentDate}</span>
          <span className="mx-2">|</span>
          <FiClock className="text-[#c49b63]" />
          <span>Ca: {shiftStats.shiftStart} - {shiftStats.shiftEnd}</span>
        </div>
      </div>

      {/* 2. Key Metrics (KPIs trong ca) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Việc cần làm ngay */}
        <Link href="/staff/orders" className="group">
          <div className="bg-[#c49b63] p-6 rounded-2xl shadow-lg shadow-[#c49b63]/20 text-white relative overflow-hidden transition-transform hover:-translate-y-1">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <FiCoffee size={80} />
            </div>
            <p className="font-medium text-white/90">Đơn chờ xử lý</p>
            <h3 className="text-4xl font-bold mt-2">{shiftStats.pendingOrders}</h3>
            <div className="mt-4 flex items-center gap-2 text-sm font-medium bg-white/20 w-fit px-3 py-1 rounded-lg backdrop-blur-sm">
              <span>Xử lý ngay</span> <FiTrendingUp />
            </div>
          </div>
        </Link>

        {/* Card 2: Hiệu suất */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-full">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 font-medium">Đơn đã xong hôm nay</p>
              <h3 className="text-3xl font-bold text-[#1d150b] mt-2">{shiftStats.completedToday}</h3>
            </div>
            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
              <FiCheckCircle size={24} />
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-400">
            Cập nhật realtime
          </div>
        </div>

        {/* Card 3: Thông báo / Lưu ý */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-full relative overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-1 bg-red-500"></div>
            <div>
              <div className="flex items-center gap-2 text-red-500 font-bold mb-2">
                <FiAlertCircle /> Lưu ý quan trọng
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Món <strong>"Bánh Croissant"</strong> hiện đang hết hàng. Vui lòng tư vấn khách đổi sang bánh quy hoặc Toast.
              </p>
            </div>
            <span className="text-xs text-gray-400 mt-3">Đăng bởi: Quản lý cửa hàng</span>
        </div>
      </div>

      {/* 3. Quick Shortcuts & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg text-[#1d150b] mb-4">Phím tắt nhanh</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/staff/orders" className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-gray-300 hover:border-[#c49b63] hover:bg-[#c49b63]/5 hover:text-[#c49b63] transition-all cursor-pointer gap-2 text-gray-500">
                <FiCoffee size={24} />
                <span className="font-medium text-sm">Màn hình pha chế</span>
            </Link>
            <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-gray-300 hover:border-red-400 hover:bg-red-50 hover:text-red-500 transition-all cursor-pointer gap-2 text-gray-500">
                <FiAlertCircle size={24} />
                <span className="font-medium text-sm">Báo cáo sự cố</span>
            </div>
          </div>
        </div>

        {/* Shift Handover Notes (Ghi chú giao ca - Giả lập) */}
        <div className="bg-[#1d150b] p-6 rounded-2xl shadow-lg text-white">
            <h3 className="font-bold text-lg mb-4 text-[#c49b63]">Ghi chú giao ca</h3>
            <ul className="space-y-4 text-sm text-gray-300">
                <li className="flex gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c49b63] mt-2 shrink-0"></span>
                    <p>Vệ sinh máy pha cà phê lúc 14:00.</p>
                </li>
                <li className="flex gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c49b63] mt-2 shrink-0"></span>
                    <p>Khách bàn 05 đặt tiệc lúc 16:00, nhớ setup bàn trước.</p>
                </li>
            </ul>
        </div>
      </div>
    </div>
  );
}