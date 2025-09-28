// components/TransitionCTA.jsx
import React from "react";
import SlideAnimator from "../../utils/SlideAnimator";
import CalendlyBtn from "./CalendlyBtn";

export default function TransitionCTA() {
  return (
    <SlideAnimator direction="up">
      <section className="bg-accent2 text-white py-20 relative overflow-hidden">
        {/* Subtle diagonal overlays */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-accent2-lighter transform -skew-y-6 opacity-20"></div>
          <div className="absolute inset-0 bg-accent-light transform skew-y-6 opacity-10"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Transition with Confidence.
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed">
            ReadyAI.dev moves enterprises into the agent era. <br />
            Securely, strategically, and at scale.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6">            
            <CalendlyBtn
              text="Book a Discovery Call"
              className="bg-accent text-white px-5 py-2 rounded-lg shadow hover:bg-accent-dark"
            />
          </div>
        </div>
      </section>
    </SlideAnimator>
  );
}