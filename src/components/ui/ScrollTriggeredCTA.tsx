import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp, Calendar, Download, Sparkles } from 'lucide-react';
import BookDemoCTA from './BookDemoCTA';
import GatedContentModal from './GatedContentModal';

interface ScrollTriggeredCTAProps {
  triggerPosition?: number; // scroll position to trigger
  ctaType?: 'demo' | 'download' | 'contact';
  title?: string;
  description?: string;
  gatedContent?: {
    title: string;
    description: string;
    downloadUrl?: string;
  };
  onTrack?: (action: string, data?: any) => void;
}

const ScrollTriggeredCTA: React.FC<ScrollTriggeredCTAProps> = ({
  triggerPosition = 0.6, // 60% of page height
  ctaType = 'demo',
  title = "Ready to Get Started?",
  description = "Take the next step in securing your AI operations.",
  gatedContent,
  onTrack
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showGatedModal, setShowGatedModal] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      
      if (scrollPercent >= triggerPosition && !isVisible) {
        setIsVisible(true);
        setIsAnimating(true);
        onTrack?.('scroll_cta_triggered', { triggerPosition, ctaType });
        
        // Add entrance animation
        setTimeout(() => {
          setIsAnimating(false);
        }, 500);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [triggerPosition, isVisible, ctaType, onTrack]);

  const handleCTAClick = (action: string) => {
    onTrack?.('scroll_cta_clicked', { action, ctaType });
    
    if (ctaType === 'download' && gatedContent) {
      setShowGatedModal(true);
    }
  };

  const handleGatedContentSubmit = (formData: any) => {
    onTrack?.('gated_content_accessed', { content: gatedContent?.title, email: formData.email });
  };

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={ctaRef}
        className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-500 ${
          isAnimating 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-4 opacity-0 scale-95'
        }`}
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 max-w-md mx-4 backdrop-blur-sm bg-white/95">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-dark rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">{title}</h3>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{description}</p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              {ctaType === 'demo' && (
                <BookDemoCTA
                  variant="primary"
                  size="md"
                  text="Book a Demo"
                  onTrack={handleCTAClick}
                  className="flex-1"
                />
              )}
              
              {ctaType === 'download' && gatedContent && (
                <button
                  onClick={() => handleCTAClick('download')}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-accent-dark text-white rounded-lg font-medium hover:from-accent-dark hover:to-accent shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  <Download className="w-4 h-4" />
                  Download Now
                </button>
              )}
              
              {ctaType === 'contact' && (
                <button
                  onClick={() => handleCTAClick('contact')}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg font-medium hover:from-primary-dark hover:to-primary shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  <Calendar className="w-4 h-4" />
                  Get in Touch
                </button>
              )}
            </div>
            
            {/* Dismiss button */}
            <button
              onClick={() => {
                setIsVisible(false);
                onTrack?.('scroll_cta_dismissed', { ctaType });
              }}
              className="mt-3 text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Not now
            </button>
          </div>
        </div>
      </div>

      {/* Gated Content Modal */}
      {showGatedModal && gatedContent && (
        <GatedContentModal
          isOpen={showGatedModal}
          onClose={() => setShowGatedModal(false)}
          title={gatedContent.title}
          description="Get instant access to this exclusive content"
          contentTitle={gatedContent.title}
          contentDescription={gatedContent.description}
          downloadUrl={gatedContent.downloadUrl}
          onFormSubmit={handleGatedContentSubmit}
          onTrack={onTrack}
        />
      )}
    </>
  );
};

export default ScrollTriggeredCTA;
