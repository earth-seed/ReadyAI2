import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { getFirestore, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { app } from '../../middleware/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import SlideAnimator from '../../utils/SlideAnimator';

const db = getFirestore(app);

type Article = {
  id: string;
  title: string;
  url: string;
  imgURL: string;
  description: string;
  timestamp: any;
};

const BlogShowcaseSection: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const q = query(
          collection(db, 'articles'),
          orderBy('timestamp', 'desc'),
          limit(6)
        );
        const snapshot = await getDocs(q);
        const docs: Article[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Article[];
        setArticles(docs);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch articles:', err);
        setIsLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const visibleArticles = 2; // Show 2 articles at a time
  const maxIndex = Math.max(0, articles.length - visibleArticles);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  if (isLoading) {
    return (
      <section className="bg-accent2-lightest py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-accent border-r-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return null; // Don't show section if no articles
  }

  return (
    <SlideAnimator direction="up">
      <section className="bg-white py-24 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-normal text-primary mb-3">
                Latest Insights
              </h2>
              <p className="font-sans text-lg text-primary-light max-w-2xl">
                Expert perspectives on AI adoption, security, and enterprise transformation
              </p>
            </div>

            {/* Navigation Arrows */}
            <div className="hidden md:flex gap-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  currentIndex === 0
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                    : 'border-accent text-accent hover:bg-accent hover:text-white'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  currentIndex >= maxIndex
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                    : 'border-accent text-accent hover:bg-accent hover:text-white'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Articles Carousel */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="grid md:grid-cols-2 gap-8"
              >
                {articles.slice(currentIndex, currentIndex + visibleArticles).map((article) => (
                  <div
                    key={article.id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Image */}
                    {article.imgURL && (
                      <div className="relative h-48 overflow-hidden bg-gray-100">
                        <img
                          src={article.imgURL}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-8">
                      <div className="inline-block px-3 py-1 bg-accent/10 rounded-full mb-4">
                        <span className="font-sans text-xs uppercase tracking-wider text-accent font-medium">
                          Insights
                        </span>
                      </div>

                      <h3 className="font-heading text-2xl font-normal text-primary mb-4 leading-snug line-clamp-2 group-hover:text-accent transition-colors duration-200">
                        {article.title}
                      </h3>

                      {article.description && (
                        <p className="font-sans text-base text-primary-light mb-6 line-clamp-3">
                          {article.description}
                        </p>
                      )}

                      <Link
                        to={`/insights/${article.url}`}
                        className="inline-flex items-center gap-2 font-sans text-accent font-medium hover:gap-3 transition-all duration-200"
                      >
                        Read Article
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex md:hidden justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'w-8 bg-accent'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center mt-12">
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-sans font-semibold hover:bg-primary-dark transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              View All Insights
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </SlideAnimator>
  );
};

export default BlogShowcaseSection;

