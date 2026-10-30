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
import { useLenis } from './hooks/useLenis';

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
          <main id="main">
            <Hero />
            <Marquee />

            <section id="education" className="section">
              <div className="container">
                <SectionHeader title="Education & Experience" />
                <div style={{ display: 'grid', gap: '3rem' }}>
                  <Education />
                  <Experience />
                </div>
              </div>
            </section>

            <section id="skills" className="section">
              <div className="container">
                <SectionHeader title="Technical Skills" />
                <TechStack />
                <div style={{ marginTop: '3rem' }}>
                  <GitHubContributions />
                </div>
              </div>
            </section>

            <section id="projects" className="section">
              <div className="container">
                <SectionHeader title="Featured Projects" />
                <Projects />
              </div>
            </section>

            <section id="contact" className="section" style={{ borderBottom: 'none' }}>
              <div className="container">
                <SectionHeader title="Let's Connect" />
                <Contact />
              </div>
            </section>
          </main>

          <Footer />
        </>
      )}
    </>
  );
}

export default App;
