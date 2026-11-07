import { Download, Printer } from 'lucide-react';
import styles from './ResumePage.module.css';
import { RadiantLines } from './RadiantLines';
import { education } from '../../data/education';
import { experience } from '../../data/experience';
import { projects } from '../../data/projects';
import { skillDomains } from '../../data/skills';

export function ResumePage() {
  return (
    <main className={styles.folio}>
      <div className={styles.background} aria-hidden="true">
        <RadiantLines />
      </div>
      <article
        id="resume-content"
        className={styles.sheet}
        tabIndex={-1}
      >
        <header className={styles.header}>
          <span className={styles.eyebrow}>Portfolio / Resume</span>
          <h1>Jaishak J</h1>
          <p className={styles.role}>Chennai, India · Open to remote / relocation</p>
          <div className={styles.contact} aria-label="Contact links">
            <a href="tel:+919345589347">+91 93455 89347</a>
            <a href="mailto:jaishak.dev@gmail.com">jaishak.dev@gmail.com</a>
            <a href="/">Portfolio</a>
            <a href="https://www.linkedin.com/in/jaishakj" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/jaishakj" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </header>

        <section className={styles.section} aria-labelledby="education-heading">
          <div className={styles.sectionHeading}>
            <span>01</span>
            <h2 id="education-heading">Education</h2>
          </div>
          <div className={styles.entryList}>
            {education.map((item) => (
              <div className={styles.entry} key={item.id}>
                <div className={styles.entryTop}>
                  <h3>{item.institution}{item.affiliation && <span> ({item.affiliation})</span>}</h3>
                  <span className={styles.period}>{item.period}</span>
                </div>
                <p className={styles.organization}>{item.degree}</p>
                <p className={styles.detail}>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="experience-heading">
          <div className={styles.sectionHeading}>
            <span>02</span>
            <h2 id="experience-heading">Experience</h2>
          </div>
          <div className={styles.entryList}>
            {experience.map((item) => (
              <div className={styles.entry} key={item.id}>
                <div className={styles.entryTop}>
                  <h3>{item.role}</h3>
                  <span className={styles.period}>{item.period}</span>
                </div>
                <p className={styles.organization}>{item.company}</p>
                <ul>
                  {item.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="projects-heading">
          <div className={styles.sectionHeading}>
            <span>03</span>
            <h2 id="projects-heading">Selected projects</h2>
          </div>
          <div className={styles.projectList}>
            {projects.filter((project) => project.featured).map((project) => (
              <article className={styles.project} key={project.id}>
                <div className={styles.entryTop}>
                  <h3>{project.title}</h3>
                  <span className={styles.period}>{project.category}</span>
                </div>
                <p>{project.description}</p>
                <span>{project.technologies.join(' · ')}</span>
                {project.github && <a className={styles.projectLink} href={project.github} target="_blank" rel="noreferrer">Source repository <span aria-hidden="true">↗</span></a>}
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="skills-heading">
          <div className={styles.sectionHeading}>
            <span>04</span>
            <h2 id="skills-heading">Skills</h2>
          </div>
          <dl className={styles.skills}>
            {skillDomains.map((group) => (
              <div key={group.domain}>
                <dt>{group.domain}</dt>
                <dd>{group.skills.map((skill) => skill.name).join(', ')}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className={styles.section} aria-labelledby="certifications-heading">
          <div className={styles.sectionHeading}>
            <span>05</span>
            <h2 id="certifications-heading">Certifications</h2>
          </div>
          <ul className={styles.certifications}>
            <li>Infosys Springboard Internship 5.0 (B2) · AI Powered Call Centre Intelligence · Infosys Springboard (2025)</li>
            <li>Claude Code in Action, Model Context Protocol (Advanced &amp; Intro), AI Fluency Framework · Anthropic (2024–25)</li>
            <li>Joy of Computing with Python · NPTEL · Network Essentials · NAAN Mudhalvan (2022–24)</li>
          </ul>
        </section>

        <footer className={styles.download}>
          <p>Keep or print a copy.</p>
          <div className={styles.downloadActions}>
            <button type="button" onClick={() => window.print()}>
              <Printer size={16} aria-hidden="true" />
              Print / save as PDF
            </button>
            <a href="/assets/Jaishak-J-Resume.pdf" download="Jaishak-J-Resume.pdf">
              <Download size={16} aria-hidden="true" />
              Download résumé PDF
            </a>
          </div>
        </footer>
      </article>
    </main>
  );
}
