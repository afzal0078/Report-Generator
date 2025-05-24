export interface SubjectResult {
  score: number;
  attendance: number;
}

export interface OverallResult {
  percentage: number;
  attendance: number;
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  subjects: Record<string, SubjectResult>;
  overall: OverallResult;
}

export interface SubjectPerformance {
  subject: string;
  gradeDistribution: string[];
  counts: number[];
}