/* oxlint-disable react/only-export-components -- icon collection file:
   many tiny named components + one lookup export is the standard shape
   for an icon set (same pattern lucide-react itself uses); splitting
   each into its own file would hurt readability far more than this
   dev-only Fast Refresh warning helps. */
import type { ComponentType, SVGProps } from 'react';
import {
  Eye,
  MessageSquare,
  Wand2,
  Workflow,
  BarChart3,
  LineChart,
  Table2,
  Boxes,
  Database,
  Terminal as TerminalIcon,
  MonitorSmartphone,
} from 'lucide-react';
import { GitHubIcon } from '../Contact/BrandIcons';

type Icon = ComponentType<SVGProps<SVGSVGElement>>;
type IconProps = SVGProps<SVGSVGElement>;

/* ---------- Brand marks (simplified but recognizable) ---------- */

const Python: Icon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...p}>
    <path fill="#3776AB" d="M12 2c-4 0-4 2-4 2v2h4v1H6s-3 0-3 5 3 5 3 5h2v-3s0-3 3-3h4s3 0 3-3V5s0-3-4-3h-2z" />
    <path fill="#FFD43B" d="M12 22c4 0 4-2 4-2v-2h-4v-1h6s3 0 3-5-3-5-3-5h-2v3s0 3-3 3H9s-3 0-3 3v3s0 3 4 3z" />
  </svg>
);

const JavaScript: Icon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...p}>
    <rect width="24" height="24" rx="4" fill="#F7DF1E" />
    <path
      fill="#000"
      d="M7.5 18.5c.4.7 1 1.3 2.1 1.3 1.1 0 1.8-.5 1.8-1.6v-6h-1.6v6c0 .5-.2.7-.6.7-.4 0-.6-.3-.9-.7l-1.4.6zm5.3-.2c.5.9 1.5 1.5 2.9 1.5 1.6 0 2.7-.8 2.7-2.3 0-1.4-.8-2-2.3-2.6l-.4-.2c-.7-.3-1-.5-1-1 0-.4.3-.7.9-.7.5 0 .9.2 1.2.7l1.3-.8c-.6-1-1.4-1.4-2.5-1.4-1.5 0-2.5.9-2.5 2.2 0 1.3.8 2 2.1 2.5l.4.2c.8.3 1.2.5 1.2 1.1 0 .5-.4.8-1.1.8-.8 0-1.2-.4-1.6-.9l-1.3.9z"
    />
  </svg>
);

const HTML5: Icon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...p}>
    <path fill="#E34F26" d="M3 2l1.7 18.8L12 22.9l7.3-2.1L21 2H3z" />
    <path
      fill="#EBEBEB"
      d="M17.4 8.3H8.2l.2 2.2h8.8l-.6 6.9-4.6 1.3-4.6-1.3-.3-3.2h2.1l.2 1.6 2.6.7 2.6-.7.3-3H6.9L6.3 6h11.4l-.3 2.3z"
    />
  </svg>
);

const TensorFlow: Icon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="#FF6F00" {...p}>
    <path d="M1.5 8.5L12 2.3v3.9L4.9 10.4v3.2L1.5 15.5V8.5zM12 2.3l10.5 6.2v7l-3.4-2v-3l-7.1-4.2V2.3zM4.9 13.6v6.1l5.6 3.3v-7.2l-2.8-1.7v-1.9l-2.8 1.4zM13.5 15.8v7.2l5.6-3.3v-6.1l-2.8 1.6v1.9l-2.8-1.3z" />
  </svg>
);

const PyTorch: Icon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#EE4C2C" strokeWidth="1.6" {...p}>
    <path d="M15.5 4.5l-1.5 1.5a7.8 7.8 0 11-6.5 0L6 4.5" strokeLinecap="round" />
    <circle cx="12" cy="14" r="3.2" fill="#EE4C2C" stroke="none" />
    <circle cx="16.2" cy="6.3" r="1.1" fill="#EE4C2C" stroke="none" />
  </svg>
);

const ScikitLearn: Icon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...p}>
    <circle cx="9" cy="8" r="5" fill="#F7931E" />
    <circle cx="15" cy="16" r="5" fill="#29ABE2" />
    <circle cx="9" cy="8" r="2" fill="#fff" />
    <circle cx="15" cy="16" r="2" fill="#fff" />
  </svg>
);

const Pandas: Icon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...p}>
    <rect width="24" height="24" rx="4" fill="#150458" />
    <path fill="#fff" d="M7 6h2v9H7V6zm4 3h2v9h-2V9zm4-5h2v14h-2V4z" />
  </svg>
);

const NumPy: Icon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...p}>
    <path fill="#4DABCF" d="M12 2l8 4.6v9.8L12 22l-8-4.6V6.6L12 2z" />
    <path fill="#013243" d="M12 2v9L4 6.6 12 2zm0 9l8-4.4V16.4L12 11z" />
  </svg>
);

