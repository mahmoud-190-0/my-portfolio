import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Check,
  Copy,
  ExternalLink,
  Sparkles,
  MessageSquare,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import styles from "./Contact.module.css";

export default function Contact() {
  const { t } = useTranslation();

  // CSS Module helper — allows using the original kebab-case class names.
  const c = (name) => styles[name];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [copiedType, setCopiedType] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  const contactInfo = {
    name: "Mahmoud Ahmed",
    role: "Full Stack Developer",
    email: "mfy1511@gmail.com",
    phone: "01032359670",
    formattedPhone: "+20 103 235 9670",
    location: t("contact.info.location"),
    responseTime: t("contact.info.responseTime"),
  };

  const handleCopy = (text, type) => {
    navigator.clipboard?.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError) setFormError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setFormError(t("contact.form.errorRequired"));
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email.trim())) {
      setFormError(t("contact.form.errorEmail"));
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 900);
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
    setSubmitSuccess(false);
    setFormError("");
  };

  const mailtoLink = `mailto:${contactInfo.email}?subject=${encodeURIComponent(
    formData.subject || t("contact.mailto.defaultSubject"),
  )}&body=${encodeURIComponent(
    t("contact.mailto.body", {
      message: formData.message,
      name: formData.name,
      email: formData.email,
    }),
  )}`;

  return (
    <section id="contact" className={c("contact-section")}>
      {/* Background ambient lighting effects */}
      <div
        className={`${c("contact-ambient-glow")} ${c("contact-ambient-glow-left")}`}
        aria-hidden="true"
      />
      <div
        className={`${c("contact-ambient-glow")} ${c("contact-ambient-glow-right")}`}
        aria-hidden="true"
      />

      <div className={c("contact-container")}>
        <div className={c("contact-grid")}>
          {/* LEFT COLUMN: Header & Contact Info Cards */}
          <div className={c("contact-left-col")}>
            <div className={c("contact-eyebrow")}>
              <span className={c("contact-eyebrow-dot")} />
              <span>{t("contact.eyebrow")}</span>
            </div>

            <h2 className={c("contact-heading")}>
              {t("contact.headingPrefix")}{" "}
              <span className={c("contact-gradient-text")}>
                {t("contact.headingHighlight")}
              </span>
            </h2>

            <p className={c("contact-description")}>
              {t("contact.description")}
            </p>

            <div className={c("contact-status-badge")}>
              <span className={c("contact-status-indicator")}>
                <span className={c("contact-status-pulse")} />
                <span className={c("contact-status-point")} />
              </span>
              <div className={c("contact-status-text")}>
                <span className={c("contact-status-title")}>
                  {t("contact.status.title")}
                </span>
                <span className={c("contact-status-desc")}>
                  {t("contact.status.desc")}
                </span>
              </div>
            </div>

            <div className={c("contact-cards-list")}>
              {/* Email */}
              <div className={c("contact-info-card")}>
                <div className={c("contact-info-icon-box")}>
                  <Mail size={20} className={c("contact-info-icon")} />
                </div>
                <div className={c("contact-info-content")}>
                  <span className={c("contact-info-label")}>
                    {t("contact.info.emailLabel")}
                  </span>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className={`${c("contact-info-value")} ${c("contact-info-link")}`}
                    title={t("contact.info.emailTitle", {
                      email: contactInfo.email,
                    })}>
                    {contactInfo.email}
                  </a>
                </div>
                <button
                  type="button"
                  className={c("contact-action-btn")}
                  onClick={() => handleCopy(contactInfo.email, "email")}
                  aria-label={t("contact.info.copyEmailAria")}
                  title={t("contact.info.copyEmailTitle")}>
                  {copiedType === "email" ? (
                    <span className={c("copied-tag")}>
                      <Check size={14} /> {t("contact.copied")}
                    </span>
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>

              {/* Phone */}
              <div className={c("contact-info-card")}>
                <div className={c("contact-info-icon-box")}>
                  <Phone size={20} className={c("contact-info-icon")} />
                </div>
                <div className={c("contact-info-content")}>
                  <span className={c("contact-info-label")}>
                    {t("contact.info.phoneLabel")}
                  </span>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className={`${c("contact-info-value")} ${c("contact-info-link")}`}
                    title={t("contact.info.phoneTitle", {
                      phone: contactInfo.phone,
                    })}>
                    {contactInfo.phone}
                  </a>
                </div>
                <button
                  type="button"
                  className={c("contact-action-btn")}
                  onClick={() => handleCopy(contactInfo.phone, "phone")}
                  aria-label={t("contact.info.copyPhoneAria")}
                  title={t("contact.info.copyPhoneTitle")}>
                  {copiedType === "phone" ? (
                    <span className={c("copied-tag")}>
                      <Check size={14} /> {t("contact.copied")}
                    </span>
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>

              {/* Location */}
              <div className={c("contact-info-card")}>
                <div className={c("contact-info-icon-box")}>
                  <MapPin size={20} className={c("contact-info-icon")} />
                </div>
                <div className={c("contact-info-content")}>
                  <span className={c("contact-info-label")}>
                    {t("contact.info.locationLabel")}
                  </span>
                  <span className={c("contact-info-value")}>
                    {contactInfo.location}
                  </span>
                </div>
                <div className={c("contact-info-meta-tag")}>
                  {t("contact.info.country")}
                </div>
              </div>
            </div>

            <div className={c("contact-channels")}>
              <span className={c("contact-channels-label")}>
                {t("contact.channels.label")}
              </span>
              <div className={c("contact-channels-group")}>
                <a
                  href={`https://wa.me/201032359670?text=${encodeURIComponent(
                    t("contact.whatsappMessage"),
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={c("contact-channel-pill")}>
                  <MessageSquare size={14} />
                  <span>{t("contact.channels.whatsapp")}</span>
                  <ExternalLink size={12} />
                </a>

                <a
                  href={`mailto:${contactInfo.email}`}
                  className={c("contact-channel-pill")}>
                  <Mail size={14} />
                  <span>{t("contact.channels.mailto")}</span>
                  <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Form Card */}
          <div className={c("contact-right-col")}>
            <div className={c("contact-form-card")}>
              <div className={c("contact-form-header")}>
                <div className={c("contact-form-title-group")}>
                  <span className={c("contact-form-icon-wrap")}>
                    <Mail size={17} />
                  </span>
                  <span className={c("contact-form-title")}>
                    {t("contact.form.title")}
                  </span>
                </div>

                <div className={c("contact-form-response-badge")}>
                  <Clock size={13} />
                  <span>{contactInfo.responseTime}</span>
                </div>
              </div>

              <div className={c("contact-form-meta-bar")}>
                <div className={c("contact-form-meta-item")}>
                  <span className={c("meta-label")}>
                    {t("contact.form.metaTo")}
                  </span>
                  <span className={c("meta-value")}>{contactInfo.email}</span>
                </div>
                <div className={c("contact-form-meta-item")}>
                  <span className={c("meta-label")}>
                    {t("contact.form.metaStatus")}
                  </span>
                  <span className={c("meta-status-active")}>
                    <span className={c("meta-status-dot")} />{" "}
                    {t("contact.form.metaReady")}
                  </span>
                </div>
              </div>

              {submitSuccess ? (
                <div className={c("contact-success-state")}>
                  <div className={c("contact-success-icon-wrap")}>
                    <CheckCircle2 size={44} />
                  </div>
                  <h3 className={c("contact-success-title")}>
                    {t("contact.success.title")}
                  </h3>
                  <p className={c("contact-success-desc")}>
                    {t("contact.success.descPrefix")}{" "}
                    <strong>{formData.name}</strong>
                    {t("contact.success.descMiddle")}{" "}
                    <strong>{formData.email}</strong>{" "}
                    {t("contact.success.descSuffix")}
                  </p>
                  <div className={c("contact-success-actions")}>
                    <a
                      href={mailtoLink}
                      className={c("contact-submit-btn")}
                      style={{ textDecoration: "none" }}>
                      <Mail size={16} />
                      <span>{t("contact.success.openEmail")}</span>
                    </a>
                    <button
                      type="button"
                      className={c("contact-reset-btn")}
                      onClick={handleReset}>
                      {t("contact.success.sendAnother")}
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  className={c("contact-form")}
                  onSubmit={handleSubmit}
                  noValidate>
                  {formError && (
                    <div className={c("contact-form-error")} role="alert">
                      {formError}
                    </div>
                  )}

                  <div className={c("contact-form-row")}>
                    <div className={c("contact-field-group")}>
                      <label
                        htmlFor="contact-name"
                        className={c("contact-field-label")}>
                        {t("contact.form.nameLabel")}{" "}
                        <span className={c("required-star")}>*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={c("contact-input")}
                        placeholder={t("contact.form.namePlaceholder")}
                        required
                      />
                    </div>

                    <div className={c("contact-field-group")}>
                      <label
                        htmlFor="contact-email"
                        className={c("contact-field-label")}>
                        {t("contact.form.emailLabel")}{" "}
                        <span className={c("required-star")}>*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t("contact.form.emailPlaceholder")}
                        className={c("contact-input")}
                        required
                      />
                    </div>
                  </div>

                  <div className={c("contact-field-group")}>
                    <label
                      htmlFor="contact-subject"
                      className={c("contact-field-label")}>
                      {t("contact.form.subjectLabel")}
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={t("contact.form.subjectPlaceholder")}
                      className={c("contact-input")}
                    />
                  </div>

                  <div className={c("contact-field-group")}>
                    <label
                      htmlFor="contact-message"
                      className={c("contact-field-label")}>
                      {t("contact.form.messageLabel")}{" "}
                      <span className={c("required-star")}>*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t("contact.form.messagePlaceholder")}
                      rows={5}
                      className={c("contact-textarea")}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className={c("contact-submit-btn")}
                    disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className={c("contact-btn-spinner")} />
                        <span>{t("contact.form.sending")}</span>
                      </>
                    ) : (
                      <>
                        <span>{t("contact.form.send")}</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>

                  <div className={c("contact-form-footer-note")}>
                    <ShieldCheck size={14} />
                    <span>{t("contact.form.footerNote")}</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
