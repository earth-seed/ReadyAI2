import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowRight } from 'lucide-react';
import SlideAnimator from '../../utils/SlideAnimator';
import BenMarshallArticleOverlay from '../ui/BenMarshallArticleOverlay';

/**
 * Home page: "Enterprise Internal AI Licensing in Focus" — standalone section.
 * Opens the article in an overlay (no navigation away).
 */
const BenMarshallArticleSection: React.FC = () => {
  const [overlayOpen, setOverlayOpen] = useState(false);

  return (
    <>
      <SlideAnimator direction="up">
        <section className="bg-gradient-to-br from-primary via-primary-light to-primary-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 md:py-20">
            <div className="max-w-4xl mx-auto text-center">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="font-sans text-accent text-xs sm:text-sm uppercase tracking-widest mb-4 sm:mb-5"
              >
                Trusted perspective
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-heading text-2xl sm:text-3xl md:text-4xl font-normal text-white mb-3 sm:mb-4"
              >
                Enterprise Internal AI Licensing in Focus
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-sans text-sm sm:text-base text-white/80 mb-8"
              >
                By Ben Marshall, Founder & CEO, The IT Strategists
              </motion.p>
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <button
                  type="button"
                  onClick={() => setOverlayOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-sans font-medium text-primary bg-white hover:bg-gray-100 transition-colors shadow-sm hover:shadow-md"
                >
                  <FileText className="w-5 h-5" />
                  Read the document
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          </div>
        </section>
      </SlideAnimator>

      <BenMarshallArticleOverlay isOpen={overlayOpen} onClose={() => setOverlayOpen(false)} />
    </>
  );
};

export default BenMarshallArticleSection;
