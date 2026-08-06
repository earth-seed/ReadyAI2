import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Eased scroll animation: the browser's native smooth scroll is abrupt over
// long distances and can't be re-targeted without a visible jerk
function animateScrollTo(targetY: number) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 2) return;
  // Scale duration with distance, within comfortable bounds
  const duration = Math.min(1100, Math.max(450, Math.abs(distance) * 0.35));
  const start = performance.now();
  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (now: number) => {
    const progress = Math.min(1, (now - start) / duration);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function hashTargetY(hash: string): number | null {
  const element = document.querySelector(hash);
  if (!element) return null;
  // Apply scroll-margin-top manually: scrollIntoView doesn't reliably
  // honor it, and targets need clearance for the fixed header/banner
  const margin = parseFloat(getComputedStyle(element).scrollMarginTop) || 0;
  return element.getBoundingClientRect().top + window.scrollY - margin;
}

const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const t1 = setTimeout(() => {
        const top = hashTargetY(hash);
        if (top !== null) animateScrollTo(top);
      }, 0);
      // Re-align only if late-loading images/embeds above the target shifted
      // the layout — skip when already in place to avoid a second jolt
      const t2 = setTimeout(() => {
        const top = hashTargetY(hash);
        if (top !== null && Math.abs(window.scrollY - top) > 8) {
          animateScrollTo(top);
        }
      }, 1300);
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
