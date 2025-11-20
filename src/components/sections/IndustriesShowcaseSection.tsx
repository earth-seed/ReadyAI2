import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { INDUSTRIES } from '../../utils/constants';
import { motion } from 'framer-motion';
import SlideAnimator from '../../utils/SlideAnimator';

const IndustriesShowcaseSection: React.FC = () => {
  const [activeIndustry, setActiveIndustry] = useState(0);

  const currentIndustry = INDUSTRIES[activeIndustry];

  return (
    <SlideAnimator direction="up">
      <section className="bg-accent2-lightest py-24 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-normal text-primary mb-3">
              Industry Expertise
            </h2>
            <p className="font-sans text-lg text-primary-light max-w-2xl">
              Specialized AI solutions designed for your sector's unique challenges and compliance requirements
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Sidebar - Industry List */}
            <div className="lg:col-span-4 space-y-1">
              {INDUSTRIES.map((industry, index) => (
                <button
                  key={industry.id}
                  onClick={() => setActiveIndustry(index)}
                  className={`group w-full text-left px-5 py-4 rounded-lg font-sans text-base transition-all duration-300 flex items-center justify-between ${
                    activeIndustry === index
                      ? 'bg-accent text-white shadow-md'
                      : 'text-primary hover:bg-gray-50 border border-transparent hover:border-gray-200'
                  }`}
                >
                  <span className={activeIndustry === index ? 'font-medium' : ''}>
                    {industry.name}
                  </span>
                  <ChevronRight 
                    className={`w-5 h-5 transition-transform duration-300 ${
                      activeIndustry === index 
                        ? 'opacity-100' 
                        : 'opacity-0 group-hover:opacity-50 -translate-x-2 group-hover:translate-x-0'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Right Content Area */}
            <div className="lg:col-span-8">
              <motion.div
                key={activeIndustry}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-gradient-to-br from-primary via-primary-light to-primary-dark text-white rounded-2xl p-10 md:p-12 lg:p-14 min-h-[420px] flex flex-col justify-between relative overflow-hidden"
              >
                {/* Subtle decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
                
                <div className="relative z-10">
                  <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal mb-6 leading-tight">
                    {currentIndustry.name}
                  </h3>
                  
                  <p className="font-sans text-xl text-white/90 leading-relaxed mb-6">
                    {currentIndustry.description}
                  </p>
                  
                  <div className="h-px bg-white/20 my-6"></div>
                  
                  <p className="font-sans text-base text-white/70 leading-relaxed">
                    Learn how ReadyAI empowers organizations in {currentIndustry.name.toLowerCase()} 
                    with enterprise-grade security, compliance-ready infrastructure, and AI solutions 
                    tailored to your regulatory landscape.
                  </p>
                </div>

                <div className="mt-10 relative z-10">
                  <Link
                    to={`/industry/${currentIndustry.id}`}
                    className="inline-flex items-center gap-2 bg-accent text-white px-7 py-3.5 rounded-lg font-sans font-semibold hover:bg-accent-dark transition-all duration-200 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
                  >
                    Explore Solutions
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </SlideAnimator>
  );
};

export default IndustriesShowcaseSection;

