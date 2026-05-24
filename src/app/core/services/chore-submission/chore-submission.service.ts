import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, startWith } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { DEFAULT_KID_STATS } from '../../../consts/default-kid-stats';
import { ChoreSubmission } from '../../types/dtos/chore-submission';
import { ApiResponse } from '../dtos/response';
import { mapError, mapSuccess } from '../response-mapper';
import { DEFAULT_INITIAL_STATE, KidStats } from './chore-submission.dtos';

@Injectable({ providedIn: 'root' })
export class ChoreSubmissionService {
  private http = inject(HttpClient);

  private baseUrl = 'https://localhost:7087/api/chore/submissions';

  getSubmissions$(pending: boolean) {
    return this.http.get<ApiResponse<ChoreSubmission[]>>(`${this.baseUrl}?pending=${pending}`).pipe(
      map((res) => mapSuccess<ChoreSubmission[]>(res)),
      catchError(mapError<ChoreSubmission[]>([])),
      startWith(DEFAULT_INITIAL_STATE),
    );
  }

  getChoreSubmissionStats(kidId: number) {
    return this.http.get<ApiResponse<KidStats>>(`${this.baseUrl}/stats/${kidId}`).pipe(
      map((res) => mapSuccess<KidStats>(res)),
      catchError(mapError<KidStats>(DEFAULT_KID_STATS)),
      startWith(DEFAULT_INITIAL_STATE),
    );
  }

  getCurrent(userId: number) {
    return this.http.get<ApiResponse<ChoreSubmission>>(`${this.baseUrl}/current/${userId}`).pipe(
      map((res) => mapSuccess<ChoreSubmission>(res)),
      catchError(mapError<ChoreSubmission>(null)),
      startWith(DEFAULT_INITIAL_STATE),
    );
  }

  completeChore(id: number) {
    return this.http.post(`${this.baseUrl}/${id}/complete`, {});
  }

  reviewChore(submissionId: number, approve: boolean) {
    return this.http
      .put<ApiResponse<string>>(`${this.baseUrl}/${submissionId}/review?approve=${approve}`, {})
      .pipe(
        catchError((error) => {
          console.error('Error approving chore:', error);
          throw error;
        }),
        map((response) => response.data),
      );
  }
}
