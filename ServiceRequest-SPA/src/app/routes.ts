import { Routes } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { RequestListComponent } from './components/request-list/request-list.component';
import { RequestCreateComponent } from './components/request-create/request-create.component';
import { GetRequestsResolverService } from './resolvers/get-requests-resolver.service';
import { RequestsOverviewComponent } from './components/requests-overview/requests-overview.component';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'request-create', component: RequestCreateComponent },
  { path: 'request-list', resolve: { data: GetRequestsResolverService }, component: RequestListComponent },
  { path: 'request-overview', resolve: { data: GetRequestsResolverService }, component: RequestsOverviewComponent, outlet: 'outlet1' }
];
