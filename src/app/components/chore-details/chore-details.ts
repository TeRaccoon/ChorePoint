import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faSpinner } from '@fortawesome/free-solid-svg-icons';
import {
  catchError,
  combineLatest,
  map,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';
import { ChoreSubmissionService } from '../../services/chore-submission.service';
import { ChoreService } from '../../services/chore.service';
import { ApprovalStatus, Chore, Difficulty, Frequency } from '../../types/chore';
import { ChoreSubmission } from '../../types/chore-submission';
import { LoadingScreen } from '../common/loading-screen/loading-screen';

@Component({
  selector: 'app-chore-details',
  imports: [FontAwesomeModule, LoadingScreen, AsyncPipe],
  templateUrl: './chore-details.html',
  styleUrl: './chore-details.scss',
})
export class ChoreDetails {
  private refresh$ = new Subject<void>();

  vm$!: Observable<{
    chore: Chore | null;
    choreSubmission: ChoreSubmission | null;
  }>;

  error: string | null = null;

  spinner = faSpinner;
  backArrow = faArrowLeft;

  Frequency = Frequency;
  Difficulty = Difficulty;

  constructor(
    private choreService: ChoreService,
    private choreSubmissionService: ChoreSubmissionService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.initChore();
  }

  private initChore() {
    const id = this.getChoreIdFromRoute();
    if (id) this.loadChore(id);
  }

  private getChoreIdFromRoute(): number | null {
    const choreId = this.route.snapshot.paramMap.get('id');
    return choreId ? +choreId : null;
  }

  private loadChore(id: number) {
    this.vm$ = this.refresh$.pipe(
      startWith(void 0), // run once on load
      switchMap(() =>
        combineLatest([this.choreService.getById(id), this.choreSubmissionService.getCurrent(1)]),
      ),
      map(([chore, choreSubmission]) => ({ chore, choreSubmission })),
      catchError((error) => {
        if (error.name === 'TimeoutError') {
          console.error('Request timed out');
        } else {
          console.error('Error loading chore details:', error);
        }
        return of({ chore: null, choreSubmission: null });
      }),
    );
  }

  backToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  markComplete() {
    this.choreSubmissionService.completeChore(this.getChoreIdFromRoute()!).subscribe({
      next: () => {
        this.refresh$.next();
      },
      error: (err) => {
        console.error('Failed to complete chore', err);
      },
    });
  }

  getActionButtonStyles(status: ApprovalStatus | undefined): string {
    switch (status) {
      case ApprovalStatus.Approved:
        return 'btn-success';
      case ApprovalStatus.Pending:
        return 'btn-warning';
      case ApprovalStatus.Rejected:
        return 'btn-danger';
      case ApprovalStatus.Incomplete:
        return 'btn-primary';
      default:
        return 'btn-primary';
    }
  }

  getActionButtonText(status: ApprovalStatus | undefined): string {
    switch (status) {
      case ApprovalStatus.Approved:
        return 'Chore Complete!';
      case ApprovalStatus.Pending:
        return 'Pending Approval';
      case ApprovalStatus.Rejected:
        return 'Rejected';
      case ApprovalStatus.Incomplete:
        return 'Mark Complete!';
      default:
        return 'Mark Complete!';
    }
  }
}
