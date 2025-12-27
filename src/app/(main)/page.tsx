// src/app/(main)/page.tsx
import React from "react";
import { ClipboardList, Truck, Coffee, Search, Clock, Phone } from "lucide-react";
import { FeaturesSection } from "@/modules/home/components/FeaturesSection";

// Helper components for repeated UI patterns
const StatCard = ({ icon, number, label }: { icon: string; number: string; label: string }) => (
  <div className="flex flex-col items-center gap-4">
    <div className="w-[100px] h-[100px] border border-[#674c27] flex items-center justify-center rounded-full hover:bg-[#c49b63] hover:border-[#c49b63] hover:text-white text-[#c49b63] transition-all duration-300 group">
       {/* Usually SVG here, using text for now to match provided code logic */}
       <span className="font-inter text-4xl group-hover:text-white">{icon}</span>
    </div>
    <div className="text-center">
      <div className="text-3xl font-bold font-josefin text-[#c49b63] mb-2">{number}</div>
      <div className="text-sm font-poppins font-light uppercase tracking-widest text-gray-400">{label}</div>
    </div>
  </div>
);

const ProductCard = ({ image, title, desc, price }: { image: string; title: string; desc: string; price: string }) => (
  <div className="flex flex-col items-center group">
    <div className="overflow-hidden mb-6">
      <img src={image} alt={title} className="w-[255px] h-[200px] object-cover group-hover:scale-110 transition-transform duration-500" />
    </div>
    <div className="text-center flex flex-col items-center gap-4">
      <h3 className="text-white text-lg font-josefin uppercase">{title}</h3>
      <p className="text-gray-400 font-poppins font-light text-sm w-[80%] line-clamp-3">
        {desc}
      </p>
      <div className="text-white font-poppins">{price}</div>
      <button className="border border-[#c49b63] text-[#c49b63] px-4 py-2 text-xs uppercase hover:bg-[#c49b63] hover:text-white transition-colors">
        Show
      </button>
    </div>
  </div>
);

