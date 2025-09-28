// components/WhyLeadersChoose.jsx
import React from "react";
import { ShieldCheck, Rocket, Users, Handshake } from "lucide-react";
import SlideAnimator from "../../utils/SlideAnimator";

const features = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-accent-light" />,
    title: "Enterprise-grade",
    description: "Security, compliance, governance built in",
  },
  {
    icon: <Rocket className="w-10 h-10 text-accent-light" />,
    title: "Future-proof",
    description: "Every new model and agent, instantly deployed",
  },
  {
    icon: <Users className="w-10 h-10 text-accent-light" />,
    title: "Human-focused",
    description: "Governance that enables innovation",
  },
  {
    icon: <Handshake className="w-10 h-10 text-accent-light" />,
    title: "Trusted Partner",
    description: "Consulting, integration, and scale services",
  },
];

export default function WhyLeadersChoose() {
  return (
    <SlideAnimator direction="down">
      <section className="bg-gray-50 py-20 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(0,0,0,0.05)_1px,_transparent_1px)] [background-size:24px_24px]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          {/* Section header */}
          <h2 className="text-3xl md:text-4xl font-bold text-accent2 mb-12">
            Why Leaders Choose <span className="text-accent-light">ReadyAI.dev</span>
          </h2>

          {/* Feature grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-2xl p-8 flex flex-col items-center text-center transform hover:-translate-y-2 hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-accent2 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SlideAnimator>
  );
}