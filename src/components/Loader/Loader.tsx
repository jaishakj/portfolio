import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { buildLoaderTimeline, buildLogoTimeline, greetings } from '../../animations/loader';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { LogoMark } from '../Navbar/LogoMark';
import styles from './Loader.module.css';

type Props = {
  onDone: () => void;
  /** Fires the instant the flying logo lands on the navbar slot — the cue to reveal the real one. */
  onLogoLanded: () => void;
};

type Phase = 'greeting' | 'logo';

function splitGraphemes(word: string): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
    return Array.from(segmenter.segment(word), (s) => s.segment);
  }
  // Fallback for older engines: render as one unbroken unit rather than
  // risk splitting a combining-mark script (Tamil, etc.) mid-character.
  return [word];
}

export function Loader({ onDone, onLogoLanded }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<SVGSVGElement | null>(null);
  const [word, setWord] = useState(greetings[0]);
  const [phase, setPhase] = useState<Phase>('greeting');
  const [visible, setVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  const finish = () => {
    if (!rootRef.current) {
      setVisible(false);
      onDone();
      return;
    }
    gsap.to(rootRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out',
      onComplete: () => {
        setVisible(false);
        onDone();
      },
    });
  };

  // Phase 1: greeting cycle
  useEffect(() => {
    if (reducedMotion) {
      onLogoLanded();
      setVisible(false);
      onDone();
      return;
    }
    if (!textRef.current) return;

    const tl = buildLoaderTimeline(textRef.current, (w) => setWord(w), () => setPhase('logo'));
    return () => { tl.kill(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  // Phase 2: logo draw -> fill -> fly onto the real navbar slot
  useEffect(() => {
    if (phase !== 'logo' || reducedMotion || !logoRef.current) return;

    const tl = buildLogoTimeline({
      svgEl: logoRef.current,
      onLand: onLogoLanded,
      onDone: finish,
    });
    return () => { tl.kill(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, reducedMotion]);

  if (!visible) return null;

  return (
    <div ref={rootRef} className={styles.loader} role="status" aria-live="polite">
      {phase === 'greeting' && (
        <div ref={textRef} className={styles.word} aria-label={word}>
          {splitGraphemes(word).map((char, i) => (
            <span key={`${word}-${i}`} className={styles.char}>
              {char}
            </span>
          ))}
        </div>
      )}

      {phase === 'logo' && (
        <LogoMark ref={logoRef} className={styles.logo} strokeMode />
      )}
    </div>
  );
}
