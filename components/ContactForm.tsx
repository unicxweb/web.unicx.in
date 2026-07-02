"use client";

import { FormEvent, useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { submitContactForm } from "@/lib/api-service";

const serviceOptions = [
  "Select a service...",
  "UI/UX Design",
  "Web Design",
  "Mobile App Design",
  "Brand Design",
  "Graphic Design",
  "Website Development",
  "E-commerce Development",
  "Web Application Development",
  "Mobile App Development",
  "Custom Software Development",
  "API Development",
  "Database Development",
  "Digital Marketing",
  "SEO Services",
  "Social Media Marketing",
  "Content Marketing",
  "Email Marketing",
  "PPC Advertising",
  "Brand Strategy",
  "Marketing Strategy",
  "Growth Hacking",
  "Conversion Optimization",
  "Analytics & Reporting",
  "Consulting Services",
  "Multiple Services",
  "Other",
];

const budgetOptions = [
  "Select budget range...",
  "Under $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000+",
  "Prefer not to say",
];

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

function LoadingSpinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        strokeWidth="2"
        stroke="currentColor"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

interface FormErrors {
  name?: string;
  email?: string;
  details?: string;
  phone?: string;
  service?: string;
  budget?: string;
  agreeToTerms?: string;
}

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: serviceOptions[1],
    budget: budgetOptions[1],
    timeline: "",
    details: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = 'auto';
      // Set height to scrollHeight, but with a minimum
      const newHeight = Math.max(textarea.scrollHeight, 120); // Minimum height of 120px
      textarea.style.height = `${newHeight}px`;
    }
  }, []);

  // Adjust height on mount and when form details change
  useEffect(() => {
    adjustTextareaHeight();
  }, [form.details, adjustTextareaHeight]);

  // Auto-hide success message after 5 seconds
  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
        setStatusMessage('');
      }, 5000); // 5 seconds

      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const validateField = (field: keyof typeof form, value: string | boolean): string | undefined => {
    switch (field) {
      case 'name':
        if (typeof value !== 'string' || !value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (value.trim().length > 100) return 'Name must be less than 100 characters';
        break;
      case 'email':
        if (typeof value !== 'string' || !value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        break;
      case 'phone':
        if (typeof value === 'string' && value && !/^[\d\s\-\+\(\)]+$/.test(value)) return 'Please enter a valid phone number';
        break;
      case 'service':
        if (!value || value === serviceOptions[0]) return 'Please select a service';
        break;
      case 'budget':
        if (!value || value === budgetOptions[0]) return 'Please select a budget range';
        break;
      case 'details':
        if (typeof value !== 'string' || !value.trim()) return 'Project details are required';
        if (value.trim().length < 10) return 'Please provide at least 10 characters';
        if (value.trim().length > 1000) return 'Project details must be less than 1000 characters';
        break;
      case 'agreeToTerms':
        if (!value) return 'You must agree to the terms and conditions';
        break;
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate all fields
    const nameError = validateField('name', form.name);
    if (nameError) newErrors.name = nameError;

    const emailError = validateField('email', form.email);
    if (emailError) newErrors.email = emailError;

    const phoneError = validateField('phone', form.phone);
    if (phoneError) newErrors.phone = phoneError;

    const serviceError = validateField('service', form.service);
    if (serviceError) newErrors.service = serviceError;

    const budgetError = validateField('budget', form.budget);
    if (budgetError) newErrors.budget = budgetError;

    const detailsError = validateField('details', form.details);
    if (detailsError) newErrors.details = detailsError;

    const agreeToTermsError = validateField('agreeToTerms', form.agreeToTerms);
    if (agreeToTermsError) newErrors.agreeToTerms = agreeToTermsError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitStatus('idle');
    setStatusMessage('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitContactForm({
        name: form.name,
        email: form.email,
        company: form.company,
        phone: form.phone,
        service: form.service,
        budget: form.budget,
        timeline: form.timeline,
        details: form.details,
      });

      if (result.success) {
        // Reset form on successful submission
        setForm({
          name: "",
          email: "",
          company: "",
          phone: "",
          service: serviceOptions[1],
          budget: budgetOptions[1],
          timeline: "",
          details: "",
          agreeToTerms: false,
        });
        setErrors({});
        setSubmitStatus('success');
        setStatusMessage('Thank you! Your inquiry has been submitted successfully. We\'ll get back to you within 24 hours.');
      } else {
        setSubmitStatus('error');
        setStatusMessage(result.message || 'Failed to submit contact form. Please try again.');
      }

    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage('An unexpected error occurred. Please try again or contact us directly at hello@unicx.in');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClassName =
    "w-full border-b border-white/10 bg-transparent px-0 py-3 text-[15px] text-white outline-none transition placeholder:text-slate-600 focus:border-white/30";

  const labelClassName =
    "text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500";

  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-slate-500">
        Contact form
      </div>
      <h2 className="mt-4 max-w-xl text-[clamp(1.9rem,3vw,2.7rem)] font-semibold leading-[1] tracking-[-0.02em] text-white">
        Share the essentials and we will shape the next step clearly.
      </h2>
      <p className="mt-4 max-w-xl text-[14px] leading-7 text-slate-400">
        Submit this form and our team will get back to you within 24 hours with
        the next steps for your project.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="space-y-3">
            <span className={labelClassName}>Name *</span>
            <input
              type="text"
              value={form.name}
              onChange={(event) => {
                const value = event.target.value;
                setForm((current) => ({ ...current, name: value }));
                
                // Real-time validation
                const error = validateField('name', value);
                setErrors((current) => ({ ...current, name: error }));
              }}
              className={`${fieldClassName} ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Your name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              maxLength={100}
            />
            {errors.name && (
              <p id="name-error" className="text-red-400 text-xs mt-1" role="alert">
                {errors.name}
              </p>
            )}
          </label>

          <label className="space-y-3">
            <span className={labelClassName}>Email *</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => {
                const value = event.target.value;
                setForm((current) => ({ ...current, email: value }));
                
                // Real-time validation
                const error = validateField('email', value);
                setErrors((current) => ({ ...current, email: error }));
              }}
              className={`${fieldClassName} ${errors.email ? 'border-red-500' : ''}`}
              placeholder="you@company.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-red-400 text-xs mt-1" role="alert">
                {errors.email}
              </p>
            )}
          </label>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="space-y-3">
            <span className={labelClassName}>Company</span>
            <input
              type="text"
              value={form.company}
              onChange={(event) =>
                setForm((current) => ({ ...current, company: event.target.value }))
              }
              className={fieldClassName}
              placeholder="Company or brand"
              maxLength={100}
            />
          </label>

          <label className="space-y-3">
            <span className={labelClassName}>Phone</span>
            <input
              type="tel"
              value={form.phone}
              onChange={(event) => {
                const value = event.target.value;
                setForm((current) => ({ ...current, phone: value }));
                
                // Real-time validation
                const error = validateField('phone', value);
                setErrors((current) => ({ ...current, phone: error }));
              }}
              className={`${fieldClassName} ${errors.phone ? 'border-red-500' : ''}`}
              placeholder="+1 (555) 123-4567"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && (
              <p id="phone-error" className="text-red-400 text-xs mt-1" role="alert">
                {errors.phone}
              </p>
            )}
          </label>
        </div>

        <div className="space-y-8">
          {/* Service and Budget Row */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Service Selection */}
            <div className="space-y-3">
              <label className={labelClassName}>What service do you need? *</label>
              <div className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className={`w-full border-b border-white/10 bg-transparent px-0 py-3 text-[15px] text-white outline-none transition placeholder:text-slate-600 focus:border-white/30 text-left flex items-center justify-between ${errors.service ? 'border-red-500' : ''}`}
                      aria-expanded="false"
                      aria-haspopup="listbox"
                      id="service-dropdown"
                    >
                      <span>{form.service}</span>
                      <svg className="h-4 w-4 opacity-50 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full" align="start">
                    {serviceOptions.map((option) => (
                      <DropdownMenuItem
                        key={option}
                        onSelect={() => {
                          setForm((current) => ({ ...current, service: option }));
                          // Clear service error if any
                          if (errors.service) {
                            setErrors((current) => ({ ...current, service: undefined }));
                          }
                        }}
                        className={form.service === option ? "bg-white/10 text-white" : "text-slate-300 hover:text-white"}
                      >
                        {option}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {errors.service && (
                  <p className="text-red-400 text-xs mt-1" role="alert">
                    {errors.service}
                  </p>
                )}
              </div>
            </div>

            {/* Budget Range */}
            <div className="space-y-3">
              <label className={labelClassName}>What's your budget range? *</label>
              <div className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className={`w-full border-b border-white/10 bg-transparent px-0 py-3 text-[15px] text-white outline-none transition placeholder:text-slate-600 focus:border-white/30 text-left flex items-center justify-between ${errors.budget ? 'border-red-500' : ''}`}
                      aria-expanded="false"
                      aria-haspopup="listbox"
                      id="budget-dropdown"
                    >
                      <span>{form.budget}</span>
                      <svg className="h-4 w-4 opacity-50 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full" align="start">
                    {budgetOptions.map((option) => (
                      <DropdownMenuItem
                        key={option}
                        onSelect={() => {
                          setForm((current) => ({ ...current, budget: option }));
                          // Clear budget error if any
                          if (errors.budget) {
                            setErrors((current) => ({ ...current, budget: undefined }));
                          }
                        }}
                        className={form.budget === option ? "bg-white/10 text-white" : "text-slate-300 hover:text-white"}
                      >
                        {option}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {errors.budget && (
                  <p className="text-red-400 text-xs mt-1" role="alert">
                    {errors.budget}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            <div className={labelClassName}>When do you need this?</div>
            <input
              type="text"
              value={form.timeline}
              onChange={(event) =>
                setForm((current) => ({ ...current, timeline: event.target.value }))
              }
              className={fieldClassName}
              placeholder="e.g., Next month, Q3 2024, ASAP"
              maxLength={200}
            />
            <p className="text-xs text-slate-500">
              Be as specific as possible about deadlines or launch dates
            </p>
          </div>

          {/* Project Details */}
          <div className="space-y-3">
            <label className={labelClassName}>Tell us about your project *</label>
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={form.details}
                onChange={(event) => {
                  const value = event.target.value;
                  if (value.length <= 1000) {
                    setForm((current) => ({ ...current, details: value }));
                    
                    // Auto-resize textarea
                    setTimeout(() => adjustTextareaHeight(), 0);
                    
                    // Real-time validation
                    const error = validateField('details', value);
                    setErrors((current) => ({ ...current, details: error }));
                  }
                }}
                className={`${fieldClassName} resize-none ${errors.details ? 'border-red-500' : ''} pb-8`}
                placeholder="Describe your project in detail. What are you trying to achieve? What challenges are you facing? What's your vision for the final result?"
                style={{ minHeight: '120px', maxHeight: '400px' }}
                aria-invalid={!!errors.details}
                aria-describedby={errors.details ? 'details-error' : 'details-counter'}
                maxLength={1000}
              />
              <div className="absolute bottom-2 right-2 flex items-center gap-2 pointer-events-none">
                <span id="details-counter" className="text-xs text-slate-500 bg-black/80 px-1 rounded">
                  {form.details.length}/1000
                </span>
                {form.details.length > 900 && (
                  <span className="text-xs text-amber-400 bg-black/80 px-1 rounded">
                    {1000 - form.details.length} left
                  </span>
                )}
              </div>
            </div>
            {errors.details && (
              <p id="details-error" className="text-red-400 text-xs mt-1" role="alert">
                {errors.details}
              </p>
            )}
            <div className="grid gap-2 text-xs text-slate-500 sm:grid-cols-2">
              <div>• What problem are you trying to solve?</div>
              <div>• Who is your target audience?</div>
              <div>• What features are must-haves?</div>
              <div>• Any specific design preferences?</div>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.agreeToTerms}
              onChange={(event) => {
                const value = event.target.checked;
                setForm((current) => ({ ...current, agreeToTerms: value }));
                
                // Clear error if checkbox is checked
                if (value && errors.agreeToTerms) {
                  setErrors((current) => ({ ...current, agreeToTerms: undefined }));
                }
              }}
              className={`mt-1 w-4 h-4 rounded border-white/20 bg-white/10 text-white focus:ring-white/30 focus:ring-offset-0 ${errors.agreeToTerms ? 'border-red-500' : ''}`}
              aria-invalid={!!errors.agreeToTerms}
              aria-describedby={errors.agreeToTerms ? 'terms-error' : undefined}
            />
            <span className="text-[13px] leading-6 text-slate-300">
              I agree to the terms and conditions and privacy policy
              {' '}
              <Link 
                href="/privacy" 
                className="text-white underline hover:text-slate-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                (read terms)
              </Link>
            </span>
          </label>
          {errors.agreeToTerms && (
            <p id="terms-error" className="text-red-400 text-xs mt-1" role="alert">
              {errors.agreeToTerms}
            </p>
          )}
        </div>

        <div className="space-y-4 pt-2">
          {submitStatus !== 'idle' && (
            <div
              className={`rounded-lg p-4 text-sm ${
                submitStatus === 'success'
                  ? 'bg-green-900/20 border border-green-500/30 text-green-300'
                  : 'bg-red-900/20 border border-red-500/30 text-red-300'
              }`}
              role="alert"
              aria-live="polite"
            >
              {statusMessage}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              id="contact-submit-btn-13"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-none border border-white/15 bg-white px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-950 transition hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={isSubmitting ? 'Submitting form...' : 'Send inquiry'}
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner />
                  Sending...
                </>
              ) : (
                <>
                  <ArrowRightIcon />
                  Send inquiry
                </>
              )}
            </button>
            <p className="text-[13px] leading-6 text-slate-500">
              We'll respond within 24 hours with personalized recommendations.
            </p>
          </div>

          <div className="text-xs text-slate-500 space-y-1">
            <p>* Required fields</p>
            <p>All information is kept confidential and used only for your project inquiry.</p>
          </div>
        </div>
      </form>
    </div>
  );
}
