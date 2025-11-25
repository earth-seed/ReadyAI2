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
        question: 'How does the ReadyAI.dev Platform benefit your enterprise?',
        answer:
          'ReadyAI.dev gives you one secure, unified space to manage your entire AI ecosystem. You can connect to multiple LLMs in one place, monitor usage and costs, and stay fully compliant across every department. Your CIO, or whoever oversees your AI strategy, gets complete visibility and control from a single dashboard.\n\n→ Learn more in our Solutions section',
      },
      {
        question: 'What makes ReadyAI.dev different from other AI firms?',
        answer:
          'Most companies offer AI consulting. We go further. ReadyAI.dev combines a powerful, governed platform with hands-on Professional Services. You get real structure, compliance, and support, not just generic advice. Our team helps you manage every LLM under one umbrella so you can move fast and stay in control.',
      },
      {
        question: 'How does the platform simplify LLM access and management?',
        answer:
          'You get unlimited LLM options, all for one price. The platform brings everything together: model access, permissions, performance data, and governance controls. That means you can test and scale AI safely while keeping full visibility over how, where, and why it\'s being used.\n\n→ Explore our Framework for Choosing the Right LLMs',
      },
    ],
  },
  {
    name: 'Security & Compliance',
    icon: <Shield className="w-5 h-5" />,
    faqs: [
      {
        question: 'How secure is ReadyAI.dev?',
        answer:
          'Security isn\'t a checkbox for us, it\'s built into everything we do. Our platform meets SOC 2, GDPR, HIPAA, and NIST standards, with encryption, audit trails, and continuous monitoring. Our Professional Services team also work directly with your Security and Compliance leads to make sure every integration meets your standards and keeps your data protected.\n\n→ View our Trust & Security Certifications',
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
          'We support you through every stage of enterprise AI adoption: AI Strategy & Pilot Design, Virtual AI Architect, Implementation Services, Change Management Support, and Training & Enablement. Our Professional Services team is with you from planning to rollout, using the ReadyAI.dev platform to ensure continuity, compliance, and measurable success without any stress.',
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
          'We collaborate with leading organizations such as XXX, XXX, and XXX, as well as enterprise and research partners around the world. These partnerships allow us to share knowledge, host events, and co-develop governance frameworks that make enterprise AI safer and more effective.\n\n→ See upcoming collaborations in our Events & News section.',
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
              Everything you need to know about ReadyAI&apos;s enterprise AI platform, security, and implementation.
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
                                  <div className="font-sans text-base md:text-lg text-gray-700 leading-relaxed">
                                    {faq.answer.split('\n').map((line, index) => {
                                      if (line.startsWith('→')) {
                                        const linkText = line.replace('→ ', '');
                                        let href = '#';
                                        let target = '_self';
                                        
                                        if (linkText.includes('Solutions section')) {
                                          href = '/solutions';
                                        } else if (linkText.includes('Framework for Choosing')) {
                                          href = '/resources';
                                        } else if (linkText.includes('Trust & Security')) {
                                          href = '/solutions/security';
                                        } else if (linkText.includes('Events & News')) {
                                          href = '/insights';
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
                                      return <p key={index}>{line}</p>;
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
