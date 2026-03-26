import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
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
import { ChoreSubmissionService } from '../../core/services/chore-submission.service';
import { ChoreService } from '../../core/services/chore.service';
import { Chore, Difficulty, Frequency } from '../../types/chore';
import { ChoreSubmission } from '../../types/chore-submission';
import { LoadingScreen } from '../common/loading-screen/loading-screen';
import { APPROVAL_STATUS_CONFIG, DEFAULT_STATUS } from './config';
import { ActionButton } from './types';

@Component({
  selector: 'app-chore-details',
  imports: [FontAwesomeModule, LoadingScreen, AsyncPipe],
  templateUrl: './chore-details.html',
  styleUrl: './chore-details.scss',
})
export class ChoreDetails {
  private choreService = inject(ChoreService);
  private choreSubmissionService = inject(ChoreSubmissionService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private refresh$ = new Subject<void>();

  vm$!: Observable<{
    actionButton: ActionButton;
    chore: Chore | null;
    choreSubmission: ChoreSubmission | null;
  }>;

  error: string | null = null;

  spinner = faSpinner;
  backArrow = faArrowLeft;

  Frequency = Frequency;
  Difficulty = Difficulty;

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
      startWith(void 0),
      switchMap(() =>
        combineLatest([this.choreService.getById(id), this.choreSubmissionService.getCurrent(1)]),
      ),
      map(([chore, choreSubmission]) => {
        const status = choreSubmission?.approvalStatus;

        const config = status ? (APPROVAL_STATUS_CONFIG[status] ?? DEFAULT_STATUS) : DEFAULT_STATUS;

        return {
          actionButton: config,
          chore,
          choreSubmission,
        };
      }),
      catchError((error) => {
        if (error.name === 'TimeoutError') {
          console.error('Request timed out');
        } else {
          console.error('Error loading chore details:', error);
        }
        return of({ actionButton: DEFAULT_STATUS, chore: null, choreSubmission: null });
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
      error: (err: string) => {
        console.error('Failed to complete chore', err);
      },
    });
  }
}
