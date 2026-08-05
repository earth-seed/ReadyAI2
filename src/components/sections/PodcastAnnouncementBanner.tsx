import React from 'react';
import { Mic, ArrowRight } from 'lucide-react';

export const PODCAST_SPOTIFY_URL =
  'https://open.spotify.com/episode/4jZ5STH5Ka3eCtTsoO7Bax';

const PodcastAnnouncementBanner: React.FC = () => {
  return (
    <a
      href={PODCAST_SPOTIFY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="block mt-14 sticky top-14 sm:mt-16 sm:top-16 z-40 bg-gradient-to-r from-accent-dark via-accent to-accent-dark hover:from-accent hover:via-accent-light hover:to-accent transition-all duration-200 group shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        <div className="flex items-center justify-center gap-2 sm:gap-3 text-white text-center">
          <Mic className="hidden sm:block w-4 h-4 flex-shrink-0" />
          <p className="font-sans text-xs sm:text-sm font-semibold">
            <span className="hidden sm:inline">
              New Podcast — Responsible AI: Unmasked with Carol Eastman and Ashwin Rangan.
            </span>
            <span className="sm:hidden">New Podcast: Responsible AI, Unmasked.</span>{' '}
            <span className="underline underline-offset-2">Listen now</span>
          </p>
          <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </a>
  );
};

export default PodcastAnnouncementBanner;
