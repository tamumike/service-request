import { Routes } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { RequestListComponent } from './components/request/request-list/request-list.component';
import { RequestCreateComponent } from './components/request/request-create/request-create.component';
import { GetRequestsResolverService } from './resolvers/get-requests-resolver.service';
import { RequestsOverviewComponent } from './components/request/requests-overview/requests-overview.component';
import { RequestDetailComponent } from './components/request/request-detail/request-detail.component';
import { RequestDetailResolverService } from './resolvers/request-detail-resolver.service';
import { CommentCreateComponent } from './components/comment/comment-create/comment-create.component';
import { CreateCommentResolverService } from './resolvers/create-comment-resolver.service';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'request-create', component: RequestCreateComponent },
  { path: 'request-list', resolve: { data: GetRequestsResolverService }, component: RequestListComponent },
  { path: 'request-overview', resolve: { data: GetRequestsResolverService }, component: RequestsOverviewComponent },
  { path: 'request-detail/:requestID', resolve: { data: RequestDetailResolverService }, component: RequestDetailComponent },
  { path: 'comment-create/:requestID', resolve: { data: CreateCommentResolverService }, component: CommentCreateComponent },
  { path: '', redirectTo: 'request-list', pathMatch: 'full'}
];
