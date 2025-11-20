import React from 'react';
import { motion } from 'framer-motion';
import { Building2, CheckCircle2 } from 'lucide-react';
import SlideAnimator from '../../utils/SlideAnimator';

const CIOInsightSection: React.FC = () => {
  return (
    <SlideAnimator direction="up">
      <section className="relative bg-white py-20 md:py-32 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <p className="font-sans text-accent text-sm md:text-base uppercase tracking-widest mb-4">
              Here's how that shift looks in practice
            </p>
            <h2 className="font-heading text-primary text-3xl md:text-4xl font-normal mb-6">
              CIO Insight: Healthcare Example
            </h2>
          </motion.div>

          {/* Main Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-5xl mx-auto"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <p className="font-sans text-gray-700 text-base md:text-lg leading-relaxed">
                  A hospital CIO discovered five unconnected internal AI pilots running across departments — each using different models, data sources, and permissions. Patient data was at risk of exposure, compliance audits were stalling, and leadership had no clear view of how AI was being used.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8 mt-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-sans text-gray-700 text-base md:text-lg leading-relaxed">
                    Within weeks of moving to ReadyAI.dev's AI operating layer, every model and workflow was unified under one secure workspace. The CIO gained full visibility, automated compliance reporting, and restored confidence across clinical and administrative teams — transforming AI chaos into coordinated intelligence.
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

