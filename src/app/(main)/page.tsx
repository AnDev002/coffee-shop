// src/app/(main)/page.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image"; // Dùng Image tối ưu của Next.js
import { ClipboardList, Truck, Coffee, Search, Clock, Phone } from "lucide-react";
import { FeaturesSection } from "@/modules/home/components/FeaturesSection";
import { getBestSellingProducts } from "@/actions/product"; // Import API lấy sản phẩm bán chạy
import { getMenuData } from "@/actions/menu"; // Import API lấy menu
import { ProductDetail } from "@/types/product";

// Helper: Format tiền tệ
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// --- [COMPONENT CON: PRODUCT CARD] ---
// Đã cập nhật để nhận dữ liệu thật và có Link
const ProductCard = ({ product }: { product: ProductDetail }) => (
  <div className="flex flex-col items-center group">
    <Link href={`/products/${product.id}`} className="overflow-hidden mb-6 block w-[255px] h-[200px] relative">
      {product.imageUrl ? (
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}
    </Link>
    <div className="text-center flex flex-col items-center gap-4">
      <Link href={`/products/${product.id}`}>
        <h3 className="text-white text-lg font-josefin uppercase hover:text-[#c49b63] transition-colors cursor-pointer">
          {product.name}
        </h3>
      </Link>
      <p className="text-gray-400 font-poppins font-light text-sm w-[80%] line-clamp-2 min-h-[40px]">
        {product.description || "Hương vị cà phê đậm đà khó quên."}
      </p>
      <div className="text-white font-poppins">{formatCurrency(product.basePrice)}</div>
      
      <Link href={`/products/${product.id}`}>
        <button className="border border-[#c49b63] text-[#c49b63] px-4 py-2 text-xs uppercase hover:bg-[#c49b63] hover:text-white transition-colors">
          Xem
        </button>
      </Link>
    </div>
  </div>
);

// --- [COMPONENT CON: MENU CARD] ---
// Đã cập nhật để nhận dữ liệu thật
const MenuCard = ({ product }: { product: ProductDetail }) => (
    <div className="flex gap-4 items-center w-full max-w-xl group">
        <Link href={`/products/${product.id}`} className="w-16 h-16 rounded-full overflow-hidden shrink-0 border border-[#c49b63]/30 relative block">
             {product.imageUrl ? (
                <Image 
                    src={product.imageUrl} 
                    alt={product.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500" 
                />
             ) : (
                <div className="w-full h-full bg-gray-800" />
             )}
        </Link>
        <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
                <Link href={`/products/${product.id}`}>
                    <h4 className="text-white font-josefin uppercase text-lg hover:text-[#c49b63] transition-colors cursor-pointer">
                        {product.name}
                    </h4>
                </Link>
                <span className="text-[#c49b63] font-josefin text-lg whitespace-nowrap ml-2">
                    {formatCurrency(product.basePrice)}
                </span>
            </div>
            <p className="text-gray-500 font-poppins font-light text-sm line-clamp-2">
                {product.description || "Món ngon được chế biến từ nguyên liệu tươi sạch."}
            </p>
        </div>
    </div>
);

// --- [MAIN PAGE COMPONENT] ---
export default async function HomePage() {
  // 1. Fetch dữ liệu thật từ Server
  // - Lấy 4 sản phẩm bán chạy nhất
  // - Lấy danh mục menu để hiển thị ở phần dưới
  const [bestSellers, menuCategories] = await Promise.all([
    getBestSellingProducts(4),
    getMenuData()
  ]);

  // Flatten danh sách sản phẩm từ các category để hiển thị ở phần "Our Menu"
  // Lấy tối đa 8 sản phẩm đầu tiên tìm thấy trong các category
  const menuProducts: ProductDetail[] = [];
  menuCategories.forEach(cat => {
      cat.products.forEach(prod => {
          if (menuProducts.length < 8) {
              // Convert MenuProduct sang ProductDetail (hoặc dùng type chung nếu khớp)
              // Ở đây ta map tạm thời để khớp props
              menuProducts.push(prod as unknown as ProductDetail);
          }
      });
  });

  return (
    <main className="w-full bg-[#000000] overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative h-[750px] w-full bg-[url('/assets/ImageAsset20.png')] bg-cover bg-center bg-fixed">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto h-full flex flex-col justify-center items-center text-center px-4 z-10 gap-6 pt-32">
          <span className="font-great-vibes text-[#c49b63] text-3xl md:text-5xl">Xin chào,</span>
          <h1 className="text-white font-josefin uppercase text-4xl md:text-6xl font-bold tracking-wider leading-tight">
            Trải nghiệm dùng thử cà phê tuyệt vời
          </h1>
          <p className="text-white/80 font-poppins font-light max-w-2xl text-base md:text-lg mb-8">
            Hương vị cà phê đích thực, khơi dậy mọi giác quan của bạn.
          </p>
          <div className="flex gap-4">
            <Link href="/menu">
                <button className="bg-[#c49b63] text-white px-8 py-4 uppercase text-sm tracking-widest font-poppins hover:bg-[#b08b55] transition-colors">
                Đặt hàng ngay
                </button>
            </Link>
            <Link href="/menu">
                <button className="border border-white text-white px-8 py-4 uppercase text-sm tracking-widest font-poppins hover:bg-white hover:text-black transition-colors">
                Xem thực đơn
                </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Info Bar (Below Hero) */}
      <section className="bg-[#120f0f] w-full py-8 md:py-0">
          <div className="container mx-auto max-w-[1140px] flex flex-col md:flex-row">
              <div className="flex-1 bg-black p-8 md:p-12 flex flex-col gap-6 items-start justify-center border-r border-white/5">
                  <div className="flex items-start gap-4">
                      <Phone className="text-[#c49b63] mt-1" />
                      <div>
                          <h4 className="text-white font-poppins text-lg">(+84) 91.222.2222</h4>
                          <p className="text-gray-500 font-poppins font-light text-sm">Liên hệ ngay để đặt bàn.</p>
                      </div>
                  </div>
              </div>
               <div className="flex-1 bg-[#c49b63] p-8 md:p-12 flex flex-col gap-6 items-start justify-center">
                  <div className="flex items-start gap-4">
                      <Truck className="text-white mt-1" />
                      <div>
                          <h4 className="text-white font-poppins text-lg">198 Phố ABC</h4>
                          <p className="text-white/80 font-poppins font-light text-sm">198 Phố ABC, Quận XYZ, Thành phố Hà Nội, Việt Nam</p>
                      </div>
                  </div>
              </div>
               <div className="flex-1 bg-[#120f0f] p-8 md:p-12 flex flex-col gap-6 items-start justify-center border-l border-white/5">
                  <div className="flex items-start gap-4">
                      <Clock className="text-[#c49b63] mt-1" />
                      <div>
                          <h4 className="text-white font-poppins text-lg">Mở cửa thứ 2 - thứ 6</h4>
                          <p className="text-gray-500 font-poppins font-light text-sm">8:00 - 21:00</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 relative">
          <div className="container mx-auto max-w-[1140px] px-4">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                  <div className="w-full md:w-1/2">
                       <img src="/assets/ImageAsset16.png" alt="Our Story" className="w-full h-auto object-cover" />
                  </div>
                  <div className="w-full md:w-1/2 flex flex-col gap-6">
                      <span className="font-great-vibes text-[#c49b63] text-4xl">Khám phá</span>
                      <h2 className="text-white font-josefin uppercase text-4xl font-bold">Câu chuyện của chúng tôi</h2>
                      <p className="text-gray-400 font-poppins font-light leading-relaxed">
                          Chúng tôi bắt đầu hành trình từ niềm đam mê với những hạt cà phê nguyên bản. 
                          Mỗi tách cà phê được phục vụ là kết tinh của sự tận tâm và kỹ thuật rang xay điêu luyện.
                      </p>
                      <p className="text-gray-400 font-poppins font-light leading-relaxed">
                          Không gian ấm cúng, hương vị tuyệt hảo và sự phục vụ chu đáo là những gì chúng tôi cam kết mang lại cho bạn.
                      </p>
                  </div>
              </div>
          </div>
      </section>

      {/* Features/Stats Section - Giữ nguyên component bạn đã tách */}
      <FeaturesSection />

      {/* [UPDATED] Menu / Best Sellers Section - Dữ liệu thật */}
      <section className="py-24 bg-black">
         <div className="container mx-auto max-w-[1140px] px-4 flex flex-col items-center">
             <div className="text-center mb-16">
                 <span className="font-great-vibes text-[#c49b63] text-4xl block mb-2">Khám phá</span>
                 <h2 className="text-white font-josefin uppercase text-4xl font-bold">Cửa hàng bán cà phê chất lượng</h2>
                 <p className="text-gray-400 font-poppins font-light mt-4 max-w-xl mx-auto">
                     Những sản phẩm được yêu thích nhất tại cửa hàng, mang đậm dấu ấn riêng biệt.
                 </p>
             </div>
             
             {/* Render Grid sản phẩm thật */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                 {bestSellers.length > 0 ? (
                    bestSellers.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                 ) : (
                    <p className="text-gray-500 col-span-4">Đang cập nhật sản phẩm bán chạy...</p>
                 )}
             </div>
         </div>
      </section>

      {/* [UPDATED] Menu List Section - Dữ liệu thật */}
      <section className="py-24 bg-[#120f0f]">
          <div className="container mx-auto max-w-[1140px] px-4 flex flex-col items-center">
             <div className="text-center mb-16">
                 <span className="font-great-vibes text-[#c49b63] text-4xl block mb-2">Khám phá</span>
                 <h2 className="text-white font-josefin uppercase text-4xl font-bold">Thực đơn của chúng tôi</h2>
                 <p className="text-gray-400 font-poppins font-light mt-4 max-w-xl mx-auto">
                     Thực đơn đa dạng, phong phú, đáp ứng mọi sở thích thưởng thức.
                 </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 w-full">
                {menuProducts.length > 0 ? (
                    menuProducts.map((product) => (
                         <MenuCard key={product.id} product={product} />
                    ))
                ) : (
                    <p className="text-gray-500 col-span-2 text-center">Đang cập nhật thực đơn...</p>
                )}
             </div>
             
             <div className="mt-12">
                <Link href="/menu">
                    <button className="border border-[#c49b63] text-[#c49b63] px-8 py-3 uppercase text-sm hover:bg-[#c49b63] hover:text-white transition-colors">
                        View Full Menu
                    </button>
                </Link>
             </div>
          </div>
      </section>

      {/* Gallery */}
      <section className="grid grid-cols-2 md:grid-cols-4">
           {[7, 6, 5, 4].map((i) => (
             <div key={i} className="h-[250px] md:h-[350px] group relative overflow-hidden">
                <img 
                    src={`/assets/ImageAsset${i}.png`} 
                    alt="Gallery" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Search className="text-white w-8 h-8" />
                </div>
             </div>
           ))}
      </section>

    </main>
  );
}