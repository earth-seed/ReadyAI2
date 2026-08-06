import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, FileText } from 'lucide-react';

// HubSpot form embed configuration (provided by marketing)
const HUBSPOT_SCRIPT_SRC = 'https://js-na2.hsforms.net/forms/embed/v2.js';
const HUBSPOT_PORTAL_ID = '245381123';
const HUBSPOT_FORM_ID = 'f663c7e7-e8f1-419e-ad4d-e5b9a8c739d2';
const HUBSPOT_REGION = 'na2';
const FORM_TARGET_ID = 'hubspot-whitepaper2-form';

// Placeholder copy — update the headline, intro, and bullets once Carol
// delivers the final whitepaper content.
const Whitepaper2Page: React.FC = () => {
  const navigate = useNavigate();
  const formCreated = useRef(false);

  useEffect(() => {
    document.title = 'Whitepaper - ReadyAI';
  }, []);

  useEffect(() => {
    const createForm = () => {
      if (formCreated.current || !window.hbspt) return;
      formCreated.current = true;
      window.hbspt.forms.create({
        portalId: HUBSPOT_PORTAL_ID,
        formId: HUBSPOT_FORM_ID,
        region: HUBSPOT_REGION,
        target: `#${FORM_TARGET_ID}`,
        onFormSubmitted: () => {
          // Fallback redirect in case no redirect is configured on the HubSpot form
          setTimeout(() => navigate('/whitepaper2/thank-you'), 500);
        },
      });
    };

    if (window.hbspt) {
      createForm();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${HUBSPOT_SCRIPT_SRC}"]`
    );
    const script = existingScript ?? document.createElement('script');
    script.addEventListener('load', createForm);
    if (!existingScript) {
      script.src = HUBSPOT_SCRIPT_SRC;
      script.charset = 'utf-8';
      script.type = 'text/javascript';
      document.body.appendChild(script);
    }

    return () => script.removeEventListener('load', createForm);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with gated form above the fold */}
      <div className="relative bg-gradient-to-br from-primary via-primary-light to-primary-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 sm:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-x-16 lg:gap-y-4 items-start">
            {/* Left top - Headline and intro */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-5">
                <FileText className="w-4 h-4 text-accent" />
                <span className="font-sans text-xs sm:text-sm font-medium text-white uppercase tracking-wide">
                  Free Whitepaper
                </span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-4 sm:mb-6 leading-tight">
                Practical Guidance for Enterprise AI Leaders
              </h1>

              <p className="font-sans text-sm sm:text-base md:text-lg text-white/90 leading-relaxed">
                Enterprise AI is moving fast, and leadership teams need clear, actionable
                guidance to keep up. This whitepaper gives CIOs, CISOs, and technology leaders
                practical insights for adopting AI securely, meeting compliance obligations, and
                scaling with confidence.
              </p>
            </div>

            {/* Left bottom - Bullets and trust (below the form on mobile) */}
            <div className="max-w-2xl order-3 lg:order-none lg:col-start-1">
              <ul className="space-y-3">
                {[
                  'Actionable guidance for secure enterprise AI adoption',
                  'How to keep compliance and governance ahead of AI growth',
                  'Practical steps to protect sensitive data in AI workflows',
                  'Insights drawn from real enterprise AI deployments',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-sm sm:text-base text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right - Gated form */}
            <div className="w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto lg:mt-16 order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-accent/20 border border-accent/30">
                {/* Gold brand bar */}
                <div className="h-1.5 bg-gradient-to-r from-accent-dark via-accent to-accent-light"></div>
                <div className="bg-gradient-to-b from-white to-accent2-lightest p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-accent-dark" />
                    </div>
                    <h2 className="font-heading text-2xl sm:text-3xl font-normal text-primary">
                      Get Your Free Copy
                    </h2>
                  </div>
                  <p className="font-sans text-sm sm:text-base text-primary-light leading-relaxed mb-6">
                    Fill out the form below and we&apos;ll send the whitepaper straight to your
                    inbox.
                  </p>
                  <div id={FORM_TARGET_ID} className="min-h-[300px]">
                    <p className="font-sans text-sm text-gray-400">Loading form…</p>
                  </div>
                  <p className="font-sans text-xs text-primary-light/80 mt-4">
                    We respect your privacy. Your information is never shared with third parties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Supporting content below the fold */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-normal text-primary mb-4">
            Why This Whitepaper Matters
          </h2>
          <p className="font-sans text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
            Most enterprises are adopting AI faster than they can govern it. Ungoverned tools,
            unclear policies, and fragmented oversight put data, compliance, and trust at risk.
            This guide distills what leading organizations are doing to turn AI from a liability
            into a durable competitive advantage — with clear visibility, real control, and
            confident adoption at every level of the business.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Whitepaper2Page;
