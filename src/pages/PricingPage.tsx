import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import CalendlyBtn from '../components/sections/CalendlyBtn';
import { PricingTiers } from '../utils/constants';

const PricingPage: React.FC = () => {
  const { tierId } = useParams<{ tierId: string }>();
  const selectedTier = tierId 
    ? PricingTiers.find(tier => tier.id === tierId) 
    : null;

  React.useEffect(() => {
    document.title = selectedTier
      ? 'Individual Plans - ReadyAI'
      : 'Enterprise Pricing and Plans - ReadyAI';
  }, [selectedTier]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary via-primary-light to-primary-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center">
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal text-white mb-6">
              {selectedTier ? "Individual Plans" : "Enterprise Pricing and Plans"}
            </h1>
            <p className="font-sans text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              {selectedTier?.note 
                ? selectedTier.note 
                : "Get started quickly with our flexible pricing designed to enable AI for all organizations—from a small law office to the largest global enterprise. Our plans scale with your use cases while ensuring strict security and governance controls."}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {!selectedTier ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {/* Pilot Program */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:border-accent/30 transition-all">
              <div className="p-8">
                <h2 className="font-heading text-2xl md:text-3xl font-normal text-primary mb-4">
                  Pilot Program
                </h2>
                <p className="font-sans text-base text-primary-light mb-6 leading-relaxed min-h-[120px]">
                  Try before you buy. Run a low-risk proof of concept with your team, guided by our enterprise AI advisors. 
                  Perfect for validating ROI, testing workflows, and building executive alignment.
                </p>
                <div className="mt-auto">
                  <CalendlyBtn
                    text="Request a Pilot"
                    className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Executive Evaluation */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:border-accent/30 transition-all">
              <div className="p-8">
                <h2 className="font-heading text-2xl md:text-3xl font-normal text-primary mb-4">
                  Executive Evaluation
                </h2>
                <p className="font-sans text-base text-primary-light mb-6 leading-relaxed min-h-[120px]">
                  Strategy-led evaluation for leaders. Tailored demos and advisory sessions for CIOs, CTOs, and HR leaders. 
                  ReadyAI helps you align with your governance, compliance, and transformation goals.
                </p>
                <div className="mt-auto">
                  <CalendlyBtn
                    text="Book an Executive Session"
                    className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:border-accent/30 transition-all">
              <div className="p-8">
                <h2 className="font-heading text-2xl md:text-3xl font-normal text-primary mb-4">
                  Enterprise Plan
                </h2>
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-5xl font-normal text-accent">$30</span>
                    <span className="font-sans text-base text-primary-light">/seat/month</span>
                  </div>
                  <p className="font-sans text-sm text-primary-light mt-1">Annual billing</p>
                </div>
                <p className="font-sans text-base text-primary-light mb-6 leading-relaxed">
                  Scale with confidence. When you're ready to deploy enterprise-wide, ReadyAI delivers all the power of 30+ AI models in one secure platform.
                </p>
                
                <div className="mb-6">
                  <p className="font-sans font-semibold text-primary mb-3">Enterprise plan features:</p>
                  <ul className="space-y-2.5">
                    {[
                      'Governance and compliance tools',
                      'Enterprise-grade security and support',
                      'User permissions and advanced analytics',
                      'All integrations, workflows, and APIs',
                      'Unlimited chat history and 20GB storage'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start gap-2.5">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="font-sans text-base text-primary-light leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <CalendlyBtn
                    text="Speak to an AI Strategy Advisor"
                    className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Why Enterprises Choose ReadyAI */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden mb-16">
            <div className="bg-gradient-to-r from-accent2-lightest via-accent2-light to-accent2-lightest px-8 py-8">
              <h2 className="font-heading text-3xl md:text-4xl font-normal text-primary text-center">
                Why Enterprises Choose ReadyAI
              </h2>
            </div>
            <div className="px-8 md:px-12 py-10 space-y-4">
              <p className="font-sans text-base text-primary-light leading-relaxed">
                Buying AI subscriptions separately is costly: <strong className="text-primary">$60</strong> OpenAI + <strong className="text-primary">$60</strong> Anthropic + <strong className="text-primary">$30</strong> Gemini + <strong className="text-primary">$19</strong> Cohere + <strong className="text-primary">$40</strong> Grok + more.
              </p>
              <p className="font-sans text-base text-primary-light leading-relaxed">
                That's over <strong className="text-accent text-xl">$210/seat/month</strong>. With ReadyAI, our enterprise platform includes all AI subscriptions.
                At only <strong className="text-accent text-xl">$30/seat/month</strong>, your employees can access everything in one place.
              </p>
              <p className="font-sans text-base text-primary-light leading-relaxed">
                You also have the added benefits of working with a platform backed by a global partner that specializes 
                in governance, compliance, and enterprise security.
              </p>
            </div>
          </div>

          {/* Ready to Get Started? */}
          <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-2xl p-8 md:p-12 mb-16 border border-gray-100 shadow-md">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-normal text-primary mb-4">
                Ready to Get Started?
              </h2>
              <p className="font-sans text-base text-primary-light max-w-3xl mx-auto leading-relaxed mb-6">
                Our team is ready to help you find the right approach for your organization. 
                Schedule a conversation to discuss your AI strategy, security requirements, and implementation timeline.
              </p>
              <p className="font-sans text-base text-primary-light max-w-3xl mx-auto leading-relaxed mb-8">
                Or if you're just exploring AI on your own, start small with our <Link to="/plans-and-enterprise-options/individual-starter-plans" className="text-accent font-semibold hover:underline">Free & Personal Plans</Link>.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CalendlyBtn
                text="Schedule a Consultation"
                className="bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg"
              />
              <Link 
                to="/plans-and-enterprise-options/individual-starter-plans"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-primary border-2 border-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all shadow-md hover:shadow-lg"
              >
                View Individual Plans
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="bg-gradient-to-br from-primary via-primary-light to-primary-dark rounded-2xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <p className="font-sans text-accent text-sm md:text-base uppercase tracking-widest mb-4">
                Get Started
              </p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal text-white mb-6">
                Ready to Transform Your AI Strategy?
              </h2>
              <p className="font-sans text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                Connect with our team to explore how ReadyAI can secure and scale your AI operations
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <button className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-xl font-sans font-semibold hover:bg-accent-dark hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    Contact Our Team
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <CalendlyBtn
                  url="https://calendly.com/readyai-sales"
                  text="Schedule a Demo"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-sans font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
                />
              </div>
            </div>
          </div>
        </div>

      ) : (
        /* Individual Starter Plans View */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all">
              <div className="p-8">
                <h2 className="font-heading text-2xl md:text-3xl font-normal text-primary mb-4">Free Plan</h2>
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-5xl font-normal text-accent">$0</span>
                    <span className="font-sans text-base text-primary-light">/month</span>
                  </div>
                </div>
                <p className="font-sans text-base text-primary-light mb-6 leading-relaxed">
                  Best for exploring AI capabilities and learning the basics.
                </p>
                <ul className="space-y-2.5 mb-8">
                  {[
                    'Access to 20+ leading LLMs',
                    '2GB storage',
                    'Unlimited agents',
                    'Analytics & reporting',
                    'Microsoft integration'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="font-sans text-base text-primary-light leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                <CalendlyBtn
                  text="Start Exploring for FREE"
                  className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
                />
              </div>
            </div>

            {/* Personal Plan */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all">
              <div className="p-8">
                <h2 className="font-heading text-2xl md:text-3xl font-normal text-primary mb-4">Personal Plan</h2>
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-5xl font-normal text-accent">$15</span>
                    <span className="font-sans text-base text-primary-light">/month per seat</span>
                  </div>
                  <p className="font-sans text-sm text-primary-light mt-1">Annual billing ($18 month-to-month)</p>
                </div>
                <p className="font-sans text-base text-primary-light mb-6 leading-relaxed">
                  Best for individual professionals and creators.
                </p>
                <ul className="space-y-2.5 mb-8">
                  {[
                    'Access to all 30+ LLMs',
                    '10GB storage',
                    'All integrations',
                    'Workflows & APIs',
                    'Unlimited chat history'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="font-sans text-base text-primary-light leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                <CalendlyBtn
                  text="Unlock Personal Plan"
                  className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Upgrade Section */}
          <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-2xl p-12 text-center border border-gray-100 mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-primary mb-6">
              Ready to Scale?
            </h2>
            <p className="font-sans text-base text-primary-light mb-8 max-w-3xl mx-auto leading-relaxed">
              Move to our Enterprise Plan <strong className="text-accent text-xl">($30/seat/month)</strong> and gain governance, 
              compliance, advanced analytics, and enterprise-grade support, without losing your work or data.
            </p>
            <CalendlyBtn
              text="Upgrade to Enterprise Options"
              className="bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg"
            />
          </div>

          {/* CTA Banner */}
          <div className="bg-gradient-to-br from-primary via-primary-light to-primary-dark rounded-2xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <p className="font-sans text-accent text-sm md:text-base uppercase tracking-widest mb-4">
                Get Started
              </p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal text-white mb-6">
                Ready to Transform Your AI Strategy?
              </h2>
              <p className="font-sans text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                Connect with our team to explore how ReadyAI can secure and scale your AI operations
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <button className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-xl font-sans font-semibold hover:bg-accent-dark hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    Contact Our Team
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <CalendlyBtn
                  url="https://calendly.com/readyai-sales"
                  text="Schedule a Demo"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-sans font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingPage;
