import React from 'react';
import { ClipboardList, Truck, Award } from 'lucide-react'; 

const FEATURES = [
    { 
        icon: ClipboardList, 
        title: "Dễ dàng đặt hàng", 
        desc: "Quy trình đặt món được tối ưu hóa đơn giản, giúp bạn dễ dàng lựa chọn và thanh toán chỉ với vài thao tác trên mọi thiết bị." 
    },
    { 
        icon: Truck, 
        title: "Vận chuyển nhanh chóng", 
        desc: "Đội ngũ giao hàng chuyên nghiệp cam kết mang đến những ly cà phê thơm ngon nhất trong thời gian ngắn nhất, bất kể thời tiết." 
    },
    { 
        icon: Award, 
        title: "Cà phê chất lượng", 
        desc: "Tuyển chọn từ những hạt cà phê thượng hạng nhất, được rang xay và pha chế tỉ mỉ để giữ trọn hương vị nguyên bản đậm đà." 
    },
];

const STATS = [
    { number: "100", label: "Chi nhánh" },
    { number: "85", label: "Giải thưởng" },
    { number: "10,567", label: "Khách hàng hài lòng" },
    { number: "900", label: "Nhân viên" },
];

export const FeaturesSection = () => {
    return (
        <>
            {/* --- FEATURES SECTION --- */}
            <section className="py-24 bg-[#0c0b09]"> {/* Nền tối đậm để làm nổi bật nội dung */}
                <div className="container mx-auto max-w-[1140px] px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {FEATURES.map((f, idx) => (
                            <div 
                                key={idx} 
                                className="group flex flex-col items-center text-center gap-6 p-8 md:p-10 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:-translate-y-2 transition-all duration-300 rounded-sm"
                            >
                                {/* Icon Wrapper: Tạo khung tròn cho icon để trông chỉnh chu hơn */}
                                <div className="relative flex items-center justify-center w-24 h-24 rounded-full border border-coffee-primary/30 group-hover:border-coffee-primary group-hover:bg-coffee-primary/10 transition-colors">
                                    <f.icon 
                                        size={40} 
                                        strokeWidth={1.5}
                                        className="text-coffee-primary transition-transform duration-300 group-hover:scale-110" 
                                    />
                                </div>
                                
                                <div className="flex flex-col gap-3">
                                    <h3 className="text-white text-lg font-bold uppercase tracking-[2px] group-hover:text-coffee-primary transition-colors">
                                        {f.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm font-light leading-relaxed max-w-xs mx-auto">
                                        {f.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- STATS SECTION --- */}
            <section 
                className="py-24 bg-fixed bg-cover bg-center relative"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1920&auto=format&fit=crop")' }}
            >
                {/* Overlay tối hơn một chút để số liệu màu vàng/trắng nổi bật */}
                <div className="absolute inset-0 bg-black/70"></div>
                
                <div className="container max-w-[1140px] mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
                         {STATS.map((s, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center group">
                                {/* Khung số liệu xoay */}
                                <div className="w-20 h-20 md:w-24 md:h-24 border border-coffee-primary/50 group-hover:border-coffee-primary flex items-center justify-center mb-6 rotate-45 transition-all duration-500 hover:rotate-0 hover:bg-coffee-primary/10">
                                    <span className="-rotate-45 group-hover:rotate-0 transition-all duration-500 block font-serif text-2xl md:text-3xl text-coffee-primary font-bold">
                                        {s.number}
                                    </span>
                                </div>
                                <p className="text-white/90 text-sm md:text-base uppercase tracking-widest font-medium">
                                    {s.label}
                                </p>
                            </div>
                         ))}
                    </div>
                </div>
            </section>
        </>
    );
}