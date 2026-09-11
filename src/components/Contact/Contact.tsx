import { socialLinks } from '../../data/social';
import { Reveal } from '../Reveal/Reveal';
import { Magnetic } from '../Magnetic/Magnetic';
import styles from './Contact.module.css';

export function Contact() {
  return (
    <div className={styles.grid}>
      {socialLinks.map((link, i) => {
        const Icon = link.icon;
        return (
          <Reveal key={link.label} delay={i * 0.04}>
            <Magnetic strength={10}>
              <a
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                className={styles.item}
                data-cursor-hover
              >
                <span className={styles.circle}>
                  <Icon width={22} height={22} />
                </span>
                <span className={styles.label}>{link.label}</span>
              </a>
            </Magnetic>
          </Reveal>
        );
      })}
    </div>
  );
}
