import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Users, Zap, DollarSign } from "lucide-react";
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

export default function EnterpriseAINumbersSection() {
  return (
    <SlideAnimator direction="up">
      <section className="relative bg-white py-20 md:py-32 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-primary text-4xl sm:text-5xl md:text-6xl font-normal mb-6">
              Enterprise AI in Numbers
            </h2>
          </motion.div>

          {/* Stats Grid - Bigger Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {[
              {
                stat: "2+",
                label: "new AI models launch every week",
                description: "Staying current is no longer optional.",
                icon: TrendingUp,
                delay: 0.1
              },
              {
                stat: "75%",
                statNumber: 75,
                suffix: "%",
                label: "of employees already use AI tools at work",
                description: "Governance must now match adoption.",
                icon: Users,
                delay: 0.2
              },
              {
                stat: "82%",
                statNumber: 82,
                suffix: "%",
                label: "of executives plan to integrate AI agents by 2028",
                description: "The agent era has begun.",
                icon: Zap,
                delay: 0.3
              },
              {
                stat: "$50B+",
                prefix: "$",
                statNumber: 50,
                suffix: "B+",
                label: "AI agent market projected by 2030",
                description: "The opportunity is massive — if it's managed well.",
                icon: DollarSign,
                delay: 0.4
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: item.delay, duration: 0.5, ease: "easeOut" }}
                className="group relative bg-accent2-lightest rounded-3xl border-2 border-accent/20 p-10 md:p-12 hover:shadow-2xl hover:border-accent/40 hover:-translate-y-2 hover:bg-accent2-light transition-all duration-300"
              >
                <div className="absolute top-8 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <item.icon className="w-20 h-20 text-accent" strokeWidth={1} />
                </div>
                <div className="relative">
                  <div className="font-heading text-6xl md:text-7xl font-normal text-accent mb-6">
                    {item.statNumber ? (
                      <Counter 
                        end={item.statNumber} 
                        prefix={item.prefix || ''} 
                        suffix={item.suffix || ''} 
                      />
                    ) : (
                      item.stat
                    )}
                  </div>
                  <h4 className="font-sans text-primary text-xl md:text-2xl font-semibold mb-4 leading-tight">
                    {item.label}
                  </h4>
                  <p className="font-sans text-gray-700 text-base md:text-lg leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </SlideAnimator>
  );
}

