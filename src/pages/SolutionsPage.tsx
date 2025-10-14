import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Services, SOLUTIONS } from '../utils/constants';
import { ArrowRight, Cpu, Layers, LayoutDashboard, Shield, TrendingDown, Zap } from 'lucide-react';
import Button from '../components/ui/Button';
import FloatingButton from '../utils/FloatingButton';

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
    <div className="pt-20 w-full max-w-full text-center md:text-left">
      {!selectedSolution ? (
        <div>
          <div className="bg-primary py-16 w-full">
            <div className="w-full max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
                Complete AI Solution Suite
              </h1>
              <p className="mt-4 text-lg text-gray-100 max-w-3xl">
                This is an enterprise-grade leading agentic AI management platform—designed to bring artificial intelligence 
                to every corner of the business. Discover our comprehensive suite of AI solutions
              </p>
            </div>
          </div>
          
          <div className="w-full max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {SOLUTIONS.map(solution => {
                const Icon = iconMap[solution.icon as keyof typeof iconMap];
                
                return (
                  <Link 
                    key={solution.id} 
                    to={`/solutions/${solution.id}`}
                    className="group flex flex-col bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full"
                  >
                    <div className="p-6 flex-grow">
                      {Icon && (
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                          <Icon className="h-6 w-6 text-accent" />
                        </div>
                      )}
                      <h3 className="text-xl font-semibold text-primary group-hover:text-accent">
                        {solution.title}
                      </h3>
                      <p className="mt-3 text-gray-600">
                        {solution.description}
                      </p>
                    </div>
                    <div className="p-6 pt-0 mt-auto">
                      <span className="text-accent font-medium inline-flex items-center group-hover:underline">
                        Learn more
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
          <div className="bg-primary py-16 w-full">
            <div className="w-full max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8">
              <div className="lg:flex lg:items-center lg:justify-between">
                <div>
                  <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
                    {selectedSolution.title}
                  </h1>
                  <p className="mt-4 text-xl text-gray-100 max-w-3xl">
                    {selectedSolution.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8 py-12">
            <div className="prose prose-lg max-w-none">
              <div className="bg-white rounded-lg shadow-sm  space-y-8">
                {solutionId === 'ai-agents' && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-primary border-b border-gray-200 pb-4">
                      AI Agents for Business Automation
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      ReadyAI's AI agents are autonomous programs that can be customized to handle specific tasks and workflows in your organization. 
                      They combine the power of large language models with specialized tools and data access to automate complex processes that 
                      previously required human intervention.
                    </p>

                    {/* Comparison Section */}
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Left Section */}
        <div className="w-full md:w-1/2 bg-gradient-to-b from-accent2 to-gray-800 text-white p-8 md:p-16 flex flex-col rounded-3xl">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold mb-12 leading-tight">
              ReadyAI value
            </h1>
            <div className="space-y-8">
              {[ 
                { icon: Brain, title: '7+', subtitle: 'AI subscriptions' },
                { icon: Layers, title: '30+', subtitle: 'offering AI models' },
                { icon: Zap, title: '1', subtitle: 'rolled into one platform' },
                { icon: TrendingDown, title: '~80%', subtitle: 'discount' }
              ].map(({ icon: Icon, title, subtitle }, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className={`text-${title.includes('%') ? '4xl' : '5xl'} font-bold text-accent-light`}>
                      {title}
                    </div>
                    <div className="text-xl text-accent">{subtitle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 bg-white md:p-16">
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-3 gap-4 mb-8 text-center">
              <div></div>
              <h2 className="text-2xl font-bold text-gray-900">Direct sub</h2>
              <h2 className="text-2xl font-bold text-gray-900">ReadyAI</h2>
            </div>

            {/* Services */}
            <div className="space-y-4 mb-8">
              {Services.map((service, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 items-center gap-4 py-4 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  <div className="flex items-center gap-4">
                    {service.icon && (
                      <img
                        src={service.icon}
                        alt={service.name}
                        className="w-40 sm:w-40 h-auto object-contain max-w-full"
                      />
                    )}
                  </div>
                  <div className="text-center">
                    <span className="text-lg font-medium text-gray-700">{service.price}</span>
                  </div>
                  <div className="text-center">
                    {service.name && (
                      <span className="text-lg font-medium text-accent-dark">All Models Included</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t-2 border-gray-200 pt-6">
              <div className="grid grid-cols-3 gap-4 items-center">
                <div>
                  <span className="text-2xl font-bold text-gray-900">TOTAL</span>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">$210</div>
                  <div className="text-sm text-gray-500">/mo/seat</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600">$30</div>
                  <div className="text-sm text-gray-500">/mo/seat</div>
                  <div className="mt-2">
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Save 86%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
              <a href="https://devs.ai/signup?ref=sales%40readyai.dev">
                <button className="bg-accent hover:bg-accent-dark text-white font-bold py-4 px-12 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                  Get Started with ReadyAI
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
                    
                    <div className="bg-gray-50 rounded-lg p-6 text-center md:text-left">
                      <h3 className="text-2xl font-semibold text-primary mb-4">Key Features</h3>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="flex-shrink-0 h-6 w-6 text-accent mr-2">•</span>
                          <span><strong>Customizable Workflows</strong> - Design agents to match your exact business processes</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 h-6 w-6 text-accent mr-2">•</span>
                          <span><strong>Tool Integration</strong> - Connect agents to your existing tools and systems</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 h-6 w-6 text-accent mr-2">•</span>
                          <span><strong>Human-in-the-Loop</strong> - Configure when and how agents should involve human oversight</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 h-6 w-6 text-accent mr-2">•</span>
                          <span><strong>Visual Creation Interface</strong> - Build agents without coding experience</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 h-6 w-6 text-accent mr-2">•</span>
                          <span><strong>Security Controls</strong> - Define precise permissions for data access and actions</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-6 text-center md:text-left">
                      <h3 className="text-2xl font-semibold text-primary mb-4 ">Common Use Cases</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                        <li className="flex items-center space-x-2">
                          <ArrowRight className="h-5 w-5 text-accent" />
                          <span>Customer support automation</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <ArrowRight className="h-5 w-5 text-accent" />
                          <span>Document processing and analysis</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <ArrowRight className="h-5 w-5 text-accent" />
                          <span>Data extraction and reporting</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <ArrowRight className="h-5 w-5 text-accent" />
                          <span>Meeting scheduling and summarization</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <ArrowRight className="h-5 w-5 text-accent" />
                          <span>Multi-step approval workflows</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
                
                {solutionId === 'llm-integration' && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-primary border-b border-gray-200 pb-4">
                      LLM Integration
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Access a wide range of industry-leading large language models through a single platform. ReadyAI's provides
                      a unified interface to multiple LLMs, allowing you to choose the right model for each specific use case
                      based on performance, cost, and specialized capabilities
                    </p>
                    
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-2xl font-semibold text-primary mb-4">Available Models</h3>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="flex-shrink-0 h-6 w-6 text-accent mr-2">•</span>
                          <span>GPT-4 and GPT-3.5 from OpenAI</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 h-6 w-6 text-accent mr-2">•</span>
                          <span>Claude 3 from Anthropic</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 h-6 w-6 text-accent mr-2">•</span>
                          <span>Gemini from Google</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 h-6 w-6 text-accent mr-2">•</span>
                          <span>Specialized domain models for finance, healthcare, and legal</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 h-6 w-6 text-accent mr-2">•</span>
                          <span>Fine-tuned models on your proprietary data</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-2xl font-semibold text-primary mb-4">Integration Benefits</h3>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="flex-shrink-0 h-6 w-6 text-accent mr-2">•</span>
                          <span><strong>Cost Optimization</strong> - Route requests to the most cost-effective model for each task</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 h-6 w-6 text-accent mr-2">•</span>
                          <span><strong>Model Redundancy</strong> - Automatic fallbacks if a particular provider has downtime</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 h-6 w-6 text-accent mr-2">•</span>
                          <span><strong>Unified API</strong> - Consistent interface regardless of the underlying model</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 h-6 w-6 text-accent mr-2">•</span>
                          <span><strong>Prompt Management</strong> - Centralized storage and versioning of prompts</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 h-6 w-6 text-accent mr-2">•</span>
                          <span><strong>Performance Analytics</strong> - Compare model performance across different tasks</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {solutionId === 'security' && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-primary border-b border-gray-200 pb-4">
                      Enterprise-Grade Security & Compliance
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      The platform is built with security and compliance at its core. Our comprehensive security 
                      features and certifications ensure your AI operations meet the highest industry standards while 
                      protecting sensitive data and maintaining regulatory compliance.
                    </p>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-2xl font-semibold text-primary mb-6">
                        Security Features & Certifications
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {securityFeatures.map((feature, index) => (
                          <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                            <h4 className="text-lg font-semibold text-primary mb-2">{feature.name}</h4>
                            <p className="text-gray-600">{feature.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-2xl font-semibold text-primary mb-4">Key Security Measures</h3>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="flex-shrink-0 h-6 w-6 text-accent mr-2">•</span>
                          <span><strong>Data Privacy</strong> - Comprehensive data protection with encryption at rest and in transit</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 h-6 w-6 text-accent mr-2">•</span>
                          <span><strong>Access Management</strong> - Granular role-based access control and user permissions</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 h-6 w-6 text-accent mr-2">•</span>
                          <span><strong>Audit Logging</strong> - Detailed activity tracking and compliance reporting</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 h-6 w-6 text-accent mr-2">•</span>
                          <span><strong>Network Security</strong> - Advanced firewalls and intrusion detection systems</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 h-6 w-6 text-accent mr-2">•</span>
                          <span><strong>Compliance Monitoring</strong> - Automated compliance checks and reporting</span>
                        </li>
                      </ul>
                    </div>                    
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-10 border-t border-gray-200 pt-10 text-center md:text-left">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Ready to explore this solution?</h3>
                  <p className="mt-1 text-sm text-gray-500">Contact our team for a personalized demonstration.</p>
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
      )}
      
      <FloatingButton url="https://devs.ai/signup?ref=sales%40readyai.dev" label="Explore Platform" />
    </div>
  );
};

export default SolutionsPage;