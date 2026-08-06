import React from 'react';
import { motion } from 'framer-motion';
import { Mic, ExternalLink } from 'lucide-react';
import SlideAnimator from '../../utils/SlideAnimator';
import { PODCAST_SPOTIFY_URL } from './PodcastAnnouncementBanner';

const SPOTIFY_EMBED_URL =
  'https://open.spotify.com/embed/episode/4jZ5STH5Ka3eCtTsoO7Bax/video';

/**
 * Home page: featured podcast episode with embedded Spotify player.
 */
const PodcastSection: React.FC = () => {
  return (
    <SlideAnimator direction="up">
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left - Copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4 sm:mb-5">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Mic className="w-5 h-5 text-accent-dark" />
                </div>
                <p className="font-sans text-accent text-xs sm:text-sm uppercase tracking-widest">
                  Featured Podcast
                </p>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-normal text-primary mb-4">
                Responsible AI: Unmasked
              </h2>
              <p className="font-sans text-sm sm:text-base text-primary-light leading-relaxed mb-3">
                With Carol Eastman, CEO &amp; Ashwin Rangan, Executive Board Member
              </p>
              <p className="font-sans text-sm sm:text-base text-primary-light leading-relaxed mb-6">
                A candid conversation on what responsible AI really takes inside the
                enterprise — governance, security, and how leadership teams can adopt AI
                with confidence.
              </p>
              <a
                href={PODCAST_SPOTIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-sans font-semibold hover:bg-accent-dark transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Listen on Spotify
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Right - Spotify player */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <iframe
                  src={SPOTIFY_EMBED_URL}
                  title="Responsible AI: Unmasked with Carol Eastman and Ashwin Rangan"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="w-full aspect-video border-0"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </SlideAnimator>
  );
};

export default PodcastSection;
