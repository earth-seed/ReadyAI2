import React from 'react';
import { Shield, Check } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Privacy Policy - ReadyAI';
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
              <Shield className="h-7 w-7 text-white" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal text-white">
              Privacy Policy
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
                We respect your privacy and are committed to protecting your personal data. 
                This Privacy Policy ("Policy") describes how we collect, use, and disclose your personal data.
              </p>
            </div>

            {/* Information Collection Section */}
            <div className="space-y-4">
              <h2 className="font-heading text-3xl font-medium text-primary border-b border-gray-200 pb-4">
                Information Collection
              </h2>
              <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-sans text-xl font-semibold text-primary mb-4">Personal Data</h3>
                <p className="font-sans text-gray-700 mb-4">We collect the following types of personal data:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-gray-700">Contact information (e.g., name, email, phone number)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-gray-700">Usage data (e.g., IP address, browser type, operating system)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Use of Personal Data Section */}
            <div className="space-y-4">
              <h2 className="font-heading text-3xl font-medium text-primary border-b border-gray-200 pb-4">
                Use of Personal Data
              </h2>
              <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-sans text-xl font-semibold text-primary mb-4">Purpose</h3>
                <p className="font-sans text-gray-700 mb-4">We use your personal data for:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-gray-700">Providing and improving the Website</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-gray-700">Responding to your inquiries</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-gray-700">Sending marketing communications</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Disclosure Section */}
            <div className="space-y-4">
              <h2 className="font-heading text-3xl font-medium text-primary border-b border-gray-200 pb-4">
                Disclosure of Personal Data
              </h2>
              <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-sans text-xl font-semibold text-primary mb-4">Third Parties</h3>
                <p className="font-sans text-gray-700 mb-4">We may disclose your personal data to:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-gray-700">Service providers (e.g., cloud storage, email marketing)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-gray-700">Law enforcement or regulatory agencies</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Data Protection Section */}
            <div className="space-y-4">
              <h2 className="font-heading text-3xl font-medium text-primary border-b border-gray-200 pb-4">
                Data Protection
              </h2>
              <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 border border-gray-100">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-gray-700"><strong className="text-primary">Security:</strong> We implement reasonable security measures to protect your personal data.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-gray-700"><strong className="text-primary">Retention:</strong> We retain your personal data for as long as necessary to fulfill the purposes described in Section 2.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Your Rights Section */}
            <div className="space-y-4">
              <h2 className="font-heading text-3xl font-medium text-primary border-b border-gray-200 pb-4">
                Your Rights
              </h2>
              <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 border border-gray-100">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-gray-700"><strong className="text-primary">Access:</strong> You have the right to access your personal data.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-gray-700"><strong className="text-primary">Correction:</strong> You have the right to correct or update your personal data.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-gray-700"><strong className="text-primary">Deletion:</strong> You have the right to request deletion of your personal data.</span>
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

export default PrivacyPolicy;