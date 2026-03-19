import { Routes } from '@angular/router';
import { ChoreDashboard } from './components/chore-dashboard/chore-dashboard';
import { ChoreDetails } from './components/chore-details/chore-details';
import { Start } from './components/start/start';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Start },
  { path: 'dashboard', component: ChoreDashboard },
  { path: 'chore/:id', component: ChoreDetails },
];
