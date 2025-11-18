import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import SolutionsPage from './pages/SolutionsPage';
import IndustryPage from './pages/IndustryPage';
import ContactPage from './pages/ContactPage';
import SearchResults from './pages/SearchResults';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import GdprPolicy from './pages/GdprPolicy';
import PricingPage from './pages/PricingPage';
import ResourcesPage from './pages/ResourcesPage';
import BlogPage from './pages/BlogPage';
import FAQPage from './pages/FaqPage';
import CookieConsent from './components/ui/CookieConsent';
import CTAManager from './components/ui/CTAManager';
import { usePerformance } from './hooks/usePerformance';
import Version from './pages/Version';
import InsightsPage from './pages/InsightsPage';
import ArticlePreview from './pages/ArticlePreview';
import AboutPage from './pages/AboutPage';
import ReferralsPage from './pages/ReferralsPage';
import AdminPage from './pages/AdminPage';

function App() {
  const { trackCustomMetric } = usePerformance();

  useEffect(() => {
    // Track initial page load
    const loadTime = performance.now();
    trackCustomMetric('InitialLoad', loadTime);

    // Track memory usage (Chrome-specific API)
    if ('memory' in performance && (performance as any).memory) {
      trackCustomMetric('HeapSize', (performance as any).memory.usedJSHeapSize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/solutions/:solutionId" element={<SolutionsPage />} />
            <Route path="/industry" element={<IndustryPage />} />
            <Route path="/industry/:industryId" element={<IndustryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/gdpr" element={<GdprPolicy />} />   
            <Route path="/plans-and-enterprise-options" element={<PricingPage />} />             
            <Route path="/plans-and-enterprise-options/:tierId" element={<PricingPage />} />         
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/insights" element={<InsightsPage />} />  
            <Route path="/insights/:articleName" element={<InsightsPage />} />
            <Route path="/preview" element={<ArticlePreview />} />
            <Route path="/about-us" element={<AboutPage />} />   
            <Route path="/referral/:referralCode" element={<ReferralsPage />} />   
            <Route path="/admin" element={<AdminPage />} />   
            <Route path="/version" element={<Version />} />
          </Routes>
        </main>
        <Footer />
        <CookieConsent />
        {/* Strategic popup focused on platform exploration */}
        <CTAManager 
          enableLeadCapture={false}
          enableScrollCTA={false}
          enableGatedContent={true}
          enablePlatformExploration={true}
          gatedContentConfig={{
            title: "AI Security Playbook",
            description: "Get our comprehensive guide to securing AI in your enterprise",
            downloadUrl: "/downloads/ai-security-playbook.pdf"
          }}
          platformExplorationConfig={{
            triggerDelay: 120, // 2 minutes (less annoying)
            scrollTrigger: 80 // 80% scroll (more engaged users)
          }}
          onTrack={(action, data) => {
            console.log('CTA Event:', action, data);
            // Add your analytics tracking here
          }}
        />
      </div>
    </Router>
  );
}

export default App;