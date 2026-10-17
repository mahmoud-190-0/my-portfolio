import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, GitBranch } from "lucide-react";
import { PROJECTS } from "./ProjectsData";
import "./Projects.css";

/* =========================================================
   HELPERS
========================================================= */

function getProjectLinks({ title, liveUrl, githubUrl }) {
  return [
    liveUrl && {
      key: "live",
      href: liveUrl,
      label: "Live Demo",
      Icon: ArrowUpRight,
      ariaLabel: `Live demo of ${title} (opens in a new tab)`,
    },
    githubUrl && {
      key: "github",
      href: githubUrl,
      label: "GitHub",
      Icon: GitBranch,
      ariaLabel: `GitHub repository for ${title} (opens in a new tab)`,
    },
  ].filter(Boolean);
}

/* =========================================================
   COMPONENT
========================================================= */

export default function Projects() {
  const reduceMotion = useReducedMotion();

  const ease = [0.16, 1, 0.3, 1];

  const headerVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.01 : 0.6, ease },
    },
  };

  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.1,
        delayChildren: reduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.01 : 0.55, ease },
    },
  };

  return (
    <section
      id="projects"
      className="section projects"
      aria-labelledby="projects-heading">
      <div className="container">
        <motion.header
          className="projects__header"
          variants={headerVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
          <div className="about__label">
            <span className="about__label-dot" />
            <span>SELECTED WORK</span>
          </div>
          <h2 id="projects-heading" className="section-title projects__title">
            <span className="about__heading">Projects</span>
          </h2>

          <p className="section-description projects__intro">
            A selection of work spanning responsive front-end interfaces and a
            full-stack application, each built with a focus on clean structure,
            usability, and maintainable code.
          </p>
        </motion.header>

        <motion.ul
          className="projects__grid"
          variants={gridVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}>
          {PROJECTS.map((project, index) => {
            const links = getProjectLinks(project);

            return (
              <motion.li
                key={project.id}
                className="projects__item"
                variants={itemVariants}>
                <article className="project-card">
                  <div className="project-card__media">
                    <img
                      className="project-card__image"
                      src={project.image}
                      alt={project.imageAlt}
                      width="1200"
                      height="750"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="project-card__body">
                    <div className="project-card__meta">
                      <span
                        className={`project-card__category project-card__category--${project.categoryKey}`}>
                        {project.category}
                      </span>
                      <span className="project-card__number" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="project-card__title">{project.title}</h3>
                    <p className="project-card__description">
                      {project.description}
                    </p>

                    <ul
                      className="project-card__tech"
                      aria-label={`${project.title} technologies`}>
                      {project.technologies.map((tech) => (
                        <li key={tech} className="project-card__badge">
                          {tech}
                        </li>
                      ))}
                    </ul>

                    {links.length > 0 && (
                      <div className="project-card__actions">
                        {links.map(
                          ({ key, href, label, Icon, ariaLabel }, i) => (
                            <a
                              key={key}
                              className={`project-card__link${
                                i === 0 ? " project-card__link--primary" : ""
                              }`}
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={ariaLabel}>
                              <Icon
                                size={16}
                                strokeWidth={2}
                                aria-hidden="true"
                              />
                              {label}
                            </a>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                </article>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
