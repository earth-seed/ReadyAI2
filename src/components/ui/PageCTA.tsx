import React, { useState } from 'react';
import BookDemoCTA from './BookDemoCTA';
import GatedContentModal from './GatedContentModal';
import { Download, Calendar, ArrowRight, Sparkles } from 'lucide-react';

interface PageCTAProps {
  variant?: 'hero' | 'section' | 'footer' | 'inline';
  title?: string;
  description?: string;
  ctaText?: string;
  secondaryCtaText?: string;
  showSecondaryCta?: boolean;
  gatedContent?: {
    title: string;
    description: string;
    downloadUrl?: string;
  };
  onTrack?: (action: string, data?: any) => void;
}

const PageCTA: React.FC<PageCTAProps> = ({
  variant = 'section',
  title = "Ready to Secure Your AI Operations?",
  description = "Get started with ReadyAI and transform your enterprise AI strategy.",
  ctaText = "Book a Demo",
  secondaryCtaText = "Download Guide",
  showSecondaryCta = true,
  gatedContent,
  onTrack
}) => {
  const [showGatedModal, setShowGatedModal] = useState(false);

  const handleGatedContentClick = () => {
    if (gatedContent) {
      setShowGatedModal(true);
      onTrack?.('gated_content_clicked', { content: gatedContent.title });
    }
  };

  const handleFormSubmit = (formData: any) => {
    onTrack?.('gated_content_accessed', { content: gatedContent?.title, email: formData.email });
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'hero':
        return 'bg-gradient-to-br from-primary via-primary-light to-primary-dark text-white py-20';
      case 'section':
        return 'bg-gray-50 py-16';
      case 'footer':
        return 'bg-primary text-white py-12';
      case 'inline':
        return 'bg-white border border-gray-200 rounded-2xl p-8 shadow-lg';
      default:
        return 'bg-gray-50 py-16';
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case 'hero':
      case 'footer':
        return 'text-white';
      default:
        return 'text-gray-900';
    }
  };

  const getDescriptionStyles = () => {
    switch (variant) {
      case 'hero':
      case 'footer':
        return 'text-white/90';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <>
      <div className={`${getVariantStyles()} ${variant === 'inline' ? '' : 'w-full'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className={`text-3xl md:text-4xl font-semibold ${getTextStyles()}`}>
                {title}
              </h2>
            </div>
            
            <p className={`text-lg ${getDescriptionStyles()} mb-8 max-w-3xl mx-auto`}>
              {description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <BookDemoCTA
                variant={variant === 'hero' || variant === 'footer' ? 'secondary' : 'primary'}
                size="lg"
                text={ctaText}
                onTrack={onTrack}
                className="min-w-[200px]"
              />
              
              {showSecondaryCta && gatedContent && (
                <button
                  onClick={handleGatedContentClick}
                  className={`
                    min-w-[200px] inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all duration-200
                    ${variant === 'hero' || variant === 'footer' 
                      ? 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30' 
                      : 'bg-white text-primary hover:bg-gray-50 border border-primary shadow-lg hover:shadow-xl'
                    }
                  `}
                >
                  <Download className="w-5 h-5" />
                  {secondaryCtaText}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {variant === 'section' && (
              <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Free consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>No commitment</span>
                </div>
              </div>
            )}
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
          onFormSubmit={handleFormSubmit}
          onTrack={onTrack}
        />
      )}
    </>
  );
};

export default PageCTA;
