import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IPendingApproval } from './types';

@Component({
  selector: 'app-pending-approval',
  imports: [DatePipe],
  templateUrl: './pending-approval.html',
  styleUrl: './pending-approval.scss',
})
export class PendingApproval {
  @Input() pendingApproval!: IPendingApproval;
}
