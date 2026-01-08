// src/app/(admin)/admin/dashboard/page.tsx
import React from "react";
import { 
  CreditCard, ShoppingCart, Users, TrendingUp, 
  ArrowUpRight, ArrowDownRight, Calendar, Filter, MoreHorizontal 
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8 font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#1d150b]">Xin chào, Admin! 👋</h2>
          <p className="text-gray-500 text-sm mt-1">Đây là báo cáo hoạt động kinh doanh hôm nay.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 shadow-sm transition-all">
            <Calendar size={16} />
            <span>Hôm nay: 5/1/2026</span>
          </button>
          <button className="p-2 bg-[#1d150b] text-white rounded-lg hover:bg-[#1d150b]/90 shadow-lg shadow-[#1d150b]/20 transition-all">
            <Filter size={18} />
          </button>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
            title="Tổng doanh thu" 
            value="12.500.000đ" 
            icon={<CreditCard className="text-white" size={24}/>} 
            trend="+12.5%" 
            isPositive={true}
            color="bg-[#c49b63]" // Coffee Primary
        />
        <StatCard 
            title="Đơn hàng mới" 
            value="48" 
            icon={<ShoppingCart className="text-white" size={24}/>} 
            trend="+5" 
            isPositive={true}
            color="bg-[#1d150b]" // Coffee Secondary
        />
        <StatCard 
            title="Khách hàng mới" 
            value="12" 
            icon={<Users className="text-white" size={24}/>} 
            trend="-2.4%" 
            isPositive={false}
            color="bg-blue-500" // Accent color
        />
        <StatCard 
            title="Món bán chạy" 
            value="Latte Đá Xay" 
            icon={<TrendingUp className="text-white" size={24}/>} 
            subText="Top 1 doanh số"
            color="bg-orange-500" // Accent color
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column: Revenue Chart (Mockup) - Chiếm 2 phần */}
        <div className="xl:col-span-2 bg-white p-6 rounded-2xl shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)] border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-gray-800">Biểu đồ doanh thu</h3>
                <select className="bg-gray-50 border-none text-sm font-medium text-gray-600 rounded-lg px-3 py-1.5 cursor-pointer outline-none focus:ring-1 focus:ring-[#c49b63]">
                    <option>7 ngày qua</option>
                    <option>Tháng này</option>
                    <option>Năm nay</option>
                </select>
            </div>
            
            {/* Chart Visual Mockup */}
            <div className="h-[320px] w-full flex items-end justify-between gap-2 px-2 pb-4 border-b border-gray-100">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                    <div key={i} className="group relative flex-1 flex flex-col justify-end items-center gap-2 h-full">
                        <div 
                            className="w-full bg-[#f5dece] rounded-t-sm group-hover:bg-[#c49b63] transition-all duration-300 relative"
                            style={{ height: `${h}%` }}
                        >
                            <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1d150b] text-white text-xs py-1 px-2 rounded transition-opacity whitespace-nowrap z-10">
                                {h * 100}.000đ
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-3 px-2">
                <span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span><span>CN</span>
                <span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span>
            </div>
        </div>

        {/* Right Column: Recent Activity / Top Products - Chiếm 1 phần */}
        <div className="xl:col-span-1 space-y-8">
             {/* Top Products */}
             <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)] border border-gray-100 h-full">
                <h3 className="font-bold text-lg text-gray-800 mb-5">Top món bán chạy</h3>
                <div className="space-y-5">
                    <TopProductItem 
                        name="Cà Phê Sữa Đá" 
                        sales="1,204 ly" 
                        price="29.000đ"
                        rank={1}
                    />
                    <TopProductItem 
                        name="Trà Đào Cam Sả" 
                        sales="890 ly" 
                        price="45.000đ"
                        rank={2}
                    />
                    <TopProductItem 
                        name="Bánh Croissant" 
                        sales="650 cái" 
                        price="35.000đ"
                        rank={3}
                    />
                    <TopProductItem 
                        name="Matcha Latte" 
                        sales="420 ly" 
                        price="55.000đ"
                        rank={4}
                    />
                </div>
                <button className="w-full mt-6 py-2.5 text-sm font-medium text-[#c49b63] hover:text-[#1d150b] hover:bg-[#f5dece]/30 rounded-lg transition-colors border border-dashed border-[#c49b63]/30">
                    Xem tất cả món
                </button>
             </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-lg text-gray-800">Đơn hàng gần đây</h3>
            <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal size={20} />
            </button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                        <th className="px-6 py-4 font-semibold">Mã đơn</th>
                        <th className="px-6 py-4 font-semibold">Khách hàng</th>
                        <th className="px-6 py-4 font-semibold">Món</th>
                        <th className="px-6 py-4 font-semibold">Tổng tiền</th>
                        <th className="px-6 py-4 font-semibold">Trạng thái</th>
                        <th className="px-6 py-4 font-semibold">Thời gian</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                    <OrderItem 
                        id="#ORD-001" customer="Nguyễn Văn A" 
                        items="2x Cà phê sữa, 1x Bánh" 
                        total="93.000đ" 
                        status="completed" 
                        time="5 phút trước" 
                    />
                     <OrderItem 
                        id="#ORD-002" customer="Trần Thị B" 
                        items="1x Trà đào cam sả" 
                        total="45.000đ" 
                        status="pending" 
                        time="12 phút trước" 
                    />
                     <OrderItem 
                        id="#ORD-003" customer="Lê Tuấn C" 
                        items="4x Bạc xỉu đá" 
                        total="140.000đ" 
                        status="processing" 
                        time="25 phút trước" 
                    />
                     <OrderItem 
                        id="#ORD-004" customer="Phạm H" 
                        items="1x Espresso" 
                        total="35.000đ" 
                        status="cancelled" 
                        time="1 giờ trước" 
                    />
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}

