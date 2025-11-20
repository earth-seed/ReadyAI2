import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SlideAnimator from '../../utils/SlideAnimator';

const Banner2Section = () => {
  return (
    <SlideAnimator direction="up">
      <section className="relative bg-accent2-lightest py-20 md:py-32 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-normal text-primary mb-6 leading-tight">
              From Chatbots to Intelligent Agents
            </h2>
            <p className="font-sans text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
              The next generation of AI isn't reactive — it's autonomous.
            </p>
            <p className="font-sans text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-12">
              Intelligent agents can analyze, decide, and act — but only when built on a governed, compliant framework.
            </p>
            <p className="font-sans text-lg md:text-xl text-gray-800 max-w-4xl mx-auto leading-relaxed font-semibold">
              ReadyAI.dev delivers that architecture: one secure platform where innovation scales with visibility, trust, and control.
            </p>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center"
          >
            <p className="font-sans text-gray-700 text-lg md:text-xl mb-8 max-w-3xl mx-auto">
              Build your enterprise AI ecosystem on a foundation built for control, confidence, and scale.
            </p>
            <a
              href="https://devs.ai/signup?ref=sales%40readyai.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-lg font-sans font-semibold hover:bg-accent-dark transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 text-lg"
            >
              Explore the ReadyAI.dev Platform
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </SlideAnimator>
  );
};

export default Banner2Section;
