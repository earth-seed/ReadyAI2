import React from 'react';
import { Mail, Phone, MapPin, Calendar, MessageCircle } from 'lucide-react';
import ContactForm from '../components/layout/ContactForm';
import CalendlySectionPopUp from '../components/sections/CalendlySectionPopUp';

const ContactPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Contact - ReadyAI';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <CalendlySectionPopUp />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-accent2-lightest via-white to-accent2-lighter overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent2/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-3xl">
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal text-primary mb-6">
              Contact Us
            </h1>
            <p className="font-sans text-lg text-primary-light leading-relaxed mb-4">
              Our team is ready to help you implement enterprise-grade AI governance. Whether you&apos;re looking to secure shadow AI, streamline compliance, or scale your AI infrastructure, we&apos;re here to support your journey every step of the way.
            </p>
            <div className="flex items-center gap-2 text-accent font-sans text-lg font-medium">
              <MessageCircle className="w-5 h-5" />
              <span>Connect with our AI governance experts today.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:items-start">
          {/* Left Column - Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
              <div className="mb-8">
                <h2 className="font-heading text-3xl font-normal text-primary mb-2">
                  Get in Touch
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and our team will respond within one business day.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-24">
            {/* Contact Information Card */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="font-heading text-xl font-medium text-primary mb-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-accent" />
                </div>
                Contact Information
              </h3>
              
              <div className="space-y-5">
                <a 
                  href="mailto:sales@readyai.dev"
                  className="flex items-start gap-4 p-3 rounded-xl hover:bg-accent2-lightest transition-colors group"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Mail className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                  <div>
                    <p className="font-sans font-medium text-sm text-gray-500 mb-0.5">Email</p>
                    <p className="font-sans text-primary group-hover:text-accent transition-colors">
                      sales@readyai.dev
                    </p>
                  </div>
                </a>

                <a 
                  href="tel:949-444-5881"
                  className="flex items-start gap-4 p-3 rounded-xl hover:bg-accent2-lightest transition-colors group"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Phone className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                  <div>
                    <p className="font-sans font-medium text-sm text-gray-500 mb-0.5">Phone</p>
                    <p className="font-sans text-primary group-hover:text-accent transition-colors">
                      949 444 5881
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-3 rounded-xl">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                  <div>
                    <p className="font-sans font-medium text-sm text-gray-500 mb-0.5">Location</p>
                    <p className="font-sans text-primary">
                      Irvine, California 92614
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule Demo Card */}
            <div className="bg-gradient-to-br from-primary via-primary-light to-primary-dark rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-xl font-medium">
                  Schedule a Demo
                </h3>
              </div>
              <p className="text-white/90 text-sm leading-relaxed mb-5 flex-grow">
                See ReadyAI in action. Book a personalized walkthrough with our team to explore how we can help secure and scale your AI operations.
              </p>
              <button
                onClick={() => {
                  const calendlyBtn = document.querySelector('[data-calendly-trigger]') as HTMLElement;
                  if (calendlyBtn) calendlyBtn.click();
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-primary rounded-lg font-sans font-semibold hover:bg-gray-50 transition-all hover:shadow-xl mt-auto"
              >
                Book a Demo
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
