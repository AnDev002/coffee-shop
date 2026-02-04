"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link'; // [UX UPGRADE] Dùng Link thay vì router.back() cho breadcrumb
import { useCartActions } from '@/store/useCartStore'; 
import { ProductOptionSelector } from '@/components/product/ProductOptionSelector';
import { ProductDetail } from '@/types/product';
import { SelectedOption } from '@/types/cart';
import { getProductById } from '@/actions/product'; 
import { toast } from 'react-hot-toast';
import { useSession } from "next-auth/react"; 
import { ShoppingCart, ArrowLeft, Check, Loader2 } from 'lucide-react'; // [UX UPGRADE] Thêm icons

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCartActions();
  const { data: session } = useSession(); 

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false); // [UX UPGRADE] State loading cho nút Add
  const [isSuccess, setIsSuccess] = useState(false); // [UX UPGRADE] State success visual
  
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);
  const [isValid, setIsValid] = useState(false);

  // ... (Giữ nguyên useEffect fetchProduct) ...
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
    if (!isValid) {
      toast.error("Vui lòng chọn đầy đủ các tùy chọn bắt buộc!");
      return;
    }

    try {
      setAdding(true); // Bắt đầu hiệu ứng loading
      
      // Giả lập delay nhỏ để người dùng kịp nhìn thấy hiệu ứng (UX trick)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      await addToCart(product, quantity, selectedOptions);
      
      setAdding(false);
      setIsSuccess(true); // Hiện dấu tích
      setQuantity(1); 
      
      // Reset trạng thái nút sau 2 giây
      setTimeout(() => setIsSuccess(false), 2000);

      // Lưu ý: Store của bạn đã có logic mở MiniCart (isMiniCartOpen: true)
      // nên không cần toast quá to, MiniCart popup là feedback tốt nhất rồi.
      
    } catch (error) {
      console.error(error);
      setAdding(false);
      toast.error("Có lỗi xảy ra khi thêm vào giỏ");
    }
  };

  // ... (Giữ nguyên handleBuyNow) ...
  const handleBuyNow = async () => {
    if (!product) return;
    if (!isValid) {
        toast.error("Vui lòng chọn đầy đủ các tùy chọn bắt buộc!");
        return;
    }
    if (!session) {
        toast.error("Vui lòng đăng nhập để tiếp tục thanh toán");
        router.push(`/login?callbackUrl=/products/${params.id}`); 
        return;
    }
    try {
      await addToCart(product, quantity, selectedOptions);
      router.push('/checkout'); 
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-[#c49b63]">Đang tải...</div>;
  if (!product) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Sản phẩm không tồn tại</div>;

  return (
    <section className="min-h-screen bg-black text-white pt-28 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* [UX UPGRADE] Breadcrumbs thay vì nút Back đơn điệu */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/menu" className="hover:text-[#c49b63] transition-colors flex items-center gap-1">
                <ArrowLeft size={16} /> Thực đơn
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-[#c49b63] truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           {/* ... (Phần ảnh giữ nguyên) ... */}
            <div className="relative group">
                <div className="aspect-square overflow-hidden rounded-lg border border-white/10 bg-white/5">
                    <img 
                        src={product.imageUrl || "/placeholder-drink.jpg"} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </div>
            </div>

            <div className="flex flex-col">
                <h1 className="font-serif text-3xl md:text-4xl text-[#c49b63] mb-2">{product.name}</h1>
                <div className="text-2xl font-bold mb-4 text-white">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.basePrice)}
                </div>
                <p className="text-gray-400 font-light leading-relaxed mb-6 border-b border-white/10 pb-6">
                    {product.description}
                </p>

                {/* Option Selector giữ nguyên */}
                <ProductOptionSelector 
                    optionGroups={product.optionGroups}
                    onOptionsChange={(options, valid) => {
                        setSelectedOptions(options);
                        setIsValid(valid);
                    }}
                />

                {/* Action Bar */}
                <div className="mt-8 pt-6 border-t border-white/10 sticky bottom-0 bg-black/95 py-4 lg:static lg:bg-transparent z-20">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                            {/* Quantity Control */}
                            <div className="flex items-center border border-white/20 rounded-full h-12 bg-black w-fit px-2">
                                <button 
                                    onClick={() => handleQuantityChange(-1)}
                                    className="w-10 h-full flex items-center justify-center hover:text-[#c49b63] text-xl transition-colors"
                                >-</button>
                                <span className="w-8 text-center font-medium select-none">{quantity}</span>
                                <button 
                                    onClick={() => handleQuantityChange(1)}
                                    className="w-10 h-full flex items-center justify-center hover:text-[#c49b63] text-xl transition-colors"
                                >+</button>
                            </div>
                            
                            <div className="flex-1 flex gap-3">
                                {/* [UX UPGRADE] Nút Add To Cart thông minh hơn */}
                                <button 
                                    onClick={handleAddToCart}
                                    disabled={!isValid || adding}
                                    className={`
                                        flex-1 h-12 px-6 border rounded-full uppercase tracking-wider font-semibold transition-all text-sm flex items-center justify-center gap-2
                                        ${isValid 
                                            ? 'border-[#c49b63] text-[#c49b63] hover:bg-[#c49b63] hover:text-white' 
                                            : 'border-gray-700 text-gray-600 cursor-not-allowed'}
                                        ${isSuccess ? '!bg-green-600 !border-green-600 !text-white' : ''}
                                    `}
                                >
                                    {adding ? (
                                        <Loader2 className="animate-spin" size={20} />
                                    ) : isSuccess ? (
                                        <>
                                            <Check size={20} /> Đã thêm
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart size={18} /> Thêm vào giỏ
                                        </>
                                    )}
                                </button>

                                {/* Nút Mua ngay */}
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
                        
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">
                                Tạm tính: <span className="text-[#c49b63] font-bold text-lg ml-2">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(calculateTotalPrice())}</span>
                            </span>
                            
                            {/* [UX UPGRADE] Link text quay về menu nếu họ muốn */}
                            <Link href="/menu" className="text-gray-500 hover:text-white underline decoration-1 underline-offset-4 hidden sm:block">
                                Tiếp tục xem thực đơn
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}