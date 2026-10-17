import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import defaultProfileImg from "../../assets/images/profile.jpg";
import styles from "./Hero.module.css";

export default function Hero() {
  const { t } = useTranslation();

  const config = {
    greeting: t("hero.greeting"),
    name: t("hero.name"),
    intro: t("hero.intro"),
    ctaText: t("hero.ctaText"),
    ctaTarget: "contact",
    location: {
      label: t("hero.location.label"),
      value: t("hero.location.value"),
    },
    badge: {
      line1: t("hero.badge.line1"),
      line2: t("hero.badge.line2"),
    },
    infoBlocks: [
      { label: t("hero.info.coreLabel"), value: t("hero.info.coreValue") },
      { label: t("hero.info.expLabel"), value: t("hero.info.expValue") },
    ],
  };

  const handleCtaClick = (e) => {
    e.preventDefault();
    const contactElement = document.getElementById(config.ctaTarget);
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${config.ctaTarget}`);
    }
  };

  return (
    <section id="home" className={styles.hero} aria-label={t("hero.ariaLabel")}>
      <div className={styles.heroContainer}>
        <div className={styles.heroGrid}>
          {/* LEFT COLUMN: INTRODUCTION & ACTIONS */}
          <motion.div
            className={styles.heroIntro}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
            <h1 className={styles.heroHeadline}>
              {config.greeting}{" "}
              <span className={styles.heroHeadlineAccent}>{config.name}</span>
            </h1>

            <p className={styles.heroBio}>{config.intro}</p>

            <div className={styles.heroActionsRow}>
              <motion.a
                href={`https://wa.me/201032359670?text=${encodeURIComponent(
                  t("hero.whatsappMessage"),
                )}`}
                onClick={handleCtaClick}
                className={styles.heroCtaBtn}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}>
                <span>{config.ctaText}</span>
                <ArrowUpRight className={styles.heroCtaIcon} size={16} />
              </motion.a>

              <div className={styles.heroLocationBlock}>
                <span className={styles.heroLocationLabel}>
                  {config.location.label}
                </span>
                <span className={styles.heroLocationValue}>
                  <MapPin size={15} />
                  <span>{config.location.value}</span>
                </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: CIRCULAR PROFILE IMAGE & FLOATING BADGE */}
          <motion.div
            className={styles.heroProfileCol}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.55,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}>
            <div className={styles.heroAvatarContainer}>
              <div className={styles.heroAvatarFrame}>
                <div className={styles.heroAvatarInner}>
                  <img
                    src={defaultProfileImg}
                    alt={t("hero.avatarAlt", { name: config.name })}
                    className={styles.heroAvatarImg}
                    loading="eager"
                    onError={(e) => {
                      e.currentTarget.src = defaultProfileImg;
                    }}
                  />
                </div>
              </div>

              {/* Floating Circular Badge */}
              <motion.div
                className={styles.heroFloatingBadge}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.45,
                  delay: 0.25,
                  ease: [0.16, 1, 0.3, 1],
                }}>
                <span className={styles.heroBadgeTextTop}>
                  {config.badge.line1}
                </span>
                <span className={styles.heroBadgeTextBottom}>
                  {config.badge.line2}
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM HORIZONTAL INFORMATION STRIP */}
        <motion.div
          className={styles.heroInfoStrip}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
          {config.infoBlocks.map((block, index) => (
            <div key={index} className={styles.heroInfoBlock}>
              <span className={styles.heroInfoLabel}>{block.label}</span>
              <span className={styles.heroInfoValue}>{block.value}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
