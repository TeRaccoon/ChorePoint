export enum ChoreApprovalStatus {
  Incomplete = 'Incomplete',
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export type ActionButton = {
  text: string;
  class: string;
};
