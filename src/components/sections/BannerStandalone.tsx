import React from 'react';
import { motion } from 'framer-motion';
import SlideAnimator from '../../utils/SlideAnimator';

const BannerStandalone: React.FC = () => {
  return (
    <SlideAnimator direction="up">
      <section className="bg-gradient-to-r from-primary via-primary-light to-primary-dark py-12 md:py-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-white text-2xl md:text-3xl lg:text-4xl font-normal leading-tight"
          >
            It's not a chatbot. It's your enterprise's <span className="text-accent">AI operating layer</span>.
          </motion.p>
        </div>
      </section>
    </SlideAnimator>
  );
};

export default BannerStandalone;

