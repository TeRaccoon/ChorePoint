import { Routes } from '@angular/router';
import { authGuard } from './auth/auth-guard';
import { CreateAccount } from './components/auth/create-account/create-account';
import { Login } from './components/auth/login/login';
import { ChoreDetails } from './components/chore/chore-details/chore-details';
import { ChoreSettings } from './components/parent/chore-settings/chore-settings';
import { DashboardHome } from './components/parent/dashboard-home/dashboard-home';
import { DashboardLayout } from './components/parent/dashboard-layout/dashboard-layout';
import { KidsSettings } from './components/parent/kids-settings/kids-settings';
import { ParentSettings } from './components/parent/parent-settings/parent-settings';
import { CreateProfile } from './components/start/children/create-profile/create-profile';
import { Start } from './components/start/start';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Start, canActivate: [authGuard] },
  {
    path: 'dashboard',
    component: DashboardLayout,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: DashboardHome, pathMatch: 'full' },
      { path: 'chores', component: ChoreSettings },
      {
        path: 'kids',
        component: KidsSettings,
      },
      { path: 'kids/add', component: CreateProfile },
      { path: 'settings', component: ParentSettings },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  { path: 'chore/:id', component: ChoreDetails, canActivate: [authGuard] },
  { path: 'login', component: Login },
  { path: 'create-account', component: CreateAccount },
];
