"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    
    const startTimer = () => {
      // Delay showing the banner by 8 seconds after the site is loaded/visible
      timer = setTimeout(() => {
        setShowBanner(true);
      }, 8000);
    };

    const handlePreloaderComplete = () => {
      startTimer();
      window.removeEventListener("preloader-complete", handlePreloaderComplete);
    };

    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const isPreloaderActive = document.documentElement.classList.contains("preloader-active") || 
                                document.body.classList.contains("preloader-active");
      
      if (isPreloaderActive) {
        window.addEventListener("preloader-complete", handlePreloaderComplete);
      } else {
        startTimer();
      }
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
      applyCookies(savedPreferences);
    }

    const handleOpenSettings = () => {
      if (timer) clearTimeout(timer);
      setShowSettings(true);
      setShowBanner(true);
    };

    window.addEventListener("open-cookie-settings", handleOpenSettings);
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("open-cookie-settings", handleOpenSettings);
      window.removeEventListener("preloader-complete", handlePreloaderComplete);
    };
  }, []);

  const applyCookies = (prefs: CookiePreferences) => {
    // Here you would integrate with actual analytics/marketing tools
    // For demonstration, we'll just log the preferences
    if (prefs.analytics) {
      console.log("Analytics cookies enabled");
      // Initialize analytics (e.g., Google Analytics)
    }
    if (prefs.marketing) {
      console.log("Marketing cookies enabled");
      // Initialize marketing cookies (e.g., Facebook Pixel, Google Ads)
    }
  };

  const acceptAll = () => {
    const allPreferences: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allPreferences);
    localStorage.setItem("cookie-consent", JSON.stringify(allPreferences));
    applyCookies(allPreferences);
    setShowBanner(false);
  };

  const acceptSelected = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    applyCookies(preferences);
    setShowBanner(false);
  };

  const rejectAll = () => {
    const minimalPreferences: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(minimalPreferences);
    localStorage.setItem("cookie-consent", JSON.stringify(minimalPreferences));
    applyCookies(minimalPreferences);
    setShowBanner(false);
  };

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    if (key === "necessary") return; // Necessary cookies can't be disabled
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1] // Smooth easeOutExpo transition
        }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-lg border-t border-white/10"
      >
        {!showSettings ? (
          <div className="mx-auto max-w-7xl px-6 py-6 sm:px-8 lg:px-12">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white mb-2">
                  Cookie Consent
                </h3>
                <p className="text-xs text-slate-400 max-w-2xl">
                  We use cookies to enhance your browsing experience, serve personalized content, 
                  and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition"
                >
                  Customize
                </button>
                <button
                  onClick={rejectAll}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition"
                >
                  Reject All
                </button>
                <button
                  onClick={acceptAll}
                  className="px-6 py-2 text-xs font-medium bg-white text-black hover:bg-slate-200 transition"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-7xl px-6 py-6 sm:px-8 lg:px-12">
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-white mb-2">
                Cookie Preferences
              </h3>
              <p className="text-xs text-slate-400">
                Customize your cookie preferences below. You can change these settings at any time.
              </p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="necessary"
                  checked={preferences.necessary}
                  disabled
                  className="mt-1 w-4 h-4 text-white bg-slate-800 border-slate-600 rounded focus:ring-slate-500 disabled:opacity-50"
                />
                <div className="flex-1">
                  <label htmlFor="necessary" className="text-sm font-medium text-white">
                    Necessary Cookies
                  </label>
                  <p className="text-xs text-slate-400 mt-1">
                    Essential for the website to function properly. Cannot be disabled.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="analytics"
                  checked={preferences.analytics}
                  onChange={(e) => updatePreference("analytics", e.target.checked)}
                  className="mt-1 w-4 h-4 text-white bg-slate-800 border-slate-600 rounded focus:ring-slate-500"
                />
                <div className="flex-1">
                  <label htmlFor="analytics" className="text-sm font-medium text-white">
                    Analytics Cookies
                  </label>
                  <p className="text-xs text-slate-400 mt-1">
                    Help us understand how visitors interact with our website by collecting and reporting information.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="marketing"
                  checked={preferences.marketing}
                  onChange={(e) => updatePreference("marketing", e.target.checked)}
                  className="mt-1 w-4 h-4 text-white bg-slate-800 border-slate-600 rounded focus:ring-slate-500"
                />
                <div className="flex-1">
                  <label htmlFor="marketing" className="text-sm font-medium text-white">
                    Marketing Cookies
                  </label>
                  <p className="text-xs text-slate-400 mt-1">
                    Used to track visitors across websites to display relevant ads and marketing campaigns.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition"
              >
                Back
              </button>
              <button
                onClick={acceptSelected}
                className="px-6 py-2 text-xs font-medium bg-white text-black hover:bg-slate-200 transition"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
