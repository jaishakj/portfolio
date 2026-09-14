export type Project = {
  id: string;
  number: string;
  title: string;
  description: string;
  technologies: string[];
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
      'Intelligent video analysis system using YOLOv5 for object detection and LLM integration for automated summarization. Processes 30 FPS streams in real time with 92% accuracy.',
    technologies: ['YOLOv5', 'Python', 'NLP', 'Computer Vision'],
    github: 'https://github.com/jaishakj/Ai-Powered-Video-Summarisation-Multiple-Models',
    featured: true,
  },
  {
    id: 'support-rag-chatbot',
    number: '02',
    title: 'Support RAG Chatbot',
    description:
      'RAG-powered customer support chatbot built with LangChain, Pinecone, Gemini 1.5 Pro, FastAPI, and React. Vector search across 5,000+ documents with cited sources, multi-turn memory (68% → 89% accuracy), and automatic agent escalation.',
    technologies: ['LangChain', 'Pinecone', 'Gemini 1.5 Pro', 'FastAPI', 'React', 'RAG'],
    github: 'https://github.com/jaishakj/Support-RAG-Chatbot',
    featured: true,
  },
  {
    id: 'strange-attractor-visualiser',
    number: '03',
    title: 'Strange Attractor Visualiser',
    description:
      'Interactive 3D visualiser for classic chaotic dynamical systems — Lorenz, Rössler, Dadras, Aizawa, Halvorsen, and Chen attractors. Renders 60-80k trajectory points in real time.',
    technologies: ['Three.js', 'Python', 'Streamlit'],
    github: 'https://github.com/jaishakj/Strange-Attractor-Visualiser',
  },
  {
    id: 'three-body-simulation',
    number: '04',
    title: 'Three-Body Simulation (RKF45)',
    description:
      'Browser-based three-body gravitational simulator using an adaptive Runge–Kutta–Fehlberg (RKF45) integrator, with real-time energy diagnostics and classic scenarios like the figure-eight orbit and Lagrange configurations.',
    technologies: ['TypeScript', 'HTML/CSS'],
    github: 'https://github.com/jaishakj/Three-Body-Simulation-RKF45-Accurate',
  },
  {
    id: 'prisoners-dilemma',
    number: '05',
    title: "Prisoner's Dilemma Tournament",
    description:
      "An interactive recreation of Axelrod's famous 1980 prisoner's dilemma tournament — go head-to-head against 12 real strategic agents and see why cooperation is so hard to sustain.",
    technologies: ['JavaScript', 'HTML/CSS'],
    github: 'https://github.com/jaishakj/Prisoners-dilemma',
  },
  {
    id: 'majit-frontend',
    number: '06',
    title: 'Majit — Frontend',
    description:
      'Frontend codebase for the Majit project. Full feature scope isn\'t published in the repository yet.',
    technologies: ['JavaScript'],
    github: 'https://github.com/jaishakj/Majit-frontend',
  },
  {
    id: 'netflix-content-analysis',
    number: '07',
    title: 'Netflix Content Analysis Dashboard',
    description:
      "Interactive dashboard analyzing Netflix's global content catalog (1925–2021) — genre distribution, ratings, release trends, top countries, and directors.",
    technologies: ['React', 'Recharts', 'JavaScript'],
    github: 'https://github.com/jaishakj/netflix-content-analysis-dashboard',
  },
];
