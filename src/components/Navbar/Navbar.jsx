import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon, ArrowUpRight, Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeCtx";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import styles from "./Navbar.module.css";

// Section IDs stay static (they're DOM ids, not text).
// Labels are resolved via i18n on each render.
const NAV_ITEM_IDS = [
  { id: "home", key: "nav.home" },
  { id: "about", key: "nav.about" },
  { id: "skills", key: "nav.skills" },
  { id: "projects", key: "nav.projects" },
  { id: "process", key: "nav.process" },
  { id: "services", key: "nav.services" },
  { id: "contact", key: "nav.contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const isScrolledRef = useRef(false);

  // Localized nav items (memoized so the IntersectionObserver effect
  // doesn't tear down on every render).
  const navItems = useMemo(
    () => NAV_ITEM_IDS.map(({ id, key }) => ({ id, label: t(key) })),
    [t],
  );

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -55% 0px",
      threshold: 0,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    NAV_ITEM_IDS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const nextIsScrolled = window.scrollY > 20;
      if (isScrolledRef.current !== nextIsScrolled) {
        isScrolledRef.current = nextIsScrolled;
        setIsScrolled(nextIsScrolled);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const targetId = location.hash.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
          setActiveSection(targetId);
        }, 80);
      }
    } else if (location.pathname === "/" && !location.hash) {
      setActiveSection("home");
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      document.body.classList.add("navbar-mobile-open");

      return () => {
        document.body.style.overflow = originalStyle;
        document.body.classList.remove("navbar-mobile-open");
      };
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = useCallback(
    (e, sectionId) => {
      e.preventDefault();
      setIsMobileMenuOpen(false);

      if (location.pathname === "/") {
        if (sectionId === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          window.history.pushState(null, "", "/");
          setActiveSection("home");
        } else {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            window.history.pushState(null, "", `/#${sectionId}`);
            setActiveSection(sectionId);
          }
        }
      } else {
        navigate(`/#${sectionId}`);
      }
    },
    [location.pathname, navigate],
  );

  const isDark = theme === "dark";

  return (
    <motion.header
      className={`${styles["navbar"]} ${isScrolled ? styles["navbar--scrolled"] : ""}`}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
      <div className={styles["navbar__container"]}>
        {/* LEFT: LOGO */}
        <Link
          to="/"
          className={styles["navbar__logo"]}
          aria-label={t("nav.logoAria")}
          onClick={(e) => handleNavClick(e, "home")}>
          <motion.span
            className={styles["navbar__logo-text"]}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}>
            {t("nav.brand")}
          </motion.span>
          <span className={styles["navbar__logo-accent"]}></span>
        </Link>

        {/* CENTER: DESKTOP NAVIGATION */}
        <nav className={styles["navbar__nav"]} aria-label={t("nav.mainAria")}>
          <ul className={styles["navbar__links"]} role="list">
            {navItems.map((item) => {
              const isActive =
                location.pathname === "/" && activeSection === item.id;

              return (
                <li key={item.id} className={styles["navbar__link-item"]}>
                  <NavLink
                    to={`/#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`${styles["navbar__link"]} ${isActive ? styles["navbar__link--active"] : ""}`}
                    aria-current={isActive ? "page" : undefined}>
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active-indicator"
                        className={styles["navbar__link-indicator"]}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* RIGHT: ACTIONS */}
        <div className={styles["navbar__actions"]}>
          {/* Language Toggle */}
          <LanguageToggle />

          {/* Theme Toggle Button — Standard button (no motion) to respect CSS transitions */}
          <button
            type="button"
            className={styles["navbar__theme-toggle"]}
            onClick={toggleTheme}
            aria-label={isDark ? t("nav.themeToLight") : t("nav.themeToDark")}
            title={isDark ? t("nav.themeToLight") : t("nav.themeToDark")}>
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.span
                  key="sun"
                  className={styles["navbar__theme-toggle-icon"]}
                  initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  <Sun size={18} strokeWidth={2} />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  className={styles["navbar__theme-toggle-icon"]}
                  initial={{ rotate: 90, scale: 0.6, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: -90, scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  <Moon size={18} strokeWidth={2} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Contact CTA */}
          <motion.a
            href="#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className={styles["navbar__cta"]}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}>
            <span>{t("nav.cta")}</span>
            <ArrowUpRight className={styles["navbar__cta-icon"]} size={14} />
          </motion.a>

          {/* Mobile Menu Toggle Button */}
          <motion.button
            type="button"
            className={styles["navbar__mobile-toggle"]}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            aria-label={
              isMobileMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")
            }
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.15 }}>
            <AnimatePresence mode="wait" initial={false}>
              {isMobileMenuOpen ? (
                <motion.span
                  key="close"
                  className={styles["navbar__mobile-toggle-icon"]}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}>
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  className={styles["navbar__mobile-toggle-icon"]}
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}>
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* MOBILE MENU PANEL & BACKDROP */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className={styles["navbar__mobile-backdrop"]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Menu Panel */}
            <motion.div
              id="mobile-navigation-menu"
              className={styles["navbar__mobile-panel"]}
              role="dialog"
              aria-modal="true"
              aria-label={t("nav.mobileAria")}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
              <div className={styles["navbar__mobile-panel-inner"]}>
                <ul className={styles["navbar__mobile-links"]} role="list">
                  {navItems.map((item, idx) => {
                    const isActive =
                      location.pathname === "/" && activeSection === item.id;

                    return (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: idx * 0.04,
                          duration: 0.2,
                          ease: "easeOut",
                        }}>
                        <NavLink
                          to={`/#${item.id}`}
                          onClick={(e) => handleNavClick(e, item.id)}
                          className={`${styles["navbar__mobile-link"]} ${
                            isActive
                              ? styles["navbar__mobile-link--active"]
                              : ""
                          }`}
                          aria-current={isActive ? "page" : undefined}>
                          <span>{item.label}</span>
                          {isActive && (
                            <span
                              className={styles["navbar__mobile-link-dot"]}
                              aria-hidden="true"
                            />
                          )}
                        </NavLink>
                      </motion.li>
                    );
                  })}
                </ul>

                <div className={styles["navbar__mobile-footer"]}>
                  <motion.a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, "contact")}
                    className={styles["navbar__mobile-cta"]}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.24, duration: 0.2 }}>
                    <span>{t("nav.cta")}</span>
                    <ArrowUpRight size={16} />
                  </motion.a>

                  {/* Language toggle inside mobile panel */}
                  <div className={styles["navbar__mobile-lang"]}>
                    <LanguageToggle />
                  </div>

                  <div className={styles["navbar__mobile-meta"]}>
                    <span>{t("nav.metaRole")}</span>
                    <span>{t("nav.metaPortfolio")}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
