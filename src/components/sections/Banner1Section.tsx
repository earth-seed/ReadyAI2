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
      <div className="bg-accent2-lightest pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            {/* Gold Label */}
            <p className="font-sans text-accent text-xs sm:text-sm md:text-base uppercase tracking-widest mb-4 sm:mb-6">
              Enterprise-Grade AI Governance
            </p>
            
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-primary mb-4 sm:mb-6">
              Why Enterprises Work With <span className="text-accent">ReadyAI.dev</span>
            </h2>
            <div className="max-w-5xl mx-auto px-2 sm:px-4 space-y-3 sm:space-y-4">
              <p className="font-sans text-base text-gray-700 leading-relaxed text-center">
                How many LLMs is your organization already using?
              </p>
              <p className="font-sans text-base text-gray-700 leading-relaxed text-center">
                As internal AI adoption spreads across teams, visibility becomes essential. Without a clear view of models, access, and usage, governance discussions are built on assumptions rather than facts.
              </p>
              <p className="font-sans text-base text-gray-700 leading-relaxed text-center">
                Enterprise AI platforms provide the technical controls required to govern internal AI at scale. Delivered through a globally recognized, multi‑billion‑dollar cybersecurity platform partner, the enterprise AI platform gives leadership teams the ability to see, manage, and apply those controls consistently as usage expands across the organization, using low‑code and no‑code tools.
              </p>
              <p className="font-sans text-base text-gray-700 leading-relaxed text-center font-semibold">
                <span className="text-accent">Organizations can eliminate individual employee LLM accounts entirely.</span>{' '}
                Internal AI access, governance, and usage monitoring are bundled into a single, predictable subscription, replacing fragmented licenses and separate oversight costs with one controlled enterprise model.
              </p>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden mb-16">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <div className="min-w-full">
                {/* Table Header */}
                <div className="grid gap-2 px-10 py-8 bg-gradient-to-r from-primary via-primary-light to-primary-dark border-b border-primary-dark" style={{ gridTemplateColumns: '200px 1fr 1fr' }}>
                  <div className="font-sans text-white font-semibold text-xs md:text-sm uppercase tracking-widest">
                    Feature
                  </div>
                  <div className="font-sans text-white/90 font-semibold text-xs md:text-sm uppercase tracking-widest text-center">
                    Consumer AI Tools
                  </div>
                  <div className="font-sans text-accent font-semibold text-xs md:text-sm uppercase tracking-widest text-center">
                    Global AI Platform for Enterprise&apos;s Internal Teams
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
                        className="grid gap-2 px-10 py-8 hover:bg-accent2-lightest/30 transition-all duration-300 group"
                        style={{ gridTemplateColumns: '200px 1fr 1fr' }}
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

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-100">
              {comparisonData.map((row, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="p-4 sm:p-6 space-y-3 sm:space-y-4"
                >
                  <h3 className="font-sans text-primary font-semibold text-base sm:text-lg mb-3">
                    {row.category}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                      <div className="text-xs uppercase tracking-wide text-gray-500 mb-2 font-semibold">
                        Consumer AI Tools
                      </div>
                      <div className="font-sans text-gray-700 text-sm leading-relaxed">
                        {row.consumer}
                      </div>
                    </div>
                    
                    <div className="bg-accent/5 rounded-lg p-3 sm:p-4 border border-accent/20">
                      <div className="text-xs uppercase tracking-wide text-accent mb-2 font-semibold">
                        Global AI Platform for Enterprise&apos;s Internal Teams
                      </div>
                      <div className="font-sans text-primary text-sm font-semibold leading-relaxed">
                        {row.readyai}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Closing Statement */}
          <div className="text-center max-w-4xl mx-auto">
            <p className="font-sans text-gray-700 text-lg md:text-xl leading-relaxed font-light">
              Enterprises access a governed internal AI foundation through a proven enterprise AI platform, with ReadyAI.dev supporting leadership teams in applying it consistently across the organization.
            </p>
          </div>
        </div>
      </div>
    </SlideAnimator>
  );
};

export default Banner1Section;