// --- Helper Components ---

function StatCard({ title, value, icon, trend, isPositive, color, subText }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
        {/* Background decorative circle */}
        <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 ${color}`}></div>
        
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl shadow-md ${color} text-white`}>
                {icon}
            </div>
            {trend && (
                <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {trend}
                </div>
            )}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
            {subText && <p className="text-xs text-orange-500 font-medium mt-1">{subText}</p>}
        </div>
    </div>
  );
}

function TopProductItem({ name, sales, price, rank }: any) {
    return (
        <div className="flex items-center justify-between group">
            <div className="flex items-center gap-4">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold 
                    ${rank === 1 ? 'bg-[#c49b63] text-white shadow-md shadow-orange-200' : 
                      rank === 2 ? 'bg-gray-200 text-gray-600' : 
                      rank === 3 ? 'bg-orange-100 text-[#c49b63]' : 'bg-gray-50 text-gray-400'}`}>
                    {rank}
                </div>
                <div>
                    <h4 className="font-semibold text-gray-800 text-sm group-hover:text-[#c49b63] transition-colors">{name}</h4>
                    <p className="text-xs text-gray-400">{sales}</p>
                </div>
            </div>
            <span className="text-sm font-medium text-gray-600">{price}</span>
        </div>
    )
}

function OrderItem({ id, customer, items, total, status, time }: any) {
    const statusStyles: any = {
        completed: "bg-green-100 text-green-700",
        pending: "bg-orange-100 text-orange-700",
        processing: "bg-blue-100 text-blue-700",
        cancelled: "bg-red-100 text-red-700"
    };
    
    const statusLabels: any = {
        completed: "Hoàn thành",
        pending: "Chờ duyệt",
        processing: "Đang làm",
        cancelled: "Đã hủy"
    };

    return (
        <tr className="hover:bg-gray-50 transition-colors group">
            <td className="px-6 py-4 font-medium text-[#c49b63]">{id}</td>
            <td className="px-6 py-4 font-medium text-gray-800">{customer}</td>
            <td className="px-6 py-4 text-gray-500 truncate max-w-[200px]">{items}</td>
            <td className="px-6 py-4 font-semibold text-gray-800">{total}</td>
            <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status]}`}>
                    {statusLabels[status]}
                </span>
            </td>
            <td className="px-6 py-4 text-gray-400 text-xs">{time}</td>
        </tr>
    )
}