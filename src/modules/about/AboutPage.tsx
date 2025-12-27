import React from "react";
import AboutHero from "./components/AboutHero";
import AboutStory from "./components/AboutStory";
import AboutMenuSection from "./components/AboutMenuSection";
import AboutBanner from "./components/AboutBanner";

const AboutPage = () => {
  return (
    <div className="flex flex-col w-full bg-black">
      {/* Hero Section - ImageAsset14/13 mapping */}
      <AboutHero />

      {/* Story Section - Our Story */}
      <AboutStory />

      {/* Middle Banner - ImageAsset8 mapping */}
      <AboutBanner />

      {/* Menu Discovery Section - Our Menu */}
      <AboutMenuSection />
    </div>
  );
};

export default AboutPage;