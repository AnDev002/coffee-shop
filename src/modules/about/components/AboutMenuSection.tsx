import React from "react";
import Button from "@/components/ui/Button"; // Giả sử đã có UI component Button

const AboutMenuSection = () => {
  return (
    <section className="container mx-auto max-w-[1140px] px-4 py-24">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        
        {/* Images Grid (Left Side) */}
        <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <div 
              className="h-[200px] md:h-[254px] w-full bg-cover bg-center rounded-sm"
              style={{ backgroundImage: "url('/assets/ImageAsset7.png')" }}
            />
            <div 
              className="h-[200px] md:h-[254px] w-full bg-cover bg-center rounded-sm"
              style={{ backgroundImage: "url('/assets/ImageAsset6.png')" }}
            />
          </div>
          <div className="flex flex-col gap-4 mt-8">
            <div 
              className="h-[200px] md:h-[254px] w-full bg-cover bg-center rounded-sm"
              style={{ backgroundImage: "url('/assets/ImageAsset5.png')" }}
            />
            <div 
              className="h-[200px] md:h-[254px] w-full bg-cover bg-center rounded-sm"
              style={{ backgroundImage: "url('/assets/ImageAsset4.png')" }}
            />
          </div>
        </div>

        {/* Content (Right Side) */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end text-center lg:text-right gap-6">
          <h3 className="font-great-vibes text-[#c49b63] text-[40px] md:text-[50px] leading-none">
            Discover
          </h3>
          <h2 className="font-josefin text-white text-[30px] md:text-[40px] uppercase font-bold tracking-wide leading-tight mt-[-10px]">
            Our Menu
          </h2>
          
          <p className="font-poppins text-gray-400 font-light leading-relaxed max-w-lg text-[15px]">
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
          </p>

          <div className="mt-4">
             {/* Sử dụng Tailwind thuần cho Button để giống hệt style gốc */}
            <button className="border border-[#c49b63] text-[#c49b63] px-6 py-3 uppercase text-[13px] font-poppins hover:bg-[#c49b63] hover:text-white transition-all duration-300">
              View Full Menu
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutMenuSection;