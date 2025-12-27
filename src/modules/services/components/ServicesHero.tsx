import React from 'react';
import Link from 'next/link';

const ServicesHero = () => {
  return (
    <section className="relative h-[450px] md:h-[600px] w-full flex items-center justify-center bg-black/40">
      {/* Background Image Placeholder - Replace url with your actual hero image asset */}
      <div 
        className="absolute inset-0 z-[-1] bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop')",
          filter: "brightness(0.6)"
        }}
      />

      <div className="container mx-auto text-center flex flex-col items-center gap-4 mt-20">
        <h1 className="font-josefin text-4xl md:text-6xl text-white font-bold uppercase tracking-wider mb-4">
          Services
        </h1>
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-white/80 font-poppins text-sm uppercase tracking-widest">
          <Link href="/" className="hover:text-[#c49b63] transition-colors">
            Home
          </Link>
          <span className="text-[#c49b63]">/</span>
          <span className="text-white">Services</span>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;