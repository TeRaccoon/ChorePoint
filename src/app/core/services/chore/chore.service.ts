import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { startWith } from 'rxjs/internal/operators/startWith';
import { Chore } from '../../types/dtos/chore';
import { DEFAULT_INITIAL_STATE } from '../chore-submission/chore-submission.dtos';
import { ApiResponse } from '../dtos/response';
import { mapError, mapSuccess } from '../response-mapper';
import { CreateChoreRequest, GetChoresResponse } from './chore.dtos';

@Injectable({ providedIn: 'root' })
export class ChoreService {
  private http = inject(HttpClient);

  private baseUrl = 'https://localhost:7087/api/chore';

  getById(id: number) {
    return this.http.get<ApiResponse<Chore>>(`${this.baseUrl}/${id}`).pipe(
      map((res) => mapSuccess<Chore>(res)),
      catchError(mapError<Chore>(null)),
      startWith(DEFAULT_INITIAL_STATE),
    );
  }

  getAll() {
    return this.http.get<ApiResponse<Chore[]>>(this.baseUrl).pipe(
      map((res) => mapSuccess<Chore[]>(res)),
      catchError(mapError<Chore[]>([])),
      startWith(DEFAULT_INITIAL_STATE),
    );
  }

  getChores(visible = true) {
    return this.http.get<GetChoresResponse>(`${this.baseUrl}/parent?visible=${visible}`).pipe(
      map((res) => mapSuccess<Chore[]>(res)),
      catchError(mapError<Chore[]>([])),
      startWith(DEFAULT_INITIAL_STATE),
    );
  }

  createChore(request: CreateChoreRequest) {
    return this.http.post<void>(`${this.baseUrl}/create`, request);
  }
}
