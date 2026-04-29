"use client";

import { useCookies } from "@/lib/cookie-context";
import { useEffect } from "react";

export default function GoogleAnalytics() {
  const { preferences, hasConsented } = useCookies();

  useEffect(() => {
    if (hasConsented && preferences.analytics) {
      // Load Google Analytics script
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-4MN47RY66V';
      document.head.appendChild(script);

      // Initialize gtag
      const gtagScript = document.createElement('script');
      gtagScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-4MN47RY66V', {
          anonymize_ip: true,
          cookie_flags: 'SameSite=Lax;Secure'
        });
      `;
      document.head.appendChild(gtagScript);
    }
  }, [hasConsented, preferences.analytics]);

  return null;
}
