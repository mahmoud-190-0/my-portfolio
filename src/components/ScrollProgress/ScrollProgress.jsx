import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./ScrollProgress.css";

const RADIUS = 18;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const IDLE_DELAY = 700; // ms after scroll stops before flipping to arrow

export default function ScrollProgress({ showAfter = 400 }) {
  const barRef = useRef(null);
  const ringRef = useRef(null);
  const idleTimerRef = useRef(null);

  const [percent, setPercent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;

      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      const ratio =
        maxScroll > 0 ? Math.min(Math.max(scrollTop / maxScroll, 0), 1) : 0;

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${ratio})`;
      }
      if (ringRef.current) {
        ringRef.current.style.strokeDashoffset = String(
          CIRCUMFERENCE * (1 - ratio),
        );
      }

      setPercent(Math.round(ratio * 100));
      setVisible(maxScroll > 0 && scrollTop > showAfter);
    };

    const requestUpdate = () => {
      // While scrolling: show the number (not idle)
      setIsIdle(false);

      // Reset the idle timer on every scroll tick
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      idleTimerRef.current = setTimeout(() => {
        setIsIdle(true);
      }, IDLE_DELAY);

      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("orientationchange", requestUpdate);
    window.addEventListener("load", requestUpdate);

    // Page height can change without a window resize (images, lazy content,
    // route changes), so watch the document itself as well.
    let observer;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(requestUpdate);
      observer.observe(document.documentElement);
      observer.observe(document.body);
    }

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("orientationchange", requestUpdate);
      window.removeEventListener("load", requestUpdate);
      if (observer) observer.disconnect();
    };
  }, [showAfter]);

  const scrollToTop = useCallback(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }, []);

  if (typeof document === "undefined") return null;

  // Arrow shows when: button is visible AND user has stopped scrolling.
  const showArrow = visible && isIdle;

  return createPortal(
    <>
      {/* Decorative: the page itself is the real progress indicator. */}
      <div className="scroll-progress__bar" aria-hidden="true">
        <div ref={barRef} className="scroll-progress__fill" />
      </div>

      <button
        type="button"
        className={`scroll-progress__button${visible ? " is-visible" : ""}${
          showArrow ? " is-idle" : ""
        }`}
        onClick={scrollToTop}
        aria-label="Back to top"
        tabIndex={visible ? 0 : -1}
        aria-hidden={visible ? undefined : "true"}>
        <svg
          className="scroll-progress__ring"
          viewBox="0 0 44 44"
          aria-hidden="true"
          focusable="false">
          <circle
            className="scroll-progress__track"
            cx="22"
            cy="22"
            r={RADIUS}
          />
          <circle
            ref={ringRef}
            className="scroll-progress__value"
            cx="22"
            cy="22"
            r={RADIUS}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
          />
        </svg>

        <span className="scroll-progress__percent" aria-hidden="true">
          {percent}
        </span>

        <svg
          className="scroll-progress__arrow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false">
          <path d="M12 19V5" />
          <path d="m5 12 7-7 7 7" />
        </svg>
      </button>
    </>,
    document.body,
  );
}
