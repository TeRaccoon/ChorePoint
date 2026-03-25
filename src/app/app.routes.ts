import { Routes } from '@angular/router';
import { ChoreDashboard } from './components/chore-dashboard/chore-dashboard';
import { ChoreDetails } from './components/chore-details/chore-details';
import { Login } from './components/login/login';
import { Start } from './components/start/start';
import { authGuard } from './core/guards/auth-guard.ts-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Start, canActivate: [authGuard] },
  { path: 'dashboard', component: ChoreDashboard, canActivate: [authGuard] },
  { path: 'chore/:id', component: ChoreDetails, canActivate: [authGuard] },
  { path: 'login', component: Login },
];
