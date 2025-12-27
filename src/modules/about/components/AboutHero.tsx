import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const AboutHero = () => {
  return (
    <section className="relative w-full h-[750px] flex items-center justify-center">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/assets/ImageAsset14.png')" }} 
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4 animate-fade-in-up">
        <h1 className="text-white font-josefin font-bold text-[40px] md:text-[50px] uppercase tracking-wider">
          About Us
        </h1>
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm md:text-base">
          <Link 
            href="/" 
            className="text-white/70 hover:text-[#c49b63] uppercase font-poppins transition-colors"
          >
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-white/50" />
          <span className="text-white uppercase font-poppins tracking-widest">
            About
          </span>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;