import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute inset-0" style={{ opacity: 0.03 }}>
        <div className="absolute top-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Text content */}
            <div className="max-w-2xl pt-8 md:pt-12">
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-primary leading-[1.1] mb-6 animate-fade-in-up">
                <span className="block">One Secure Platform.</span>
                <span className="block">Every AI Model.</span>
                <span className="block whitespace-nowrap">Real Enterprise Control.</span>
              </h1>
              
              <div className="space-y-4 mb-8 animate-fade-in-up-delay">
                <p className="font-sans text-lg sm:text-xl text-gray-700 leading-relaxed">
                  Even the most advanced enterprises are struggling to control internal AI use.
                </p>
                <p className="font-sans text-lg sm:text-xl text-gray-700 leading-relaxed">
                  ReadyAI.dev gives enterprises one secure workspace to govern every LLM — safely, compliantly, and under a single governance layer.
                </p>
              </div>
              
              <div className="mb-10 animate-fade-in-up-delay">
                <p className="font-sans text-lg sm:text-xl text-accent font-semibold">
                  Choice is power, but control is confidence.
                </p>
              </div>
              
              <div className="mb-10 animate-fade-in-up-delay-2"> 
                <a
                  href="https://devs.ai/signup?ref=sales%40readyai.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-3.5 rounded-lg shadow-md hover:bg-accent-dark hover:shadow-lg transition-all duration-200 text-base font-semibold"
                >
                  Explore the ReadyAI.dev Platform
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 animate-fade-in-up-delay-3">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">SOC 2 Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Enterprise-Grade Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">99.9% Uptime SLA</span>
                </div>
              </div>
            </div>

            {/* Right side - Stacked layers animation */}
            <div className="hidden lg:flex justify-center items-start pt-8">
              <div className="relative w-[500px] h-[600px] flex items-start justify-center pt-20" style={{ perspective: '2000px', perspectiveOrigin: '50% 50%' }}>
                {/* Layer 1 - Bottom */}
                <div 
                  className="absolute w-96 h-64 shadow-2xl"
                  style={{
                    animation: 'stackLayer1 1s ease-out forwards, pulse 3s ease-in-out 1s infinite',
                    opacity: 0,
                    clipPath: 'polygon(50% 0%, 100% 25%, 50% 50%, 0% 25%)',
                    background: 'linear-gradient(135deg, #1F2937 0%, #374151 50%, #1F2937 100%)',
                    boxShadow: '0 30px 80px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.15), inset 0 -2px 10px rgba(0,0,0,0.3), 0 0 40px rgba(31,41,55,0.4)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transformStyle: 'preserve-3d'
                  }}
                />
                
                {/* Layer 2 */}
                <div 
                  className="absolute w-96 h-64 shadow-2xl"
                  style={{
                    animation: 'stackLayer2 1s ease-out 0.15s forwards, pulse 3s ease-in-out 1.15s infinite',
                    opacity: 0,
                    clipPath: 'polygon(50% 0%, 100% 25%, 50% 50%, 0% 25%)',
                    background: 'linear-gradient(135deg, #594d35 0%, #f7e8c8 50%, #594d35 100%)',
                    boxShadow: '0 30px 80px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.25), inset 0 -2px 10px rgba(0,0,0,0.2), 0 0 40px rgba(212,179,106,0.3)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    transformStyle: 'preserve-3d'
                  }}
                />
                
                {/* Layer 3 */}
                <div 
                  className="absolute w-96 h-64 shadow-2xl"
                  style={{
                    animation: 'stackLayer3 1s ease-out 0.3s forwards, pulse 3s ease-in-out 1.3s infinite',
                    opacity: 0,
                    clipPath: 'polygon(50% 0%, 100% 25%, 50% 50%, 0% 25%)',
                    background: 'linear-gradient(135deg, #a6863f 0%, #D4B36A 50%, #a6863f 100%)',
                    boxShadow: '0 30px 80px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.35), inset 0 -2px 10px rgba(0,0,0,0.2), 0 0 45px rgba(212,179,106,0.5)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    transformStyle: 'preserve-3d'
                  }}
                />
                
                {/* Layer 4 */}
                <div 
                  className="absolute w-96 h-64 shadow-2xl"
                  style={{
                    animation: 'stackLayer4 1s ease-out 0.45s forwards, pulse 3s ease-in-out 1.45s infinite',
                    opacity: 0,
                    clipPath: 'polygon(50% 0%, 100% 25%, 50% 50%, 0% 25%)',
                    background: 'linear-gradient(135deg, #E2C788 0%, #f7e8c8 50%, #E2C788 100%)',
                    boxShadow: '0 30px 80px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.4), inset 0 -2px 10px rgba(0,0,0,0.15), 0 0 45px rgba(226,199,136,0.4)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    transformStyle: 'preserve-3d'
                  }}
                />
                
                {/* Layer 5 */}
                <div 
                  className="absolute w-96 h-64 shadow-2xl"
                  style={{
                    animation: 'stackLayer5 1s ease-out 0.6s forwards, pulse 3s ease-in-out 1.6s infinite',
                    opacity: 0,
                    clipPath: 'polygon(50% 0%, 100% 25%, 50% 50%, 0% 25%)',
                    background: 'linear-gradient(135deg, #374151 0%, #594d35 50%, #374151 100%)',
                    boxShadow: '0 30px 80px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.2), inset 0 -2px 10px rgba(0,0,0,0.3), 0 0 40px rgba(55,65,81,0.4)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    transformStyle: 'preserve-3d'
                  }}
                />
                
                {/* Layer 6 - Top */}
                <div 
                  className="absolute w-96 h-64 shadow-2xl"
                  style={{
                    animation: 'stackLayer6 1s ease-out 0.75s forwards, pulse 3s ease-in-out 1.75s infinite',
                    opacity: 0,
                    clipPath: 'polygon(50% 0%, 100% 25%, 50% 50%, 0% 25%)',
                    background: 'linear-gradient(135deg, #D4B36A 0%, #E2C788 50%, #D4B36A 100%)',
                    boxShadow: '0 35px 90px rgba(0,0,0,0.6), inset 0 3px 0 rgba(255,255,255,0.5), inset 0 -2px 10px rgba(0,0,0,0.2), 0 0 50px rgba(212,179,106,0.6)',
                    border: '1px solid rgba(255,255,255,0.35)',
                    transformStyle: 'preserve-3d'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes stackLayer1 {
          0% {
            transform: translateY(350px) translateZ(-200px) scale(0.5) rotateX(25deg) rotateY(-5deg);
            opacity: 0;
          }
          100% {
            transform: translateY(250px) translateZ(-50px) scale(1) rotateX(8deg) rotateY(-3deg);
            opacity: 0.9;
          }
        }

        @keyframes stackLayer2 {
          0% {
            transform: translateY(330px) translateZ(-180px) scale(0.5) rotateX(25deg) rotateY(-5deg);
            opacity: 0;
          }
          100% {
            transform: translateY(200px) translateZ(-40px) scale(1) rotateX(8deg) rotateY(-3deg);
            opacity: 0.92;
          }
        }

        @keyframes stackLayer3 {
          0% {
            transform: translateY(310px) translateZ(-160px) scale(0.5) rotateX(25deg) rotateY(-5deg);
            opacity: 0;
          }
          100% {
            transform: translateY(150px) translateZ(-30px) scale(1) rotateX(8deg) rotateY(-3deg);
            opacity: 0.94;
          }
        }

        @keyframes stackLayer4 {
          0% {
            transform: translateY(290px) translateZ(-140px) scale(0.5) rotateX(25deg) rotateY(-5deg);
            opacity: 0;
          }
          100% {
            transform: translateY(100px) translateZ(-20px) scale(1) rotateX(8deg) rotateY(-3deg);
            opacity: 0.96;
          }
        }

        @keyframes stackLayer5 {
          0% {
            transform: translateY(270px) translateZ(-120px) scale(0.5) rotateX(25deg) rotateY(-5deg);
            opacity: 0;
          }
          100% {
            transform: translateY(50px) translateZ(-10px) scale(1) rotateX(8deg) rotateY(-3deg);
            opacity: 0.98;
          }
        }

        @keyframes stackLayer6 {
          0% {
            transform: translateY(250px) translateZ(-100px) scale(0.5) rotateX(25deg) rotateY(-5deg);
            opacity: 0;
          }
          100% {
            transform: translateY(0px) translateZ(0px) scale(1) rotateX(8deg) rotateY(-3deg);
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% {
            filter: brightness(1) drop-shadow(0 25px 70px rgba(0,0,0,0.5));
          }
          50% {
            filter: brightness(1.08) drop-shadow(0 30px 80px rgba(0,0,0,0.55));
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in-up-delay {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 0.2s forwards;
        }

        .animate-fade-in-up-delay-2 {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 0.4s forwards;
        }

        .animate-fade-in-up-delay-3 {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 0.6s forwards;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;