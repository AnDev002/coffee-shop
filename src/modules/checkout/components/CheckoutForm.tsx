// src/modules/checkout/components/CheckoutForm.tsx
'use client'

import { useCheckoutStore } from '@/store/useCheckoutStore';
import { InputGroup } from '@/components/ui/InputGroup';
import { useState, useEffect } from 'react';

// Interfaces cho API Địa chính
interface LocationItem {
  id: string;
  name: string;
  full_name?: string;
}

export const CheckoutForm = () => {
  const { 
    buyerInfo, setBuyerInfo,
    receiverInfo, setReceiverInfo,
    deliveryMethod, setDeliveryMethod 
  } = useCheckoutStore();

  const [isGift, setIsGift] = useState(false);

  // --- STATE CHO ĐỊA CHỈ ---
  const [provinces, setProvinces] = useState<LocationItem[]>([]);
  const [districts, setDistricts] = useState<LocationItem[]>([]);
  const [wards, setWards] = useState<LocationItem[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");
  const [specificAddress, setSpecificAddress] = useState<string>(""); // Số nhà, tên đường

  // 1. Fetch Tỉnh/Thành phố khi load trang
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch('https://esgoo.net/api-tinhthanh/1/0.htm');
        const data = await response.json();
        if (data.error === 0) {
          setProvinces(data.data);
        }
      } catch (error) {
        console.error("Lỗi fetch tỉnh thành:", error);
      }
    };
    fetchProvinces();
  }, []);

  // 2. Fetch Quận/Huyện khi chọn Tỉnh
  useEffect(() => {
    if (!selectedProvince) {
      setDistricts([]);
      setWards([]);
      return;
    }
    const fetchDistricts = async () => {
      try {
        const response = await fetch(`https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`);
        const data = await response.json();
        if (data.error === 0) {
          setDistricts(data.data);
          setSelectedDistrict(""); // Reset huyện
          setSelectedWard("");     // Reset xã
        }
      } catch (error) {
        console.error("Lỗi fetch quận huyện:", error);
      }
    };
    fetchDistricts();
  }, [selectedProvince]);

  // 3. Fetch Phường/Xã khi chọn Quận
  useEffect(() => {
    if (!selectedDistrict) {
      setWards([]);
      return;
    }
    const fetchWards = async () => {
      try {
        const response = await fetch(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`);
        const data = await response.json();
        if (data.error === 0) {
          setWards(data.data);
          setSelectedWard(""); // Reset xã
        }
      } catch (error) {
        console.error("Lỗi fetch phường xã:", error);
      }
    };
    fetchWards();
  }, [selectedDistrict]);

  // 4. Cập nhật Full Address vào Store mỗi khi các trường thay đổi
  useEffect(() => {
    if (deliveryMethod === 'delivery') {
      const provinceName = provinces.find(p => p.id === selectedProvince)?.name || "";
      const districtName = districts.find(d => d.id === selectedDistrict)?.name || "";
      const wardName = wards.find(w => w.id === selectedWard)?.name || "";
      
      // Format: Số 10, Đường ABC, Phường X, Quận Y, Thành phố Z
      const fullParts = [specificAddress, wardName, districtName, provinceName].filter(Boolean);
      const fullAddress = fullParts.join(", ");

      // Chỉ update nếu địa chỉ thực sự thay đổi để tránh loop
      if (fullAddress !== receiverInfo.address) {
        setReceiverInfo({
          ...receiverInfo,
          address: fullAddress
        });
      }
    }
  }, [specificAddress, selectedProvince, selectedDistrict, selectedWard, deliveryMethod]); // Xóa receiverInfo khỏi dep

  // Đồng bộ thông tin: Nếu không phải quà tặng, Receiver = Buyer
  useEffect(() => {
    if (!isGift) {
      setReceiverInfo({
        ...receiverInfo,
        name: buyerInfo.name,
        phone: buyerInfo.phone,
        // Giữ nguyên address hiện tại do logic trên quản lý
      });
    }
  }, [buyerInfo, isGift]); // Bỏ deliveryMethod để tránh conflict

  const handleBuyerChange = (field: string, value: string) => 
    setBuyerInfo({ ...buyerInfo, [field]: value });

  const handleReceiverChange = (field: string, value: string) => 
    setReceiverInfo({ ...receiverInfo, [field]: value });

  // CSS class chung cho thẻ Select để giống InputGroup
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
            onClick={() => setDeliveryMethod('pickup')}
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
             {/* Checkbox Gửi tặng */}
             <div className="flex items-center gap-3 bg-pink-50/50 p-3 rounded-lg border border-pink-100 w-fit">
                <input 
                  type="checkbox" 
                  id="gift-check"
                  className="accent-pink-500 w-4 h-4 cursor-pointer"
                  checked={isGift}
                  onChange={(e) => setIsGift(e.target.checked)}
                />
                <label htmlFor="gift-check" className="cursor-pointer text-sm font-medium text-gray-700">
                  Gửi tặng người thân/bạn bè?
                </label>
            </div>

            {/* Form Người nhận (chỉ hiện khi Gift = true) */}
            {isGift && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <InputGroup 
                  label="Tên người nhận" 
                  placeholder="Họ tên người nhận"
                  value={receiverInfo.name}
                  onChange={(e: any) => handleReceiverChange('name', e.target.value)}
                />
                <InputGroup 
                  label="SĐT người nhận" 
                  placeholder="SĐT người nhận"
                  value={receiverInfo.phone}
                  onChange={(e: any) => handleReceiverChange('phone', e.target.value)}
                />
              </div>
            )}

            {/* --- KHỐI ĐỊA CHỈ FETCH API --- */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">Địa chỉ giao hàng</label>
              
              {/* Grid 3 cột cho Tỉnh - Huyện - Xã */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Tỉnh/Thành */}
                <div className="relative">
                  <select 
                    value={selectedProvince}
                    onChange={(e) => setSelectedProvince(e.target.value)}
                    className={selectClassName}
                  >
                    <option value="">Chọn Tỉnh/Thành</option>
                    {provinces.map((prov) => (
                      <option key={prov.id} value={prov.id}>{prov.name}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                     <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor"><path d="M1 1L5 5L9 1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>

                {/* Quận/Huyện */}
                <div className="relative">
                  <select 
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className={selectClassName}
                    disabled={!selectedProvince}
                  >
                    <option value="">Chọn Quận/Huyện</option>
                    {districts.map((dist) => (
                      <option key={dist.id} value={dist.id}>{dist.name}</option>
                    ))}
                  </select>
                   <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                     <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor"><path d="M1 1L5 5L9 1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>

                {/* Phường/Xã */}
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
                   <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                     <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor"><path d="M1 1L5 5L9 1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </div>

              {/* Input địa chỉ chi tiết */}
              <InputGroup 
                label="" // Để trống label vì đã có header group ở trên
                placeholder="Số nhà, tên đường, tòa nhà..."
                value={specificAddress}
                onChange={(e: any) => setSpecificAddress(e.target.value)}
              />
              
              {/* Hiển thị preview địa chỉ */}
              {receiverInfo.address && (
                <p className="text-xs text-gray-500 italic bg-gray-50 p-2 rounded border border-gray-100">
                  Giao đến: {receiverInfo.address}
                </p>
              )}
            </div>
            {/* --- KẾT THÚC KHỐI ĐỊA CHỈ --- */}

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
            <p className="text-gray-600 text-sm">123 Đường ABC, Quận XYZ, TP.HCM</p>
            <p className="text-gray-500 text-xs mt-2 italic">* Vui lòng đến nhận hàng sau khi có thông báo xác nhận đơn hàng.</p>
          </div>
        )}
      </section>

      {/* 3. Thanh toán */}
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
    </div>
  );
};