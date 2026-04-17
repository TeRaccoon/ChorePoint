export type Chore = {
  id: number;
  userId: number;
  name: string;
  icon: string;
  points: number;
  difficulty: Difficulty;
  frequency: Frequency;
  timeOfDay: string;
  isVisible: boolean;
  lastCompletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  completionCount: number;
  description: string;
};

export enum Difficulty {
  Easy = 0,
  Medium = 1,
  Hard = 2,
}

export enum Frequency {
  Daily = 0,
  Weekly = 1,
  Bonus = 2,
}

export enum ApprovalStatus {
  Incomplete = 0,
  Pending = 1,
  Approved = 2,
  Rejected = 3,
}
