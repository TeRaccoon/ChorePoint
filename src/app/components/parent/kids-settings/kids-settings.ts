import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { UserService } from '../../../core/services/users.service';
import { User } from '../../../types/user';
import { LoadingScreen } from '../../common/loading-screen/loading-screen';
import { Leaderboard } from './children/leaderboard/leaderboard';

@Component({
  selector: 'app-kids-settings',
  imports: [AsyncPipe, LoadingScreen, RouterLink, Leaderboard],
  templateUrl: './kids-settings.html',
  styleUrl: './kids-settings.scss',
})
export class KidsSettings {
  private userService = inject(UserService);

  vm$!: Observable<{
    kids: User[];
  }>;

  ngOnInit() {
    this.vm$ = this.userService.getKids().pipe(map((kids) => ({ kids })));
  }
}
