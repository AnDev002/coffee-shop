import React from 'react';
import ServicesHero from './components/ServicesHero';
import ServicesInfoSection from './components/ServicesInfoSection';

const ServicesPage = () => {
  return (
    <div className="bg-coffee-secondary min-h-screen">
      {/* Hero Section */}
      <ServicesHero />
      
      {/* Brown Features Section (95-100% match to code provided) */}
      <ServicesInfoSection />
      
      {/* Note: The Footer is handled by MainLayout as per instructions.
         The Header is also handled by MainLayout.
      */}
    </div>
  );
};

export default ServicesPage;