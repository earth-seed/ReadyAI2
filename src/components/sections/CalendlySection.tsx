import React from 'react';
import { Clock3, Video } from 'lucide-react';

const CalendlySection: React.FC = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
      <div className="flex justify-center border-b border-gray-200 bg-white px-6 py-6">
        <img
          src="/readyai-logo.jpg"
          alt="ReadyAI"
          className="h-10 w-auto object-contain"
        />
      </div>

      <div className="px-6 py-8">
        <div className="mb-6 flex flex-col items-center text-center">
          <img
            src="/assets/images/readyai-carol-eastman.jpeg"
            alt="Carol Eastman"
            className="h-28 w-28 rounded-full object-cover"
          />
          <h3 className="mt-3 font-heading text-2xl font-medium text-primary">Book a Leadership Call</h3>
          <p className="mt-2 max-w-sm font-sans text-sm leading-relaxed text-gray-600">
            Meet with our team to align on internal AI strategy, governance priorities, and practical next steps.
          </p>
        </div>

        <div className="mx-auto mb-8 max-w-md space-y-3 rounded-lg bg-gray-50 px-4 py-4">
          <div className="flex items-center gap-2 font-sans text-sm text-gray-700">
            <Clock3 className="h-5 w-5 text-gray-500" />
            <span>30 minutes</span>
          </div>
          <div className="flex items-center gap-2 font-sans text-sm text-gray-700">
            <Video className="h-5 w-5 text-gray-500" />
            <span>Web conferencing details provided on confirmation</span>
          </div>
        </div>

        <a
          href="https://meetings-na2.hubspot.com/carol-eastman"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center rounded-lg bg-accent px-6 py-3 font-sans font-semibold text-white transition-colors hover:bg-accent-dark"
        >
          Schedule a Call
        </a>

        <p className="mt-3 text-center font-sans text-xs text-gray-500">
          You will be redirected to our secure HubSpot booking page.
        </p>
      </div>

      <div className="border-t border-gray-200" />
    </div>
  );
};

export default CalendlySection;