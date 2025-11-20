import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Users, Zap, DollarSign, ArrowRight, Target, Shield } from "lucide-react";
import SlideAnimator from '../../utils/SlideAnimator';

const Counter = ({ end, duration = 2, prefix = '', suffix = '' }: { end: number; duration?: number; prefix?: string; suffix?: string }) => {
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

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

export default function Banner6Section() {
  return (
    <SlideAnimator direction="up">
      <section className="relative bg-white py-20 md:py-32 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          
          {/* PART 1: THE ENTERPRISE AI SHIFT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-primary text-4xl sm:text-5xl md:text-6xl font-normal mb-6">
              The Enterprise AI Shift
            </h2>
            <p className="font-sans text-gray-700 text-lg md:text-xl leading-relaxed max-w-5xl mx-auto">
              Enterprises are realizing that AI isn't just another toolset — it's becoming an architectural layer of its own.
            </p>
          </motion.div>

          {/* PART 2: THE SHIFT - Timeline Style */}
          <div className="max-w-4xl mx-auto mb-20 relative">
            {/* Timeline Line */}
            <div className="absolute left-3 md:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 via-accent to-accent"></div>
            
            <div className="space-y-12">
              {/* Step 1: The Reality */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative pl-12 md:pl-16"
              >
                {/* Timeline Dot */}
                <div className="absolute left-2 md:left-4.5 top-8 w-3 h-3 rounded-full bg-gray-400 border-2 border-white shadow-lg z-10"></div>
                
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-8 md:p-10 shadow-lg">
                  <p className="font-sans text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                    Across every enterprise, AI is already happening — HR are automating onboarding, engineers are testing copilots, and operations are launching predictive workflows. AI has entered a new era — faster, broader, and more business-critical than ever.
                  </p>
                  <p className="font-sans text-gray-900 text-base md:text-lg leading-relaxed font-semibold">
                    What began as isolated experiments has evolved into a full-scale enterprise transformation.
                  </p>
                </div>
              </motion.div>

              {/* Step 2: The Challenge */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative pl-12 md:pl-16"
              >
                {/* Timeline Dot */}
                <div className="absolute left-2 md:left-4.5 top-8 w-3 h-3 rounded-full bg-primary border-2 border-white shadow-lg z-10"></div>
                
                <div className="bg-gradient-to-br from-primary via-primary-light to-primary-dark rounded-2xl p-8 md:p-10 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <p className="font-sans text-gray-200 text-base md:text-lg leading-relaxed mb-6">
                      Every department now relies on intelligence, yet few have real visibility or control. Even the world's most advanced companies are struggling to govern their AI ecosystems. Enterprises are moving from experimentation to orchestration — from scattered AI tools to governed ecosystems.
                    </p>
                    <p className="font-sans text-white text-base md:text-lg leading-relaxed font-semibold">
                      The challenge has changed — and the strategy must too.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Step 3: The Solution */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative pl-12 md:pl-16"
              >
                {/* Timeline Dot */}
                <div className="absolute left-2 md:left-4.5 top-8 w-3 h-3 rounded-full bg-accent border-2 border-white shadow-lg z-10"></div>
                
                <div className="bg-gradient-to-br from-accent2-lightest via-accent2-light/30 to-white rounded-2xl border-2 border-accent/20 p-8 md:p-10 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <p className="font-sans text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                      Boards are no longer asking <span className="font-semibold">if</span> AI should be used — they're asking <span className="italic font-semibold">how to govern it, at scale.</span>
                    </p>
                    <p className="font-sans text-gray-800 text-base md:text-lg leading-relaxed font-semibold">
                      ReadyAI.dev provides the secure foundation for that shift — <span className="text-accent">one platform to unify every model, every team, and every process</span> with complete oversight, compliance, and control.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </SlideAnimator>
  );
}
