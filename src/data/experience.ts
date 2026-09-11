export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  period: string;
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: 'retech-ml-intern',
    role: 'Machine Learning Intern',
    company: 'Retech Solutions Pvt. Ltd.',
    period: 'Aug 2023 — Sep 2023',
    points: [
      'Built a churn-prediction model across 50K+ customer records, reaching 87% accuracy.',
      'Reduced model training time by 40% through pipeline optimization.',
      'Deployed the model behind a FastAPI + Docker service with under 200ms inference latency.',
    ],
  },
];
