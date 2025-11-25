import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import Banner1Section from '../components/sections/Banner1Section';
import BannerStandalone from '../components/sections/BannerStandalone';
import Banner3Section from '../components/sections/Banner3Section';
import Banner6Section from '../components/sections/Banner6Section';
import CalcSection from '../components/sections/CalcSection';
import CIOInsightSection from '../components/sections/CIOInsightSection';
import GatedContentSection from '../components/sections/GatedContentSection';
import CtaSection from '../components/sections/CtaSection';
import ClosingSection from '../components/sections/ClosingSection';
import SocialSection from '../components/sections/SocialSection';

const Home: React.FC = () => {
  // Update the document title
  React.useEffect(() => {
    document.title = 'ReadyAI - AI Solutions for Business';
  }, []);

  return (
    <div>
      <HeroSection />
      <Banner1Section />
      <BannerStandalone />
      <Banner3Section />
      <Banner6Section />
      <CalcSection />
      <CIOInsightSection />
      <GatedContentSection />
      <CtaSection />
      <ClosingSection />
      <SocialSection />
    </div>
  );
};

export default Home;