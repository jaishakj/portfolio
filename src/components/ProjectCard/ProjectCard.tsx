import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../../data/projects';
import { Reveal } from '../Reveal/Reveal';
import { GitHubIcon } from '../Contact/BrandIcons';
import { TechTag } from '../TechStack/TechTag';
import { ProjectPreview } from './ProjectPreview';
import styles from './ProjectCard.module.css';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal
      delay={index * 0.05}
      className={`${styles.item} ${index === 0 ? styles.lead : ''} ${index === 1 ? styles.secondaryFeature : ''}`}
    >
      <article className={`card ${styles.card}`}>
        <ProjectPreview kind={project.preview} title={project.title} />

        <div className={styles.body}>
          <div className={styles.meta}>
            <span className={styles.number}>{project.number}</span>
            <span className={styles.category}>{project.category}</span>
            {project.featured && <span className={styles.featured}>Selected</span>}
          </div>
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
                <GitHubIcon width={15} height={15} /> Repository <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="btn btn-accent">
                Live demo <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
