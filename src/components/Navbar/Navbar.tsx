import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navItems } from '../../data/navigation';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { MusicPlayer } from '../MusicPlayer/MusicPlayer';
import { Magnetic } from '../Magnetic/Magnetic';
import { LogoMark } from './LogoMark';
import styles from './Navbar.module.css';

type Props = {
  logoRevealed: boolean;
};

export function Navbar({ logoRevealed }: Props) {
  const progressRef = useScrollProgress<HTMLDivElement>();
  const [activeId, setActiveId] = useState(() =>
    window.location.hash === '#resume' ? 'resume' : 'home'
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const menuToggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const syncActiveView = () => {
      if (window.location.hash === '#resume') setActiveId('resume');
      else if (!window.location.hash) setActiveId('home');
      setMenuOpen(false);
    };
    window.addEventListener('hashchange', syncActiveView);
    return () => window.removeEventListener('hashchange', syncActiveView);
  }, []);

  // IntersectionObserver scrollspy
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );

    sections.forEach((s) => observer.observe(s));

    const onScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 6;
      if (atBottom) {
        const last = navItems[navItems.length - 1];
        setActiveId(last.href.slice(1));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Keyboard escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  // Click outside to close
  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('pointerdown', onClick);
    return () => document.removeEventListener('pointerdown', onClick);
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Primary" ref={navRef}>
        <a href="#home" className={styles.logo} aria-label="Jaishak J homepage">
          <span
            data-navbar-logo-target
            className={`${styles.logoMark} ${logoRevealed ? styles.logoMarkRevealed : ''}`}
          >
            <LogoMark />
          </span>
          <span className={styles.logoText}>
            JAISHAK J
            <span className={styles.logoSub}>// AI SYSTEMS</span>
          </span>
        </a>

        {/* Desktop inline nav links */}
        <div className={styles.desktopLinks} role="navigation" aria-label="Desktop menu">
          {navItems.map((item) => {
            const isActive = item.href.slice(1) === activeId;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`${styles.desktopLink} ${isActive ? styles.desktopLinkActive : ''}`}
                aria-current={isActive ? 'location' : undefined}
              >
                {isActive && <span className={styles.activeDot} aria-hidden="true" />}
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Right side controls */}
        <div className={styles.actions}>
          <MusicPlayer src="/assets/Sleeping-City.mp3" />
          <ThemeToggle />
          <Magnetic strength={6}>
            <a href="#resume" className={styles.resumeBtn}>
              Résumé
            </a>
          </Magnetic>

          <button
            type="button"
            className={styles.menuToggle}
            ref={menuToggleRef}
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile slide-down menu */}
        <div
          id="mobile-nav-panel"
          className={`${styles.mobilePanel} ${menuOpen ? styles.mobilePanelOpen : ''}`}
          aria-hidden={!menuOpen}
        >
          <ul className={styles.mobileList}>
            {navItems.map((item) => {
              const isActive = item.href.slice(1) === activeId;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`}
                    aria-current={isActive ? 'location' : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className={styles.mobileLinkDot} />
                    {item.label}
                  </a>
                </li>
              );
            })}
            <li>
              <a
                href="#resume"
                className={`${styles.mobileLink} ${activeId === 'resume' ? styles.mobileLinkActive : ''}`}
                aria-current={activeId === 'resume' ? 'page' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                <span className={styles.mobileLinkDot} />
                Résumé
              </a>
            </li>
          </ul>
        </div>

        <div ref={progressRef} className={styles.progress} aria-hidden="true" />
      </nav>
    </header>
  );
}
