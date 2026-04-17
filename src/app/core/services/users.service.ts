import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';
import { User } from '../../features/kids/models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  private baseUrl = 'https://localhost:7087/api/users';

  getKids() {
    return this.http.get<User[]>(`${this.baseUrl}/kids`).pipe(
      catchError((error) => {
        console.error('Error fetching children:', error);
        throw error;
      }),
    );
  }
}
