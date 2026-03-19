import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Chore } from '../types/chore';

@Injectable({ providedIn: 'root' })
export class ChoreService {
  private baseUrl = 'https://localhost:7087/api/chore';

  constructor(private http: HttpClient) {}

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

  completeChore(id: number) {
    return this.http.post(`${this.baseUrl}/${id}/complete`, {});
  }
}