const Matlab: Icon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...p}>
    <rect width="24" height="24" rx="4" fill="#0076A8" />
    <path fill="#fff" d="M4 16l3-8 2.5 6L12 6l2 10h2l2-6 1 4h1v-8" fillOpacity="0" stroke="#fff" strokeWidth="1.4" />
  </svg>
);

const Jupyter: Icon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...p}>
    <circle cx="12" cy="6" r="2.6" fill="#F37626" />
    <circle cx="5.5" cy="17" r="2.6" fill="#F37626" />
    <circle cx="18.5" cy="17" r="2.6" fill="#F37626" />
  </svg>
);

const React: Icon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="1.4" {...p}>
    <circle cx="12" cy="12" r="2.2" fill="#61DAFB" stroke="none" />
    <ellipse cx="12" cy="12" rx="10" ry="4.2" />
    <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
  </svg>
);

const FastAPI: Icon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...p}>
    <circle cx="12" cy="12" r="10" fill="#009688" />
    <path fill="#fff" d="M13 3.5L6.5 13H11l-1 7.5L17 11h-4.5l.5-7.5z" />
  </svg>
);

const Docker: Icon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="#2496ED" {...p}>
    <path d="M22 11.4c-.6-.4-1.9-.6-2.9-.4-.1-.9-.6-1.7-1.4-2.3l-.5-.3-.3.5c-.4.6-.6 1.5-.5 2.2-.7.4-1.4.6-2.4.6H2.6c-.2 1.7.1 3.5 1.1 4.8 1.1 1.5 2.8 2.3 5 2.3 4.7 0 8.2-2.2 9.8-6.1 1.1.1 2.3-.2 2.9-1 .1-.1.4-.5.6-.9z" />
  </svg>
);

const NodeJS: Icon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="#5FA04E" {...p}>
    <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.2l6.8 3.8-6.8 3.8-6.8-3.8L12 4.2zM5 9.3l6 3.4v6.8l-6-3.3V9.3zm14 0v6.9l-6 3.3v-6.8l6-3.4z" />
  </svg>
);

const ExpressJS: Icon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M22 17.6c-1.6 1.4-3.7 2-6 2-4.6 0-8-2.9-8-7.7 0-4.5 3.1-7.7 7.5-7.7 4.5 0 6.8 3.3 6.8 7.5v.8H10.2c.3 2.8 2.2 4.2 4.6 4.2 1.7 0 3-.6 4.1-1.6l1.1 1.5zM10.3 11h8.2c-.1-2.3-1.5-3.9-3.9-3.9-2.3 0-3.9 1.6-4.3 3.9zM3 8h1.9l2.3 3.2L9.5 8h1.9L8 12.5l3.6 4.5H9.7l-2.5-3.4L4.7 17H2.8l3.6-4.6L3 8z" />
  </svg>
);

const ShadcnUI: Icon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}>
    <path d="M21 3L3 21" />
    <path d="M15.5 3L3 15.5" opacity="0.5" />
  </svg>
);

const Npm: Icon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...p}>
    <rect width="24" height="24" rx="3" fill="#CB3837" />
    <path fill="#fff" d="M4 5h16v14h-8v-2h-2v2H4V5zm2 2v10h2V7H6zm4 0v2h2V7h-2zm4 0v10h2V9h2V7h-4z" />
  </svg>
);

const Vercel: Icon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...p}>
    <path fill="currentColor" d="M12 2l11 19H1L12 2z" />
  </svg>
);

const Cloudflare: Icon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...p}>
    <path
      fill="#F38020"
      d="M16.5 15.5c.1-.4.1-.7 0-1.1-.2-.9-1-1.5-1.9-1.5H8.9c-.1 0-.2-.1-.2-.2s0-.1.1-.2c.9-.9 2.1-1.4 3.4-1.4 2.1 0 3.9 1.3 4.6 3.2h.2c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5H5c-1.4 0-2.5-1.1-2.5-2.5S3.6 14.3 5 14.3h.1c.3-2.9 2.8-5.1 5.7-5.1 2.2 0 4.1 1.2 5.1 3 .3-.1.6-.1.9-.1"
    />
  </svg>
);

const VSCode: Icon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...p}>
    <path fill="#007ACC" d="M17 2l-9 8-4-3-2 1v8l2 1 4-3 9 8 5-2V4l-5-2zm0 5v10L9 12l8-5z" />
  </svg>
);

const Cursor: Icon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...p}>
    <rect x="2" y="2" width="20" height="20" rx="5" fill="#0A0A0A" />
    <path fill="#fff" d="M7 6.5L17 12l-4.3 1.2L11.3 17 7 6.5z" />
    <path fill="#fff" fillOpacity="0.45" d="M7 6.5l4.3 10.5 1.4-3.8L17 12 7 6.5z" />
  </svg>
);

