import React from 'react';
import { motion } from 'framer-motion';
import SlideAnimator from '../../utils/SlideAnimator';

const Banner1Section = () => {
  const comparisonData = [
    {
      category: 'Data Protection',
      consumer: 'Shared, public data environments',
      readyai: 'Private, compliant workspaces for every team'
    },
    {
      category: 'Model Access',
      consumer: 'One AI model at a time',
      readyai: 'Every major LLM — one secure platform, one price'
    },
    {
      category: 'Governance',
      consumer: 'Minimal visibility or policy control',
      readyai: 'Full audit trails, admin oversight, and granular permissions'
    },
    {
      category: 'Scalability',
      consumer: 'Personal productivity tools',
      readyai: 'Enterprise-wide orchestration and agent deployment'
    },
    {
      category: 'Cost Model',
      consumer: 'Variable usage fees',
      readyai: 'One predictable monthly fee — unlimited agents and models'
    }
  ];

  return (
    <SlideAnimator direction="up">
      <div className="bg-accent2-lightest pt-20 md:pt-28 pb-16 md:pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            {/* Gold Label */}
            <p className="font-sans text-accent text-sm md:text-base uppercase tracking-widest mb-6">
              Enterprise-Grade AI Governance
            </p>
            
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal text-primary mb-6">
              Why Enterprises Choose <span className="text-accent">ReadyAI.dev</span>
            </h2>
            <div className="max-w-5xl mx-auto px-4 space-y-4">
              <p className="font-sans text-base text-gray-700 leading-relaxed text-center">
                How many LLMs is your business running? Do you know?{' '}
                <span className="whitespace-nowrap">Shouldn't you?</span>
              </p>
              <p className="font-sans text-base text-gray-700 leading-relaxed text-center">
                Visibility defines control. Governance defines trust.{' '}
                <span className="text-accent font-semibold">ReadyAI.dev delivers both.</span>
              </p>
              <p className="font-sans text-base text-gray-700 leading-relaxed text-center">
                One platform to unify every model, every team, and every process.
              </p>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden mb-16">
            <div className="overflow-x-auto">
              <div className="min-w-full">
                {/* Table Header */}
                <div className="grid grid-cols-3 gap-8 px-10 py-8 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                  <div className="font-sans text-gray-900 font-semibold text-xs md:text-sm uppercase tracking-widest">
                    Feature
                  </div>
                  <div className="font-sans text-gray-600 font-semibold text-xs md:text-sm uppercase tracking-widest text-center">
                    Consumer AI Tools
                  </div>
                  <div className="font-sans text-gray-900 font-semibold text-xs md:text-sm uppercase tracking-widest text-center">
                    ReadyAI.dev
                  </div>
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-gray-100">
                  {comparisonData.map((row, index) => {
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="grid grid-cols-3 gap-8 px-10 py-8 hover:bg-accent2-lightest/30 transition-all duration-300 group"
                      >
                        <div className="flex items-center">
                          <div className="font-sans text-primary font-semibold text-base md:text-lg">
                            {row.category}
                          </div>
                        </div>
                        <div className="font-sans text-gray-600 text-sm md:text-base text-center flex items-center justify-center">
                          {row.consumer}
                        </div>
                        <div className="font-sans text-primary text-sm md:text-base text-center font-semibold flex items-center justify-center group-hover:text-accent transition-colors">
                          {row.readyai}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="text-center max-w-4xl mx-auto">
            <p className="font-sans text-gray-700 text-lg md:text-xl leading-relaxed font-light">
              ReadyAI.dev gives enterprises a governed foundation for AI. <span className="font-semibold text-gray-900">Every model, every team</span>, fully compliant and auditable.
            </p>
          </div>
        </div>
      </div>
    </SlideAnimator>
  );
};

export default Banner1Section;
