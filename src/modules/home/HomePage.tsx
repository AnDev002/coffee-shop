// src/modules/home/HomePage.tsx
import React from 'react';
import { HeroSection } from './components/HeroSection';
import { InfoBar } from './components/InfoBar';
import { AboutSection } from './components/AboutSection';
// import { FeaturesSection } from './components/FeaturesSection'; // Có thể bỏ nếu BestSellers thay thế nó
import { BestSellersSection } from './components/BestSellersSection';
import { MenuSection } from './components/MenuSection';
import { getMenuData } from '@/actions/menu';
import { getBestSellingProducts } from '@/actions/product';

const HomePage = async () => {
  // Fetch dữ liệu song song để tối ưu tốc độ
  const [categories, bestSellers] = await Promise.all([
    getMenuData(),
    getBestSellingProducts(4) // Lấy 4 sản phẩm bán chạy nhất
  ]);

  return (
    <div className="bg-black min-h-screen font-sans">
      <HeroSection />
      
      <InfoBar />
      
      <AboutSection />
      
      {/* Phần 1: Discover Best Coffee Sellers (Sản phẩm thật) */}
      <BestSellersSection products={bestSellers} />
      
      {/* Phần 2: Discover Our Menu (Danh sách sản phẩm thật theo category) */}
      <MenuSection categories={categories} />
      
    </div>
  );
};

export default HomePage;