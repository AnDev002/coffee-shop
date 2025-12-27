import React from "react";

const AboutStory = () => {
  return (
    <section className="container mx-auto max-w-[1140px] px-4 py-24 md:py-32">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
        
        {/* Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start z-10 lg:-mr-24 relative">
          <div className="bg-[#000000]/50 p-8 md:p-12 backdrop-blur-sm w-full">
            <h3 className="font-great-vibes text-[#c49b63] text-[40px] md:text-[50px] leading-none mb-2">
              Discover
            </h3>
            <h2 className="font-josefin text-white text-[30px] md:text-[40px] uppercase font-bold tracking-wide mb-8 leading-tight">
              Our Story
            </h2>
            
            <div className="font-poppins text-gray-400 font-light leading-relaxed space-y-4 text-[15px]">
              <p>
                On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country.
              </p>
              <p>
                But nothing the copy said could convince her and so it didn't take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their.
              </p>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="w-full lg:w-3/4 h-[400px] lg:h-[674px] relative">
          <div 
            className="w-full h-full bg-cover bg-center object-cover"
            style={{ backgroundImage: "url('/assets/ImageAsset9.png')" }}
          />
        </div>

      </div>
    </section>
  );
};

export default AboutStory;