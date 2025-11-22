import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import SlideAnimator from '../../utils/SlideAnimator';

const LeadershipSection: React.FC = () => {
  return (
    <SlideAnimator direction="up">
      <section className="relative bg-gradient-to-br from-primary via-primary-light to-primary-dark py-20 md:py-32 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <p className="font-sans text-accent text-sm md:text-base uppercase tracking-widest mb-6">
              Leadership & Vision
            </p>
            <h2 className="font-heading text-white text-3xl md:text-4xl lg:text-5xl font-normal">
              Meet Our Founder
            </h2>
          </motion.div>

          {/* Main Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="grid lg:grid-cols-5 gap-0">
              {/* Image Section */}
              <div className="lg:col-span-2 relative">
                <img 
                  src="/assets/images/readyai-carol-eastman.jpeg" 
                  alt="Carol Eastman - CEO & Founder of ReadyAI" 
                  className="w-full h-full object-cover min-h-[300px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>

              {/* Content Section */}
              <div className="lg:col-span-3 p-6 md:p-8">
                <div className="mb-4">
                  <h3 className="font-heading text-3xl md:text-4xl font-medium text-primary mb-2">
                    Carol Eastman
                  </h3>
                  <p className="font-sans text-xl text-accent font-semibold mb-3">CEO & Founder</p>
                  <a 
                    href="https://www.linkedin.com/in/carol-eastman/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-sans text-primary hover:text-accent transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    Connect on LinkedIn
                  </a>
                </div>

                <div className="space-y-4 mb-8">
                  <p className="font-sans text-gray-700 text-base md:text-lg leading-relaxed">
                    Carol Eastman is an accomplished technology entrepreneur and CEO with a career spanning multiple successful ventures in security, communications, and disruptive technologies. She has founded, scaled, and successfully exited companies to global enterprises—with a proven track record that validates her vision and execution.
                  </p>

                  <p className="font-sans text-gray-700 text-base md:text-lg leading-relaxed">
                    What sets Carol apart is her ability to identify emerging technologies at their inflection point and translate that foresight into actionable business strategy. She excels at mapping necessity, defining requirements, architecting rollout strategies, and driving adoption—consistently positioning her companies ahead of market curves and competitor responses.
                  </p>

                  <p className="font-sans text-gray-800 text-base md:text-lg leading-relaxed italic">
                    Under Carol's leadership, organizations gain more than a CEO—they gain a strategic architect who can anticipate disruption, operationalize innovation, and execute at the highest level.
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://calendly.com/carol-readyai/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white rounded-lg font-sans font-semibold hover:bg-accent-dark transition-all shadow-lg hover:shadow-xl"
                  >
                    <Calendar className="w-5 h-5" />
                    Book a Call with Carol
                  </a>
                  <Link 
                    to="/about-us#leadership"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-sans font-semibold hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl"
                  >
                    Learn More
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </SlideAnimator>
  );
};

export default LeadershipSection;

