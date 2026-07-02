"use client";

import { useEffect, useId, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { submitContactForm } from "@/lib/api-service";
import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";

type JobSeekerPopupProps = {
  children: ReactNode;
  defaultPosition?: string;
  onOpenChange?: (isOpen: boolean) => void;
  asChild?: boolean;
};

type FormErrors = {
  name?: string;
  email?: string;
  position?: string;
  resumeUrl?: string;
  message?: string;
  terms?: string;
};

const initialForm = {
  name: "",
  email: "",
  position: "",
  resumeUrl: "",
  message: "",
  terms: false,
};

const POSITIONS_LIST = [
  "Lead UI/UX Designer",
  "Senior Frontend Developer",
  "Backend Engineer",
  "AI / ML Engineer",
  "Graphic Designer",
  "Business Development Associate (BDA)",
  "Other / General Application",
];

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function JobSeekerPopup({ children, defaultPosition = "", onOpenChange, asChild = false }: JobSeekerPopupProps) {
  const titleId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({
    ...initialForm,
    position: defaultPosition || POSITIONS_LIST[0],
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const setOpen = (nextOpen: boolean) => {
    setIsOpen(nextOpen);
    onOpenChange?.(nextOpen);
    if (nextOpen && defaultPosition) {
      setForm((curr) => ({ ...curr, position: defaultPosition }));
    }
  };

  useEffect(() => {
    setMounted(true);
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const validateForm = () => {
    const nextErrors: FormErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!validateEmail(form.email)) {
      nextErrors.email = "Enter a valid email";
    }

    if (!form.position) {
      nextErrors.position = "Please select a position";
    }

    if (!form.resumeUrl.trim()) {
      nextErrors.resumeUrl = "Resume or portfolio link is required";
    } else if (!validateUrl(form.resumeUrl.trim()) && !form.resumeUrl.startsWith("http")) {
      nextErrors.resumeUrl = "Enter a valid link (e.g., https://...)";
    }

    if (!form.message.trim()) {
      nextErrors.message = "Message or intro is required";
    } else if (form.message.trim().length < 10) {
      nextErrors.message = "Please add a brief summary of your skills";
    }

    if (!form.terms) {
      nextErrors.terms = "Please agree before sending";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");
    setStatusMessage("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const result = await submitContactForm({
        name: form.name,
        email: form.email,
        company: "Job Applicant",
        phone: "N/A",
        service: `Careers: ${form.position}`,
        budget: "N/A",
        timeline: "N/A",
        details: `Resume/Portfolio Link: ${form.resumeUrl}\n\nCover Letter / Message:\n${form.message}`,
      });

      if (result.success) {
        setForm({
          ...initialForm,
          position: defaultPosition || POSITIONS_LIST[0],
        });
        setErrors({});
        setStatus("success");
        setStatusMessage("Thank you for your application! Our team will review your profile and reach out shortly.");
      } else {
        setStatus("error");
        setStatusMessage(result.message || "Could not submit your application. Please try again.");
      }
    } catch {
      setStatus("error");
      setStatusMessage("Something went wrong. Please try again or email hello@unicx.in directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClassName =
    "w-full border border-white/20 bg-black px-3 py-2.5 text-[12px] text-white outline-none transition placeholder:text-slate-500 focus:border-white/55";

  const labelClassName = "text-[10px] font-semibold text-white";

  return (
    <>
      {asChild ? (
        <div onClick={() => setOpen(true)} className="contents">
          {children}
        </div>
      ) : (
        <button type="button" onClick={() => setOpen(true)} className="contents">
          {children}
        </button>
      )}

      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 py-4 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
            >
              <button
                type="button"
                aria-label="Close form"
                className="absolute inset-0 cursor-default"
                onClick={() => setOpen(false)}
              />

              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.98 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="relative grid h-[calc(100svh-2rem)] max-h-[780px] w-full max-w-5xl overflow-hidden rounded-lg border border-white/15 bg-black p-4 shadow-2xl sm:p-6 lg:grid-cols-2 lg:p-0"
              >
                <button
                  type="button"
                  aria-label="Close form"
                  onClick={() => setOpen(false)}
                  className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center border border-white/15 bg-black text-white transition hover:border-white/40"
                >
                  <CloseIcon />
                </button>

                <div className="relative hidden h-full overflow-hidden bg-black lg:block">
                  <InteractiveGridPattern
                    className={cn(
                      "[mask-image:radial-gradient(420px_circle_at_center,white,transparent)]",
                      "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
                    )}
                    squares={[26, 28]}
                    width={34}
                    height={34}
                  />
                </div>

                <div className="flex min-h-0 flex-col pt-5 lg:border-l lg:border-white/15 lg:p-8">
                  <div className="text-[10px] font-semibold text-white uppercase tracking-wider">Careers</div>
                  <h2 id={titleId} className="mt-2 max-w-lg text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[0.94] tracking-[-0.025em] text-white uppercase">
                    Join UNICX
                  </h2>
                  <p className="mt-4 max-w-md text-[12px] font-semibold leading-5 text-white">
                    Submit your details and links below to apply for our open opportunities.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-5 flex min-h-0 flex-1 flex-col space-y-3 overflow-y-auto pr-1">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <label className="block space-y-1.5">
                        <span className="flex items-center justify-between gap-3">
                          <span className={labelClassName}>Full Name</span>
                          {errors.name && <span className="text-[10px] text-red-300">{errors.name}</span>}
                        </span>
                        <input
                          value={form.name}
                          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                          className={fieldClassName}
                          placeholder="Enter your name"
                          aria-invalid={!!errors.name}
                        />
                      </label>

                      <label className="block space-y-1.5">
                        <span className="flex items-center justify-between gap-3">
                          <span className={labelClassName}>Email Address</span>
                          {errors.email && <span className="text-[10px] text-red-300">{errors.email}</span>}
                        </span>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                          className={fieldClassName}
                          placeholder="Enter your email"
                          aria-invalid={!!errors.email}
                        />
                      </label>
                    </div>

                    <label className="block space-y-1.5">
                      <span className="flex items-center justify-between gap-3">
                        <span className={labelClassName}>Target Role / Domain</span>
                        {errors.position && <span className="text-[10px] text-red-300">{errors.position}</span>}
                      </span>
                      <select
                        value={form.position}
                        onChange={(event) => setForm((current) => ({ ...current, position: event.target.value }))}
                        className={cn(fieldClassName, "appearance-none bg-black text-white cursor-pointer")}
                        aria-invalid={!!errors.position}
                      >
                        {POSITIONS_LIST.map((pos) => (
                          <option key={pos} value={pos} className="bg-black text-white">
                            {pos}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="block space-y-1.5">
                      <span className="flex items-center justify-between gap-3">
                        <span className={labelClassName}>Resume / Portfolio Link</span>
                        {errors.resumeUrl && <span className="text-[10px] text-red-300">{errors.resumeUrl}</span>}
                      </span>
                      <input
                        type="text"
                        value={form.resumeUrl}
                        onChange={(event) => setForm((current) => ({ ...current, resumeUrl: event.target.value }))}
                        className={fieldClassName}
                        placeholder="Link to your resume, portfolio, or LinkedIn"
                        aria-invalid={!!errors.resumeUrl}
                      />
                    </label>

                    <label className="block space-y-1.5">
                      <span className="flex items-center justify-between gap-3">
                        <span className={labelClassName}>Introduction / Cover Letter</span>
                        {errors.message && <span className="text-[10px] text-red-300">{errors.message}</span>}
                      </span>
                      <textarea
                        value={form.message}
                        onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                        className={`${fieldClassName} h-20 resize-none`}
                        placeholder="Tell us about yourself, your skills, and why you want to join us"
                        aria-invalid={!!errors.message}
                      />
                    </label>

                    <div className="flex items-center justify-between gap-3">
                      <label className="flex items-start gap-2 text-[10px] font-semibold text-white">
                        <input
                          type="checkbox"
                          checked={form.terms}
                          onChange={(event) => setForm((current) => ({ ...current, terms: event.target.checked }))}
                          className="mt-0.5 h-3 w-3 border border-white/30 bg-black"
                        />
                        <span>
                          I agree to your terms
                          {' '}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              const shouldOpenNew = confirm('Open terms and privacy policy in a new tab? (Click "Cancel" to open in current tab)');
                              if (shouldOpenNew) {
                                window.open('/privacy', '_blank', 'noopener,noreferrer');
                              } else {
                                window.location.href = '/privacy';
                              }
                            }}
                            className="underline hover:text-slate-300 transition-colors"
                          >
                            (read terms)
                          </button>
                        </span>
                      </label>
                      {errors.terms && <span className="text-[10px] text-red-300">{errors.terms}</span>}
                    </div>

                    {status !== "idle" && (
                      <div className={status === "success" ? "text-[12px] text-green-300" : "text-[12px] text-red-300"} role="alert">
                        {statusMessage}
                      </div>
                    )}

                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex min-w-24 items-center justify-center bg-white px-6 py-2.5 text-[11px] font-semibold text-black transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSubmitting ? "Submitting" : "Submit Application"}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
