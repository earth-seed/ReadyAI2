import React from 'react';
import { ArrowRight, TrendingUp, Target } from 'lucide-react';
import { IndustryContent } from '../data/industryContent';
import CalendlyBtn from './sections/CalendlyBtn';

interface IndustryTemplateProps {
  content: IndustryContent;
}

const IndustryTemplate: React.FC<IndustryTemplateProps> = ({ content }) => {
  const TrustIcon = content.trustSection.icon;
  const TransformationIcon = content.transformationSection.icon;

  return (
    <div className="space-y-12">
      {/* Trust Section */}
      <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-2xl p-8 md:p-12 border border-gray-100">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-dark rounded-xl flex items-center justify-center">
            <TrustIcon className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-heading text-3xl md:text-4xl font-normal text-primary">{content.trustSection.title}</h3>
        </div>
        <div className="space-y-4">
          <p className="font-sans text-base text-primary-light leading-relaxed" dangerouslySetInnerHTML={{ __html: content.trustSection.content }}>
          </p>
          {content.trustSection.additionalContent && (
            <p className="font-sans text-base text-primary-light leading-relaxed" dangerouslySetInnerHTML={{ __html: content.trustSection.additionalContent }}>
            </p>
          )}
        </div>
      </div>

      {/* Transformation Section */}
      <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-2xl p-8 md:p-12 border border-gray-100">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center">
            <TransformationIcon className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-heading text-3xl md:text-4xl font-normal text-primary">{content.transformationSection.title}</h3>
        </div>
        <div className="space-y-4">
          <p className="font-sans text-base text-primary-light leading-relaxed" dangerouslySetInnerHTML={{ __html: content.transformationSection.content }}>
          </p>
          {content.transformationSection.additionalContent && (
            <p className="font-sans text-base text-primary-light leading-relaxed" dangerouslySetInnerHTML={{ __html: content.transformationSection.additionalContent }}>
            </p>
          )}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-2xl p-8 md:p-12 border border-gray-100">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-dark rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-heading text-3xl md:text-4xl font-normal text-primary">{content.benefitsSection.title}</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.benefitsSection.benefits.map((benefit, index) => {
            const BenefitIcon = benefit.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 hover:border-accent/30 hover:shadow-md transition-all duration-300">
                {BenefitIcon && (
                  <div className="w-12 h-12 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg flex items-center justify-center mb-4">
                    <BenefitIcon className="w-6 h-6 text-accent" />
                  </div>
                )}
                <h4 className="font-sans text-lg font-semibold text-primary mb-2">{benefit.title}</h4>
                <p className="font-sans text-base text-primary-light leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Governance Section */}
      <div className="bg-gradient-to-br from-primary via-primary-light to-primary-dark rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl"></div>
        <div className="relative">
          <h3 className="font-heading text-3xl md:text-4xl font-normal text-white mb-6">{content.governanceSection.title}</h3>
          <p className="font-sans text-base md:text-lg text-white/90 leading-relaxed max-w-4xl mx-auto mb-8">
            {content.governanceSection.content}
          </p>
          <CalendlyBtn
            url={content.governanceSection.buttonLink}
            text={content.governanceSection.buttonText}
            className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-xl font-sans font-semibold hover:bg-accent-dark hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          />
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="bg-gradient-to-br from-accent2-lightest to-white rounded-2xl p-8 md:p-12 border border-gray-100">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center">
            {content.useCasesSection.icon ? <content.useCasesSection.icon className="w-6 h-6 text-white" /> : <Target className="w-6 h-6 text-white" />}
          </div>
          <h3 className="font-heading text-3xl md:text-4xl font-normal text-primary">{content.useCasesSection.title}</h3>
        </div>
        <div className="space-y-6">
          {content.useCasesSection.useCases.map((useCase, index) => (
            <div key={index} className="p-6 bg-white rounded-xl border border-gray-100 hover:border-accent/30 hover:shadow-md transition-all duration-300">
              <h4 className="font-sans text-lg font-semibold text-primary mb-2">{useCase.title}</h4>
              <p className="font-sans text-base text-primary-light leading-relaxed">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndustryTemplate;
