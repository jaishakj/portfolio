export type EducationItem = {
  id: string;
  degree: string;
  institution: string;
  affiliation: string;
  period: string;
  detail: string;
};

export const education: EducationItem[] = [
  {
    id: 'jit-btech',
    degree: 'B.Tech in Artificial Intelligence & Data Science',
    institution: 'Jeppiaar Institute of Technology',
    affiliation: 'Anna University',
    period: '2021 — 2025',
    detail: 'CGPA 7.34',
  },
];
