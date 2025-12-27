import React from 'react';

interface MenuItemProps {
    image: string;
    title: string;
    description: string;
    price: string;
}

const MENU_ITEMS: MenuItemProps[] = [
    { 
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=2000&auto=format&fit=crop", 
        title: "Coffee Capuccino", 
        description: "A small river named Duden flows by their place and supplies", 
        price: "$5.90" 
    },
    { 
        image: "https://images.unsplash.com/photo-1550665648-e99745de0d4c?q=80&w=2000&auto=format&fit=crop", 
        title: "Hot Cake Honey", 
        description: "A small river named Duden flows by their place and supplies", 
        price: "$2.90" 
    },
    { 
        image: "https://images.unsplash.com/photo-1614352723226-80516104c935?q=80&w=2000&auto=format&fit=crop", 
        title: "Coffee Latte", 
        description: "A small river named Duden flows by their place and supplies", 
        price: "$3.45" 
    },
    { 
        image: "https://images.unsplash.com/photo-1629896096530-58992e592737?q=80&w=2000&auto=format&fit=crop", 
        title: "Ice Coffee", 
        description: "A small river named Duden flows by their place and supplies", 
        price: "$4.50" 
    },
];

const MenuItem = ({ image, title, description, price }: MenuItemProps) => (
    <div className="flex gap-4 items-start">
        <img src={image} alt={title} className="w-[80px] h-[80px] rounded-full object-cover flex-shrink-0" />
        <div className="flex-1">
            <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-lg font-medium text-white uppercase">{title}</h3>
                <span className="text-coffee-primary text-lg font-bold">{price}</span>
            </div>
            <p className="text-gray-400 text-sm font-light leading-relaxed line-clamp-2">{description}</p>
        </div>
    </div>
);

export const MenuSection = () => {
  return (
    <section className="py-20 md:py-32 bg-[#000000] text-white">
      <div className="max-w-[1140px] mx-auto px-4 text-center">
        <span className="text-coffee-primary font-serif italic text-3xl block mb-2">Discover</span>
        <h2 className="text-4xl font-bold uppercase tracking-wider mb-16">Best Coffee Sellers</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            {MENU_ITEMS.map((item, idx) => (
                <MenuItem key={idx} {...item} />
            ))}
        </div>
        
        <div className="mt-16 text-center">
            <button className="bg-coffee-primary text-black px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors">
                View Full Menu
            </button>
        </div>
      </div>
    </section>
  );
};