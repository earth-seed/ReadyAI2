import { Industry, Solution, NavItem, Legal, Contact, About } from '../types';



export const INSIGHTS = [
  {
    title: 'Private AI Workspaces',
    description: 'shadow ai',
    keywords: 'private ai, workspaces, shadow ai',
  }
];

export const SOLUTIONS: Solution[] = [
  {
    id: 'ai-agents',
    title: 'AI Agents',
    description: 'Deploy customizable AI agents that automate complex workflows and decision-making processes across your organization',
    icon: 'cpu',
  },
  {
    id: 'llm-integration',
    title: 'LLM Integration',
    description: 'Access industry-leading selection of customizable LLMs tailored to your specific business needs and use cases',
    icon: 'layout-dashboard',
  },
  {
    id: 'security',
    title: 'Security & Compliance',
    description: 'Enterprise-grade security with role-based access control, audit logs, and compliance with industry standards',
    icon: 'shield',
  }
];

export const INDUSTRIES: Industry[] = [
  {
    id: 'financial',
    name: 'Financial Services',
    description: 'Streamline operations, enhance customer experiences, and improve risk management with AI-powered solutions.',
    icon: 'landmark',
  },
  {
    id: 'retail',
    name: 'Retail',
    description: 'Personalize customer experiences, optimize inventory management, and automate routine tasks',
    industryStatement: 'We understand your industry, we\'ve done this before, and we have trusted partners who can support you.',
    icon: 'shopping-bag',
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Life Sciences',
    description: 'Improve patient care, accelerate research, and optimize operational efficiency with secure AI solutions',
    industryStatement: 'We understand your industry, we\'ve done this before, and we have trusted partners who can support you, such as <a href="https://www.linkedin.com/in/paul-m-berman/" target="_blank" rel="noopener noreferrer" class="text-accent hover:text-accent-dark underline hover:no-underline transition-all duration-200 font-semibold">Paul Berman, MBA</a>.',
    icon: 'stethoscope',
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    description: 'Enhance quality control, predict maintenance needs, and optimize production processes',
    industryStatement: 'We understand your industry, we\'ve done this before, and we have trusted partners who can support you.',
    icon: 'factory',
  },
  {
    id: 'energy',
    name: 'Energy & Utilities',
    description: 'Optimize resource allocation, predict equipment failures, and improve customer service',
    industryStatement: 'We understand your industry, we\'ve done this before, and we have trusted partners who can support you.',
    icon: 'zap',
  },
  {
    id: 'public',
    name: 'Public Sector',
    description: 'Enhance citizen services, improve resource allocation, and optimize administrative processes',
    industryStatement: 'We understand your industry, we\'ve done this before, and we have trusted partners who can support you.',
    icon: 'building',
  }
];


export const LEGAL: Legal[] = [
  {
    id: 'privacy-policy',
    title: 'Privacy Policy',
    description: 'Learn about our privacy practices and how we handle your data.',
  },
  {
    id: 'terms-of-service',
    title: 'Terms of Service',
    description: 'Review the terms governing the use of our services.',
  },
  {
    id: 'gdpr',
    title: 'GDPR',
    description: 'Understand our compliance with GDPR regulations.',
  }
]


export const CONTACT: Contact[] = [
  {
    id: 'contact',
    title: 'Contact'
  }
]


export const ABOUT: About[] = [
  {
    id: 'about-us',
    title: 'About'
  }
]



 export const Services = [
    {
      name: 'OpenAI',
      price: '$60/mo',
      icon: '/assets/images/openai.png',
      color: 'bg-green-500'
    },
    {
      name: 'ANTHROPIC',
      price: '$60/mo',
      icon: '/assets/images/anthropic.png',
      color: 'bg-orange-500'
    },
    {
      name: 'Gemini',
      price: '$30/mo',
      icon: '/assets/images/gemini.png',
      color: 'bg-blue-500'
    },
    {
      name: 'cohere',
      price: '$19/mo',
      icon: '/assets/images/cohere.png',
      color: 'bg-green-600'
    },
    {
      name: 'Grok',
      price: '$40/mo',
      icon: '/assets/images/grok.png',
      color: 'bg-black'
    },
    {
      name: 'Meta',
      price: 'Open source',
      icon: '/assets/images/meta.png',
      color: 'bg-blue-600'
    },
    {
      name: 'deepseek',
      price: 'Open source',
      icon: '/assets/images/deepseek.png',
      color: 'bg-purple-600'
    },
    {
      name: '',
      price: 'Plus more!',
      icon: '',
      color: ''
    }
  ];

 export const PricingTiers = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: '/mo',
      keywords: 'price, pricing, free, cost',
      features: [
        'Access to 20+ LLMs',
        '2GB storage',
        'Microsoft integration',
        'Create unlimited agents',
        'Use unlimited agents',
        'Analytics on AI usage',
        'Vector database & RAG pipeline',
        'RAG & Python tools'
      ]
    },
    {
      id: 'personal',
      name: 'Personal',
      price: '$15',
      period: '/mo/seat',
      keywords: 'price, pricing, free, cost',
      subtitle: '(7-day free trial)',
      note: 'Paid annually',
      monthlyNote: '$18/mo/seat if month to month',
      popular: true,
      features: [
        'Access to all 30+ LLMs',
        '10GB storage',
        'All integrations',
        'Unlimited chat history',
        'Embed AI anywhere',
        'Build workflows',
        'Access to APIs',
        '+All features in Free'
      ]
    },
    {
      id: 'business-and-teams',
      name: 'Business',
      price: '$30',
      period: '/mo/seat',
      keywords: 'price, pricing, free, cost',
      note: 'Paid annually',
      features: [
        'Access to 30+ LLMs',
        '20GB storage',
        'Governance features',
        'User permissions',
        'Compliance tools',
        'Advanced analytics',
        '+All features in Personal'
      ]
    },
    {
      id: 'individual-starter-plans',
      name: 'Individual & Starter Plans',
      price: '$0',
      period: '/mo/seat',
      keywords: 'starter, pricing, free, cost',
      note: 'Best for exploring AI capabilities and learning the basics',
      features: [
        'Access to 30+ LLMs',
        '2GB storage',
        'Unlimited agents',
        'Analytics & reporting',
        'Microsoft integration'
      ]
    }
  ];



export const NAVIGATION: NavItem[] = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Platform',
    path: '/solutions',
    submenu: [
      {
        name: 'Explore Platform',
        path: '/solutions',
      },
      ...SOLUTIONS.map(solution => ({
        name: solution.title,
        path: `/solutions/${solution.id}`,
      })),
    ],
  },
  {
    name: 'Industry',
    path: '/industry',
    submenu: INDUSTRIES.map(industry => ({
      name: industry.name,
      path: `/industry/${industry.id}`,
    })),
  },
  {
    name: 'Pricing and Plans',
    path: '/plans-and-enterprise-options',
    submenu: [
      {
        name: 'Enterprise Options',
        path: '/plans-and-enterprise-options',
      },
      {
        name: 'Individual Plans',
        path: '/plans-and-enterprise-options/individual-starter-plans',
      }
    ],
  },
  {
    name: 'FAQ',
    path: '/faq'
  },
  {
    name: 'Insights',
    path: '/insights',
  }
  // {
  //   name: 'Resources',
  //   path: '/resources'
  // },
  // {
  //   name: 'Blog',
  //   path: '/blog'
  // },
];