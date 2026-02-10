import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SlideAnimator from '../../utils/SlideAnimator';

const Banner2Section = () => {
  return (
    <SlideAnimator direction="up">
      <section className="relative bg-accent2-lightest py-20 md:py-32 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-10"
          >
            {/* Gold Label */}
            <p className="font-sans text-accent text-sm md:text-base uppercase tracking-widest mb-6">
              The Future of Enterprise AI
            </p>
            
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal text-primary leading-tight">
              From Chatbots to Intelligent Agents
            </h2>
          </motion.div>

          {/* Main Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-accent2-lightest/50 backdrop-blur-sm rounded-[3rem] border border-accent/10 p-12 md:p-16 shadow-lg text-center">
              {/* Main Message - Clean & Simple */}
              <div className="space-y-6">
                <p className="font-sans text-lg md:text-xl text-gray-700 leading-relaxed">
                  The next generation of AI isn't reactive — <span className="font-bold text-gray-900">it's autonomous.</span>
                </p>
                
                <p className="font-sans text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                  Intelligent agents can analyze, decide, and act — but only when built on a governed, compliant framework.
                </p>
                
                <p className="font-sans text-lg md:text-xl text-gray-900 leading-relaxed font-bold">
                  ReadyAI.dev delivers that architecture — <span className="text-accent">one secure platform</span> for complete control.
                </p>
                
                <div className="pt-4">
                  <a
                    href="https://devs.ai/signup?ref=sales%40readyai.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-accent text-white px-10 py-5 rounded-xl font-sans font-semibold hover:bg-accent-dark transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
                  >
                    Explore the Enterprise AI Platform
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </SlideAnimator>
  );
};

export default Banner2Section;
