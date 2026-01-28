// src/modules/checkout/components/CheckoutForm.tsx
'use client'

import { useCheckoutStore } from '@/store/useCheckoutStore';
import { InputGroup } from '@/components/ui/InputGroup';
import { useState, useEffect, useMemo } from 'react';

interface LocationItem {
  id: string;
  name: string;
  full_name?: string;
}

export const CheckoutForm = () => {
  const { 
    buyerInfo, setBuyerInfo,
    receiverInfo, setReceiverInfo,
    deliveryMethod, setDeliveryMethod,
    note, setNote
  } = useCheckoutStore();

  const [isGift, setIsGift] = useState(false);

  // --- STATE CHO ĐỊA CHỈ ---
  const [provinces, setProvinces] = useState<LocationItem[]>([]);
  const [districts, setDistricts] = useState<LocationItem[]>([]);
  const [wards, setWards] = useState<LocationItem[]>([]);

  // Init state từ store (nếu có) để tránh mất địa chỉ khi re-render
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");
  const [specificAddress, setSpecificAddress] = useState<string>("");

  // 1. Fetch Tỉnh/Thành phố
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch('https://esgoo.net/api-tinhthanh/1/0.htm');
        const data = await response.json();
        if (data.error === 0) setProvinces(data.data);
      } catch (error) {
        console.error("Lỗi fetch tỉnh thành:", error);
      }
    };
    fetchProvinces();
  }, []);

  // 2. Fetch Quận/Huyện
  useEffect(() => {
    if (!selectedProvince) {
      setDistricts([]);
      return;
    }
    const fetchDistricts = async () => {
      try {
        const response = await fetch(`https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`);
        const data = await response.json();
        if (data.error === 0) setDistricts(data.data);
      } catch (error) {
        console.error("Lỗi fetch quận huyện:", error);
      }
    };
    fetchDistricts();
  }, [selectedProvince]);

  // 3. Fetch Phường/Xã
  useEffect(() => {
    if (!selectedDistrict) {
      setWards([]);
      return;
    }
    const fetchWards = async () => {
      try {
        const response = await fetch(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`);
        const data = await response.json();
        if (data.error === 0) setWards(data.data);
      } catch (error) {
        console.error("Lỗi fetch phường xã:", error);
      }
    };
    fetchWards();
  }, [selectedDistrict]);

  // 4. FIX: Cập nhật Full Address
  // Chỉ tính toán khi có đủ dữ liệu, tránh return chuỗi rỗng làm mất địa chỉ cũ
  const fullAddressString = useMemo(() => {
     if (deliveryMethod !== 'delivery') return "Nhận tại quán";

     const provinceName = provinces.find(p => p.id === selectedProvince)?.name || "";
     const districtName = districts.find(d => d.id === selectedDistrict)?.name || "";
     const wardName = wards.find(w => w.id === selectedWard)?.name || "";
      
     // Chỉ update khi ít nhất có Tỉnh hoặc Huyện được chọn
     if (!provinceName && !specificAddress) return null; 

     const fullParts = [specificAddress, wardName, districtName, provinceName].filter(Boolean);
     return fullParts.length > 0 ? fullParts.join(", ") : "";
  }, [specificAddress, selectedProvince, selectedDistrict, selectedWard, provinces, districts, wards, deliveryMethod]);

  // Effect update Store Address
  useEffect(() => {
    // Chỉ update khi giá trị HỢP LỆ (khác null/rỗng) và KHÁC giá trị hiện tại
    if (fullAddressString && fullAddressString !== receiverInfo.address) {
       // Sử dụng callback prev để tránh Stale Closure (Lỗi ghi đè dữ liệu cũ)
       setReceiverInfo({
           ...useCheckoutStore.getState().receiverInfo, // Lấy state mới nhất trực tiếp
           address: fullAddressString
       });
    }
  }, [fullAddressString]); 

  // 5. FIX: Đồng bộ thông tin Buyer -> Receiver
  useEffect(() => {
    if (!isGift) {
      // Dùng functional update để đảm bảo không ghi đè address bằng address cũ
      setReceiverInfo({
          ...useCheckoutStore.getState().receiverInfo, // Luôn merge với state mới nhất
          name: buyerInfo.name,
          phone: buyerInfo.phone,
      });
    }
  }, [buyerInfo.name, buyerInfo.phone, isGift]);

  const handleBuyerChange = (field: string, value: string) => 
    setBuyerInfo({ ...buyerInfo, [field]: value });

  const handleReceiverChange = (field: string, value: string) => 
    setReceiverInfo({ ...useCheckoutStore.getState().receiverInfo, [field]: value });

  const selectClassName = "w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all appearance-none text-sm text-gray-700";

  return (
    <div className="space-y-6">
      {/* 1. Thông tin liên hệ */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="bg-brand-orange/10 text-brand-orange w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
          Thông tin liên hệ
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputGroup 
            label="Họ và tên" 
            placeholder="Nhập họ tên của bạn"
            value={buyerInfo.name}
            onChange={(e: any) => handleBuyerChange('name', e.target.value)}
          />
          <InputGroup 
            label="Số điện thoại" 
            placeholder="Số điện thoại liên lạc"
            value={buyerInfo.phone}
            onChange={(e: any) => handleBuyerChange('phone', e.target.value)}
          />
        </div>
      </section>

      {/* 2. Phương thức nhận hàng */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="bg-brand-orange/10 text-brand-orange w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
          Phương thức nhận hàng
        </h3>

        {/* Tabs lựa chọn */}
        <div className="flex p-1 bg-gray-100 rounded-lg mb-6 w-fit">
          <button
            onClick={() => setDeliveryMethod('delivery')}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
              deliveryMethod === 'delivery' 
                ? 'bg-white text-brand-orange shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Giao tận nơi
          </button>
          <button
            onClick={() => {
                setDeliveryMethod('pickup'); 
                // Khi chọn pickup, set cứng địa chỉ là Nhận tại quán
                setReceiverInfo({...useCheckoutStore.getState().receiverInfo, address: "Nhận tại quán"});
            }}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
              deliveryMethod === 'pickup' 
                ? 'bg-white text-brand-orange shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Đến lấy tại quán
          </button>
        </div>

        {/* Nội dung thay đổi theo Tab */}
        {deliveryMethod === 'delivery' ? (
          <div className="space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* --- KHỐI ĐỊA CHỈ FETCH API --- */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">Địa chỉ giao hàng</label>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="relative">
                  <select 
                    value={selectedProvince}
                    onChange={(e) => {
                        setSelectedProvince(e.target.value);
                        setSelectedDistrict(""); // Reset khi đổi tỉnh
                        setSelectedWard("");
                    }}
                    className={selectClassName}
                  >
                    <option value="">Chọn Tỉnh/Thành</option>
                    {provinces.map((prov) => (
                      <option key={prov.id} value={prov.id}>{prov.name}</option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <select 
                    value={selectedDistrict}
                    onChange={(e) => {
                        setSelectedDistrict(e.target.value);
                        setSelectedWard(""); // Reset khi đổi huyện
                    }}
                    className={selectClassName}
                    disabled={!selectedProvince}
                  >
                    <option value="">Chọn Quận/Huyện</option>
                    {districts.map((dist) => (
                      <option key={dist.id} value={dist.id}>{dist.name}</option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                   <select 
                    value={selectedWard}
                    onChange={(e) => setSelectedWard(e.target.value)}
                    className={selectClassName}
                    disabled={!selectedDistrict}
                  >
                    <option value="">Chọn Phường/Xã</option>
                    {wards.map((ward) => (
                      <option key={ward.id} value={ward.id}>{ward.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <InputGroup 
                label="" 
                placeholder="Số nhà, tên đường, tòa nhà..."
                value={specificAddress}
                onChange={(e: any) => setSpecificAddress(e.target.value)}
              />
              
              {receiverInfo.address && receiverInfo.address !== "Nhận tại quán" && (
                <p className="text-xs text-gray-500 italic bg-gray-50 p-2 rounded border border-gray-100">
                  Giao đến: {receiverInfo.address}
                </p>
              )}
            </div>

            {isGift && (
              <InputGroup 
                label="Lời nhắn thiệp chúc mừng" 
                placeholder="Nhập lời chúc muốn gửi kèm..."
                value={receiverInfo.message || ''}
                onChange={(e: any) => handleReceiverChange('message', e.target.value)}
              />
            )}
          </div>
        ) : (
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
            <h4 className="font-semibold text-blue-800 mb-1">Địa chỉ cửa hàng:</h4>
            <p className="text-gray-600 text-sm">198 Phố ABC, Hà Nội</p>
            <p className="text-gray-500 text-xs mt-2 italic">* Vui lòng đến nhận hàng sau khi có thông báo xác nhận đơn hàng.</p>
          </div>
        )}
      </section>

      {/* 3. Thanh toán (Giữ nguyên) */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="bg-brand-orange/10 text-brand-orange w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
          Thanh toán
        </h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-4 border border-brand-orange bg-orange-50 rounded-lg cursor-pointer transition-all">
            <input type="radio" name="payment" defaultChecked className="accent-brand-orange w-5 h-5" />
            <span className="font-medium text-gray-700">Thanh toán khi nhận hàng (COD)</span>
          </label>
        </div>
      </section>

      {/* Ghi chú */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
             📝 Ghi chú cho đơn hàng
          </h3>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ví dụ: Ít đường, giao vào giờ hành chính, gọi trước khi giao..."
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#c49b63] outline-none min-h-[80px]"
          />
       </div>
    </div>
  );
};