// components/Banner5Section.jsx
import React from 'react';
import { Cpu, BellPlus } from 'lucide-react';
import SlideAnimator from '../../utils/SlideAnimator';

const features = [
  {
    icon: <BellPlus className="w-12 h-12 text-accent-light" />,
    title: "New models released weekly",
    description: "New LLMs become old news – fast",
  },
  {
    icon: <Cpu className="w-12 h-12 text-accent-light" />,
    title: "Agentic AI is here",
    description: "Chatbots aren’t enough in the agent era",
  },
];

export default function Banner5Section() {
  return (
    <SlideAnimator direction="up">
      <div>
        {/* Top title row with patterned background */}
        <div className="relative bg-accent2-lightest text-accent2 text-center py-16 overflow-hidden">
          {/* Diagonal overlay shapes */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-accent transform -skew-y-6 opacity-5"></div>
            <div className="absolute inset-0 bg-accent-light transform skew-y-6 opacity-10"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-lg md:text-xl font-light">AI users face</h2>
            <h1 className="text-3xl md:text-4xl font-bold">Major Problems</h1>
          </div>
        </div>

        {/* Feature cards section */}
        <section className="text-white py-24 px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-center items-center gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white text-center shadow-lg rounded-2xl p-8 w-full md:w-80 transform hover:scale-105 transition-transform duration-300"
              >
                <div className="flex justify-center mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-accent2 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SlideAnimator>
  );
}