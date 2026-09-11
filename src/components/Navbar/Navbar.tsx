import { useEffect, useRef, useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { navItems } from '../../data/navigation';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { MusicPlayer } from '../MusicPlayer/MusicPlayer';
import { Magnetic } from '../Magnetic/Magnetic';
import { LogoMark } from './LogoMark';
import styles from './Navbar.module.css';

type Props = {
  /** True once the intro's flying logo has landed here — controls the reveal. */
  logoRevealed: boolean;
};

export function Navbar({ logoRevealed }: Props) {
  const progressRef = useScrollProgress<HTMLDivElement>();
  const [activeId, setActiveId] = useState('home');
  const [panelOpen, setPanelOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);

  const activeItem = navItems.find((item) => item.href.slice(1) === activeId) ?? navItems[0];

  // Scrollspy — unchanged core logic, with one reliability fix: the last
  // section can never satisfy the "-55% bottom" margin once the page runs
  // out of scroll room, so it never got marked active. Falling back to it
  // when the user is within a few px of the document's bottom.
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
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach((s) => observer.observe(s));

    const onScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
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

  // Escape closes the panel (desktop expand or mobile menu, same component).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPanelOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Click outside closes it — necessary now that it's a floating panel
  // rather than an always-visible link row.
  useEffect(() => {
    if (!panelOpen) return;
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setPanelOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [panelOpen]);

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Primary" ref={navRef}>
        <div className={styles.chrome} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <a href="#home" className={styles.logo}>
          <span
            data-navbar-logo-target
            className={`${styles.logoMark} ${logoRevealed ? styles.logoMarkRevealed : ''}`}
          >
            <LogoMark />
          </span>
          Jaishak
        </a>

        <div className={styles.sectionControl}>
          <button
            type="button"
            className={styles.sectionTrigger}
            onClick={() => setPanelOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={panelOpen}
            aria-label="Section navigation"
          >
            <span className={styles.sectionDot} aria-hidden="true" />
            <span className={styles.sectionLabel}>{activeItem.label}</span>
            <ChevronDown size={13} className={panelOpen ? styles.chevronOpen : ''} />
          </button>

          <ul
            className={`${styles.panel} ${panelOpen ? styles.panelOpen : ''}`}
            role="menu"
          >
            {navItems.map((item) => {
              const isActive = item.href.slice(1) === activeId;
              return (
                <li key={item.href} role="none">
                  <a
                    href={item.href}
                    role="menuitem"
                    className={isActive ? styles.active : ''}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => setPanelOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles.actions}>
          <MusicPlayer src="/assets/Sleeping-City.mp3" />
          <ThemeToggle />
          <Magnetic strength={8}>
            <a href="/assets/resume.pdf" target="_blank" rel="noreferrer" className={styles.resumeBtn}>
              Resume
            </a>
          </Magnetic>
          <button
            type="button"
            className={styles.menuToggle}
            onClick={() => setPanelOpen((v) => !v)}
            aria-expanded={panelOpen}
            aria-label={panelOpen ? 'Close menu' : 'Open menu'}
          >
            {panelOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <div ref={progressRef} className={styles.progress} aria-hidden="true" />
      </nav>
    </header>
  );
}
