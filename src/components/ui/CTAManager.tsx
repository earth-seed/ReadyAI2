import React, { useState, useEffect } from 'react';
import BookDemoCTA from './BookDemoCTA';
import GatedContentModal from './GatedContentModal';
import LeadCapturePopup from './LeadCapturePopup';
import ScrollTriggeredCTA from './ScrollTriggeredCTA';
import PlatformExplorationPopup from './PlatformExplorationPopup';

interface CTAManagerProps {
  enableLeadCapture?: boolean;
  enableScrollCTA?: boolean;
  enableGatedContent?: boolean;
  enablePlatformExploration?: boolean;
  leadCaptureConfig?: {
    triggerDelay?: number;
    scrollTrigger?: number;
    showOnExit?: boolean;
  };
  scrollCTAConfig?: {
    triggerPosition?: number;
    ctaType?: 'demo' | 'download' | 'contact';
  };
  gatedContentConfig?: {
    title: string;
    description: string;
    downloadUrl?: string;
  };
  platformExplorationConfig?: {
    triggerDelay?: number;
    scrollTrigger?: number;
  };
  onTrack?: (action: string, data?: any) => void;
}

const CTAManager: React.FC<CTAManagerProps> = ({
  enableLeadCapture = false,
  enableScrollCTA = false,
  enableGatedContent = true,
  enablePlatformExploration = true,
  leadCaptureConfig = {
    triggerDelay: 15, // 15 seconds
    scrollTrigger: 40, // 40% scroll
    showOnExit: true
  },
  scrollCTAConfig = {
    triggerPosition: 0.7, // 70% of page
    ctaType: 'demo'
  },
  gatedContentConfig,
  platformExplorationConfig = {
    triggerDelay: 30, // 30 seconds
    scrollTrigger: 60 // 60% scroll
  },
  onTrack
}) => {
  const [showGatedModal, setShowGatedModal] = useState(false);
  const [gatedContent, setGatedContent] = useState(gatedContentConfig);

  // Track CTA interactions
  const handleTrack = (action: string, data?: any) => {
    onTrack?.(action, data);
    
    // Log to console for debugging (remove in production)
    console.log('CTA Event:', action, data);
  };

  // Handle gated content access
  const handleGatedContentAccess = (contentTitle: string) => {
    setGatedContent({
      title: contentTitle,
      description: "Get instant access to this exclusive content",
      downloadUrl: gatedContentConfig?.downloadUrl
    });
    setShowGatedModal(true);
    handleTrack('gated_content_requested', { content: contentTitle });
  };

  // Handle form submissions
  const handleFormSubmit = (formData: any, source: string) => {
    handleTrack('form_submitted', { source, email: formData.email });
    
    // You can add additional processing here, such as:
    // - Sending to CRM
    // - Triggering email sequences
    // - Analytics tracking
  };

  return (
    <>
      {/* Lead Capture Popup */}
      {enableLeadCapture && (
        <LeadCapturePopup
          triggerDelay={leadCaptureConfig.triggerDelay}
          scrollTrigger={leadCaptureConfig.scrollTrigger}
          showOnExit={leadCaptureConfig.showOnExit}
          onTrack={handleTrack}
          onFormSubmit={(formData) => handleFormSubmit(formData, 'lead-capture-popup')}
        />
      )}

      {/* Scroll Triggered CTA */}
      {enableScrollCTA && (
        <ScrollTriggeredCTA
          triggerPosition={scrollCTAConfig.triggerPosition}
          ctaType={scrollCTAConfig.ctaType}
          gatedContent={gatedContent}
          onTrack={handleTrack}
        />
      )}

      {/* Gated Content Modal */}
      {enableGatedContent && gatedContent && (
        <GatedContentModal
          isOpen={showGatedModal}
          onClose={() => setShowGatedModal(false)}
          title={gatedContent.title}
          description="Get instant access to this exclusive content"
          contentTitle={gatedContent.title}
          contentDescription={gatedContent.description}
          downloadUrl={gatedContent.downloadUrl}
          onFormSubmit={(formData) => handleFormSubmit(formData, 'gated-content')}
          onTrack={handleTrack}
        />
      )}

      {/* Platform Exploration Popup */}
      {enablePlatformExploration && (
        <PlatformExplorationPopup
          triggerDelay={platformExplorationConfig.triggerDelay}
          scrollTrigger={platformExplorationConfig.scrollTrigger}
          onTrack={handleTrack}
        />
      )}
    </>
  );
};

export default CTAManager;
