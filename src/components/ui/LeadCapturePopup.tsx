import React, { useState, useEffect } from 'react';
import { X, Mail, ArrowRight, Sparkles, Users, Shield } from 'lucide-react';
import Button from './Button';

interface LeadCapturePopupProps {
  triggerDelay?: number; // seconds before showing
  scrollTrigger?: number; // scroll percentage to trigger
  showOnExit?: boolean; // show when user tries to leave
  title?: string;
  description?: string;
  ctaText?: string;
  onTrack?: (action: string, data?: any) => void;
  onFormSubmit?: (formData: any) => void;
}

const LeadCapturePopup: React.FC<LeadCapturePopupProps> = ({
  triggerDelay = 10, // 10 seconds default
  scrollTrigger = 50, // 50% scroll default
  showOnExit = true,
  title = "Ready to Transform Your AI Strategy?",
  description = "Get exclusive insights and a personalized consultation to secure your AI future.",
  ctaText = "Get Started",
  onTrack,
  onFormSubmit
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('lead-capture-popup-seen');
    if (hasSeenPopup) return;

    let timeoutId: NodeJS.Timeout;
    let scrollHandler: () => void;
    let beforeUnloadHandler: (e: BeforeUnloadEvent) => void;

    // Time-based trigger
    if (triggerDelay > 0) {
      timeoutId = setTimeout(() => {
        showPopup();
      }, triggerDelay * 1000);
    }

    // Scroll-based trigger
    if (scrollTrigger > 0) {
      scrollHandler = () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent >= scrollTrigger) {
          showPopup();
        }
      };
      window.addEventListener('scroll', scrollHandler);
    }

    // Exit-intent trigger
    if (showOnExit) {
      beforeUnloadHandler = (e: BeforeUnloadEvent) => {
        if (!isVisible) {
          showPopup();
          e.preventDefault();
          e.returnValue = '';
        }
      };
      window.addEventListener('beforeunload', beforeUnloadHandler);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (scrollHandler) window.removeEventListener('scroll', scrollHandler);
      if (beforeUnloadHandler) window.removeEventListener('beforeunload', beforeUnloadHandler);
    };
  }, [triggerDelay, scrollTrigger, showOnExit, isVisible]);

  const showPopup = () => {
    if (isVisible) return;
    
    setIsAnimating(true);
    setIsVisible(true);
    onTrack?.('lead_capture_popup_shown');
    
    // Mark as seen after a delay to allow for interaction
    setTimeout(() => {
      localStorage.setItem('lead-capture-popup-seen', 'true');
    }, 30000); // 30 seconds
  };

  const hidePopup = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
    onTrack?.('lead_capture_popup_closed');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.consent) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Submit to Netlify Forms
      const encodedForm = new URLSearchParams({
        'form-name': 'lead-capture',
        name: formData.name,
        company: formData.company,
        email: formData.email,
        consent: formData.consent ? 'yes' : 'no',
        source: 'lead-capture-popup'
      });

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodedForm.toString(),
      });

      onFormSubmit?.(formData);
      onTrack?.('lead_capture_form_submitted', { email: formData.email });
      setSubmitStatus('success');
      
      // Auto-close after success
      setTimeout(() => {
        hidePopup();
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      onTrack?.('lead_capture_form_error', { error: error.message });
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isAnimating ? 'bg-opacity-30' : 'bg-opacity-0'
        }`}
        onClick={hidePopup}
      />
      
      {/* Popup */}
      <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
        isAnimating 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-full opacity-0'
      }`}>
        <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-80 border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{title}</h3>
                </div>
              </div>
              <button
                onClick={hidePopup}
                className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-1 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-gray-600 text-sm mb-4">{description}</p>
            
            {submitStatus === 'success' ? (
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Thank You!</h4>
                <p className="text-gray-600 text-sm">We'll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3">
                <div>
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Your email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Company (optional)"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="popup-consent"
                    checked={formData.consent}
                    onChange={(e) => setFormData(prev => ({ ...prev, consent: e.target.checked }))}
                    className="mt-0.5 h-3 w-3 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="popup-consent" className="text-xs text-gray-500">
                    I agree to the{' '}
                    <a href="/privacy-policy" className="text-primary hover:text-primary-dark underline">
                      privacy policy
                    </a>
                  </label>
                </div>

                <Button
                  type="submit"
                  size="sm"
                  isFullWidth
                  isLoading={isSubmitting}
                  disabled={!formData.name || !formData.email || !formData.consent}
                  className="mt-3"
                >
                  <Users className="w-3 h-3 mr-1" />
                  {ctaText}
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </form>
            )}

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Shield className="w-3 h-3" />
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Users className="w-3 h-3" />
                <span>Trusted by 500+ companies</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadCapturePopup;