const PostgreSQL: Icon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="#336791" {...p}>
    <path d="M12 2c-3.3 0-6.5 1.6-6.5 5.4V17c0 3.8 3.2 5.4 6.5 5.4s6.5-1.6 6.5-5.4V7.4C18.5 3.6 15.3 2 12 2zm0 3.2c1.9 0 3.4.8 3.4 2.2s-1.5 2.2-3.4 2.2S8.6 8.8 8.6 7.4 10.1 5.2 12 5.2z" />
  </svg>
);

const MySQL: Icon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#4479A1" strokeWidth="1.6" {...p}>
    <ellipse cx="12" cy="7" rx="8" ry="3" />
    <path d="M4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7" />
  </svg>
);

const Excel: Icon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2" fill="#217346" />
    <path fill="#fff" d="M7 8l2.5 4L7 16h2l1.5-2.6L12 16h2l-2.5-4L14 8h-2l-1.5 2.6L9 8H7z" />
  </svg>
);

const Tableau: Icon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="#E97627" {...p}>
    <path d="M11 2h2v4h-2V2zm0 16h2v4h-2v-4zM3 10h4v2H3v-2zm14 0h4v2h-4v-2zM6.5 5.5l1.4 1.4-2.8 2.8-1.4-1.4 2.8-2.8zm11.6 11.6l1.4 1.4-2.8 2.8-1.4-1.4 2.8-2.8zM17.5 5.5l2.8 2.8-1.4 1.4-2.8-2.8 1.4-1.4zM5.9 17.1l2.8 2.8-1.4 1.4-2.8-2.8 1.4-1.4zM9 9h6v6H9V9z" />
  </svg>
);

const Supabase: Icon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...p}>
    <path fill="#3ECF8E" d="M13 2L3 14h7l-1 8 11-14h-7l1-6z" />
  </svg>
);

const Neon: Icon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...p}>
    <path fill="#00E5BF" d="M4 4h6l10 16h-6L4 4zm0 0v16h4V9l6 11h4L4 4z" opacity="0.85" />
  </svg>
);

const Linux: Icon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2c1 3-1 4-1 6 0 1.5 1 2 1 2s1-.5 1-2c0-2-2-3-1-6zm-2 9c-2 2-3 5-3 7 0 2 2 3 5 3s5-1 5-3c0-2-1-5-3-7-.3 1-.6 2-2 2s-1.7-1-2-2z" />
  </svg>
);

const Bash: Icon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" fill="#4EAA25" />
    <path fill="#fff" d="M5 8l4 4-4 4 1.4 1.4L10.8 12l-4.4-5.4L5 8zm6 8h8v2h-8v-2z" />
  </svg>
);

/* ---------- Generic concept icons (no real "brand" exists) ---------- */

const SQLIcon: Icon = Database;
const NLPIcon: Icon = MessageSquare;
const ComputerVisionIcon: Icon = Eye;
const LLMIcon: Icon = Boxes;
const PromptEngineeringIcon: Icon = Wand2;
const AIAutomationIcon: Icon = Workflow;
const DataAnalysisIcon: Icon = LineChart;
const StatisticalAnalysisIcon: Icon = BarChart3;
const RestApiIcon: Icon = Table2;
const FrontendDevIcon: Icon = MonitorSmartphone;
const ShellCommandsIcon: Icon = TerminalIcon;

/* ---------- lookup ---------- */

export const techIcons: Record<string, Icon> = {
  Python,
  JavaScript,
  'HTML/CSS': HTML5,
  SQL: SQLIcon,
  TensorFlow,
  'scikit-learn': ScikitLearn,
  PyTorch,
  NLP: NLPIcon,
  'Computer Vision': ComputerVisionIcon,
  LLM: LLMIcon,
  'Prompt Engineering': PromptEngineeringIcon,
  'AI Automation': AIAutomationIcon,
  Pandas,
  NumPy,
  'Data Analysis': DataAnalysisIcon,
  MATLAB: Matlab,
  Jupyter,
  'React.js': React,
  FastAPI,
  'REST API': RestApiIcon,
  Docker,
  GitHub: GitHubIcon,
  'Frontend Dev': FrontendDevIcon,
  'Node.js': NodeJS,
  'Express.js': ExpressJS,
  'Shadcn UI': ShadcnUI,
  npm: Npm,
  Vercel,
  Cloudflare,
  'VS Code': VSCode,
  Cursor,
  PostgreSQL,
  MySQL,
  Excel,
  Tableau,
  'Statistical Analysis': StatisticalAnalysisIcon,
  Supabase,
  Neon,
  Linux,
  Bash,
  'Shell Commands': ShellCommandsIcon,
};
