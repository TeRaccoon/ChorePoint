import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserService } from '../../../core/services/users.service';
import { User } from '../../../types/user';
import { LoadingScreen } from '../../common/loading-screen/loading-screen';

@Component({
  selector: 'app-dashboard-home',
  imports: [AsyncPipe, LoadingScreen],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.scss',
})
export class DashboardHome {
  private userService = inject(UserService);

  vm$!: Observable<{
    kids: User[];
  }>;

  ngOnInit() {
    this.vm$ = this.userService.getKids().pipe(map((kids) => ({ kids })));
  }
}
