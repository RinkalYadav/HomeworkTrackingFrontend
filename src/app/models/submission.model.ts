export interface Submission {
  id?: number;
  assignment: Assignment;
  student: User;
  filePath: string;
  feedback?: string;
  score?: number;
  submittedAt: string;
}