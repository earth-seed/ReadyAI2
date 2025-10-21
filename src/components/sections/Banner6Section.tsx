// components/AIGovernanceGap.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { AlertCircle, TrendingUp, Users } from "lucide-react";

const Counter = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
};

export default function Banner6Section() {
  return (
    <section className="relative bg-accent2-lightest py-20 md:py-32 overflow-hidden">
      {/* Subtle animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent2-lighter via-accent2-lightest to-accent2-lighter opacity-30 animate-pulse" style={{ animationDuration: '8s' }}></div>
      
      {/* Diagonal decorative shapes */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent2-lighter transform skew-x-[-20deg]"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-accent2-lighter transform skew-x-[-20deg]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* PART 1: OPENING STATEMENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-sans text-accent text-sm md:text-base uppercase tracking-widest mb-4">
            The Enterprise Reality
          </p>
          <h2 className="font-heading text-primary text-4xl md:text-6xl font-normal mb-6 leading-tight">
            AI Evolves Weekly. Governance Lags Behind.
          </h2>
          <p className="font-sans text-primary-light text-lg md:text-2xl max-w-4xl mx-auto leading-relaxed">
            Shadow AI is already inside your enterprise—creating gaps in 
            data security, compliance, and strategic oversight.
          </p>
        </motion.div>

        {/* PART 2: THE DATA (3-Column Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            {
              stat: "~2",
              label: "New AI Models Released Weekly",
              description: "LLMs become old news fast. Staying current is a challenge.",
              icon: TrendingUp,
              delay: 0.1
            },
            {
              stat: "75%",
              statNumber: 75,
              label: "Of Employees Use Free AI Tools",
              description: "AI adoption is happening—with or without your governance framework.",
              icon: Users,
              delay: 0.2
            },
            {
              stat: "69%",
              statNumber: 69,
              label: "Are Afraid to Report AI Tool Usage",
              description: "Shadow AI creates blind spots in compliance and data security.",
              icon: AlertCircle,
              delay: 0.3
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: item.delay, duration: 0.6 }}
              className="group relative bg-white/60 backdrop-blur-sm border border-accent/20 rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-30 transition-opacity">
                <item.icon className="w-12 h-12 text-accent" strokeWidth={1} />
              </div>
              <div className="relative">
                <div className="font-heading text-6xl md:text-7xl font-normal text-accent mb-4">
                  {item.statNumber ? (
                    <>
                      <Counter end={item.statNumber} />%
                    </>
                  ) : (
                    item.stat
                  )}
                </div>
                <h3 className="font-sans text-primary text-lg md:text-xl font-semibold mb-3 leading-tight">
                  {item.label}
                </h3>
                <p className="font-sans text-primary-light text-sm md:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* PART 3: BOARD-LEVEL QUESTIONS (Two-Column Split) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 mb-24 bg-gradient-to-br from-primary to-primary-light rounded-2xl p-8 md:p-12"
        >
          {/* Left Column */}
          <div className="md:col-span-2">
            <h3 className="font-heading text-white text-2xl md:text-3xl font-normal mb-4">
              What Boards Are Asking
            </h3>
            <p className="font-sans text-gray-300 text-base md:text-lg leading-relaxed">
              C-suite priorities have shifted from "Should we use AI?" to "How do we govern it at scale?"
            </p>
          </div>

          {/* Right Column */}
          <div className="md:col-span-3 space-y-4">
            {[
              "Who owns AI governance across the enterprise?",
              "What's the ROI on our AI investments?",
              "Are we keeping pace with competitors?"
            ].map((question, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className="flex items-start gap-3 group cursor-pointer"
              >
                <svg className="w-6 h-6 text-accent flex-shrink-0 mt-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="font-sans text-white text-base md:text-lg group-hover:text-accent transition-colors">
                  {question}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* PART 4: THE AGENT ERA (Two-Column Split) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column */}
          <div>
            <p className="font-sans text-accent text-sm md:text-base uppercase tracking-widest mb-4">
              The AI Agent Era Has Arrived
            </p>
            <h3 className="font-heading text-primary text-3xl md:text-4xl font-normal mb-6">
              Chatbots Aren't Enough Anymore
            </h3>
            <p className="font-sans text-primary-light text-base md:text-lg leading-relaxed mb-8">
              The transition from reactive tools to autonomous agents requires new governance architecture.
            </p>

            {/* Timeline/Progression */}
            <div className="flex items-center gap-4">
              {["Chatbot", "Assistant", "Agent"].map((stage, index) => (
                <React.Fragment key={stage}>
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      index === 2 ? 'bg-accent text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      <span className="font-sans text-xs font-semibold">{index + 1}</span>
                    </div>
                    <span className="font-sans text-xs text-primary-light mt-2">{stage}</span>
                  </div>
                  {index < 2 && (
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-accent/10 to-transparent border border-accent/30 rounded-xl p-6 md:p-8">
              <div className="font-heading text-5xl md:text-6xl font-normal text-accent mb-2">
                <Counter end={82} />%
              </div>
              <p className="font-sans text-primary-light text-base md:text-lg">
                of executives plan to integrate AI agents by 2028
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/30 rounded-xl p-6 md:p-8">
              <div className="font-heading text-5xl md:text-6xl font-normal text-primary mb-2">
                $<Counter end={50} />B
              </div>
              <p className="font-sans text-primary-light text-base md:text-lg">
                projected AI agent market size by 2030
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
