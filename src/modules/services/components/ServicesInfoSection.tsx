import React from 'react';
import { ClipboardList, Truck, Coffee } from 'lucide-react';

const ServicesInfoSection = () => {
  const features = [
    {
      id: 1,
      icon: <ClipboardList strokeWidth={1} className="w-[60px] h-[60px] text-[#1d150b]" />,
      title: "EASY TO ORDER",
      description: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic."
    },
    {
      id: 2,
      icon: <Truck strokeWidth={1} className="w-[60px] h-[60px] text-[#1d150b]" />,
      title: "FASTEST DELIVERY",
      description: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic."
    },
    {
      id: 3,
      icon: <Coffee strokeWidth={1} className="w-[60px] h-[60px] text-[#1d150b]" />,
      title: "QUALITY COFFEE",
      description: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic."
    }
  ];

  return (
    <section className="bg-[#c49b63] py-[105px] px-4">
      <div className="container mx-auto max-w-[1140px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="flex flex-col items-center text-center px-[15px]">
              {/* Icon Container with Border */}
              <div className="w-[100px] h-[100px] border border-[#674c27] flex items-center justify-center mb-[47px]">
                {feature.icon}
              </div>
              
              {/* Content */}
              <div className="flex flex-col items-center gap-5">
                <h3 className="font-josefin text-[18px] uppercase text-black leading-[25.2px]">
                  {feature.title}
                </h3>
                <p className="font-poppins text-[15px] font-light text-[#1d150b] leading-[27px] max-w-[330px]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesInfoSection;