import { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './MusicPlayer.module.css';

export function MusicPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [errored, setErrored] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.32;
    audioRef.current = audio;

    const handleError = () => setErrored(true);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('error', handleError);
      audioRef.current = null;
    };
  }, [src]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        await audio.play();
        setPlaying(true);
      }
    } catch {
      // Autoplay/permission failure — stay paused, don't throw.
      setPlaying(false);
    }
  };

  return (
    <button
      type="button"
      className={styles.player}
      onClick={toggle}
      aria-label={playing ? 'Pause background music' : 'Play background music'}
      aria-pressed={playing}
      disabled={errored}
      title={errored ? 'Audio unavailable' : undefined}
    >
      <span className={styles.icon}>
        {playing ? <Pause size={13} /> : <Play size={13} />}
      </span>
      <span className={styles.bars} aria-hidden="true">
        <span className={`${styles.bar} ${playing && !reducedMotion ? styles.animate : ''}`} />
        <span className={`${styles.bar} ${playing && !reducedMotion ? styles.animate : ''}`} />
        <span className={`${styles.bar} ${playing && !reducedMotion ? styles.animate : ''}`} />
      </span>
    </button>
  );
}
