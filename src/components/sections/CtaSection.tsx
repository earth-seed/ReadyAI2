import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import CalendlySection from './CalendlySection';
import CalendlySectionPopUp from './CalendlySectionPopUp';
import FloatingButton from '../../utils/FloatingButton';
import SlideAnimator from '../../utils/SlideAnimator';

const CtaSection: React.FC = () => {
  return (
    <SlideAnimator direction="left">
    <div className="bg-primary">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:justify-between">
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7 text-white text-xl leading-loose tracking-widest">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                <span className="block">Ready to Take the Next Step?</span>
              </h2>
              <br />
              <p className="mb-4 text-xl leading-loose tracking-widest">
                Starting with AI or looking to formalize governance across your enterprise.

                Whatever stage you are at. ReadyAI.dev can help you. Select one of the steps below to secure AI in your workplace.
              </p>
              <h3 className="font-semibold mt-8 mb-6">Next Steps to Secure AI:</h3>
              <ul className="list-disc ml-6">
                <li>Book a Call with a Platform Guide to evaluate your current AI situation</li>
                <li>Explore the platform with a Self-Guided Demo</li>
                <li>Test and scale with confidence with a ReadyAI.dev pilot (3–7 people)</li>
                <li>Schedule a Strategy Session with our Executive Team</li>
                <p>Let’s build your AI foundation, securely, strategically, and at your pace</p>
              </ul>
            </div>
            <div className="lg:col-span-5 mt-8 lg:mt-0">
              <CalendlySection />
            </div>
          </div>
          </div>

          <FloatingButton url="https://devs.ai/signup?ref=sales%40readyai.dev" label="Explore Platform" />

            {/* <Link to="/contact">
              <Button 
                className="bg-white text-blue-600"
                size="lg"
              >
                Get started
              </Button>
            </Link>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <Link to="/solutions">
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-primary-dark text-white border-accent hover:bg-primary"
              >
                Learn more
              </Button>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
    </SlideAnimator>
  );
};

export default CtaSection;