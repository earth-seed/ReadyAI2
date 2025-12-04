import React from 'react';
import { Lock, Check } from 'lucide-react';

const GdprPolicy: React.FC = () => {
  React.useEffect(() => {
    document.title = 'GDPR Policy - ReadyAI';
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
              <Lock className="h-7 w-7 text-white" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal text-white">
              GDPR Policy
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
                We are committed to complying with the General Data Protection Regulation (GDPR). 
                This GDPR Policy ("Policy") describes how we collect, use, and disclose your personal data.
              </p>
            </div>

            {/* Data Controller Section */}
            <div className="space-y-4">
              <h2 className="font-heading text-3xl font-medium text-primary border-b border-gray-200 pb-4">
                1. Data Controller
              </h2>
              <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 border border-gray-100">
                <p className="font-sans text-gray-700">
                  <strong className="text-primary">Data Controller:</strong> ReadyAI.dev is the data controller of your personal data.
                </p>
              </div>
            </div>

            {/* Data Protection Officer Section */}
            <div className="space-y-4">
              <h2 className="font-heading text-3xl font-medium text-primary border-b border-gray-200 pb-4">
                2. Data Protection Officer
              </h2>
              <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 border border-gray-100">
                <p className="font-sans text-gray-700">
                  <strong className="text-primary">Data Protection Officer:</strong> ReadyAI.dev is our Data Protection Officer.
                </p>
              </div>
            </div>

            {/* Data Subject Rights Section */}
            <div className="space-y-4">
              <h2 className="font-heading text-3xl font-medium text-primary border-b border-gray-200 pb-4">
                3. Data Subject Rights
              </h2>
              <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-sans text-xl font-semibold text-primary mb-4">Rights</h3>
                <p className="font-sans text-gray-700 mb-4">You have the following rights:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-gray-700">Right to access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-gray-700">Right to rectification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-gray-700">Right to erasure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-gray-700">Right to restrict processing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-gray-700">Right to data portability</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-gray-700">Right to object</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Data Breach Section */}
            <div className="space-y-4">
              <h2 className="font-heading text-3xl font-medium text-primary border-b border-gray-200 pb-4">
                4. Data Breach Notification
              </h2>
              <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 border border-gray-100">
                <p className="font-sans text-gray-700">
                  <strong className="text-primary">Notification:</strong> We will notify you of any data breach affecting your personal data.
                </p>
              </div>
            </div>

            {/* International Transfers Section */}
            <div className="space-y-4">
              <h2 className="font-heading text-3xl font-medium text-primary border-b border-gray-200 pb-4">
                5. International Data Transfers
              </h2>
              <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 border border-gray-100">
                <p className="font-sans text-gray-700">
                  <strong className="text-primary">Transfers:</strong> We do not transfer your personal data outside the [EU/EEA].
                </p>
              </div>
            </div>

            {/* Acknowledgment Section */}
            <div className="mt-8 bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 border border-gray-100">
              <p className="font-sans text-gray-700">
                By using our Website, you acknowledge that you have read, understood, and agree to be bound by these 
                Terms of Service, Privacy Policy, and GDPR Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GdprPolicy;