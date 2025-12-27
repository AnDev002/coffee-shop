// src/modules/menu/MenuPage.tsx
import React from 'react';
import { BookTableSection } from './components/BookTableSection';
import { MenuInfoSection } from './components/MenuInfoSection';
import { DiscoverProductsSection } from './components/DiscoverProductsSection';
import { MenuSection as HomepageMenuSection } from '../home/components/MenuSection';

const MenuPage = () => {
  return (
    <div className="bg-black min-h-screen font-sans">
      {/* Lưu ý: Nếu Header là fixed, BookTableSection cần có padding-top 
         tương ứng với chiều cao header để tránh bị che mất nội dung.
         Header cao khoảng 80px-100px.
      */}
      <div className="pt-20 lg:pt-24"> 
         <BookTableSection />
      </div>

      {/* Info Bar */}
      <MenuInfoSection />

      {/* Homepage Menu Section */}
      <div className="py-12 md:py-20">
        <HomepageMenuSection />
      </div>

      {/* Discover Products */}
      <DiscoverProductsSection />
    </div>
  );
};

export default MenuPage;