import React, { useState, useEffect, useRef, useCallback } from "react";
import { Palette, Type, Check, X } from "lucide-react";
import "./ThemeSwitcher.css";

export const ACCENT_THEMES = [
  {
    id: "default",
    name: "Default Orange",
    color: "#f97316",
    hover: "#ea580c",
    light: "rgba(249, 115, 22, 0.18)",
    secondary: "#ff9a3d",
    secondaryName: "Sunset Glow",
    tag: "Default",
  },
  {
    id: "mint",
    name: "Acid Mint",
    color: "#B7FF72",
    hover: "#9fe657",
    light: "rgba(183, 255, 114, 0.18)",
    secondary: "#18251D",
    secondaryName: "Forest Graphite",
    tag: "1",
  },
  {
    id: "violet",
    name: "Signal Violet",
    color: "#7A35FF",
    hover: "#6520e6",
    light: "rgba(122, 53, 255, 0.18)",
    secondary: "#F0F2F5",
    secondaryName: "Mist Gray",
    tag: "2",
  },
  {
    id: "blue",
    name: "Ocean Blue",
    color: "#38BDF8",
    hover: "#0ea5e9",
    light: "rgba(56, 189, 248, 0.18)",
    secondary: "#0284c7",
    tag: "3",
  },
  {
    id: "pink",
    name: "Rose Pink",
    color: "#FB7185",
    hover: "#f43f5e",
    light: "rgba(251, 113, 133, 0.18)",
    secondary: "#e11d48",
    tag: "4",
  },
  {
    id: "clay",
    name: "Clay & Butter",
    color: "#FFF1A6",
    hover: "#F2E290",
    light: "rgba(255, 241, 166, 0.18)",
    secondary: "#6B352A",
    secondaryName: "Clay Brown",
    tag: "5",
  },
  {
    id: "red",
    name: "Crimson Red",
    color: "#ef4444",
    hover: "#dc2626",
    light: "rgba(239, 68, 68, 0.18)",
    secondary: "#fca5a5",
    secondaryName: "Light Red",
    tag: "6",
  },
];

export const FONT_FAMILIES = [
  {
    id: "libre-baskerville",
    name: "Libre Baskerville",
    family: "'Libre Baskerville', serif",
    category: "Classic & Readable",
    googleFont: "Libre+Baskerville:ital,wght@0,400;0,700;1,400",
    previewSize: "0.95rem",
    scale: 1,
  },
  {
    id: "marcellus",
    name: "Marcellus",
    family: "'Marcellus', serif",
    category: "Elegant & Timeless",
    googleFont: "Marcellus",
    previewSize: "1rem",
    scale: 1.05,
  },
  {
    id: "emilys-candy",
    name: "Emily's Candy",
    family: "'Emilys Candy', cursive",
    category: "Playful & Sweet",
    googleFont: "Emilys+Candy",
    previewSize: "1.15rem",
    scale: 1.2,
  },
  {
    id: "story-script",
    name: "Story Script",
    family: "'Story Script', cursive",
    category: "Flowing & Personal",
    googleFont: "Story+Script",
    previewSize: "1.4rem",
    scale: 1.5,
  },

  {
    id: "spicy-rice",
    name: "Spicy Rice",
    family: "'Spicy Rice', cursive",
    category: "Bold & Playful",
    googleFont: "Spicy+Rice",
    previewSize: "1.15rem",
    scale: 1.1,
  },
];

const THEME_STORAGE_KEY = "portfolio-accent-theme";
const FONT_STORAGE_KEY = "portfolio-font-family";

