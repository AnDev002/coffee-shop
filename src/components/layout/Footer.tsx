// src/components/layout/Footer.tsx
import React from "react";
import { MapPin, Phone, Mail, Heart, Calendar, User, MessageSquare } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#120f0f] pt-12 md:pt-24 pb-8 md:pb-12">
      <div className="container mx-auto max-w-[1140px] px-4">
        {/* Grid: 1 cột (mobile), 2 cột (tablet), 4 cột (desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-20">
          
          {/* About Us */}
          <div className="flex flex-col gap-4 md:gap-6">
            <h3 className="text-white uppercase font-josefin text-lg tracking-wider">About Us</h3>
            <p className="text-gray-400 font-poppins font-light leading-relaxed text-sm">
              Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
            </p>
            <div className="flex gap-4 mt-2">
               <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-coffee-primary hover:text-white transition-colors cursor-pointer text-gray-300">T</div>
               <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-coffee-primary hover:text-white transition-colors cursor-pointer text-gray-300">F</div>
               <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-coffee-primary hover:text-white transition-colors cursor-pointer text-gray-300">I</div>
            </div>
          </div>

          {/* Recent Blog */}
          <div className="flex flex-col gap-4 md:gap-6">
             <h3 className="text-white uppercase font-josefin text-lg tracking-wider">Recent Blog</h3>
             {[1, 2].map((i) => (
               <div key={i} className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-700 bg-cover bg-center shrink-0 rounded-sm" style={{ backgroundImage: `url('/assets/ImageAsset${i}.png')` }}></div>
                  <div className="flex flex-col gap-1 justify-center">
                    <h4 className="text-white/90 font-poppins font-light text-sm hover:text-coffee-primary cursor-pointer line-clamp-2">
                      Even the all-powerful Pointing has no control about
                    </h4>
                    <div className="flex gap-3 text-[11px] text-gray-500">
                      <div className="flex items-center gap-1"><Calendar size={10}/> Sept 15, 2018</div>
                      <div className="flex items-center gap-1"><User size={10}/> Admin</div>
                      <div className="flex items-center gap-1"><MessageSquare size={10}/> 19</div>
                    </div>
                  </div>
               </div>
             ))}
          </div>

          {/* Services */}
          <div className="flex flex-col gap-4 md:gap-6">
            <h3 className="text-white uppercase font-josefin text-lg tracking-wider">Services</h3>
            <ul className="flex flex-col gap-3">
              {["Cooked", "Deliver", "Quality Foods", "Mixed"].map((service) => (
                <li key={service} className="text-gray-400 font-poppins font-light uppercase text-sm hover:text-coffee-primary cursor-pointer transition-colors">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4 md:gap-6">
            <h3 className="text-white uppercase font-josefin text-lg tracking-wider">Have a Question?</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex gap-4 items-start">
                <MapPin className="w-5 h-5 text-coffee-primary mt-1 shrink-0" />
                <span className="text-gray-400 font-poppins font-light text-sm">203 Fake St. Mountain View, San Francisco, California, USA</span>
              </li>
              <li className="flex gap-4 items-center">
                <Phone className="w-5 h-5 text-coffee-primary shrink-0" />
                <span className="text-gray-400 font-poppins font-light text-sm">+2 392 3929 210</span>
              </li>
              <li className="flex gap-4 items-center">
                <Mail className="w-5 h-5 text-coffee-primary shrink-0" />
                <span className="text-gray-400 font-poppins font-light text-sm break-all">info@yourdomain.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 md:pt-12 border-t border-white/5 text-gray-500 font-poppins font-light text-xs md:text-sm">
          <p>
            Copyright &copy; {new Date().getFullYear()} All rights reserved | Made with <Heart className="inline w-4 h-4 text-red-500" /> by Nikhil Singh
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;