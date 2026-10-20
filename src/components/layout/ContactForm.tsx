import React, { useEffect, useRef, useState } from 'react';
import Button from '../ui/Button';

// reCAPTCHA v2 checkbox; Netlify Forms verifies the token (data-netlify-recaptcha in index.html)
const RECAPTCHA_SCRIPT_SRC = 'https://www.google.com/recaptcha/api.js?render=explicit';
const RECAPTCHA_SITE_KEY: string = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

interface ReCaptcha {
  ready: (callback: () => void) => void;
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      'expired-callback': () => void;
    }
  ) => number;
  reset: (widgetId?: number) => void;
}

declare global {
  interface Window {
    grecaptcha?: ReCaptcha;
  }
}

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    consent: false,
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaError, setRecaptchaError] = useState(false);
  const recaptchaContainer = useRef<HTMLDivElement>(null);
  const recaptchaWidgetId = useRef<number | null>(null);
  const botField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) {
      console.error('VITE_RECAPTCHA_SITE_KEY is not set; the contact form cannot be submitted');
      return;
    }

    const renderWidget = () => {
      if (recaptchaWidgetId.current !== null || !recaptchaContainer.current || !window.grecaptcha) return;
      recaptchaWidgetId.current = window.grecaptcha.render(recaptchaContainer.current, {
        sitekey: RECAPTCHA_SITE_KEY,
        callback: (token) => {
          setRecaptchaToken(token);
          setRecaptchaError(false);
        },
        'expired-callback': () => setRecaptchaToken(null),
      });
    };
    const onScriptLoad = () => window.grecaptcha?.ready(renderWidget);

    if (window.grecaptcha) {
      onScriptLoad();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${RECAPTCHA_SCRIPT_SRC}"]`
    );
    const script = existingScript ?? document.createElement('script');
    script.addEventListener('load', onScriptLoad);
    if (!existingScript) {
      script.src = RECAPTCHA_SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    return () => script.removeEventListener('load', onScriptLoad);
  }, []);

  const resetRecaptcha = () => {
    if (recaptchaWidgetId.current !== null) {
      window.grecaptcha?.reset(recaptchaWidgetId.current);
    }
    setRecaptchaToken(null);
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.consent) {
      newErrors.message = 'You must accept the privacy policy';
    }
    
    setErrors(newErrors);
    setRecaptchaError(!recaptchaToken);
    return Object.keys(newErrors).length === 0 && !!recaptchaToken;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    const formName = 'contact';
    const encodedForm = new URLSearchParams({
      'form-name': formName,
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      consent: formData.consent ? 'yes' : 'no',
      'bot-field': botField.current?.value ?? '',
      'g-recaptcha-response': recaptchaToken ?? '',
    });

    try {
      // Submit to Netlify Forms
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodedForm.toString(),
      });

      if (!response.ok) throw new Error(`Form submission failed: ${response.status}`);

      setSubmitStatus('success');
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        message: '',
        consent: false,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      // Tokens are single-use, so every attempt needs a fresh check
      resetRecaptcha();
      setIsSubmitting(false);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, consent: e.target.checked }));
    if (errors.consent) {
      setErrors(prev => ({ ...prev, consent: undefined }));
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      name="contact" 
      method="POST" 
      data-netlify="true" 
      netlify-honeypot="bot-field"
      data-netlify-recaptcha="true"
      className="space-y-6"
      netlify
    >
      {/* Netlify hidden fields */}
      <input type="hidden" name="form-name" value="contact" />

      {/* Honeypot: off-screen for people; Netlify drops submissions that fill it in */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" name="bot-field" ref={botField} tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {submitStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 text-green-800">
          Thank you for your message. We'll be in touch soon!
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-800">
          Sorry, there was an error sending your message. Please try again later.
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name *
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className={`mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-accent focus:border-accent px-4 py-2.5 text-base ${
            errors.name ? 'border-red-500' : ''
          }`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
          Company
        </label>
        <input
          type="text"
          name="company"
          id="company"
          value={formData.company}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-accent focus:border-accent px-4 py-2.5 text-base"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email *
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className={`mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-accent focus:border-accent px-4 py-2.5 text-base ${
            errors.email ? 'border-red-500' : ''
          }`}
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-accent focus:border-accent px-4 py-2.5 text-base"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-accent focus:border-accent px-4 py-2.5 text-base"
        />
      </div>

      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={formData.consent}
            onChange={handleConsentChange}
            className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="consent" className="font-medium text-gray-700">
            Privacy Policy Consent *
          </label>
          <p className="text-gray-500">
            I agree to the{' '}
            <a href="/privacy-policy" className="text-accent hover:text-accent-dark underline">
              privacy policy
            </a>{' '}
            and consent to having my personal data processed.
          </p>
          {errors.consent && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
        </div>
      </div>

      <div>
        <div ref={recaptchaContainer} />
        {recaptchaError && (
          <p className="mt-1 text-sm text-red-600">Please confirm you're not a robot</p>
        )}
      </div>

      <div>
        <Button 
          type="submit" 
          size="lg" 
          isFullWidth={true}
          isLoading={isSubmitting}
        >
          Send Message
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;