const MenuCard = ({ image, title, desc, price }: { image: string; title: string; desc: string; price: string }) => (
    <div className="flex gap-4 items-center w-full max-w-xl">
        <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border border-[#c49b63]/30">
             <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
                <h4 className="text-white font-josefin uppercase text-lg hover:text-[#c49b63] transition-colors">{title}</h4>
                <span className="text-[#c49b63] font-josefin text-lg">{price}</span>
            </div>
            <p className="text-gray-500 font-poppins font-light text-sm line-clamp-2">{desc}</p>
        </div>
    </div>
)

export default function HomePage() {
  return (
    <main className="w-full bg-[#000000] overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative h-[750px] w-full bg-[url('/assets/ImageAsset20.png')] bg-cover bg-center bg-fixed">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto h-full flex flex-col justify-center items-center text-center px-4 z-10 gap-6 pt-32">
          <span className="font-great-vibes text-[#c49b63] text-3xl md:text-5xl">Welcome</span>
          <h1 className="text-white font-josefin uppercase text-4xl md:text-6xl font-bold tracking-wider leading-tight">
            The Best Coffee Testing Experience
          </h1>
          <p className="text-white/80 font-poppins font-light max-w-2xl text-base md:text-lg mb-8">
            A small river named Duden flows by their place and supplies it with the necessary regelialia.
          </p>
          <div className="flex gap-4">
            <button className="bg-[#c49b63] text-white px-8 py-4 uppercase text-sm tracking-widest font-poppins hover:bg-[#b08b55] transition-colors">
              Order Now
            </button>
            <button className="border border-white text-white px-8 py-4 uppercase text-sm tracking-widest font-poppins hover:bg-white hover:text-black transition-colors">
              View Menu
            </button>
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
                          <h4 className="text-white font-poppins text-lg">000 (123) 456 7890</h4>
                          <p className="text-gray-500 font-poppins font-light text-sm">A small river named Duden flows by their place and supplies.</p>
                      </div>
                  </div>
              </div>
               <div className="flex-1 bg-[#c49b63] p-8 md:p-12 flex flex-col gap-6 items-start justify-center">
                  <div className="flex items-start gap-4">
                      <Truck className="text-white mt-1" />
                      <div>
                          <h4 className="text-white font-poppins text-lg">198 West 21th Street</h4>
                          <p className="text-white/80 font-poppins font-light text-sm">203 Fake St. Mountain View, San Francisco, California, USA</p>
                      </div>
                  </div>
              </div>
               <div className="flex-1 bg-[#120f0f] p-8 md:p-12 flex flex-col gap-6 items-start justify-center border-l border-white/5">
                  <div className="flex items-start gap-4">
                      <Clock className="text-[#c49b63] mt-1" />
                      <div>
                          <h4 className="text-white font-poppins text-lg">Open Monday-Friday</h4>
                          <p className="text-gray-500 font-poppins font-light text-sm">8:00am - 9:00pm</p>
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
                      <span className="font-great-vibes text-[#c49b63] text-4xl">Discover</span>
                      <h2 className="text-white font-josefin uppercase text-4xl font-bold">Our Story</h2>
                      <p className="text-gray-400 font-poppins font-light leading-relaxed">
                          On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country.
                      </p>
                      <p className="text-gray-400 font-poppins font-light leading-relaxed">
                          But nothing the copy said could convince her and so it didn't take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their.
                      </p>
                  </div>
              </div>
          </div>
      </section>

      {/* Features/Stats Section */}
      <FeaturesSection />

      {/* Menu / Best Sellers Section */}
      <section className="py-24 bg-black">
         <div className="container mx-auto max-w-[1140px] px-4 flex flex-col items-center">
             <div className="text-center mb-16">
                 <span className="font-great-vibes text-[#c49b63] text-4xl block mb-2">Discover</span>
                 <h2 className="text-white font-josefin uppercase text-4xl font-bold">Best Coffee Sellers</h2>
                 <p className="text-gray-400 font-poppins font-light mt-4 max-w-xl mx-auto">
                     Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
                 </p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                 <ProductCard 
                    image="/assets/ImageAsset10.png" 
                    title="Coffee Capuccino" 
                    desc="A small river named Duden flows by their place and supplies it with the necessary regelialia." 
                    price="$5.90" 
                 />
                 <ProductCard 
                    image="/assets/ImageAsset9.png" 
                    title="Coffee Capuccino" 
                    desc="A small river named Duden flows by their place and supplies it with the necessary regelialia." 
                    price="$5.90" 
                 />
                 <ProductCard 
                    image="/assets/ImageAsset8.png" 
                    title="Coffee Capuccino" 
                    desc="A small river named Duden flows by their place and supplies it with the necessary regelialia." 
                    price="$5.90" 
                 />
                 <ProductCard 
                    image="/assets/ImageAsset10.png" 
                    title="Coffee Capuccino" 
                    desc="A small river named Duden flows by their place and supplies it with the necessary regelialia." 
                    price="$5.90" 
                 />
             </div>
         </div>
      </section>

      {/* Menu List Section */}
      <section className="py-24 bg-[#120f0f]">
          <div className="container mx-auto max-w-[1140px] px-4 flex flex-col items-center">
             <div className="text-center mb-16">
                 <span className="font-great-vibes text-[#c49b63] text-4xl block mb-2">Discover</span>
                 <h2 className="text-white font-josefin uppercase text-4xl font-bold">Our Menu</h2>
                 <p className="text-gray-400 font-poppins font-light mt-4 max-w-xl mx-auto">
                     Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
                 </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 w-full">
                {[1,2,3,4].map(i => (
                    <MenuCard 
                        key={i}
                        image="/assets/ImageAsset12.png" 
                        title="Cornish - Mackerel" 
                        price="$20.00" 
                        desc="A small river named Duden flows by their place and supplies" 
                    />
                ))}
                {[1,2,3,4].map(i => (
                    <MenuCard 
                        key={`col2-${i}`}
                        image="/assets/ImageAsset14.png" 
                        title="Roasted Steak" 
                        price="$29.00" 
                        desc="A small river named Duden flows by their place and supplies" 
                    />
                ))}
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