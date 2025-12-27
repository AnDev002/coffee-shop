// src/modules/menu/components/BookTableSection.tsx
"use client";

import React from 'react';
import { ChevronDown } from 'lucide-react';

export const BookTableSection = () => {
  return (
    <section className="relative w-full min-h-[750px] flex items-center justify-center bg-black overflow-hidden">
      {/* Background Images Overlay - Simulating the collage from provided code */}
      <div className="absolute inset-0 z-0 opacity-60">
        <div className="grid grid-cols-2 h-full">
            <img 
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop" 
              alt="Coffee Background Left" 
              className="w-full h-full object-cover"
            />
            <img 
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop" 
              alt="Coffee Background Right" 
              className="w-full h-full object-cover"
            />
        </div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Book a Table Form */}
      <div className="relative z-10 w-full max-w-[1140px] px-4 flex flex-col md:flex-row items-end gap-0 md:translate-y-[180px]">
        {/* Title Block */}
        <div className="bg-[#c49b63] p-6 md:p-8 flex-1 w-full md:w-auto min-h-[311px] flex flex-col justify-center gap-2">
            <span className="font-sans text-sm md:text-base uppercase tracking-widest text-white/80">
                Book a Table
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-bold mb-6">
                Make Reservation
            </h2>

            {/* Form Inputs */}
            <div className="flex flex-col gap-4">
                {/* First Name */}
                <div className="border-b border-white/40 py-2">
                    <input 
                        type="text" 
                        placeholder="First Name" 
                        className="w-full bg-transparent text-white placeholder-white/70 outline-none text-sm"
                    />
                </div>
                {/* Last Name */}
                <div className="border-b border-white/40 py-2">
                     <input 
                        type="text" 
                        placeholder="Last Name" 
                        className="w-full bg-transparent text-white placeholder-white/70 outline-none text-sm"
                    />
                </div>
                {/* Date & Time Row */}
                <div className="flex gap-4">
                    <div className="flex-1 border-b border-white/40 py-2 flex justify-between items-center">
                        <input type="text" placeholder="Date" className="w-full bg-transparent text-white placeholder-white/70 outline-none text-sm" />
                        <ChevronDown className="text-white w-4 h-4" />
                    </div>
                    <div className="flex-1 border-b border-white/40 py-2 flex justify-between items-center">
                        <input type="text" placeholder="Time" className="w-full bg-transparent text-white placeholder-white/70 outline-none text-sm" />
                        <ChevronDown className="text-white w-4 h-4" />
                    </div>
                </div>
                 {/* Phone */}
                 <div className="border-b border-white/40 py-2">
                     <input 
                        type="tel" 
                        placeholder="Phone" 
                        className="w-full bg-transparent text-white placeholder-white/70 outline-none text-sm"
                    />
                </div>
            </div>
        </div>

        {/* Message Block */}
        <div className="bg-white/10 backdrop-blur-sm p-6 md:p-8 w-full md:w-[350px] min-h-[311px] flex flex-col justify-between border-t border-white/10 md:border-none">
             <div className="border-b border-white py-2 mt-4">
                 <input 
                    type="text" 
                    placeholder="Message" 
                    className="w-full bg-transparent text-white placeholder-white/70 outline-none text-sm"
                />
            </div>
            <button className="bg-white text-black font-sans text-sm uppercase tracking-widest py-4 px-6 font-bold hover:bg-[#c49b63] hover:text-white transition-colors">
                Appointment
            </button>
        </div>
      </div>
    </section>
  );
};