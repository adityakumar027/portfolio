"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const CoreScene = dynamic(() => import("./components/CoreScene"), { ssr: false });

const experience = [
  {
    period: "2026 — NOW",
    company: "Curefit · House of Cult",
    role: "Software Engineering Intern",
    summary: "Building production automation across campaign, segmentation, notification, and internal operations systems.",
    outcomes: [
      "Built agent-driven root-cause analysis and self-healing workflows that automatically resolve 60%+ of notification failures.",
      "Reduced incident response time by 70% by connecting Coralogix, AWS SQS, Sentry, and Metabase into one remediation loop.",
      "Designed human-in-the-loop workflow automation targeting an 85% reduction in manual policy review.",
    ],
    stack: "Java · Python · AI agents · Kubernetes · MySQL",
  },
  {
    period: "2025 — 2026",
    company: "WorldQuant BRAIN",
    role: "Quantitative Research Consultant · Expert",
    summary: "Researched, implemented, and backtested quantitative alpha models under strict risk and turnover constraints.",
    outcomes: [
      "Improved model performance by 20% through iterative research and backtesting.",
      "Submitted 150+ alpha models; 12+ passed all quality checks, including Sharpe above 2.25 and turnover below 30%.",
    ],
    stack: "Python · Quant research · Backtesting · Statistics",
  },
  {
    period: "2024",
    company: "Jortke",
    role: "Software Engineering Intern",
    summary: "Improved the speed and reliability of a production Node.js backend.",
    outcomes: [
      "Reduced high-traffic endpoint latency by 15–20% with Redis caching and queuing.",
      "Built 10+ REST APIs and reduced database queries by 30%.",
    ],
    stack: "Node.js · Express · Redis · REST APIs",
  },
];

const projects = [
  {
    index: "01",
    title: "Automated Job Application System",
    type: "Full-stack browser automation",
    description: "A Chrome extension that converts unstructured résumé PDFs into editable profiles and uses them to complete applications across job portals.",
    result: "PDF → structured profile → autofill",
    stack: "React · Node.js · Express · MongoDB · JWT",
    href: "https://github.com/adityakumar027/Automated-Job-Application-System",
  },
  {
    index: "02",
    title: "Graph Node Classification",
    type: "Graph machine learning",
    description: "A GCN-based node classifier with two-hop neighborhood aggregation and weighted loss for the imbalanced CORA citation dataset.",
    result: "15% accuracy improvement",
    stack: "Python · TensorFlow · Keras · GCN",
    href: "https://github.com/adityakumar027/node-classifier",
  },
  {
    index: "03",
    title: "PyOS",
    type: "Systems simulation",
    description: "A modular terminal operating-system simulation with authentication, concurrent command execution, process scheduling, and an extensible shell.",
    result: "New commands in under 10 lines",
    stack: "Python · CLI · Multithreading",
    href: "https://github.com/adityakumar027/PyOS",
  },
];

const capabilities = [
  { label: "Backend", items: "Java, Python, Node.js, Express, REST APIs, microservices" },
  { label: "AI systems", items: "AI agents, RAG, LangGraph, prompt engineering, deep learning" },
  { label: "Infrastructure", items: "Kubernetes, AWS SQS, Redis, Jenkins, Coralogix, Sentry" },
  { label: "Data", items: "MySQL, MongoDB, Pandas, TensorFlow, quantitative research" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <CoreScene />
      <div className="site-grain" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="The Core home">
          <span className="brand-mark">C</span>
          <span>THE CORE<small>ADITYA KUMAR</small></span>
        </a>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Primary navigation">
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <a className="resume-link" href="https://drive.google.com/file/d/1OJ-TCUjlttRgMqDw7UB4nr96Z6fGtAiQ/view?usp=sharing" target="_blank" rel="noreferrer">Résumé <span>↗</span></a>
        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Toggle navigation">
          {menuOpen ? "Close" : "Menu"}
        </button>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Aditya Kumar · Software Engineer</p>
            <h1>I build systems<br />that <em>scale &amp; heal.</em></h1>
            <p className="hero-summary">Production AI and backend infrastructure engineered to scale, recover, and stay reliable—from self-healing workflows to research-driven machine learning systems.</p>
            <div className="hero-actions">
              <a className="primary-action" href="#work">View selected work <span>↓</span></a>
              <a className="text-action" href="mailto:adi.workspace76865@gmail.com">adi.workspace76865@gmail.com</a>
            </div>
          </div>
          <div className="core-caption" aria-hidden="true">
            <span>CORE / 001</span>
            <span>STATUS / ACTIVE</span>
          </div>
          <div className="hero-proof" aria-label="Selected career metrics">
            <article><strong>70%</strong><span>faster incident response</span></article>
            <article><strong>60%+</strong><span>failures auto-resolved</span></article>
            <article><strong>1,000+</strong><span>algorithmic problems solved</span></article>
          </div>
        </section>

        <section className="section experience" id="experience">
          <div className="section-heading">
            <p className="section-index">01 / EXPERIENCE</p>
            <h2>Work that reached<br />production.</h2>
            <p>Focused on measurable improvements to reliability, speed, and operational clarity.</p>
          </div>
          <div className="experience-list">
            {experience.map((item) => (
              <article className="experience-item" key={item.company}>
                <p className="period">{item.period}</p>
                <div className="experience-main">
                  <p className="company">{item.company}</p>
                  <h3>{item.role}</h3>
                  <p className="experience-summary">{item.summary}</p>
                  <ul>{item.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
                  <p className="stack">{item.stack}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section work" id="work">
          <div className="section-heading work-heading">
            <p className="section-index">02 / SELECTED WORK</p>
            <h2>Built around a real<br />engineering problem.</h2>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <a className="project" href={project.href} target="_blank" rel="noreferrer" key={project.index}>
                <div className={`project-visual visual-${project.index}`} aria-hidden="true">
                  <span>{project.index}</span><i /><i /><b>{project.result}</b>
                </div>
                <div className="project-content">
                  <div className="project-top"><p>{project.type}</p><span>{project.index} / 03</span></div>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-meta"><span>{project.result}</span><span>{project.stack}</span></div>
                </div>
                <span className="project-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>

        <section className="section about" id="about">
          <div className="section-heading">
            <p className="section-index">03 / APPROACH</p>
            <h2>Reason clearly.<br />Ship responsibly.</h2>
          </div>
          <div className="about-layout">
            <div className="about-copy">
              <p>I’m an Integrated B.Tech IT + MBA student at IIIT Gwalior, graduating in 2027. My work sits at the intersection of backend engineering, intelligent automation, and production operations.</p>
              <p>I care about systems that are observable, explainable, and designed for failure—not just demos that work once.</p>
              <div className="education-line"><span>Education</span><strong>IIIT Gwalior · B.Tech IT + MBA · 2022—2027</strong></div>
            </div>
            <div className="capabilities">
              {capabilities.map((capability) => <article key={capability.label}><h3>{capability.label}</h3><p>{capability.items}</p></article>)}
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <p className="section-index">04 / CONTACT</p>
          <h2>Have a difficult<br />system to build?</h2>
          <p>I’m open to software engineering roles and ambitious technical work.</p>
          <a className="contact-email" href="mailto:adi.workspace76865@gmail.com">Let’s talk <span>↗</span></a>
          <div className="contact-links">
            <a href="https://github.com/adityakumar027" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/adicrzz/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href="https://drive.google.com/file/d/1OJ-TCUjlttRgMqDw7UB4nr96Z6fGtAiQ/view?usp=sharing" target="_blank" rel="noreferrer">Résumé ↗</a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>© 2026 Aditya Kumar</span>
        <span>Designed as a quiet machine.</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
