import { Shield, Brain, TrendingUp, Target, Users, Lock, BarChart3, Database, ShoppingBag, Eye, FileText, AlertTriangle } from 'lucide-react';

export interface IndustryBenefit {
  icon?: React.ComponentType<any>;
  title: string;
  description: string;
}

export interface IndustryUseCase {
  title: string;
  description: string;
}

export interface IndustryContent {
  id: string;
  industryStatement: string;
  trustSection: {
    icon: React.ComponentType<any>;
    title: string;
    content: string;
    additionalContent?: string;
  };
  transformationSection: {
    icon: React.ComponentType<any>;
    title: string;
    content: string;
    additionalContent?: string;
  };
  benefitsSection: {
    title: string;
    benefits: IndustryBenefit[];
  };
  governanceSection: {
    title: string;
    content: string;
    buttonText: string;
    buttonLink: string;
  };
  useCasesSection: {
    icon?: React.ComponentType<any>;
    title: string;
    useCases: IndustryUseCase[];
  };
}

export const INDUSTRY_CONTENT: IndustryContent[] = [
  {
    id: 'financial',
    industryStatement: 'We understand your industry, we\'ve done this before, and we have trusted partners who can support you.',
    trustSection: {
      icon: Shield,
      title: 'Secure. Compliant. Built for Confidence.',
      content: 'Financial institutions must continually balance innovation with oversight.',
      additionalContent: 'In highly regulated environments where trust is critical, internal AI adoption requires strong security, visibility, and governance from the outset.<br/><br/>Delivered through a proven enterprise AI platform, organizations gain access to a secure, governed environment designed to support internal AI usage across banking, insurance, and fintech operations.<br/><br/>ReadyAI.dev works with leadership teams to apply these platform capabilities in line with risk, compliance, and regulatory expectations, ensuring internal AI adoption remains controlled as it scales.<br/><br/>AI use cases, including fraud detection and customer support, can be explored within structured environments that support auditability, oversight, and internal AI workflows, aligned with recognized standards such as SOC 2 and ISO 27001.'
    },
    transformationSection: {
      icon: Brain,
      title: 'Internal AI for Financial Services',
      content: 'Financial institutions are adopting internal AI to improve efficiency while maintaining strict oversight.',
      additionalContent: 'An enterprise AI platform provides a secure, governed environment for internal AI use cases such as document processing and risk analysis.<br/><br/>ReadyAI.dev supports leadership teams in aligning these capabilities with regulatory, risk, and governance expectations across the organization.'
    },
    benefitsSection: {
      title: 'Why Financial Leaders Choose ReadyAI.dev',
      benefits: [
        {
          icon: Users,
          title: 'Customer Experience',
          description: 'Deploy intelligent assistants that streamline service while maintaining compliance.'
        },
        {
          icon: Database,
          title: 'Core System Integration',
          description: 'Connect seamlessly with banking, insurance, and risk platforms to unify data governance.'
        },
        {
          icon: Lock,
          title: 'Regulatory Compliance',
          description: 'Built-in frameworks for SOX, PCI-DSS, and financial regulations with complete auditability.'
        },
        {
          icon: BarChart3,
          title: 'Risk Management',
          description: 'Advanced analytics for credit scoring, fraud detection, and portfolio optimization.'
        },
        {
          icon: Shield,
          title: 'Data Privacy',
          description: 'Enterprise-grade security with role-based access and comprehensive audit logs.'
        },
        {
          icon: TrendingUp,
          title: 'Operational Efficiency',
          description: 'Automate document processing, compliance reporting, and customer onboarding workflows.'
        }
      ]
    },
    governanceSection: {
      title: 'Governance First. Always.',
      content: 'Build trust, reduce risk, and innovate responsibly with transparent, compliant AI — powered by the only platform designed for enterprise-grade governance.',
      buttonText: 'Explore your secure AI workspace',
      buttonLink: 'https://calendly.com/readyai-sales'
    },
    useCasesSection: {
      title: 'Use Cases',
      useCases: [
        {
          title: 'Customer Support',
          description: 'Automate service requests while maintaining full compliance.'
        },
        {
          title: 'Compliance Monitoring',
          description: 'Continuously audit and document adherence to evolving regulations.'
        },
        {
          title: 'Document Intelligence',
          description: 'Extract and process financial data with complete auditability.'
        },
        {
          title: 'Fraud Detection',
          description: 'Identify suspicious transactions through explainable anomaly detection.'
        },
        {
          title: 'Risk Management',
          description: 'Model exposure and credit scoring with transparent AI analytics.'
        }
      ]
    }
  },
  {
    id: 'retail',
    industryStatement: 'We understand your industry, we\'ve done this before, and we have trusted partners who can support you.',
    trustSection: {
      icon: Shield,
      title: 'Personalized. Predictive. Built for Trust.',
      content: 'Retail organizations are increasingly using internal AI across customer, product, and operational functions.',
      additionalContent: 'An enterprise AI platform provides a secure, governed environment designed to support these internal AI use cases while aligning with data privacy requirements such as GDPR and CCPA.<br/><br/>ReadyAI.dev supports leadership teams in adopting and applying these capabilities with clarity and oversight across the organization.'
    },
    transformationSection: {
      icon: Brain,
      title: 'Internal AI for Retail',
      content: 'Retail organizations are adopting internal AI to enhance personalization and operational efficiency while meeting data privacy requirements.',
      additionalContent: 'An enterprise AI platform provides a secure, governed environment for internal AI use cases such as pricing optimization, demand forecasting, and service automation.<br/><br/>ReadyAI.dev supports leadership teams in aligning these capabilities with governance and risk expectations across the organization.'
    },
    benefitsSection: {
      title: 'Why Retail Leaders Choose ReadyAI.dev',
      benefits: [
        {
          icon: Users,
          title: 'Customer Intelligence',
          description: 'Transform behavioral and transactional data into explainable insights.'
        },
        {
          icon: Lock,
          title: 'Data Privacy Compliance',
          description: 'Designed for GDPR, CCPA, and enterprise data governance frameworks.'
        },
        {
          icon: TrendingUp,
          title: 'Dynamic Pricing & Demand Forecasting',
          description: 'Align pricing and stock levels in real time with complete transparency.'
        },
        {
          icon: Brain,
          title: 'Multi-Model Flexibility',
          description: 'Access every major LLM to build, test, and deploy tailored retail use cases.'
        },
        {
          icon: ShoppingBag,
          title: 'Omnichannel Integration',
          description: 'Connect AI securely across e-commerce, POS, and logistics systems.'
        },
        {
          icon: Database,
          title: 'Private AI Workspaces',
          description: 'Govern data, models, and insights in fully isolated, compliant environments.'
        }
      ]
    },
    governanceSection: {
      title: 'Governance First. Always.',
      content: 'Strengthen customer trust through transparent, compliant AI — powered by the only platform designed for enterprise-grade governance.',
      buttonText: 'Explore your secure AI workspace',
      buttonLink: 'https://calendly.com/readyai-sales'
    },
    useCasesSection: {
      title: 'Use Cases',
      useCases: [
        {
          title: 'Demand Forecasting',
          description: 'Predict shifts in customer demand and optimize inventory to prevent sales impact.'
        },
        {
          title: 'Fraud & Risk Detection',
          description: 'Identify anomalies across transactions and loyalty systems in real time.'
        },
        {
          title: 'Operational Optimization',
          description: 'Automate scheduling, fulfillment, and logistics through explainable AI models.'
        },
        {
          title: 'Personalization & Engagement',
          description: 'Deliver intelligent product recommendations and messaging that respect data boundaries.'
        },
        {
          title: 'Retail Analytics',
          description: 'Integrate data from every channel for unified insights and governance oversight.'
        }
      ]
    }
  },
  {
    id: 'healthcare',
    industryStatement: 'We understand your industry, we\'ve done this before (use case), and we have trusted partners who can support you, such as <a href="https://www.linkedin.com/in/paul-m-berman/" target="_blank" rel="noopener noreferrer" class="text-white hover:text-accent transition-colors">Paul Berman, MBA</a>.',
    trustSection: {
      icon: Shield,
      title: 'Secure. Compliant. Built for Better Care.',
      content: 'Healthcare organizations must balance innovation with patient safety and regulatory oversight.',
      additionalContent: 'An enterprise AI platform provides secure, governed environments designed to support internal AI usage across clinical and research settings, aligned with healthcare regulations such as HIPAA and GDPR.<br/><br/>ReadyAI.dev supports leadership teams in adopting and applying these capabilities responsibly across the organization.'
    },
    transformationSection: {
      icon: Brain,
      title: 'Responsible Healthcare AI',
      content: 'Responsible healthcare AI requires structure, oversight, and trust.',
      additionalContent: 'An enterprise AI platform supports internal AI usage across clinical and research settings within secure, governed environments.<br/><br/>ReadyAI.dev supports leadership teams in adopting and applying these capabilities responsibly across the organization.'
    },
    benefitsSection: {
      title: 'Why Healthcare Leaders Choose ReadyAI.dev',
      benefits: [
        {
          icon: Users,
          title: 'Clinical Decision Support',
          description: 'Deliver explainable insights to assist healthcare professionals.'
        },
        {
          icon: Database,
          title: 'EHR Integration',
          description: 'Seamlessly connect with leading electronic health record systems.'
        },
        {
          icon: Lock,
          title: 'Flexible Deployment',
          description: 'Cloud, hybrid, or on-premises configurations for maximum control.'
        },
        {
          icon: Shield,
          title: 'HIPAA & GDPR Compliance',
          description: 'Built to meet global healthcare data protection standards.'
        },
        {
          icon: Database,
          title: 'Private AI Workspaces',
          description: 'Govern and isolate PHI securely with full audit trails.'
        },
        {
          icon: BarChart3,
          title: 'Research & Analytics',
          description: 'Process large-scale datasets efficiently for faster discovery.'
        }
      ]
    },
    governanceSection: {
      title: 'Governance First. Always.',
      content: 'Build trust and innovation into every layer of care — powered by the only platform designed for enterprise-grade AI governance.',
      buttonText: 'Explore your secure AI workspace',
      buttonLink: 'https://calendly.com/readyai-sales'
    },
    useCasesSection: {
      title: 'Use Cases',
      useCases: [
        {
          title: 'Administrative Automation',
          description: 'Streamline billing, scheduling, and operational workflows.'
        },
        {
          title: 'Clinical Documentation',
          description: 'AI-assisted summarization and note generation to reduce provider burden.'
        },
        {
          title: 'Patient Engagement',
          description: 'Intelligent communication tools for education, reminders, and coordination.'
        },
        {
          title: 'Research Analysis',
          description: 'Accelerate data processing and insight generation for clinical studies.'
        }
      ]
    }
  },
  {
    id: 'manufacturing',
    industryStatement: 'We understand your industry, we\'ve done this before (use case), and we have trusted partners who can support you, such as (focus partner).',
    trustSection: {
      icon: Shield,
      title: 'Efficient. Predictive. Built for Precision.',
      content: 'Manufacturers are adopting internal AI to improve efficiency and resilience while meeting strict safety and compliance requirements.',
      additionalContent: 'An enterprise AI platform provides secure, governed environments designed to support internal AI usage across production and operational contexts, including integration with industrial and enterprise systems.<br/><br/>ReadyAI.dev supports leadership teams in adopting and applying these capabilities responsibly across the organization.'
    },
    transformationSection: {
      icon: Brain,
      title: 'Internal AI for Manufacturing',
      content: 'An enterprise AI platform supports explainable AI capabilities designed to improve visibility and confidence in internal AI driven manufacturing decision making.',
      additionalContent: 'ReadyAI.dev supports leadership teams in applying these capabilities responsibly as internal AI adoption scales across the organization.'
    },
    benefitsSection: {
      title: 'Why Manufacturing Leaders Choose ReadyAI.dev',
      benefits: [
        {
          icon: Database,
          title: 'IoT & Edge Integration',
          description: 'Seamlessly connect sensors, machines, and production systems in real time.'
        },
        {
          icon: BarChart3,
          title: 'Predictive Analytics',
          description: 'Detect anomalies early to prevent costly equipment failures.'
        },
        {
          icon: Brain,
          title: 'No-Code Agent Builder',
          description: 'Automate workflows and quality checks without writing code.'
        },
        {
          icon: Target,
          title: 'Multi-Model Flexibility',
          description: 'Access every major LLM to power diverse manufacturing use cases.'
        },
        {
          icon: Lock,
          title: 'MES & ERP Compatibility',
          description: 'Integrate securely with existing systems for unified data flow.'
        },
        {
          icon: Shield,
          title: 'Compliance & Auditability',
          description: 'Maintain governance across global plants and suppliers.'
        }
      ]
    },
    governanceSection: {
      title: 'Governance First. Always.',
      content: 'Build smarter, safer factories through transparent, compliant AI — powered by the only platform designed for enterprise-grade governance.',
      buttonText: 'Explore your secure AI workspace',
      buttonLink: 'https://calendly.com/readyai-sales'
    },
    useCasesSection: {
      title: 'Use Cases',
      useCases: [
        {
          title: 'Predictive Maintenance',
          description: 'Forecast and prevent equipment failures before they disrupt production.'
        },
        {
          title: 'Production Planning',
          description: 'Automate scheduling and resource allocation for maximum throughput.'
        },
        {
          title: 'Quality Control',
          description: 'Deploy AI-powered vision systems for real-time defect detection.'
        },
        {
          title: 'Supply Chain Optimization',
          description: 'Improve demand planning and inventory accuracy through AI forecasting.'
        }
      ]
    }
  },
  {
    id: 'energy',
    industryStatement: 'We understand your industry, we\'ve done this before (use case), and we have trusted partners who can support you, such as (focus partner).',
    trustSection: {
      icon: Shield,
      title: 'Reliable. Compliant. Built for Resilience.',
      content: 'Energy and utilities organizations are adopting internal AI while managing increasing regulatory and operational complexity.',
      additionalContent: 'An enterprise AI platform provides secure, governed environments designed to support internal AI usage across infrastructure and operational contexts.<br/><br/>ReadyAI.dev supports leadership teams in adopting and applying these capabilities responsibly across the organization.'
    },
    transformationSection: {
      icon: Brain,
      title: 'Internal AI for Energy & Utilities',
      content: 'An enterprise AI platform supports internal AI use cases such as grid optimization and demand forecasting within secure, governed environments.',
      additionalContent: 'Explainability and auditability capabilities support transparency and confidence as internal AI adoption scales across the organization.'
    },
    benefitsSection: {
      title: 'Why Energy Leaders Choose ReadyAI.dev',
      benefits: [
        {
          icon: Shield,
          title: 'Infrastructure Security',
          description: 'Govern AI models within fully isolated, compliant environments.'
        },
        {
          icon: Brain,
          title: 'Multi-Model Flexibility',
          description: 'Access every major LLM for predictive, generative, and analytical workloads.'
        },
        {
          icon: Target,
          title: 'No-Code Agent Builder',
          description: 'Build and deploy explainable AI workflows without writing code.'
        },
        {
          icon: BarChart3,
          title: 'Predictive Analytics & Time-Series AI',
          description: 'Improve forecasting, maintenance, and load balancing.'
        },
        {
          icon: Lock,
          title: 'Regulatory Compliance',
          description: 'Aligned with energy sector standards for auditability and transparency.'
        },
        {
          icon: Database,
          title: 'SCADA Integration',
          description: 'Extend intelligence across control systems without compromising security or uptime.'
        }
      ]
    },
    governanceSection: {
      title: 'Governance First. Always.',
      content: 'Build operational resilience through transparent, compliant AI — powered by the only platform designed for enterprise-grade governance.',
      buttonText: 'Explore your secure AI workspace',
      buttonLink: 'https://calendly.com/readyai-sales'
    },
    useCasesSection: {
      title: 'Use Cases',
      useCases: [
        {
          title: 'Asset Optimization',
          description: 'Extend the lifespan and efficiency of high-value infrastructure.'
        },
        {
          title: 'Customer Engagement',
          description: 'Deliver personalized tools that help consumers manage energy usage.'
        },
        {
          title: 'Energy Forecasting',
          description: 'Model renewable generation and demand with real-time accuracy.'
        },
        {
          title: 'Grid Optimization',
          description: 'Reduce losses and improve reliability across complex networks.'
        },
        {
          title: 'Predictive Maintenance',
          description: 'Detect early signs of equipment degradation before costly failures.'
        }
      ]
    }
  },
  {
    id: 'public',
    industryStatement: 'We understand your industry, we\'ve done this before (use case), and we have trusted partners who can support you, such as (focus partner).',
    trustSection: {
      icon: Shield,
      title: 'Secure. Compliant. Built for Accountability.',
      content: 'Public institutions need AI adoption grounded in trust, transparency, and accountability.',
      additionalContent: 'An enterprise AI platform provides secure, governed environments designed to support internal AI usage while meeting public sector oversight and data sovereignty requirements.<br/><br/>ReadyAI.dev supports public sector leadership teams in adopting and applying these capabilities responsibly across the organization, without relying on consulting-led delivery models.'
    },
    transformationSection: {
      icon: Brain,
      title: 'Internal AI for Public Sector',
      content: 'An enterprise AI platform supports internal AI use cases such as citizen engagement and fraud prevention within secure, governed environments.',
      additionalContent: 'Oversight and explainability capabilities support responsible modernization aligned with public sector governance expectations as internal AI adoption scales.'
    },
    benefitsSection: {
      icon: TrendingUp,
      title: 'Why Public Sector Leaders Choose ReadyAI.dev',
      benefits: [
        {
          title: 'Data Residency & Sovereignty',
          description: 'Keep sensitive data within your jurisdiction.'
        },
        {
          title: 'Legacy Integration',
          description: 'Modernize securely without replacing existing systems.'
        },
        {
          title: 'Multi-Model Flexibility',
          description: 'Access every major LLM — not just one vendor\'s models.'
        },
        {
          title: 'No-Code Agent Builder',
          description: 'Build and deploy explainable AI workflows without writing code.'
        },
        {
          title: 'Private AI Workspaces',
          description: 'Fully isolated, compliant environments for government-grade governance.'
        },
        {
          title: 'Transparent AI Decisions',
          description: 'Built-in audit trails for accountability and public trust.'
        }
      ]
    },
    governanceSection: {
      title: 'Governance First. Always.',
      content: 'Build citizen trust through transparent, compliant AI — powered by the only platform designed for enterprise-grade governance.',
      buttonText: 'Explore your secure AI workspace',
      buttonLink: 'https://calendly.com/readyai-sales'
    },
    useCasesSection: {
      icon: Target,
      title: 'Use Cases',
      useCases: [
        {
          title: 'Citizen Services',
          description: 'Accessible, secure AI assistants available 24/7.'
        },
        {
          title: 'Document Intelligence',
          description: 'Automate classification and data extraction from forms, permits, and records.'
        },
        {
          title: 'Emergency Response',
          description: 'Your team can coordinate in real-time and use data-driven action across departments.'
        },
        {
          title: 'Fraud Detection',
          description: 'Identify anomalies in benefits and public funds before they escalate.'
        },
        {
          title: 'Resource Optimization',
          description: 'Allocate budgets and staff fairly using transparent, data-led insights.'
        }
      ]
    }
  }
];
