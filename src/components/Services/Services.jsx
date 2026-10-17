import React, { useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import {
  Package,
  Globe,
  Zap,
  Folder,
  PenTool,
  BookOpen,
  Award,
  Code2,
  ArrowRight,
  X,
  CheckCircle2,
} from "lucide-react";
import styles from "./Services.module.css";

// Static service metadata: id + color + icon + i18n key prefix.
// All display text is resolved via `t()` per render.
const SERVICES_META = [
  { id: "web-dev", colorKey: "emerald", icon: Code2, i18nKey: "webDev" },
  {
    id: "product-management",
    colorKey: "yellow",
    icon: Package,
    i18nKey: "productManagement",
  },
  {
    id: "seo-optimization",
    colorKey: "blue",
    icon: Globe,
    i18nKey: "seoOptimization",
  },
  {
    id: "speed-optimization",
    colorKey: "cyan",
    icon: Zap,
    i18nKey: "speedOptimization",
  },
  {
    id: "content-management",
    colorKey: "purple",
    icon: Folder,
    i18nKey: "contentManagement",
  },
  { id: "blog-setup", colorKey: "coral", icon: PenTool, i18nKey: "blogSetup" },
  {
    id: "cms-training",
    colorKey: "rose",
    icon: BookOpen,
    i18nKey: "cmsTraining",
  },
  { id: "branding", colorKey: "indigo", icon: Award, i18nKey: "branding" },
];

export default function Services() {
  const { t } = useTranslation();
  const trackRef = useRef(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  // Build the localized services array on language change
  const servicesData = useMemo(
    () =>
      SERVICES_META.map(({ id, colorKey, icon, i18nKey }) => ({
        id,
        colorKey,
        icon,
        title: t(`services.items.${i18nKey}.title`),
        description: t(`services.items.${i18nKey}.description`),
        longDescription: t(`services.items.${i18nKey}.longDescription`),
        deliverables: [
          t(`services.items.${i18nKey}.deliverables.0`),
          t(`services.items.${i18nKey}.deliverables.1`),
          t(`services.items.${i18nKey}.deliverables.2`),
          t(`services.items.${i18nKey}.deliverables.3`),
        ],
      })),
    [t],
  );

  const duplicatedServices = [...servicesData, ...servicesData];

  // Helper to compose the color-variant class dynamically
  const colorClass = (colorKey) =>
    styles[
      `serviceCard${colorKey.charAt(0).toUpperCase() + colorKey.slice(1)}`
    ];

  return (
    <section
      id="services"
      className={styles.servicesSection}
      aria-labelledby="services-heading">
      {/* Background ambient radiance */}
      <div className={styles.servicesAmbientGlow} aria-hidden="true" />

      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.servicesHeader}>
          <div className={styles.servicesEyebrow}>
            <span>{t("services.eyebrow")}</span>
          </div>

          <h2 id="services-heading" className={styles.servicesTitle}>
            <span className={styles.servicesTitleHighlight}>
              {t("services.titleHighlight")}
            </span>{" "}
          </h2>

          <p className={styles.servicesDescription}>
            {t("services.description")}
          </p>
        </div>
      </div>

      {/* Services Marquee Carousel */}
      <div className={styles.servicesCarouselWrapper}>
        <div
          ref={trackRef}
          className={`${styles.servicesScrollTrack} ${
            isPaused ? styles.servicesScrollTrackPaused : ""
          }`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-label={t("services.carouselAria")}>
          {duplicatedServices.map((service, index) => {
            const Icon = service.icon;
            const isDuplicate = index >= servicesData.length;

            return (
              <div
                onClick={() => setSelectedService(service)}
                key={`${service.id}-${index}`}
                className={`${styles.serviceCard} ${colorClass(
                  service.colorKey,
                )}`}
                aria-hidden={isDuplicate ? "true" : undefined}>
                <div className={styles.serviceCardIconBox} aria-hidden="true">
                  <Icon size={20} strokeWidth={2} />
                </div>

                <h3 className={styles.serviceCardTitle}>{service.title}</h3>

                <p className={styles.serviceCardDescription}>
                  {service.description}
                </p>

                <button
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className={styles.serviceLearnMoreBtn}
                  aria-haspopup="dialog"
                  aria-label={t("services.learnMoreAria", {
                    title: service.title,
                  })}
                  tabIndex={isDuplicate ? -1 : 0}>
                  <span>{t("services.learnMore")}</span>
                  <ArrowRight
                    size={14}
                    className={styles.serviceLearnMoreArrow}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal / Dialog for Detailed Service View */}
      <AnimatePresence>
        {selectedService && (
          <div
            className={styles.serviceModalBackdrop}
            onClick={() => setSelectedService(null)}
            role="presentation">
            <motion.div
              className={`${styles.serviceModalContent} ${colorClass(
                selectedService.colorKey,
              )}`}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-service-title">
              <button
                type="button"
                className={styles.serviceModalClose}
                onClick={() => setSelectedService(null)}
                aria-label={t("services.modalCloseAria")}>
                <X size={20} />
              </button>

              <div className={styles.serviceModalHeader}>
                <div className={styles.serviceCardIconBox} aria-hidden="true">
                  {React.createElement(selectedService.icon, {
                    size: 24,
                    strokeWidth: 2,
                  })}
                </div>
                <div>
                  <span className={styles.serviceModalEyebrow}>
                    {t("services.modalEyebrow")}
                  </span>
                  <h3
                    id="modal-service-title"
                    className={styles.serviceModalTitle}>
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              <p className={styles.serviceModalDescription}>
                {selectedService.longDescription}
              </p>

              <div className={styles.serviceModalDeliverables}>
                <h4 className={styles.serviceModalDeliverablesTitle}>
                  {t("services.modalDeliverablesTitle")}
                </h4>
                <ul className={styles.serviceModalList}>
                  {selectedService.deliverables.map((item, index) => (
                    <li key={index} className={styles.serviceModalListItem}>
                      <CheckCircle2
                        size={16}
                        className={styles.serviceModalCheck}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.serviceModalFooter}>
                <a
                  href="#contact"
                  className={styles.serviceModalCta}
                  onClick={() => setSelectedService(null)}>
                  <span>{t("services.modalRequest")}</span>
                  <ArrowRight size={16} />
                </a>
                <button
                  type="button"
                  className={styles.serviceModalCancel}
                  onClick={() => setSelectedService(null)}>
                  {t("services.modalCancel")}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
