// src/modules/home/HomePage.tsx
import React from 'react';
import { HeroSection } from './components/HeroSection';
import { InfoBar } from './components/InfoBar';
import { AboutSection } from './components/AboutSection';
import { FeaturesSection } from './components/FeaturesSection';
import { MenuSection } from './components/MenuSection';

const HomePage = () => {
  return (
    <div className="bg-coffee-secondary min-h-screen font-sans">
      <HeroSection />
      <InfoBar />
      <AboutSection />
      <FeaturesSection />
      <MenuSection />
      
      {/* Blog Section & Gallery could be added here similar to MenuSection */}
    </div>
  );
};

export default HomePage;