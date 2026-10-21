import React from "react";
import { ArrowRight } from "lucide-react";
import {
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";

import styles from "./Footer.module.css";

// Inlined footer copy (formerly in the translation file)
const FOOTER = {
  name: "Mahmoud Ahmed",
  tagline: "Full Stack Developer & Software Developer",
  stack: "Next.js | React | Python | Node.js | PHP | WordPress | Shopify",
  bio: "Open to freelance projects, long term collaborations, and remote opportunities globally.",
  hireCta: "HIRE ME NOW",
  hireMessage: "Hello Mahmoud, I saw your portfolio and would like to connect!",
  copyrightSuffix: "ALL RIGHTS RESERVED.",
  social: {
    linkedinAria: "LinkedIn Profile",
    linkedinTitle: "LinkedIn",
    githubAria: "GitHub Profile",
    githubTitle: "GitHub",
    facebookAria: "Facebook Profile",
    facebookTitle: "Facebook",
    xAria: "X (formerly Twitter) Profile",
    xTitle: "X (Twitter)",
    youtubeAria: "YouTube Channel",
    youtubeTitle: "YouTube",
    instagramAria: "Instagram Profile",
    instagramTitle: "Instagram",
    whatsappAria: "WhatsApp Chat",
    whatsappTitle: "WhatsApp",
  },
};

export default function Footer({ phone = "01032359670" }) {
  // CSS Module helper — allows using the original class names unchanged.
  const c = (name) => styles[name];

  const {
    name,
    tagline,
    stack,
    bio,
    hireCta,
    hireMessage,
    copyrightSuffix,
    social,
  } = FOOTER;

  // الحل الجذري: تنظيف النص يدوياً بدون استخدام encodeURIComponent
  const safeHireMessage = hireMessage
    .replace(/ /g, "%20")
    .replace(/,/g, "%2C")
    .replace(/!/g, "%21")
    .replace(/\?/g, "%3F");

  const scrollToContact = (e) => {
    // e.preventDefault(); // تم إيقافه لكي يفتح رابط الواتساب
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className={c("custom-footer-section")}>
      <div className={c("custom-footer-container")}>
        {/* Main Floating Rounded Footer Card */}
        <div className={c("custom-footer-card")}>
          {/* Internal ambient glowing mesh */}
          <div className={c("custom-footer-aura")} aria-hidden="true" />

          <div className={c("custom-footer-card-inner")}>
            {/* Brand Logo & Name */}
            <div className={c("custom-footer-brand")}>
              <div className={c("custom-footer-logo-badge")}>
                <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="#ff7a18"
                    strokeWidth="2"
                    strokeDasharray="60 20"
                  />
                  <path
                    d="M8 22V10L13 16L18 10V22"
                    stroke="#ff9a3d"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 22L23 10L26 22"
                    stroke="#f97316"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21.2 18H24.8"
                    stroke="#f97316"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className={c("custom-footer-brand-name")}>{name}</span>
            </div>

            {/* Profession Title */}
            <h3 className={c("custom-footer-role")}>{tagline}</h3>

            {/* Orange Tech Stack Subheading */}
            <div className={c("custom-footer-stack")}>{stack}</div>

            {/* Availability / Bio */}
            <p className={c("custom-footer-bio")}>{bio}</p>

            {/* Minimal Social Media Actions Row */}
            <div className={c("custom-footer-actions-row")}>
              <div className={c("custom-social-group")}>
                <a
                  href="https://www.linkedin.com/in/mahmoud-ahmed-ali-3aba31277?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${c("custom-social-btn")} ${c("custom-social-linkedin")}`}
                  aria-label={social.linkedinAria}
                  title={social.linkedinTitle}>
                  <FaLinkedin size={18} />
                </a>

                <a
                  href="https://github.com/mahmoud-190-0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${c("custom-social-btn")} ${c("custom-social-github")}`}
                  aria-label={social.githubAria}
                  title={social.githubTitle}>
                  <FaGithub size={18} />
                </a>

                <a
                  href="https://www.facebook.com/share/1F5H2TM9eb/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${c("custom-social-btn")} ${c("custom-social-facebook")}`}
                  aria-label={social.facebookAria}
                  title={social.facebookTitle}>
                  <FaFacebook size={18} />
                </a>

                <a
                  // href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${c("custom-social-btn")} ${c("custom-social-x")}`}
                  aria-label={social.xAria}
                  title={social.xTitle}>
                  <FaTwitter size={17} />
                </a>

                <a
                  // href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${c("custom-social-btn")} ${c("custom-social-youtube")}`}
                  aria-label={social.youtubeAria}
                  title={social.youtubeTitle}>
                  <FaYoutube size={18} />
                </a>

                <a
                  href="https://www.instagram.com/ma7moud_193/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${c("custom-social-btn")} ${c("custom-social-instagram")}`}
                  aria-label={social.instagramAria}
                  title={social.instagramTitle}>
                  <FaInstagram size={18} />
                </a>

                <a
                  href={`https://wa.me/20${phone.replace(/^0+/, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${c("custom-social-btn")} ${c("custom-social-whatsapp")}`}
                  aria-label={social.whatsappAria}
                  title={social.whatsappTitle}>
                  <FaWhatsapp size={18} />
                </a>
              </div>
            </div>

            {/* Primary CTA: HIRE ME NOW */}
            <div className={c("custom-footer-cta-wrap")}>
              <a
                href={`https://wa.me/201032359670?text=${safeHireMessage}`}
                onClick={scrollToContact}
                target="_blank"
                rel="noopener noreferrer"
                className={c("custom-hire-btn")}>
                <span>{hireCta}</span>

                <ArrowRight size={17} className={"custom-hire-arrow"} />
              </a>
            </div>
          </div>
        </div>

        {/* Glowing Horizon Line & Copyright */}
        <div className={c("custom-footer-bottom")}>
          <div className={c("custom-footer-glow-line")} aria-hidden="true" />
          <p className={c("custom-footer-copyright")}>
            © {new Date().getFullYear()} {name.toUpperCase()}. {copyrightSuffix}
          </p>
        </div>
      </div>
    </footer>
  );
}
