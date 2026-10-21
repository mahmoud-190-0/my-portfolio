import React, { useState, useEffect } from "react";
import { Sparkles, Code2 } from "lucide-react";
import "./PreLoader.css";

export default function Preload({
  onLoaded,
  minDuration = 2800,
  maxDuration = 3100,
}) {
  const [isMounted, setIsMounted] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(12);
  const [statusMessage, setStatusMessage] = useState(
    "INITIALIZING ENVIRONMENT",
  );

  useEffect(() => {
    if (!isMounted) return;

    // Prevent body and html scrolling while preloader is active
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const startTime = Date.now();
    let isWindowLoaded = document.readyState === "complete";
    let isFontsLoaded = false;

    // Check font readiness
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        isFontsLoaded = true;
      });
    } else {
      isFontsLoaded = true;
    }

    // Window load listener
    const handleWindowLoad = () => {
      isWindowLoaded = true;
    };

    if (!isWindowLoaded) {
      window.addEventListener("load", handleWindowLoad);
    }

    // Smooth progress counter simulation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 45) {
          setStatusMessage("LOADING DESIGN TOKENS");
          return prev + Math.floor(Math.random() * 8) + 4;
        } else if (prev < 80) {
          setStatusMessage("CRAFTING INTERFACE");
          return prev + Math.floor(Math.random() * 5) + 3;
        } else if (prev < 98) {
          if (isWindowLoaded || isFontsLoaded) {
            setStatusMessage("ALMOST READY");
            return prev + 2;
          }
          return prev;
        }
        return prev;
      });
    }, 45);

    // Completion trigger (respects minDuration and safety maxDuration)
    const checkCompletion = () => {
      const elapsed = Date.now() - startTime;
      const isReady =
        (isWindowLoaded && isFontsLoaded) || elapsed >= maxDuration;

      if (isReady && elapsed >= minDuration) {
        clearInterval(progressInterval);
        setProgress(100);
        setStatusMessage("READY");

        // Start smooth exit transition
        setTimeout(() => {
          setIsExiting(true);

          // Restore scroll
          document.body.style.overflow = originalBodyOverflow;
          document.documentElement.style.overflow = originalHtmlOverflow;

          // Unmount after exit animation completes (600ms)
          setTimeout(() => {
            setIsMounted(false);
            if (onLoaded) onLoaded();
          }, 600);
        }, 250);
      } else {
        setTimeout(checkCompletion, 80);
      }
    };

    const completionTimer = setTimeout(checkCompletion, minDuration);

    return () => {
      window.removeEventListener("load", handleWindowLoad);
      clearInterval(progressInterval);
      clearTimeout(completionTimer);
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [isMounted, minDuration, maxDuration, onLoaded]);

  if (!isMounted) return null;

  return (
    <div
      className={`preloader-overlay ${isExiting ? "is-exiting" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio of Mahmoud Ahmed">
      <div className="preloader-content">
        {/* Orbital Emblem Spinner */}
        <div className="preloader-emblem" aria-hidden="true">
          <div className="preloader-ring-outer" />
          <div className="preloader-ring-inner" />
          <div className="preloader-ring-glow" />
          <div className="preloader-center-icon">
            <Sparkles size={26} strokeWidth={2.2} />
          </div>
        </div>

        {/* Brand Logo & Name */}
        <div className="preloader-brand">
          <h1 className="preloader-title font-peralta">Portfolio</h1>
          <div className="preloader-author-wrap">
            <span className="preloader-author">Mahmoud Ahmed</span>
          </div>
        </div>

        {/* Progress Bar & Status */}
        <div className="preloader-track-wrap">
          <div
            className="preloader-bar-bg"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100">
            <div
              className="preloader-bar-fill"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>

          <div className="preloader-status-row">
            <span className="preloader-status-text">
              <span className="preloader-status-dot" aria-hidden="true" />
              {statusMessage}
            </span>
            <span className="preloader-percent">
              {Math.min(progress, 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
