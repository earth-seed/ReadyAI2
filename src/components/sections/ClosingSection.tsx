import React from 'react';
import { motion } from 'framer-motion';
import SlideAnimator from '../../utils/SlideAnimator';

const ClosingSection: React.FC = () => {
  return (
    <SlideAnimator direction="up">
      <section className="relative bg-gradient-to-br from-primary via-primary-light to-primary-dark py-16 md:py-24 px-8 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-sans text-white text-lg md:text-xl lg:text-2xl leading-relaxed"
          >
            True transformation happens when teams, models, and governance align under one framework.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-white text-lg md:text-xl lg:text-2xl leading-relaxed mt-6 font-medium"
          >
            ReadyAI.dev gives you that framework — one secure platform for every model, every department, and every outcome.
          </motion.p>
        </div>
      </section>
    </SlideAnimator>
  );
};

export default ClosingSection;

