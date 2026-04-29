"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { initGA } from "./analytics";

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieContextType {
  preferences: CookiePreferences;
  updatePreferences: (prefs: CookiePreferences) => void;
  hasConsented: boolean;
  resetConsent: () => void;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

export function CookieProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  const [hasConsented, setHasConsented] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (consent) {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
      setHasConsented(true);
    }
  }, []);

  const updatePreferences = (newPreferences: CookiePreferences) => {
    setPreferences(newPreferences);
    localStorage.setItem("cookie-consent", JSON.stringify(newPreferences));
    setHasConsented(true);
    
    // Apply cookie settings
    applyCookieSettings(newPreferences);
  };

  const resetConsent = () => {
    localStorage.removeItem("cookie-consent");
    setPreferences({
      necessary: true,
      analytics: false,
      marketing: false,
    });
    setHasConsented(false);
    
    // Clear non-essential cookies
    clearNonEssentialCookies();
  };

  const applyCookieSettings = (prefs: CookiePreferences) => {
    // Analytics cookies
    if (prefs.analytics) {
      // Initialize Google Analytics
      initGA();
    } else {
      // Disable analytics
      disableAnalytics();
    }

    // Marketing cookies
    if (prefs.marketing) {
      // Initialize marketing pixels
      initializeMarketing();
    } else {
      // Disable marketing
      disableMarketing();
    }
  };

  const disableAnalytics = () => {
    // Clear analytics cookies
    document.cookie.split(";").forEach((c) => {
      const cookie = c.trim();
      if (cookie.startsWith("_ga") || cookie.startsWith("_gid")) {
        document.cookie = `${cookie}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
      }
    });
  };

  const disableMarketing = () => {
    // Clear marketing cookies
    document.cookie.split(";").forEach((c) => {
      const cookie = c.trim();
      if (cookie.includes("facebook") || cookie.includes("google") || cookie.includes("linkedin")) {
        document.cookie = `${cookie}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
      }
    });
  };

  const clearNonEssentialCookies = () => {
    disableAnalytics();
    disableMarketing();
  };

  const initializeMarketing = () => {
    // Initialize marketing tracking (Facebook Pixel, Google Ads, etc.)
    // This would be implemented based on your specific marketing tools
    console.log("Marketing cookies initialized");
  };

  return (
    <CookieContext.Provider
      value={{
        preferences,
        updatePreferences,
        hasConsented,
        resetConsent,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
}

export function useCookies() {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error("useCookies must be used within a CookieProvider");
  }
  return context;
}

// Type declaration for global gtag function
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}
