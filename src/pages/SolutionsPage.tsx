import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Services, SOLUTIONS } from '../utils/constants';
import { ArrowRight, Cpu, Layers, LayoutDashboard, Shield, TrendingDown, Zap, Check, Brain } from 'lucide-react';
import Button from '../components/ui/Button';

const iconMap = {
  'cpu': Cpu,
  'layout-dashboard': LayoutDashboard,
  'shield': Shield,
  'trending-down': TrendingDown,
};

const aiProviders = [
  { name: 'OpenAI', price: 60 },
  { name: 'Anthropic', price: 60 },
  { name: 'Google Gemini', price: 30 },
  { name: 'Cohere', price: 19 },
  { name: 'Grok', price: 40 },
  { name: 'Meta', price: 0, label: 'Open source' },
  { name: 'DeepSeek', price: 0, label: 'Open source' },
];

const securityFeatures = [
  { name: 'SOC 2 Type II', description: 'Annual independent audit verifying our security controls' },
  { name: 'HIPAA Compliance', description: 'Secure handling of protected health information' },
  { name: 'GDPR Ready', description: 'Full compliance with EU data protection regulations' },
  { name: 'ISO 27001', description: 'Certified information security management system' },
  { name: 'Data Encryption', description: 'AES-256 encryption for data at rest and in transit' },
  { name: 'Access Controls', description: 'Role-based access control with granular permissions' },
];

