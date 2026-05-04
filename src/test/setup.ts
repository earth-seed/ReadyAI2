import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// jsdom does not implement IntersectionObserver, which framer-motion's
// whileInView and useInView rely on. A no-op stub is enough for tests.
class IntersectionObserverStub {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
  root = null;
  rootMargin = '';
  thresholds = [];
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverStub);
