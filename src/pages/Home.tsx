import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import IndustriesSection from '../components/sections/IndustriesSection';
import CtaSection from '../components/sections/CtaSection';
import ROICalculator from '../components/sections/ROICalculator';
import Banner from '../components/sections/Banner';
import Banner3Section from '../components/sections/Banner3Section';
import Banner2Section from '../components/sections/Banner2Section';
import Banner1Section from '../components/sections/Banner1Section';
import Banner4Section from '../components/sections/Banner4Section';
import Banner5Section from '../components/sections/Banner5Section';
import Banner6Section from '../components/sections/Banner6Section';
import Banner7Section from '../components/sections/Banner7Section';
import Banner8Section from '../components/sections/Banner8Section';
import Banner9Section from '../components/sections/Banner9Section';
import Banner10Section from '../components/sections/Banner10Section';
import CalcSection from '../components/sections/CalcSection';
import IndustriesShowcaseSection from '../components/sections/IndustriesShowcaseSection';
import SlideAnimator from '../utils/SlideAnimator';
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
      <Banner6Section />  
      <CalcSection />
      <Banner2Section />
      <IndustriesShowcaseSection />
      <CtaSection />
      <SocialSection />
    </div>
  );
};

export default Home;