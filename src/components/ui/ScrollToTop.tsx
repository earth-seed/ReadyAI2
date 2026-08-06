import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash (like #section), let the browser handle it
    if (hash) {
      const scrollToHash = () => {
        const element = document.querySelector(hash);
        if (element) {
          // Apply scroll-margin-top manually: scrollIntoView doesn't reliably
          // honor it, and targets need clearance for the fixed header/banner
          const margin = parseFloat(getComputedStyle(element).scrollMarginTop) || 0;
          const top = element.getBoundingClientRect().top + window.scrollY - margin;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      };
      // Scroll immediately, then re-align once late-loading images/embeds
      // above the target have settled the layout
      const t1 = setTimeout(scrollToHash, 0);
      const t2 = setTimeout(scrollToHash, 800);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    } else {
      // Otherwise, scroll to top
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;

