import { useState } from 'react';
import { ArrowRight, ArrowUp } from 'lucide-react';
import { projects } from '../../data/projects';
import { ProjectCard } from '../ProjectCard/ProjectCard';
import styles from './Projects.module.css';

const INITIAL_COUNT = 2;

export function Projects() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? projects : projects.slice(0, INITIAL_COUNT);
  const hasMore = projects.length > INITIAL_COUNT;

  return (
    <div>
      <div className={styles.grid}>
        {visible.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {hasMore && (
        <div className={styles.moreRow}>
          <button
            type="button"
            className={styles.moreBtn}
            onClick={() => setExpanded((v) => !v)}
            data-cursor-hover
          >
            {expanded ? 'Show Less' : 'See All Projects'}
            {expanded ? <ArrowUp size={16} /> : <ArrowRight size={16} />}
          </button>
        </div>
      )}
    </div>
  );
}
