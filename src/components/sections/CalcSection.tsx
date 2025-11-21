import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingDown, Zap } from 'lucide-react';
import ROICalculator from './ROICalculator';

const CalcSection: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-primary via-primary-light to-primary-dark py-20 md:py-32 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">

        {/* Top Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-accent text-sm md:text-base uppercase tracking-widest mb-6">
            Smart Investment
          </p>
          <h2 className="font-heading text-white text-3xl md:text-4xl lg:text-5xl font-normal mb-6 leading-tight">
            AI That Pays for Itself
          </h2>
          <p className="font-sans text-gray-300 text-base mb-8 max-w-3xl mx-auto leading-relaxed">
            AI should cut costs, not create chaos.
          </p>
          
          {/* Price Highlight */}
          <div className="inline-block bg-accent/10 border border-accent/30 rounded-2xl px-8 py-6 backdrop-blur-sm mb-8">
            <div className="font-heading text-accent text-4xl md:text-5xl font-normal mb-2">
              $30 <span className="text-2xl text-gray-400">per user/month</span>
            </div>
          </div>

          {/* Feature Bullets */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              <span className="font-sans text-base md:text-lg">Unlimited agents + every LLM included</span>
            </div>
            <div className="hidden sm:block text-gray-600">•</div>
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-accent" />
              <span className="font-sans text-base md:text-lg">Predictable pricing. Proven savings.</span>
            </div>
          </div>
        </motion.div>

        {/* ROI Calculator Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 p-8 md:p-12">
            <div className="lg:col-span-7 mb-8 lg:mb-0">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading text-primary text-xl md:text-2xl font-normal">
                  Calculate Your Potential Savings
                </h3>
              </div>
              
              <div className="space-y-4">
                <p className="font-sans text-primary-light text-base leading-relaxed">
                  No matter your industry, our platform can help you reduce costs while expanding AI capabilities. 
                  Use our ROI calculator to see how much you could save by switching to ReadyAI.
                </p>
                <p className="font-sans text-primary-light text-base leading-relaxed">
                  A fixed price of <span className="font-semibold text-accent">$30 per user per month</span> provides access to all platform features, 
                  including unlimited AI agents, all supported LLMs, and our comprehensive management tools.
                </p>

                {/* Key Benefits */}
                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'No hidden fees or usage charges',
                    'Access to 30+ premium LLMs',
                    'Unlimited AI agent creation',
                    'Enterprise-grade security included'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-sans text-primary-light text-sm md:text-base">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <ROICalculator />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CalcSection;
