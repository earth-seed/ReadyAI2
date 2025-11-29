import React, { useState } from 'react';
import Button from '../ui/Button';

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
    return Object.keys(newErrors).length === 0;
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
    });

    try {
      // 1. Submit to Netlify Forms
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodedForm.toString(),
      });

      // 2. Submit to your serverless function
      // const response = await fetch('/.netlify/functions/send-email', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     to: 'sales@readyai.dev',
      //     subject: 'New Contact Form Submission',
      //     formData,
      //   }),
      // });

      //if (!response.ok) throw new Error(response.statusText);

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
      className="space-y-6"
      netlify
    >
      {/* Netlify hidden fields */}
      <input type="hidden" name="form-name" value="contact" />
      <input type="hidden" name="bot-field" />

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