function ensureFontLoaded(googleFontSpec) {
  if (!googleFontSpec || typeof document === "undefined") return;
  const linkId = `gfont-${googleFontSpec.split(":")[0].toLowerCase()}`;
  if (!document.getElementById(linkId)) {
    const link = document.createElement("link");
    link.id = linkId;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${googleFontSpec}&display=swap`;
    document.head.appendChild(link);
  }
}

export function ThemeSwitcher({ className = "", onThemeChange, onFontChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("colors"); // "colors" | "typography"

  // 1. Accent Theme State (restored from localStorage)
  const [activeThemeId, setActiveThemeId] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved && ACCENT_THEMES.some((t) => t.id === saved)) {
        return saved;
      }
    } catch {
      // localStorage fallback
    }
    return "default";
  });

  // 2. Font Family State (restored from localStorage)
  const [activeFontId, setActiveFontId] = useState(() => {
    try {
      const saved = localStorage.getItem(FONT_STORAGE_KEY);
      if (saved && FONT_FAMILIES.some((f) => f.id === saved)) {
        return saved;
      }
    } catch {
      // localStorage fallback
    }
    return "libre-baskerville";
  });

  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const optionRefs = useRef([]);

  // Apply Theme Accent Colors
  const applyTheme = useCallback(
    (themeId) => {
      const theme =
        ACCENT_THEMES.find((t) => t.id === themeId) || ACCENT_THEMES[0];
      const root = document.documentElement;

      // Update data attribute for index.css selectors
      root.setAttribute("data-accent", theme.id);

      // Directly update CSS variables in index.css
      root.style.setProperty("--primary-color", theme.color);
      root.style.setProperty("--primary-hover", theme.hover);
      root.style.setProperty("--primary-light", theme.light);
      if (theme.secondary) {
        root.style.setProperty("--secondary-color", theme.secondary);
      }

      try {
        localStorage.setItem(THEME_STORAGE_KEY, theme.id);
      } catch {
        // Safe fallback
      }

      setActiveThemeId(theme.id);
      if (onThemeChange) {
        onThemeChange(theme);
      }
    },
    [onThemeChange],
  );

  // Apply Font Family + Font Size Scale
  const applyFont = useCallback(
    (fontId) => {
      const font =
        FONT_FAMILIES.find((f) => f.id === fontId) || FONT_FAMILIES[0];
      const root = document.documentElement;

      // Load font stylesheet if needed
      ensureFontLoaded(font.googleFont);

      // Update CSS variables and data attribute
      root.style.setProperty("--font-family", font.family);
      root.style.setProperty("--font-primary", font.family);
      root.setAttribute("data-font", font.id);

      // Apply font-size scale so small script fonts stay readable
      root.style.setProperty("--font-size-scale", font.scale || 1);

      try {
        localStorage.setItem(FONT_STORAGE_KEY, font.id);
      } catch {
        // Safe fallback
      }

      setActiveFontId(font.id);
      if (onFontChange) {
        onFontChange(font);
      }
    },
    [onFontChange],
  );

  // Restore and apply both settings on initial mount
  useEffect(() => {
    applyTheme(activeThemeId);
  }, [applyTheme, activeThemeId]);

  useEffect(() => {
    applyFont(activeFontId);
  }, [applyFont, activeFontId]);

  // Preload font options when the panel opens for smooth previews
  useEffect(() => {
    if (isOpen) {
      FONT_FAMILIES.forEach((f) => ensureFontLoaded(f.googleFont));
    }
  }, [isOpen]);

  // Click outside to close panel
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Keyboard navigation & accessibility (ESC closes, Arrow keys cycle options)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return;

      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();

        if (activeTab === "colors") {
          const currentIndex = ACCENT_THEMES.findIndex(
            (t) => t.id === activeThemeId,
          );
          let nextIndex = currentIndex;
          if (event.key === "ArrowDown") {
            nextIndex = (currentIndex + 1) % ACCENT_THEMES.length;
          } else {
            nextIndex =
              (currentIndex - 1 + ACCENT_THEMES.length) % ACCENT_THEMES.length;
          }
          const nextTheme = ACCENT_THEMES[nextIndex];
          applyTheme(nextTheme.id);
          optionRefs.current[nextIndex]?.focus();
        } else {
          const currentIndex = FONT_FAMILIES.findIndex(
            (f) => f.id === activeFontId,
          );
          let nextIndex = currentIndex;
          if (event.key === "ArrowDown") {
            nextIndex = (currentIndex + 1) % FONT_FAMILIES.length;
          } else {
            nextIndex =
              (currentIndex - 1 + FONT_FAMILIES.length) % FONT_FAMILIES.length;
          }
          const nextFont = FONT_FAMILIES[nextIndex];
          applyFont(nextFont.id);
          optionRefs.current[nextIndex]?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, activeTab, activeThemeId, activeFontId, applyTheme, applyFont]);

  const activeTheme =
    ACCENT_THEMES.find((t) => t.id === activeThemeId) || ACCENT_THEMES[0];
  const activeFont =
    FONT_FAMILIES.find((f) => f.id === activeFontId) || FONT_FAMILIES[0];

  return (
    <div
      ref={containerRef}
      className={`theme-switcher-container ${className}`.trim()}
      role="region"
      aria-label="Theme Customization Settings">
      {isOpen && (
        <div
          id="theme-switcher-panel"
          className="theme-switcher-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="theme-switcher-heading">
          {/* Header */}
          <div className="theme-switcher-header">
            <div className="theme-switcher-title-wrap">
              {activeTab === "colors" ? (
                <Palette size={16} style={{ color: activeTheme.color }} />
              ) : (
                <Type size={16} style={{ color: activeTheme.color }} />
              )}
              <h2 id="theme-switcher-heading" className="theme-switcher-title">
                {activeTab === "colors" ? "Accent Color" : "Typography"}
              </h2>
            </div>
            <button
              type="button"
              className="theme-switcher-close-btn"
              onClick={() => {
                setIsOpen(false);
                triggerRef.current?.focus();
              }}
              aria-label="Close settings panel">
              <X size={15} />
            </button>
          </div>

          {/* Setting Mode Tabs: Colors vs Typography */}
          <div
            className="theme-switcher-tabs"
            role="tablist"
            aria-label="Theme settings sections">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "colors"}
              className={`theme-switcher-tab-btn ${activeTab === "colors" ? "active" : ""}`}
              onClick={() => setActiveTab("colors")}>
              <Palette size={14} />
              <span>Colors</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "typography"}
              className={`theme-switcher-tab-btn ${activeTab === "typography" ? "active" : ""}`}
              onClick={() => setActiveTab("typography")}>
              <Type size={14} />
              <span>Fonts</span>
            </button>
          </div>

          {/* TAB 1: ACCENT COLORS */}
          {activeTab === "colors" && (
            <div
              className="theme-switcher-list"
              role="radiogroup"
              aria-label="Accent color options">
              {ACCENT_THEMES.map((theme, index) => {
                const isActive = theme.id === activeThemeId;
                return (
                  <button
                    key={theme.id}
                    ref={(el) => {
                      optionRefs.current[index] = el;
                    }}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    className={`theme-switcher-option ${isActive ? "active" : ""}`}
                    style={{
                      "--theme-color-var": theme.color,
                      "--theme-light-var": theme.light,
                    }}
                    onClick={() => applyTheme(theme.id)}>
                    <span className="theme-switcher-option-left">
                      <span className="theme-switcher-swatch-container">
                        <span
                          className="theme-switcher-swatch"
                          style={{ backgroundColor: theme.color }}
                          aria-hidden="true"
                        />
                        {theme.secondary && (
                          <span
                            className="theme-switcher-swatch-secondary"
                            style={{ backgroundColor: theme.secondary }}
                            title={theme.secondaryName || theme.secondary}
                            aria-hidden="true"
                          />
                        )}
                      </span>
                      <span className="theme-switcher-label-wrap">
                        <span className="theme-switcher-label">
                          {theme.tag ? (
                            <span
                              style={{ opacity: 0.7, marginRight: 4 }}></span>
                          ) : null}
                          {theme.name}
                        </span>
                        <span className="theme-switcher-hex">
                          {theme.color}
                          {theme.secondary ? ` · ${theme.secondary}` : ""}
                        </span>
                      </span>
                    </span>

                    {isActive && (
                      <span className="theme-switcher-check" aria-hidden="true">
                        <Check size={16} strokeWidth={2.5} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* TAB 2: TYPOGRAPHY / FONT SETTINGS */}
          {activeTab === "typography" && (
            <div
              className="theme-switcher-list"
              role="radiogroup"
              aria-label="Font family options">
              {FONT_FAMILIES.map((font, index) => {
                const isActive = font.id === activeFontId;
                return (
                  <button
                    key={font.id}
                    ref={(el) => {
                      optionRefs.current[index] = el;
                    }}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    className={`theme-switcher-option ${isActive ? "active" : ""}`}
                    style={{
                      "--theme-color-var": activeTheme.color,
                      "--theme-light-var": activeTheme.light,
                    }}
                    onClick={() => applyFont(font.id)}>
                    <span className="theme-switcher-option-left">
                      <span
                        className="theme-switcher-font-badge"
                        style={{ fontFamily: font.family }}
                        aria-hidden="true">
                        Aa
                      </span>
                      <span className="theme-switcher-label-wrap">
                        <span
                          className="theme-switcher-label"
                          style={{
                            fontFamily: font.family,
                            fontSize: font.previewSize || "0.95rem",
                          }}>
                          {font.name}
                        </span>
                        <span className="theme-switcher-sublabel">
                          {font.category}
                        </span>
                      </span>
                    </span>

                    {isActive && (
                      <span className="theme-switcher-check" aria-hidden="true">
                        <Check size={16} strokeWidth={2.5} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Footer showing current active selections */}
          <div className="theme-switcher-footer">
            <span>Active Settings</span>
            <span className="theme-switcher-active-tag">
              <span className="theme-switcher-active-dot" />
              <span>{activeTheme.name}</span>
              <span style={{ opacity: 0.5 }}>·</span>
              <span style={{ fontFamily: activeFont.family }}>
                {activeFont.name}
              </span>
            </span>
          </div>
        </div>
      )}

      {/* Floating Action Button (FAB) */}
      <button
        ref={triggerRef}
        type="button"
        className="theme-switcher-fab"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open theme and font customization settings"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="theme-switcher-panel"
        title={`Customization (Color: ${activeTheme.name}, Font: ${activeFont.name})`}>
        <Palette size={22} strokeWidth={2} />
        <span className="theme-switcher-fab-badge" aria-hidden="true" />
      </button>
    </div>
  );
}

export default ThemeSwitcher;
