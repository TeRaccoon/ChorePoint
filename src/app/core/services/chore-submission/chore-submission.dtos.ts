import { ChoreSubmission } from '../../types/dtos/chore-submission';
import { RequestState } from '../../types/interfaces/request-state';

export type GetChoreSubmissionsResponse = RequestState<ChoreSubmission[]>;

export type KidStats = {
  completed: number;
  completedThisWeek: number;
  approvalRate: number;
  dueToday: number;
  dueThisWeek: number;
  weeklyCompletionPercentage: number;
};

export const DEFAULT_INITIAL_STATE = {
  isLoading: false,
  data: null,
};
