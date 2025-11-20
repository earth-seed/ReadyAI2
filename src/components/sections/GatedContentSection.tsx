import React, { useState } from 'react';
import { Download, FileText, Shield, Users, ArrowRight } from 'lucide-react';
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
      icon: Shield,
      color: "bg-blue-500"
    },
    {
      title: "Enterprise AI Governance Framework",
      description: "Step-by-step framework for implementing AI governance",
      downloadUrl: "/downloads/ai-governance-framework.pdf",
      icon: FileText,
      color: "bg-green-500"
    },
    {
      title: "AI ROI Calculator",
      description: "Interactive tool to calculate AI implementation ROI",
      downloadUrl: "/downloads/ai-roi-calculator.xlsx",
      icon: Users,
      color: "bg-purple-500"
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
      <div className="bg-accent2-lightest py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-gray-900 mb-6">
              Exclusive Resources
            </h2>
            <p className="font-sans text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Access our premium content library designed specifically for enterprise AI leaders. 
              Get instant access to proven frameworks, tools, and strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gatedContentItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-200 cursor-pointer group"
                  onClick={() => handleContentClick(item)}
                >
                  <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="font-heading text-xl font-medium text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  
                  <p className="font-sans text-gray-600 mb-6 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center text-primary font-sans font-medium group-hover:text-primary-dark transition-colors">
                    <Download className="w-4 h-4 mr-2" />
                    <span>Get Access</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <p className="text-sm text-gray-500">
              All resources are free for qualified enterprise prospects
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
