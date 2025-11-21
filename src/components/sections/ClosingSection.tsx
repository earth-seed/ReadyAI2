import React from 'react';
import { motion } from 'framer-motion';
import SlideAnimator from '../../utils/SlideAnimator';

const ClosingSection: React.FC = () => {
  return (
    <SlideAnimator direction="up">
      <section className="relative bg-accent2-lightest py-16 md:py-20 px-8 overflow-hidden border-t border-b border-accent/10">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-sans text-gray-700 text-lg md:text-xl leading-relaxed"
          >
            True transformation happens when teams, models, and governance align under one framework.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-gray-900 text-lg md:text-xl leading-relaxed font-semibold"
          >
            ReadyAI.dev gives you that framework — <span className="text-accent">one secure platform</span> for every model, every department, and every outcome.
          </motion.p>
        </div>
      </section>
    </SlideAnimator>
  );
};

export default ClosingSection;

