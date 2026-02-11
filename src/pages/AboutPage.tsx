import React, { useState } from 'react';
import { Shield, Target, Users, Zap, Award, Globe, Lock, TrendingUp, CheckCircle, ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import BenMarshallArticleOverlay from '../components/ui/BenMarshallArticleOverlay';

const AboutPage: React.FC = () => {
  const [benArticleOverlayOpen, setBenArticleOverlayOpen] = useState(false);

  React.useEffect(() => {
    document.title = 'About ReadyAI - Enterprise AI Platform';
  }, []);

  // Handle smooth scroll to hash on page load and navigation
  React.useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        // Wait for page to render
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            const yOffset = -80; // Offset for fixed header if any
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 300);
      } else {
        // Scroll to top if no hash
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    scrollToHash();
    
    // Also listen for hash changes
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
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
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 sm:pb-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-4">
              AI Confidence for Modern Enterprises
            </h1>
            <p className="font-sans text-sm sm:text-base md:text-lg text-white/90 leading-relaxed">
              We provide a secure, enterprise-grade AI platform that helps organizations embrace innovation
              with clarity, confidence, and compliance.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-gradient-to-br from-accent2-lightest to-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-sans text-accent text-sm md:text-base uppercase tracking-widest mb-6">
              What Drives Us
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal text-primary mb-8">
              Our Mission
            </h2>
            <p className="font-sans text-xl md:text-2xl text-gray-800 leading-relaxed max-w-4xl mx-auto mb-8">
              To be the trusted bridge between enterprise innovation and AI risk&nbsp;mitigation.
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-16">
            <p className="font-sans text-lg text-gray-700 leading-relaxed text-center">
              We believe internal AI adoption doesn't have to be risky, rushed, or chaotic. Our mission is to help 
              organizations embrace AI with clarity, confidence, and compliance—especially in high-stakes 
              sectors like healthcare, finance, education, and&nbsp;government.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
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
      <div className="bg-gradient-to-br from-primary via-primary-light to-primary-dark py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-sans text-accent text-sm md:text-base uppercase tracking-widest mb-6">
              The Problem We Solve
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal text-white mb-8">
              The AI Challenge for Enterprises
            </h2>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <p className="font-sans text-lg md:text-xl text-white/90 leading-relaxed text-center mb-12">
              AI is changing how businesses operate, innovate, and compete. But with all that promise 
              comes growing confusion, complexity, and risk. For tech and HR leaders, making mission-critical 
              decisions is becoming more&nbsp;stressful:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[
                'Shadow AI tools appearing without oversight',
                'Misinformation and unclear guidance',
                'Uncertain ROI and value metrics',
                'Security and compliance risks in every decision'
              ].map((challenge, index) => (
                <div key={index} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  </div>
                  <span className="font-sans text-white/90 leading-relaxed">{challenge}</span>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <p className="font-sans text-xl md:text-2xl font-semibold text-accent">
                ReadyAI.dev exists to change that.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ben Marshall – Enterprise Internal AI Licensing */}
      <div className="bg-accent2-lightest py-16 md:py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <p className="font-sans text-accent text-sm md:text-base uppercase tracking-widest mb-6">
                Trusted perspective
              </p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal text-primary mb-8">
                Enterprise Internal AI Licensing in Focus
              </h2>
            </div>
            {/* Single card: left = photo + subtext (bigger), right = text + button */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 sm:p-8 md:p-10 flex flex-col sm:flex-row gap-8 md:gap-12">
                {/* Left: photo + subtext */}
                <div className="flex-shrink-0 flex flex-col items-start">
                  <a
                    href="https://www.linkedin.com/in/benfmarshall/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-xl overflow-hidden bg-gray-900 w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56"
                  >
                    <img
                      src="/assets/images/ben.jpeg"
                      alt="Ben Marshall, Founder & CEO, The IT Strategists"
                      className="w-full h-full object-cover"
                      width={224}
                      height={224}
                    />
                  </a>
                  <p className="font-sans text-base font-semibold text-primary mt-4">Ben Marshall</p>
                  <p className="font-sans text-sm text-gray-600">Founder & CEO, The IT Strategists</p>
                  <a
                    href="https://www.linkedin.com/in/benfmarshall/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-accent hover:underline mt-1 inline-block"
                  >
                    LinkedIn
                  </a>
                </div>
                {/* Right: text + button */}
                <div className="flex-1 min-w-0 flex flex-col">
                  <p className="font-sans text-base sm:text-lg text-gray-700 leading-relaxed">
                    With insights from Ben Marshall, world-class licensing expert and CEO of The IT Strategist, whose proven expertise helps enterprises navigate complex licensing impacts, this document brings much-needed clarity to the internal AI licensing, cost, and risk landscape.
                  </p>
                  <button
                    type="button"
                    onClick={() => setBenArticleOverlayOpen(true)}
                    className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-sans text-sm font-medium text-accent border-2 border-accent hover:bg-accent/5 transition-colors w-fit"
                  >
                    <FileText className="w-5 h-5" />
                    Read the full document
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What Makes Us Different */}
      <div className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-sans text-accent text-sm md:text-base uppercase tracking-widest mb-6">
              Our Advantage
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal text-primary">
              What Makes Us Different
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {differentiators.map((diff, index) => (
              <div key={index} className="flex items-start gap-4">
                <CheckCircle className="w-7 h-7 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-sans text-lg md:text-xl font-semibold text-primary mb-3">
                    {diff.title}
                  </h3>
                  <p className="font-sans text-base text-gray-700 leading-relaxed">
                    {diff.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BenMarshallArticleOverlay isOpen={benArticleOverlayOpen} onClose={() => setBenArticleOverlayOpen(false)} />

      {/* Leadership Section */}
      <div id="leadership" className="bg-gradient-to-br from-primary via-primary-light to-primary-dark py-20 md:py-32 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-sans text-accent text-sm md:text-base uppercase tracking-widest mb-6">
              Leadership & Vision
            </p>
            <h2 className="font-heading text-white text-3xl md:text-4xl lg:text-5xl font-normal">
              Meet Our Leadership
            </h2>
          </div>
          
          <div className="max-w-7xl mx-auto">
            {/* Hero Section with Image and Intro */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
              <div className="grid lg:grid-cols-5 gap-0">
                {/* Image Section */}
                <div className="lg:col-span-2 relative">
                  <img 
                    src="/assets/images/readyai-carol-eastman.jpeg" 
                    alt="Carol Eastman - CEO of ReadyAI" 
                    className="w-full h-full object-cover min-h-[250px] sm:min-h-[300px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                </div>
                
                {/* Header Info */}
                <div className="lg:col-span-3 p-5 sm:p-6 md:p-8">
                  <div className="mb-4">
                    <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-medium text-primary mb-2">
                      Carol Eastman
                    </h3>
                    <p className="font-sans text-lg sm:text-xl text-accent font-semibold mb-3">CEO & Founder</p>
                    <a 
                      href="https://www.linkedin.com/in/carol-eastman/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-sans"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      Connect on LinkedIn
                    </a>
                  </div>

                  <p className="font-sans text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                    Carol Eastman is an accomplished technology entrepreneur and CEO with a career spanning multiple successful ventures in security, communications, and disruptive technologies. Carol has founded, scaled, and successfully exited companies to global enterprises—including two strategic acquisitions that validated her vision and execution.
                  </p>
                </div>
              </div>
            </div>

            {/* Bio Content - Two Column Layout */}
            <div className="bg-white rounded-2xl shadow-2xl p-5 sm:p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
                <div className="space-y-4 sm:space-y-6">
                  <p className="font-sans text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                    As the founder and leader of ReadyAI.dev, Carol has built an AI company that addresses the critical gap between AI innovation and enterprise readiness. ReadyAI.dev provides professional services for innovative AI solutions and serves as a best-in-class enterprise platform that enables businesses to host all of their internal AI operations.
                  </p>

                  <p className="font-sans text-gray-700 text-base md:text-lg leading-relaxed">
                    Through this strategic partnership, ReadyAI.dev delivers Private AI Workspaces that create secure environments for teams and sensitive data, One-Click Model Deployment to keep organizations current with every new model release, and a No-Code Agent Builder that empowers anyone to create AI agents without technical expertise.
                  </p>

                  <p className="font-sans text-gray-700 text-base md:text-lg leading-relaxed">
                    What sets Carol apart is her ability to identify emerging technologies at their inflection point and translate that foresight into actionable business strategy. She excels at mapping necessity, defining requirements, architecting rollout strategies, and driving adoption—consistently positioning her companies ahead of market curves and competitor responses.
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <p className="font-sans text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                    As a data-driven executive, Carol doesn't rely solely on intuition—she demands intelligence. Every strategic decision, from product development to market positioning, is grounded in rigorous analysis and informed by real-world insights.
                  </p>

                  <p className="font-sans text-gray-700 text-base md:text-lg leading-relaxed">
                    Carol's expertise in AI and emerging technologies isn't theoretical—it's operational. She understands how to harness innovation for competitive advantage while maintaining the operational rigor required to scale businesses and deliver sustainable value. Her leadership has guided companies through the complete journey from startup ambiguity to acquisition-ready maturity.
                  </p>

                  <p className="font-sans text-gray-700 text-base md:text-lg leading-relaxed">
                    Under Carol's leadership, organizations gain more than a CEO—they gain a strategic architect who can anticipate disruption, operationalize innovation, and execute at the highest level. Her track record speaks for itself: multiple successful exits, lasting impact in security and communications sectors, and a proven methodology for turning emerging technologies into market-leading solutions.
                  </p>
                </div>
              </div>
            </div>

            {/* Team Note */}
            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <p className="font-sans text-white/90 text-center text-lg leading-relaxed italic">
                Carol is joined by an elite team of AI engineers, cybersecurity specialists, and customer success professionals who are committed to helping enterprises navigate their AI journey safely.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Who We Help */}
      <div className="bg-gradient-to-br from-accent2-lightest to-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-sans text-accent text-sm md:text-base uppercase tracking-widest mb-6">
              Our Clients
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal text-primary mb-6">
              Who We Help
            </h2>
            <p className="font-sans text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Our platform supports organizations across industries, from C-level executives to research&nbsp;teams
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {[
              { icon: Globe, label: 'C-Level Leaders' },
              { icon: Users, label: 'Directors' },
              { icon: Award, label: 'HR Teams' },
              { icon: TrendingUp, label: 'Researchers' },
              { icon: Lock, label: 'Educational Institutions' },
              { icon: Shield, label: 'Government Agencies' }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-4 sm:p-6 text-center hover:shadow-md transition-all">
                <item.icon className="w-8 h-8 sm:w-10 sm:h-10 text-accent mx-auto mb-2 sm:mb-3" />
                <p className="font-sans text-xs sm:text-sm font-semibold text-gray-700">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-primary via-primary-light to-primary-dark py-16 sm:py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white mb-4 sm:mb-6">
            Ready to Transform Your AI Strategy?
          </h2>
          <p className="font-sans text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-12 leading-relaxed">
            Whether you're exploring LLM integration, AI-powered workflows, or organizational AI governance, 
            our platform can help you&nbsp;succeed.
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