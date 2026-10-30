import { useEffect, useRef, useState } from 'react';
import { Download } from 'lucide-react';
import styles from './ResumePage.module.css';
import { RadiantLines } from './RadiantLines';

export function ResumePage() {
  const previousScrollY = useRef(0);
  const idleTimer = useRef<number | undefined>(undefined);
  const [tilt, setTilt] = useState(0);

  useEffect(() => {
    previousScrollY.current = window.scrollY;
    const handleWindowScroll = () => {
      const direction = Math.sign(window.scrollY - previousScrollY.current);
      if (direction) setTilt(direction * 0.2);
      previousScrollY.current = window.scrollY;
      window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => setTilt(0), 180);
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
      window.clearTimeout(idleTimer.current);
    };
  }, []);

  return (
    <main className={styles.folio}>
      <div className={styles.background} aria-hidden="true">
        <RadiantLines />
      </div>
      <article
        id="resume-content"
        className={styles.sheet}
        tabIndex={-1}
        style={{ transform: `perspective(1200px) rotateX(${tilt}deg)` }}
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
            <div className={styles.entry}>
              <div className={styles.entryTop}>
                <h3>Jeppiaar Institute of Technology <span>(Anna University)</span></h3>
                <span className={styles.period}>Aug 2021 — May 2025</span>
              </div>
              <p className={styles.organization}>B.Tech · Artificial Intelligence and Data Science</p>
              <p className={styles.detail}>CGPA: 7.34 / 10.0</p>
            </div>
            <div className={styles.entry}>
              <div className={styles.entryTop}>
                <h3>PIUS XI HR SEC School, Kanyakumari</h3>
                <span className={styles.period}>Apr 2019 — May 2021</span>
              </div>
              <p className={styles.organization}>Higher Secondary · Computer Science</p>
              <p className={styles.detail}>Percentage: 76.5%</p>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="experience-heading">
          <div className={styles.sectionHeading}>
            <span>02</span>
            <h2 id="experience-heading">Experience</h2>
          </div>
          <div className={styles.entryList}>
            <div className={styles.entry}>
              <div className={styles.entryTop}>
                <h3>AI Intern · Internship 5.0 (B2)</h3>
                <span className={styles.period}>Oct 2024 — Dec 2024</span>
              </div>
              <p className={styles.organization}>Infosys Springboard · Remote</p>
              <ul>
                <li>Participated in Infosys Springboard Internship 5.0 (B2), focused on AI Powered Call Centre Intelligence.</li>
                <li>Completed the mandatory assignment related to AI Powered Call Centre Intelligence as part of the internship program.</li>
              </ul>
            </div>
            <div className={styles.entry}>
              <div className={styles.entryTop}>
                <h3>Machine Learning Intern</h3>
                <span className={styles.period}>Aug 2023 — Sep 2023</span>
              </div>
              <p className={styles.organization}>Retech Solutions Pvt. Ltd. · Chennai, India</p>
              <ul>
                <li>Built three predictive models using TensorFlow and scikit-learn, achieving 87% accuracy on customer churn across 50,000+ records through feature engineering with Pandas.</li>
                <li>Identified 12 key features that improved model performance by 15% and reduced false positives from 24% to 13%.</li>
              </ul>
            </div>
            <div className={styles.entry}>
              <div className={styles.entryTop}>
                <h3>Social Media Marketing Intern</h3>
                <span className={styles.period}>Dec 2021 — Feb 2022</span>
              </div>
              <p className={styles.organization}>GEEKSGOD · Bhopal, India (Remote)</p>
              <ul>
                <li>Boosted Instagram engagement by 65% (2.1% to 3.5%) by analyzing 10,000+ interactions with Python analytics tools.</li>
                <li>Automated reporting with Python and SQL, cutting manual work from eight hours to 45 minutes weekly and improving campaign reach by 23%.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="projects-heading">
          <div className={styles.sectionHeading}>
            <span>03</span>
            <h2 id="projects-heading">Selected projects</h2>
          </div>
          <div className={styles.projectList}>
            <article className={styles.project}>
              <div className={styles.entryTop}>
                <h3>AI Powered Call Centre Intelligence</h3>
                <span className={styles.period}>Oct 2024 — Dec 2024</span>
              </div>
              <p>Completed the mandatory internship assignment through the Infosys Springboard Internship 5.0 program. Project implementation details and technologies are available upon request.</p>
              <span>Infosys Springboard Internship 5.0 (B2)</span>
            </article>
            <article className={styles.project}>
              <div className={styles.entryTop}>
                <h3>AI Video Summarization with YOLOv5 &amp; LLM</h3>
                <span className={styles.period}>Dec 2024 — Present</span>
              </div>
              <p>Developed a video analysis system using YOLOv5 for object detection and GPT-4 for natural-language summaries, cutting manual review time by 75%. Built a Flask app processing 30 FPS streams in real time with 92% accuracy through optimized frame sampling.</p>
              <span>Python · YOLOv5 · GPT-4 API · Flask</span>
            </article>
            <article className={styles.project}>
              <div className={styles.entryTop}>
                <h3>Customer Support Chatbot with RAG</h3>
                <span className={styles.period}>Aug 2024 — Nov 2024</span>
              </div>
              <p>Created a RAG-powered chatbot that reduced support response time by 50% using vector search across 5,000+ documents. Conversation memory raised multi-turn accuracy from 68% to 89% and reduced agent escalations by 35%.</p>
              <span>LangChain · Pinecone · FastAPI · React</span>
            </article>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="skills-heading">
          <div className={styles.sectionHeading}>
            <span>04</span>
            <h2 id="skills-heading">Skills</h2>
          </div>
          <dl className={styles.skills}>
            <div><dt>Languages</dt><dd>Python, JavaScript, SQL, HTML/CSS</dd></div>
            <div><dt>ML / AI</dt><dd>TensorFlow, PyTorch, scikit-learn, Pandas, NumPy, OpenCV, LangChain, NLP, Computer Vision</dd></div>
            <div><dt>Web Dev</dt><dd>React.js, Node.js, FastAPI, Flask, REST API, Docker, Git</dd></div>
            <div><dt>Data Tools</dt><dd>PostgreSQL, MySQL, Excel, Tableau, Statistical Analysis</dd></div>
            <div><dt>OS / Tools</dt><dd>Linux, Bash Scripting, Shell Commands</dd></div>
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
          <p>Prefer a copy to keep?</p>
          <a href="/assets/resume.pdf" download="Jaishak-J-Resume.pdf">
            <Download size={16} aria-hidden="true" />
            Download resume PDF
          </a>
        </footer>
      </article>
    </main>
  );
}
