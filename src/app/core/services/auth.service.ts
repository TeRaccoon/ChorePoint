import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { LoginRequest } from '../../requests/login-request';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  private baseUrl = 'https://localhost:7087/api/auth';

  private ONBOARDING_KEY = 'hasSeenOnboarding';

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  hasSeenOnboarding(): boolean {
    return localStorage.getItem(this.ONBOARDING_KEY) === 'true';
  }

  setOnboardingSeen(): void {
    localStorage.setItem(this.ONBOARDING_KEY, 'true');
  }

  login(request: LoginRequest) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, request).pipe(
      tap({
        next: (response) => {
          localStorage.setItem('authToken', response.token);
        },
      }),
    );
  }

  logout() {
    localStorage.removeItem('authToken');
  }
}
