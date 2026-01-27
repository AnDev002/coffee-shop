// src/app/(main)/thank-you/page.tsx
'use client'

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

const ThankYouContent = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || '---';
  // Giả sử có thể lấy tên khách hàng từ store hoặc params nếu muốn personalize hơn
  // const customerName = searchParams.get('name') || 'bạn';

  return (
    // Sử dụng nền màu kem nhẹ và pattern hạt cafe mờ (nếu có) để tạo không gian quán
    <div className="min-h-[85vh] flex items-center justify-center bg-[#FAF7F2] px-4 py-12 relative overflow-hidden">
      {/* Decorative Background Elements (Optional - Họa tiết trang trí mờ) */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#8D6E63]/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <div className="bg-white relative z-10 p-8 md:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] max-w-lg w-full text-center border border-[#EFEBE9] animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* 1. Hero Image / Icon - Thay dấu tick bằng hình ảnh pha chế */}
        <div className="mb-8 flex justify-center">
           {/* Sử dụng một SVG inline hoặc Image component để minh họa việc đang chuẩn bị cafe */}
           <div className="w-32 h-32 relative">
             {/* Đây là một placeholder SVG minh họa cafe đang pha. 
                 Bạn có thể thay bằng thẻ <Image> tới file ảnh thật của quán */}
             <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-brand-orange">
                <path d="M12 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M16 4V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M8 4V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M4 10C4 14.4183 7.58172 18 12 18C14.2864 18 16.3508 17.0392 17.809 15.4695C19.5399 16.7768 22.3583 17.1213 23.3624 14.6721C24.3485 12.2672 22.147 10.6136 20.4904 10.2178C20.1789 10.1435 19.9396 10.0787 19.7729 10.0286C19.0137 5.4611 15.4742 2 11 2H4V10Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M4 18L3.0464 21.2118C2.81883 21.9783 3.3901 22.75 4.18943 22.75H19.8106C20.6099 22.75 21.1812 21.9783 20.9536 21.2118L20 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path opacity="0.3" d="M7.5 13.5C7.5 13.5 9 15 12 15C15 15 16.5 13.5 16.5 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
           </div>
        </div>

        {/* 2. Main Heading & Subtext */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#3E2723] mb-4 tracking-tight leading-tight">
          Tuyệt vời! <br/>Đơn hàng đã được xác nhận.
        </h1>
        <p className="text-[#5D4037] text-lg mb-10 leading-relaxed">
          Barista của chúng tôi đang chuẩn bị những món ngon nhất cho bạn. Vui lòng để ý điện thoại nhé!
        </p>

        {/* 3. Order Receipt Card - Thiết kế giống tờ hóa đơn */}
        <div className="bg-[#FAF7F2] rounded-2xl p-6 mb-10 border-2 border-dashed border-[#D7CCC8] relative mx-4 shadow-sm">
          {/* Decorative corner */}
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-white border-t-2 border-l-2 border-[#D7CCC8] rounded-tl-md"></div>
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-white border-t-2 border-r-2 border-[#D7CCC8] rounded-tr-md"></div>

          <div className="flex flex-col items-center gap-2">
             <span className="text-sm font-semibold text-[#8D6E63] uppercase tracking-wider">Mã đơn hàng của bạn</span>
             <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-brand-orange">
                  <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.339-.102-2.65-.285-3.985a.75.75 0 0 0-.722-.515 11.209 11.209 0 0 1-7.877-3.08ZM12 10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm-3 4.125a3 3 0 1 1 6 0 1.5 1.5 0 0 1-3 0Zm0 0a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z" clipRule="evenodd" />
                </svg>
                <span className="text-3xl font-mono font-bold text-[#3E2723] tracking-widest select-all">
                  {orderId}
                </span>
             </div>
             <p className="text-xs text-[#8D6E63] mt-2 italic">
               (Bạn có thể dùng mã này để tra cứu tình trạng đơn hàng)
             </p>
          </div>
        </div>

        {/* 4. Actions Buttons */}
        <div className="flex flex-col gap-4 px-4">
          <Link 
            href="/menu" // Chuyển hướng về trang Menu thay vì trang chủ
            className="w-full py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-black transition-all shadow-lg shadow-orange-200/50 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
          >
            <span>Tiếp tục xem Menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </Link>
          
          <Link 
            href="/" 
            className="w-full py-4 bg-white text-[#5D4037] border-2 border-[#EFEBE9] rounded-xl font-semibold hover:bg-[#FAF7F2] hover:border-[#D7CCC8] transition-colors"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

// Wrap Suspense để tránh lỗi build khi dùng useSearchParams trong Next.js App Router
const ThankYouPage = () => {
  return (
    // Fallback loading đơn giản, cũng nên style lại một chút cho đồng bộ
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF7F2] gap-4">
         <svg className="animate-spin h-10 w-10 text-brand-orange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-[#5D4037] font-medium">Đang tải thông tin...</span>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
};

export default ThankYouPage;