import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { MdLanguage } from "react-icons/md";
import { X } from "lucide-react";
import "./LanguageToggle.css";

const EGYPTIAN_FUNNY_MESSAGES = [
  "يا عم روح ذاكر إنجليزي 😂",
  "مفيش عربي هنا يا باشا، روح ذاكر! 📚",
  "يا عم والله ما في عربي.. ركّز في الإنجليزي أحسن! 🧠",
  "مصر كلها بتتعلم إنجليزي وإنت جاي تدور على عربي؟ 🤣",
];

export default function LanguageToggle({ className = "" }) {
  const { i18n, t } = useTranslation();
  const current = i18n.language === "ar" ? "ar" : "en";

  const [toastVisible, setToastVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(
    EGYPTIAN_FUNNY_MESSAGES[0],
  );
  const [isShaking, setIsShaking] = useState(false);

  const clickCountRef = useRef(0);
  const timerRef = useRef(null);
  const wrapperRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();

    // Pick message (first click is always "يا عم روح ذاكر إنجليزي 😂", subsequent clicks cycle funny messages)
    const msg =
      EGYPTIAN_FUNNY_MESSAGES[
        clickCountRef.current % EGYPTIAN_FUNNY_MESSAGES.length
      ];
    clickCountRef.current += 1;

    setCurrentMessage(msg);
    setToastVisible(true);

    // Subtle button wobble animation
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 350);

    // Auto-dismiss after 3.5 seconds
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setToastVisible(false);
    }, 3500);
  };

  // Click outside to dismiss
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setToastVisible(false);
      }
    };

    if (toastVisible) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [toastVisible]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div ref={wrapperRef} className="navbar__lang-toggle-wrapper">
      <button
        type="button"
        onClick={handleClick}
        className={`navbar__lang-toggle ${isShaking ? "is-shaking" : ""} ${className}`.trim()}
        aria-label={t("language.toggleAria", "Language")}
        title={t("language.toggleAria", "Language")}
        aria-expanded={toastVisible}>
        <span className="navbar__lang-toggle-icon">
          <MdLanguage size={18} aria-hidden="true" />
        </span>
        <span className="navbar__lang-toggle-text">
          {current === "ar"
            ? t("language.en", "English")
            : t("language.ar", "العربية")}
        </span>
      </button>

      {/* Funny Egyptian Toast / Tooltip */}
      {toastVisible && (
        <div
          role="tooltip"
          aria-live="polite"
          className="navbar__lang-tooltip"
          onClick={(e) => e.stopPropagation()}>
          <div className="navbar__lang-tooltip-content">
            <span className="navbar__lang-tooltip-msg">{currentMessage}</span>
            <button
              type="button"
              className="navbar__lang-tooltip-close"
              onClick={() => setToastVisible(false)}
              aria-label="Close message">
              <X size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
