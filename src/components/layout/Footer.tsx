import React from 'react';
import { Link } from 'react-router-dom';
import { INDUSTRIES, SOLUTIONS, LEGAL, CONTACT, ABOUT } from '../../utils/constants';

// Platform certifications shown as badges along the bottom of every page.
// `big` lines are emphasized; `small` lines are the supporting label.
const CERTIFICATIONS: { label: string; lines: { text: string; big: boolean }[] }[] = [
  { label: 'SOC 2 Type II', lines: [{ text: 'SOC 2', big: true }, { text: 'Type II', big: false }] },
  { label: 'ISO 27001', lines: [{ text: 'ISO', big: false }, { text: '27001', big: true }] },
  { label: 'GDPR', lines: [{ text: 'GDPR', big: true }] },
  { label: 'HIPAA', lines: [{ text: 'HIPAA', big: true }] },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 gap-y-20 md:gap-y-0">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-y-14 md:gap-y-0 gap-x-6 items-start">

          {/* Logo & Description */}
          <ul className="space-y-6 text-center md:text-left items-center md:items-start">
            <li>
              <img 
                src="/readyai-logo.jpg"
                alt="ReadyAI" 
                className="h-8 w-auto mx-auto md:mx-0"
              />
            </li>
            <li>
              <p className="text-gray-500 text-sm">
                Simplify AI adoption with a secure, flexible platform that meets your specific business needs
              </p>
            </li>
          </ul>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
            <ul className="space-y-2">
              {CONTACT.map((contact) => (
                <li key={contact.id}>
                  <Link 
                    to={`/${contact.id}`} 
                    className="text-gray-500 hover:text-gray-900"  
                  >
                    {contact.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About Us</h3>
            <ul className="space-y-2">
              {ABOUT.map((about) => (
                <li key={about.id}>
                  <Link 
                    to={`/${about.id}`} 
                    className="text-gray-500 hover:text-gray-900"  
                  >
                    {about.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/solutions" 
                  className="text-gray-500 hover:text-gray-900"
                >
                  Explore Platform
                </Link>
              </li>
              {SOLUTIONS.map((solution) => (
                <li key={solution.id}>
                  <Link 
                    to={`/solutions/${solution.id}`} 
                    className="text-gray-500 hover:text-gray-900"
                  >
                    {solution.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Industries</h3>
            <ul className="space-y-2">
              {INDUSTRIES.map((industry) => (
                <li key={industry.id}>
                  <Link 
                    to={`/industry/${industry.id}`} 
                    className="text-gray-500 hover:text-gray-900"
                  >
                    {industry.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              {LEGAL.map((legal) => (
                <li key={legal.id}>
                  <Link
                    to={`/${legal.id}`} 
                    className="text-gray-500 hover:text-gray-900"
                  >
                    {legal.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Platform certifications */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <p className="text-gray-400 text-xs uppercase tracking-widest text-center mb-6">
            Our Platform Certifications
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.label}
                role="img"
                aria-label={`${cert.label} certified`}
                className="relative flex h-24 w-24 flex-col items-center justify-center rounded-full bg-gradient-to-b from-primary to-primary-dark text-center shadow-sm"
              >
                {/* Gold arc across the top, echoing a certification seal */}
                <svg
                  viewBox="0 0 100 100"
                  className="pointer-events-none absolute inset-0 h-full w-full text-accent"
                  aria-hidden="true"
                >
                  {/* 150°-wide arc centered on the top of the circle */}
                  <path
                    d="M6.54 38.35 A45 45 0 0 1 93.46 38.35"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
                {cert.lines.map((line) => (
                  <span
                    key={line.text}
                    className={
                      line.big
                        ? 'font-heading text-white text-lg font-semibold leading-none'
                        : 'font-sans text-white/80 text-[11px] uppercase tracking-wide leading-tight'
                    }
                  >
                    {line.text}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-gray-200 mt-10 pt-8">
          <p className="text-gray-500 text-sm text-center">
            &copy; {new Date().getFullYear()} ReadyAI.dev. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;