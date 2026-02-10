import React, { useState } from 'react';
import { ChevronDown, Cpu, Shield, Zap, DollarSign, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CalendlyBtn from '../components/sections/CalendlyBtn';

interface FAQ {
  question: string;
  answer: string;
  hasButton?: boolean;
}

interface FAQCategory {
  name: string;
  icon: React.ReactNode;
  faqs: FAQ[];
}

const faqCategories: FAQCategory[] = [
  {
    name: 'Platform & Benefits',
    icon: <Cpu className="w-5 h-5" />,
    faqs: [
      {
        question:
          "How does the enterprise AI platform, built by our Global Partner, benefit your organization, and what is ReadyAI.dev's role?",
        answer:
          "An enterprise-grade AI platform provides organizations with a secure, governed environment for internal AI usage across teams and use cases.\n\nThrough the platform, enterprises can access multiple large language models within a single environment, gain visibility into internal AI usage and spend, and apply governance controls that support compliance and oversight requirements.\n\nReadyAI.dev supports leadership teams, with consulting services in adopting and applying these platform capabilities effectively, giving CIOs and AI leaders clear insight into how internal AI is being used across the organization.",
      },
      {
        question: 'What makes ReadyAI.dev different from traditional AI consulting firms?',
        answer:
          "Many AI consulting firms lead with workshops, roadmaps, and bespoke projects that often result in recommendations rather than durable structure.\n\nReadyAI.dev operates as a platform partner, not a traditional consulting firm.\n\nWe help enterprises access a proven enterprise AI platform designed for secure, governed internal AI adoption, while supporting leadership teams in applying platform capabilities responsibly and consistently.\n\nThe focus is on clarity, governance, and sustainable internal AI adoption, not on building custom solutions or operating AI systems on a customer's behalf.\n\nOrganizations work with ReadyAI.dev to move beyond advisory output and establish a structured, enterprise-ready foundation for internal AI.",
      },
      {
        question: 'How does the platform simplify LLM access and management?',
        answer:
          'You get unlimited LLM options, all for one price. The platform brings everything together: model access, permissions, performance data, and governance controls. That means you can test and scale AI safely while keeping full visibility over how, where, and why it\'s being used.',
      },
    ],
  },
  {
    name: 'Security & Compliance',
    icon: <Shield className="w-5 h-5" />,
    faqs: [
      {
        question: "What's the security protocol for the Platform?",
        answer:
          "Our Global Technology Partner built the AI Platform with security as a top priority. They implement industry-leading security measures to safeguard your data and maintain platform integrity. This includes secure data encryption both in transit and at rest, regular security audits, and robust access controls to ensure only authorized users can access sensitive information.\n\nThe infrastructure is monitored continuously for vulnerabilities and potential threats, and best practices are followed for secure coding and infrastructure management. Additionally, they comply with relevant data protection regulations to protect your privacy and provide a safe development environment.\n\nThe platform includes enterprise-grade security controls and compliance capabilities aligned with recognized frameworks such as SOC 2, GDPR, HIPAA, and NIST. These include encryption, access controls, audit logging, and administrative visibility to support secure internal AI usage.\n\nWe support leadership and security teams in applying the platform’s security and compliance capabilities within their existing risk, governance, and regulatory frameworks as internal AI adoption scales.",
      },
    ],
  },
  {
    name: 'Professional Services',
    icon: <Zap className="w-5 h-5" />,
    faqs: [
      {
        question: 'How do you help with change management and user adoption?',
        answer:
          'We know that successful AI adoption starts with people. Through our AI Strategy Consulting and Training & Enablement programs, we help your teams adapt confidently. Together, we\'ll map out clear roadmaps, communication plans, and governance guidelines, so AI becomes part of how your business runs, not a one-off experiment.',
      },
      {
        question: 'What\'s included in your AI Strategy Consulting?',
        answer:
          "ReadyAI.dev supports organizations across the full lifecycle of internal AI adoption by enabling access to a proven enterprise AI platform and helping leadership teams apply it effectively.\n\nThis includes support for early-stage strategy and pilot definition, platform onboarding, and alignment across leadership, risk, and compliance functions to ensure internal AI adoption remains structured, governed, and scalable.\n\nReadyAI.dev focuses on platform-led adoption. The emphasis is on clarity, governance, and continuity, ensuring organizations can move from planning to rollout using a consistent enterprise AI foundation.",
      },
    ],
  },
  {
    name: 'Pricing',
    icon: <DollarSign className="w-5 h-5" />,
    faqs: [
      {
        question: 'How is the platform priced?',
        answer:
          'Our pricing is simple and transparent: $30 per user per month. That includes unlimited LLM access under one governance framework. Pricing scales with your organization\'s needs, not your usage, so you can plan confidently as you grow.',
      },
    ],
  },
  {
    name: 'Partnerships & Support',
    icon: <Rocket className="w-5 h-5" />,
    faqs: [
      {
        question: 'Who are your technology and industry partners?',
        answer:
          'We collaborate with leading organizations as well as enterprise and research partners around the world. These partnerships allow us to share knowledge, host events, and co-develop governance frameworks that make enterprise AI safer and more effective.',
      },
    ],
  },
];

const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  React.useEffect(() => {
    document.title = 'FAQs - ReadyAI';
  }, []);

  const toggleFaq = (categoryIndex: number, faqIndex: number) => {
    const key = `${categoryIndex}-${faqIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary via-primary-light to-primary-dark overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center">
            {/* Headline */}
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal text-white mb-6">
              Frequently Asked Questions
            </h1>

            {/* Subtext */}
            <p className="font-sans text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Enterprise AI platform FAQs: Internal AI Security, Governance, and Adoption
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {faqCategories.map((category, categoryIndex) => (
            <div key={category.name}>
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg text-accent">
                  {category.icon}
                </div>
                <h2 className="font-heading text-3xl font-normal text-primary">
                  {category.name}
                </h2>
              </div>

              {/* FAQs */}
              <div className="space-y-3">
                {category.faqs.map((faq, faqIndex) => {
                  const key = `${categoryIndex}-${faqIndex}`;
                  const isOpen = openIndex === key;

                  return (
                    <motion.div
                      key={faqIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: faqIndex * 0.05 }}
                      className="group"
                    >
                      <div
                        className={`bg-white border-2 rounded-xl overflow-hidden transition-all duration-300 ${
                          isOpen
                            ? 'border-accent shadow-lg shadow-accent/10'
                            : 'border-gray-200 hover:border-accent/30 hover:shadow-md'
                        }`}
                      >
                        {/* Question Header */}
                        <button
                          onClick={() => toggleFaq(categoryIndex, faqIndex)}
                          className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left transition-colors duration-200"
                        >
                          <h3 className="flex-1 font-sans text-lg md:text-xl font-medium text-primary group-hover:text-accent transition-colors duration-200">
                            {faq.question}
                          </h3>

                          {/* Toggle Icon */}
                          <div className="flex-shrink-0 mt-1">
                            <div
                              className={`p-2 rounded-lg transition-all duration-300 ${
                                isOpen
                                  ? 'bg-accent text-white rotate-180'
                                  : 'bg-gray-100 text-gray-600 group-hover:bg-accent/10 group-hover:text-accent'
                              }`}
                            >
                              <ChevronDown className="w-5 h-5" />
                            </div>
                          </div>
                        </button>

                        {/* Answer Content */}
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                                <div className="pl-4 border-l-4 border-accent/30">
                                  <div className="font-sans text-base md:text-lg text-gray-700 leading-relaxed space-y-4">
                                    {faq.answer.split('\n').map((line, index) => {
                                      if (line.trim() === '') return null;
                                      if (line.startsWith('→')) {
                                        const linkText = line.replace('→ ', '');
                                        let href = '#';
                                        let target = '_self';
                                        
                                        if (linkText.includes('Platform page')) {
                                          href = '/solutions';
                                        } else if (linkText.includes('Trust & Security')) {
                                          href = '/solutions/security';
                                        }
                                        
                                        return (
                                          <div key={index} className="mt-3">
                                            <a
                                              href={href}
                                              target={target}
                                              className="inline-flex items-center gap-2 text-accent hover:text-accent-dark font-semibold transition-colors duration-200"
                                            >
                                              {linkText}
                                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                              </svg>
                                            </a>
                                          </div>
                                        );
                                      }
                                      return <p key={index} className="mb-0">{line}</p>;
                                    })}
                                  </div>

                                  {/* Explore Platform Button */}
                                  {faq.hasButton && (
                                    <div className="mt-6">
                                      <a
                                        href="https://devs.ai/signup?ref=sales%40readyai.dev"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-accent-dark text-white rounded-lg font-sans font-semibold hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                                      >
                                        Explore Platform
                                        <svg
                                          className="w-4 h-4"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                          />
                                        </svg>
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center p-8 bg-gradient-to-br from-primary via-primary-light to-primary-dark rounded-2xl">
          <h3 className="font-heading text-3xl font-normal text-white mb-3">
            Still have questions?
          </h3>
          <p className="font-sans text-white/90 mb-6 max-w-2xl mx-auto">
            We'd love to help. Contact our team or book an executive evaluation to see how ReadyAI.dev can help you unify, govern, and scale AI across your enterprise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-lg font-sans font-semibold hover:bg-accent-dark transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Contact Our Team
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
            <CalendlyBtn
              url="https://calendly.com/readyai-sales"
              text="Book an Evaluation"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary border-2 border-primary rounded-lg font-sans font-semibold hover:bg-primary hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
