import React from 'react';
import CalendlySection from './CalendlySection';
import PageCTA from '../ui/PageCTA';
import SlideAnimator from '../../utils/SlideAnimator';

const CtaSection: React.FC = () => {
  return (
    <SlideAnimator direction="left">
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="lg:grid lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7 text-white">
                <p className="font-sans text-accent text-sm md:text-base uppercase tracking-widest mb-6">
                  Get Started
                </p>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal text-white mb-6">
                  Ready to Take the Next Step?
                </h2>
                <p className="font-sans text-base text-gray-300 mb-6 leading-relaxed">
                  Whether internal AI is just emerging or already embedded across the enterprise, leadership teams are being asked to bring clarity, structure, and governance to how it is used.
                </p>
                <p className="font-sans text-base text-gray-300 mb-6 leading-relaxed">
                  ReadyAI.dev supports organizations by helping leadership teams assess their current internal AI landscape and connect to a proven enterprise AI platform designed for secure, governed adoption, including AI built using low‑code and no‑code tools.
                </p>
                <h3 className="font-heading text-xl font-normal text-white mt-8 mb-4">Next Steps</h3>
                <ul className="font-sans space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Book a leadership conversation to review how internal AI is currently being used across your organization</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Explore the enterprise AI platform through a guided or self-guided demo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Run a small pilot (3–7 people) to understand fit, value, and governance considerations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Schedule a strategy session to align internal AI adoption with leadership, risk, and compliance expectations</span>
                  </li>
                </ul>
                <p className="font-sans text-gray-300 mt-6 italic">
                  Bring clarity to internal AI adoption by aligning leadership priorities, platform capability, and governance expectations.
                </p>
              </div>
              <div className="lg:col-span-5 mt-8 lg:mt-0">
                <CalendlySection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideAnimator>
  );
};

export default CtaSection;