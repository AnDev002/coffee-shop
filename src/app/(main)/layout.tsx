// src/app/(main)/layout.tsx
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen"> {/* Thêm relative nếu cần */}
      <Header />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}