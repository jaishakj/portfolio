import { useEffect, useState } from 'react';
import { Loader } from './components/Loader/Loader';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { Marquee } from './components/Marquee/Marquee';
import { SectionHeader } from './components/SectionHeader/SectionHeader';
import { Education } from './components/Education/Education';
import { Experience } from './components/Experience/Experience';
import { TechStack } from './components/TechStack/TechStack';
import { Projects } from './components/Projects/Projects';
import { GitHubContributions } from './components/GitHubContributions/GitHubContributions';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { CustomCursor } from './components/CustomCursor/CustomCursor';
import { ResumePage } from './components/ResumePage/ResumePage';
import { StretchyFooter } from './components/StretchyFooter';
import { useLenis } from './hooks/useLenis';

const STRETCHY_FOOTER_COLORS = [
  '#ffdfc0',
  '#ff9b61',
  '#f56e0f',
  '#e45019',
  '#a12f22',
  '#54191d',
  '#0d0d11',
];

function App() {
  const [loading, setLoading] = useState(true);
  const [logoRevealed, setLogoRevealed] = useState(false);
  const [isResume, setIsResume] = useState(() => window.location.hash === '#resume');
  useLenis();

  useEffect(() => {
    const syncView = () => setIsResume(window.location.hash === '#resume');
    window.addEventListener('hashchange', syncView);
    return () => window.removeEventListener('hashchange', syncView);
  }, []);

  useEffect(() => {
    if (isResume) window.scrollTo(0, 0);
  }, [isResume]);

  return (
    <>
      {loading && (
        <Loader onDone={() => setLoading(false)} onLogoLanded={() => setLogoRevealed(true)} />
      )}
      <div className="grain" />
      <CustomCursor />
      <a href={isResume ? '#resume-content' : '#main'} className="skip-link">
        Skip to content
      </a>

      <Navbar logoRevealed={logoRevealed} />

      {isResume ? (
        <ResumePage />
      ) : (
        <>
          <div data-stretchy-page>
            <main id="main">
              <Hero />
              <Marquee />

              <section id="education" className="section">
                <div className="container">
                  <SectionHeader
                    number="01"
                    eyebrow="BACKGROUND &amp; PRACTICE"
                    title="Education &amp; Experience"
                    subtitle="Academic training in Artificial Intelligence &amp; Data Science, paired with production ML and analytics engineering."
                  />
                  <div className="section-split">
                    <Education />
                    <Experience />
                  </div>
                </div>
              </section>

              <section id="skills" className="section">
                <div className="container">
                  <SectionHeader
                    number="02"
                    eyebrow="COMPETENCIES &amp; ECOSYSTEM"
                    title="Technical Stack &amp; Architecture"
                    subtitle="Core programming languages, machine learning frameworks, data infrastructure, and modern deployment tooling."
                  />
                  <TechStack />
                  <div className="section-followup">
                    <GitHubContributions />
                  </div>
                </div>
              </section>

              <section id="projects" className="section">
                <div className="container">
                  <SectionHeader
                    number="03"
                    eyebrow="ENGINEERED WORK"
                    title="Featured Projects"
                    subtitle="Applied AI pipelines, mathematical simulations, full-stack systems, and game-theoretic models."
                  />
                  <Projects />
                </div>
              </section>

              <section id="contact" className="section section-last">
                <div className="container">
                  <SectionHeader
                    number="04"
                    eyebrow="DIRECT COMMUNICATION"
                    title="Get In Touch"
                    subtitle="Available for full-time AI Engineering, applied ML, and full-stack software development opportunities."
                  />
                  <Contact />
                </div>
              </section>
            </main>

            <Footer />
          </div>
          <StretchyFooter windowScroll colors={STRETCHY_FOOTER_COLORS} />
        </>
      )}
    </>
  );
}

export default App;
