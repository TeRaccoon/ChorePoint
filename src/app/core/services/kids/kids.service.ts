import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { startWith } from 'rxjs/internal/operators/startWith';
import { Kid } from '../../types/dtos/kid';
import { DEFAULT_INITIAL_STATE } from '../chore-submission/chore-submission.dtos';
import { ApiResponse } from '../dtos/response';
import { mapError, mapSuccess } from '../response-mapper';

@Injectable({ providedIn: 'root' })
export class KidsService {
  private http = inject(HttpClient);

  private baseUrl = 'https://localhost:7087/api/parent';

  getKids() {
    return this.http.get<ApiResponse<Kid[]>>(`${this.baseUrl}/kids`).pipe(
      map((res) => mapSuccess<Kid[]>(res)),
      catchError(mapError<Kid[]>([])),
      startWith(DEFAULT_INITIAL_STATE),
    );
  }
}
