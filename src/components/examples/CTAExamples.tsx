import React from 'react';
import BookDemoCTA from '../ui/BookDemoCTA';
import PageCTA from '../ui/PageCTA';
import GatedContentModal from '../ui/GatedContentModal';
import LeadCapturePopup from '../ui/LeadCapturePopup';
import ScrollTriggeredCTA from '../ui/ScrollTriggeredCTA';

// Example usage of all CTA components
const CTAExamples: React.FC = () => {
  const handleTrack = (action: string, data?: any) => {
    console.log('CTA Event:', action, data);
    // Add your analytics tracking here
  };

  return (
    <div className="space-y-16 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">CTA Component Examples</h1>
        
        {/* Book Demo CTA Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Book Demo CTA Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-4">Primary</h3>
              <BookDemoCTA
                variant="primary"
                size="lg"
                text="Book a Demo"
                onTrack={handleTrack}
              />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium mb-4">Secondary</h3>
              <BookDemoCTA
                variant="secondary"
                size="md"
                text="Schedule Call"
                onTrack={handleTrack}
              />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium mb-4">Outline</h3>
              <BookDemoCTA
                variant="outline"
                size="sm"
                text="Get Started"
                onTrack={handleTrack}
              />
            </div>
          </div>
        </section>

        {/* Page CTA Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Page CTA Variants</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Hero CTA</h3>
              <PageCTA
                variant="hero"
                title="Transform Your AI Strategy"
                description="Get started with ReadyAI and secure your enterprise AI operations."
                ctaText="Book a Demo"
                secondaryCtaText="Download Guide"
                showSecondaryCta={true}
                gatedContent={{
                  title: "AI Security Playbook",
                  description: "Comprehensive guide to securing AI in your enterprise",
                  downloadUrl: "/downloads/ai-security-playbook.pdf"
                }}
                onTrack={handleTrack}
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Section CTA</h3>
              <PageCTA
                variant="section"
                title="Ready to Get Started?"
                description="Take the next step in securing your AI operations."
                ctaText="Book a Demo"
                secondaryCtaText="Download Guide"
                showSecondaryCta={true}
                onTrack={handleTrack}
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Inline CTA</h3>
              <PageCTA
                variant="inline"
                title="Get Your Free Consultation"
                description="Speak with our AI security experts about your specific needs."
                ctaText="Book Now"
                showSecondaryCta={false}
                onTrack={handleTrack}
              />
            </div>
          </div>
        </section>

        {/* Interactive Elements */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Interactive Elements</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Scroll Triggered CTA</h3>
              <p className="text-gray-600 mb-4">
                This CTA will appear when you scroll 70% down the page.
              </p>
              <ScrollTriggeredCTA
                triggerPosition={0.7}
                ctaType="demo"
                title="Ready to Get Started?"
                description="Take the next step in securing your AI operations."
                onTrack={handleTrack}
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Lead Capture Popup</h3>
              <p className="text-gray-600 mb-4">
                This popup will appear after 15 seconds or when you scroll 40% down.
              </p>
              <LeadCapturePopup
                triggerDelay={15}
                scrollTrigger={40}
                showOnExit={true}
                title="Ready to Transform Your AI Strategy?"
                description="Get exclusive insights and a personalized consultation."
                ctaText="Get Started"
                onTrack={handleTrack}
              />
            </div>
          </div>
        </section>

        {/* Gated Content Example */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Gated Content Example</h2>
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">AI Security Playbook</h3>
            <p className="text-gray-600 mb-6">
              Get our comprehensive guide to securing AI in your enterprise. 
              This exclusive content is available to qualified leads only.
            </p>
            <button
              onClick={() => {
                // This would trigger the gated content modal
                console.log('Gated content clicked');
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              Access Content
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CTAExamples;
