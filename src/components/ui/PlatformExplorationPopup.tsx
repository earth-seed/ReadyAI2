import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Sparkles, Shield, Users, CheckCircle } from 'lucide-react';
import Button from './Button';

interface PlatformExplorationPopupProps {
  triggerDelay?: number; // seconds before showing
  scrollTrigger?: number; // scroll percentage to trigger
  onTrack?: (action: string, data?: any) => void;
}

const PlatformExplorationPopup: React.FC<PlatformExplorationPopupProps> = ({
  triggerDelay = 30, // 30 seconds default
  scrollTrigger = 60, // 60% scroll default
  onTrack
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('platform-exploration-popup-seen');
    if (hasSeenPopup) return;

    let timeoutId: NodeJS.Timeout;
    let scrollHandler: () => void;

    // Time-based trigger
    if (triggerDelay > 0) {
      timeoutId = setTimeout(() => {
        showPopup();
      }, triggerDelay * 1000);
    }

    // Scroll-based trigger
    if (scrollTrigger > 0) {
      scrollHandler = () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent >= scrollTrigger) {
          showPopup();
        }
      };
      window.addEventListener('scroll', scrollHandler);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (scrollHandler) window.removeEventListener('scroll', scrollHandler);
    };
  }, [triggerDelay, scrollTrigger]);

  const showPopup = () => {
    // Check if already visible or previously dismissed
    if (isVisible) return;
    const hasSeenPopup = localStorage.getItem('platform-exploration-popup-seen');
    if (hasSeenPopup) return;
    
    setIsAnimating(true);
    setIsVisible(true);
    onTrack?.('platform_exploration_popup_shown');
  };

  const hidePopup = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
    onTrack?.('platform_exploration_popup_closed');
  };

  const handleExploreClick = () => {
    onTrack?.('platform_exploration_clicked');
    // Redirect to the same link as the Explore Platform button in header
    window.open('https://devs.ai/signup?ref=sales%40readyai.dev', '_blank', 'noopener,noreferrer');
  };

  const handleDismiss = () => {
    localStorage.setItem('platform-exploration-popup-seen', 'true');
    hidePopup();
    onTrack?.('platform_exploration_dismissed');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isAnimating ? 'bg-opacity-30' : 'bg-opacity-0'
        }`}
        onClick={handleDismiss}
      />
      
      {/* Popup */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        isAnimating 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-8 opacity-0 scale-95'
      }`}>
        <div className="bg-white rounded-2xl shadow-lg max-w-sm w-80 border border-gray-100">
          {/* Header */}
          <div className="bg-gray-50 p-6 rounded-t-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-heading text-xl font-medium text-gray-900 mb-1">Ready to get started with ReadyAI?</h2>
                <p className="font-sans text-gray-600 text-sm">Secure your AI operations with enterprise-grade solutions</p>
              </div>
              <button
                onClick={handleDismiss}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1.5 transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                </div>
                <span className="font-sans text-sm text-gray-700">Free platform exploration</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                </div>
                <span className="font-sans text-sm text-gray-700">No commitment required</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleExploreClick}
                size="lg"
                isFullWidth
                className="font-sans font-medium"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <div className="text-center">
                <button
                  onClick={handleDismiss}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors font-sans"
                >
                  Not right now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlatformExplorationPopup;
