import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Services, SOLUTIONS } from '../utils/constants';
import { ArrowRight, Cpu, Layers, LayoutDashboard, Shield, TrendingDown, Zap, Check, Brain, Users, Lock, BarChart3, Database, Eye, FileText, AlertTriangle, Target, TrendingUp, ChevronRight, DollarSign, ChevronDown, BookOpen, GitBranch, RefreshCw, Boxes } from 'lucide-react';
import Button from '../components/ui/Button';
import CalendlyBtn from '../components/sections/CalendlyBtn';
import { motion, AnimatePresence } from 'framer-motion';

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

const platformFeatures = [
  {
    id: 'centralized-llm',
    name: 'Centralized LLM Access',
    description: 'Access every major large language model (LLM) — including GPT, Claude, Gemini, and domain-specific models — through one secure interface. Select the right model for each use case, manage costs effectively, and ensure compliance.',
    icon: Database
  },
  {
    id: 'enterprise-security',
    name: 'Enterprise Security',
    description: 'Built for SOC 2, ISO 27001, GDPR, and HIPAA compliance. Every dataset, model, and interaction is encrypted, traceable, and auditable.',
    icon: Shield
  },
  {
    id: 'compliance-framework',
    name: 'Compliance Framework',
    description: 'Govern AI at scale with built-in controls for data residency, retention, and access. ReadyAI.dev ensures your operations meet enterprise and regulatory standards automatically.',
    icon: Lock
  },
  {
    id: 'usage-analytics',
    name: 'Usage Analytics',
    description: 'Gain visibility into performance, model utilization, and cost trends across your organization. Every insight is transparent and measurable.',
    icon: BarChart3
  },
  {
    id: 'cost-management',
    name: 'Cost Management',
    description: 'Optimize spend across multiple LLMs with unified billing and automated routing to the most efficient model for each task.',
    icon: TrendingDown
  },
  {
    id: 'user-governance',
    name: 'User Governance',
    description: 'Assign permissions by role and function. Control who can prompt, deploy, and access models — maintaining a complete audit trail for every action.',
    icon: Users
  }
];

