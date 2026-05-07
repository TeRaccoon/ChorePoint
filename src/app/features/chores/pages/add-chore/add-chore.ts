import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { CHORE_EMOJIS } from '../../../../consts/chore-emojis';
import { KidsService } from '../../../../core/services/kids.service';
import { LoadingEmoji } from '../../../../shared/components/loading-emoji/loading-emoji';
import { LoadingScreen } from '../../../../shared/pages/loading-screen/loading-screen';
import { User } from '../../../kids/models/user';
import { Frequency } from '../../models/chore';
import { DAYS_OF_WEEK } from '../../models/days-of-week';
import { FrequencyOptions } from '../../models/frequency-options';

@Component({
  selector: 'app-add-chore',
  imports: [ReactiveFormsModule, AsyncPipe, LoadingScreen, LoadingEmoji],
  templateUrl: './add-chore.html',
  styleUrl: './add-chore.scss',
})
export class AddChore {
  private kidsService = inject(KidsService);
  private fb = inject(FormBuilder);

  loading = signal(false);
  error = signal<string | null>(null);

  choreEmojis = CHORE_EMOJIS;
  daysOfWeek = DAYS_OF_WEEK;
  choreFrequencyOptions = FrequencyOptions;
  choreFrequency = Frequency;

  vm$!: Observable<{
    kids: User[];
  }>;

  form = this.fb.nonNullable.group({
    name: ['', { validators: [Validators.required] }],
    icon: ['', { validators: [Validators.required] }],
    kidId: [null as number | null, { validators: [Validators.required] }],
    frequency: [Frequency.Daily, { validators: [Validators.required] }],
    dueDate: [''],
    points: [0, { validators: [Validators.required, Validators.min(0)] }],
    description: [''],
  });

  kids$ = this.kidsService.kids$;

  ngOnInit() {
    this.loadKids();
  }

  loadKids() {
    this.vm$ = this.kidsService.getKids$().pipe(
      map((kids) => {
        if (kids.length && !this.form.value.kidId) {
          this.form.patchValue({ kidId: kids[0].id });
        }

        return { kids };
      }),
    );
  }

  selectFrequency(frequency: number) {
    this.form.patchValue({ frequency });
  }

  adjustPoints(amount: number) {
    const current = this.form.get('points')?.value || 0;
    const next = Math.max(50, current + amount);
    this.form.patchValue({ points: next });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);
  }
}