const SolutionsPage: React.FC = () => {
  const { solutionId } = useParams<{ solutionId: string }>();
  const selectedSolution = solutionId 
    ? SOLUTIONS.find(solution => solution.id === solutionId) 
    : null;

  React.useEffect(() => {
    document.title = selectedSolution 
      ? `${selectedSolution.title} - ReadyAI` 
      : 'Solutions - ReadyAI';
  }, [selectedSolution]);

  const totalDirectCost = aiProviders.reduce((sum, provider) => sum + provider.price, 0);

  return (
    <div className="pt-20">
      {!selectedSolution ? (
        <div>
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-primary via-primary-light to-primary-dark overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal text-white mb-6">
                Complete AI Solution Suite
              </h1>
              <p className="font-sans text-lg md:text-xl text-white/90 max-w-4xl leading-relaxed">
                This is an enterprise-grade leading agentic AI management platform—designed to bring artificial intelligence 
                to every corner of the business. Discover our comprehensive suite of AI solutions.
              </p>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {SOLUTIONS.map(solution => {
                const Icon = iconMap[solution.icon as keyof typeof iconMap];
                
                return (
                  <Link 
                    key={solution.id} 
                    to={`/solutions/${solution.id}`}
                    className="group flex flex-col bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 h-full"
                  >
                    <div className="p-8 flex-grow">
                      {Icon && (
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mb-5 group-hover:from-accent/20 group-hover:to-accent/10 transition-colors">
                          <Icon className="h-7 w-7 text-accent" />
                        </div>
                      )}
                      <h3 className="font-heading text-2xl font-medium text-primary group-hover:text-accent transition-colors mb-3">
                        {solution.title}
                      </h3>
                      <p className="font-sans text-gray-600 leading-relaxed">
                        {solution.description}
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
          </div>
        </div>
      ) : (
        <div>
          {/* Individual Solution Hero Section */}
          <div className="relative bg-gradient-to-br from-primary via-primary-light to-primary-dark overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal text-white mb-6">
                {selectedSolution.title}
              </h1>
              <p className="font-sans text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed">
                {selectedSolution.description}
              </p>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 md:p-12 space-y-10">
              {solutionId === 'ai-agents' && (
                <div className="space-y-8">
                  <h2 className="font-heading text-3xl md:text-4xl font-medium text-primary border-b border-gray-200 pb-4">
                    AI Agents for Business Automation
                  </h2>
                  <p className="font-sans text-lg text-gray-700 leading-relaxed">
                    ReadyAI's AI agents are autonomous programs that can be customized to handle specific tasks and workflows in your organization. 
                    They combine the power of large language models with specialized tools and data access to automate complex processes that 
                    previously required human intervention.
                  </p>

                  {/* Value Props Section */}
                  <div className="bg-gradient-to-br from-primary via-primary-light to-primary-dark text-white rounded-xl p-6 md:p-8">
                    <h3 className="font-heading text-2xl font-medium mb-6 text-center">
                      All Your AI Tools in One Platform
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {[ 
                        { icon: Brain, title: '7+ AI subscriptions', subtitle: 'consolidated into one' },
                        { icon: Layers, title: '30+ AI models', subtitle: 'from leading providers' },
                        { icon: Zap, title: 'Single platform', subtitle: 'unified experience' },
                        { icon: TrendingDown, title: '~80% savings', subtitle: 'vs separate subscriptions' }
                      ].map(({ icon: Icon, title, subtitle }, i) => (
                        <div key={i} className="text-center">
                          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm mx-auto mb-3">
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="font-semibold text-white mb-1">{title}</div>
                          <div className="text-sm text-white/80">{subtitle}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Comparison Section */}
                  <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 md:p-8 border border-gray-100">
                    <h3 className="font-sans text-2xl font-semibold text-primary mb-6 text-center">
                      Pricing Comparison: Direct Subscriptions vs ReadyAI
                    </h3>
                    
                    <div className="max-w-4xl mx-auto">
                      <div className="grid grid-cols-3 gap-4 mb-4 text-center font-semibold">
                        <div className="text-left text-gray-700">Service</div>
                        <div className="text-gray-900">Direct Subscription</div>
                        <div className="text-accent">With ReadyAI</div>
                      </div>

                      {/* Services */}
                      <div className="space-y-2 mb-6">
                        {Services.map((service, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-3 items-center gap-4 py-3 px-4 rounded-lg hover:bg-white transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              {service.icon && (
                                <img
                                  src={service.icon}
                                  alt={service.name}
                                  className="h-6 w-auto object-contain"
                                />
                              )}
                              <span className="text-sm font-medium text-gray-700">{service.name}</span>
                            </div>
                            <div className="text-center text-sm font-semibold text-gray-900">{service.price}</div>
                            <div className="text-center text-sm font-semibold text-accent">Included</div>
                          </div>
                        ))}
                      </div>

                      {/* Total */}
                      <div className="border-t-2 border-gray-300 pt-6 mb-6">
                        <div className="grid grid-cols-3 gap-4 items-center">
                          <div className="text-lg font-bold text-gray-900">TOTAL</div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-red-600">$210</div>
                            <div className="text-sm text-gray-500">/mo/seat</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-green-600">$30</div>
                            <div className="text-sm text-gray-500">/mo/seat</div>
                            <div className="mt-2">
                              <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                                Save 86%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="text-center">
                        <a href="https://devs.ai/signup?ref=sales%40readyai.dev">
                          <button className="bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-10 rounded-lg transition-colors shadow-md hover:shadow-lg">
                            Get Started with ReadyAI
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 md:p-8 border border-gray-100">
                    <h3 className="font-sans text-2xl font-semibold text-primary mb-6">Key Features</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Customizable Workflows</strong> - Design agents to match your exact business processes</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Tool Integration</strong> - Connect agents to your existing tools and systems</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Human-in-the-Loop</strong> - Configure when and how agents should involve human oversight</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Visual Creation Interface</strong> - Build agents without coding experience</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-gray-700"><strong className="text-primary">Security Controls</strong> - Define precise permissions for data access and actions</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 md:p-8 border border-gray-100">
                    <h3 className="font-sans text-2xl font-semibold text-primary mb-6">Common Use Cases</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">Customer support automation</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">Document processing and analysis</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">Data extraction and reporting</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">Meeting scheduling and summarization</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-gray-700">Multi-step approval workflows</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
                
                {solutionId === 'llm-integration' && (
                  <div className="space-y-8">
                    <h2 className="font-heading text-3xl md:text-4xl font-medium text-primary border-b border-gray-200 pb-4">
                      LLM Integration
                    </h2>
                    <p className="font-sans text-lg text-gray-700 leading-relaxed">
                      Access a wide range of industry-leading large language models through a single platform. ReadyAI provides
                      a unified interface to multiple LLMs, allowing you to choose the right model for each specific use case
                      based on performance, cost, and specialized capabilities.
                    </p>
                    
                    <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 md:p-8 border border-gray-100">
                      <h3 className="font-sans text-2xl font-semibold text-primary mb-6">Available Models</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span className="font-sans text-gray-700">GPT-4 and GPT-3.5 from OpenAI</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span className="font-sans text-gray-700">Claude 3 from Anthropic</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span className="font-sans text-gray-700">Gemini from Google</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span className="font-sans text-gray-700">Specialized domain models for finance, healthcare, and legal</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span className="font-sans text-gray-700">Fine-tuned models on your proprietary data</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 md:p-8 border border-gray-100">
                      <h3 className="font-sans text-2xl font-semibold text-primary mb-6">Integration Benefits</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span className="font-sans text-gray-700"><strong className="text-primary">Cost Optimization</strong> - Route requests to the most cost-effective model for each task</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span className="font-sans text-gray-700"><strong className="text-primary">Model Redundancy</strong> - Automatic fallbacks if a particular provider has downtime</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span className="font-sans text-gray-700"><strong className="text-primary">Unified API</strong> - Consistent interface regardless of the underlying model</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span className="font-sans text-gray-700"><strong className="text-primary">Prompt Management</strong> - Centralized storage and versioning of prompts</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span className="font-sans text-gray-700"><strong className="text-primary">Performance Analytics</strong> - Compare model performance across different tasks</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {solutionId === 'security' && (
                  <div className="space-y-8">
                    <h2 className="font-heading text-3xl md:text-4xl font-medium text-primary border-b border-gray-200 pb-4">
                      Enterprise-Grade Security & Compliance
                    </h2>
                    <p className="font-sans text-lg text-gray-700 leading-relaxed">
                      The platform is built with security and compliance at its core. Our comprehensive security 
                      features and certifications ensure your AI operations meet the highest industry standards while 
                      protecting sensitive data and maintaining regulatory compliance.
                    </p>

                    <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 md:p-8 border border-gray-100">
                      <h3 className="font-sans text-2xl font-semibold text-primary mb-6">
                        Security Features & Certifications
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {securityFeatures.map((feature, index) => (
                          <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-accent/30 transition-colors">
                            <h4 className="font-sans text-lg font-semibold text-primary mb-2">{feature.name}</h4>
                            <p className="font-sans text-gray-600">{feature.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 md:p-8 border border-gray-100">
                      <h3 className="font-sans text-2xl font-semibold text-primary mb-6">Key Security Measures</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span className="font-sans text-gray-700"><strong className="text-primary">Data Privacy</strong> - Comprehensive data protection with encryption at rest and in transit</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span className="font-sans text-gray-700"><strong className="text-primary">Access Management</strong> - Granular role-based access control and user permissions</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span className="font-sans text-gray-700"><strong className="text-primary">Audit Logging</strong> - Detailed activity tracking and compliance reporting</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span className="font-sans text-gray-700"><strong className="text-primary">Network Security</strong> - Advanced firewalls and intrusion detection systems</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span className="font-sans text-gray-700"><strong className="text-primary">Compliance Monitoring</strong> - Automated compliance checks and reporting</span>
                        </li>
                      </ul>
                    </div>                    
                  </div>
                )}
                
                {/* CTA Section */}
                <div className="mt-10 border-t border-gray-200 pt-10">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div>
                      <h3 className="font-sans text-lg font-medium text-gray-900">Ready to explore this solution?</h3>
                      <p className="font-sans mt-1 text-sm text-gray-500">Contact our team for a personalized demonstration.</p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <Link to="/contact">
                        <Button className="w-full sm:w-auto">
                          Contact Sales
                        </Button>
                      </Link>
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

export default SolutionsPage;