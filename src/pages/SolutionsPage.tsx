import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Services, SOLUTIONS } from '../utils/constants';
import { ArrowRight, Cpu, Layers, LayoutDashboard, Shield, TrendingDown, Zap, Check, Brain, Users, Lock, BarChart3, Database, Eye, FileText, AlertTriangle, Target, TrendingUp, ChevronRight, DollarSign, ChevronDown, BookOpen, GitBranch, RefreshCw, Boxes } from 'lucide-react';
import Button from '../components/ui/Button';
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
          <div className="relative bg-gradient-to-br from-primary via-primary-light to-primary-dark overflow-hidden pt-20">
            {/* Enhanced Background Elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>
              <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            </div>
            
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
              <div className="max-w-4xl">
                <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl font-normal text-white mb-8 leading-tight">
                  Inside the<br /><span className="text-accent">AI Operating Layer</span>
                </h1>
                
                <p className="font-sans text-xl md:text-2xl text-white/90 mb-6 leading-relaxed max-w-3xl">
                  Every capability in our platform connects back to one purpose: <span className="font-semibold text-white">giving enterprises a single, governed operating layer that unifies every model, agent, and workflow.</span>
                </p>
                
                <p className="font-sans text-lg md:text-xl text-white/85 mb-6 leading-relaxed max-w-3xl">
                  The platform gives your enterprise everything you need to turn your AI potential into performance.
                </p>
                
                <p className="font-sans text-lg md:text-xl text-white/85 mb-10 leading-relaxed max-w-3xl">
                  From knowledge-enhanced agents to real-time integrations, every feature is built to expand your capabilities without compromising your control.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://calendly.com/readyai-dev/executive-evaluation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-white rounded-xl font-sans font-semibold hover:bg-accent-dark hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 shadow-2xl"
                  >
                    Platform
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-sans font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
                  >
                    Book a Call
                    <ArrowRight className="w-5 h-5" />
                  </a>
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
                    <p className="font-heading text-3xl md:text-4xl text-primary font-semibold mb-4 leading-tight">
                      Your entire internal AI ecosystem — finally unified under one operating layer.
                    </p>
                    <p className="font-sans text-xl md:text-2xl text-gray-700 leading-relaxed">
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
              <h2 className="font-heading text-4xl md:text-5xl font-medium text-primary mb-6">
                Capabilities
              </h2>
              <p className="font-sans text-xl text-gray-600 max-w-3xl mx-auto">
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
                        <h3 className="font-heading text-3xl font-semibold text-white mb-3">
                          Augment Knowledge with RAG
                        </h3>
                        <p className="font-sans text-lg text-accent mb-4 font-medium">
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
                        <h3 className="font-heading text-3xl font-semibold text-white mb-3">
                          Agentic Actions
                        </h3>
                        <p className="font-sans text-lg text-accent mb-4 font-medium">
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
                        <h3 className="font-heading text-3xl font-semibold text-white mb-3">
                          Flexible Integrations
                        </h3>
                        <p className="font-sans text-lg text-accent mb-4 font-medium">
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
                      <div className="flex flex-wrap justify-center gap-8 items-center">
                        <div className="text-white/70 font-sans text-sm font-medium">Integrates with:</div>
                        <div className="flex flex-wrap justify-center gap-6">
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
              <a
                href="https://calendly.com/readyai-dev/executive-evaluation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-xl font-sans font-semibold hover:bg-accent-dark hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
              >
                See How It Works
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Operational Management Section */}
          <div className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="font-heading text-4xl md:text-5xl font-medium text-primary mb-6">
                  Operational Management
                </h2>
                <p className="font-sans text-xl text-gray-600 max-w-3xl mx-auto">
                  Maintain complete control over your AI ecosystem with comprehensive lifecycle management.
                </p>
              </div>

              {/* Agent Management Card */}
              <div className="max-w-5xl mx-auto">
                <div className="bg-gradient-to-br from-primary via-primary-light to-primary-dark text-white rounded-2xl p-8 md:p-12 relative overflow-hidden">
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-6 mb-6">
                      <div className="w-16 h-16 bg-accent/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                        <RefreshCw className="w-8 h-8 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-heading text-3xl font-semibold text-white mb-3">
                          Agent Management
                        </h3>
                        <p className="font-sans text-lg text-accent mb-4 font-medium">
                          Govern, optimize, and evolve every AI agent with ease.
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 text-white/90 font-sans text-base leading-relaxed">
                      <p>
                        Take control of your AI, so you can enjoy optimal AI performance with our built-in lifecycle management.
                      </p>
                      <p>
                        With the platform, you can manage the entire lifecycle of your agent, from initial customization to ongoing data and LLM updates, ensuring continuous optimization.
                      </p>
                      <p>
                        You can also train your AI with real-time data and monitor its performance to guarantee efficiency. The platform enables effortless LLM swaps, retaining context and knowledge, with no integration or financial hurdles.
                      </p>
                      <p className="text-accent font-semibold text-lg">
                        It gives CIOs full internal AI control — with no chaos, no duplication, and no vendor lock-in.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Offerings Section */}
          <div className="bg-accent2-lightest py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="font-heading text-4xl md:text-5xl font-medium text-primary mb-6">
                  Service Offerings
                </h2>
                <p className="font-sans text-xl text-primary-light max-w-3xl mx-auto mb-4">
                  Accelerate your AI adoption with expert-led guidance.
                </p>
                <p className="font-sans text-lg text-gray-700 max-w-4xl mx-auto">
                  Our professional services help you implement, scale, and manage your AI ecosystem within the ReadyAI.dev framework — ensuring a smooth, compliant journey from pilot to full deployment.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-accent/30 hover:shadow-lg transition-all duration-300">
                  <h3 className="font-heading text-xl font-semibold text-primary mb-4">AI Strategy Consulting</h3>
                  <p className="font-sans text-gray-700 leading-relaxed">
                    Define your AI roadmap, governance policies, and integration strategy to drive effective AI adoption.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-accent/30 hover:shadow-lg transition-all duration-300">
                  <h3 className="font-heading text-xl font-semibold text-primary mb-4">Change Management</h3>
                  <p className="font-sans text-gray-700 leading-relaxed">
                    Support your teams through adoption with structured enablement.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-accent/30 hover:shadow-lg transition-all duration-300">
                  <h3 className="font-heading text-xl font-semibold text-primary mb-4">Implementation Services</h3>
                  <p className="font-sans text-gray-700 leading-relaxed">
                    Integrate ReadyAI.dev with your existing tools, data pipelines, and cloud infrastructure to streamline your workflow.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-accent/30 hover:shadow-lg transition-all duration-300">
                  <h3 className="font-heading text-xl font-semibold text-primary mb-4">Pilots</h3>
                  <p className="font-sans text-gray-700 leading-relaxed">
                    Launch controlled, measurable pilots that prove value while maintaining compliance.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-accent/30 hover:shadow-lg transition-all duration-300">
                  <h3 className="font-heading text-xl font-semibold text-primary mb-4">Training & Enablement</h3>
                  <p className="font-sans text-gray-700 leading-relaxed">
                    Equip business and technical teams with the knowledge to govern and scale AI responsibly.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-accent/30 hover:shadow-lg transition-all duration-300">
                  <h3 className="font-heading text-xl font-semibold text-primary mb-4">Virtual AI Architect</h3>
                  <p className="font-sans text-gray-700 leading-relaxed">
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
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-xl font-sans font-semibold hover:bg-accent-dark hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      Talk to Our Team
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Elements Section */}
          <div className="bg-gradient-to-br from-accent2-lightest to-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="font-heading text-4xl md:text-5xl font-medium text-primary mb-6">
                  Trust Elements
                </h2>
                <p className="font-sans text-xl text-gray-600 max-w-3xl mx-auto">
                  Security and compliance — built into every layer of the platform.
                </p>
              </div>

              {/* Security Standards Card */}
              <div className="bg-accent2-lightest rounded-2xl p-12 border border-gray-200 mb-12">
                <div className="text-center mb-12">
                  <h3 className="font-heading text-3xl font-semibold text-primary mb-4">Security & Compliance Standards</h3>
                  <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                    Enterprise-grade security certifications and compliance frameworks
                  </p>
                  
                  {/* Security Badges */}
                  <div className="flex flex-wrap justify-center gap-4">
                    <span className="px-6 py-3 bg-accent text-white rounded-full font-sans text-sm font-medium">AES-256 Encryption</span>
                    <span className="px-6 py-3 bg-accent text-white rounded-full font-sans text-sm font-medium">Continuous Compliance</span>
                    <span className="px-6 py-3 bg-accent text-white rounded-full font-sans text-sm font-medium">GDPR & HIPAA</span>
                    <span className="px-6 py-3 bg-accent text-white rounded-full font-sans text-sm font-medium">ISO 27001</span>
                    <span className="px-6 py-3 bg-accent text-white rounded-full font-sans text-sm font-medium">SOC 2 Type II</span>
                  </div>
                </div>
              </div>

              {/* Governance Architecture Card */}
              <div className="bg-accent2-lightest rounded-2xl p-12 border border-gray-200 mb-12">
                <div className="text-center mb-16">
                  <h3 className="font-heading text-3xl font-semibold text-primary mb-4">Governance Architecture</h3>
                  <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
                    Four interconnected layers ensure complete AI governance and compliance
                  </p>
                </div>

                {/* Stacked Layers */}
                <div className="max-w-5xl mx-auto">
                  {/* Audits Layer - Top */}
                  <div className="bg-gradient-to-r from-accent-dark/5 to-accent/5 rounded-2xl p-8 mb-6 border-l-4 border-accent-dark hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-accent-dark to-accent rounded-2xl flex items-center justify-center flex-shrink-0">
                        <BarChart3 className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-heading text-2xl font-semibold text-primary mb-2">Audits Layer</h4>
                        <p className="font-sans text-gray-600 text-base">Logging, tracking, compliance reporting, and audit trails</p>
                      </div>
                    </div>
                  </div>

                  {/* Users Layer */}
                  <div className="bg-gradient-to-r from-primary-light/5 to-primary/5 rounded-2xl p-8 mb-6 border-l-4 border-primary-light hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-light to-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-heading text-2xl font-semibold text-primary mb-2">Users Layer</h4>
                        <p className="font-sans text-gray-600 text-base">Role-based access, permissions, authentication, and user management</p>
                      </div>
                    </div>
                  </div>

                  {/* Models Layer */}
                  <div className="bg-gradient-to-r from-accent/5 to-accent-dark/5 rounded-2xl p-8 mb-6 border-l-4 border-accent hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-dark rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Brain className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-heading text-2xl font-semibold text-primary mb-2">Models Layer</h4>
                        <p className="font-sans text-gray-600 text-base">Access control, versioning, monitoring, and model governance</p>
                      </div>
                    </div>
                  </div>

                  {/* Data Layer - Bottom */}
                  <div className="bg-gradient-to-r from-primary/5 to-primary-dark/5 rounded-2xl p-8 border-l-4 border-primary hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Database className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-heading text-2xl font-semibold text-primary mb-2">Data Layer</h4>
                        <p className="font-sans text-gray-600 text-base">Encryption, residency, retention policies, and data sovereignty controls</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description and CTA Card */}
              <div className="bg-accent2-lightest rounded-2xl p-12 border border-gray-200 mb-16">
                <div className="text-center max-w-4xl mx-auto">
                  <p className="font-sans text-xl text-gray-700 leading-relaxed mb-8">
                    ReadyAI.dev embeds governance into every layer of AI operations — from user permissions to data retention. Our platform ensures your enterprise can innovate with confidence while maintaining transparency, accountability, and trust.
                  </p>
                  
                  <a
                    href="/solutions/security"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-xl font-sans font-semibold hover:bg-accent-dark hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
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
              <h2 className="font-heading text-4xl md:text-5xl font-medium text-white mb-6">
                Build Your AI Operating Layer
              </h2>
              <p className="font-sans text-xl text-white/90 leading-relaxed max-w-4xl mx-auto mb-8">
                Take control with unified governance, seamless integrations, and enterprise-grade security.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://calendly.com/readyai-dev/executive-evaluation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-white rounded-xl font-sans font-semibold hover:bg-accent-dark hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  Book a Call With Us
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="font-heading text-4xl md:text-5xl font-medium text-primary mb-6">
                  Frequently Asked Questions
                </h2>
                <p className="font-sans text-xl text-gray-600 max-w-3xl mx-auto">
                  Get answers to common questions about our platform, security, and services.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                {/* Platform & Benefits */}
                <div className="mb-12">
                  <h3 className="font-heading text-2xl font-semibold text-primary mb-8 flex items-center gap-3">
                    <Cpu className="w-6 h-6 text-accent" />
                    Platform & Benefits
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenIndex(openIndex === '0-0' ? null : '0-0')}
                        className="w-full text-left p-6 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                      >
                        <h4 className="font-sans text-lg font-semibold text-primary">
                          How does the ReadyAI.dev Platform benefit your enterprise?
                        </h4>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${openIndex === '0-0' ? 'rotate-180' : ''}`} />
                      </button>
                      {openIndex === '0-0' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-6 pb-6"
                        >
                          <p className="font-sans text-gray-700 leading-relaxed">
                            ReadyAI.dev gives you one secure, unified space to manage your entire AI ecosystem. You can connect to multiple LLMs in one place, monitor usage and costs, and stay fully compliant across every department. Your CIO, or whoever oversees your AI strategy, gets complete visibility and control from a single dashboard.
                          </p>
                        </motion.div>
                      )}
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenIndex(openIndex === '0-1' ? null : '0-1')}
                        className="w-full text-left p-6 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                      >
                        <h4 className="font-sans text-lg font-semibold text-primary">
                          What makes ReadyAI.dev different from other AI firms?
                        </h4>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${openIndex === '0-1' ? 'rotate-180' : ''}`} />
                      </button>
                      {openIndex === '0-1' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-6 pb-6"
                        >
                          <p className="font-sans text-gray-700 leading-relaxed">
                            Most companies offer AI consulting. We go further. ReadyAI.dev combines a powerful, governed platform with hands-on Professional Services. You get real structure, compliance, and support, not just generic advice. Our team helps you manage every LLM under one umbrella so you can move fast and stay in control.
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Security & Compliance */}
                <div className="mb-12">
                  <h3 className="font-heading text-2xl font-semibold text-primary mb-8 flex items-center gap-3">
                    <Shield className="w-6 h-6 text-accent" />
                    Security & Compliance
                  </h3>
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenIndex(openIndex === '1-0' ? null : '1-0')}
                      className="w-full text-left p-6 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                    >
                      <h4 className="font-sans text-lg font-semibold text-primary">
                        How secure is ReadyAI.dev?
                      </h4>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${openIndex === '1-0' ? 'rotate-180' : ''}`} />
                    </button>
                    {openIndex === '1-0' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6"
                      >
                        <p className="font-sans text-gray-700 leading-relaxed">
                          Security isn't a checkbox for us, it's built into everything we do. Our platform meets SOC 2, GDPR, HIPAA, and NIST standards, with encryption, audit trails, and continuous monitoring. Our Professional Services team also work directly with your Security and Compliance leads to make sure every integration meets your standards and keeps your data protected.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Professional Services */}
                <div className="mb-12">
                  <h3 className="font-heading text-2xl font-semibold text-primary mb-8 flex items-center gap-3">
                    <Zap className="w-6 h-6 text-accent" />
                    Professional Services
                      </h3>
                  <div className="space-y-4">
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenIndex(openIndex === '2-0' ? null : '2-0')}
                        className="w-full text-left p-6 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                      >
                        <h4 className="font-sans text-lg font-semibold text-primary">
                          How do you help with change management and user adoption?
                        </h4>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${openIndex === '2-0' ? 'rotate-180' : ''}`} />
                      </button>
                      {openIndex === '2-0' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-6 pb-6"
                        >
                          <p className="font-sans text-gray-700 leading-relaxed">
                            We know that successful AI adoption starts with people. Through our AI Strategy Consulting and Training & Enablement programs, we help your teams adapt confidently. Together, we'll map out clear roadmaps, communication plans, and governance guidelines, so AI becomes part of how your business runs, not a one-off experiment.
                          </p>
                        </motion.div>
                      )}
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenIndex(openIndex === '2-1' ? null : '2-1')}
                        className="w-full text-left p-6 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                      >
                        <h4 className="font-sans text-lg font-semibold text-primary">
                          What's included in your AI Strategy Consulting?
                        </h4>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${openIndex === '2-1' ? 'rotate-180' : ''}`} />
                      </button>
                      {openIndex === '2-1' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-6 pb-6"
                        >
                          <p className="font-sans text-gray-700 leading-relaxed">
                            We support you through every stage of enterprise AI adoption: AI Strategy & Pilot Design, Virtual AI Architect, Implementation Services, Change Management Support, and Training & Enablement. Our Professional Services team is with you from planning to rollout, using the ReadyAI.dev platform to ensure continuity, compliance, and measurable success without any stress.
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="mb-12">
                  <h3 className="font-heading text-2xl font-semibold text-primary mb-8 flex items-center gap-3">
                    <DollarSign className="w-6 h-6 text-accent" />
                    Pricing
                  </h3>
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenIndex(openIndex === '3-0' ? null : '3-0')}
                      className="w-full text-left p-6 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                    >
                      <h4 className="font-sans text-lg font-semibold text-primary">
                        How is the platform priced?
                      </h4>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${openIndex === '3-0' ? 'rotate-180' : ''}`} />
                    </button>
                    {openIndex === '3-0' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6"
                      >
                        <p className="font-sans text-gray-700 leading-relaxed">
                          Our pricing is simple and transparent: $30 per user per month. That includes unlimited LLM access under one governance framework. Pricing scales with your organization's needs, not your usage, so you can plan confidently as you grow.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Contact CTA */}
                <div className="text-center bg-accent2-lightest rounded-2xl p-12">
                  <h3 className="font-heading text-2xl font-semibold text-primary mb-4">
                    Still have questions?
                  </h3>
                  <p className="font-sans text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                    Our team is here to help you understand how ReadyAI.dev can transform your enterprise AI operations.
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
                    <a
                      href="https://calendly.com/readyai-dev/executive-evaluation"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary border-2 border-primary rounded-lg font-sans font-semibold hover:bg-primary hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      Book an Evaluation
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
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