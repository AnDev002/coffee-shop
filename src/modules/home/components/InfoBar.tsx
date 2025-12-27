import React from 'react';
import { Phone, MapPin, Clock } from 'lucide-react';

const INFO_DATA = [
    { icon: Phone, title: "000 (123) 456 7890", subtitle: "A small river named Duden flows" },
    { icon: MapPin, title: "198 West 21th Street", subtitle: "203 Fake St. Mountain View, San Francisco" },
    { icon: Clock, title: "Open Monday-Friday", subtitle: "8:00am - 9:00pm" },
];

export const InfoBar = () => {
  return (
    <div className="bg-black text-white py-8 md:py-0">
      <div className="max-w-[1140px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {INFO_DATA.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 py-8 md:justify-center">
                <div className="text-coffee-primary">
                    <item.icon size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-400 font-light max-w-[200px]">{item.subtitle}</p>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};