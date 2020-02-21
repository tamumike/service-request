import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppComponent } from './app.component';
import { HomeComponent } from './containers/home/home.component';
import { RequestListComponent } from './components/request/request-list/request-list.component';
import { RequestQueueComponent } from './components/request/request-queue/request-queue.component';
import { SidebarComponent } from './containers/sidebar/sidebar.component';
import { RequestsOverviewComponent } from './components/request/requests-overview/requests-overview.component';
import { RequestService } from './services/request.service';
import { appRoutes } from './routes';
import { ModalComponent } from './UI/modal/modal.component';
import { RequestCreateComponent } from './components/request/request-create/request-create.component';
import { UserService } from './services/user.service';
import { GetRequestsResolverService } from './resolvers/get-requests-resolver.service';
import { RequestDetailComponent } from './components/request/request-detail/request-detail.component';
import { RequestDetailResolverService } from './resolvers/request-detail-resolver.service';
import { CommentListComponent } from './components/comment/comment-list/comment-list.component';
import { CommentCreateComponent } from './components/comment/comment-create/comment-create.component';
import { CommentService } from './services/comment.service';
import { NavComponent } from './UI/nav/nav.component';
import { RequestReviewComponent } from './components/request/request-review/request-review.component';
import { UserInfoResolverService } from './resolvers/user-info-resolver.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    RequestListComponent,
    RequestQueueComponent,
    RequestsOverviewComponent,
    RequestCreateComponent,
    ModalComponent,
    RequestDetailComponent,
    CommentListComponent,
    CommentCreateComponent,
    NavComponent,
    RequestReviewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' }),
    TabsModule.forRoot()
  ],
  providers: [
    RequestService,
    UserService,
    GetRequestsResolverService,
    RequestDetailResolverService,
    CommentService,
    UserInfoResolverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
