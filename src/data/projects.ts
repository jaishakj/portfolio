export type Project = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  category: 'AI & Vision' | 'Applied AI' | 'Scientific Computing' | 'Systems & Games' | 'Full-Stack' | 'Data Analytics';
  preview: 'video' | 'rag' | 'attractor' | 'orbit' | 'game' | 'code' | 'dashboard' | 'workflow';
  github?: string;
  live?: string;
  featured?: boolean;
  tier: 'flagship' | 'core' | 'extended';
};

export const projects: Project[] = [
  {
    id: 'video-summarization',
    number: '01',
    title: 'AI-Powered Video Summarization',
    subtitle: 'Multi-Modal Keyframe Extraction & Object Captioning',
    description:
      'A computer vision desktop pipeline that analyzes long video streams, extracts representative keyframes, detects objects using YOLOv5, and synthesizes natural language captions with BLIP.',
    problem:
      'Manual video review is time-consuming and computationally expensive for surveillance, archival footage, and content production.',
    solution:
      'Engineered an automated pipeline combining OpenCV frame difference analysis for keyframe selection, YOLOv5 for object recognition, and Salesforce BLIP for automated frame captioning into a structured desktop application.',
    technologies: ['Python', 'OpenCV', 'YOLOv5', 'BLIP', 'PyTorch', 'Tkinter'],
    category: 'AI & Vision',
    preview: 'video',
    github: 'https://github.com/jaishakj/Ai-Powered-Video-Summarisation-Multiple-Models',
    featured: true,
    tier: 'flagship',
  },
  {
    id: 'support-rag-chatbot',
    number: '02',
    title: 'Support RAG Chatbot',
    subtitle: 'Retrieval-Augmented Generation Support Pipeline',
    description:
      'An enterprise support assistant connecting a modern React client with a FastAPI retrieval pipeline, Pinecone vector embeddings, and Google Gemini 1.5 Pro synthesis with citation linking.',
    problem:
      'Generic LLMs suffer from domain hallucination and cannot reference private or dynamic customer documentation reliably.',
    solution:
      'Built a production RAG architecture that indexes domain documents into Pinecone, performs semantic similarity searches, constructs contextual prompts, and provides verified source attributions with session history.',
    technologies: ['LangChain', 'Pinecone', 'Gemini 1.5 Pro', 'FastAPI', 'React', 'TypeScript', 'RAG'],
    category: 'Applied AI',
    preview: 'rag',
    github: 'https://github.com/jaishakj/Support-RAG-Chatbot',
    featured: true,
    tier: 'flagship',
  },
  {
    id: 'three-body-simulation',
    number: '03',
    title: 'Three-Body Gravitational Simulator',
    subtitle: 'Adaptive RKF45 Integrator with Energy Conservation Diagnostics',
    description:
      'A web-based gravitational dynamics simulator for the chaotic three-body problem, utilizing an adaptive Runge–Kutta–Fehlberg (RKF45) numerical solver with real-time mechanical energy conservation diagnostics.',
    problem:
      'Fixed-step Euler or RK4 solvers rapidly accumulate truncation error in close orbital encounters, causing artificial energy drift and orbital disintegration.',
    solution:
      'Implemented an RKF45 variable step-size integrator in TypeScript with real-time Hamiltonian energy checks, trajectory rendering, and classic stable solutions including the Lagrange equilateral and Chenciner figure-eight orbits.',
    technologies: ['TypeScript', 'Canvas API', 'Numerical ODEs', 'Physics Simulation', 'HTML5'],
    category: 'Scientific Computing',
    preview: 'orbit',
    github: 'https://github.com/jaishakj/Three-Body-Simulation-RKF45-Accurate',
    featured: true,
    tier: 'core',
  },
  {
    id: 'strange-attractor-visualiser',
    number: '04',
    title: 'Strange Attractor 3D Visualiser',
    subtitle: 'Real-Time Non-Linear Dynamics & Chaos Phase Space',
    description:
      'An interactive 3D phase-space visualizer exploring non-linear chaotic systems including the Lorenz, Rössler, Thomas, Aizawa, Dadras, and Chen attractors.',
    problem:
      'Chaotic differential equations are notoriously difficult to conceptualize through static 2D phase plots or equation sets.',
    solution:
      'Created a Three.js and Python interactive environment with parametric sliders, 60k+ trajectory points, variable integration delta, multiple color gradient modes, and educational system walkthroughs.',
    technologies: ['Three.js', 'Python', 'Streamlit', 'WebGL', 'Dynamical Systems'],
    category: 'Scientific Computing',
    preview: 'attractor',
    github: 'https://github.com/jaishakj/Strange-Attractor-Visualiser',
    featured: true,
    tier: 'core',
  },
  {
    id: 'prisoners-dilemma',
    number: '05',
    title: "Prisoner's Dilemma Tournament",
    subtitle: "Axelrod 1980 Game Theory Simulator & Strategy Engine",
    description:
      "An interactive game theory platform simulating Axelrod's iterated prisoner's dilemma tournament, backed by a Spring Boot engine running 12 automated algorithmic strategies.",
    problem:
      'Exploring how reciprocal altruism and cooperative equilibria emerge in non-zero-sum competitive environments.',
    solution:
      'Engineered a round-robin tournament engine in Java 21 and Spring Boot featuring Tit-for-Tat, Pavlov, Grim Trigger, Suspicious Tit-for-Tat, and Random strategies with browser-based playable match play and payoff analytics.',
    technologies: ['Java 21', 'Spring Boot', 'TypeScript', 'Game Theory', 'REST API'],
    category: 'Systems & Games',
    preview: 'game',
    github: 'https://github.com/jaishakj/Prisoners-dilemma',
    featured: true,
    tier: 'core',
  },
  {
    id: 'jobtrakt',
    number: '06',
    title: 'JobTrakt Workspace',
    subtitle: 'Application Pipeline & Automated Follow-Up System',
    description:
      'A job-search productivity workspace providing Kanban application management, automated interview follow-up scheduling, weekly review digests, and persistent state storage.',
    problem:
      'Tracking dozens of simultaneous job applications across platforms leads to missed follow-ups and uncoordinated interview preparation.',
    solution:
      'Developed a full-stack system combining a React/TypeScript dashboard with a Spring Boot REST backend, PostgreSQL relational schema, reminder queue, and weekly activity summaries.',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'React', 'TypeScript', 'REST API'],
    category: 'Full-Stack',
    preview: 'workflow',
    github: 'https://github.com/jaishakj/Jobtrakt',
    featured: true,
    tier: 'core',
  },
  {
    id: 'netflix-content-analysis',
    number: '07',
    title: 'Netflix Catalog Intelligence Dashboard',
    subtitle: 'Historical Catalog Analytics & Production Distribution (1925–2021)',
    description:
      'An exploratory data dashboard visualizing the global Netflix content catalog across nearly a century of releases, revealing distribution shifts between feature films and serialized TV.',
    problem:
      'Unstructured streaming catalog data requires dimensional slicing to identify licensing trends, geographical clusters, and content expansion patterns.',
    solution:
      'Built an interactive React dashboard with Recharts visual components analyzing genre frequencies, rating compositions, release volume timelines, and top director networks.',
    technologies: ['React', 'Recharts', 'JavaScript', 'Data Visualization', 'CSS Modules'],
    category: 'Data Analytics',
    preview: 'dashboard',
    github: 'https://github.com/jaishakj/netflix-content-analysis-dashboard',
    tier: 'extended',
  },
  {
    id: 'majit-frontend',
    number: '08',
    title: 'Majit Platform Interface',
    subtitle: 'Component Architecture & Responsive Client Workspace',
    description:
      'Frontend codebase and modular interface architecture for the Majit project, implementing responsive layouts and modern interaction design.',
    problem:
      'Creating a lightweight, zero-dependency client architecture for high-performance responsive web interaction.',
    solution:
      'Architected modular JavaScript components with semantic HTML, fluid typography, and CSS custom property theming.',
    technologies: ['JavaScript', 'HTML5', 'CSS Modules', 'Responsive Layout'],
    category: 'Full-Stack',
    preview: 'code',
    github: 'https://github.com/jaishakj/Majit-frontend',
    tier: 'extended',
  },
];
