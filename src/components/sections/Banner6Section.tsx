// components/ShadowAIStatsSection.jsx
import React from "react";
import SlideAnimator from "../../utils/SlideAnimator";

export default function Banner6Section() {
  return (
    <SlideAnimator direction="left">
      <section className="relative bg-accent2-lightest text-white py-20 overflow-hidden">
        {/* Background translucent diagonal shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-accent2-lighter transform skew-x-[-20deg]"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-accent2-lighter transform skew-x-[-20deg]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 lg:px-12 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-white">
            <span className="text-accent-light">The Risk</span>{" "}
            <span className="text-gray-600">of Falling Behind</span>
          </h2>

          <p className="text-gray-600 text-lg md:text-xl mt-4 text-center max-w-3xl mx-auto">
            AI evolves weekly. Governance lags behind.{" "}
            <span className="font-semibold text-gray-600">
              Shadow AI is already inside your enterprise.
            </span>
          </p>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left column - narrative */}
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-accent mb-6">
                Shadow AI threatens your data, compliance, and reputation.
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Boards aren’t asking about experiments. They want answers:
              </p>
              <ul className="mt-6 space-y-4 text-lg text-gray-600 list-disc list-inside">
                <li>
                  <span className="font-semibold">Who owns AI governance?</span>
                </li>
                <li>
                  <span className="font-semibold">What’s the ROI?</span>
                </li>
                <li>
                  <span className="font-semibold">Are we keeping pace?</span>
                </li>
              </ul>
            </div>

            {/* Right column - stats */}
            <div className="text-center lg:text-left">
              <h3 className="text-3xl md:text-4xl font-bold text-accent mb-10">
                ~2 New AI models released weekly
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 text-accent">
                <div className="text-center">
                  <p className="text-6xl font-bold text-accent-dark">75%</p>
                  <p className="mt-2 text-lg text-gray-600">
                    of employees use free AI tools
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-6xl font-bold text-accent-dark">69%</p>
                  <p className="mt-2 text-lg text-gray-600">
                    are afraid to report <br /> they use AI tools
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SlideAnimator>
  );
}
