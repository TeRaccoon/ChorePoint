import { ApprovalStatus } from './chore';

export type ChoreSubmission = {
  id: number;
  choreId: number;
  userId: number;
  completedAt: Date;
  approvalStatus: ApprovalStatus;
  approvedAt: Date | null;
  approvedByUserId: number | null;
  notes: string;
  createdAt: Date;
};
