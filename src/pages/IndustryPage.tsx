import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { INDUSTRIES } from '../utils/constants';
import { INDUSTRY_CONTENT } from '../data/industryContent';
import IndustryTemplate from '../components/IndustryTemplate';
import Button from '../components/ui/Button';
import ROICalculator from '../components/sections/ROICalculator';
import { 
  Landmark, 
  ShoppingBag, 
  Stethoscope, 
  Factory, 
  Zap, 
  Building,
  ArrowRight,
  Check,
  Shield,
  Users,
  Lock,
  BarChart3,
  Brain,
  FileText,
  Target,
  TrendingUp,
  Eye,
  Database,
  AlertTriangle,
  Calculator
} from 'lucide-react';
import CalendlyBtn from '../components/sections/CalendlyBtn';

const iconMap = {
  'landmark': Landmark,
  'shopping-bag': ShoppingBag,
  'stethoscope': Stethoscope,
  'factory': Factory,
  'zap': Zap,
  'building': Building,
};

const IndustryPage: React.FC = () => {
  const { industryId } = useParams<{ industryId: string }>();
  const selectedIndustry = industryId 
    ? INDUSTRIES.find(industry => industry.id === industryId) 
    : null;

  React.useEffect(() => {
    document.title = selectedIndustry 
      ? `${selectedIndustry.name} - ReadyAI`
      : 'Industries - ReadyAI';
  }, [selectedIndustry]);

  return (
    <div className="pt-20">
      {!selectedIndustry ? (
        <div>
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-primary via-primary-light to-primary-dark overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white mb-4 sm:mb-6">
                Industry-Specific AI Solutions
              </h1>
              <p className="font-sans text-base sm:text-lg md:text-xl text-white/90 max-w-4xl leading-relaxed">
                Discover how the platform can be tailored to meet the unique challenges and opportunities in your industry
              </p>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {INDUSTRIES.map(industry => {
                const Icon = iconMap[industry.icon as keyof typeof iconMap];
                
                return (
                  <Link 
                    key={industry.id} 
                    to={`/industry/${industry.id}`}
                    className="group flex flex-col bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 h-full"
                  >
                    <div className="p-8 flex-grow">
                      {Icon && (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mb-5 group-hover:from-accent/20 group-hover:to-accent/10 transition-colors shadow-sm">
                          <Icon className="h-8 w-8 text-accent" />
                        </div>
                      )}
                      <h3 className="font-heading text-2xl font-medium text-primary group-hover:text-accent transition-colors mb-3">
                        {industry.name}
                      </h3>
                      <p className="font-sans text-gray-600 leading-relaxed">
                        {industry.description}
                      </p>
                    </div>
                    <div className="p-8 pt-0 mt-auto">
                      <span className="font-sans text-accent font-semibold inline-flex items-center group-hover:underline">
                        Learn more
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
            
            <div className="mt-20">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8 p-8 md:p-12">
                  <div className="lg:col-span-7 mb-8 lg:mb-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
                      <div className="w-16 h-16 sm:w-14 sm:h-14 flex-shrink-0 rounded-full bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center shadow-sm">
                        <Calculator className="w-8 h-8 sm:w-7 sm:h-7 text-accent" />
                      </div>
                      <h3 className="font-heading text-primary text-xl md:text-2xl font-normal">
                        Calculate Your Potential Savings
                      </h3>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="font-sans text-primary-light text-base leading-relaxed">
                        No matter your industry, our platform can help you <span className="font-semibold text-accent">reduce your internal AI spend</span>, while expanding AI capabilities. 
                        Use our ROI calculator to see how much you could save by switching to ReadyAI.
                      </p>
                      <p className="font-sans text-primary-light text-base leading-relaxed">
                        A fixed price of <span className="font-semibold text-accent">$30 per user per month</span> provides access to all platform features, 
                        including unlimited AI agents, all supported LLMs, and our comprehensive management tools.
                      </p>

                      {/* Key Benefits */}
                      <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          'No hidden fees or usage charges',
                          'Access to 30+ premium LLMs',
                          'Unlimited AI agent creation',
                          'Enterprise-grade security included'
                        ].map((benefit, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="font-sans text-primary-light text-sm md:text-base">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-5">
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <ROICalculator />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Banner */}
            <div className="mt-16 bg-gradient-to-br from-primary via-primary-light to-primary-dark rounded-2xl p-12 md:p-16 text-center relative overflow-hidden">
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
                  Connect with our industry specialists to explore how ReadyAI can secure and scale your AI operations
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-white rounded-xl font-sans font-semibold hover:bg-accent-dark hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      Contact Our Team
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                  <CalendlyBtn
                    url="https://calendly.com/readyai-sales"
                    text="Schedule a Demo"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-sans font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Individual Industry Hero Section */}
          <div className="relative bg-gradient-to-br from-primary via-primary-light to-primary-dark overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
                <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white">
                  {selectedIndustry.name}
                </h1>
                <div className="hidden sm:block">
                  <Link to="/industry">
                    <Button variant="outline" className="border-white text-white hover:bg-white/10 backdrop-blur-sm text-xl px-7 py-4">
                      All Industries
                    </Button>
                  </Link>
                </div>
              </div>
              <div>
                {industryId === 'financial' && (
                  <p className="font-sans text-base sm:text-lg md:text-xl text-white/90 max-w-4xl leading-relaxed">
                    We understand your industry, we've done this before, and we have trusted partners who can support you. 
                  </p>
                )}
                {selectedIndustry.industryStatement && (
                  <p className="font-sans text-base sm:text-lg md:text-xl text-white/90 max-w-4xl leading-relaxed" dangerouslySetInnerHTML={{ __html: selectedIndustry.industryStatement }}>
                  </p>
                )}
              </div>
              <div className="block sm:hidden mt-6">
                <Link to="/industry">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 backdrop-blur-sm text-xl px-7 py-4">
                    All Industries
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {industryId === 'financial' && (
              <IndustryTemplate content={INDUSTRY_CONTENT.find(c => c.id === 'financial')!} />
            )}

            {industryId === 'retail' && (
              <IndustryTemplate content={INDUSTRY_CONTENT.find(c => c.id === 'retail')!} />
            )}

            {industryId === 'healthcare' && (
              <IndustryTemplate content={INDUSTRY_CONTENT.find(c => c.id === 'healthcare')!} />
            )}

            {industryId === 'manufacturing' && (
              <IndustryTemplate content={INDUSTRY_CONTENT.find(c => c.id === 'manufacturing')!} />
            )}

            {industryId === 'energy' && (
              <IndustryTemplate content={INDUSTRY_CONTENT.find(c => c.id === 'energy')!} />
            )}

            {industryId === 'public' && (
              <IndustryTemplate content={INDUSTRY_CONTENT.find(c => c.id === 'public')!} />
            )}

            {/* Legacy content for other industries */}
            {industryId !== 'financial' && industryId !== 'retail' && industryId !== 'healthcare' && industryId !== 'manufacturing' && industryId !== 'energy' && industryId !== 'public' && (
              <div className="space-y-12">

                {/* Secure. Compliant. Built for Confidence */}
                <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-accent2-lightest rounded-2xl p-8 md:p-12 border border-primary/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl"></div>
                  <div className="relative">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                      <div className="w-16 h-16 sm:w-14 sm:h-14 flex-shrink-0 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center shadow-lg">
                        <Shield className="w-8 h-8 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-normal text-primary">Secure. Compliant. Built for Confidence.</h3>
                    </div>
                    <div className="space-y-4">
                      <p className="font-sans text-base text-primary-light leading-relaxed">
                        Financial institutions continually navigate the delicate balance between innovation and oversight.
                      </p>
                      <p className="font-sans text-base text-primary-light leading-relaxed">
                        In a highly regulated environment where trust is non-negotiable, AI must not only be powerful but also governed, auditable, and compliant from its foundation.
                      </p>
                      <p className="font-sans text-base text-primary-light leading-relaxed">
                        The ReadyAI.dev platform provides a <strong className="text-primary">secure, governed AI framework</strong> that enables banks, insurers, and fintech organizations to deploy advanced AI responsibly. It unifies innovation and compliance — supporting faster transformation, stronger risk management, and enhanced customer experiences.
                      </p>
                      <p className="font-sans text-base text-primary-light leading-relaxed">
                        Every workflow — from fraud detection to customer service — operates within a transparent, compliant structure aligned with <strong className="text-primary">SOC 2, ISO 27001</strong>, and global financial-data standards.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Transforming Financial Services */}
                <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-2xl p-8 md:p-12 border border-gray-100">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                    <div className="w-16 h-16 sm:w-14 sm:h-14 flex-shrink-0 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center shadow-lg">
                      <Brain className="w-8 h-8 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-normal text-primary">Transforming Financial Services with Responsible AI</h3>
                  </div>
                  <p className="font-sans text-base text-primary-light leading-relaxed">
                    ReadyAI.dev allows financial enterprises to modernize safely — automating document processing, assessing credit risk, and managing compliance without sacrificing control. Our platform provides leaders with full visibility, auditability, and accountability across every model and decision.
                  </p>
                </div>

                {/* Why Financial Leaders Choose ReadyAI.dev */}
                <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-2xl p-8 md:p-12 border border-gray-100">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                    <div className="w-16 h-16 sm:w-14 sm:h-14 flex-shrink-0 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center shadow-lg">
                      <TrendingUp className="w-8 h-8 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-normal text-primary">Why Financial Leaders Choose ReadyAI.dev</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl p-6 border border-gray-100 hover:border-accent/30 transition-all duration-300 hover:shadow-lg">
                      <h4 className="font-sans text-lg font-semibold text-primary mb-3">Customer Experience</h4>
                      <p className="font-sans text-base text-primary-light leading-relaxed">Deploy intelligent assistants that streamline service while maintaining compliance.</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-gray-100 hover:border-accent/30 transition-all duration-300 hover:shadow-lg">
                      <h4 className="font-sans text-lg font-semibold text-primary mb-3">Core System Integration</h4>
                      <p className="font-sans text-base text-primary-light leading-relaxed">Connect seamlessly with banking, insurance, and risk platforms to unify data governance.</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-gray-100 hover:border-accent/30 transition-all duration-300 hover:shadow-lg">
                      <h4 className="font-sans text-lg font-semibold text-primary mb-3">Fraud Detection & Prevention</h4>
                      <p className="font-sans text-base text-primary-light leading-relaxed">Govern AI agents that monitor transactions in real time and flag anomalies.</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-gray-100 hover:border-accent/30 transition-all duration-300 hover:shadow-lg">
                      <h4 className="font-sans text-lg font-semibold text-primary mb-3">Private AI Workspaces</h4>
                      <p className="font-sans text-base text-primary-light leading-relaxed">Fully isolated, compliant environments for model development and deployment.</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-gray-100 hover:border-accent/30 transition-all duration-300 hover:shadow-lg">
                      <h4 className="font-sans text-lg font-semibold text-primary mb-3">Regulatory Compliance</h4>
                      <p className="font-sans text-base text-primary-light leading-relaxed">Automate monitoring and reporting aligned with evolving regulations.</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-gray-100 hover:border-accent/30 transition-all duration-300 hover:shadow-lg">
                      <h4 className="font-sans text-lg font-semibold text-primary mb-3">Risk Assessment Models</h4>
                      <p className="font-sans text-base text-primary-light leading-relaxed">Enhance credit scoring and investment analysis with transparent, explainable AI.</p>
                    </div>
                  </div>
                </div>

                {/* Governance First */}
                <div className="bg-gradient-to-br from-primary via-primary-light to-primary-dark rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl"></div>
                  <div className="relative">
                    <h3 className="font-heading text-3xl md:text-4xl font-normal text-white mb-6">Governance First. Always.</h3>
                    <p className="font-sans text-base md:text-lg text-white/90 leading-relaxed max-w-4xl mx-auto mb-8">
                      Build trust, reduce risk, and innovate responsibly with transparent, compliant AI — powered by the only platform designed for enterprise-grade governance.
                    </p>
                    <CalendlyBtn
                      url="https://calendly.com/readyai-sales"
                      text="Explore your secure AI workspace"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-xl font-sans font-semibold hover:bg-accent-dark hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    />
                  </div>
                </div>

                {/* Use Cases */}
                <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-2xl p-8 md:p-12 border border-gray-100">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                    <div className="w-16 h-16 sm:w-14 sm:h-14 flex-shrink-0 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center shadow-lg">
                      <Target className="w-8 h-8 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-normal text-primary">Use Cases</h3>
                  </div>
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-xl border border-gray-100 hover:border-accent/30 hover:shadow-md transition-all duration-300">
            <h4 className="font-sans text-lg font-semibold text-primary mb-2">Customer Support</h4>
            <p className="font-sans text-base text-primary-light leading-relaxed">Automate service requests while maintaining full compliance.</p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-gray-100 hover:border-accent/30 hover:shadow-md transition-all duration-300">
            <h4 className="font-sans text-lg font-semibold text-primary mb-2">Compliance Monitoring</h4>
            <p className="font-sans text-base text-primary-light leading-relaxed">Continuously audit and document adherence to evolving regulations.</p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-gray-100 hover:border-accent/30 hover:shadow-md transition-all duration-300">
            <h4 className="font-sans text-lg font-semibold text-primary mb-2">Document Intelligence</h4>
            <p className="font-sans text-base text-primary-light leading-relaxed">Extract and process financial data with complete auditability.</p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-gray-100 hover:border-accent/30 hover:shadow-md transition-all duration-300">
            <h4 className="font-sans text-lg font-semibold text-primary mb-2">Fraud Detection</h4>
            <p className="font-sans text-base text-primary-light leading-relaxed">Identify suspicious transactions through explainable anomaly detection.</p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-gray-100 hover:border-accent/30 hover:shadow-md transition-all duration-300">
            <h4 className="font-sans text-lg font-semibold text-primary mb-2">Risk Management</h4>
            <p className="font-sans text-base text-primary-light leading-relaxed">Model exposure and credit scoring with transparent AI analytics.</p>
          </div>
        </div>
                </div>
              </div>
            )}

            {/* Other industries content */}
            {industryId !== 'financial' && industryId !== 'retail' && industryId !== 'healthcare' && industryId !== 'manufacturing' && industryId !== 'energy' && industryId !== 'public' && (
              <div>
                {/* No other industries currently have legacy content */}
              </div>
            )}

            
            <div className="mt-12">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8 p-8 md:p-12">
                  <div className="lg:col-span-7 mb-8 lg:mb-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
                      <div className="w-16 h-16 sm:w-14 sm:h-14 flex-shrink-0 rounded-full bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center shadow-sm">
                        <Calculator className="w-8 h-8 sm:w-7 sm:h-7 text-accent" />
                      </div>
                      <h3 className="font-heading text-primary text-xl md:text-2xl font-normal">
                        Calculate Your Potential Savings
                      </h3>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="font-sans text-primary-light text-base leading-relaxed">
                        No matter your industry, our platform can help you <span className="font-semibold text-accent">reduce your internal AI spend</span>, while expanding AI capabilities. 
                        Use our ROI calculator to see how much you could save by switching to ReadyAI.
                      </p>
                      <p className="font-sans text-primary-light text-base leading-relaxed">
                        A fixed price of <span className="font-semibold text-accent">$30 per user per month</span> provides access to all platform features, 
                        including unlimited AI agents, all supported LLMs, and our comprehensive management tools.
                      </p>

                      {/* Key Benefits */}
                      <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          'No hidden fees or usage charges',
                          'Access to 30+ premium LLMs',
                          'Unlimited AI agent creation',
                          'Enterprise-grade security included'
                        ].map((benefit, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="font-sans text-primary-light text-sm md:text-base">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-5">
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <ROICalculator />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Banner */}
            <div className="mt-16 bg-gradient-to-br from-primary via-primary-light to-primary-dark rounded-2xl p-12 md:p-16 text-center relative overflow-hidden">
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
                  Connect with our industry specialists to explore how ReadyAI can secure and scale your AI operations
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-white rounded-xl font-sans font-semibold hover:bg-accent-dark hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      Contact Our Team
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                  <CalendlyBtn
                    url="https://calendly.com/readyai-sales"
                    text="Schedule a Demo"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-sans font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
};

export default IndustryPage;