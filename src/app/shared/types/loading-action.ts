export interface LoadingAction {
  choreId: number | null;
  type: 'activate' | 'delete';
}
