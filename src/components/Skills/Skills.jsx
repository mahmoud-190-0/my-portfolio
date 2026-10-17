import React, { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslation } from "react-i18next";
import { Monitor, Server, Database, GitBranch, Layers } from "lucide-react";
import styles from "./Skills.module.css";

// Static metadata: order, icon, and i18n key prefix.
// All display text is resolved via `t()` per render.
const SKILL_META = [
  { number: "01", icon: Monitor, i18nKey: "frontEnd" },
  { number: "02", icon: Server, i18nKey: "backEnd" },
  { number: "03", icon: Database, i18nKey: "database" },
  { number: "04", icon: GitBranch, i18nKey: "tools" },
  { number: "05", icon: Layers, i18nKey: "integration" },
];

export default function SkillsSection() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  // Build the localized skill categories once per language.
  const skillCategories = useMemo(
    () =>
      SKILL_META.map(({ number, icon, i18nKey }) => {
        const techKeys = ["0", "1", "2", "3", "4"];
        // Filter out missing translation keys (some categories have <5 items).
        const technologies = techKeys
          .map((k) => t(`skills.items.${i18nKey}.technologies.${k}`, ""))
          .filter(Boolean);

        return {
          number,
          icon,
          title: t(`skills.items.${i18nKey}.title`),
          description: t(`skills.items.${i18nKey}.description`),
          technologies,
        };
      }),
    [t],
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
  };

  const rowVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.45,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id="skills"
      className={styles["skills-section"]}
      aria-labelledby="skills-heading">
      <div className="container">
        {/* Section Header */}
        <div className={styles["skills-header-wrap"]}>
          <div className={styles["skills-header-content"]}>
            <div className={styles["skills-kicker"]}>
              <span
                className={styles["skills-kicker-dot"]}
                aria-hidden="true"
              />
              <span>{t("skills.kicker")}</span>
            </div>
            <h2 id="skills-heading" className={styles["skills-title"]}>
              {t("skills.heading")}
            </h2>
            <p className={styles["skills-description"]}>
              {t("skills.description")}
            </p>
          </div>
        </div>

        {/* Cardless Editorial Ledger */}
        <motion.div
          className={styles["skills-ledger"]}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}>
          {skillCategories.map((cat) => {
            const IconComponent = cat.icon;

            return (
              <motion.article
                key={cat.number}
                className={styles["skill-row"]}
                variants={rowVariants}
                tabIndex={0}
                aria-labelledby={`skill-row-title-${cat.number}`}>
                {/* 1. Category Identity: Number, Icon, Title */}
                <div className={styles["skill-identity-col"]}>
                  <div className={styles["skill-index-row"]}>
                    <span className={styles["skill-index-num"]}>
                      {cat.number}
                    </span>
                    <span
                      className={styles["skill-index-icon"]}
                      aria-hidden="true">
                      <IconComponent size={18} strokeWidth={2} />
                    </span>
                  </div>
                  <h3
                    id={`skill-row-title-${cat.number}`}
                    className={styles["skill-row-title"]}>
                    {cat.title}
                  </h3>
                </div>

                {/* 2. Narrative Description */}
                <div className={styles["skill-narrative-col"]}>
                  <p className={styles["skill-row-desc"]}>{cat.description}</p>
                </div>

                {/* 3. Tech Stack Tags */}
                <div className={styles["skill-tech-col"]}>
                  <span className={styles["skill-tech-col-label"]}>
                    {t("skills.technologiesLabel")}
                  </span>
                  <div
                    className={styles["skill-tags-group"]}
                    aria-label={t("skills.technologiesAria", {
                      title: cat.title,
                    })}>
                    {cat.technologies.map((tech) => (
                      <span key={tech} className={styles["skill-tag"]}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
