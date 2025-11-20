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
                <h2 className="font-heading text-3xl md:text-4xl font-normal text-white mb-6">
                  Ready to Take the Next Step?
                </h2>
                <p className="font-sans text-lg text-gray-300 mb-6 leading-relaxed">
                  Starting with AI or looking to formalize governance across your enterprise.
                  Whatever stage you are at, ReadyAI can help you. Select one of the steps below to secure AI in your workplace.
                </p>
                <h3 className="font-heading text-xl font-normal text-white mt-8 mb-4">Next Steps to Secure AI:</h3>
                <ul className="font-sans space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Book a Call with a Platform Guide to evaluate your current AI situation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Explore the platform with a Self-Guided Demo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Test and scale with confidence with a ReadyAI pilot (3–7 people)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Schedule a Strategy Session with our Executive Team</span>
                  </li>
                </ul>
                <p className="font-sans text-gray-300 mt-6 italic">
                  Let's build your AI foundation, securely, strategically, and at your pace
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