import { ArrowUpRight, Video, MessagesSquare, Orbit, Users, Layers } from 'lucide-react';
import type { Project } from '../../data/projects';
import { Reveal } from '../Reveal/Reveal';
import { GitHubIcon } from '../Contact/BrandIcons';
import { TechTag } from '../TechStack/TechTag';
import styles from './ProjectCard.module.css';

const BANNER_ICONS: Record<string, typeof Video> = {
  'video-summarization': Video,
  'support-rag-chatbot': MessagesSquare,
  'strange-attractor-visualiser': Orbit,
  'three-body-simulation': Orbit,
  'prisoners-dilemma': Users,
  'majit-frontend': Layers,
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const BannerIcon = BANNER_ICONS[project.id] ?? Video;

  return (
    <Reveal delay={index * 0.08}>
      <article className={`card ${styles.card}`}>
        <div className={styles.banner} aria-hidden="true">
          <BannerIcon className={styles.bannerIcon} strokeWidth={1} />
        </div>

        <div className={styles.body}>
          <span className={styles.number}>{project.number}</span>
          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.desc}>{project.description}</p>

          <div className={styles.tags}>
            {project.technologies.map((tech) => (
              <TechTag key={tech} name={tech} />
            ))}
          </div>

          <div className={styles.links}>
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="btn">
                <GitHubIcon width={15} height={15} /> View Code
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="btn btn-accent">
                Live Demo <ArrowUpRight size={15} />
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
