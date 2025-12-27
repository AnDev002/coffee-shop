import React from "react";

const AboutBanner = () => {
  return (
    <section className="w-full h-[300px] md:h-[400px] lg:h-[626px] relative">
      <div 
        className="w-full h-full bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/assets/ImageAsset8.png')" }}
      />
      {/* Overlay nếu cần thiết để làm tối ảnh */}
      <div className="absolute inset-0 bg-black/20" />
    </section>
  );
};

export default AboutBanner;