export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  period: string;
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: 'infosys-springboard-ai-intern',
    role: 'AI Intern · Internship 5.0 (B2)',
    company: 'Infosys Springboard · Remote',
    period: 'Oct 2024 — Dec 2024',
    points: [
      'Participated in Infosys Springboard Internship 5.0 (B2), focused on AI Powered Call Centre Intelligence.',
      'Completed the mandatory assignment related to AI Powered Call Centre Intelligence as part of the internship program.',
    ],
  },
  {
    id: 'retech-ml-intern',
    role: 'Machine Learning Intern',
    company: 'Retech Solutions Pvt. Ltd.',
    period: 'Aug 2023 — Sep 2023',
    points: [
      'Built three predictive models using TensorFlow and scikit-learn, reaching 87% accuracy on customer churn across 50,000+ records through feature engineering with Pandas.',
      'Identified 12 key features that improved model performance by 15% and reduced false positives from 24% to 13%.',
      'Reduced model training time by 40% through pipeline optimization.',
      'Deployed the model behind a FastAPI + Docker service with under 200ms inference latency.',
    ],
  },
  {
    id: 'geeksgod-social-marketing-intern',
    role: 'Social Media Marketing Intern',
    company: 'GEEKSGOD · Bhopal, India (Remote)',
    period: 'Dec 2021 — Feb 2022',
    points: [
      'Boosted Instagram engagement by 65% (2.1% to 3.5%) by analyzing 10,000+ interactions with Python analytics tools.',
      'Automated reporting with Python and SQL, cutting manual work from eight hours to 45 minutes weekly and improving campaign reach by 23%.',
    ],
  },
];
