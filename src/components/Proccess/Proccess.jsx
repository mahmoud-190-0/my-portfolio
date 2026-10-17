import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useTranslation } from "react-i18next";
import {
  Compass,
  Layers,
  Palette,
  Code2,
  CheckCircle2,
  Rocket,
  Check,
  ArrowRight,
  Pause,
  Play,
} from "lucide-react";
import styles from "./Process.module.css";

const AUTO_PLAY_INTERVAL = 9500;

// Icons + ids are static; text comes from i18n on every render.
const STEP_ICONS = {
  "step-1": Compass,
  "step-2": Layers,
  "step-3": Palette,
  "step-4": Code2,
  "step-5": CheckCircle2,
  "step-6": Rocket,
};

const STEP_IDS = ["step-1", "step-2", "step-3", "step-4", "step-5", "step-6"];

export default function ProcessSection() {
  const { t } = useTranslation();
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const stepperTrackRef = useRef(null);
  const sectionRef = useRef(null);

  // Build the localized steps array once per language change.
  const processSteps = useMemo(
    () =>
      STEP_IDS.map((id, index) => {
        const stepNumber = String(index + 1);
        return {
          id,
          stepNumber,
          phaseLabel: t("process.steps.phaseLabel", { number: stepNumber }),
          tabLabel: t(`process.steps.${index + 1}.tabLabel`),
          title: t(`process.steps.${index + 1}.title`),
          icon: STEP_ICONS[id],
          description: t(`process.steps.${index + 1}.description`),
          deliverables: [
            t(`process.steps.${index + 1}.deliverables.0`),
            t(`process.steps.${index + 1}.deliverables.1`),
            t(`process.steps.${index + 1}.deliverables.2`),
            t(`process.steps.${index + 1}.deliverables.3`),
            t(`process.steps.${index + 1}.deliverables.4`),
          ],
          showcase: {
            icon: STEP_ICONS[id],
            title: t(`process.steps.${index + 1}.title`),
            description: t(`process.steps.${index + 1}.description`),
          },
        };
      }),
    [t],
  );

  const activeStep = processSteps[activeStepIndex];
  const StepIcon = activeStep.icon;
  const ShowcaseIcon = activeStep.showcase.icon;

  const progressPercent =
    processSteps.length > 1
      ? (activeStepIndex / (processSteps.length - 1)) * 100
      : 100;

  const goToNextPhase = useCallback(() => {
    setActiveStepIndex((prev) => (prev + 1) % processSteps.length);
  }, [processSteps.length]);

  // Watch the section: start auto-advance only when it enters the viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Auto-advance ONLY when in view AND not paused
  useEffect(() => {
    if (!isInView || isPaused || shouldReduceMotion) return;

    const timer = setInterval(() => {
      goToNextPhase();
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [isInView, isPaused, shouldReduceMotion, goToNextPhase]);

  const handleKeyDown = (e, index) => {
    let nextIndex = index;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (index + 1) % processSteps.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (index - 1 + processSteps.length) % processSteps.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = processSteps.length - 1;
    }

    if (nextIndex !== index) {
      setActiveStepIndex(nextIndex);
      const buttons = stepperTrackRef.current?.querySelectorAll('[role="tab"]');
      if (buttons && buttons[nextIndex]) {
        buttons[nextIndex].focus();
      }
    }
  };

  const getNodeStateClass = (isCompleted, isActive) => {
    if (isCompleted) return styles.processStepperNodeCompleted;
    if (isActive) return styles.processStepperNodeActive;
    return styles.processStepperNodeUpcoming;
  };

  return (
    <section
      id="process"
      ref={sectionRef}
      className={styles.processSection}
      aria-labelledby="process-heading">
      {/* Animated aurora gradient background */}
      <div className={styles.processAnimatedGradient} aria-hidden="true">
        <div className={`${styles.processGradientOrb} ${styles.processOrb1}`} />
        <div className={`${styles.processGradientOrb} ${styles.processOrb2}`} />
        <div className={`${styles.processGradientOrb} ${styles.processOrb3}`} />
        <div className={styles.processGradientMesh} />
      </div>

      <div className="container">
        {/* Section Header */}
        <div className={styles.processHeader}>
          <div className={styles.processEyebrow}>
            <span className={styles.processEyebrowDot} aria-hidden="true" />
            <span>{t("process.eyebrow")}</span>
          </div>
          <h2 id="process-heading" className={styles.processTitle}>
            {t("process.titlePrefix")}{" "}
            <span className={styles.processTitleHighlight}>
              {t("process.titleHighlight")}
            </span>
          </h2>
          <p className={styles.processDescription}>
            {t("process.description")}
          </p>
        </div>

        {/* Interactive Stepper Navigation Bar */}
        <div
          className={styles.processStepperContainer}
          aria-label={t("process.stepperAria")}>
          <div
            className={styles.processStepperTrack}
            ref={stepperTrackRef}
            role="tablist">
            <div className={styles.processStepperRail} aria-hidden="true">
              <div
                className={styles.processStepperRailProgress}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {processSteps.map((step, index) => {
              const isCompleted = index < activeStepIndex;
              const isActive = index === activeStepIndex;

              const stateSuffix = isActive
                ? t("process.stateCurrent")
                : isCompleted
                  ? t("process.stateCompleted")
                  : "";

              return (
                <button
                  key={step.id}
                  type="button"
                  role="tab"
                  id={`process-tab-${index}`}
                  aria-selected={isActive}
                  aria-controls={`process-panel-${index}`}
                  tabIndex={isActive ? 0 : -1}
                  className={`${styles.processStepperNode} ${getNodeStateClass(
                    isCompleted,
                    isActive,
                  )}`}
                  onClick={() => setActiveStepIndex(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  aria-label={`${step.tabLabel}${stateSuffix}`}>
                  <div
                    className={styles.processStepperCircle}
                    aria-hidden="true">
                    {isCompleted ? (
                      <span className={styles.processStepperCircleCompleted}>
                        <Check size={16} strokeWidth={2.5} />
                      </span>
                    ) : (
                      <span>{step.stepNumber}</span>
                    )}
                  </div>
                  <span className={styles.processStepperLabel}>
                    {step.tabLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Detail Content Grid */}
        <div
          id={`process-panel-${activeStepIndex}`}
          role="tabpanel"
          aria-labelledby={`process-tab-${activeStepIndex}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.id}
              className={styles.processContentGrid}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
              transition={{
                duration: shouldReduceMotion ? 0.01 : 0.3,
                ease: "easeOut",
              }}>
              {/* Left Column */}
              <div className={styles.processLeftCol}>
                <div className={styles.processStepBadgeRow}>
                  <div className={styles.processStepIconBox} aria-hidden="true">
                    <StepIcon size={24} strokeWidth={2} />
                  </div>
                  <div className={styles.processStepMeta}>
                    <span className={styles.processStepNumber}>
                      {activeStep.phaseLabel}
                    </span>
                    <h3 className={styles.processStepTitle}>
                      {activeStep.title}
                    </h3>
                  </div>
                </div>

                <p className={styles.processStepDesc}>
                  {activeStep.description}
                </p>

                <div
                  className={styles.processChecklist}
                  aria-label={t("process.deliverablesAria")}>
                  {activeStep.deliverables.map((item, idx) => (
                    <div key={idx} className={styles.processChecklistItem}>
                      <span
                        className={styles.processChecklistChevron}
                        aria-hidden="true">
                        ›
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Actions Row */}
                <div className={styles.processActionsRow}>
                  <button
                    type="button"
                    onClick={goToNextPhase}
                    className={styles.processNextBtn}
                    aria-label={t("process.nextAria", {
                      number: ((activeStepIndex + 1) % processSteps.length) + 1,
                    })}>
                    <span>{t("process.nextLabel")}</span>
                    <ArrowRight size={15} />
                  </button>

                  <div
                    className={styles.processPlaybackIndicator}
                    aria-live="polite">
                    <button
                      type="button"
                      onClick={() => setIsPaused((prev) => !prev)}
                      className={styles.processPlaybackBtn}
                      title={
                        isPaused
                          ? t("process.playback.resumeTitle")
                          : t("process.playback.pauseTitle")
                      }
                      aria-label={
                        isPaused
                          ? t("process.playback.resumeTitle")
                          : t("process.playback.pauseTitle")
                      }>
                      {isPaused ? <Play size={12} /> : <Pause size={12} />}
                      <span>
                        {isPaused
                          ? t("process.playback.paused")
                          : t("process.playback.autoAdvancing")}
                      </span>
                    </button>
                    {!isPaused && !shouldReduceMotion && isInView && (
                      <div className={styles.processPlaybackBarTrack}>
                        <div
                          key={activeStepIndex}
                          className={styles.processPlaybackBarFill}
                          style={{
                            animationDuration: `${AUTO_PLAY_INTERVAL}ms`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Showcase Card */}
              <div className={styles.processShowcaseCard}>
                <div
                  className={styles.processShowcaseIconCircle}
                  aria-hidden="true">
                  <ShowcaseIcon size={26} strokeWidth={2} />
                </div>
                <h4 className={styles.processShowcaseTitle}>
                  {activeStep.showcase.title}
                </h4>
                <p className={styles.processShowcaseDesc}>
                  {activeStep.showcase.description}
                </p>

                <div className={styles.processWatermarkBox} aria-hidden="true">
                  <span className={styles.processWatermarkNumber}>
                    {activeStep.stepNumber}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
