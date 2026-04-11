import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormField } from '../common/form-field/form-field';
import { FormHeader } from '../common/form-header/form-header';
import { PasswordInput } from '../common/password-input/password-input';

@Component({
  selector: 'app-create-account',
  imports: [ReactiveFormsModule, FormField, FormHeader, PasswordInput],
  templateUrl: './create-account.html',
  styleUrl: './create-account.scss',
})
export class CreateAccount {
  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    firstName: ['', { validators: [Validators.required], updateOn: 'blur' }],
    lastName: ['', { validators: [Validators.required], updateOn: 'blur' }],
    email: ['', { validators: [Validators.required, Validators.email], updateOn: 'blur' }],
    password: ['', { validators: [Validators.required] }],
    terms: [false, Validators.requiredTrue],
  });

  submit() {}

  toggleCheck() {}
}
