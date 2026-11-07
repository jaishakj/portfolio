export type Project = {
  id: string;
  number: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  preview: 'video' | 'rag' | 'attractor' | 'orbit' | 'game' | 'code' | 'dashboard' | 'workflow';
  github?: string;
  live?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: 'video-summarization',
    number: '01',
    title: 'AI-Powered Video Summarization',
    description:
      'A desktop tool that extracts keyframes, detects objects with YOLOv5, and captions frames with BLIP to produce a concise video summary.',
    technologies: ['Python', 'OpenCV', 'YOLOv5', 'BLIP', 'Tkinter'],
    category: 'Computer vision',
    preview: 'video',
    github: 'https://github.com/jaishakj/Ai-Powered-Video-Summarisation-Multiple-Models',
    featured: true,
  },
  {
    id: 'support-rag-chatbot',
    number: '02',
    title: 'Support RAG Chatbot',
    description:
      'A customer-support assistant that combines a React interface with a FastAPI retrieval pipeline, Pinecone search, Gemini responses, source documents, and session history.',
    technologies: ['LangChain', 'Pinecone', 'Gemini 1.5 Pro', 'FastAPI', 'React', 'RAG'],
    category: 'Applied AI',
    preview: 'rag',
    github: 'https://github.com/jaishakj/Support-RAG-Chatbot',
    featured: true,
  },
  {
    id: 'strange-attractor-visualiser',
    number: '03',
    title: 'Strange Attractor Visualiser',
    description:
      'An interactive 3D exploration of six chaotic systems, with live parameter controls, multiple color modes, orbit controls, and a learn panel.',
    technologies: ['Three.js', 'Python', 'Streamlit'],
    category: 'Scientific computing',
    preview: 'attractor',
    github: 'https://github.com/jaishakj/Strange-Attractor-Visualiser',
  },
  {
    id: 'three-body-simulation',
    number: '04',
    title: 'Three-Body Simulation (RKF45)',
    description:
      'Browser-based three-body gravitational simulator using an adaptive Runge–Kutta–Fehlberg (RKF45) integrator, with real-time energy diagnostics and classic scenarios like the figure-eight orbit and Lagrange configurations.',
    technologies: ['TypeScript', 'HTML/CSS'],
    category: 'Simulation',
    preview: 'orbit',
    github: 'https://github.com/jaishakj/Three-Body-Simulation-RKF45-Accurate',
  },
  {
    id: 'prisoners-dilemma',
    number: '05',
    title: "Prisoner's Dilemma Tournament",
    description:
      "A browser-playable tournament inspired by Axelrod's 1980 work, backed by a Spring Boot API and twelve server-side strategies.",
    technologies: ['Java 21', 'Spring Boot', 'TypeScript', 'HTML/CSS'],
    category: 'Interactive systems',
    preview: 'game',
    github: 'https://github.com/jaishakj/Prisoners-dilemma',
  },
  {
    id: 'majit-frontend',
    number: '06',
    title: 'Majit — Frontend',
    description:
      'Frontend codebase for the Majit project. Full feature scope isn\'t published in the repository yet.',
    technologies: ['JavaScript'],
    category: 'Frontend',
    preview: 'code',
    github: 'https://github.com/jaishakj/Majit-frontend',
  },
  {
    id: 'netflix-content-analysis',
    number: '07',
    title: 'Netflix Content Analysis Dashboard',
    description:
      "Interactive dashboard analyzing Netflix's global content catalog (1925–2021) — genre distribution, ratings, release trends, top countries, and directors.",
    technologies: ['React', 'Recharts', 'JavaScript'],
    category: 'Data visualization',
    preview: 'dashboard',
    github: 'https://github.com/jaishakj/netflix-content-analysis-dashboard',
  },
  {
    id: 'jobtrakt',
    number: '08',
    title: 'JobTrakt',
    description:
      'A job-search workspace with application tracking, interview and follow-up reminders, weekly summaries, notifications, and a React/TypeScript dashboard backed by Spring Boot and PostgreSQL.',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'React', 'TypeScript'],
    category: 'Full-stack application',
    preview: 'workflow',
    github: 'https://github.com/jaishakj/JobTrakt',
    featured: true,
  },
];
