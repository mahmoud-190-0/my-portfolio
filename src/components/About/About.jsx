import React from "react";
import { motion } from "motion/react";
import { Trans, useTranslation } from "react-i18next";
import { MessageCircle, ArrowUpRight } from "lucide-react";
import styles from "./About.module.css";

export default function About() {
  const { t } = useTranslation();

  // CSS Module helper — allows using the original class names unchanged.
  const c = (name) => styles[name];

  return (
    <section
      id="about"
      className={c("about-section")}
      aria-label={t("about.heading")}>
      <div className={c("about__container")}>
        <div className={c("about__grid")}>
          {/* LEFT COLUMN: INTRODUCTION & WHATSAPP CTA */}
          <motion.div
            className={c("about__left")}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
            <div className={c("about__label")}>
              <span className={c("about__label-dot")} />
              <span>{t("about.label")}</span>
            </div>

            <h2 className={c("about__heading")}>{t("about.heading")}</h2>

            <p className={c("about__subheading")}>{t("about.subheading")}</p>

            <div className={c("about__text-group")}>
              <p className={c("about__paragraph")}>
                <Trans
                  i18nKey="about.paragraph1"
                  components={{ strong: <strong /> }}
                />
              </p>
              <p className={c("about__paragraph")}>{t("about.paragraph2")}</p>
            </div>

            <div className={c("about__cta-wrapper")}>
              <motion.a
                href={`https://wa.me/201032359670?text=${encodeURIComponent(
                  t("about.whatsappMessage"),
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={c("about__cta-btn")}
                aria-label={t("about.ctaAria")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}>
                <MessageCircle className={c("about__cta-icon-wa")} />
                <span>{t("about.cta")}</span>
                <ArrowUpRight className={c("about__cta-icon-arrow")} />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
