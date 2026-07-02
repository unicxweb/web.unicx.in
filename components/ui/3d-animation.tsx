"use client";

import React, { useEffect, useRef } from "react";

interface PoemAnimationProps {
  poemHTML: string;
  backgroundImageUrl: string;
}

/**
 * Renders the 3D poem animation as a fixed full-viewport background.
 * Scales the internal 1000px scene to cover the entire viewport.
 */
export const PoemAnimation: React.FC<PoemAnimationProps> = ({
  poemHTML,
  backgroundImageUrl,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Scale the 1000x562 scene to cover the full viewport
  useEffect(() => {
    function adjustContentSize() {
      if (contentRef.current) {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const baseW = 1000;
        const baseH = 562;
        // Scale to cover viewport (like object-fit: cover)
        const scale = Math.max(vw / baseW, vh / baseH);
        contentRef.current.style.transform = `scale(${scale})`;
      }
    }

    adjustContentSize();
    window.addEventListener("resize", adjustContentSize);
    return () => window.removeEventListener("resize", adjustContentSize);
  }, []);

  return (
    <div className="hero-section hero-section--fixed">
      <div className="container">
        <div
          ref={contentRef}
          className="content"
          style={{ display: "block", width: "1000px", height: "562px" }}
        >
          <div className="container-full">
            <div className="animated hue"></div>
            <img
              className="backgroundImage"
              src={backgroundImageUrl}
              alt="An old stone courtyard at dawn"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />

            <div className="container">
              <div className="cube">
                <div className="face top"></div>
                <div className="face bottom"></div>
                <div
                  className="face left text"
                  dangerouslySetInnerHTML={{ __html: poemHTML }}
                ></div>
                <div
                  className="face right text"
                  dangerouslySetInnerHTML={{ __html: poemHTML }}
                ></div>
                <div className="face front"></div>
                <div
                  className="face back text"
                  dangerouslySetInnerHTML={{ __html: poemHTML }}
                ></div>
              </div>
            </div>

            <div className="container-reflect">
              <div className="cube">
                <div className="face top"></div>
                <div className="face bottom"></div>
                <div
                  className="face left text"
                  dangerouslySetInnerHTML={{ __html: poemHTML }}
                ></div>
                <div
                  className="face right text"
                  dangerouslySetInnerHTML={{ __html: poemHTML }}
                ></div>
                <div className="face front"></div>
                <div
                  className="face back text"
                  dangerouslySetInnerHTML={{ __html: poemHTML }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
