// src/components/layout/Header.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MapPin, Clock, Menu, X, ShoppingBag } from "lucide-react";

const NAV_ITEMS = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black shadow-lg pb-0" : "bg-transparent pb-4"
      }`}
    >
      {/* --- Top Info Bar (Desktop only) --- */}
      <div
        className={`w-full border-b border-white/10 hidden lg:flex justify-center transition-all duration-300 ${
          isScrolled ? "h-0 py-0 overflow-hidden opacity-0" : "h-auto py-3 opacity-100 bg-[#000000]"
        }`}
      >
        <div className="container mx-auto max-w-[1140px] flex justify-between items-center px-4">
          <div className="flex gap-8">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-coffee-primary" />
              <div>
                <p className="text-coffee-primary uppercase text-[10px] font-bold tracking-wider font-sans">Hotline</p>
                <p className="text-white text-xs font-light">000 (123) 456 7890</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-coffee-primary" />
              <div>
                <p className="text-coffee-primary uppercase text-[10px] font-bold tracking-wider font-sans">Address</p>
                <p className="text-white text-xs font-light">198 West 21th Street</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-coffee-primary" />
              <div>
                <p className="text-coffee-primary uppercase text-[10px] font-bold tracking-wider font-sans">Open Time</p>
                <p className="text-white text-xs font-light">Mon-Fri: 8:00am - 9:00pm</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-white/60 text-xs">
             <span>Welcome to N.S Coffee</span>
          </div>
        </div>
      </div>

      {/* --- Main Navigation Bar --- */}
      <nav
        className={`w-full transition-colors duration-300 ${
          isScrolled ? "bg-black/90 backdrop-blur-md" : "bg-black/50 backdrop-blur-sm border-b border-white/5"
        }`}
      >
        <div className="container mx-auto max-w-[1140px] flex justify-between items-center px-4 py-4 md:py-6">
          
          {/* LOGO */}
          <Link
            href="/"
            className="text-2xl font-bold uppercase flex flex-col items-center leading-none group"
          >
            <span className="text-white text-2xl md:text-3xl font-bold">N.S</span>
            <span className="text-coffee-primary text-[10px] md:text-sm tracking-[0.2em] group-hover:tracking-[0.3em] transition-all duration-300">
              Coffee
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-10">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`text-sm uppercase tracking-widest font-medium transition-all duration-300 relative py-2 
                      ${isActive ? "text-coffee-primary" : "text-white hover:text-coffee-primary"}
                      after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-coffee-primary after:transition-all after:duration-300 hover:after:w-full
                      ${isActive ? "after:w-full" : ""}
                    `}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ACTIONS & MOBILE TOGGLE */}
          <div className="flex items-center gap-4 md:gap-6">
            <button className="text-white hover:text-coffee-primary transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-coffee-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">0</span>
            </button>

            <div className="hidden md:flex items-center gap-4">
              <Link href="/login" className="text-white text-xs uppercase tracking-widest font-medium hover:text-coffee-primary transition-colors">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-coffee-primary text-white px-5 py-2 text-xs uppercase tracking-widest font-medium rounded-sm hover:bg-[#b08b55] hover:scale-105 transition-all"
              >
                Register
              </Link>
            </div>

            <button
              className="md:hidden text-white hover:text-coffee-primary transition-colors p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* --- MOBILE MENU DROPDOWN --- */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/10 transition-all duration-300 ease-in-out overflow-hidden shadow-2xl ${
            isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col h-[calc(100vh-80px)] overflow-y-auto pb-10">
            <ul className="flex flex-col items-center py-6 gap-6">
              {NAV_ITEMS.map((item) => (
                <li key={item.name} className="w-full text-center">
                  <Link
                    href={item.path}
                    className={`block w-full py-2 text-sm uppercase tracking-[0.15em] ${
                      pathname === item.path ? "text-coffee-primary" : "text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="w-full border-t border-white/10 my-2"></li>
              {/* Mobile Auth */}
              <li className="flex flex-col gap-4 w-full px-10">
                  <Link href="/login" className="w-full text-center text-white py-3 border border-white/20 uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-colors">
                      Login
                  </Link>
                  <Link href="/register" className="w-full text-center bg-coffee-primary text-white py-3 uppercase text-xs tracking-widest hover:bg-[#b08b55] transition-colors">
                      Register
                  </Link>
              </li>
              
              {/* Mobile Contact Info (Added for better UX) */}
              <li className="w-full px-10 pt-4 flex flex-col gap-4 items-center border-t border-white/10 mt-2">
                <div className="flex items-center gap-3 text-white/70">
                   <Phone className="w-4 h-4 text-coffee-primary" />
                   <span className="text-xs">000 (123) 456 7890</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                   <Clock className="w-4 h-4 text-coffee-primary" />
                   <span className="text-xs">Mon-Fri: 8:00 - 21:00</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;