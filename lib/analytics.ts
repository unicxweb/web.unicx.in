// Google Analytics 4 Configuration
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';


// Initialize Google Analytics
export function initGA() {
  if (typeof window !== 'undefined' && !window.gtag) {
    // Create gtag function
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).gtag = function gtag() {
      (window as any).dataLayer.push(arguments);
    };
    (window as any).gtag('js', new Date());
    (window as any).gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      cookie_flags: 'SameSite=Lax;Secure',
    });
  }
}

// Track page views
export function trackPageView(path: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
    });
  }
}

// Track events
export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

// Common tracking events
export const analytics = {
  // Track contact form submissions
  trackContactForm: () => trackEvent('submit', 'contact_form'),
  
  // Track service page views
  trackServiceView: (serviceName: string) => 
    trackEvent('view', 'service_page', serviceName),
  
  // Track CTA clicks
  trackCTAClick: (ctaText: string) => 
    trackEvent('click', 'cta', ctaText),
  
  // Track navigation clicks
  trackNavClick: (navItem: string) => 
    trackEvent('click', 'navigation', navItem),
};
