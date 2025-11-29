import React, { useState, useEffect } from 'react';
import { X, Download, Lock, CheckCircle, ArrowRight } from 'lucide-react';
import Button from './Button';
import ContactForm from '../layout/ContactForm';

interface GatedContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  contentTitle: string;
  contentDescription: string;
  downloadUrl?: string;
  onFormSubmit?: (formData: any) => void;
  onTrack?: (action: string, data?: any) => void;
}

const GatedContentModal: React.FC<GatedContentModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  contentTitle,
  contentDescription,
  downloadUrl,
  onFormSubmit,
  onTrack
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    consent: false
  });

  useEffect(() => {
    if (isOpen) {
      onTrack?.('gated_content_opened', { title });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onTrack, title]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.consent) {
      return;
    }

    try {
      // Submit to eWay-CRM via Netlify Function
      const response = await fetch('/.netlify/functions/eway-crm-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          content: title,
          consent: formData.consent,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit lead');
      }

      console.log('✅ Lead submitted to eWay-CRM successfully:', result);
      
      onFormSubmit?.(formData);
      onTrack?.('gated_content_form_submitted', { title, email: formData.email });
      setStep('success');
    } catch (error: any) {
      console.error('❌ Error submitting form:', error);
      onTrack?.('gated_content_form_error', { title, error: error.message });
      alert('Failed to submit form. Please try again.');
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
      onTrack?.('gated_content_downloaded', { title });
    }
  };

  const handleClose = () => {
    onTrack?.('gated_content_closed', { title });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-end md:items-center justify-center p-0 md:p-4">
        <div className="relative bg-white rounded-t-2xl md:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[95vh] md:max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-5 md:p-6">
            <div className="flex items-start md:items-center justify-between gap-3">
              <div className="flex items-start md:items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg md:text-xl font-semibold leading-tight mb-1">{title}</h2>
                  <p className="text-white/90 text-xs md:text-sm leading-snug">{description}</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 md:p-6 overflow-y-auto max-h-[calc(95vh-120px)] md:max-h-[calc(90vh-120px)]">
            {step === 'form' ? (
              <div>
                <div className="text-center mb-6">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">{contentTitle}</h3>
                  <p className="text-sm md:text-base text-gray-600">{contentDescription}</p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-3 md:space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 md:py-2 text-base focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 md:py-2 text-base focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 md:py-2 text-base focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 md:py-2 text-base focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={formData.consent}
                      onChange={(e) => setFormData(prev => ({ ...prev, consent: e.target.checked }))}
                      className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="consent" className="text-sm text-gray-600">
                      I agree to the{' '}
                      <a href="/privacy-policy" className="text-primary hover:text-primary-dark underline">
                        privacy policy
                      </a>{' '}
                      and consent to having my personal data processed. *
                    </label>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    isFullWidth
                    className="mt-6"
                    disabled={!formData.name || !formData.email || !formData.consent}
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Access Content
                  </Button>
                </form>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Access Granted!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for providing your information. You can now access the content.
                </p>
                
                {downloadUrl && (
                  <Button
                    onClick={handleDownload}
                    size="lg"
                    className="mb-4"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Now
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  onClick={handleClose}
                  size="lg"
                >
                  Close
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GatedContentModal;
