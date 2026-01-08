import { db } from "@/lib/db";
import { Store, Save, Wifi, Phone, MapPin, Clock } from "lucide-react";

export default async function SettingsPage() {
  // Lấy thông tin cài đặt (nếu chưa có thì trả về null -> form trống)
  const settings = await db.storeSettings.findUnique({
    where: { id: "default" }
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Cài đặt Cửa hàng</h2>

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <form className="space-y-6">
          
          {/* Section 1: Thông tin chung */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Store size={20} /> Thông tin cơ bản
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Tên quán</label>
                    <input 
                        type="text" 
                        defaultValue={settings?.storeName || ""} 
                        className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-amber-500" 
                        placeholder="Ví dụ: Coffee House"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                        <Phone size={14} /> Hotline
                    </label>
                    <input 
                        type="text" 
                        defaultValue={settings?.hotline || ""} 
                        className="w-full border rounded-lg p-2.5" 
                        placeholder="0912..."
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                        <MapPin size={14} /> Địa chỉ
                    </label>
                    <input 
                        type="text" 
                        defaultValue={settings?.address || ""} 
                        className="w-full border rounded-lg p-2.5" 
                        placeholder="Số 1, Đại Cồ Việt..."
                    />
                </div>
            </div>
          </div>

          {/* Section 2: Vận hành */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Clock size={20} /> Thời gian & Tiện ích
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Giờ mở cửa</label>
                    <input type="time" defaultValue={settings?.openTime} className="w-full border rounded-lg p-2.5" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Giờ đóng cửa</label>
                    <input type="time" defaultValue={settings?.closeTime} className="w-full border rounded-lg p-2.5" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                        <Wifi size={14} /> Mật khẩu Wifi
                    </label>
                    <input 
                        type="text" 
                        defaultValue={settings?.wifiPass || ""} 
                        className="w-full border rounded-lg p-2.5" 
                        placeholder="Pass wifi cho khách"
                    />
                </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end">
            <button type="submit" className="flex items-center gap-2 bg-amber-700 text-white px-6 py-2.5 rounded-lg hover:bg-amber-800 transition shadow-sm font-medium">
                <Save size={18} /> Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}