export interface RehabSession {
  id: string;
  date: string;
  therapist: string;
  duration: number;
  exercises: number;
  completion: number;
  notes: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetWeek: number;
  completed: boolean;
  completedDate?: string;
}

export interface PainScore {
  date: string;
  score: number; // 0-10 scale
  activity: string;
}
