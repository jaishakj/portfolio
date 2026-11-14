import { useState } from 'react';
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import type { Project } from '../../data/projects';
import { Reveal } from '../Reveal/Reveal';
import { GitHubIcon } from '../Contact/BrandIcons';
import { TechTag } from '../TechStack/TechTag';
import { ProjectPreview } from './ProjectPreview';
import styles from './ProjectCard.module.css';

type Props = {
  project: Project;
  index: number;
  isFlagship?: boolean;
};

export function ProjectCard({ project, index, isFlagship }: Props) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <Reveal
      delay={index * 0.04}
      className={`${styles.item} ${isFlagship ? styles.flagship : styles.standard}`}
    >
      <article className={`card ${styles.card} ${isFlagship ? styles.flagshipCard : ''}`}>
        {/* Visual Preview */}
        <div className={styles.previewContainer}>
          <ProjectPreview kind={project.preview} title={project.title} />
        </div>

        {/* Project Content Body */}
        <div className={styles.body}>
          <div className={styles.meta}>
            <span className={styles.number}>[{project.number}]</span>
            <span className={styles.category}>{project.category}</span>
            {project.featured && <span className={styles.featuredBadge}>FEATURED</span>}
          </div>

          <h3 className={styles.title}>{project.title}</h3>
          {project.subtitle && <p className={styles.subtitle}>{project.subtitle}</p>}
          <p className={styles.desc}>{project.description}</p>

          {/* Interactive Deep-Dive Architecture Drawer */}
          <div className={styles.drawerWrap}>
            <button
              type="button"
              className={styles.drawerTrigger}
              onClick={() => setDetailsOpen((v) => !v)}
              aria-expanded={detailsOpen}
              aria-label={`Toggle architecture breakdown for ${project.title}`}
            >
              <span>{detailsOpen ? 'Hide Architecture Notes' : 'Inspect Problem & Architecture'}</span>
              {detailsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {detailsOpen && (
              <div className={styles.drawerContent}>
                <div className={styles.drawerBlock}>
                  <span className={styles.drawerLabel}>CHALLENGE //</span>
                  <p className={styles.drawerText}>{project.problem}</p>
                </div>
                <div className={styles.drawerBlock}>
                  <span className={styles.drawerLabel}>ENGINEERED SOLUTION //</span>
                  <p className={styles.drawerText}>{project.solution}</p>
                </div>
              </div>
            )}
          </div>

          {/* Technologies */}
          <div className={styles.tags}>
            {project.technologies.map((tech) => (
              <TechTag key={tech} name={tech} />
            ))}
          </div>

          {/* Action Links */}
          <div className={styles.links}>
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-sm">
                <GitHubIcon width={14} height={14} /> Repository <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="btn btn-sm btn-accent">
                Live Demo <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
