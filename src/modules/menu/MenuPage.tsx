// src/modules/menu/MenuPage.tsx
"use client";

import { useEffect } from "react";
// Thay any bằng type MenuCategory của bạn
import { DiscoverProductsSection } from './components/DiscoverProductsSection';
import { MenuSection as HomepageMenuSection } from '../home/components/MenuSection';

interface MenuPageProps {
  initialCategories: any[]; 
}

const MenuPage = ({ initialCategories }: MenuPageProps) => {
  // Gọi API lấy dữ liệu
  useEffect(() => {
    // 1. Logic xử lý Reload để cập nhật Header
    const needsReload = localStorage.getItem("need_auth_reload");
    if (needsReload === "true") {
      localStorage.removeItem("need_auth_reload");
      window.location.reload();
    }
  }, []);

  return (
    <div className="bg-black min-h-screen font-sans">
      
      {/* SECTION 1: THỰC ĐƠN CHÍNH (LIST) */}
      <section className="py-12 md:py-20">
        
        {/* Container chung cho cả Header và Grid sản phẩm */}
        <div className="container mx-auto max-w-[1140px] px-4">
            <HomepageMenuSection categories={initialCategories} />
            
        </div>
      </section>

      {/* SECTION 2: SẢN PHẨM NỔI BẬT (TAB) */}
      {/* Truyền categories vào Discover Section để hiển thị dạng Tab */}
      <DiscoverProductsSection categories={initialCategories} />
    </div>
  );
};

export default MenuPage;