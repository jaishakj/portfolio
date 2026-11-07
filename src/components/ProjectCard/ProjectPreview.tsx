import type { Project } from '../../data/projects';
import styles from './ProjectPreview.module.css';

type Props = {
  kind: Project['preview'];
  title: string;
};

export function ProjectPreview({ kind, title }: Props) {
  return (
    <div className={`${styles.preview} ${styles[kind]}`} role="img" aria-label={`Illustrative preview for ${title}`}>
      <span className={styles.previewLabel}>Illustrative preview</span>
      <div className={styles.canvas} aria-hidden="true">
        {kind === 'video' && (
          <div className={styles.videoFrame}>
            <div className={styles.frameTop}><span /> FRAME ANALYSIS <span>00:08</span></div>
            <div className={styles.scene}>
              <span className={styles.detection} />
              <span className={styles.detectionLabel}>PERSON DETECTED</span>
              <span className={styles.sceneLine} />
            </div>
            <div className={styles.caption}><span /> Keyframe caption generated from the selected frame</div>
          </div>
        )}
        {kind === 'rag' && (
          <div className={styles.chatFrame}>
            <div className={styles.chatHead}><span /> SUPPORT ASSISTANT <span>● READY</span></div>
            <p className={styles.question}>How do I update my account?</p>
            <p className={styles.answer}>I found a matching guide. Here are the steps to update your details.</p>
            <div className={styles.source}>↳ Source document · account guide</div>
          </div>
        )}
        {kind === 'attractor' && (
          <div className={styles.attractorFrame}>
            <div className={styles.plotLabel}>LORENZ SYSTEM <span>σ 10 · ρ 28 · β 2.67</span></div>
            <svg viewBox="0 0 560 230" fill="none" aria-hidden="true">
              <path d="M276 122c-36-7-92-66-123-62-36 5-39 55-2 75 34 18 75 4 115-13 43-19 93-60 128-47 37 14 17 67-18 74-33 7-82-16-120-31-42-17-87-45-117-31-32 15-13 59 19 67 33 8 81-14 121-31 45-19 91-38 122-16 29 22 8 60-26 62-32 2-73-19-111-35-35-14-79-38-108-20-31 19-12 53 20 58 34 6 76-17 114-33" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M165 59c38-27 72-10 108 5m-94 110c33 25 62 18 94 3m121-102c23 19 24 38 10 56m-9 52c-24 18-53 14-77 3" stroke="currentColor" strokeWidth="1" opacity=".45" />
            </svg>
            <div className={styles.plotAxis}><span>X · TIME SERIES</span><span>60–80K POINTS</span></div>
          </div>
        )}
        {kind === 'orbit' && (
          <div className={styles.orbitFrame}>
            <div className={styles.plotLabel}>THREE-BODY SYSTEM <span>RKF45 · ADAPTIVE STEP</span></div>
            <div className={styles.orbitPlot}>
              <span className={styles.orbitPathOne} />
              <span className={styles.orbitPathTwo} />
              <span className={styles.bodyOne} />
              <span className={styles.bodyTwo} />
              <span className={styles.bodyThree} />
            </div>
            <div className={styles.orbitReadout}><span>ENERGY DRIFT <b>DIAGNOSTIC</b></span><span>Δt <b>VARIABLE</b></span></div>
          </div>
        )}
        {kind === 'game' && (
          <div className={styles.gameFrame}>
            <div className={styles.plotLabel}>TOURNAMENT ROUND <span>PLAYER VS. STRATEGY</span></div>
            <div className={styles.gameTable}>
              <span>YOUR MOVE</span><span>AGENT MOVE</span>
              <b>COOPERATE</b><b>DEFECT</b>
              <i>+3 / +3</i><i>+0 / +5</i>
            </div>
            <div className={styles.gameFooter}>TIT FOR TAT <span>AGENT 01 / 12</span></div>
          </div>
        )}
        {kind === 'code' && (
          <div className={styles.codeFrame}>
            <div className={styles.plotLabel}>MAJIT <span>FRONTEND REPOSITORY</span></div>
            <div className={styles.codeLines}><span /><span /><span /><span /><span /></div>
            <div className={styles.codeNote}>Public feature details are still limited.</div>
          </div>
        )}
        {kind === 'dashboard' && (
          <div className={styles.dashboardFrame}>
            <div className={styles.plotLabel}>CATALOG OVERVIEW <span>1925 — 2021</span></div>
            <div className={styles.dashMetrics}><span>TITLES <b>SUMMARY</b></span><span>FORMATS <b>MOVIES · SERIES</b></span></div>
            <div className={styles.chartBars}><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
            <div className={styles.chartLegend}><span>RELEASE TRENDS</span><span>GENRES · RATINGS · REGIONS</span></div>
          </div>
        )}
        {kind === 'workflow' && (
          <div className={styles.workflowFrame}>
            <div className={styles.plotLabel}>JOB SEARCH WORKSPACE <span>WEEKLY VIEW</span></div>
            <div className={styles.workflowMetrics}><span>APPLICATIONS <b>TRACK</b></span><span>FOLLOW-UPS <b>SCHEDULE</b></span><span>SUMMARY <b>REVIEW</b></span></div>
            <div className={styles.workflowRows}><i /><i /><i /></div>
            <div className={styles.workflowFooter}>POSTGRESQL QUEUE <span>REMINDERS · NOTIFICATIONS</span></div>
          </div>
        )}
      </div>
    </div>
  );
}
