import React from 'react';
import { motion } from 'framer-motion';
// Re-enable these imports when restoring the CTA buttons below:
// import { ArrowRight, Play } from 'lucide-react';
// import { Link } from 'react-router-dom';
import SlideAnimator from '../../utils/SlideAnimator';

/**
 * Home page: featured announcement of Ash Rangan joining as Executive Board Member.
 * TODO: once his podcast episode is added to VideosPage, point the CTA at
 * its direct route (e.g. /videos/<podcast-id>) instead of /videos.
 */
const BoardMemberSection: React.FC = () => {
  return (
    <SlideAnimator direction="up">
      <section className="relative bg-accent2-lightest pt-8 sm:pt-10 md:pt-12 pb-12 sm:pb-14 md:pb-20 overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-8 sm:mb-10"
          >
            <p className="font-sans text-accent text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">
              Board Announcement
            </p>
            <h2 className="font-heading text-primary text-2xl sm:text-3xl md:text-4xl font-normal">
              When AI Becomes a Board-Level Priority, Experience Matters
            </h2>
          </motion.div>

          {/* Main Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl mx-auto"
          >
            <div className="grid lg:grid-cols-5 gap-0">
              {/* Photo Section */}
              <div className="lg:col-span-2 relative">
                <img
                  src="/assets/images/readyai-ash-rangan.jpg"
                  alt="Ashwin 'Ash' Rangan - Executive Board Member, ReadyAI"
                  className="w-full h-full object-cover min-h-[240px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>

              {/* Content Section */}
              <div className="lg:col-span-3 p-6 md:p-8">
                <div className="mb-4">
                  <h3 className="font-heading text-2xl md:text-3xl font-medium text-primary mb-2">
                    Ashwin “Ash” Rangan
                  </h3>
                  <p className="font-sans text-lg text-accent font-semibold">Executive Board Member</p>
                </div>

                {/* When restoring the CTAs, change this back to "space-y-4 mb-6" */}
                <div className="space-y-4">
                  <p className="font-sans text-gray-700 text-sm md:text-base leading-relaxed">
                    Ashwin “Ash” Rangan shapes ReadyAI’s strategic direction as Executive Board Member, bringing the judgment, perspective, and enterprise leadership that help organizations move on AI with clarity and confidence.
                  </p>

                  <p className="font-sans text-gray-700 text-sm md:text-base leading-relaxed">
                    Former CIO of Walmart, Bank of America, Rockwell International, and ICANN, current Board Advisor to Qtonic Quantum, and co-author of <em>Governance in the Age of Generative AI</em>, he helps leaders separate noise from what truly matters and act on AI with discipline, credibility, and speed.
                  </p>
                </div>

                {/* CTAs — temporarily removed; uncomment below (and the Link/Play/ArrowRight
                    imports at the top) to restore. Point the podcast button at the episode's
                    direct route (e.g. /videos/<podcast-id>) once it exists.
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/videos"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-sans font-semibold hover:bg-accent-dark transition-all shadow-md hover:shadow-lg"
                  >
                    <Play className="w-5 h-5" />
                    Listen to His New Podcast
                  </Link>
                  <Link
                    to="/about-us#leadership"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-sans font-semibold hover:bg-primary-dark transition-all shadow-md hover:shadow-lg"
                  >
                    Meet Our Leadership
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
                */}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </SlideAnimator>
  );
};

export default BoardMemberSection;
