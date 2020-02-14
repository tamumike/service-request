import { Routes } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { RequestListComponent } from './components/request-list/request-list.component';
import { RequestCreateComponent } from './components/request-create/request-create.component';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'request-list', component: RequestListComponent },
  {path: 'request-create', component: RequestCreateComponent }
];
