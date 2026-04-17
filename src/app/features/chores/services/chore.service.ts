import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Chore } from '../models/chore';

@Injectable({ providedIn: 'root' })
export class ChoreService {
  private http = inject(HttpClient);

  private baseUrl = 'https://localhost:7087/api/chore';

  getById(id: number) {
    return this.http.get<Chore>(`${this.baseUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching chore details:', error);
        throw error;
      }),
    );
  }

  getAll() {
    return this.http.get<Chore[]>(this.baseUrl);
  }
}
