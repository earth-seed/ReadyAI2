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
  AlertTriangle
} from 'lucide-react';
import CalendlySectionPopUp from '../components/sections/CalendlySectionPopUp';

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
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal text-white mb-6">
                Industry-Specific AI Solutions
              </h1>
              <p className="font-sans text-lg md:text-xl text-white/90 max-w-4xl leading-relaxed">
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
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mb-5 group-hover:from-accent/20 group-hover:to-accent/10 transition-colors">
                          <Icon className="h-7 w-7 text-accent" />
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
              <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-2xl p-8 md:p-12 border border-gray-100">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                  <div className="lg:col-span-7">
                    <h2 className="font-heading text-3xl font-medium text-primary mb-6">
                      Calculate Your Potential Savings
                    </h2>
                    <p className="font-sans text-lg text-gray-700 mb-4 leading-relaxed">
                      No matter your industry, our platform can help you reduce costs while expanding AI capabilities. 
                      Use our ROI calculator to see how much you could save by switching to our platform.
                    </p>
                    <p className="font-sans text-lg text-gray-700 mb-6 leading-relaxed">
                      Our fixed price of <strong className="text-accent">$30 per user per month</strong> provides access to all platform features, 
                      including unlimited AI agents, all supported LLMs, and our comprehensive management tools.
                    </p>
                  </div>
                  <div className="lg:col-span-5 mt-8 lg:mt-0">
                    <ROICalculator />
                  </div>
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
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="flex items-center justify-between mb-8">
                <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal text-white">
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
                  <p className="font-sans text-lg md:text-xl text-white/90 max-w-4xl leading-relaxed">
                    We understand your industry, we've done this before, and we have trusted partners who can support you. 
                  </p>
                )}
                {selectedIndustry.industryStatement && (
                  <p className="font-sans text-lg md:text-xl text-white/90 max-w-4xl leading-relaxed" dangerouslySetInnerHTML={{ __html: selectedIndustry.industryStatement }}>
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
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-dark rounded-xl flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-heading text-3xl font-medium text-primary">Secure. Compliant. Built for Confidence.</h3>
                    </div>
                    <div className="space-y-6">
                      <p className="font-sans text-lg text-gray-700 leading-relaxed">
                        Financial institutions continually navigate the delicate balance between innovation and oversight.
                      </p>
                      <p className="font-sans text-lg text-gray-700 leading-relaxed">
                        In a highly regulated environment where trust is non-negotiable, AI must not only be powerful but also governed, auditable, and compliant from its foundation.
                      </p>
                      <p className="font-sans text-lg text-gray-700 leading-relaxed">
                        The ReadyAI.dev platform provides a <strong className="text-primary">secure, governed AI framework</strong> that enables banks, insurers, and fintech organizations to deploy advanced AI responsibly. It unifies innovation and compliance — supporting faster transformation, stronger risk management, and enhanced customer experiences.
                      </p>
                      <p className="font-sans text-lg text-gray-700 leading-relaxed">
                        Every workflow — from fraud detection to customer service — operates within a transparent, compliant structure aligned with <strong className="text-primary">SOC 2, ISO 27001</strong>, and global financial-data standards.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Transforming Financial Services */}
                <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-2xl p-8 md:p-12 border border-gray-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-heading text-3xl font-medium text-primary">Transforming Financial Services with Responsible AI</h3>
                  </div>
                  <p className="font-sans text-lg text-gray-700 leading-relaxed">
                    ReadyAI.dev allows financial enterprises to modernize safely — automating document processing, assessing credit risk, and managing compliance without sacrificing control. Our platform provides leaders with full visibility, auditability, and accountability across every model and decision.
                  </p>
                </div>

                {/* Why Financial Leaders Choose ReadyAI.dev */}
                <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-2xl p-8 md:p-12 border border-gray-100">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-dark rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-heading text-3xl font-medium text-primary">Why Financial Leaders Choose ReadyAI.dev</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl p-6 border border-gray-100 hover:border-accent/30 transition-all duration-300 hover:shadow-lg">
                      <h4 className="font-sans text-lg font-semibold text-primary mb-3">Customer Experience</h4>
                      <p className="font-sans text-gray-700">Deploy intelligent assistants that streamline service while maintaining compliance.</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-gray-100 hover:border-accent/30 transition-all duration-300 hover:shadow-lg">
                      <h4 className="font-sans text-lg font-semibold text-primary mb-3">Core System Integration</h4>
                      <p className="font-sans text-gray-700">Connect seamlessly with banking, insurance, and risk platforms to unify data governance.</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-gray-100 hover:border-accent/30 transition-all duration-300 hover:shadow-lg">
                      <h4 className="font-sans text-lg font-semibold text-primary mb-3">Fraud Detection & Prevention</h4>
                      <p className="font-sans text-gray-700">Govern AI agents that monitor transactions in real time and flag anomalies.</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-gray-100 hover:border-accent/30 transition-all duration-300 hover:shadow-lg">
                      <h4 className="font-sans text-lg font-semibold text-primary mb-3">Private AI Workspaces</h4>
                      <p className="font-sans text-gray-700">Fully isolated, compliant environments for model development and deployment.</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-gray-100 hover:border-accent/30 transition-all duration-300 hover:shadow-lg">
                      <h4 className="font-sans text-lg font-semibold text-primary mb-3">Regulatory Compliance</h4>
                      <p className="font-sans text-gray-700">Automate monitoring and reporting aligned with evolving regulations.</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-gray-100 hover:border-accent/30 transition-all duration-300 hover:shadow-lg">
                      <h4 className="font-sans text-lg font-semibold text-primary mb-3">Risk Assessment Models</h4>
                      <p className="font-sans text-gray-700">Enhance credit scoring and investment analysis with transparent, explainable AI.</p>
                    </div>
                  </div>
                </div>

                {/* Governance First */}
                <div className="bg-gradient-to-br from-primary via-primary-light to-primary-dark rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl"></div>
                  <div className="relative">
                    <h3 className="font-heading text-3xl font-medium text-white mb-6">Governance First. Always.</h3>
                    <p className="font-sans text-xl text-white/90 leading-relaxed max-w-4xl mx-auto mb-8">
                      Build trust, reduce risk, and innovate responsibly with transparent, compliant AI — powered by the only platform designed for enterprise-grade governance.
                    </p>
                    <a
                      href="https://calendly.com/readyai-dev/executive-evaluation"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-xl font-sans font-semibold hover:bg-accent-dark hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      Explore your secure AI workspace
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Use Cases */}
                <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-2xl p-8 md:p-12 border border-gray-100">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-heading text-3xl font-medium text-primary">Use Cases</h3>
                  </div>
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-xl border border-gray-100 hover:border-accent/30 hover:shadow-md transition-all duration-300">
            <h4 className="font-sans text-xl font-semibold text-primary mb-2">Customer Support</h4>
            <p className="font-sans text-gray-700 leading-relaxed">Automate service requests while maintaining full compliance.</p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-gray-100 hover:border-accent/30 hover:shadow-md transition-all duration-300">
            <h4 className="font-sans text-xl font-semibold text-primary mb-2">Compliance Monitoring</h4>
            <p className="font-sans text-gray-700 leading-relaxed">Continuously audit and document adherence to evolving regulations.</p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-gray-100 hover:border-accent/30 hover:shadow-md transition-all duration-300">
            <h4 className="font-sans text-xl font-semibold text-primary mb-2">Document Intelligence</h4>
            <p className="font-sans text-gray-700 leading-relaxed">Extract and process financial data with complete auditability.</p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-gray-100 hover:border-accent/30 hover:shadow-md transition-all duration-300">
            <h4 className="font-sans text-xl font-semibold text-primary mb-2">Fraud Detection</h4>
            <p className="font-sans text-gray-700 leading-relaxed">Identify suspicious transactions through explainable anomaly detection.</p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-gray-100 hover:border-accent/30 hover:shadow-md transition-all duration-300">
            <h4 className="font-sans text-xl font-semibold text-primary mb-2">Risk Management</h4>
            <p className="font-sans text-gray-700 leading-relaxed">Model exposure and credit scoring with transparent AI analytics.</p>
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
              <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-2xl p-8 md:p-12 border border-gray-100">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                  <div className="lg:col-span-7">
                    <h2 className="font-heading text-3xl font-medium text-primary mb-6">
                      Calculate Your Potential Savings
                    </h2>
                    <p className="font-sans text-lg text-gray-700 mb-4 leading-relaxed">
                      See how much your organization could save by adopting our platform.
                      Our consolidated approach typically reduces AI licensing costs by 70-85%.
                    </p>
                    <p className="font-sans text-lg text-gray-700 mb-6 leading-relaxed">
                      Beyond direct cost savings, our customers report significant operational improvements,
                      faster deployment times, and reduced maintenance overhead.
                    </p>
                    
                    <div className="mt-8">
                      <Link to="/contact">
                        <Button size="lg">
                          Contact Our Industry Specialists
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="mt-8 lg:mt-0 lg:col-span-5">
                    <ROICalculator />
                  </div>
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