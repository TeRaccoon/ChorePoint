import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../core/services/api.service';
import { Chore, Difficulty, Frequency } from '../../types/chore';
import { User } from '../../types/user';
import { LoadingScreen } from '../common/loading-screen/loading-screen';

@Component({
  selector: 'app-chore-dashboard',
  imports: [RouterLink, FontAwesomeModule, LoadingScreen],
  templateUrl: './chore-dashboard.html',
  styleUrl: './chore-dashboard.scss',
})
export class ChoreDashboard {
  private apiService = inject(ApiService);

  user: User | null = null;
  chores: Chore[] = [];

  Difficulty = Difficulty;
  Frequency = Frequency;

  loading = true;
  spinner = faSpinner;

  ngOnInit() {
    this.loadUser().then(() => {
      this.loadChores().then(() => {
        this.loading = false;
      });
    });
  }

  async loadUser() {
    this.user = await this.apiService.processGet('Users/me');
  }

  async loadChores() {
    if (this.user) {
      this.chores = await this.apiService.processGet(`Chore/user/${this.user.id}`);
    }
  }

  getDailyChores(): Chore[] {
    return this.chores.filter((chore) => chore.isVisible && chore.frequency == Frequency.Daily);
  }

  getWeeklyChores(): Chore[] {
    return this.chores.filter((chore) => chore.isVisible && chore.frequency == Frequency.Weekly);
  }

  getBonusChores(): Chore[] {
    return this.chores.filter((chore) => chore.isVisible && chore.frequency == Frequency.Bonus);
  }
}
