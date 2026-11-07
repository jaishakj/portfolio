export type EducationItem = {
  id: string;
  degree: string;
  institution: string;
  affiliation?: string;
  period: string;
  detail: string;
};

export const education: EducationItem[] = [
  {
    id: 'jit-btech',
    degree: 'B.Tech in Artificial Intelligence & Data Science',
    institution: 'Jeppiaar Institute of Technology',
    affiliation: 'Anna University',
    period: 'Aug 2021 — May 2025',
    detail: 'CGPA: 7.34 / 10.0',
  },
  {
    id: 'pius-xi-higher-secondary',
    degree: 'Higher Secondary · Computer Science',
    institution: 'PIUS XI HR SEC School, Kanyakumari',
    period: 'Apr 2019 — May 2021',
    detail: 'Percentage: 76.5%',
  },
];
