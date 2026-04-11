import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { LoginRequest } from '../../requests/login-request';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  private baseUrl = 'https://localhost:7087/api/auth';

  private ONBOARDING_KEY = 'hasSeenOnboarding';

  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true; // Invalid token is considered expired
    }
  }

  isAuthenticated(): boolean {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) return false;

    const isExpired = this.isTokenExpired(authToken);

    if (isExpired) {
      localStorage.removeItem('authToken');
      return false;
    }

    return true;
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
