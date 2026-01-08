import { db } from "@/lib/db";
import { User, MoreHorizontal, Shield, ShieldAlert, Star } from "lucide-react";

// Hàm helper tính cấp độ VIP
const getVipTier = (points: number) => {
  if (points >= 1000) return { name: "DIAMOND", color: "bg-purple-100 text-purple-700", icon: "💎" };
  if (points >= 500) return { name: "GOLD", color: "bg-yellow-100 text-yellow-700", icon: "🥇" };
  if (points >= 200) return { name: "SILVER", color: "bg-gray-100 text-gray-700", icon: "🥈" };
  return { name: "MEMBER", color: "bg-blue-50 text-blue-600", icon: "☕" };
};

export default async function UsersPage() {
  // Lấy danh sách user từ DB, sắp xếp theo ngày tạo mới nhất
  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Danh sách Người dùng</h2>
        <div className="text-sm text-gray-500">Tổng: {users.length} tài khoản</div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-medium text-gray-500">Khách hàng</th>
              <th className="p-4 font-medium text-gray-500">Vai trò</th>
              <th className="p-4 font-medium text-gray-500">Điểm tích lũy (VIP)</th>
              <th className="p-4 font-medium text-gray-500">Ngày tham gia</th>
              <th className="p-4 font-medium text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((user) => {
              const tier = getVipTier(user.loyaltyPoints);
              
              return (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  {/* Cột 1: Avatar & Tên */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{user.name || "Chưa đặt tên"}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Cột 2: Role */}
                  <td className="p-4">
                    {user.role === "ADMIN" ? (
                      <span className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-bold w-fit">
                        <ShieldAlert size={14} /> ADMIN
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-gray-600 bg-gray-100 px-2 py-1 rounded text-xs font-medium w-fit">
                        <User size={14} /> CUSTOMER
                      </span>
                    )}
                  </td>

                  {/* Cột 3: Điểm VIP & Rank */}
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-800">{user.loyaltyPoints} pts</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${tier.color}`}>
                                {tier.icon} {tier.name}
                            </span>
                        </div>
                        {/* Thanh tiến độ đơn giản */}
                        <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-1">
                             <div 
                                className="h-1.5 bg-amber-500 rounded-full" 
                                style={{ width: `${Math.min((user.loyaltyPoints % 500) / 5, 100)}%` }}
                             ></div>
                        </div>
                    </div>
                  </td>

                  {/* Cột 4: Ngày tham gia */}
                  <td className="p-4 text-gray-500 text-sm">
                    {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                  </td>

                  {/* Cột 5: Hành động */}
                  <td className="p-4 text-right">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}