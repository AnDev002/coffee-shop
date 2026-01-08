// src/app/(admin)/admin/orders/page.tsx
export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý đơn hàng</h2>
        <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border rounded-lg text-sm font-medium">Tất cả</button>
            <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">Chờ duyệt</button>
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">Đang pha</button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-medium text-gray-500">Mã đơn</th>
              <th className="p-4 font-medium text-gray-500">Khách hàng</th>
              <th className="p-4 font-medium text-gray-500">Món</th>
              <th className="p-4 font-medium text-gray-500">Tổng tiền</th>
              <th className="p-4 font-medium text-gray-500">Trạng thái</th>
              <th className="p-4 font-medium text-gray-500">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {/* Row mẫu */}
            <tr className="hover:bg-gray-50 text-black">
              <td className="p-4">#ORD-001</td>
              <td className="p-4">Nguyễn Văn A</td>
              <td className="p-4">2x Bạc Xỉu, 1x Croissant</td>
              <td className="p-4 font-bold">85.000đ</td>
              <td className="p-4">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                  Chờ duyệt
                </span>
              </td>
              <td className="p-4">
                <button className="text-blue-600 hover:underline text-sm mr-2">Duyệt</button>
                <button className="text-red-600 hover:underline text-sm">Hủy</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}