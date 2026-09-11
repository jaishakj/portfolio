export type Skill = {
  name: string;
};

export type SkillDomain = {
  domain: string;
  skills: Skill[];
};

export const skillDomains: SkillDomain[] = [
  {
    domain: 'Languages',
    skills: [{ name: 'Python' }, { name: 'JavaScript' }, { name: 'HTML/CSS' }, { name: 'SQL' }],
  },
  {
    domain: 'AI & Machine Learning',
    skills: [
      { name: 'TensorFlow' },
      { name: 'scikit-learn' },
      { name: 'PyTorch' },
      { name: 'NLP' },
      { name: 'Computer Vision' },
      { name: 'LLM' },
      { name: 'Prompt Engineering' },
      { name: 'AI Automation' },
    ],
  },
  {
    domain: 'Data Science',
    skills: [
      { name: 'Pandas' },
      { name: 'NumPy' },
      { name: 'Data Analysis' },
      { name: 'MATLAB' },
      { name: 'Jupyter' },
    ],
  },
  {
    domain: 'Development',
    skills: [
      { name: 'React.js' },
      { name: 'FastAPI' },
      { name: 'REST API' },
      { name: 'Docker' },
      { name: 'GitHub' },
      { name: 'Frontend Dev' },
      { name: 'Node.js' },
      { name: 'Express.js' },
      { name: 'Shadcn UI' },
      { name: 'npm' },
      { name: 'Vercel' },
      { name: 'Cloudflare' },
      { name: 'VS Code' },
      { name: 'Cursor' },
    ],
  },
  {
    domain: 'Data Tools',
    skills: [
      { name: 'PostgreSQL' },
      { name: 'MySQL' },
      { name: 'Excel' },
      { name: 'Tableau' },
      { name: 'Statistical Analysis' },
      { name: 'Supabase' },
      { name: 'Neon' },
    ],
  },
  {
    domain: 'OS & Tools',
    skills: [{ name: 'Linux' }, { name: 'Bash' }, { name: 'Shell Commands' }],
  },
];
