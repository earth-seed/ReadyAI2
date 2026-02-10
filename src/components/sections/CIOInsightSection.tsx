import React from 'react';
import { motion } from 'framer-motion';
import { Building2, CheckCircle2 } from 'lucide-react';
import SlideAnimator from '../../utils/SlideAnimator';

const CIOInsightSection: React.FC = () => {
  return (
    <SlideAnimator direction="up">
      <section className="relative bg-accent2-lightest py-16 sm:py-20 md:py-32 px-4 sm:px-6 md:px-8 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <p className="font-sans text-accent text-xs sm:text-sm md:text-base uppercase tracking-widest mb-4 sm:mb-6">
              Here's how that shift looks in practice
            </p>
            <h2 className="font-heading text-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal mb-4 sm:mb-6">
              CIO Insight: Healthcare Example
            </h2>
          </motion.div>

          {/* Main Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-primary via-primary-light to-primary-dark rounded-2xl shadow-2xl p-5 sm:p-8 md:p-12 max-w-5xl mx-auto"
          >
            <div className="flex items-start gap-3 sm:gap-4 mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
              </div>
              <div className="flex-1">
                <p className="font-sans text-white text-sm sm:text-base leading-relaxed">
                  A hospital CIO discovered five unconnected internal AI pilots running across departments — each using different models, data sources, and permissions. Patient data was at risk of exposure, compliance audits were stalling, and leadership had no clear view of how AI was being used.
                </p>
              </div>
            </div>

            <div className="border-t border-white/20 pt-6 sm:pt-8 mt-6 sm:mt-8">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="font-sans text-white text-sm sm:text-base leading-relaxed">
                    Within weeks of adopting an enterprise AI operating layer delivered through a proven global platform partner, models and workflows were consolidated into a single, governed internal AI environment.
                  </p>
                  <p className="font-sans text-white text-sm sm:text-base leading-relaxed mt-4">
                    The CIO gained clear visibility into AI usage, access to compliance reporting, and renewed confidence across clinical and administrative teams, moving the organization from fragmented experimentation to coordinated internal AI adoption.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </SlideAnimator>
  );
};

export default CIOInsightSection;

