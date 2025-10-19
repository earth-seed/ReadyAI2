import React from 'react';
import { Shield, Target, Users, Zap, Award, Globe, Lock, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'About ReadyAI - Enterprise AI Platform';
  }, []);

  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'Enterprise-grade security and compliance built into every layer of our platform.'
    },
    {
      icon: Target,
      title: 'Mission Driven',
      description: 'Bridging enterprise innovation with AI risk mitigation for sustainable growth.'
    },
    {
      icon: Users,
      title: 'Partnership Approach',
      description: 'We walk alongside your team to ensure safe adoption and measurable ROI.'
    },
    {
      icon: Zap,
      title: 'Innovation at Scale',
      description: 'Cutting-edge AI technology that scales with your organization\'s needs.'
    }
  ];

  const stats = [
    { number: '30+', label: 'AI Models' },
    { number: '7+', label: 'Enterprise Subscriptions' },
    { number: '86%', label: 'Cost Savings' },
    { number: '24/7', label: 'Support' }
  ];

  const differentiators = [
    {
      title: 'Proven Infrastructure',
      description: 'Built by a global technology leader, trusted by Fortune 500 companies and government agencies.'
    },
    {
      title: 'Expert Team',
      description: 'IT veterans, AI strategists, and engineers with decades of experience guiding digital transformation.'
    },
    {
      title: 'Comprehensive Governance',
      description: 'Transparent governance and compliance tools designed for high-stakes sectors like healthcare and finance.'
    },
    {
      title: 'Strategic Partnership',
      description: 'We don\'t just sell tools—we guide your entire AI journey from strategy to implementation.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary via-primary-light to-primary-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-4">
              AI Confidence for Modern Enterprises
            </h1>
            <p className="font-sans text-base md:text-lg text-white/90 leading-relaxed">
              We provide secure, enterprise-grade AI platform that helps organizations embrace innovation 
              with clarity, confidence, and compliance.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-br from-accent2-lightest to-white py-12 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-heading text-4xl md:text-5xl font-medium text-accent mb-2">
                    {stat.number}
                  </div>
                  <div className="font-sans text-gray-700">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-primary mb-6">
              Our Mission
            </h2>
            <p className="font-sans text-xl text-gray-700 leading-relaxed mb-6">
              To be the trusted bridge between enterprise innovation and AI risk mitigation.
            </p>
            <p className="font-sans text-lg text-gray-600 leading-relaxed">
              We believe AI adoption doesn't have to be risky, rushed, or chaotic. Our mission is to help 
              organizations embrace AI with clarity, confidence, and compliance—especially in high-stakes 
              sectors like healthcare, finance, education, and government.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {values.map((value, index) => (
              <div key={index} className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-6 border border-gray-100 hover:border-accent/30 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-sans text-lg font-semibold text-primary mb-2">
                  {value.title}
                </h3>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The Challenge Section */}
      <div className="bg-gradient-to-br from-accent2-lightest to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-primary mb-8 text-center">
              The AI Challenge for Enterprises
            </h2>
            <p className="font-sans text-lg text-gray-700 leading-relaxed mb-6">
              AI is changing how businesses operate, innovate, and compete. But with all that promise 
              comes growing confusion, complexity, and risk. For tech and HR leaders, making mission-critical 
              decisions is becoming more stressful:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {[
                'Shadow AI tools appearing without oversight',
                'Misinformation and unclear guidance',
                'Uncertain ROI and value metrics',
                'Security and compliance risks in every decision'
              ].map((challenge, index) => (
                <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-4">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  </div>
                  <span className="font-sans text-gray-700">{challenge}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="font-sans text-xl font-semibold text-accent">
                ReadyAI exists to change that.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What Makes Us Different */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-heading text-3xl md:text-4xl font-medium text-primary mb-12 text-center">
          What Makes Us Different
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {differentiators.map((diff, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md border border-gray-100 p-8 hover:border-accent/30 transition-all">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-sans text-xl font-semibold text-primary mb-3">
                    {diff.title}
                  </h3>
                  <p className="font-sans text-gray-700 leading-relaxed">
                    {diff.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership Section */}
      <div className="bg-gradient-to-br from-accent2-lightest to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-primary mb-12 text-center">
            Meet Our Leadership
          </h2>
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <img 
                src="/assets/images/readyai-carol-eastman.jpeg" 
                alt="Carol Eastman - CEO of ReadyAI" 
                className="rounded-2xl shadow-lg w-64 h-64 object-cover"
              />
              <div className="flex-1">
                <h3 className="font-heading text-2xl font-medium text-primary mb-2">
                  <a 
                    href="https://www.linkedin.com/in/carol-eastman/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-dark transition-colors"
                  >
                    Carol Eastman
                  </a>
                </h3>
                <p className="font-sans text-lg text-gray-600 mb-4">CEO & Founder</p>
                <p className="font-sans text-gray-700 leading-relaxed mb-4">
                  Carol has spent her career leading multi-million dollar tech companies from startup to 
                  successful acquisition. She brings unmatched depth in IT strategy, business operations, 
                  and executive leadership.
                </p>
                <p className="font-sans text-gray-700 leading-relaxed">
                  Carol is joined by an elite team of AI engineers, cybersecurity specialists, and customer 
                  success professionals who are committed to helping enterprises navigate their AI journey safely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Who We Help */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 md:p-12">
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-primary mb-8 text-center">
            Who We Help
          </h2>
          <p className="font-sans text-lg text-gray-700 text-center max-w-3xl mx-auto mb-8">
            Our platform supports organizations across industries, from C-level executives to research teams
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Globe, label: 'C-Level Leaders' },
              { icon: Users, label: 'Directors' },
              { icon: Award, label: 'HR Teams' },
              { icon: TrendingUp, label: 'Researchers' },
              { icon: Lock, label: 'Educational Institutions' },
              { icon: Shield, label: 'Government Agencies' }
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-accent2-lightest to-white rounded-xl p-4 text-center border border-gray-100">
                <item.icon className="w-8 h-8 text-accent mx-auto mb-2" />
                <p className="font-sans text-sm font-medium text-gray-700">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-primary via-primary-light to-primary-dark py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-white mb-6">
            Ready to Transform Your AI Strategy?
          </h2>
          <p className="font-sans text-lg text-white/90 mb-8 leading-relaxed">
            Whether you're exploring LLM integration, AI-powered workflows, or organizational AI governance, 
            our platform can help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-lg font-sans font-semibold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl">
                Contact Our Team
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <a href="https://devs.ai/signup?ref=sales%40readyai.dev">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-lg font-sans font-semibold hover:bg-accent-dark transition-all shadow-lg hover:shadow-xl">
                Explore Platform
                <ArrowRight className="w-5 h-5" />
              </button>
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutPage;