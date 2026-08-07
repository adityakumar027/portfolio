"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const CoreScene = dynamic(() => import("./components/CoreScene"), { ssr: false });

const experience = [
  {
    period: "MAY 2026 — PRESENT",
    company: "Curefit · House of Cult",
    role: "Software Engineering Intern",
    summary: "Engineering production AI automation across campaign, segmentation, notification, and internal operations systems.",
    outcomes: [
      "Built an AI agent for root-cause analysis with Hermes Agent and webhook-based self-learning feedback loops, auto-resolving 60%+ of failures while optimizing token usage for low latency and cost.",
      "Reduced incident response time by 70% by integrating Coralogix, AWS SQS, Sentry, and Metabase into automated monitoring and remediation pipelines.",
      "Evolved leave approval from Copilot to Autopilot with human-in-the-loop review, cutting manual review effort by 85%.",
      "Built and maintained 20+ REST APIs, including Metabase card APIs powering real-time dashboards for the Operations team.",
    ],
    stack: "Hermes Agent · Java · Python · AWS SQS · Coralogix · Sentry · Metabase · REST APIs",
  },
  {
    period: "MAY 2025 — APR 2026",
    company: "WorldQuant BRAIN",
    role: "Quantitative Research Consultant — Expert",
    summary: "Researched, implemented, and backtested quantitative alpha models under strict risk and turnover constraints.",
    outcomes: [
      "Developed and implemented new alpha models that improved investment-strategy performance by 20%.",
      "Conducted quantitative research and backtesting, collaborating with research teams to derive actionable financial insights.",
      "Submitted 300+ alphas; 12+ passed every quality check, including Sharpe above 2.25 and turnover below 30%.",
    ],
    stack: "Python · Quant research · Backtesting · Statistics",
  },
];

const projects = [
  {
    index: "01",
    title: "Automated Job Application System",
    type: "Full-stack browser automation",
    description: "A full-stack Chrome extension that turns unstructured résumé PDFs into editable profiles and completes applications across job portals.",
    outcomes: [
      "Built the extension and application stack with React, Node.js, Express, and MongoDB.",
      "Designed JWT-secured APIs and a modular schema for private, scalable profile management.",
      "Implemented asynchronous PDF parsing with pdf-parse and an editable React review flow.",
    ],
    result: "PDF → structured profile → autofill",
    stack: "React · Node.js · Express · MongoDB · JWT",
    href: "https://github.com/adityakumar027/Automated-Job-Application-System",
  },
  {
    index: "02",
    title: "Graph Node Classification",
    type: "Graph machine learning",
    description: "A GCN-based node classifier with two-hop neighborhood aggregation and weighted loss for the imbalanced CORA citation dataset.",
    outcomes: [
      "Improved classification accuracy by 15% over traditional dense-network baselines.",
      "Implemented two-hop neighborhood aggregation for stronger graph representation learning.",
      "Used weighted loss and data balancing to improve convergence on imbalanced CORA classes.",
    ],
    result: "15% accuracy improvement",
    stack: "Python · TensorFlow · Keras · GCN",
    href: "https://github.com/adityakumar027/node-classifier",
  },
  {
    index: "03",
    title: "PyOS",
    type: "Systems simulation",
    description: "A modular terminal operating-system simulation with authentication, concurrent command execution, process scheduling, and an extensible shell.",
    outcomes: [
      "Built a terminal OS simulation with a custom CLI, secure authentication, and multithreading.",
      "Designed an extensible shell where new commands can be added in fewer than 10 lines.",
      "Applied object-oriented architecture to authentication, process execution, and module boundaries.",
    ],
    result: "New commands in under 10 lines",
    stack: "Python · CLI · Multithreading",
    href: "https://github.com/adityakumar027/PyOS",
  },
];

const capabilities = [
  { label: "Languages", items: "C, C++, JavaScript, Python, SQL" },
  { label: "Backend & Web", items: "Node.js, React, Express, REST APIs, microservices, JWT, Tailwind CSS" },
  { label: "AI Engineering", items: "Hermes Agent, OpenClaw, RAG, tokenization, prompt engineering, AI agents, deep learning" },
  { label: "Cloud & Operations", items: "AWS SQS, Kubernetes, Rancher, Jenkins, Spinnaker, Coralogix, Sentry, Metabase" },
  { label: "Data & ML", items: "MySQL, MongoDB, TensorFlow, Keras, NumPy, Pandas, Matplotlib" },
  { label: "Engineering", items: "Git, GitHub, Linux, workflow automation, MCP tooling, data structures, algorithms, operating systems" },
];

