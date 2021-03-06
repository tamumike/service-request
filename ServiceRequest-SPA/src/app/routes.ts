import { Routes } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { RequestListComponent } from './components/request/request-list/request-list.component';
import { RequestCreateComponent } from './components/request/request-create/request-create.component';
import { RequestsOverviewComponent } from './components/request/requests-overview/requests-overview.component';
import { RequestDetailComponent } from './components/request/request-detail/request-detail.component';
import { RequestDetailResolverService } from './resolvers/request-detail-resolver.service';
import { CommentCreateComponent } from './components/comment/comment-create/comment-create.component';
import { CreateCommentResolverService } from './resolvers/create-comment-resolver.service';
import { RequestReviewComponent } from './components/request/request-review/request-review.component';
import { EngineerRequestReviewComponent } from './components/request/engineer-request-review/engineer-request-review.component';

export const appRoutes: Routes = [
  // { path: '', redirectTo: 'request-list', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'request-create', component: RequestCreateComponent },
  { path: 'request-list', component: RequestListComponent },
  {
    path: 'request-detail/:requestID',
    resolve: { data: RequestDetailResolverService },
    component: RequestDetailComponent
  },
  { path: 'request-review/:requestID', resolve: { data: RequestDetailResolverService }, component: RequestReviewComponent },
  { path: 'comment-create/:requestID', resolve: { data: CreateCommentResolverService }, component: CommentCreateComponent },
  { path: 'e-request-review/:requestID', resolve: { data: RequestDetailResolverService }, component: EngineerRequestReviewComponent },
  { path: 'requests-overview', component: RequestsOverviewComponent, outlet: 'sidebar' },
  { path: '**', redirectTo: 'request-list', pathMatch: 'full'}
];
