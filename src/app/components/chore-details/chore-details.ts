import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { catchError, Observable, of, timeout } from 'rxjs';
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
  chore$!: Observable<Chore | null>;
  choreSubmission: ChoreSubmission | null = null;

  error: string | null = null;

  spinner = faSpinner;
  backArrow = faArrowLeft;

  Frequency = Frequency;
  Difficulty = Difficulty;

  constructor(
    private choreService: ChoreService,
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
    this.chore$ = this.choreService.getById(id).pipe(
      timeout(5000),
      catchError((error) => {
        if (error.name === 'TimeoutError') {
          console.error('Request timed out while fetching chore details.');
          this.error = 'Request timed out. Please try again later.';
        } else {
          console.error('Error fetching chore details:', error);
          this.error = 'Failed to load chore details. Please try again later.';
        }
        return of(null);
      }),
    );
  }

  backToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  async markComplete() {
    // const response = await this.api.processPost(`Chore/complete/${this.choreId}`, {});
  }

  getActionButtonStyles() {
    switch (this.choreSubmission?.approvalStatus) {
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
}
