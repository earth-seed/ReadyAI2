import React from 'react';
import { FileText, Check } from 'lucide-react';

const TermsOfService: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Terms of Service - ReadyAI';
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary via-primary-light to-primary-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <FileText className="h-7 w-7 text-white" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal text-white">
              Terms of Service
            </h1>
          </div>
          <p className="font-sans text-lg text-white/90 ml-16">
            Effective Date: May 1, 2025
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100">
          <div className="p-8 md:p-12 space-y-10">
            {/* Introduction Section */}
            <div className="space-y-4">
              <h2 className="font-heading text-3xl font-medium text-primary border-b border-gray-200 pb-4">
                Introduction
              </h2>
              <p className="font-sans text-lg text-gray-700 leading-relaxed">
                Welcome to ReadyAI a platform designed to provide information on an enterprise grade AI platform. 
                By accessing or using our website, you agree to be bound by these Terms of Service ("Terms"). 
                Please read them carefully.
              </p>
            </div>

            {/* Definitions Section */}
            <div className="space-y-4">
              <h2 className="font-heading text-3xl font-medium text-primary border-b border-gray-200 pb-4">
                1. Definitions
              </h2>
              <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 border border-gray-100">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-gray-700"><strong className="text-primary">Website:</strong> Refers to ReadyAI including all its subdomains and related services.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-gray-700"><strong className="text-primary">User:</strong> Anyone accessing or using the Website.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-gray-700"><strong className="text-primary">Content:</strong> Any information, text, images, videos, or other materials posted or shared on the Website.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Use of Website Section */}
            <div className="space-y-4">
              <h2 className="font-heading text-3xl font-medium text-primary border-b border-gray-200 pb-4">
                2. Use of the Website
              </h2>
              <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-sans text-xl font-semibold text-primary mb-4">License and Compliance</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-gray-700"><strong className="text-primary">License:</strong> You are granted a non-exclusive, non-transferable, and revocable license to use the Website for personal or internal business purposes.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-gray-700"><strong className="text-primary">Compliance:</strong> You must comply with all applicable laws and regulations when using the Website.</span>
                  </li>
                </ul>

                <h3 className="font-sans text-xl font-semibold text-primary mt-6 mb-4">Prohibited Activities</h3>
                <p className="font-sans text-gray-700 mb-4">You may not:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-gray-700">Use the Website for unlawful or unauthorized purposes.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-gray-700">Interfere with or disrupt the operation of the Website.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-gray-700">Attempt to gain unauthorized access to the Website or its underlying systems.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Intellectual Property Section */}
            <div className="space-y-4">
              <h2 className="font-heading text-3xl font-medium text-primary border-b border-gray-200 pb-4">
                3. Intellectual Property
              </h2>
              <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 border border-gray-100">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-gray-700"><strong className="text-primary">Trademarks:</strong> All trademarks, logos, and service marks on the Website are owned by their respective parties.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-gray-700"><strong className="text-primary">Copyright:</strong> The Website and its Content are protected by copyright laws.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Additional Sections */}
            <div className="space-y-4">
              <h2 className="font-heading text-3xl font-medium text-primary border-b border-gray-200 pb-4">
                4. Legal Provisions
              </h2>
              <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 border border-gray-100 space-y-6">
                <div>
                  <h3 className="font-sans text-xl font-semibold text-primary mb-4">Disclaimer and Limitation of Liability</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="font-sans text-gray-700"><strong className="text-primary">Disclaimer:</strong> The Website is provided "as is" and "as available" without warranties of any kind.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="font-sans text-gray-700"><strong className="text-primary">Limitation of Liability:</strong> We will not be liable for any damages arising from or related to your use of the Website.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-sans text-xl font-semibold text-primary mb-4">Governing Law and Jurisdiction</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="font-sans text-gray-700"><strong className="text-primary">Governing Law:</strong> These Terms will be governed by and construed in accordance with the laws of New Hampshire, United States.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="font-sans text-gray-700"><strong className="text-primary">Jurisdiction:</strong> Any disputes arising from or related to these Terms will be resolved through mediation in the State of New Hampshire.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Final Sections */}
            <div className="space-y-4">
              <h2 className="font-heading text-3xl font-medium text-primary border-b border-gray-200 pb-4">
                5. Additional Terms
              </h2>
              <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 border border-gray-100">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-gray-700"><strong className="text-primary">Changes to Terms:</strong> We reserve the right to modify or update these Terms at any time.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-gray-700"><strong className="text-primary">Termination:</strong> We may terminate or suspend your access to the Website at any time.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;