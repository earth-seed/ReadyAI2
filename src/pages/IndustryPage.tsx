import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { INDUSTRIES } from '../utils/constants';
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
  Check
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
              <div className="lg:flex lg:items-center lg:justify-between">
                <div>
                  <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal text-white mb-6">
                    {selectedIndustry.name}
                  </h1>
                  <p className="font-sans text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed">
                    {selectedIndustry.description}
                  </p>
                </div>
                <div className="mt-8 lg:mt-0 lg:ml-8">
                  <Link to="/industry">
                    <Button variant="outline" className="border-white text-white hover:bg-white/10 backdrop-blur-sm">
                      All Industries
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 md:p-12 space-y-10">
              {industryId === 'financial' && (
                <div className="space-y-8">
                  <h2 className="font-heading text-3xl md:text-4xl font-medium text-primary border-b border-gray-200 pb-4">
                    AI Solutions for Financial Services
                  </h2>
                  <p className="font-sans text-lg text-gray-700 leading-relaxed">
                    In the fast-paced world of financial services, AI is revolutionizing everything from customer service to risk management. 
                    Our platform provides a secure, compliant platform that enables financial institutions to deploy AI solutions with confidence.
                  </p>
                  
                  <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 md:p-8 border border-gray-100">
                    <h3 className="font-sans text-2xl font-semibold text-primary mb-6">Key Applications</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Fraud Detection</strong> - AI agents that monitor transactions in real-time and flag suspicious activities</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Customer Service</strong> - Intelligent assistants that handle routine customer inquiries while maintaining compliance</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Document Processing</strong> - Automated extraction and analysis of financial documents</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Risk Assessment</strong> - Advanced models for credit scoring and risk evaluation</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Regulatory Compliance</strong> - AI-powered monitoring to ensure adherence to changing regulations</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 md:p-8 border border-gray-100">
                    <h3 className="font-sans text-2xl font-semibold text-primary mb-6">Industry-Specific Benefits</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">SOC 2 and ISO 27001 compliance</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">Granular access controls</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">Comprehensive audit trails</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">Core banking integration</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">Data residency options</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {industryId === 'retail' && (
                <div className="space-y-8">
                  <h2 className="font-heading text-3xl md:text-4xl font-medium text-primary border-b border-gray-200 pb-4">
                    AI Solutions for Retail
                  </h2>
                  <p className="font-sans text-lg text-gray-700 leading-relaxed">
                    The retail industry faces intense competition and rapidly changing consumer expectations. 
                    Our platform helps retailers create personalized experiences, optimize operations, and build 
                    stronger customer relationships through intelligent AI applications.
                  </p>
                  
                  <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 md:p-8 border border-gray-100">
                    <h3 className="font-sans text-2xl font-semibold text-primary mb-6">Key Applications</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Personalized Recommendations</strong> - AI agents that analyze customer behavior to suggest relevant products</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Inventory Management</strong> - Predictive models that optimize stock levels and reduce waste</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Customer Service</strong> - Omnipresent support across digital channels with seamless human handoff</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Pricing Optimization</strong> - Dynamic pricing models based on demand, competition, and inventory</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Customer Insights</strong> - Deep analysis of customer feedback and behavior patterns</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 md:p-8 border border-gray-100">
                    <h3 className="font-sans text-2xl font-semibold text-primary mb-6">Industry-Specific Benefits</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">Integration with major e-commerce platforms</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">Support for omnichannel experiences</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">Real-time analytics capabilities</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">Point-of-sale system integration</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">GDPR and CCPA compliance</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {industryId === 'healthcare' && (
                <div className="space-y-8">
                  <h2 className="font-heading text-3xl md:text-4xl font-medium text-primary border-b border-gray-200 pb-4">
                    AI Solutions for Healthcare & Life Sciences
                  </h2>
                  <p className="font-sans text-lg text-gray-700 leading-relaxed">
                    Healthcare organizations face unique challenges in balancing innovation with patient safety and regulatory compliance. 
                    Our platform provides a secure platform for deploying AI solutions that improve patient outcomes while maintaining the 
                    highest standards of data protection and compliance.
                  </p>
                  
                  <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 md:p-8 border border-gray-100">
                    <h3 className="font-sans text-2xl font-semibold text-primary mb-6">Key Applications</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Clinical Documentation</strong> - AI-assisted note taking and summarization for providers</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Patient Engagement</strong> - Intelligent communication tools for education and care coordination</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Research Analysis</strong> - Processing and analyzing large datasets for clinical research</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Administrative Automation</strong> - Streamlining billing, scheduling, and other administrative tasks</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Clinical Decision Support</strong> - Providing relevant information to assist healthcare providers</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 md:p-8 border border-gray-100">
                    <h3 className="font-sans text-2xl font-semibold text-primary mb-6">Industry-Specific Benefits</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">HIPAA compliance</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">EHR system integration</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">Complete audit trails</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">PHI handling compliance</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">Flexible deployment options</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {industryId === 'manufacturing' && (
                <div className="space-y-8">
                  <h2 className="font-heading text-3xl md:text-4xl font-medium text-primary border-b border-gray-200 pb-4">
                    AI Solutions for Manufacturing
                  </h2>
                  <p className="font-sans text-lg text-gray-700 leading-relaxed">
                    In today's competitive manufacturing environment, efficiency and quality are paramount. 
                    Our platform helps manufacturers implement AI solutions that optimize production processes, 
                    improve quality control, and reduce downtime through predictive maintenance.
                  </p>
                  
                  <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 md:p-8 border border-gray-100">
                    <h3 className="font-sans text-2xl font-semibold text-primary mb-6">Key Applications</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Predictive Maintenance</strong> - AI models that forecast equipment failures before they occur</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Quality Control</strong> - Computer vision systems for automated defect detection</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Supply Chain Optimization</strong> - Intelligent forecasting and inventory management</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Production Planning</strong> - AI-driven scheduling to maximize throughput and efficiency</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Safety Monitoring</strong> - Real-time analysis of operational data to enhance workplace safety</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 md:p-8 border border-gray-100">
                    <h3 className="font-sans text-2xl font-semibold text-primary mb-6">Industry-Specific Benefits</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">IoT system integration</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">Edge computing support</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">Real-time processing</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">MES/ERP compatibility</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">Manufacturing versatility</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {industryId === 'energy' && (
                <div className="space-y-8">
                  <h2 className="font-heading text-3xl md:text-4xl font-medium text-primary border-b border-gray-200 pb-4">
                    AI Solutions for Energy & Utilities
                  </h2>
                  <p className="font-sans text-lg text-gray-700 leading-relaxed">
                    The energy and utilities sector is undergoing a profound transformation driven by renewable energy sources,
                    smart grids, and changing consumer expectations. Our platform helps energy companies leverage AI to optimize 
                    operations, improve reliability, and accelerate the transition to sustainable energy systems.
                  </p>
                  
                  <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 md:p-8 border border-gray-100">
                    <h3 className="font-sans text-2xl font-semibold text-primary mb-6">Key Applications</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Grid Management</strong> - AI systems that optimize energy distribution and reduce losses</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Predictive Maintenance</strong> - Forecasting equipment failures for utility infrastructure</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Energy Forecasting</strong> - Accurate prediction of renewable energy production and demand</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Customer Engagement</strong> - Personalized tools for helping consumers manage energy usage</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Asset Optimization</strong> - Maximizing the efficiency and lifespan of equipment</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 md:p-8 border border-gray-100">
                    <h3 className="font-sans text-2xl font-semibold text-primary mb-6">Industry-Specific Benefits</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">SCADA integration</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">Time-series analysis</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">Infrastructure security</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">Regulatory compliance</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">Renewable compatibility</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {industryId === 'public' && (
                <div className="space-y-8">
                  <h2 className="font-heading text-3xl md:text-4xl font-medium text-primary border-b border-gray-200 pb-4">
                    AI Solutions for Public Sector
                  </h2>
                  <p className="font-sans text-lg text-gray-700 leading-relaxed">
                    Government agencies and public sector organizations face unique challenges in delivering efficient services 
                    while maintaining transparency and protecting citizen data. Our platform provides secure, compliant AI solutions 
                    that help public sector entities improve service delivery and operational efficiency.
                  </p>
                  
                  <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 md:p-8 border border-gray-100">
                    <h3 className="font-sans text-2xl font-semibold text-primary mb-6">Key Applications</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Citizen Services</strong> - AI assistants that provide 24/7 access to government information and services</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Document Processing</strong> - Automated classification and extraction of information from forms and documents</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Fraud Detection</strong> - Identifying patterns that may indicate fraudulent activity in benefit programs</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Resource Allocation</strong> - Optimizing the deployment of public resources based on need and impact</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Emergency Response</strong> - Coordinating and prioritizing actions during emergencies</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 md:p-8 border border-gray-100">
                    <h3 className="font-sans text-2xl font-semibold text-primary mb-6">Industry-Specific Benefits</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">Data residency options</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">Accessibility features</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">Transparent AI decisions</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">Legacy system support</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-20">
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

      <CalendlySectionPopUp />
      
    </div>
  );
};

export default IndustryPage;