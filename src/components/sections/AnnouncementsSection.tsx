import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Megaphone, Mic, CalendarDays } from 'lucide-react';
import SlideAnimator from '../../utils/SlideAnimator';
import {
  fetchEngagements,
  CATEGORY_LABELS,
  type ArticleCategory,
  type MappedArticle,
} from '../../utils/strapi';

const CATEGORY_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  announcement: Megaphone,
  speaking: Mic,
  event: CalendarDays,
};

function formatTimestamp(dateString: string): string {
  if (!dateString) return '';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

// Number of newest items to feature on the homepage
const FEATURED_COUNT = 3;

const AnnouncementsSection: React.FC = () => {
  const [items, setItems] = useState<MappedArticle[]>([]);

  useEffect(() => {
    let active = true;
    fetchEngagements()
      .then((engagements) => {
        if (active) setItems(engagements.slice(0, FEATURED_COUNT));
      })
      .catch((err) => {
        console.error('Failed to load announcements for homepage section:', err);
      });
    return () => {
      active = false;
    };
  }, []);

  // Don't render an empty block on the homepage if there's nothing to show yet
  if (items.length === 0) return null;

  return (
    <SlideAnimator direction="up">
      <section className="relative bg-white py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-8 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
          >
            <div className="text-center md:text-left">
              <p className="font-sans text-accent text-xs sm:text-sm md:text-base uppercase tracking-widest mb-4">
                Where to find us next
              </p>
              <h2 className="font-heading text-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal">
                Announcements & Events
              </h2>
            </div>

            <Link
              to="/announcements"
              className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-sans font-semibold hover:bg-primary-dark transition-all shadow-sm hover:shadow-md whitespace-nowrap"
            >
              View All
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Featured (newest) items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, idx) => {
              const Icon = CATEGORY_ICON[item.category] ?? Megaphone;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1 * idx }}
                >
                  <Link
                    to={`/insights/${item.slug}`}
                    className="group block h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    {item.imgURL && (
                      <div className="relative overflow-hidden">
                        <img
                          src={item.imgURL}
                          alt={item.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/90 text-white text-xs font-semibold">
                          <Icon className="w-3.5 h-3.5" />
                          {CATEGORY_LABELS[item.category as ArticleCategory]}
                        </span>
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{formatTimestamp(item.publicationDate)}</span>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-accent transition-colors duration-200 line-clamp-2">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-600 line-clamp-3">{item.description}</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile "View All" button */}
          <div className="mt-10 text-center md:hidden">
            <Link
              to="/announcements"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-sans font-semibold hover:bg-primary-dark transition-all shadow-sm"
            >
              View All
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </SlideAnimator>
  );
};

export default AnnouncementsSection;