const SolutionsPage: React.FC = () => {
  const { solutionId } = useParams<{ solutionId: string }>();
  const selectedSolution = solutionId 
    ? SOLUTIONS.find(solution => solution.id === solutionId) 
    : null;
  const [activeFeature, setActiveFeature] = useState(0);
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  React.useEffect(() => {
    document.title = selectedSolution 
      ? `${selectedSolution.title} - ReadyAI` 
      : 'Platform - ReadyAI';
  }, [selectedSolution]);

  // Tab state for capabilities section
  const [activeTab, setActiveTab] = useState<'rag' | 'actions' | 'integrations'>('rag');

  const totalDirectCost = aiProviders.reduce((sum, provider) => sum + provider.price, 0);
  const currentFeature = platformFeatures[activeFeature];

  return (
    <div>
      {!selectedSolution ? (
        <div>
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-primary via-primary-light to-primary-dark overflow-hidden pt-24">
            {/* Enhanced Background Elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>
              <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            </div>
            
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
              <div className="max-w-4xl">
                <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white mb-6 sm:mb-8 leading-tight">
                  Inside the<br /><span className="text-accent">AI Operating Layer</span>
                </h1>
                
                <p className="font-sans text-base sm:text-lg md:text-xl text-white/90 mb-6 leading-relaxed max-w-3xl">
                  Every capability in our platform connects back to one purpose: <span className="font-semibold text-white">giving enterprises a single, governed operating layer that unifies every model, agent, and workflow.</span>
                </p>
                
                <p className="font-sans text-base md:text-lg text-white/90 mb-6 leading-relaxed max-w-3xl">
                  The platform gives your enterprise everything you need to turn your AI potential into performance.
                </p>
                
                <p className="font-sans text-base md:text-lg text-white/90 mb-10 leading-relaxed max-w-3xl">
                  From knowledge-enhanced agents to real-time integrations, every feature is built to expand your capabilities without compromising your control.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://devs.ai/signup?ref=sales%40readyai.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-white rounded-xl font-sans font-semibold hover:bg-accent-dark hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 shadow-2xl"
                  >
                    Explore Platform
                    <ArrowRight className="w-5 h-5" />
                  </a>
                <CalendlyBtn
                  url="https://calendly.com/readyai-sales"
                  text="Book a Call"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-sans font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
                />
                </div>
              </div>
            </div>
          </div>

          {/* Cream Banner - Key Message */}
          <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 border-y border-amber-100 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl">
                <div className="relative">
                  {/* Subtle decorative accent */}
                  <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-accent-light to-accent rounded-full"></div>
                  
                  <div className="pl-8">
                    <p className="font-heading text-2xl md:text-3xl lg:text-4xl text-primary font-normal mb-4 leading-tight">
                      Your entire internal AI ecosystem — finally unified under one operating layer.
                    </p>
                    <p className="font-sans text-base text-primary-light leading-relaxed">
                      Now you can govern every model and workflow from one secure foundation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Capabilities Section with Tabs */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center mb-12">
              <p className="font-sans text-accent text-sm md:text-base uppercase tracking-widest mb-6">
                Intelligence Layer
              </p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal text-primary mb-6">
                Capabilities
              </h2>
              <p className="font-sans text-base text-primary-light max-w-3xl mx-auto leading-relaxed">
                These capabilities form the intelligence layer that powers your enterprise AI — governed, connected, and built for scale.
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <button
                onClick={() => setActiveTab('rag')}
                className={`px-6 py-3 rounded-xl font-sans font-medium transition-all duration-300 ${
                  activeTab === 'rag'
                    ? 'bg-accent text-white shadow-lg'
                    : 'bg-gray-100 text-primary hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span>RAG & Knowledge</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('actions')}
                className={`px-6 py-3 rounded-xl font-sans font-medium transition-all duration-300 ${
                  activeTab === 'actions'
                    ? 'bg-accent text-white shadow-lg'
                    : 'bg-gray-100 text-primary hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  <span>Agentic Actions</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('integrations')}
                className={`px-6 py-3 rounded-xl font-sans font-medium transition-all duration-300 ${
                  activeTab === 'integrations'
                    ? 'bg-accent text-white shadow-lg'
                    : 'bg-gray-100 text-primary hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <GitBranch className="w-5 h-5" />
                  <span>Flexible Integrations</span>
                </div>
              </button>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'rag' && (
                <motion.div
                  key="rag"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-gradient-to-br from-primary via-primary-light to-primary-dark text-white rounded-2xl p-8 md:p-12 relative overflow-hidden"
                >
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-6 mb-6">
                      <div className="w-16 h-16 bg-accent/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-8 h-8 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-heading text-2xl md:text-3xl font-normal text-white mb-3">
                          Augment Knowledge with RAG
                        </h3>
                        <p className="font-sans text-base text-accent mb-4 font-medium">
                          Enhance your accuracy. Expand your enterprise intelligence.
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 text-white/90 font-sans text-base leading-relaxed">
                      <p>
                        Augment the knowledge of your AI agents with Retrieval-Augmented Generation (RAG). You can use this cutting-edge technique to enhance your generative AI with factual accuracy and relevance.
                      </p>
                      <p>
                        Your enterprise can safely upload and manage all your proprietary data. It ensures your AI agents generate business-specific, reliable responses that align with your objectives.
                      </p>
                      <p>
                        RAG strengthens every internal AI workflow with verified, contextual knowledge.
                      </p>
                      <p>
                        RAG gives your agents access to the most up-to-date information, which helps to drive informed decision-making and consistent performance.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'actions' && (
                <motion.div
                  key="actions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-gradient-to-br from-primary via-primary-light to-primary-dark text-white rounded-2xl p-8 md:p-12 relative overflow-hidden"
                >
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-6 mb-6">
                      <div className="w-16 h-16 bg-accent/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Zap className="w-8 h-8 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-heading text-2xl md:text-3xl font-normal text-white mb-3">
                          Agentic Actions
                        </h3>
                        <p className="font-sans text-base text-accent mb-4 font-medium">
                          Move from a response mindset to an execution approach.
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 text-white/90 font-sans text-base leading-relaxed">
                      <p>
                        Easily integrate your AI agents with existing systems and workflows using the platform's extensive API offerings.
                      </p>
                      <p>
                        Our APIs enable your agents to trigger specific agentic actions. For example, these actions can help you interact with other software and systems, process transactions, retrieve data, and update records.
                      </p>
                      <p>
                        By connecting to external applications, your agents can automate tasks in real time, driving efficiency and streamlining workflows across your enterprise systems.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'integrations' && (
                <motion.div
                  key="integrations"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-gradient-to-br from-primary via-primary-light to-primary-dark text-white rounded-2xl p-8 md:p-12 relative overflow-hidden"
                >
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-6 mb-6">
                      <div className="w-16 h-16 bg-accent/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                        <GitBranch className="w-8 h-8 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-heading text-2xl md:text-3xl font-normal text-white mb-3">
                          Flexible Integrations
                        </h3>
                        <p className="font-sans text-base text-accent mb-4 font-medium">
                          Connect all your internal AI across your enterprise ecosystem.
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 text-white/90 font-sans text-base leading-relaxed">
                      <p>
                        Your AI solutions become instantly scalable across the entire tech stack, so you can deliver real business value throughout systems and workflows.
                      </p>
                      <p>
                        Integrate all your AI agents across your ecosystem of business applications.
                      </p>
                      <p>
                        The platform offers extensive integrations with popular platforms like Confluence, GitHub, Jira, and OneDrive.
                      </p>
                      <p className="font-medium text-accent text-lg">
                        Together, these capabilities form the intelligence core of your AI operating layer — unified, governed, and fully adaptable.
                      </p>
                    </div>

                    {/* Integration logos */}
                    <div className="mt-8 pt-8 border-t border-white/20">
                      <div className="text-left">
                        <div className="text-white/70 font-sans text-sm font-medium mb-4">Integrates with:</div>
                        <div className="flex flex-wrap gap-4">
                          <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white font-medium text-sm">Confluence</span>
                          <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white font-medium text-sm">GitHub</span>
                          <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white font-medium text-sm">Jira</span>
                          <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white font-medium text-sm">OneDrive</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA Section */}
            <div className="text-center mt-12">
              <CalendlyBtn
                url="https://calendly.com/readyai-sales"
                text="See How It Works"
                className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-xl font-sans font-semibold hover:bg-accent-dark hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
              />
            </div>
          </div>

          {/* Operational Management Section */}
          <div className="bg-gradient-to-br from-primary via-primary-light to-primary-dark py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <p className="font-sans text-accent text-sm md:text-base uppercase tracking-widest mb-6">
                  Operations Layer
                </p>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal text-white mb-6">
                  Operational Management
                </h2>
                <p className="font-sans text-base text-white/90 max-w-3xl mx-auto leading-relaxed">
                  Maintain complete control over your AI ecosystem with comprehensive lifecycle management.
                </p>
              </div>

              {/* Agent Management Card */}
              <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <RefreshCw className="w-8 h-8 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl md:text-3xl font-normal text-primary mb-3">
                        Agent Management
                      </h3>
                      <p className="font-sans text-base text-accent mb-4 font-medium">
                        Govern, optimize, and evolve every AI agent with ease.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 text-primary-light font-sans text-base leading-relaxed">
                    <p>
                      Take control of your AI, so you can enjoy optimal AI performance with our built-in lifecycle management.
                    </p>
                    <p>
                      With the platform, you can manage the entire lifecycle of your agent, from initial customization to ongoing data and LLM updates, ensuring continuous optimization.
                    </p>
                    <p>
                      You can also train your AI with real-time data and monitor its performance to guarantee efficiency. The platform enables effortless LLM swaps, retaining context and knowledge, with no integration or financial hurdles.
                    </p>
                    <p className="text-primary font-semibold text-lg">
                      It gives CIOs full internal AI control — with no chaos, no duplication, and no vendor lock-in.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Offerings Section */}
          <div className="bg-accent2-lightest py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <p className="font-sans text-accent text-sm md:text-base uppercase tracking-widest mb-6">
                  Expert Guidance
                </p>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal text-primary mb-6">
                  Service Offerings
                </h2>
                <p className="font-sans text-base text-primary-light max-w-3xl mx-auto mb-4 leading-relaxed">
                  Accelerate your AI adoption with expert-led guidance.
                </p>
                <p className="font-sans text-base text-primary-light max-w-4xl mx-auto leading-relaxed">
                  Our professional services help you implement, scale, and manage your AI ecosystem within the ReadyAI.dev framework — ensuring a smooth, compliant journey from pilot to full deployment.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-accent/30 hover:shadow-lg transition-all duration-300">
                  <h3 className="font-heading text-lg font-normal text-primary mb-4 pb-4 border-b border-gray-100">AI Strategy Consulting</h3>
                  <p className="font-sans text-base text-primary-light leading-relaxed">
                    Define your AI roadmap, governance policies, and integration strategy to drive effective AI adoption.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-accent/30 hover:shadow-lg transition-all duration-300">
                  <h3 className="font-heading text-lg font-normal text-primary mb-4 pb-4 border-b border-gray-100">Change Management</h3>
                  <p className="font-sans text-base text-primary-light leading-relaxed">
                    Support your teams through adoption with structured enablement.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-accent/30 hover:shadow-lg transition-all duration-300">
                  <h3 className="font-heading text-lg font-normal text-primary mb-4 pb-4 border-b border-gray-100">Implementation Services</h3>
                  <p className="font-sans text-base text-primary-light leading-relaxed">
                    Integrate ReadyAI.dev with your existing tools, data pipelines, and cloud infrastructure to streamline your workflow.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-accent/30 hover:shadow-lg transition-all duration-300">
                  <h3 className="font-heading text-lg font-normal text-primary mb-4 pb-4 border-b border-gray-100">Pilots</h3>
                  <p className="font-sans text-base text-primary-light leading-relaxed">
                    Launch controlled, measurable pilots that prove value while maintaining compliance.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-accent/30 hover:shadow-lg transition-all duration-300">
                  <h3 className="font-heading text-lg font-normal text-primary mb-4 pb-4 border-b border-gray-100">Training & Enablement</h3>
                  <p className="font-sans text-base text-primary-light leading-relaxed">
                    Equip business and technical teams with the knowledge to govern and scale AI responsibly.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-accent/30 hover:shadow-lg transition-all duration-300">
                  <h3 className="font-heading text-lg font-normal text-primary mb-4 pb-4 border-b border-gray-100">Virtual AI Architect</h3>
                  <p className="font-sans text-base text-primary-light leading-relaxed">
                    On-demand technical leadership to design and deploy secure AI environments.
                  </p>
                </div>
              </div>

              <div className="text-center mt-12">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-xl font-sans font-semibold hover:bg-primary-dark hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  Talk to Our Team
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quote Section */}
          <div className="bg-gradient-to-br from-primary via-primary-light to-primary-dark py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Carol's Image */}
                <div className="lg:w-1/3">
                  <img 
                    src="/assets/images/readyai-carol-eastman.jpeg" 
                    alt="Carol Eastman - CEO of ReadyAI" 
                    className="rounded-2xl shadow-2xl w-full max-w-md mx-auto lg:mx-0"
                  />
                </div>
                
                {/* Quote and CTA */}
                <div className="lg:w-2/3 text-center lg:text-left">
                  <blockquote className="font-heading text-2xl md:text-3xl lg:text-4xl text-white mb-8 leading-tight italic">
                    "ReadyAI.dev bridges governance and innovation — empowering enterprises to scale AI responsibly and confidently."
                  </blockquote>
                  
                  <div className="text-white/90 text-xl mb-8">
                    — Carol Eastman, CEO, ReadyAI.dev
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <CalendlyBtn
                      url="https://calendly.com/readyai-sales"
                      text="Schedule a Call"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-xl font-sans font-semibold hover:bg-accent-dark hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Elements Section */}
          <div className="bg-gradient-to-br from-accent2-lightest to-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <p className="font-sans text-accent text-sm md:text-base uppercase tracking-widest mb-6">
                  Security & Compliance
                </p>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal text-primary mb-6">
                  Trust Elements
                </h2>
                <p className="font-sans text-base text-primary-light max-w-3xl mx-auto leading-relaxed">
                  Security and compliance — built into every layer of the platform.
                </p>
              </div>

              {/* Combined Card - Security Standards & Governance */}
              <div className="bg-white rounded-2xl p-8 md:p-10 border border-gray-200 shadow-sm mb-8">
                {/* Security Standards */}
                <div className="mb-10 pb-10 border-b border-gray-200">
                  <h3 className="font-heading text-xl md:text-2xl font-normal text-primary mb-6">Security & Compliance Standards</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    <span className="px-4 py-2 bg-primary text-white rounded-lg font-sans text-sm font-medium text-center">AES-256</span>
                    <span className="px-4 py-2 bg-primary text-white rounded-lg font-sans text-sm font-medium text-center">GDPR & HIPAA</span>
                    <span className="px-4 py-2 bg-primary text-white rounded-lg font-sans text-sm font-medium text-center">ISO 27001</span>
                    <span className="px-4 py-2 bg-primary text-white rounded-lg font-sans text-sm font-medium text-center">SOC 2 Type II</span>
                    <span className="px-4 py-2 bg-primary text-white rounded-lg font-sans text-sm font-medium text-center">Continuous Compliance</span>
                  </div>
                </div>

                {/* Governance Architecture */}
                <div>
                  <h3 className="font-heading text-xl md:text-2xl font-normal text-primary mb-6">Governance Architecture</h3>
                  <p className="font-sans text-base text-primary-light mb-6 max-w-2xl">
                    Four interconnected layers ensure complete AI governance and compliance
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Audits Layer */}
                    <div className="bg-accent2-lightest rounded-xl p-5 border border-gray-100">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-accent-dark to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                          <BarChart3 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-heading text-lg font-normal text-primary mb-1">Audits Layer</h4>
                          <p className="font-sans text-base text-primary-light leading-relaxed">Logging, tracking, compliance reporting, and audit trails</p>
                        </div>
                      </div>
                    </div>

                    {/* Users Layer */}
                    <div className="bg-accent2-lightest rounded-xl p-5 border border-gray-100">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-light to-primary rounded-lg flex items-center justify-center flex-shrink-0">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-heading text-lg font-normal text-primary mb-1">Users Layer</h4>
                          <p className="font-sans text-base text-primary-light leading-relaxed">Role-based access, permissions, authentication, and user management</p>
                        </div>
                      </div>
                    </div>

                    {/* Models Layer */}
                    <div className="bg-accent2-lightest rounded-xl p-5 border border-gray-100">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-dark rounded-lg flex items-center justify-center flex-shrink-0">
                          <Brain className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-heading text-lg font-normal text-primary mb-1">Models Layer</h4>
                          <p className="font-sans text-base text-primary-light leading-relaxed">Access control, versioning, monitoring, and model governance</p>
                        </div>
                      </div>
                    </div>

                    {/* Data Layer */}
                    <div className="bg-accent2-lightest rounded-xl p-5 border border-gray-100">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center flex-shrink-0">
                          <Database className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-heading text-lg font-normal text-primary mb-1">Data Layer</h4>
                          <p className="font-sans text-base text-primary-light leading-relaxed">Encryption, residency, retention policies, and data sovereignty controls</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary CTA */}
              <div className="bg-accent2-lightest rounded-2xl p-8 md:p-10 border border-gray-200 shadow-sm">
                <div className="text-center">
                  <p className="font-sans text-base text-primary-light leading-relaxed mb-6 max-w-3xl mx-auto">
                    ReadyAI.dev embeds governance into every layer of AI operations — from user permissions to data retention. Our platform ensures your enterprise can innovate with confidence while maintaining transparency, accountability, and trust.
                  </p>
                  <a
                    href="/solutions/security"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-xl font-sans font-semibold hover:bg-primary-dark hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Explore Security Features
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Final CTA Section */}
          <div className="relative bg-gradient-to-br from-primary via-primary-light to-primary-dark py-20 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal text-white mb-6">
                Build Your AI Operating Layer
              </h2>
              <p className="font-sans text-base text-white/90 leading-relaxed max-w-4xl mx-auto mb-8">
                Take control with unified governance, seamless integrations, and enterprise-grade security.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CalendlyBtn
                  url="https://calendly.com/readyai-sales"
                  text="Book a Call With Us"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-white rounded-xl font-sans font-semibold hover:bg-accent-dark hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Individual Solution Hero Section */}
          <div className="relative bg-gradient-to-br from-primary via-primary-light to-primary-dark overflow-hidden pt-32 pb-20">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-6">
                {selectedSolution.title}
              </h1>
              <p className="font-sans text-base md:text-lg text-white/90 max-w-3xl leading-relaxed">
                {selectedSolution.description}
              </p>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 md:p-12 space-y-10">
              {solutionId === 'ai-agents' && (
                <div className="space-y-8">
                  <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-normal text-primary border-b border-gray-200 pb-4">
                    AI Agents for Business Automation
                  </h2>
                  <p className="font-sans text-base text-primary-light leading-relaxed">
                    ReadyAI's AI agents are autonomous programs that can be customized to handle specific tasks and workflows in your organization. 
                    They combine the power of large language models with specialized tools and data access to automate complex processes that 
                    previously required human intervention.
                  </p>

                  {/* Value Props Section */}
                  <div className="bg-gradient-to-br from-primary via-primary-light to-primary-dark text-white rounded-xl p-6 md:p-8">
                    <h3 className="font-heading text-xl md:text-2xl font-normal mb-6 text-center">
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
                    <h3 className="font-heading text-2xl md:text-3xl font-normal text-primary mb-6 text-center">
                      Pricing Comparison: Direct Subscriptions vs ReadyAI
                    </h3>
                    
                    <div className="max-w-4xl mx-auto">
                      {/* Desktop Table View */}
                      <div className="hidden md:block">
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
                      </div>

                      {/* Mobile Card View */}
                      <div className="md:hidden space-y-3 sm:space-y-4 mb-6">
                        {Services.map((service, index) => (
                          <div key={index} className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
                            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 pb-2 sm:pb-3 border-b border-gray-100">
                              {service.icon && (
                                <img
                                  src={service.icon}
                                  alt={service.name}
                                  className="h-5 w-5 sm:h-6 sm:w-6 object-contain flex-shrink-0"
                                />
                              )}
                              <span className="text-sm sm:text-base font-semibold text-gray-900 flex-1 min-w-0 break-words">{service.name}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 sm:gap-3">
                              <div>
                                <div className="text-xs text-gray-500 mb-1">Direct</div>
                                <div className="text-base sm:text-lg font-semibold text-gray-900">{service.price}</div>
                              </div>
                              <div>
                                <div className="text-xs text-gray-500 mb-1">ReadyAI</div>
                                <div className="text-base sm:text-lg font-semibold text-accent">Included</div>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {/* Mobile Total */}
                        <div className="bg-white rounded-lg p-4 sm:p-5 border-2 border-gray-300">
                          <div className="text-center mb-3 sm:mb-4">
                            <div className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">TOTAL COMPARISON</div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 sm:gap-4">
                            <div className="text-center p-3 sm:p-4 bg-red-50 rounded-lg">
                              <div className="text-xs text-gray-600 mb-1 sm:mb-2">Direct</div>
                              <div className="text-2xl sm:text-3xl font-bold text-red-600">$210</div>
                              <div className="text-xs text-gray-500">/mo/seat</div>
                            </div>
                            <div className="text-center p-3 sm:p-4 bg-green-50 rounded-lg">
                              <div className="text-xs text-gray-600 mb-1 sm:mb-2">ReadyAI</div>
                              <div className="text-2xl sm:text-3xl font-bold text-green-600">$30</div>
                              <div className="text-xs text-gray-500">/mo/seat</div>
                            </div>
                          </div>
                          <div className="text-center mt-3 sm:mt-4">
                            <span className="inline-block bg-green-100 text-green-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                              Save 86%
                            </span>
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
                    <h3 className="font-heading text-2xl md:text-3xl font-normal text-primary mb-6">Key Features</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-base text-primary-light leading-relaxed"><strong className="text-primary">Customizable Workflows</strong> - Design agents to match your exact business processes</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-base text-primary-light leading-relaxed"><strong className="text-primary">Tool Integration</strong> - Connect agents to your existing tools and systems</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-base text-primary-light leading-relaxed"><strong className="text-primary">Human-in-the-Loop</strong> - Configure when and how agents should involve human oversight</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-base text-primary-light leading-relaxed"><strong className="text-primary">Visual Creation Interface</strong> - Build agents without coding experience</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-base text-primary-light leading-relaxed"><strong className="text-primary">Security Controls</strong> - Define precise permissions for data access and actions</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 md:p-8 border border-gray-100">
                    <h3 className="font-heading text-2xl md:text-3xl font-normal text-primary mb-6">Common Use Cases</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-base text-primary-light">Customer support automation</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-base text-primary-light">Document processing and analysis</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-base text-primary-light">Data extraction and reporting</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-base text-primary-light">Meeting scheduling and summarization</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="font-sans text-base text-primary-light">Multi-step approval workflows</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
                
                {solutionId === 'llm-integration' && (
                  <div className="space-y-8">
                    <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-normal text-primary border-b border-gray-200 pb-4">
                      LLM Integration
                    </h2>
                    <p className="font-sans text-base text-primary-light leading-relaxed">
                      Access a wide range of industry-leading large language models through a single platform. ReadyAI provides
                      a unified interface to multiple LLMs, allowing you to choose the right model for each specific use case
                      based on performance, cost, and specialized capabilities.
                    </p>
                    
                    <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 md:p-8 border border-gray-100">
                      <h3 className="font-heading text-2xl md:text-3xl font-normal text-primary mb-6">Available Models</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span className="font-sans text-base text-primary-light leading-relaxed">GPT-4 and GPT-3.5 from OpenAI</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span className="font-sans text-base text-primary-light leading-relaxed">Claude 3 from Anthropic</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span className="font-sans text-base text-primary-light leading-relaxed">Gemini from Google</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span className="font-sans text-base text-primary-light leading-relaxed">Specialized domain models for finance, healthcare, and legal</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span className="font-sans text-base text-primary-light leading-relaxed">Fine-tuned models on your proprietary data</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 md:p-8 border border-gray-100">
                      <h3 className="font-heading text-2xl md:text-3xl font-normal text-primary mb-6">Integration Benefits</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span className="font-sans text-base text-primary-light leading-relaxed"><strong className="text-primary">Cost Optimization</strong> - Route requests to the most cost-effective model for each task</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span className="font-sans text-base text-primary-light leading-relaxed"><strong className="text-primary">Model Redundancy</strong> - Automatic fallbacks if a particular provider has downtime</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span className="font-sans text-base text-primary-light leading-relaxed"><strong className="text-primary">Unified API</strong> - Consistent interface regardless of the underlying model</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span className="font-sans text-base text-primary-light leading-relaxed"><strong className="text-primary">Prompt Management</strong> - Centralized storage and versioning of prompts</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span className="font-sans text-base text-primary-light leading-relaxed"><strong className="text-primary">Performance Analytics</strong> - Compare model performance across different tasks</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {solutionId === 'security' && (
                  <div className="space-y-8">
                    <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-normal text-primary border-b border-gray-200 pb-4">
                      Enterprise-Grade Security & Compliance
                    </h2>
                    <p className="font-sans text-base text-primary-light leading-relaxed">
                      The platform is built with security and compliance at its core. Our comprehensive security 
                      features and certifications ensure your AI operations meet the highest industry standards while 
                      protecting sensitive data and maintaining regulatory compliance.
                    </p>

                    <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 md:p-8 border border-gray-100">
                      <h3 className="font-heading text-2xl md:text-3xl font-normal text-primary mb-6">
                        Security Features & Certifications
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {securityFeatures.map((feature, index) => (
                          <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-accent/30 transition-colors">
                            <h4 className="font-sans text-lg font-semibold text-primary mb-2">{feature.name}</h4>
                            <p className="font-sans text-base text-primary-light leading-relaxed">{feature.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 md:p-8 border border-gray-100">
                      <h3 className="font-heading text-2xl md:text-3xl font-normal text-primary mb-6">Key Security Measures</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span className="font-sans text-base text-primary-light leading-relaxed"><strong className="text-primary">Data Privacy</strong> - Comprehensive data protection with encryption at rest and in transit</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span className="font-sans text-base text-primary-light leading-relaxed"><strong className="text-primary">Access Management</strong> - Granular role-based access control and user permissions</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span className="font-sans text-base text-primary-light leading-relaxed"><strong className="text-primary">Audit Logging</strong> - Detailed activity tracking and compliance reporting</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span className="font-sans text-base text-primary-light leading-relaxed"><strong className="text-primary">Network Security</strong> - Advanced firewalls and intrusion detection systems</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <span className="font-sans text-base text-primary-light leading-relaxed"><strong className="text-primary">Compliance Monitoring</strong> - Automated compliance checks and reporting</span>
                        </li>
                      </ul>
                    </div>                    
                  </div>
                )}
                
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
                  Connect with our team to explore how ReadyAI can secure and scale your AI operations
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

export default SolutionsPage;