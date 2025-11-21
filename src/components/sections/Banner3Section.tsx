import React, { useState } from 'react';
import { Shield, Zap, Wrench, GitBranch, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const Banner3Section = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: 0,
      name: 'Private AI Workspaces',
      title: 'Private AI Workspaces',
      description: 'Secure, isolated environments for every team and project',
      icon: Shield,
      details: 'Create dedicated AI workspaces with enterprise-grade security. Each workspace maintains complete data isolation, role-based access controls, and audit trails for compliance requirements.',
      features: [
        'SOC 2 Type II certified security controls',
        'GDPR and HIPAA compliance built-in',
        'SSO integration with your identity provider',
        'Role-based access permissions',
        'Complete data ownership—never used to train LLMs',
        'Private Azure instances or on-premise deployment',
        'Granular data visibility controls',
        'Admin access to chat logs and analytics'
      ]
    },
    {
      id: 1,
      name: 'One-Click Deployment',
      title: 'One-Click Deployment',
      description: 'Instant access to latest models (GPT-4o, Claude, R1+)',
      icon: Zap,
      details: 'Deploy cutting-edge AI models instantly. Stay current with the latest releases from OpenAI, Anthropic, and leading AI providers—all available with a single click.',
      features: [
        'Access to 30+ leading LLMs instantly',
        'OpenAI GPT-4o, Claude 3.5, DeepSeek R1+',
        'Google Gemini, Cohere, Grok, and Meta models',
        'Automatic updates with each new model release',
        'No infrastructure management required',
        'Switch between models seamlessly',
        'Cost-effective model selection',
        'Future-proof your AI investments'
      ]
    },
    {
      id: 2,
      name: 'No-Code Agent Builder',
      title: 'No-Code Agent Builder',
      description: 'Visual interface to create AI agents without coding',
      icon: Wrench,
      details: 'Build sophisticated AI agents using an intuitive visual interface. No programming required—drag, drop, and configure your agents to automate complex workflows.',
      features: [
        'Visual drag-and-drop interface',
        'Pre-built agent templates for common use cases',
        'Customize agents for your specific needs',
        'Built for users of all skill levels',
        'Create unlimited AI agents',
        'Test and iterate quickly',
        'Deploy agents across your organization',
        'No technical expertise required'
      ]
    },
    {
      id: 3,
      name: 'Agentic Studio',
      title: 'Agentic Studio',
      description: 'Workflow automation, API connections, agent orchestration',
      icon: GitBranch,
      details: 'Orchestrate multiple AI agents, connect APIs, and automate end-to-end workflows. Design complex agent interactions and integrations through a unified control center.',
      features: [
        'Multi-agent orchestration and coordination',
        'Connect to any API or data source',
        'Workflow automation with visual builder',
        'Embed AI agents anywhere in your stack',
        'Real-time agent collaboration',
        'Event-driven automation triggers',
        'Microsoft 365 and Google Workspace integration',
        'Custom RAG pipelines and vector databases'
      ]
    },
    {
      id: 4,
      name: 'Full AI Stack',
      title: 'Full AI Stack',
      description: 'Complete platform with lifecycle tools and integrations',
      icon: Layers,
      details: 'Everything you need for enterprise AI—from data ingestion to model deployment, monitoring, and governance. A comprehensive toolkit for the complete AI lifecycle.',
      features: [
        'Complete model lifecycle management',
        'Centralized dashboard for all AI activities',
        'Usage analytics and reporting',
        'Cost optimization and tracking',
        'Data ingestion from any source',
        'Version control for agents and workflows',
        'Compliance monitoring and audit trails',
        'Integration ecosystem with popular tools'
      ]
    }
  ];

  const currentTab = tabs[activeTab];
  const Icon = currentTab.icon;

  return (
    <div className="bg-white py-16 md:py-24 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="font-sans text-accent text-sm md:text-base uppercase tracking-widest mb-6">
            All-in-One Platform
          </p>
            <h2 className="font-heading text-primary text-3xl md:text-4xl lg:text-5xl font-normal mb-6">
              Complete AI Platform
            </h2>
            <p className="font-sans text-primary-light text-base max-w-3xl mx-auto leading-relaxed">
              Everything you need to build, deploy, and manage AI across your enterprise
            </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-12 border-b border-gray-200 overflow-x-auto">
          <div className="flex space-x-8 min-w-max md:min-w-0 md:justify-center px-4 md:px-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative pb-4 px-2 font-sans text-sm md:text-base font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-accent'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.name}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-start gap-8 max-w-5xl"
        >
          {/* Left: Small Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="flex-shrink-0"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-primary/5 flex items-center justify-center border border-accent/20">
              <Icon className="w-8 h-8 md:w-10 md:h-10 text-accent" strokeWidth={1.5} />
            </div>
          </motion.div>

          {/* Right: Content (Main Focus) */}
          <div className="flex-1 space-y-6">
            <div>
              <h3 className="font-heading text-primary text-3xl md:text-4xl font-normal mb-3">
                {currentTab.title}
              </h3>
              <p className="font-sans text-accent text-lg md:text-xl font-medium">
                {currentTab.description}
              </p>
            </div>
            
            <p className="font-sans text-primary-light text-base md:text-lg leading-relaxed">
              {currentTab.details}
            </p>

            {/* Key Features */}
            <div className="pt-4">
              <h4 className="font-sans text-primary font-semibold text-sm uppercase tracking-wide mb-4">
                Key Features
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentTab.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                    className="flex items-start gap-2"
                  >
                    <svg 
                      className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    <span className="font-sans text-primary-light text-sm md:text-base">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner3Section;
