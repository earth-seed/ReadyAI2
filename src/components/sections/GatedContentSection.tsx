import React, { useState } from 'react';
import { Download, FileText, Shield, ArrowRight } from 'lucide-react';
import GatedContentModal from '../ui/GatedContentModal';

const GatedContentSection: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState<{
    title: string;
    description: string;
    downloadUrl?: string;
  } | null>(null);

  const gatedContentItems = [
    {
      title: "AI Security Playbook",
      description: "Comprehensive guide to securing AI in your enterprise",
      downloadUrl: "/downloads/ai-security-playbook.pdf",
      icon: Shield
    },
    {
      title: "Enterprise AI Governance Framework",
      description: "Step-by-step framework for implementing AI governance",
      downloadUrl: "/downloads/ai-governance-framework.pdf",
      icon: FileText
    }
  ];

  const handleContentClick = (content: typeof gatedContentItems[0]) => {
    setSelectedContent({
      title: content.title,
      description: content.description,
      downloadUrl: content.downloadUrl
    });
    setShowModal(true);
  };

  return (
    <>
      <div className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="font-sans text-accent text-sm md:text-base uppercase tracking-widest mb-6">
              Enterprise Resources
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal text-primary mb-6">
              Exclusive Content for AI Leaders
            </h2>
            <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Download proven frameworks and strategic guides designed for enterprise decision-makers
            </p>
          </div>

          {/* Resource Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {gatedContentItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="relative bg-gradient-to-br from-accent2-lightest to-white border-2 border-gray-100 rounded-2xl p-8 hover:border-accent/30 hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
                  onClick={() => handleContentClick(item)}
                >
                  {/* Decorative background element */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors duration-300"></div>
                  
                  <div className="relative">
                    {/* Icon */}
                    <div className="w-14 h-14 bg-gradient-to-br from-accent to-accent-dark rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-heading text-2xl font-semibold text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                      {item.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="font-sans text-base text-gray-600 mb-6 leading-relaxed">
                      {item.description}
                    </p>
                    
                    {/* CTA */}
                    <div className="flex items-center text-accent font-sans font-semibold group-hover:gap-3 gap-2 transition-all duration-300">
                      <Download className="w-5 h-5" />
                      <span>Download Now</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Note */}
          <div className="text-center mt-12">
            <p className="font-sans text-sm text-gray-500 italic">
              Complimentary resources for qualified enterprise organizations
            </p>
          </div>
        </div>
      </div>

      {/* Gated Content Modal */}
      {showModal && selectedContent && (
        <GatedContentModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={selectedContent.title}
          description="Get instant access to this exclusive content"
          contentTitle={selectedContent.title}
          contentDescription={selectedContent.description}
          downloadUrl={selectedContent.downloadUrl}
          onFormSubmit={(formData) => {
            console.log('Gated content accessed:', formData);
            // Add your analytics tracking here
          }}
          onTrack={(action, data) => {
            console.log('Gated content event:', action, data);
            // Add your analytics tracking here
          }}
        />
      )}
    </>
  );
};

export default GatedContentSection;
