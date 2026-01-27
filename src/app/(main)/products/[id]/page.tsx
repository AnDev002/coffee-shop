// src/app/(main)/products/[id]/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCartActions } from '@/store/useCartStore'; 
import { ProductOptionSelector } from '@/components/product/ProductOptionSelector';
import { ProductDetail } from '@/types/product';
import { SelectedOption } from '@/types/cart';
import { getProductById } from '@/actions/product'; 
import { toast } from 'react-hot-toast';
// [FIX 1] Xóa import isLoggedIn từ auth.client, thay bằng useSession của next-auth
import { useSession } from "next-auth/react"; 

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCartActions();
  
  // [FIX 2] Lấy session data từ hook. 
  // status có thể là "loading" | "authenticated" | "unauthenticated"
  const { data: session, status } = useSession(); 

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productId = Number(params.id);
        if (isNaN(productId)) {
           setLoading(false);
           return;
        }
        const data = await getProductById(productId);
        setProduct(data);
      } catch (error) {
        console.error("Failed to load product", error);
        toast.error("Không thể tải thông tin sản phẩm");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id]);

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const calculateTotalPrice = () => {
    if (!product) return 0;
    const optionsPrice = selectedOptions.reduce((acc, opt) => acc + opt.priceAdjustment, 0);
    return (product.basePrice + optionsPrice) * quantity;
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    // Validate Options
    if (!isValid) {
      toast.error("Vui lòng chọn đầy đủ các tùy chọn bắt buộc!");
      return;
    }
    
    // [FIX QUAN TRỌNG]: Bỏ đoạn kiểm tra session ở đây. 
    // Cho phép thêm vào giỏ hàng ngay cả khi chưa login (Guest).
    // Store sẽ tự xử lý việc lưu vào localStorage (nếu cấu hình persist) hoặc chỉ lưu state tạm.
    /* if (!session) {
        toast.error("Vui lòng đăng nhập để thêm vào giỏ");
        router.push('/login');
        return;
    } 
    */

    try {
      // Gọi action thêm vào giỏ
      await addToCart(product, quantity, selectedOptions);
      
      // Reset số lượng về 1 sau khi thêm thành công để UX tốt hơn
      setQuantity(1); 
      // Không cần setSelectedOptions([]) vì khách có thể muốn mua tiếp cấu hình đó
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra khi thêm vào giỏ");
    }
  };

  const handleBuyNow = async () => {
    if (!product) return;
    
    // 1. Validate Options
    if (!isValid) {
      toast.error("Vui lòng chọn đầy đủ các tùy chọn bắt buộc!");
      return;
    }

    if (!session) {
        toast.error("Vui lòng đăng nhập để tiếp tục thanh toán");
        // Redirect kèm callbackUrl để sau khi login quay lại đúng trang này
        router.push(`/login?callbackUrl=/products/${params.id}`); 
        return;
    }

    try {
      // 3. Add to Cart
      await addToCart(product, quantity, selectedOptions);
      
      // 4. Navigate
      router.push('/checkout'); 
    } catch (error) {
      console.error("Buy now error:", error);
      toast.error("Có lỗi xảy ra khi xử lý đơn hàng");
    }
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-[#c49b63]">Đang tải...</div>;
  if (!product) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Sản phẩm không tồn tại</div>;

  return (
    <section className="min-h-screen bg-black text-white pt-32 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <button 
            onClick={() => router.back()}
            className="mb-8 text-gray-400 hover:text-[#c49b63] transition-colors flex items-center gap-2"
        >
            ← Quay lại
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="relative group">
                <div className="aspect-square overflow-hidden rounded-lg border border-white/10">
                    <img 
                        src={product.imageUrl || "/placeholder-drink.jpg"} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </div>
            </div>

            <div className="flex flex-col">
                <h1 className="font-serif text-4xl text-[#c49b63] mb-2">{product.name}</h1>
                <div className="text-2xl font-bold mb-4 text-white">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.basePrice)}
                </div>
                <p className="text-gray-400 font-light leading-relaxed mb-6 border-b border-white/10 pb-6">
                    {product.description}
                </p>

                <ProductOptionSelector 
                    optionGroups={product.optionGroups}
                    onOptionsChange={(options, valid) => {
                        setSelectedOptions(options);
                        setIsValid(valid);
                    }}
                />

                <div className="mt-8 pt-8 border-t border-white/10 sticky bottom-0 bg-black/95 pb-4 lg:static lg:bg-transparent z-10">
                    <div className="flex flex-col gap-4">
                        {/* Control Row */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                            <div className="flex items-center border border-white/20 rounded-full h-12 bg-black w-fit">
                                <button 
                                    onClick={() => handleQuantityChange(-1)}
                                    className="w-12 h-full flex items-center justify-center hover:text-[#c49b63] text-xl"
                                >-</button>
                                <span className="w-8 text-center font-medium">{quantity}</span>
                                <button 
                                    onClick={() => handleQuantityChange(1)}
                                    className="w-12 h-full flex items-center justify-center hover:text-[#c49b63] text-xl"
                                >+</button>
                            </div>
                            
                            <div className="flex-1 flex gap-3">
                                <button 
                                    onClick={handleAddToCart}
                                    disabled={!isValid}
                                    className={`
                                        flex-1 h-12 px-6 border rounded-full uppercase tracking-wider font-semibold transition-all text-sm
                                        ${isValid 
                                            ? 'border-[#c49b63] text-[#c49b63] hover:bg-[#c49b63] hover:text-white' 
                                            : 'border-gray-700 text-gray-600 cursor-not-allowed'}
                                    `}
                                >
                                    Thêm vào giỏ
                                </button>
                                <button 
                                    onClick={handleBuyNow}
                                    disabled={!isValid}
                                    className={`
                                        flex-1 h-12 px-6 rounded-full uppercase tracking-wider font-semibold transition-all text-sm
                                        ${isValid 
                                            ? 'bg-[#c49b63] text-white hover:bg-[#b08b55] shadow-[0_0_15px_rgba(196,155,99,0.4)]' 
                                            : 'bg-gray-800 text-gray-500 cursor-not-allowed'}
                                    `}
                                >
                                    Mua ngay
                                </button>
                            </div>
                        </div>
                        
                        <div className="text-right text-gray-400 text-sm">
                            Tạm tính: <span className="text-[#c49b63] font-bold text-lg">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(calculateTotalPrice())}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}