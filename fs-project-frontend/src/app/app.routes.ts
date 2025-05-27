import { Routes } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserTypeListComponent } from './components/user-type-list/user-type-list.component';
import { UserTypeFormComponent } from './components/user-type-form/user-type-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'user-list', pathMatch: 'full' },
  { path: 'user-form', component: UserFormComponent },
  { path: 'user-type-form', component: UserTypeFormComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'type-user-list', component: UserTypeListComponent },
];
