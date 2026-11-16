import { useState } from 'react';
import { projects } from '../../data/projects';
import { ProjectCard } from '../ProjectCard/ProjectCard';
import styles from './Projects.module.css';

type Filter = 'ALL' | 'AI' | 'SIM' | 'SYSTEMS';

export function Projects() {
  const [filter, setFilter] = useState<Filter>('ALL');

  const filteredProjects = projects.filter((p) => {
    if (filter === 'ALL') return true;
    if (filter === 'AI') return p.category === 'AI & Vision' || p.category === 'Applied AI';
    if (filter === 'SIM') return p.category === 'Scientific Computing';
    if (filter === 'SYSTEMS') return p.category === 'Systems & Games' || p.category === 'Full-Stack' || p.category === 'Data Analytics';
    return true;
  });

  return (
    <div className={styles.wrapper}>
      {/* Category filter bar */}
      <div className={styles.filterBar} role="group" aria-label="Filter projects by category">
        <button
          type="button"
          aria-pressed={filter === 'ALL'}
          className={`${styles.filterBtn} ${filter === 'ALL' ? styles.filterBtnActive : ''}`}
          onClick={() => setFilter('ALL')}
        >
          ALL WORKS <span className={styles.filterCount}>[08]</span>
        </button>
        <button
          type="button"
          aria-pressed={filter === 'AI'}
          className={`${styles.filterBtn} ${filter === 'AI' ? styles.filterBtnActive : ''}`}
          onClick={() => setFilter('AI')}
        >
          AI &amp; COMPUTER VISION <span className={styles.filterCount}>[02]</span>
        </button>
        <button
          type="button"
          aria-pressed={filter === 'SIM'}
          className={`${styles.filterBtn} ${filter === 'SIM' ? styles.filterBtnActive : ''}`}
          onClick={() => setFilter('SIM')}
        >
          SCIENTIFIC COMPUTING <span className={styles.filterCount}>[02]</span>
        </button>
        <button
          type="button"
          aria-pressed={filter === 'SYSTEMS'}
          className={`${styles.filterBtn} ${filter === 'SYSTEMS' ? styles.filterBtnActive : ''}`}
          onClick={() => setFilter('SYSTEMS')}
        >
          SYSTEMS &amp; FULL-STACK <span className={styles.filterCount}>[04]</span>
        </button>
      </div>

      <p className={styles.filterStatus} role="status" aria-atomic="true">
        Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}.
      </p>

      {/* Projects layout grid */}
      <div className={styles.grid}>
        {filteredProjects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            isFlagship={project.tier === 'flagship'}
          />
        ))}
      </div>
    </div>
  );
}
