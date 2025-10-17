import React, { useState } from 'react';
import { ChevronDown, Cpu, Shield, Zap, DollarSign, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    name: 'Platform & Features',
    icon: <Cpu className="w-5 h-5" />,
    faqs: [
      {
        question: 'How can the Platform benefit my organization?',
        answer:
          'The Platform is an advanced AI governance solution designed to streamline and optimize your IT operations, procurement processes, and technology management. It enables your team to increase efficiency, reduce costs, and make data-driven decisions while maintaining complete control over AI tool usage across your enterprise.',
      },
      {
        question: 'How do you help with procurement and vendor management?',
        answer:
          'The platform provides centralized procurement workflows, vendor comparison, and real-time analytics, empowering Procurement and IT leaders to make informed vendor choices and automate purchasing processes.',
      },
      {
        question: 'Is your platform customizable to meet specific enterprise requirements?',
        answer:
          "Yes. It is highly customizable to align with your organization's workflows, security policies, and compliance needs, ensuring it fits seamlessly with your existing IT infrastructure.",
      },
      {
        question: 'How can your Platform help IT Directors improve operational efficiency?',
        answer:
          'By automating routine tasks, providing dashboards with key performance metrics, and enabling proactive issue resolution, we help IT Directors reduce downtime and optimize resource allocation, while managing the multi-department launch of different AI LLMs, agents, and integrations.',
      },
      {
        question: 'Can the platform scale as our business grows?',
        answer:
          "Absolutely. It was built to scale with your organization's evolving needs, from small teams to large enterprise deployments, without compromising performance. Start with a pilot, develop a rollout plan with our expansive team's assistance, and enjoy a successful AI strategy for your entire organization.",
      },
    ],
  },
  {
    name: 'Security & Compliance',
    icon: <Shield className="w-5 h-5" />,
    faqs: [
      {
        question: 'How secure is the platform?',
        answer:
          'Security is our top priority. The Platform employs industry-leading encryption, role-based access controls, and regular security audits to protect your sensitive data and ensure compliance with relevant regulations. Our experienced Security Team is available to meet with you to share the best practices and integration security processes.',
      },
    ],
  },
  {
    name: 'Support & Training',
    icon: <Zap className="w-5 h-5" />,
    faqs: [
      {
        question: 'What kind of support and training do you offer?',
        answer:
          'We provide comprehensive onboarding, ongoing training, dedicated customer support, and tailored consultancy to ensure your team gets the most value from the platform. If your team is comfortable starting without our help, we can be a backup to your strategy development or engaged later.',
      },
    ],
  },
  {
    name: 'Pricing',
    icon: <DollarSign className="w-5 h-5" />,
    faqs: [
      {
        question: 'What is the pricing model?',
        answer: '$30/seat/month – that simple!',
      },
    ],
  },
  {
    name: 'Getting Started',
    icon: <Rocket className="w-5 h-5" />,
    faqs: [
      {
        question: 'How can I get a demo or trial?',
        answer:
          "You can request a personalized demo with the team of AI experts or start a free trial by contacting the sales team at sales@readyai.dev. We'll guide you through how the platform can meet your specific challenges.",
      },
      {
        question: 'Can I look at the Platform without contacting the sales team?',
        answer: 'Absolutely yes!',
        hasButton: true,
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
      <div className="relative bg-gradient-to-br from-accent2-lightest via-white to-accent2-lighter overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent2/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center">
            {/* Headline */}
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal text-primary mb-6">
              Frequently Asked Questions
            </h1>

            {/* Subtext */}
            <p className="font-sans text-lg md:text-xl text-primary-light max-w-3xl mx-auto leading-relaxed">
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
                                  <p className="font-sans text-base md:text-lg text-gray-700 leading-relaxed">
                                    {faq.answer}
                                  </p>

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
            Our team of AI experts is ready to help you navigate your enterprise AI journey.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-lg font-sans font-semibold hover:bg-accent-dark transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Contact Our Team
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
