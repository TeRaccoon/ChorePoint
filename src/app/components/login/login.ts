import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormField } from '../common/form-field/form-field';
import { LoadingEmoji } from '../common/loading-emoji/loading-emoji';
import { PasswordInput } from '../common/password-input/password-input';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, LoadingEmoji, FormField, RouterModule, PasswordInput],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  loading = signal(false);
  error = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    email: ['', { validators: [Validators.required, Validators.email], updateOn: 'blur' }],
    password: ['', { validators: [Validators.required], updateOn: 'blur' }],
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const { email, password } = this.form.getRawValue();

    this.authService.login({ email, password }).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.error.set('Invalid email or password.');
        } else {
          this.error.set(err.message || 'Login failed. Please try again.');
        }
        this.loading.set(false);
      },
    });
  }
}
