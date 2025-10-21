// components/TransitionCTA.jsx
import React from "react";
import SlideAnimator from "../../utils/SlideAnimator";
import CalendlyBtn from "./CalendlyBtn";

export default function TransitionCTA() {
  return (
    <SlideAnimator direction="up">
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        {/* Subtle diagonal overlays */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-primary-light transform -skew-y-6 opacity-20"></div>
          <div className="absolute inset-0 bg-accent transform skew-y-6 opacity-10"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-normal mb-6">
            Transition with Confidence
          </h2>
          <p className="font-sans text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
            ReadyAI moves enterprises into the agent era. <br />
            Securely, strategically, and at scale.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6">            
            <CalendlyBtn
              text="Book a Discovery Call"
              className="bg-accent text-white px-6 py-3 rounded-lg font-sans font-semibold shadow-lg hover:bg-accent-dark transition-all duration-200 hover:shadow-xl transform hover:-translate-y-0.5"
            />
          </div>
        </div>
      </section>
    </SlideAnimator>
  );
}