// src/modules/menu/components/MenuInfoSection.tsx
"use client";

import React from 'react';
import { Phone, MapPin, Clock } from 'lucide-react';

const INFO_ITEMS = [
    {
        icon: Phone,
        title: "000 (123) 456 7890",
        desc: "A small river named Duden flows by their place and supplies.",
    },
    {
        icon: MapPin,
        title: "198 West 21th Street",
        desc: "203 Fake St. Mountain View, San Francisco, California, USA",
    },
    {
        icon: Clock,
        title: "Open Monday-Friday",
        desc: "8:00am - 9:00pm",
    },
];

export const MenuInfoSection = () => {
    return (
        <section className="bg-black py-12 md:py-20 mt-20 md:mt-0">
            <div className="max-w-[1140px] mx-auto px-4 flex flex-col md:flex-row gap-8 md:gap-0">
                {INFO_ITEMS.map((item, idx) => (
                    <div key={idx} className="flex-1 flex gap-4 text-white px-4">
                        <div className="text-[#c49b63]">
                            <item.icon size={24} />
                        </div>
                        <div>
                            <h4 className="font-sans text-base md:text-lg mb-2">{item.title}</h4>
                            <p className="text-gray-400 text-sm font-light leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};