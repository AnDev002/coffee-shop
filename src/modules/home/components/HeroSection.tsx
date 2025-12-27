import React from 'react';
// Nếu bạn có cấu hình next/image, hãy dùng <Image /> thay cho <img> để tối ưu
// import Image from 'next/image'; 

export const HeroSection = () => {
  return (
    // Sử dụng dvh cho mobile để tránh thanh address bar che mất content
    <section className="relative w-full h-[100dvh] min-h-[600px] md:min-h-[750px] flex items-center justify-center bg-black">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-black/50 z-10" />
         <img 
            src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop" 
            alt="Coffee Hero" 
            className="w-full h-full object-cover"
         />
      </div>

      <div className="relative z-20 text-center max-w-4xl px-4 flex flex-col items-center gap-4 md:gap-6 pt-16 md:pt-0">
        <span className="font-serif text-coffee-primary text-2xl md:text-3xl lg:text-5xl italic">Welcome</span>
        <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold uppercase tracking-wider leading-tight">
          Creamy & Hot Flavour
        </h1>
        <p className="text-white/80 text-sm md:text-base font-light max-w-lg md:max-w-2xl leading-relaxed">
          A small river named Duden flows by their place and supplies it with the necessary regelialia.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button className="bg-coffee-primary text-black px-8 py-3 md:py-4 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                Order Now
            </button>
            <button className="border border-white/30 text-white px-8 py-3 md:py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                View Menu
            </button>
        </div>
      </div>
    </section>
  );
};