import React from 'react';
import SlideAnimator from '../../utils/SlideAnimator';
import ROICalculator from './ROICalculator';

const CalcSection: React.FC = () => {
  return (
    <SlideAnimator direction="left">
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Top Text Section */}
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              AI That Pays for Itself
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-6">
              AI should cut costs, not create chaos.
            </p>
            <p className="text-2xl font-semibold text-accent mb-4">
              $30 per user, per month
            </p>
            <ul className="space-y-2 text-lg text-gray-600">
              <li>✅ Unlimited agents + every LLM included</li>
              <li>✅ Predictable pricing. Proven savings.</li>
            </ul>
          </div>

          {/* ROI Calculator Section */}
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 p-12 items-start shadow-xl rounded-2xl bg-white">
            <div className="lg:col-span-7">
              <h3 className="text-2xl font-bold text-primary mb-6">
                Calculate Your Potential Savings
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                No matter your industry, the platform can help you reduce costs while expanding AI capabilities. 
                Use our ROI calculator to see how much you could save by switching to our platform.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                A fixed price of $30 per user per month provides access to all platform features, 
                including unlimited AI agents, all supported LLMs, and our comprehensive management tools.
              </p>
            </div>
            <div className="lg:col-span-5 mt-8 lg:mt-0">
              <ROICalculator />
            </div>
          </div>
        </div>
      </div>
    </SlideAnimator>
  );
};

export default CalcSection;
