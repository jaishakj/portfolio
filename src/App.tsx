import { useState } from 'react';
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
import { useLenis } from './hooks/useLenis';

function App() {
  const [loading, setLoading] = useState(true);
  const [logoRevealed, setLogoRevealed] = useState(false);
  useLenis();

  return (
    <>
      {loading && (
        <Loader onDone={() => setLoading(false)} onLogoLanded={() => setLogoRevealed(true)} />
      )}
      <div className="grain" />
      <CustomCursor />
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Navbar logoRevealed={logoRevealed} />

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
  );
}

export default App;