const achievements = [
  {
    metric: "LinkedIn",
    before: "View my ",
    highlight: "engineering profile",
    after: " ↗",
    href: "https://www.linkedin.com/in/adicrzz/",
  },
  {
    metric: "LeetCode",
    before: "Knight · ",
    highlight: "1820",
    after: " rating ↗",
    href: "https://leetcode.com/u/aditya_x1x/",
  },
  {
    metric: "CodeChef",
    before: "3★ · ",
    highlight: "1661",
    after: " rating ↗",
    href: "https://www.codechef.com/users/aditya_x1x",
  },
  {
    metric: "Codeforces",
    before: "Competitive rating · ",
    highlight: "1300+",
    after: " ↗",
    href: "https://codeforces.com/profile/aditya_x1x",
  },
  {
    metric: "GitHub",
    before: "Explore my ",
    highlight: "projects & code",
    after: " ↗",
    href: "https://github.com/adityakumar027",
  },
];

const productionSurfaces = [
  {
    index: "01",
    title: "Campaign orchestration",
    description: "Worked on campaign execution and failure-analysis paths where reliability directly affects high-volume customer communication.",
    signal: "Production workflows · AI-assisted RCA",
  },
  {
    index: "02",
    title: "Segmentation services",
    description: "Contributed to operational services that turn audience and policy inputs into dependable, reviewable production workflows.",
    signal: "Human-in-the-loop · 85% less manual review",
  },
  {
    index: "03",
    title: "Notification reliability",
    description: "Built self-learning remediation loops across notification systems, automatically resolving more than 60% of observed failures.",
    signal: "60%+ auto-resolved · 70% faster response",
  },
  {
    index: "04",
    title: "Operations platform",
    description: "Delivered APIs and real-time operational visibility across Coralogix, Sentry, AWS SQS, and Metabase.",
    signal: "20+ REST APIs · Real-time dashboards",
  },
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
          <a href="#scale" onClick={closeMenu}>Scale</a>
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#skills" onClick={closeMenu}>Skills</a>
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
            <article><strong>1,200+</strong><span><em>Coding problems</em> solved</span></article>
            <article><strong>50+</strong><span>Production <em>APIs shipped</em></span></article>
            <article><strong>80%+</strong><span>Failures <em>auto-resolved</em></span></article>
            <article><strong>Millions+</strong><span>Users served by <em>production services</em></span></article>
          </div>
          <nav className="hero-profiles" aria-label="Professional profiles">
            {achievements.map((achievement) => (
              <a href={achievement.href} target="_blank" rel="noreferrer" key={achievement.metric}>
                <strong>{achievement.metric}</strong>
                <span>{achievement.before}<em>{achievement.highlight}</em>{achievement.after}</span>
              </a>
            ))}
          </nav>
        </section>

        <section className="section experience" id="experience">
          <div className="section-heading">
            <p className="section-index">EXPERIENCE</p>
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

        <section className="section scale" id="scale">
          <div className="section-heading scale-heading">
            <p className="section-index">CONSUMER SCALE</p>
            <h2>Engineering inside<br /><em>high-traffic systems.</em></h2>
            <p>Experience contributing to production services supporting consumer experiences used by millions of people.</p>
          </div>
          <div className="scale-context">
            <p className="scale-label">CUREFIT · HOUSE OF CULT</p>
            <p className="scale-statement">I worked across <em>campaign</em>, <em>segmentation</em>, and <em>notification</em> services—building the automation, observability, and remediation paths that keep large consumer platforms dependable.</p>
          </div>
          <div className="service-grid">
            {productionSurfaces.map((surface) => (
              <article key={surface.index}>
                <span>{surface.index}</span>
                <h3>{surface.title}</h3>
                <p>{surface.description}</p>
                <strong>{surface.signal}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="section work" id="work">
          <div className="section-heading work-heading">
            <p className="section-index">SELECTED WORK</p>
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
                  <ul className="project-outcomes">{project.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
                  <div className="project-meta"><span>{project.result}</span><span>{project.stack}</span></div>
                </div>
                <span className="project-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>

        <section className="section about" id="skills">
          <div className="section-heading">
            <p className="section-index">PROFILE &amp; SKILLS</p>
            <h2>Strong foundations.<br />Production range.</h2>
          </div>
          <div className="about-layout">
            <div className="about-copy">
              <p>I’m an Integrated B.Tech IT + MBA student at IIIT Gwalior, graduating in 2027 with a 7.97 CGPA. My work sits at the intersection of backend engineering, intelligent automation, and production operations.</p>
              <p>I care about systems that are observable, explainable, and designed for failure—not just demos that work once.</p>
              <div className="education-line"><span>Education</span><strong>IIIT Gwalior · Integrated B.Tech IT + MBA · Nov 2022—Jun 2027</strong></div>
            </div>
            <div className="capabilities">
              {capabilities.map((capability) => <article key={capability.label}><h3>{capability.label}</h3><p>{capability.items}</p></article>)}
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <p className="section-index">CONTACT</p>
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
