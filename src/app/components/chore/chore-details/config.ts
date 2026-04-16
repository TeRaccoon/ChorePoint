import { ApprovalStatus } from '../../../types/chore';
import { ActionButton } from './types';

export const APPROVAL_STATUS_CONFIG: Record<ApprovalStatus, ActionButton> = {
  [ApprovalStatus.Approved]: {
    text: 'Chore Complete!',
    class: 'btn-success',
  },
  [ApprovalStatus.Pending]: {
    text: 'Pending Approval',
    class: 'btn-warning',
  },
  [ApprovalStatus.Rejected]: {
    text: 'Rejected',
    class: 'btn-danger',
  },
  [ApprovalStatus.Incomplete]: {
    text: 'Mark Complete!',
    class: 'btn-primary',
  },
};

export const DEFAULT_STATUS = {
  text: 'Mark Complete!',
  class: 'btn-primary',
};
