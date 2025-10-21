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
      content: 'Financial institutions continually navigate the delicate balance between innovation and oversight.',
      additionalContent: 'In a highly regulated environment where trust is non-negotiable, AI must not only be powerful but also governed, auditable, and compliant from its foundation.<br/><br/>The ReadyAI.dev platform provides a <strong>secure, governed AI framework</strong> that enables banks, insurers, and fintech organizations to deploy advanced AI responsibly. It unifies innovation and compliance — supporting faster transformation, stronger risk management, and enhanced customer experiences.<br/><br/>Every workflow — from fraud detection to customer service — operates within a transparent, compliant structure aligned with <strong>SOC 2, ISO 27001</strong>, and global financial-data standards.'
    },
    transformationSection: {
      icon: Brain,
      title: 'Transforming Financial Services with Responsible AI',
      content: 'ReadyAI.dev allows financial enterprises to modernize safely — automating document processing, assessing credit risk, and managing compliance without sacrificing control. Our platform provides leaders with full visibility, auditability, and accountability across every model and decision.',
      additionalContent: ''
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
      buttonLink: 'https://calendly.com/readyai-dev/executive-evaluation'
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
      content: 'The ReadyAI.dev platform provides retailers with a <strong>unified AI foundation</strong>, connecting customers, products, and operations through a secure and governed framework.',
      additionalContent: 'It centralizes intelligence across every channel, enabling data and innovation teams to move faster while maintaining full compliance with <strong>GDPR, CCPA</strong>, and global data privacy standards. Every model, insight, and interaction is explainable, transparent, and built for trust.'
    },
    transformationSection: {
      icon: Brain,
      title: 'Transforming Retail with Responsible AI',
      content: 'ReadyAI.dev bridges personalization, operational efficiency, and compliance — equipping retailers with the structure to scale responsibly.',
      additionalContent: 'Whether optimizing pricing, predicting demand, or automating service, our platform delivers <strong>AI you can govern and trust</strong>, even as your business grows.'
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
      buttonLink: 'https://calendly.com/readyai-dev/executive-evaluation'
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
      content: 'Our platform enables healthcare teams to deploy AI safely and transparently by combining security, compliance, and explainability to enhance patient care.',
      additionalContent: 'Healthcare organizations face a unique challenge in that they must drive innovation while simultaneously protecting patient safety, privacy, and trust.<br/><br/>The ReadyAI.dev platform enables healthcare providers, researchers, and life sciences enterprises to deploy <strong>trusted</strong>, <strong>governed AI</strong> with full compliance to healthcare data regulations such as HIPAA and GDPR.<br/><br/>Our <strong>Private AI Workspaces</strong> offer secure environments for handling PHI and model development, ensuring data sovereignty, traceability, and auditability throughout every process.'
    },
    transformationSection: {
      icon: Brain,
      title: 'The Future of Responsible Healthcare',
      content: 'From clinical documentation to research analytics, ReadyAI.dev empowers healthcare teams to use AI safely and transparently.',
      additionalContent: 'Every interaction and insight is explainable, secure, and most importantly, aligned with patient-first principles.'
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
      buttonLink: 'https://calendly.com/readyai-dev/executive-evaluation'
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
      content: 'Manufacturers face increasing pressure to improve efficiency, maintain quality, and adapt to global supply chain volatility — all while meeting stringent compliance and safety standards.',
      additionalContent: 'The ReadyAI.dev platform enables manufacturers to integrate <strong>trusted, governed AI</strong> across their operations. This integration connects data from production lines, IoT systems, and ERP platforms within one secure, compliant framework.<br/><br/>Our <strong>Private AI Workspaces</strong> ensure full data sovereignty and governance, allowing teams to build, test, and deploy AI solutions safely — from predictive maintenance to intelligent scheduling — without compromising control.'
    },
    transformationSection: {
      icon: Brain,
      title: 'Powering the Future of Smart Manufacturing',
      content: 'ReadyAI.dev helps manufacturers achieve precision, predictability, and progress through explainable AI. Every insight is traceable, transparent, and accountable — ensuring operational excellence that scales with confidence.',
      additionalContent: ''
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
      buttonLink: 'https://calendly.com/readyai-dev/executive-evaluation'
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
      content: 'The energy and utilities sector is transforming — balancing the shift to renewables, expanding data demands, and meeting increasing regulatory oversight.',
      additionalContent: 'The ReadyAI.dev platform enables energy enterprises to operate efficiently, predict and prevent system failures, and innovate responsibly — all while maintaining governance and compliance.<br/><br/>Our <strong>Private AI Workspaces</strong> enable secure, role-based collaboration between engineering, IT, and compliance teams. With access to <strong>every major LLM</strong>, organizations can build domain-specific AI applications with complete control and accountability.'
    },
    transformationSection: {
      icon: Brain,
      title: 'Powering the Future of Energy',
      content: 'From grid optimization to demand forecasting, ReadyAI.dev turns complex data into safe, explainable, and actionable intelligence. Every insight is auditable, transparent, and accountable — giving utilities confidence to scale securely.',
      additionalContent: ''
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
      buttonLink: 'https://calendly.com/readyai-dev/executive-evaluation'
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
      content: 'Public institutions need AI they can trust — not another consulting engagement.',
      additionalContent: 'At ReadyAI.dev, we don\'t sell services; we deliver a <strong>complete governed platform</strong> that enables agencies to deploy, monitor, and scale AI responsibly.<br/><br/>Built for transparency and operational efficiency, our platform helps government teams achieve more while maintaining public trust.<br/><br/>Our <strong>Private AI Workspaces</strong> guarantee full data sovereignty and compliance, while giving teams the flexibility to choose from <strong>every major LLM</strong> — a level of control proprietary ecosystems can\'t match.'
    },
    transformationSection: {
      icon: Brain,
      title: 'Transforming Public Service Delivery',
      content: 'From citizen engagement to fraud prevention, ReadyAI.dev provides complete oversight and explainability. We help you to accelerate modernization without compromising governance.'
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
      buttonLink: 'https://calendly.com/readyai-dev/executive-evaluation'
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
