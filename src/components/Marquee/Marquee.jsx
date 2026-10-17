// components/MarqueeSection.jsx - Tech Stack Version
import React, { useEffect, useRef } from "react";
import "./Marquee.css";

const techImages = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
];

const MarqueeSection = () => {
  const sectionRef = useRef(null);
  const row1Images = techImages.slice(0, 11);
  const row2Images = techImages.slice(11);

  return (
    <section ref={sectionRef} className="marquee-section">
      <div className="marquee-label">⚡ TECH STACK & TOOLS ⚡</div>
      <div className="marquee-row marquee-row--left">
        {[...row1Images, ...row1Images, ...row1Images].map((url, index) => (
          <div key={`row1-${index}`} className="marquee-item">
            <img
              src={url}
              alt={`Tech ${index}`}
              className="marquee-image"
              loading="lazy"
            />
            <span className="marquee-tech-name">
              {url.split("/").pop().split(".")[0]}
            </span>
          </div>
        ))}
      </div>

      <div className="marquee-label" style={{ marginTop: "1rem" }}>
        🚀 PROJECTS & INNOVATIONS 🚀
      </div>
      <div className="marquee-row marquee-row--right">
        {[...row2Images, ...row2Images, ...row2Images].map((url, index) => (
          <div key={`row2-${index}`} className="marquee-item">
            <img
              src={url}
              alt={`Project ${index}`}
              className="marquee-image"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MarqueeSection;
