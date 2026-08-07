import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Download, ArrowRight } from 'lucide-react';

// Farid will also email this file to subscribers via the HubSpot workflow.
// Swap this path for the final whitepaper PDF once Carol delivers it.
const WHITEPAPER_DOWNLOAD_URL = '/downloads/readyai-whitepaper2.pdf';
// Filename the browser saves the PDF as
const WHITEPAPER_DOWNLOAD_FILENAME = 'The Seven Steps to Successful AI - ReadyAI Thoughtpiece No. 02.pdf';

const Whitepaper2ThankYouPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Thank You - ReadyAI';
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="relative bg-gradient-to-br from-primary via-primary-light to-primary-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 sm:pb-24 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            <CheckCircle2 className="w-8 h-8 text-accent" />
          </div>

          {/* Fluid font sizes keep the title on a single line at every viewport width */}
          <h1 className="font-heading whitespace-nowrap text-[min(1.875rem,calc(5.5vw-2px))] md:text-4xl font-normal text-white mb-4 sm:mb-6">
            Thank You — Your Whitepaper Is Ready
          </h1>

          <p className="font-sans text-sm sm:text-base md:text-lg text-white/90 leading-relaxed mb-8 max-w-2xl mx-auto">
            Click below to download your copy of the whitepaper. We&apos;ve also sent a copy to
            your inbox so you can revisit it anytime.
          </p>

          <a
            href={WHITEPAPER_DOWNLOAD_URL}
            download={WHITEPAPER_DOWNLOAD_FILENAME}
            className="inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-3.5 rounded-lg shadow-md hover:bg-accent-dark hover:shadow-lg transition-all duration-200 text-sm sm:text-base font-semibold"
          >
            <Download className="w-5 h-5" />
            Download the Whitepaper
          </a>
        </div>
      </div>

      {/* Next steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-normal text-primary mb-4">
            Ready to Put It Into Practice?
          </h2>
          <p className="font-sans text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-8">
            See how ReadyAI helps enterprises secure shadow AI, streamline compliance, and scale
            AI adoption with confidence. Book a personalized walkthrough with our team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://meetings-na2.hubspot.com/carol-eastman"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg shadow-md hover:bg-primary-dark hover:shadow-lg transition-all duration-200 text-sm sm:text-base font-semibold"
            >
              Book a Demo
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/insights"
              className="inline-flex items-center justify-center gap-2 border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-all duration-200 text-sm sm:text-base font-semibold"
            >
              Explore More Insights
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whitepaper2ThankYouPage;
