export interface StudySession {
  id: string;
  subject: "Matemática" | "Física" | "Química" | "Português" | "Inglês";
  topic: string;
  durationSeconds: number;
  timestamp: Date;
  focusRating: 1 | 2 | 3 | 4 | 5;
}

export interface DailyLog {
  date: string;
  totalSeconds: number;
  subjectsDistribution: Record<string, number>;
  moodScore?: number;
}

export interface UserRPG {
  rankTitle: string;
  currentXP: number;
  level: number;
  streak: number;
}
