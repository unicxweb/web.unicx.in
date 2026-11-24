"use client";

import { useState, useEffect, useRef } from "react";

interface StickyContactInfoProps {
  children: React.ReactNode;
}

export function StickyContactInfo({ children }: StickyContactInfoProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [stickyStyle, setStickyStyle] = useState<React.CSSProperties>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !stickyRef.current || !rightSideRef.current) return;

      const container = containerRef.current;
      const sticky = stickyRef.current;
      const rightSide = rightSideRef.current;

      // Get positions
      const containerRect = container.getBoundingClientRect();
      const rightSideRect = rightSide.getBoundingClientRect();
      const stickyHeight = sticky.offsetHeight;

      // Start sticky when container top reaches viewport top (with some padding)
      const startStickyAt = containerRect.top <= 20;
      
      // Stop sticky when right side bottom reaches viewport bottom
      const stopStickyAt = rightSideRect.bottom <= stickyHeight + 40;

      if (startStickyAt && !stopStickyAt) {
        // Normal sticky behavior - follow scroll
        setIsSticky(true);
        setStickyStyle({
          position: 'fixed',
          top: '20px',
          width: '40%',
          maxWidth: '500px',
          zIndex: 10
        });
      } else if (stopStickyAt) {
        // Stop at bottom - position relative to right side end
        setIsSticky(true);
        const bottomPosition = rightSideRect.bottom - stickyHeight - 40;
        setStickyStyle({
          position: 'absolute',
          top: `${bottomPosition - containerRect.top}px`,
          width: '100%',
          maxWidth: 'none',
          zIndex: 10
        });
      } else {
        // Normal flow
        setIsSticky(false);
        setStickyStyle({
          position: 'relative',
          top: 'auto',
          width: '100%',
          maxWidth: 'none'
        });
      }
    };

    // Set up refs using a simpler approach
    const setupRefs = () => {
      const container = containerRef.current;
      if (container) {
        // Find the right side element by looking for the data attribute
        const parent = container.parentElement;
        if (parent) {
          const children = parent.children;
          for (let i = 0; i < children.length; i++) {
            const child = children[i] as HTMLElement;
            if (child.getAttribute && child.getAttribute('data-right-side') === '') {
              rightSideRef.current = child as HTMLDivElement;
              break;
            }
          }
        }
      }
    };

    setupRefs();
    handleScroll();

    const throttledHandleScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', throttledHandleScroll);
    window.addEventListener('resize', () => {
      setupRefs();
      handleScroll();
    });

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div
        ref={stickyRef}
        className="transition-all duration-200 ease-out"
        style={stickyStyle}
      >
        {children}
      </div>
    </div>
  );
}
