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
      <section className="relative bg-accent2-lightest py-16 sm:py-20 md:py-32 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          
          {/* PART 1: THE ENTERPRISE AI SHIFT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            {/* Gold Label */}
            <p className="font-sans text-accent text-sm md:text-base uppercase tracking-widest mb-6">
              The New AI Reality
            </p>
            
            <h2 className="font-heading text-primary text-3xl md:text-4xl lg:text-5xl font-normal mb-6">
              The Enterprise AI Shift
            </h2>
            <p className="font-sans text-gray-700 text-base leading-relaxed max-w-5xl mx-auto">
              Enterprises are realizing that AI isn't just another toolset — it's becoming an architectural layer of its own.
            </p>
          </motion.div>

          {/* PART 2: THE SHIFT - Timeline Style */}
          <div className="max-w-4xl mx-auto relative">
            {/* Timeline Line */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 via-accent to-accent"></div>
            
            <div className="space-y-8">
              {/* Step 1: The Reality */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative pl-8 md:pl-12"
              >
                <div className="bg-white rounded-xl border-2 border-gray-200 p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <p className="font-sans text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                    Across every enterprise, AI is already happening — HR are automating onboarding, engineers are testing copilots, and operations are launching predictive workflows. <span className="text-gray-900 font-semibold">AI has entered a new era</span> — faster, broader, and more business-critical than ever.
                  </p>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="font-sans text-gray-900 text-lg md:text-xl leading-relaxed font-semibold">
                      What began as isolated experiments has evolved into a full-scale enterprise transformation.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Step 2: The Challenge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                className="relative pl-8 md:pl-12"
              >
                <div className="bg-gradient-to-br from-primary via-primary-light to-primary-dark rounded-xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <p className="font-sans text-white/90 text-base md:text-lg leading-relaxed mb-6">
                      Every department now relies on intelligence, yet few have real visibility or control. <span className="text-white font-semibold">Even the world's most advanced companies are struggling to govern their AI ecosystems.</span> Enterprises are moving from experimentation to orchestration — from scattered AI tools to governed ecosystems.
                    </p>
                    <div className="pt-4 border-t border-white/20">
                      <p className="font-sans text-white text-lg md:text-xl leading-relaxed font-semibold">
                        The challenge has changed — and the strategy must too.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Step 3: The Solution */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                className="relative pl-8 md:pl-12"
              >
                <div className="bg-white rounded-xl border-2 border-gray-200 p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <p className="font-sans text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                      Boards are no longer asking <span className="font-semibold text-gray-900">if</span> AI should be used — they're asking <span className="text-gray-900 font-semibold italic">how to govern it, at scale.</span>
                    </p>
                    <div className="pt-4 border-t border-gray-200">
                      <p className="font-sans text-gray-900 text-lg md:text-xl leading-relaxed font-semibold">
                        ReadyAI.dev provides the secure foundation for that shift — <span className="text-accent">one platform to unify every model, every team, and every process</span> with complete oversight, compliance, and control.
                      </p>
                    </div>
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
